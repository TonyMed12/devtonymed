# Iteración 05 — identidad azul y movimiento coordinado

Implementación local sobre el portafolio existente. Se conservan TM, “De la idea al código”, las fuentes, el contenido personal y el orden general. No se publicó ni desplegó.

## Cambios implementados

- Paleta azul en ambos temas: acción #2563EB, acentos claros #60A5FA / #93C5FD, fondo oscuro #0B1120 y claro #F8FAFC. Se actualizaron botones, enlaces, bordes, selecciones, cursor e indicadores; los archivos de logos institucionales y tecnológicos conservan sus colores originales.
- Presentación con “Disponible”, dos acciones (Ver currículum y Hablemos) y GitHub como enlace secundario debajo. El currículum mantiene su destino temporal `#inicio`, en `src/data/site.ts`.
- Se eliminaron el control de movimiento del sitio, su almacenamiento y las explicaciones públicas sobre cómo pausar las animaciones. Solo se utiliza la preferencia reactiva del dispositivo.
- Fondo Canvas 2D original: trazos azules, nodos y brillo tenue. Entrada de 3,6 segundos y estado final estático; respuesta al puntero limitada a 10 / 8 px y suavizada hasta detenerse. Resolución de dibujo limitada a DPR 1,75; sin renderizados React por cada frame. Se cancela la suscripción al salir del viewport, ocultar la página o desmontarse. En movimiento reducido se dibuja una composición estática. La superficie opaca de lectura protege los textos del hero.
- Banda de tecnologías con una secuencia breve de 3,6 segundos, sin bucle infinito ni lista duplicada. Sigue pausando al hover/foco. Permite desplazamiento horizontal nativo; con movimiento reducido presenta todos los nombres en cuadrícula.
- Carrusel manual con pista nativa y Motion: posición animada durante 0,42 s, escala/opacidad de tarjeta activa y parcial siguiente en escritorio. Se suspende scroll snap durante la transición programática y se restablece al terminar o interrumpirla. Toque y arrastre táctil usan desplazamiento nativo; no existe reproducción automática. Capturas con `object-fit: contain`, proporción consistente y marco de navegador. Los proyectos sin captura usan composición tipográfica, sin inventar producto terminado ni logotipo institucional.
- Detalles de proyectos con título compartido mediante `layoutId`, vista de la captura disponible, transición de apertura/cierre, idioma dentro del diálogo y restauración del foco.
- Trayectoria compacta: tres estaciones horizontales con marcador compartido de Motion y un solo panel. Por defecto muestra la ingeniería actual; flechas, Inicio/Fin y selección accesible. En móvil las estaciones se desplazan horizontalmente. Cédula en la etapa técnica y egreso 2027 explícitamente previsto. To Do permanece fuera de Ingeniería.
- Iluminación localizada propia en proyectos, panel de trayectoria y credenciales, con coordenadas suavizadas mediante el reloj de Motion. Hover, subrayados y pequeños cambios de color se resuelven con CSS. Se conserva el cursor nativo y el rastro breve; foco visible y operación táctil no dependen del puntero.
- Estancia en CUL y congreso separados: Barranquilla, Colombia · 2025 identifica la estancia; “Presentado en el Congreso Internacional del XXX Verano…” figura como hito y en detalle, sin afirmar sede, publicación, premio o indexación.
- GCI usa el logo oficial Matsuo–Iwasawa Lab UTokyo; se mantiene la relación institucional en texto y el calendario personal agosto–31 de diciembre de 2026 / En curso.
- UPV: Microcredencial · Universitat Politècnica de València · 3 ECTS, cinco contenidos visuales, logo también en detalle y relato en primera persona. Se conserva el estado previo de curso completado y el ID existente, sin adjudicar edición individual ni cambiar el estado por el calendario público.
- Idiomas: español nativo; inglés B2, nivel reportado y certificación pendiente, sin menciones públicas a Voxy. Escala A1–C2 con secuencia breve hasta B2 y composición gráfica de conversación, sin porcentajes.

## Dependencias y coordinación técnica

Se revisó `package.json` antes de instalar: Motion ya estaba. `npm ls motion lenis --depth=0` confirma una instancia de Motion 14.3.0 y Lenis 1.3.27. Solo se añadió Lenis; no se añadieron GSAP, otra biblioteca de animación ni un paquete de SpotlightCard.

- [Lenis, documentación oficial](https://github.com/darkroomengineering/lenis): instancia vertical única, `syncTouch: false` para preservar el tacto nativo. El reloj `frame.update` de Motion llama `lenis.raf` (sin `autoRaf` paralelo). No se transforma un wrapper para simular el desplazamiento.
- Anclas internas gestionadas con URL, historia y foco al finalizar; se respeta `scroll-padding-top`. Los destinos dentro del carrusel se hacen visibles horizontalmente. Teclado conserva su comportamiento nativo y detiene inercia pendiente.
- Carrusel, banda, estaciones y diálogos llevan exclusión de Lenis donde corresponde. Los diálogos y la pestaña oculta detienen Lenis; al retirarse el diálogo se reanuda. Una prueba detectó y permitió corregir que la observación inicial no detectaba esa retirada.
- Movimiento reducido: Lenis se destruye y se vuelve al desplazamiento nativo, se suprimen animaciones de interfaz y se eliminan estela y respuesta del puntero. Cambiar esta preferencia durante la visita no requiere recargar.
- Canvas y spotlight comparten el planificador de Motion y solo se mantienen suscritos mientras hay movimiento que resolver. No se puede afirmar un rendimiento en FPS sin medirlo en navegador real.

## Logos institucionales y procedencia

Identifican formación o institución anfitriona; no equivalen a empleo, patrocinio, un grado de esas universidades o validación automática de credenciales. Proporciones preservadas mediante `object-fit: contain`, soporte blanco y nombre visible o texto alternativo.

| Recurso | Qué representa y dónde se obtuvo |
| --- | --- |
| `itm.png` | Encabezado conjunto de TecNM e Instituto Tecnológico de Morelia: https://morelia.tecnm.mx/assets/files/main/img/pleca-tecnm-itm.png. Se usa en ingeniería, egreso previsto e investigación del ITM. |
| `cbtis147.png` | Emblema del encabezado oficial de CBTis 147, institución de formación técnica: https://www.cbtis147.edu.mx/images/logo.png. |
| `cul.jpg` | Escudo vigente de Corporación Universitaria Latinoamericana, anfitriona de la estancia. Identidad: https://ul.edu.co/cul/informacion-institucional/logo.html; archivo https://ul.edu.co/images/logo/logo-03.jpg. |
| `upv.svg` | Universitat Politècnica de València, emisor de la microcredencial: https://www.upv.es/imagenes/svg/logo-upv.svg. |
| `matsuo-iwasawa.png` | Logo y wordmark “Matsuo-Iwasawa Lab UTokyo” del encabezado de https://weblab.t.u-tokyo.ac.jp/en/. Archivo oficial: https://weblab.t.u-tokyo.ac.jp/wp-content/uploads/2024/09/479f053d38b915662e871d114191a2b4-3.png. Descargado e inspeccionado visualmente en esta iteración. Sustituye el logo general de University of Tokyo en GCI; ese recurso anterior queda sin uso. |
| `google.svg` | Marca Google para la formación Google Project Management, obtenida de Devicon. No es un logotipo oficial de Coursera ni un grado universitario. Fuente y licencia en ASSET-CREDITS. |
| `aws.svg` | Marca AWS de Devicon para identificar preparación AWS CloudOps; el estado sigue siendo preparación, no certificación obtenida. Fuente y licencia en ASSET-CREDITS. |

Los iconos de tecnologías se acompañan de su nombre. SQL usa un pictograma genérico de datos, no un logo de un motor determinado. Las composiciones tipográficas de proyectos y el dibujo Canvas son ilustraciones propias, distintas de las marcas institucionales. Licencias y referencias históricas en `public/ASSET-CREDITS.md`.

## Fuentes académicas verificadas en esta iteración

- [UPV 102257](https://www.cfp.upv.es/formacion-permanente/curso/desarrollo-software-seguro_102257.html): microcredencial, 3 ECTS y cinco contenidos; edición 19 de enero–15 de abril de 2026.
- [UPV 102834](https://www.cfp.upv.es/formacion-permanente/curso/desarrollo-software-seguro_102834.html): microcredencial, 3 ECTS y los mismos cinco ejes; edición 23 de marzo–30 de mayo de 2026.
- Estas fichas verifican la oferta, no qué edición cursó el titular ni su obtención individual. Se usa contenido común sin fechas de edición, herramientas específicas o evaluaciones inventadas. La narración extensa indicada por el usuario se conserva en el detalle; los cinco ejes se presentan de forma resumida.
- [GCI oficial](https://weblab.t.u-tokyo.ac.jp/en/lecture/gci/): confirma Global Consumer Intelligence y Matsuo–Iwasawa Laboratory, The University of Tokyo. La página pública actual corresponde a septiembre de 2026; el periodo personal de agosto–diciembre lo proporcionó el usuario y no se asocia automáticamente a esa edición.
- El estado “presentado” del congreso procede de esta solicitud; no se ha verificado una constancia nueva ni se interpreta como publicación.

## Comprobaciones reales

- `npm.cmd run build`: correcto, TypeScript y Vite.
- `npm.cmd run lint`: correcto.
- `npm.cmd test`: 21 casos aprobados, 0 fallos.
- React/jsdom: cambio ES/EN incluido `developer.json`; carrusel manual y animado con posiciones simuladas; estados y límites de teclado; trayectoria de un panel; cédula y enlaces; diálogo y foco; temas; copia de correo con éxito/error; microcredencial UPV y sus cinco contenidos; estado GCI incluso después de la fecha final; idiomas sin Voxy; existencia de todos los recursos tecnológicos y de emisores.
- Lenis real en un DOM simulado: ancla e historia, foco del destino, teclado sin prevención de PageDown, pausa durante diálogo, reanudación al retirarlo y destrucción con movimiento reducido. Se simula el desplazamiento: no prueba sensaciones físicas de rueda o touch.
- Canvas con contexto 2D simulado: múltiples dibujos en la entrada, parada después de asentarse, respuesta al puntero y cancelación al desmontar. No prueba los píxeles finales del dibujo.
- Contraste matemático de veinte pares definidos en los estilos (texto, acciones, superficies y selecciones de ambos temas), mínimo 4,5:1 para esos pares. No se presenta como auditoría completa de todos los fondos compuestos.
- Existencia y estructura de logos comprobadas. La composición raster nueva del laboratorio fue abierta para identificarla; esto no verifica su tamaño aparente dentro de la tarjeta.
- `git diff --check`: sin errores de espacios; avisos normales de LF/CRLF de Git en Windows.

## Pendientes y límites

No hay navegador conectado: el inventario disponible devolvió cero navegadores y cero aplicaciones. No se generaron capturas ni se comprobó visualmente la página. Quedan pendientes el tamaño real de la trayectoria dentro de una pantalla, el encuadre de tarjetas, los gestos táctiles reales, la transición compartida en la capa nativa del diálogo, el contraste compuesto y la fluidez de rueda/puntero en los navegadores de destino. Los estilos responsive y las interacciones están implementados; jsdom no es un motor de layout ni una prueba visual móvil.

El adjunto contiene solo `Texto pegado.txt`. Se tomó como referencia la combinación técnica descrita; no se afirma haber inspeccionado el HTML o el código Canvas del compañero.

Faltan el archivo real del currículum, originales de credenciales/resultado de idioma y confirmación de edición personal UPV. Se conservan IDs y datos existentes; no se inventan URL de validación, puntuaciones, demos o certificaciones. El enlace de cédula sigue siendo la consulta general oficial, sin validar automáticamente el número personal.

Revisión visual recomendada al disponer del navegador: 390, 768, 1440 px; ES/EN; claro/oscuro; rueda y touch; anclas al inicio y a proyectos; diálogo abierto/cerrado; teclado; preferencia del sistema activada durante una transición. No se inició un servidor persistente ni se publicó.
