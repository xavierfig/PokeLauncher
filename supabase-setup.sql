create table if not exists public.battle_rooms (
  id uuid primary key default gen_random_uuid(),
  code text not null unique check (code ~ '^[A-F0-9]{8}$'),
  host_id uuid not null references auth.users (id) on delete cascade,
  guest_id uuid references auth.users (id) on delete set null,
  status text not null default 'waiting' check (status in ('waiting', 'active', 'finished')),
  state jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.battle_rooms enable row level security;
revoke all on public.battle_rooms from anon, authenticated;
grant select on public.battle_rooms to authenticated;

drop policy if exists "Room participants can read their rooms" on public.battle_rooms;
create policy "Room participants can read their rooms"
  on public.battle_rooms for select to authenticated
  using (auth.uid() = host_id or auth.uid() = guest_id);

create or replace function public.create_battle_room(p_team jsonb)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_code text;
  v_room public.battle_rooms;
begin
  if auth.uid() is null then
    raise exception 'Debes iniciar sesión para crear una sala.';
  end if;
  if p_team is null or jsonb_typeof(p_team) <> 'array' or jsonb_array_length(p_team) < 1 or jsonb_array_length(p_team) > 6 then
    raise exception 'El equipo debe contener entre 1 y 6 Pokémon.';
  end if;
  if exists (
    select 1 from jsonb_array_elements(p_team) as members(member)
    where coalesce(member ->> 'species', '') = ''
  ) then
    raise exception 'Cada integrante del equipo debe tener una especie.';
  end if;

  loop
    v_code := upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 8));
    exit when not exists (select 1 from public.battle_rooms where code = v_code);
  end loop;

  insert into public.battle_rooms (code, host_id, status, state)
  values (
    v_code,
    auth.uid(),
    'waiting',
    jsonb_build_object('turn', 0, 'host_team', p_team, 'log', jsonb_build_array('Sala creada. Esperando a un rival.'))
  )
  returning * into v_room;

  return jsonb_build_object('room_id', v_room.id, 'room_code', v_room.code);
end;
$$;

create or replace function public.join_battle_room(p_room_code text, p_team jsonb)
returns uuid
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_room public.battle_rooms;
  v_state jsonb;
begin
  if auth.uid() is null then
    raise exception 'Debes iniciar sesión para unirte a una sala.';
  end if;
  if p_team is null or jsonb_typeof(p_team) <> 'array' or jsonb_array_length(p_team) < 1 or jsonb_array_length(p_team) > 6 then
    raise exception 'El equipo debe contener entre 1 y 6 Pokémon.';
  end if;
  if exists (
    select 1 from jsonb_array_elements(p_team) as members(member)
    where coalesce(member ->> 'species', '') = ''
  ) then
    raise exception 'Cada integrante del equipo debe tener una especie.';
  end if;

  select * into v_room
  from public.battle_rooms
  where code = upper(trim(p_room_code))
    and status = 'waiting'
    and guest_id is null
    and host_id <> auth.uid()
  for update;

  if not found then
    raise exception 'No encontramos una sala disponible con ese código.';
  end if;

  v_state := jsonb_build_object(
    'turn', 1,
    'current_player', v_room.host_id,
    'hp_host', 100,
    'hp_guest', 100,
    'host_team', v_room.state -> 'host_team',
    'guest_team', p_team,
    'log', coalesce(v_room.state -> 'log', '[]'::jsonb) || jsonb_build_array('El rival se unió. Empieza el duelo.')
  );

  update public.battle_rooms
  set guest_id = auth.uid(), status = 'active', state = v_state
  where id = v_room.id;

  return v_room.id;
end;
$$;

create or replace function public.play_battle_turn(p_room_id uuid, p_move text)
returns void
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_room public.battle_rooms;
  v_state jsonb;
  v_damage integer;
  v_target text;
  v_target_hp integer;
  v_actor_label text;
  v_move_label text;
  v_winner uuid;
begin
  if auth.uid() is null then
    raise exception 'Debes iniciar sesión para jugar.';
  end if;
  if p_move is null or p_move not in ('Tackle', 'Quick Attack', 'Special') then
    raise exception 'Movimiento no permitido.';
  end if;

  select * into v_room
  from public.battle_rooms
  where id = p_room_id
    and status = 'active'
    and (host_id = auth.uid() or guest_id = auth.uid())
  for update;

  if not found then
    raise exception 'La sala no existe o el duelo ya terminó.';
  end if;

  v_state := v_room.state;
  if v_state ->> 'current_player' <> auth.uid()::text then
    raise exception 'Espera tu turno.';
  end if;

  v_damage := case p_move when 'Tackle' then 18 when 'Quick Attack' then 16 else 24 end;
  if auth.uid() = v_room.host_id then
    v_target := 'hp_guest';
    v_actor_label := coalesce(v_state -> 'host_team' -> 0 ->> 'species', 'Anfitrión');
  else
    v_target := 'hp_host';
    v_actor_label := coalesce(v_state -> 'guest_team' -> 0 ->> 'species', 'Rival');
  end if;
  v_target_hp := greatest(0, (v_state ->> v_target)::integer - v_damage);
  v_state := jsonb_set(v_state, array[v_target], to_jsonb(v_target_hp), true);
  v_move_label := case p_move when 'Special' then 'Movimiento especial' when 'Quick Attack' then 'Ataque rápido' else 'Placaje' end;
  v_state := jsonb_set(
    v_state,
    '{log}',
    coalesce(v_state -> 'log', '[]'::jsonb) || jsonb_build_array(v_actor_label || ' usó ' || v_move_label || '.'),
    true
  );

  if v_target_hp = 0 then
    v_winner := auth.uid();
    v_state := jsonb_set(v_state, '{winner_id}', to_jsonb(v_winner::text), true);
    v_state := jsonb_set(v_state, '{log}', (v_state -> 'log') || jsonb_build_array('¡Duelo finalizado!'), true);
    update public.battle_rooms set status = 'finished', state = v_state where id = v_room.id;
  else
    v_state := jsonb_set(v_state, '{current_player}', to_jsonb(case when auth.uid() = v_room.host_id then v_room.guest_id::text else v_room.host_id::text end), true);
    v_state := jsonb_set(v_state, '{turn}', to_jsonb((v_state ->> 'turn')::integer + 1), true);
    update public.battle_rooms set state = v_state where id = v_room.id;
  end if;
end;
$$;

revoke all on function public.create_battle_room(jsonb) from public, anon;
revoke all on function public.join_battle_room(text, jsonb) from public, anon;
revoke all on function public.play_battle_turn(uuid, text) from public, anon;
grant execute on function public.create_battle_room(jsonb) to authenticated;
grant execute on function public.join_battle_room(text, jsonb) to authenticated;
grant execute on function public.play_battle_turn(uuid, text) to authenticated;
