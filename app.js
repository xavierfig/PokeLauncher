const RETROARCH_URL = 'https://www.retroarch.com/?page=platforms';
const TEAM_STORAGE_KEY = 'pokelauncher-showdown-team';
const SUPABASE_CONFIG_KEY = 'pokelauncher-supabase-config';
const POKEAPI_URL = 'https://pokeapi.co/api/v2';
const views = ['games', 'library', 'resources', 'online', 'pokedex'];
const viewLabels = {
  games: 'Juegos',
  library: 'Mi biblioteca',
  resources: 'Emulador y recursos',
  online: 'Arena online',
  pokedex: 'Pokédex'
};

const games = [
  { title: 'Pokémon Rojo / Azul', platform: 'Game Boy', year: '1996', region: 'Kanto', format: 'Juego oficial', kind: 'official', color: 'coral', mark: 'I', description: 'La aventura original que dio inicio al viaje por Kanto.' },
  { title: 'Pokémon Amarillo', platform: 'Game Boy', year: '1998', region: 'Kanto', format: 'Juego oficial', kind: 'official', color: 'gold', mark: 'II', description: 'Una aventura inspirada en la serie animada, con Pikachu como compañero.' },
  { title: 'Pokémon Oro / Plata / Cristal', platform: 'Game Boy Color', year: '1999–2000', region: 'Johto', format: 'Juego oficial', kind: 'official', color: 'mint', mark: 'II', description: 'Viaja por Johto y Kanto en la segunda generación.' },
  { title: 'Pokémon Rubí / Zafiro', platform: 'Game Boy Advance', year: '2002', region: 'Hoenn', format: 'Juego oficial', kind: 'official', color: 'rose', mark: 'III', description: 'Explora Hoenn y descubre los misterios de Groudon y Kyogre.' },
  { title: 'Pokémon Rojo Fuego / Verde Hoja', platform: 'Game Boy Advance', year: '2004', region: 'Kanto', format: 'Juego oficial', kind: 'official', color: 'coral', mark: 'III', description: 'Remakes de las primeras aventuras, con contenido adicional en las Islas Sete.' },
  { title: 'Pokémon Esmeralda', platform: 'Game Boy Advance', year: '2004', region: 'Hoenn', format: 'Juego oficial', kind: 'official', color: 'mint', mark: 'III', description: 'Una edición ampliada de Hoenn con la aventura del Frente Batalla.' },
  { title: 'Pokémon Diamante / Perla', platform: 'Nintendo DS', year: '2006', region: 'Sinnoh', format: 'Juego oficial', kind: 'official', color: 'lavender', mark: 'IV', description: 'Una nueva aventura entre las montañas, lagos y leyendas de Sinnoh.' },
  { title: 'Pokémon Platino', platform: 'Nintendo DS', year: '2008', region: 'Sinnoh', format: 'Juego oficial', kind: 'official', color: 'silver', mark: 'IV', description: 'Una historia ampliada de Sinnoh centrada en el Mundo Distorsión.' },
  { title: 'Pokémon HeartGold / SoulSilver', platform: 'Nintendo DS', year: '2009', region: 'Johto', format: 'Juego oficial', kind: 'official', color: 'gold', mark: 'IV', description: 'Remakes de Johto con Pokémon que pueden acompañarte fuera de su Poké Ball.' },
  { title: 'Pokémon Negro / Blanco', platform: 'Nintendo DS', year: '2010', region: 'Teselia', format: 'Juego oficial', kind: 'official', color: 'silver', mark: 'V', description: 'Una historia original en Teselia con una Pokédex regional renovada.' },
  { title: 'Pokémon Negro 2 / Blanco 2', platform: 'Nintendo DS', year: '2012', region: 'Teselia', format: 'Juego oficial', kind: 'official', color: 'rose', mark: 'V', description: 'La continuación de la historia de Teselia, dos años después.' },
  { title: 'Pokémon X / Y', platform: 'Nintendo 3DS', year: '2013', region: 'Kalos', format: 'Juego oficial', kind: 'official', color: 'lavender', mark: 'VI', description: 'Conoce Kalos y descubre las megaevoluciones.' },
  { title: 'Pokémon Rubí Omega / Zafiro Alfa', platform: 'Nintendo 3DS', year: '2014', region: 'Hoenn', format: 'Juego oficial', kind: 'official', color: 'coral', mark: 'VI', description: 'Una nueva versión de Hoenn con el Episodio Delta.' },
  { title: 'Pokémon Sol / Luna', platform: 'Nintendo 3DS', year: '2016', region: 'Alola', format: 'Juego oficial', kind: 'official', color: 'gold', mark: 'VII', description: 'Recorre las islas de Alola y participa en sus desafíos insulares.' },
  { title: 'Pokémon Ultrasol / Ultraluna', platform: 'Nintendo 3DS', year: '2017', region: 'Alola', format: 'Juego oficial', kind: 'official', color: 'rose', mark: 'VII', description: 'Una historia alternativa de Alola con nuevas zonas y Pokémon.' },
  { title: 'Pokémon: Let’s Go, Pikachu! / Eevee!', platform: 'Nintendo Switch', year: '2018', region: 'Kanto', format: 'Juego oficial', kind: 'official', color: 'gold', mark: 'I', description: 'Una aventura de Kanto reimaginada para Nintendo Switch.' },
  { title: 'Pokémon Espada / Escudo', platform: 'Nintendo Switch', year: '2019', region: 'Galar', format: 'Juego oficial', kind: 'official', color: 'silver', mark: 'VIII', description: 'Explora Galar y sus vastas Áreas Silvestres.' },
  { title: 'Pokémon Diamante Brillante / Perla Reluciente', platform: 'Nintendo Switch', year: '2021', region: 'Sinnoh', format: 'Juego oficial', kind: 'official', color: 'lavender', mark: 'IV', description: 'Remakes de las aventuras originales de Sinnoh.' },
  { title: 'Leyendas Pokémon: Arceus', platform: 'Nintendo Switch', year: '2022', region: 'Hisui', format: 'Juego oficial', kind: 'official', color: 'mint', mark: 'VIII', description: 'Investiga Pokémon en una versión antigua de la región de Sinnoh.' },
  { title: 'Pokémon Escarlata / Púrpura', platform: 'Nintendo Switch', year: '2022', region: 'Paldea', format: 'Juego oficial', kind: 'official', color: 'rose', mark: 'IX', description: 'Una aventura de mundo abierto en la región de Paldea.' },
  { title: 'Leyendas Pokémon: Z-A', platform: 'Nintendo Switch', year: '2025', region: 'Ciudad Luminalia', format: 'Juego oficial', kind: 'official', color: 'lavender', mark: 'Z-A', description: 'Una aventura de la serie Leyendas Pokémon ambientada en Ciudad Luminalia.' },
  { title: 'Pokémon Unbound', platform: 'Game Boy Advance (parche)', year: '2020', region: 'Borrius (original)', format: 'Hack de fans · requiere parche', kind: 'hack', color: 'lavender', mark: 'FAN', description: 'Proyecto de fans para GBA con una historia y región originales. Requiere aplicar el parche del equipo creador a una copia base legítima compatible.' },
  { title: 'Pokémon Radical Red', platform: 'Game Boy Advance (parche)', year: '2020', region: 'Kanto (reinterpretación)', format: 'Hack de fans · requiere parche', kind: 'hack', color: 'coral', mark: 'FAN', description: 'Hack de dificultad y mejoras para GBA. Se distribuye como parche para una copia base compatible, no como juego completo.' },
  { title: 'Pokémon Gaia', platform: 'Game Boy Advance (parche)', year: '2015', region: 'Orbtus (original)', format: 'Hack de fans · requiere parche', kind: 'hack', color: 'mint', mark: 'FAN', description: 'Aventura de fans para GBA en una región original. Comprueba los requisitos de versión indicados por su creador.' },
  { title: 'Pokémon Crystal Clear', platform: 'Game Boy Color (parche)', year: '2017', region: 'Kanto y Johto', format: 'Hack de fans · requiere parche', kind: 'hack', color: 'silver', mark: 'FAN', description: 'Proyecto de mundo abierto basado en Pokémon Cristal. Requiere un parche y una copia base compatible.' },
  { title: 'Pokémon Emerald Rogue', platform: 'Game Boy Advance (parche)', year: '2022', region: 'Hoenn (estilo roguelike)', format: 'Hack de fans · requiere parche', kind: 'hack', color: 'gold', mark: 'FAN', description: 'Reinterpreta la aventura de Hoenn con partidas de estilo roguelike. Requiere una copia base y un parche compatible.' }
];

const coverPokemon = {
  'Pokémon Rojo / Azul': [6, 9],
  'Pokémon Amarillo': [25],
  'Pokémon Oro / Plata / Cristal': [250, 249],
  'Pokémon Rubí / Zafiro': [383, 382],
  'Pokémon Rojo Fuego / Verde Hoja': [6, 3],
  'Pokémon Esmeralda': [384],
  'Pokémon Diamante / Perla': [483, 484],
  'Pokémon Platino': [487],
  'Pokémon HeartGold / SoulSilver': [250, 249],
  'Pokémon Negro / Blanco': [644, 643],
  'Pokémon Negro 2 / Blanco 2': [646],
  'Pokémon X / Y': [716, 717],
  'Pokémon Rubí Omega / Zafiro Alfa': [382, 383],
  'Pokémon Sol / Luna': [791, 792],
  'Pokémon Ultrasol / Ultraluna': [800],
  'Pokémon: Let’s Go, Pikachu! / Eevee!': [25, 133],
  'Pokémon Espada / Escudo': [888, 889],
  'Pokémon Diamante Brillante / Perla Reluciente': [483, 484],
  'Leyendas Pokémon: Arceus': [493],
  'Pokémon Escarlata / Púrpura': [1007, 1008],
  'Leyendas Pokémon: Z-A': [700],
  'Pokémon Unbound': [384],
  'Pokémon Radical Red': [6],
  'Pokémon Gaia': [384],
  'Pokémon Crystal Clear': [25],
  'Pokémon Emerald Rogue': [384]
};

const pokemonChoices = [
  'Pikachu', 'Charizard', 'Venusaur', 'Blastoise', 'Gengar', 'Dragonite',
  'Tyranitar', 'Gardevoir', 'Lucario', 'Garchomp', 'Rotom-Wash',
  'Corviknight', 'Dragapult', 'Tinkaton', 'Mimikyu', 'Eevee'
];

const typeNames = {
  normal: 'Normal', fire: 'Fuego', water: 'Agua', electric: 'Eléctrico',
  grass: 'Planta', ice: 'Hielo', fighting: 'Lucha', poison: 'Veneno',
  ground: 'Tierra', flying: 'Volador', psychic: 'Psíquico', bug: 'Bicho',
  rock: 'Roca', ghost: 'Fantasma', dragon: 'Dragón', dark: 'Siniestro',
  steel: 'Acero', fairy: 'Hada'
};
const statNames = {
  hp: 'PS', attack: 'Ataque', defense: 'Defensa',
  'special-attack': 'At. Esp.', 'special-defense': 'Def. Esp.', speed: 'Velocidad'
};
let supabaseClient = null;
let currentUser = null;
let currentRoomId = null;
let roomPollTimer = null;
let pokedexEntries = [];
let pokedexVisibleCount = 0;
let pokedexTypeFilterIds = null;
let pokedexRequestId = 0;

function getPlatformBadge(platform) {
  if (platform.includes('Game Boy Advance')) return 'GAME BOY ADVANCE';
  if (platform.includes('Game Boy Color')) return 'GAME BOY COLOR';
  if (platform.includes('Game Boy')) return 'GAME BOY';
  if (platform.includes('Nintendo DS')) return 'NINTENDO DS';
  if (platform.includes('Nintendo 3DS')) return 'NINTENDO 3DS';
  return 'NINTENDO SWITCH';
}

function showView(name) {
  if (!views.includes(name)) return;
  document.querySelectorAll('.view').forEach((view) => {
    view.classList.toggle('active', view.id === `view-${name}`);
  });
  document.querySelectorAll('.nav-link').forEach((link) => {
    const active = link.dataset.view === name;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  document.querySelector('#breadcrumb-current').textContent = viewLabels[name];
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', () => showView(link.dataset.view));
});

document.querySelectorAll('[data-go]').forEach((button) => {
  button.addEventListener('click', () => showView(button.dataset.go));
});

const gameGrid = document.querySelector('#game-grid');
const searchInput = document.querySelector('#game-search');
const emptyGames = document.querySelector('#empty-games');
const catalogCount = document.querySelector('#catalog-count');
let activeFilter = 'all';

function renderGames() {
  gameGrid.innerHTML = games.map((game, index) => `
    <article class="game-card" data-index="${index}" data-name="${game.title.toLocaleLowerCase('es')}" data-kind="${game.kind}">
      <button class="game-card-open" type="button" aria-label="Ver detalles de ${game.title}">
        <span class="game-cover">
          <img class="game-cover-bg" src="${createGameCover(game)}" alt="" aria-hidden="true">
          ${renderCoverPokemon(game)}
        </span>
        <div class="game-info">
          <div class="game-meta"><span>${game.kind === 'hack' ? 'ROM HACK' : game.year}</span><span>·</span><span>${game.region}</span></div>
          <h3>${game.title}</h3>
          <p>${game.platform}</p>
        </div>
        <span class="card-action">${game.kind === 'hack' ? 'Ver información del parche' : 'Ver opciones para jugar'} <span aria-hidden="true">→</span></span>
      </button>
    </article>
  `).join('');
  filterGames();
}

function renderCoverPokemon(game) {
  return (coverPokemon[game.title] || []).map((id, index) => `
    <img class="cover-pokemon cover-pokemon-${index + 1}" src="${getPokemonArtworkUrl(id)}" alt="" aria-hidden="true" loading="lazy">
  `).join('');
}

function getPokemonArtworkUrl(id) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

function escapeSvg(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;'
  })[character]);
}

function createGameCover(game) {
  const palettes = {
    coral: ['#ffb08d', '#db4e43', '#ffdf9a'],
    mint: ['#9de2b5', '#328d78', '#d2f3c6'],
    lavender: ['#c5b3ff', '#6555a9', '#eee1ff'],
    rose: ['#ffb4c9', '#a53865', '#ffe1a3'],
    gold: ['#ffe28a', '#c77a19', '#fff3bf'],
    silver: ['#d3deeb', '#566783', '#f4f6fb']
  };
  const [light, dark, accent] = palettes[game.color] || palettes.lavender;
  const title = escapeSvg(game.title);
  const platform = escapeSvg(getPlatformBadge(game.platform));
  const region = escapeSvg(`${game.year} · ${game.region.toLocaleUpperCase('es')}`);
  const mark = escapeSvg(game.mark);
  const kind = game.kind === 'hack' ? 'PROYECTO DE FANS' : 'AVENTURA';
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 290">
      <defs>
        <linearGradient id="background" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${light}"/><stop offset="1" stop-color="${dark}"/></linearGradient>
        <radialGradient id="aura"><stop stop-color="${accent}" stop-opacity=".96"/><stop offset="1" stop-color="${accent}" stop-opacity="0"/></radialGradient>
      </defs>
      <rect width="480" height="290" rx="18" fill="url(#background)"/>
      <path d="M66 235 145 125l58 57 77-111 102 164 48-57v87H66z" fill="#19233c" opacity=".18"/>
      <path d="M66 260 155 180l61 45 93-88 99 97 70-61v64H66z" fill="#fff" opacity=".12"/>
      <circle cx="356" cy="112" r="115" fill="url(#aura)"/>
      <circle cx="356" cy="112" r="64" fill="none" stroke="#fff" stroke-opacity=".62" stroke-width="2"/>
      <ellipse cx="356" cy="112" rx="104" ry="37" fill="none" stroke="#fff" stroke-opacity=".54" stroke-width="2" transform="rotate(-27 356 112)"/>
      <ellipse cx="356" cy="112" rx="91" ry="31" fill="none" stroke="#fff" stroke-opacity=".37" stroke-width="2" transform="rotate(32 356 112)"/>
      <path d="M292 112h128" stroke="#fff" stroke-opacity=".68" stroke-width="5"/>
      <circle cx="356" cy="112" r="20" fill="${accent}" stroke="#fff" stroke-width="7"/>
      <circle cx="356" cy="112" r="6" fill="#fff"/>
      <path d="M0 0h66v290H0z" fill="#fff" fill-opacity=".94"/>
      <path d="M0 0h66v14H0z" fill="${dark}"/>
      <text x="34" y="146" text-anchor="middle" transform="rotate(-90 34 146)" font-family="Arial,sans-serif" font-size="12" font-weight="800" letter-spacing="2" fill="#2c3042">${platform}</text>
      <text x="86" y="37" font-family="Arial,sans-serif" font-size="13" font-weight="800" letter-spacing="3" fill="#fff">POKÉMON</text>
      <text x="86" y="57" font-family="Arial,sans-serif" font-size="9" font-weight="700" letter-spacing="2" fill="#fff" fill-opacity=".88">${kind}</text>
      <text x="448" y="55" text-anchor="end" font-family="Arial,sans-serif" font-size="12" font-weight="800" fill="#fff">${mark}</text>
      <rect x="79" y="187" width="370" height="75" rx="9" fill="#152039" fill-opacity=".54"/>
      <text x="95" y="218" textLength="337" lengthAdjust="spacingAndGlyphs" font-family="Arial,sans-serif" font-size="20" font-weight="800" fill="#fff">${title}</text>
      <text x="96" y="242" font-family="Arial,sans-serif" font-size="10" font-weight="700" letter-spacing="1.5" fill="#fff" fill-opacity=".9">${region}</text>
      <path d="m429 22 5 11 11 5-11 5-5 11-5-11-11-5 11-5z" fill="#fff" fill-opacity=".78"/>
      <rect x="1" y="1" width="478" height="288" rx="17" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="2"/>
    </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function filterGames() {
  const search = searchInput.value.trim().toLocaleLowerCase('es');
  let visibleCount = 0;
  gameGrid.querySelectorAll('.game-card').forEach((card) => {
    const game = games[Number(card.dataset.index)];
    const matchesText = `${game.title} ${game.platform} ${game.region} ${game.year}`.toLocaleLowerCase('es').includes(search);
    const matchesFilter = activeFilter === 'all' || game.kind === activeFilter;
    const visible = matchesText && matchesFilter;
    card.hidden = !visible;
    if (visible) visibleCount += 1;
  });
  emptyGames.hidden = visibleCount > 0;
  catalogCount.textContent = `${visibleCount} ${visibleCount === 1 ? 'resultado' : 'resultados'}`;
}

function openGameDialog(game) {
  document.querySelector('#dialog-type').textContent = game.kind === 'hack'
    ? 'PROYECTO DE FANS · PARCHE'
    : 'JUEGO OFICIAL';
  document.querySelector('#dialog-title').textContent = game.title;
  document.querySelector('#dialog-description').textContent = game.description;
  document.querySelector('#dialog-platform').textContent = game.platform;
  document.querySelector('#dialog-year').textContent = game.year;
  document.querySelector('#dialog-region').textContent = game.region;
  document.querySelector('#dialog-format').textContent = game.format;
  const dialogArt = document.querySelector('#dialog-art');
  dialogArt.className = 'dialog-art';
  dialogArt.replaceChildren();
  const coverFrame = document.createElement('div');
  coverFrame.className = 'dialog-cover-frame';
  const cover = document.createElement('img');
  cover.className = 'dialog-cover-bg';
  cover.src = createGameCover(game);
  cover.alt = '';
  coverFrame.append(cover);
  const pokemonIds = coverPokemon[game.title] || [];
  pokemonIds.forEach((id, index) => {
    const pokemonImage = document.createElement('img');
    pokemonImage.className = `cover-pokemon cover-pokemon-${index + 1}`;
    pokemonImage.src = getPokemonArtworkUrl(id);
    pokemonImage.alt = '';
    pokemonImage.setAttribute('aria-hidden', 'true');
    coverFrame.append(pokemonImage);
  });
  dialogArt.append(coverFrame);

  const actions = document.querySelector('#dialog-actions');
  actions.replaceChildren();
  const downloadButton = document.createElement('button');
  downloadButton.className = 'button button-primary';
  downloadButton.type = 'button';
  downloadButton.textContent = 'Descargar';
  downloadButton.disabled = !game.download;
  downloadButton.title = game.download ? 'Descargar desde una distribución autorizada' : 'No hay una distribución autorizada configurada para este juego';
  if (game.download) downloadButton.addEventListener('click', () => downloadAuthorizedGame(game));
  actions.append(downloadButton);
  document.querySelector('#download-status').textContent = game.download
    ? 'Se abrirá el selector de ubicación antes de comenzar la descarga.'
    : 'Descarga no disponible: este título no tiene una fuente de distribución autorizada configurada.';
  if (game.kind === 'hack') {
    actions.append(makeLink('Guía para aplicar parches', 'https://www.romhacking.net/patch/', 'button button-outline'));
    document.querySelector('#dialog-footnote').textContent = 'Los ROM hacks requieren una copia base legítima. No se descargan ROMs ni parches desde esta app.';
  } else {
    document.querySelector('#dialog-footnote').textContent = 'Las descargas solo estarán habilitadas para distribuciones autorizadas por sus creadores. Las copias comerciales no están disponibles en PokeLauncher.';
  }
  document.querySelector('#game-dialog').showModal();
}

async function downloadAuthorizedGame(game) {
  const download = game.download;
  if (!download || !download.url || !Array.isArray(download.allowedHosts)) return;
  const source = new URL(download.url);
  if (source.protocol !== 'https:' || !download.allowedHosts.includes(source.hostname)) {
    document.querySelector('#download-status').textContent = 'Descarga bloqueada: la fuente no coincide con los dominios autorizados.';
    return;
  }
  let fileHandle;
  try {
    if (window.showSaveFilePicker) {
      fileHandle = await window.showSaveFilePicker({
        suggestedName: download.filename || `${slugifyPokemon(game.title)}.zip`
      });
    } else {
      document.querySelector('#download-status').textContent = 'Tu navegador no permite elegir una ruta personalizada. Usa la opción de descarga del navegador.';
      const link = document.createElement('a');
      link.href = source.href;
      link.download = download.filename || '';
      link.rel = 'noopener noreferrer';
      link.click();
      return;
    }

    document.querySelector('#download-status').textContent = 'Descargando desde la fuente autorizada…';
    const response = await fetch(source.href, { redirect: 'error' });
    if (!response.ok || !response.body) throw new Error(`El servidor respondió ${response.status}.`);
    const finalUrl = new URL(response.url);
    if (finalUrl.hostname !== source.hostname) throw new Error('El servidor redirigió fuera del dominio autorizado.');

    const writable = await fileHandle.createWritable();
    await response.body.pipeTo(writable);
    document.querySelector('#download-status').textContent = 'Descarga completada en la ubicación elegida.';
  } catch (error) {
    if (error.name === 'AbortError') {
      document.querySelector('#download-status').textContent = 'Descarga cancelada.';
      return;
    }
    document.querySelector('#download-status').textContent = `No se pudo completar la descarga: ${error.message}`;
  }
}

function makeLink(label, href, className) {
  const link = document.createElement('a');
  link.className = className;
  link.href = href;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.textContent = label;
  return link;
}

gameGrid.addEventListener('click', (event) => {
  const card = event.target.closest('.game-card');
  if (card) openGameDialog(games[Number(card.dataset.index)]);
});

searchInput.addEventListener('input', filterGames);
document.querySelectorAll('.filter-chip').forEach((button) => {
  button.addEventListener('click', () => {
    activeFilter = button.dataset.filter;
    document.querySelectorAll('.filter-chip').forEach((chip) => {
      const active = chip === button;
      chip.classList.toggle('selected', active);
      chip.setAttribute('aria-pressed', String(active));
    });
    filterGames();
  });
  button.setAttribute('aria-pressed', String(button.classList.contains('selected')));
});

document.addEventListener('keydown', (event) => {
  if (event.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
    event.preventDefault();
    showView('games');
    searchInput.focus();
  }
  if (event.key === 'Escape' && document.activeElement === searchInput) {
    searchInput.value = '';
    filterGames();
    searchInput.blur();
  }
});

document.querySelector('#game-file').addEventListener('change', (event) => {
  const [file] = event.target.files;
  if (!file) return;
  document.querySelector('#selected-file-name').textContent = file.name;
  const size = file.size < 1024 * 1024
    ? `${Math.max(1, Math.round(file.size / 1024))} KB`
    : `${(file.size / (1024 * 1024)).toFixed(1)} MB`;
  document.querySelector('#selected-file-detail').textContent = `${size} · Solo se muestra en esta sesión; no se carga a ningún servidor.`;
  document.querySelector('#selected-file-card').hidden = false;
});

function createPokemonOptions(selected) {
  return ['<option value="">— Sin seleccionar —</option>', ...pokemonChoices.map((name) =>
    `<option value="${name}"${name === selected ? ' selected' : ''}>${name}</option>`
  )].join('');
}

function readSavedTeam() {
  const defaults = { teamName: '', playerName: '', members: Array(6).fill(null).map(() => ({ species: '', moves: '' })) };
  try {
    const saved = localStorage.getItem(TEAM_STORAGE_KEY);
    if (!saved) return defaults;
    const parsed = JSON.parse(saved);
    if (!parsed || !Array.isArray(parsed.members)) throw new Error('El formato guardado no es válido.');
    return {
      teamName: typeof parsed.teamName === 'string' ? parsed.teamName : '',
      playerName: typeof parsed.playerName === 'string' ? parsed.playerName : '',
      members: Array.from({ length: 6 }, (_, index) => ({
        species: pokemonChoices.includes(parsed.members[index]?.species) ? parsed.members[index].species : '',
        moves: typeof parsed.members[index]?.moves === 'string' ? parsed.members[index].moves : ''
      }))
    };
  } catch (error) {
    document.querySelector('#team-status').textContent = `No se pudo leer el equipo guardado: ${error.message}`;
    return defaults;
  }
}

let teamState = readSavedTeam();

function renderTeam() {
  document.querySelector('#team-name').value = teamState.teamName;
  document.querySelector('#player-name').value = teamState.playerName;
  document.querySelector('#team-grid').innerHTML = teamState.members.map((member, index) => `
    <fieldset class="team-slot" data-slot="${index}">
      <legend>Pokémon ${index + 1}</legend>
      <label>Especie<select class="member-species">${createPokemonOptions(member.species)}</select></label>
      <label>Movimientos<textarea class="member-moves" rows="2" maxlength="160" placeholder="Un movimiento por línea">${escapeHtml(member.moves)}</textarea></label>
    </fieldset>
  `).join('');
}

function saveTeam() {
  teamState.teamName = document.querySelector('#team-name').value.trim();
  teamState.playerName = document.querySelector('#player-name').value.trim();
  teamState.members = [...document.querySelectorAll('.team-slot')].map((slot) => ({
    species: slot.querySelector('.member-species').value,
    moves: slot.querySelector('.member-moves').value.trim()
  }));
  try {
    localStorage.setItem(TEAM_STORAGE_KEY, JSON.stringify(teamState));
    document.querySelector('#team-status').textContent = 'Equipo guardado en este navegador.';
  } catch (error) {
    document.querySelector('#team-status').textContent = `No se pudo guardar el equipo: ${error.message}`;
  }
}

document.querySelector('#team-grid').addEventListener('change', saveTeam);
document.querySelector('#team-grid').addEventListener('input', saveTeam);
document.querySelector('#team-name').addEventListener('input', saveTeam);
document.querySelector('#player-name').addEventListener('input', saveTeam);

function getBattleTeam() {
  saveTeam();
  return teamState.members.filter((member) => member.species).map((member) => ({
    species: member.species,
    moves: member.moves.split(/\r?\n/).map((move) => move.trim()).filter(Boolean).slice(0, 4)
  }));
}

function setAuthStatus(message) {
  document.querySelector('#auth-status').textContent = message;
}

function setRoomStatus(message) {
  document.querySelector('#room-status').textContent = message;
}

function setBattleControls(enabled) {
  document.querySelectorAll('.battle-move').forEach((button) => { button.disabled = !enabled; });
}

function getSupabaseConfig() {
  try {
    const stored = JSON.parse(localStorage.getItem(SUPABASE_CONFIG_KEY) || 'null');
    return stored && typeof stored.url === 'string' && typeof stored.anonKey === 'string' ? stored : null;
  } catch (error) {
    setAuthStatus(`No se pudo leer la configuración guardada: ${error.message}`);
    return null;
  }
}

function initializeSupabase(url, anonKey) {
  if (!window.supabase?.createClient) {
    setAuthStatus('No se pudo cargar el cliente de Supabase. Comprueba tu conexión e inténtalo de nuevo.');
    return false;
  }
  try {
    const parsedUrl = new URL(url);
    if (!['https:', 'http:'].includes(parsedUrl.protocol) || !anonKey.trim()) {
      throw new Error('Introduce una URL válida y la clave pública anon.');
    }
    supabaseClient = window.supabase.createClient(parsedUrl.origin, anonKey.trim());
    document.querySelector('#supabase-url').value = parsedUrl.origin;
    document.querySelector('#supabase-anon-key').value = anonKey.trim();
    localStorage.setItem(SUPABASE_CONFIG_KEY, JSON.stringify({ url: parsedUrl.origin, anonKey: anonKey.trim() }));
    setAuthStatus('Proyecto conectado. Inicia sesión o crea una cuenta.');
    supabaseClient.auth.getSession().then(({ data, error }) => {
      if (error) setAuthStatus(`No se pudo verificar la sesión: ${error.message}`);
      else updateAuthState(data.session?.user || null);
    }).catch((error) => setAuthStatus(`Error de autenticación: ${error.message}`));
    supabaseClient.auth.onAuthStateChange((_event, session) => updateAuthState(session?.user || null));
    return true;
  } catch (error) {
    setAuthStatus(`Configuración no válida: ${error.message}`);
    return false;
  }
}

function updateAuthState(user) {
  currentUser = user;
  const isLoggedIn = Boolean(user);
  document.querySelector('#auth-email').disabled = isLoggedIn;
  document.querySelector('#auth-password').disabled = isLoggedIn;
  document.querySelector('#sign-in').hidden = isLoggedIn;
  document.querySelector('#sign-up').hidden = isLoggedIn;
  document.querySelector('#sign-out').hidden = !isLoggedIn;
  document.querySelector('#create-room').disabled = !isLoggedIn;
  document.querySelector('#room-code').disabled = !isLoggedIn;
  document.querySelector('#join-room-form button').disabled = !isLoggedIn;
  setAuthStatus(isLoggedIn ? `Sesión iniciada: ${user.email}` : 'No has iniciado sesión.');
}

async function authenticate(mode) {
  if (!supabaseClient) {
    setAuthStatus('Conecta primero un proyecto Supabase.');
    return;
  }
  const email = document.querySelector('#auth-email').value.trim();
  const password = document.querySelector('#auth-password').value;
  if (!email || password.length < 8) {
    setAuthStatus('Introduce un correo y una contraseña de al menos 8 caracteres.');
    return;
  }
  setAuthStatus('Procesando autenticación…');
  try {
    const result = mode === 'signup'
      ? await supabaseClient.auth.signUp({ email, password })
      : await supabaseClient.auth.signInWithPassword({ email, password });
    if (result.error) {
      setAuthStatus(`No se pudo ${mode === 'signup' ? 'crear la cuenta' : 'iniciar sesión'}: ${result.error.message}`);
    } else if (mode === 'signup' && !result.data.session) {
      setAuthStatus('Cuenta creada. Revisa tu correo para confirmar la dirección antes de iniciar sesión.');
    } else {
      updateAuthState(result.data.user);
    }
  } catch (error) {
    setAuthStatus(`Error de autenticación: ${error.message}`);
  }
}

document.querySelector('#connect-supabase').addEventListener('click', () => {
  initializeSupabase(
    document.querySelector('#supabase-url').value.trim(),
    document.querySelector('#supabase-anon-key').value
  );
});
document.querySelector('#sign-in').addEventListener('click', () => authenticate('signin'));
document.querySelector('#sign-up').addEventListener('click', () => authenticate('signup'));
document.querySelector('#sign-out').addEventListener('click', async () => {
  if (!supabaseClient) return;
  const { error } = await supabaseClient.auth.signOut();
  if (error) setAuthStatus(`No se pudo cerrar sesión: ${error.message}`);
  else {
    stopRoomPolling();
    currentRoomId = null;
    document.querySelector('#room-card').hidden = true;
    updateAuthState(null);
  }
});

async function createBattleRoom() {
  if (!supabaseClient || !currentUser) {
    setRoomStatus('Conecta Supabase e inicia sesión para crear una sala.');
    return;
  }
  const team = getBattleTeam();
  if (!team.length) {
    setRoomStatus('Selecciona al menos un Pokémon en tu equipo antes de crear la sala.');
    return;
  }
  setRoomStatus('Creando sala…');
  const { data, error } = await supabaseClient.rpc('create_battle_room', { p_team: team });
  if (error) {
    setRoomStatus(`No se pudo crear la sala: ${error.message}`);
    return;
  }
  currentRoomId = data.room_id;
  document.querySelector('#room-code-display').textContent = data.room_code;
  document.querySelector('#room-card').hidden = false;
  setRoomStatus('Comparte este código con tu rival. La sala empezará cuando se una.');
  await refreshBattleRoom();
}

async function joinBattleRoom(event) {
  event.preventDefault();
  if (!supabaseClient || !currentUser) {
    setRoomStatus('Conecta Supabase e inicia sesión para unirte a una sala.');
    return;
  }
  const team = getBattleTeam();
  if (!team.length) {
    setRoomStatus('Selecciona al menos un Pokémon en tu equipo antes de unirte.');
    return;
  }
  const code = document.querySelector('#room-code').value.trim().toUpperCase();
  if (!/^[A-F0-9]{8}$/.test(code)) {
    setRoomStatus('El código debe tener 8 caracteres hexadecimales.');
    return;
  }
  setRoomStatus('Buscando sala…');
  const { data, error } = await supabaseClient.rpc('join_battle_room', { p_room_code: code, p_team: team });
  if (error) {
    setRoomStatus(`No se pudo unir a la sala: ${error.message}`);
    return;
  }
  currentRoomId = data;
  document.querySelector('#room-code-display').textContent = code;
  document.querySelector('#room-card').hidden = false;
  setRoomStatus('Te uniste a la sala. ¡Que comience el duelo!');
  await refreshBattleRoom();
}

async function refreshBattleRoom() {
  if (!supabaseClient || !currentRoomId) return;
  const { data, error } = await supabaseClient.from('battle_rooms')
    .select('id, code, host_id, guest_id, status, state')
    .eq('id', currentRoomId)
    .single();
  if (error) {
    setRoomStatus(`No se pudo actualizar la sala: ${error.message}`);
    return;
  }
  document.querySelector('#room-code-display').textContent = data.code;
  document.querySelector('#room-state').textContent = data.status === 'waiting'
    ? 'Esperando a otro entrenador…'
    : data.status === 'active' ? `Turno ${data.state.turn}` : 'Duelo finalizado.';
  if (data.status !== 'waiting') {
    const myTeamKey = data.host_id === currentUser?.id ? 'host_team' : 'guest_team';
    const rivalTeamKey = myTeamKey === 'host_team' ? 'guest_team' : 'host_team';
    const myTeam = data.state[myTeamKey] || [];
    const rivalTeam = data.state[rivalTeamKey] || [];
    document.querySelector('#battle-score').textContent = `Energía: ${data.state.hp_host} – ${data.state.hp_guest}`;
    document.querySelector('#battle-team').textContent = `Tu equipo: ${myTeam.map(({ species }) => species).join(', ')} · Rival: ${rivalTeam.map(({ species }) => species).join(', ')}`;
  } else {
    document.querySelector('#battle-score').textContent = '';
    document.querySelector('#battle-team').textContent = '';
  }
  document.querySelector('#battle-log').textContent = (data.state.log || []).join('\n');
  const isMyTurn = data.status === 'active' && data.state.current_player === currentUser?.id;
  setBattleControls(isMyTurn);
  if (data.status === 'active') setRoomStatus(isMyTurn ? 'Es tu turno.' : 'Esperando el movimiento de tu rival.');
  if (data.status === 'finished') {
    const winner = data.state.winner_id === currentUser?.id ? '¡Ganaste!' : 'El duelo ha terminado.';
    setRoomStatus(winner);
    stopRoomPolling();
  }
}

async function playBattleMove(move) {
  if (!supabaseClient || !currentRoomId || !currentUser) return;
  setBattleControls(false);
  const { error } = await supabaseClient.rpc('play_battle_turn', { p_room_id: currentRoomId, p_move: move });
  if (error) {
    setRoomStatus(`No se pudo registrar el movimiento: ${error.message}`);
    setBattleControls(true);
    return;
  }
  await refreshBattleRoom();
}

function startRoomPolling() {
  stopRoomPolling();
  roomPollTimer = window.setInterval(() => {
    refreshBattleRoom().catch((error) => setRoomStatus(`Error al consultar la sala: ${error.message}`));
  }, 2500);
}

function stopRoomPolling() {
  if (roomPollTimer !== null) window.clearInterval(roomPollTimer);
  roomPollTimer = null;
}

document.querySelector('#create-room').addEventListener('click', async () => {
  try {
    await createBattleRoom();
    if (currentRoomId) startRoomPolling();
  } catch (error) {
    setRoomStatus(`Error al crear sala: ${error.message}`);
  }
});
document.querySelector('#join-room-form').addEventListener('submit', async (event) => {
  try {
    await joinBattleRoom(event);
    if (currentRoomId) startRoomPolling();
  } catch (error) {
    setRoomStatus(`Error al unirse: ${error.message}`);
  }
});
document.querySelectorAll('.battle-move').forEach((button) => {
  button.addEventListener('click', () => playBattleMove(button.dataset.move).catch((error) => setRoomStatus(`Error de batalla: ${error.message}`)));
});

function slugifyPokemon(value) {
  return value.toLocaleLowerCase('en').replace(/♀/g, '-f').replace(/♂/g, '-m').replace(/[.'’]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

async function fetchPokeApi(path) {
  const response = await fetch(`${POKEAPI_URL}${path}`);
  if (!response.ok) throw new Error(`PokéAPI respondió ${response.status}.`);
  return response.json();
}

function getTypeDamageMultipliers(typeDetails) {
  const multipliers = new Map(Object.keys(typeNames).map((type) => [type, 1]));
  typeDetails.forEach((type) => {
    type.damage_relations.double_damage_from.forEach(({ name }) => multipliers.set(name, (multipliers.get(name) ?? 1) * 2));
    type.damage_relations.half_damage_from.forEach(({ name }) => multipliers.set(name, (multipliers.get(name) ?? 1) * 0.5));
    type.damage_relations.no_damage_from.forEach(({ name }) => multipliers.set(name, 0));
  });
  return [...multipliers.entries()].filter(([, multiplier]) => multiplier !== 1);
}

function formatPokemonName(name) {
  return name.split('-').map((part) => part ? `${part[0].toLocaleUpperCase('es')}${part.slice(1)}` : '').join(' ');
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[character]);
}

function recommendTraining(stats) {
  const values = Object.fromEntries(stats.map((stat) => [stat.stat.name, stat.base_stat]));
  const physical = values.attack >= values['special-attack'];
  const defensive = Math.max(values.defense, values['special-defense']) >= Math.max(values.attack, values['special-attack']);
  const nature = defensive
    ? values.defense >= values['special-defense'] ? 'Agitada (+Defensa, −At. Esp.)' : 'Serena (+Def. Esp., −Ataque)'
    : physical ? 'Alegre (+Velocidad, −At. Esp.)' : 'Miedosa (+Velocidad, −Ataque)';
  const evPlan = defensive
    ? '252 PS · 252 Defensa · 4 Def. Esp.'
    : `252 ${physical ? 'Ataque' : 'At. Esp.'} · 252 Velocidad · 4 PS`;
  const ivPlan = physical ? '31 en PS, Ataque, defensas y Velocidad; At. Esp. puede ser 0.' : '31 en PS, At. Esp., defensas y Velocidad; Ataque puede ser 0.';
  return { nature, evPlan, ivPlan };
}

function renderPokedexList() {
  const search = document.querySelector('#pokedex-search').value.trim().toLowerCase();
  const visible = pokedexEntries.filter((entry) => {
    const matchSearch = entry.name.includes(search) || formatPokemonName(entry.name).toLowerCase().includes(search);
    const matchType = !pokedexTypeFilterIds || pokedexTypeFilterIds.has(entry.id);
    return matchSearch && matchType;
  });
  const shown = visible.slice(0, pokedexVisibleCount);
  document.querySelector('#pokedex-count').textContent = `${visible.length} Pokémon · mostrando ${shown.length}`;
  document.querySelector('#pokedex-list').innerHTML = shown.map((entry) => `
    <button class="pokedex-row" type="button" data-pokemon-id="${entry.id}">
      <span class="pokedex-number">#${String(entry.id).padStart(4, '0')}</span>
      <img class="pokedex-sprite" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${entry.id}.png" alt="" loading="lazy">
      <span class="pokedex-name">${escapeHtml(formatPokemonName(entry.name))}</span><span class="pokedex-arrow">→</span>
    </button>
  `).join('');
  document.querySelector('#pokedex-more').hidden = shown.length >= visible.length;
  if (!visible.length && pokedexEntries.length) {
    document.querySelector('#pokedex-list').innerHTML = '<p class="empty-state">No encontramos Pokémon con esos filtros.</p>';
  }
}

async function loadPokemonDetail(id) {
  const requestId = ++pokedexRequestId;
  const detail = document.querySelector('#pokedex-detail');
  detail.innerHTML = '<div class="pokedex-placeholder"><h2>Cargando ficha…</h2><p>Consultando datos y efectividades.</p></div>';
  try {
    const pokemon = await fetchPokeApi(`/pokemon/${id}`);
    const species = await fetchPokeApi(`/pokemon-species/${id}`);
    const types = await Promise.all(pokemon.types.map(({ type }) => fetchPokeApi(`/type/${type.name}`)));
    if (requestId !== pokedexRequestId) return;
    const localizedName = species.names.find(({ language }) => language.name === 'es')?.name || formatPokemonName(pokemon.name);
    const multipliers = getTypeDamageMultipliers(types);
    const grouped = {
      '4': multipliers.filter(([, value]) => value === 4),
      '2': multipliers.filter(([, value]) => value === 2),
      '0.5': multipliers.filter(([, value]) => value === 0.5),
      '0.25': multipliers.filter(([, value]) => value === 0.25),
      '0': multipliers.filter(([, value]) => value === 0)
    };
    const training = recommendTraining(pokemon.stats);
    const abilities = pokemon.abilities.map(({ ability, is_hidden }) => `${formatPokemonName(ability.name)}${is_hidden ? ' (oculta)' : ''}`).join(' · ');
    const flavor = species.flavor_text_entries.find(({ language, version }) => language.name === 'es' && version.name === 'scarlet')
      || species.flavor_text_entries.find(({ language }) => language.name === 'es');
    const statsHtml = pokemon.stats.map(({ stat, base_stat }) => `
      <div class="stat-row"><span>${statNames[stat.name] || formatPokemonName(stat.name)}</span><div class="stat-track"><i style="width:${Math.min(100, base_stat / 2.55)}%"></i></div><strong>${base_stat}</strong></div>
    `).join('');
    const typeHtml = (items) => items.map(([name]) => `<span class="type-tag type-${escapeHtml(name)}">${escapeHtml(typeNames[name] || name)}</span>`).join('') || '<span class="no-type-effect">—</span>';
    const offensiveTypes = [...new Set(types.flatMap((type) => type.damage_relations.double_damage_to.map(({ name }) => name)))];
    const speciesSlug = slugifyPokemon(pokemon.name);
    const sprite = pokemon.sprites.front_default || '';
    const artwork = pokemon.sprites.other?.['official-artwork']?.front_default || sprite;
    detail.innerHTML = `
      <div class="pokedex-detail-head"><div class="pokedex-artmark">${artwork ? `<img src="${escapeHtml(artwork)}" alt="${escapeHtml(localizedName)}" loading="lazy">` : `#${String(pokemon.id).padStart(3, '0')}`}</div><div><span class="file-label">POKÉMON #${pokemon.id}</span><h2>${escapeHtml(localizedName)}</h2><div class="pokemon-types">${pokemon.types.map(({ type }) => `<span class="type-tag type-${escapeHtml(type.name)}">${escapeHtml(typeNames[type.name] || type.name)}</span>`).join('')}</div></div></div>
      ${flavor ? `<p class="pokedex-flavor">${escapeHtml(flavor.flavor_text.replace(/\s+/g, ' '))}</p>` : ''}
      <h3>Estadísticas base</h3><div class="stats-list">${statsHtml}</div>
      <div class="pokemon-measures"><span>Altura: <strong>${(pokemon.height / 10).toFixed(1)} m</strong></span><span>Peso: <strong>${(pokemon.weight / 10).toFixed(1)} kg</strong></span></div>
      <h3>Ventajas ofensivas</h3><div class="pokemon-types">${typeHtml(offensiveTypes.map((name) => [name, 2]))}</div>
      <h3>Habilidades</h3><p class="pokedex-copy">${escapeHtml(abilities)}</p>
      <h3>Efectividad defensiva</h3><div class="effect-grid">
        <div><strong>Muy débil ×4</strong><p>${typeHtml(grouped['4'])}</p></div>
        <div><strong>Débil ×2</strong><p>${typeHtml(grouped['2'])}</p></div>
        <div><strong>Resiste ×½</strong><p>${typeHtml(grouped['0.5'])}</p></div>
        <div><strong>Resiste ×¼</strong><p>${typeHtml(grouped['0.25'])}</p></div>
        <div><strong>Inmune ×0</strong><p>${typeHtml(grouped['0'])}</p></div>
      </div>
      <h3>Orientación de entrenamiento</h3><div class="training-card"><p><strong>Naturaleza sugerida:</strong> ${training.nature}</p><p><strong>EV sugeridos:</strong> ${training.evPlan}</p><p><strong>IV sugeridos:</strong> ${training.ivPlan}</p><small>Propuesta general basada en estadísticas base; el rol, habilidad, formato y estrategia pueden cambiarla.</small></div>
      <a class="resource-link smogon-link" href="https://www.smogon.com/dex/sv/pokemon/${encodeURIComponent(speciesSlug)}/" target="_blank" rel="noopener noreferrer">Consultar análisis comunitario en Smogon ↗</a>
    `;
    const detailSprite = detail.querySelector('.pokedex-artmark img');
    if (detailSprite) {
      detailSprite.addEventListener('error', () => {
        if (sprite && detailSprite.src !== sprite) detailSprite.src = sprite;
        else detailSprite.hidden = true;
      }, { once: true });
    }
  } catch (error) {
    if (requestId !== pokedexRequestId) return;
    detail.innerHTML = `<div class="pokedex-placeholder"><h2>No se pudo cargar la ficha</h2><p>${error.message}</p><button class="button button-outline" id="retry-pokemon" type="button">Reintentar</button></div>`;
    document.querySelector('#retry-pokemon').addEventListener('click', () => loadPokemonDetail(id));
  }
}

async function loadPokedex() {
  try {
    const [list, types] = await Promise.all([
      fetchPokeApi('/pokemon?limit=1025'),
      fetchPokeApi('/type')
    ]);
    pokedexEntries = list.results.map((entry) => ({
      id: Number(entry.url.match(/\/pokemon\/(\d+)\/?$/)?.[1]),
      name: entry.name
    })).filter((entry) => Number.isInteger(entry.id) && entry.id <= 1025);
    pokedexVisibleCount = 60;
    const typeSelect = document.querySelector('#pokedex-type');
    types.results.filter(({ name }) => typeNames[name]).forEach(({ name }) => {
      const option = document.createElement('option');
      option.value = name;
      option.textContent = typeNames[name];
      typeSelect.append(option);
    });
    document.querySelector('#pokedex-status').textContent = 'Datos servidos por PokéAPI.';
    renderPokedexList();
  } catch (error) {
    document.querySelector('#pokedex-status').textContent = `No se pudo cargar el catálogo: ${error.message}`;
    document.querySelector('#pokedex-count').textContent = 'Pokédex no disponible.';
  }
}

document.querySelector('#pokedex-search').addEventListener('input', () => {
  pokedexVisibleCount = 60;
  renderPokedexList();
});
document.querySelector('#pokedex-type').addEventListener('change', async (event) => {
  pokedexVisibleCount = 60;
  pokedexTypeFilterIds = null;
  if (event.target.value) {
    try {
      const type = await fetchPokeApi(`/type/${event.target.value}`);
      pokedexTypeFilterIds = new Set(type.pokemon.map(({ pokemon }) => Number(pokemon.url.match(/\/pokemon\/(\d+)\/?$/)?.[1])));
      renderPokedexList();
    } catch (error) {
      document.querySelector('#pokedex-status').textContent = `No se pudo filtrar por tipo: ${error.message}`;
    }
  } else {
    renderPokedexList();
  }
});
document.querySelector('#pokedex-more').addEventListener('click', () => {
  pokedexVisibleCount += 60;
  renderPokedexList();
});
document.querySelector('#pokedex-list').addEventListener('click', (event) => {
  const row = event.target.closest('[data-pokemon-id]');
  if (row) loadPokemonDetail(row.dataset.pokemonId);
});
document.querySelector('#pokedex-list').addEventListener('error', (event) => {
  if (event.target.matches('.pokedex-sprite')) event.target.hidden = true;
}, true);

const savedSupabaseConfig = getSupabaseConfig();
if (savedSupabaseConfig) initializeSupabase(savedSupabaseConfig.url, savedSupabaseConfig.anonKey);
else {
  document.querySelector('#create-room').disabled = true;
  document.querySelector('#room-code').disabled = true;
  document.querySelector('#join-room-form button').disabled = true;
}

renderGames();
renderTeam();
loadPokedex();
