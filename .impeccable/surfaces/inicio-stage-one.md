# Inicio — etapa 1

Scope: navegación y #inicio del portafolio existente. Modo Experience. Se preservan TM, fuentes, tokens azules, temas y todas las secciones posteriores. Implementación directa en React, sin comp generada ni nueva identidad visual.

## Direction contract

THESIS: José Antonio y su trabajo de desarrollo se presentan juntos: nombre profesional dominante, retrato real y perfil JSON traducible. La secuencia establece un orden de lectura sin retrasar las acciones.

OWN-WORLD: Portfolio Sans, paleta azul existente, superficies planas claras y oscuras. Foto sin filtros, cordón ni marcos decorativos. Código auténtico con Consolas. Sin métricas comerciales ni contenido tomado de Nuance.

STORY: reconocer al autor y su nivel Junior, entender su formación y enfoque, consultar currículum o contactar. GitHub queda como vía secundaria.

FIRST VIEWPORT: escritorio con nombre en dos líneas a la izquierda y foto sobre código a la derecha. Rol, disponibilidad y formación agrupados; frase dinámica menor, descripción de hasta tres líneas y acciones. Móvil coloca las acciones antes del retrato para que sean accesibles sin recorrer toda la imagen y el código.

FORM: ampliación del sistema existente con dirección fijada por el usuario y referencia Nuance. No se sortea una nueva identidad. El cargador Impeccable falló por motor no disponible; contexto leído directamente. Entrada por dos líneas con Motion, desfases de 75 ms, grupos CSS parcialmente solapados y recorte de foto sin escala. Se reutiliza el reloj existente de Motion/Lenis. La indicación de continuar se desplaza 5 px con scroll CSS donde se admite.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Evidence and limits

- Nuance se abrió en Chrome y se capturó en `.tmp/stage1/reference.png`; HTML adjunto inspeccionado con JSDOM. Se observaron spans por carácter, siete marcadores `data-framer-appear-id`, recortes y transformaciones. Los tiempos propios se eligieron para TM; no se atribuyen tiempos exactos a la referencia.
- Foto original preexistente `public/profesionaltony.jpg`, 1200 × 1600. Archivo sin cambios; solo recorte CSS. Su detalle facial y compresión limitan el resultado en pantallas de alta densidad.
- `site.resumeHref` continúa en `#inicio`; el proyecto no contiene un destino definitivo confirmado para el currículum. No se inventa un documento ni se promete descarga.
- No se encontró AGENTS.md en el proyecto ni en sus directorios superiores. Se leyeron las habilidades instaladas.
- Los estilos globales y el código desde Proyectos en adelante se comparan contra la copia previa; deben permanecer idénticos.
- Capturas finales: `docs/screenshots/stage1/`, escritorio y móvil, ES/EN, claro/oscuro. Mediciones de navegador y verificaciones funcionales: `.tmp/stage1/validation.json`.

## Documentation boundary

DESIGN.md y `.impeccable/design.json` se preservan: no se ha rediseñado el sistema completo. Esta nota registra únicamente los cambios locales y la diferencia respecto al retrato antiguo documentado allí.

## Final verification

Revisión independiente del inicio: `disposition: ship`, sin correcciones materiales pendientes en este alcance. Las ocho capturas se inspeccionaron; tres se recapturaron esperando fuentes y pintura de la ventana porque la primera captura omitía partes del CTA. Código sin cambios durante esa recaptura.

TypeScript, build de producción y ESLint pasaron. Lint de taste-skill sobre los estilos y el componente nuevos: 0 FAIL, 0 WARN. Matriz de navegador: 1440/390 px, ES/EN, claro/oscuro; 320/768 px con movimiento reducido. Se verificaron bienvenida al recargar, navegación de teclado y menú con Enter/Escape, tamaño estable del typewriter, foto sin transformaciones/filtros al finalizar, código traducido y ausencia de overflow. Comparación exacta confirmó intactos portfolio.css, el código desde Proyectos y el archivo fotográfico original. El motor/detector Impeccable no estuvo disponible; no se declara haberlo ejecutado con éxito.

## Local implementation record

- `src/hero-stage-one.css` se carga después de `src/portfolio.css`. La ampliación conserva las variables de tema y Portfolio Sans; ajusta solo cabecera e inicio. El nombre usa dos líneas explícitas, tamaño de escritorio `clamp(48px, 5.3vw, 76px)`, peso 700, interlineado 1.04 y tracking `-.04em`; estos valores son locales, no una nueva escala global.
- Escritorio distribuye las columnas en proporción 1.2:1. Bajo 760 px se apilan siguiendo el DOM: nombre, rol/disponibilidad y formación, frase dinámica, descripción, acciones, metadatos, fotografía y terminal. El retrato y código comparten un ancho máximo de 440 px.
- La fotografía tiene proporción 6:5, radio local de 4 px y recorte de origen `x:320`, `y:400`, `width:660`, `height:550`. `HeroPortrait` no monta geometría TM, marco desplazado ni parallax; el bitmap permanece sin filtros ni transformaciones. El terminal usa Consolas a 12 px/1.75, 11 px en móvil, y los colores del tema existente.
- `LineReveal` revela cada línea durante 550 ms, con demora inicial de 60 ms y desfase de 75 ms. Los grupos entran durante 400 ms; la fotografía usa recorte durante 650 ms con demora de 140 ms. El movimiento reducido elimina estas entradas. Son decisiones de esta superficie, no tokens nuevos del sistema.

## Preserved documentation drift

La documentación global conserva descripciones anteriores del hero: dos columnas iguales, otro orden móvil, retrato 4:5, geometría TM, marco, zoom y parallax. El frontmatter describe la escala base anterior, no las sobrescrituras locales de etapa 1. La narrativa del sidecar aún menciona un gafete interactivo, mientras DESIGN.md ya describía un retrato editorial: esa discrepancia entre documentos es preexistente. PRODUCT.md también conserva la mención de formas TM. No se reparan ni se convierten en reglas nuevas: el alcance autorizado es local y exige preservar los tres archivos. Las capturas y mediciones de esta etapa se referencian arriba sin reescribir las limitaciones históricas de la extracción global.
