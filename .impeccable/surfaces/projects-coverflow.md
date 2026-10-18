# Proyectos — coverflow

Scope: solo ProjectCarousel, ProjectCard y ProjectCarousel.css. El inicio, secciones posteriores, datos de proyectos, hooks compartidos, dependencias y estilos globales se preservan. Modo Experience, dentro del sistema TM azul existente.

## Direction contract

THESIS: un proyecto legible al centro y dos vecinos que sugieren continuidad. La profundidad organiza la atención; nunca obliga a leer una tarjeta de espaldas.

OWN-WORLD: Portfolio Sans y tokens existentes en ambos temas. Captura completa sobre fondo neutro, tarjeta con sombra desplazada y suave, contadores y controles azules. Sin marco exterior de sección; el contorno visible al usar teclado es exclusivamente el foco accesible.

STORY: reconocer el proyecto, entender su objetivo y el rol real del autor, identificar tecnologías documentadas y abrir una ficha independiente. Las tarjetas laterales solo centran el proyecto.

FIRST VIEWPORT: tarjeta central de hasta 620 px con imagen 16:9 contain, nombre, descripción de hasta dos líneas, rol, iconos y acción. Vecinos con escala .86, inclinación de 14 grados y profundidad de 80 px. En móvil, tarjeta de ancho disponible menos 40 px, escala secundaria .94, inclinación de 4 grados y profundidad de 16 px. La altura se mide para alojar todos los contenidos sin saltos entre proyectos.

FORM: ampliación local fijada por el usuario; implementación propia con cinco posiciones virtuales y claves continuas. Entrada con desfases de 65 ms, resortes controlados y flotación secundaria de 4 px/8 s en una capa distinta al desplazamiento. Sin nueva identidad ni comp generada. El cargador Impeccable ya se constató indisponible; se usan sus guías directamente.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## References and provenance

Se inspeccionaron las dos demos públicas de Framer en Chrome, además de la galería pública de Motion. Capturas en `.tmp/coverflow/ref-orbit.png`, `ref-animated.png`, `ref-motion.png`. No se compraron componentes, descargaron fuentes premium ni copiaron implementaciones. Referencias: https://www.framer.com/marketplace/components/orbit-3d-carousel/ ; https://www.framer.com/marketplace/components/3d-animated-carousel/ ; https://motion.dev/examples?category=carousel&grade=S . La segunda demo no fue accesible al lector web, pero sí al navegador.

Imágenes: los mismos archivos preexistentes `/projexus2.png` y `/aquama.png`, sin editar. CAAM, To Do y detección de fraude no tienen captura asociada en los datos; su portada tipográfica conserva la dirección existente y señala «Captura no disponible». CAAM no tiene stack confirmado: se indica pendiente de documentar. No se atribuyen imágenes, tecnologías o resultados inexistentes. Se conservan los cinco proyectos que ya mostraba el carrusel; Biblioteca sigue fuera de esa selección previa.

## Behavior and verification

Autoavance de 6000 ms mediante el hook existente; pausa por hover, foco, gesto, ficha abierta, visibilidad de página o salida del viewport. Cada interacción manual reinicia la espera. Se añade control persistente de reproducción/pausa. Movimiento reducido elimina autoavance y flotación, con navegación manual instantánea. Solo la tarjeta activa permite enfocar controles; las laterales son inert y se seleccionan con una capa de clic excluida del orden de tabulación. Flechas, indicadores, Home/End y gesto horizontal con captura del puntero.

Capturas finales: `docs/screenshots/projects/`, ES/EN, claro/oscuro, escritorio/móvil. Validación: `.tmp/coverflow/validation.json`. Las pruebas de visibilidad de pestaña simulan document.hidden y visibilitychange; no equivalen a comprobar hardware móvil real. Arrastre táctil y mouse se envían mediante eventos de entrada de Chrome. Se comprueba la continuidad de los mismos nodos a través de ambos extremos y el intervalo real de seis segundos.

La documentación global DESIGN.md y `.impeccable/design.json` se preserva; sus descripciones anteriores del carrusel no se convierten en reglas para esta ampliación local.

Excepción explícita al lint de taste-skill: la sombra suave de las tarjetas responde al requisito del usuario «perspectiva moderada y sombras que aporten profundidad». La exención se anota únicamente en esa declaración CSS; no se aplica a otras reglas ni al sistema global.

## Final result

Revisión visual independiente: `disposition: ship`, sin correcciones materiales en Proyectos. TypeScript, compilación de producción, ESLint y lint de taste-skill pasan (este último con la excepción explícita de sombra). Matriz de ocho variantes y pruebas funcionales completas: todos los registros de `.tmp/coverflow/validation.json` indican pass. Se verificó que App.tsx, portfolio.css, hero-stage-one.css, los datos de proyectos y ambos archivos de dependencias permanecen idénticos a las copias previas. El detector Impeccable no pudo ejecutarse por motor local no disponible; no se declara auditoría WCAG completa ni pruebas sobre hardware móvil físico.

## Shipped local record

Revisión independiente final: `ship`. El registro de validación existente contiene únicamente resultados aprobados, incluidas las ocho combinaciones de idioma, tema y tamaño; las comprobaciones TypeScript, build, ESLint y taste lint fueron informadas como aprobadas en el cierre. Este pase documental contrasta el código y los registros existentes; no repite pruebas ni inspección de navegador.

La tarjeta local usa radio de 14 px; título de 26 px (23 px hasta 760 px), descripción de 15 px (14 px en móvil), rol de 13 px y tecnologías de 12 px. Conserva las variables `--surface`, `--paper`, `--ink` y `--muted`. El resorte local usa rigidez 180, amortiguación 30 y masa 1. Estos valores describen únicamente esta superficie y no sustituyen tokens globales.

Deriva global preservada: DESIGN.md todavía describe proyectos en columnas y scroll snap; el sidecar conserva una tarjeta sin sombra de radio 12 px, el traslado de 450 ms y la antigua narrativa del gafete. El coverflow implementado usa capas posicionadas, radio 14 px, sombra local autorizada y resorte. No se reparan PRODUCT.md, DESIGN.md ni `.impeccable/design.json` porque esta entrega amplía una superficie existente; la excepción de sombra no se canoniza como regla general.
