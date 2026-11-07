# Sobre mí — editorial y scroll

Scope: únicamente About, Principles, ScrollRevealText, un icono local y su CSS; App solo cambia la posición de About y los dos órdenes de navegación. Extensión local de TM, no nueva identidad. Se preservan tokens, fuentes, dependencias y todas las demás secciones.

## Direction contract

THESIS: presentar cómo pienso y colaboro, con el texto por delante de cualquier contenedor. Sobre mí es la primera sección después del inicio.

OWN-WORLD: Portfolio Sans, acentos azules y ambos temas existentes. Etiqueta con icono de código, título, párrafo editorial y tres principios abiertos, sin tarjetas ni fondos añadidos. Lupa, objetivo y ajustes comparten viewBox de 24, trazo redondeado 1.7 y tamaño visible de 34 px; sus nombres siempre se muestran.

STORY: el visitante reconoce una experiencia real de coordinación y programación y comprende curiosidad, propósito y precisión. No se repiten el nombre, disponibilidad, titulación ni resumen tecnológico del hero. La experiencia de coordinación de cinco personas, requisitos/ERS/BPMN, seguimiento y C#/Java/SQL conserva sus datos; las descripciones de los principios permanecen exactas. El JSON duplicado del About anterior sigue disponible en el hero.

FIRST VIEWPORT: escritorio con etiqueta y título a izquierda, párrafo principal y contexto breve a derecha; principios en tres columnas bajo el texto. Móvil conserva ese orden en una columna, iconos encima de sus nombres. Altura natural, sin sticky ni pantallas reservadas.

FORM: dirección editorial fijada por el usuario sobre el sistema existente; sin comp generada ni sorteo. Título dentro de una máscara con desplazamiento corto, palabras que avanzan de muted a ink y grupo «con claridad» / «with clarity» que recorre 5 px dentro del párrafo. Cada principio tiene su propio progreso de lectura, con desfases de icono/nombre/explicación. Todo usa useScroll/useTransform; sin temporizadores, estado de React por frame ni reloj nuevo de animación.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Implementation and evidence

- Orden: inicio, sobre-mi, proyectos, tecnologias, formacion, contacto. En App se verifican solo cambio de posición y orden de etiquetas en ambos idiomas; el resto del archivo debe ser idéntico a la copia previa.
- Los 18 tokens del párrafo fluyen naturalmente, con espacios reales y una sola copia seleccionable del contenido. Al cambiar idioma se recalculan grupos y palabras. El título cabe en una sola línea en los tamaños comprobados. El cambio de ancho usa reflujo nativo; useScroll sigue resize y trackContentSize. No se fijan coordenadas por palabra o por línea del párrafo.
- Movimiento reducido mantiene los mismos grupos y énfasis, con texto ink, principios opacos y sin desplazamientos. No cambia la altura del párrafo.
- Iconos propios en SVG, coherentes con el trazo del sitio. Sin nuevos rasters. ScrollRevealText conserva el crédito de la adaptación existente a AliThemes.com y su licencia Framer Limited; ASSET-CREDITS no se cambia.
- Capturas `docs/screenshots/about/desktop-*-*.png` y `mobile-*-*.png`: **vistas estáticas con movimiento reducido**, para poder ver la composición completa en una sola imagen. No se presentan como evidencia de avance normal. `desktop-scroll-partial.png` y `mobile-scroll-partial.png` muestran el estado normal parcial al 28% del recorrido del párrafo.
- `.tmp/about/validation.json` registra ocho combinaciones de idioma/tema/tamaño, detención sin scroll, avance y reversión, color final, transformaciones a cero, selección completa, iconos, ausencia de cortes y sticky, cambio de idioma en el mismo lugar y resize a 320 px. Son pruebas en Chrome, sin afirmar hardware móvil físico.
- Altura natural medida: 637 px en escritorio; 1081/1056 px en móvil ES/EN, ocupada por contenido real. No se agrega distancia artificial de scroll.
- TypeScript, build de producción y ESLint pasan. Lint de taste-skill permite únicamente la etiqueta solicitada explícitamente por el usuario; su regla genérica de no-eyebrow no prevalece sobre ese requisito. Exención anotada en la línea concreta. Motor/detector Impeccable no disponible en este entorno; no se declara haberlo ejecutado.

## Documentation boundary

DESIGN.md, PRODUCT.md y `.impeccable/design.json` se preservan. Sus menciones anteriores al About después de tecnologías, al selector interactivo de principios y a los símbolos abstractos se consideran documentación anterior; no se reparan otras superficies como efecto lateral de esta tarea.
