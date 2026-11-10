# PokeLauncher

Administrador y emulación de juegos Pokémon.

PokeLauncher es una interfaz web estática en español para descubrir juegos Pokémon, organizar referencias a juegos propios, preparar RetroArch, consultar una Pokédex y jugar duelos online propios.

## Iniciar

Para explorar el catálogo y la Pokédex, abre `index.html` en un navegador moderno con conexión a internet. La Pokédex consulta PokéAPI.

Para habilitar cuentas y salas online, sirve la carpeta desde un origen local (por ejemplo, `py -m http.server 8000`) y abre `http://localhost:8000`. Crea un proyecto Supabase, ejecuta `supabase-setup.sql` en el SQL Editor del proyecto y configura en PokeLauncher la URL del proyecto y su clave pública `anon`. **No uses la clave `service_role` en el navegador.** Si activas confirmación de correo en Supabase, configura la URL de retorno local en la autenticación del proyecto.

## Funciones

- Catálogo curado de títulos oficiales y algunos ROM hacks, con búsqueda, filtros y datos de consola, año y región.
- Fichas con enlaces a tiendas oficiales para juegos comerciales e información sobre parches de fans.
- Selección local de archivos propios desde el catálogo o la biblioteca.
- Selección local de un archivo para mostrarlo en la biblioteca durante la sesión actual.
- Enlaces a las descargas y guías oficiales de RetroArch.
- Pokédex consultada desde PokéAPI, con tipos, estadísticas, efectividad defensiva, orientación general EV/IV y enlaces a Smogon.
- Sprites y arte oficial de los Pokémon servidos por el repositorio de sprites de PokéAPI.
- Registro e inicio de sesión con Supabase Auth, creación/unión de salas con código y un prototipo de combate por turnos.

## Límites

El catálogo contiene títulos representativos de la serie principal y cinco proyectos de fans; no es un inventario completo de todos los juegos, spin-offs o hacks existentes. Las tarjetas utilizan portadas gráficas originales, no escaneos de carátulas comerciales. PokeLauncher no indexa ni descarga ROMs comerciales desde sitios no oficiales, ni distribuye ROMs, parches, BIOS, firmware o juegos. El menú permite seleccionar un archivo local propio; la selección no lo ejecuta ni lo envía a un servidor. Los hacks requieren una copia base legítima y un parche del creador; revisa siempre los requisitos del proyecto.

La selección de un archivo en la biblioteca no lo ejecuta ni lo carga a un servidor; para jugar, abre el archivo desde RetroArch y configura un núcleo compatible. La instalación automática de núcleos y la emulación directa en navegador no están disponibles en esta versión.

El módulo online es un prototipo: implementa cuentas, salas privadas y turnos con reglas simplificadas; no es un simulador competitivo completo ni implementa todas las mecánicas oficiales. La contraseña se gestiona mediante Supabase Auth. Los equipos se guardan en el navegador; el backend conserva las copias enviadas a una sala. La Pokédex presenta sugerencias generales derivadas de estadísticas base, no sets competitivos personalizados. Los análisis de Smogon se enlazan, no se copian.
