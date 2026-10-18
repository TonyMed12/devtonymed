# Iteración 07 · TonyMed

Propuesta local de revisión. No se publicó ni se modificaron hosting, DNS o cuentas. La URL prevista `https://tonymed.dev` no se verificó como dominio conectado.

## Presentación

- Nombre verificado completo como único H1, rol Junior, ingeniería en curso, disponibilidad, firma `tonymed.dev`, currículum, Hablemos y GitHub. El texto de presentación previo se conserva en Sobre mí.
- `Welcome.tsx`: implementación propia, TM + Bienvenido/Welcome, 1,05 s, sessionStorage, sin esperar recursos. No toma el foco ni intercepta puntero; teclado/toque la retiran. Tiene salida por CSS y por temporizador independientes. Si el almacenamiento está bloqueado, la introducción sigue siendo breve aunque no puede recordar la sesión.
- `Typewriter.tsx`: implementación propia. Escribe solo la parte variable, pausa 2,3 s, borra, y cambia de frase. Espacio de dos líneas reservado, secuencia reiniciada con idioma, texto accesible estable, pausa fuera del hero y con pestaña oculta. Preferencia de movimiento reducido: primera frase completa.
- Metadatos centralizados en `src/data/site.ts`, inyectados en HTML por Vite y descripción localizada por React. Título exacto solicitado, canonical y Open Graph preparados para la URL prevista.

## Inspección de los cuatro módulos

Se descargó cada wrapper versionado y su módulo real de framerusercontent. Se revisaron imports, lógica, valores por defecto y controles antes de implementar. El módulo Eye Follow importa además FollowEyes, también descargado e inspeccionado. Los originales de inspección permanecen en `.tmp/framer-review`, ignorado por Git y fuera de `public`.

| Módulo solicitado | Dependencias originales | Controles observados | Resultado en este portafolio |
|---|---|---|---|
| [Eye Follow Button](https://framer.com/m/Eye-Follow-Button-yMBK.js@UiZdcXLPs68fBczUfQ27) | React, framer-motion, runtime amplio de Framer (Link, RichText, variantes, fuentes) y FollowEyes remoto | Texto, link, colores, radio, padding, uno/dos ojos, tamaño, pupila, separación, velocidad/rango, parpadeo/intervalo | **Adaptación**, `EyeFollowLink.tsx`, no import original. Conserva seguimiento polar acotado y ojos con muelle; usa Motion existente, fuente local y ancla nativa a contacto. Dos ojos de 20×22 px, pupila 7×9, recorrido 4,7 px. Sin parpadeo. Solo responde dentro del botón con ratón fino; estático en táctil/reducido. El rastro de cursor se oculta sobre este enlace. |
| [Animated Path](https://framer.com/m/AnimatedPath-zpq9rv.js@POpugJ0TBxWL4GA458rY) | React, controles Framer, useIsStaticRenderer; SVG/CSS nativos | Línea/puntos, grosor, guiones/espacios, velocidad, longitud de estela, demora, inicio al entrar, base/opacidad | **Adaptación**, `JourneyPath.tsx`. Original: curva descendente fija de cuatro puntos, máscara SVG de estela en bucle. Aquí: tres nodos reales, curva de 36 px, avance vinculado a selección y ramal al único panel. Movimiento finito con Motion, sin bucle perpetuo. Móvil: línea recta de 28 px. Se conservan pestañas, teclado, fechas, actualidad y 2027 previsto. |
| [Dot Grid BG](https://framer.com/m/Dot-Grid-BG-GVxaLr.js@mfNBQfaPK0E7CX1epbhh) | React, controles Framer, Canvas 2D | Color, tamaño, separación, velocidad orbital, radio de impacto, escala, activar órbitas | **Adaptación**, `DotGridBackdrop.tsx`. Conserva proyección de órbitas inclinadas, fase y profundidad por punto. Sustituye el Canvas anterior en App. Un solo Canvas de fondo, DPR ≤1,5, separación 32 px escritorio/44 móvil, azules por tema, pointer-events none. Puntero observado en el hero para no bloquear enlaces. Se anima con el reloj Motion existente y se detiene ~2,05 s después del último movimiento; sin bucle en reposo, pestaña oculta, fuera del hero, táctil o movimiento reducido. |
| [ScrollRevealText](https://framer.com/m/ScrollRevealText-vXBxyx.js@ymLCSaN7wX7cJKeayNed) | React y controles/useIsStaticRenderer de Framer | Texto/tag/fuente, colores, 12 presets, palabras/caracteres/líneas, trigger scroll/carga, stagger, offsets, blur, escala, perspectiva/rotateX | **Adaptación**, `ScrollRevealText.tsx`. Conserva reparto por palabras y progresión escalonada de color. Solo en “Programar también es saber colaborar.” y traducción. H3 seleccionable, opacidad 1, sin blur, máscaras o desplazamiento de letras. Color entre muted e ink, ambos legibles en cada tema. Revela del 88 % al 63 % de la altura del viewport. Motion observa el desplazamiento nativo que actualiza Lenis, sin segundo motor de scroll. Reducido: texto plano. |

No se instalaron dependencias en esta iteración ni se importan componentes remotamente al ejecutar la página. Son adaptaciones específicas del producto, no reproducciones exactas ni componentes originales atribuidos a TM.

## Procedencia y condiciones

Las fichas oficiales incluyen las URLs versionadas exactas del usuario:

- [Eye Follow Button — Aathif Thajudeen](https://www.framer.com/marketplace/components/eye-follow-button/).
- [Animated Path — Maryam Zumi](https://www.framer.com/marketplace/components/animated-path/), distinto de Animated Path Pro.
- [Dot Grid Background — Aakash Mangla](https://www.framer.com/marketplace/components/dot-grid-background/).
- [Reveal Text On Scroll — Ali Themes](https://www.framer.com/marketplace/components/revealtextonscroll/). El código atribuye creación a AliThemes.com.

Los cuatro figuran gratuitos con licencia Limited. Sus enlaces llevan a [Framer Community Terms §7.3.1](https://www.framer.com/legal/community-terms), que permite uso y modificación incorporados en proyectos propios, incluidos comerciales. No permite redistribuir el contenido como asset autónomo, ofrecerlo en plataformas competidoras ni atribuirse la autoría original. Los derechos pertenecen a sus creadores; no se afirma licencia MIT. [Framer explica el uso de componentes en React externo](https://www.framer.com/help/articles/sharing-components/), sin garantizar compatibilidad automática de sus imports.

## Fotografía

Se mantiene la adaptación previa de Lanyard Pass de BuiltByKern; ver [inspección original](LANYARD-REVIEW.md). Se amplió la tarjeta física de 1,58×2,12 a 1,90×2,55 unidades, manteniendo su proporción. Cámara: FOV de 30° a 28°, centro vertical reajustado. Encuadre de foto: de 1,6× a 1,85× sin modificar ni estirar el JPG. Esto incrementa la proyección del pase aproximadamente un 30 % con el mismo escenario de 420/370 px; no es una medición visual del navegador. Se mantienen límites de arrastre y limpieza de interacción Lenis. La alternativa estática tiene un encuadre más cercano y conserva foto real, TM y rol.

- [Propuesta Lanyard](http://127.0.0.1:5177/?portrait=lanyard).
- [Foto clásica conservada](http://127.0.0.1:5177/?portrait=classic).

## Comprobaciones y límites

- 28 pruebas automatizadas con React + JSDOM: traducciones, temas, nombre/título, bienvenida por sesión y salida independiente de recursos, lectura/borrado/reset/pausa del typewriter, ancla Hablemos y foco con Lenis, teclado de trayectoria/2027, texto seleccionable, preferencias de movimiento, fallback fotográfico, Canvas en reposo y limpieza, además de regresiones de proyectos/credenciales.
- JSDOM no tiene motor de composición ni WebGL real. Estas pruebas simulan geometría, sensores, entrada y Canvas; no equivalen a evaluar tamaño aparente, recortes, scroll táctil físico o capturas.
- Computer Use encontró la ventana del portafolio, pero **detuvo la captura porque no pudo verificar la URL de Brave con suficiente confianza para aplicar su política**. No se continuó por otra vía de automatización. No se obtuvieron capturas ni se completó QA visual real de escritorio/móvil/ambos temas. Pendiente revisar encuadre, límites en gesto real y contraste compuesto en pantalla.
- Compilación y lint correctos. Se mantiene el aviso previo de Vite sobre el bloque Three/Lanyard (~598 KB, 156 KB gzip); no se ocultó ni se añadieron bibliotecas para estos cuatro efectos.
- Revisión manual sugerida: primera carga y recarga en la misma pestaña, ES/EN, ambos temas, anchos 1440/390/320 px, tabulación a Hablemos y etapas, preferencia OS de movimiento reducido. Para repetir bienvenida en una sesión nueva, abrir una pestaña independiente o cerrar la sesión de navegación.

Vista previa exclusivamente local. El enlace de currículum sigue en el destino provisional ya aprobado `#inicio`; no se inventó un PDF.
