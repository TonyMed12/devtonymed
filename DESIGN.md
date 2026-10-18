---
name: "TonyMed / TM"
description: "Sistema observado del portafolio profesional de José Antonio Medina Ayala."
colors:
  paper: "#f8fafc"
  surface: "#ffffff"
  surface-alt: "#eaf1fb"
  ink: "#0f172a"
  muted: "#475569"
  accent: "#1d4ed8"
  blue: "#2563eb"
  lime: "#93c5fd"
  line: "#cbd5e1"
  dark-paper: "#0b1120"
  dark-surface: "#15223a"
  dark-surface-alt: "#1b2e4b"
  dark-ink: "#f1f5f9"
  dark-muted: "#b8c7dc"
  dark-accent: "#60a5fa"
  dark-line: "#334766"
typography:
  display:
    fontFamily: '"Portfolio Sans", Arial, sans-serif'
    fontSize: "clamp(42px, 4.8vw, 66px)"
    fontWeight: 700
    lineHeight: 1.03
    letterSpacing: "-.035em"
  headline:
    fontFamily: '"Portfolio Sans", Arial, sans-serif'
    fontSize: "clamp(32px, 4vw, 52px)"
    fontWeight: 700
    lineHeight: 1.12
    letterSpacing: "-.035em"
  title:
    fontFamily: '"Portfolio Sans", Arial, sans-serif'
    fontSize: "clamp(26px, 3vw, 36px)"
    fontWeight: 700
    lineHeight: 1.12
    letterSpacing: "-.035em"
  body:
    fontFamily: '"Portfolio Sans", Arial, sans-serif'
    fontSize: "16px"
    lineHeight: 1.55
  label:
    fontFamily: '"Portfolio Sans", Arial, sans-serif'
    fontSize: "14px"
  terminal:
    fontFamily: "Consolas, monospace"
    fontSize: "13px"
    lineHeight: 1.8
rounded:
  control: "6px"
  surface: "12px"
spacing:
  section: "clamp(64px, 8vw, 112px)"
  gutter: "clamp(20px, 4.5vw, 64px)"
  button-block: "12px"
  button-inline: "20px"
components:
  button-primary:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.surface}"
    rounded: "{rounded.control}"
    padding: "12px 20px"
  button-primary-hover:
    backgroundColor: "{colors.accent}"
  button-secondary:
    backgroundColor: "{colors.surface-alt}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "12px 20px"
  project-card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.surface}"
  technology-choice:
    rounded: "{rounded.control}"
    padding: "8px 12px"
  detail-dialog:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.surface}"
    width: "min(720px, calc(100% - 32px))"
---

# Design System: TonyMed / TM

## Overview

**Creative North Star: "Identidad técnica cercana"**

Esta frase es una lectura descriptiva del código y del brief confirmado, no un nombre creativo aprobado por el usuario. La identidad se apoya en el nombre propio, fotografía real, marca TM y acentos azules. La tipografía y las superficies amplias organizan la información; los detalles se abren cuando hacen falta.

La bienvenida, escritura progresiva y revelado del retrato editorial concentran el movimiento de presentación. La fotografía real comparte espacio con geometría TM azul; el contacto usa dos líneas tipográficas fijas que responden a la proximidad del cursor. En el resto del sistema, la animación acompaña cambios de estado y lectura. La documentación registra código existente; no equivale a una aprobación visual. No hubo capturas válidas ni inspección de estilos computados en navegador, por lo que no se afirman resultados de contraste, ausencia de recortes ni fluidez medida. Las dimensiones calculadas desde CSS son estimaciones, no mediciones renderizadas ni evidencia de aceleración GPU.

**Key Characteristics:**

- Identidad personal con fotografía real y firma TM.
- Azul como acento de interacción en dos temas.
- Jerarquía tipográfica fuerte y superficies de baja ornamentación.
- Información ampliable y movimiento con alternativas estáticas.

## Colors

La paleta combina un azul de acción con fondos fríos y texto de alto peso visual. Los valores normativos están en el frontmatter y proceden de `src/portfolio.css`.

### Primary

- **Azul de enlace y énfasis** (`accent` / `dark-accent`): enlaces, estados seleccionados, foco, subrayado de navegación y progreso de lectura.
- **Azul de acción** (`blue`): fondo del botón primario, con texto blanco en ambos temas. Su hover de escritorio utiliza el azul definido en `accent` del tema claro como valor literal.
- **Azul claro de selección** (`lime`): el nombre heredado de variable no describe su matiz; su valor es azul claro. Se usa en selección de texto, detalles del terminal y la forma M del retrato. El destello del marco utiliza el mismo color como valor literal.

### Neutral

- **Papel frío** (`paper` / `dark-paper`): fondo general, cabecera y bienvenida.
- **Superficie** (`surface` / `dark-surface`): proyectos, diálogos y piezas de contenido.
- **Superficie azulada** (`surface-alt` / `dark-surface-alt`): campos de contenido y controles secundarios.
- **Tinta** (`ink` / `dark-ink`) y **texto secundario** (`muted` / `dark-muted`): jerarquía de lectura.
- **Línea** (`line` / `dark-line`): referencias y barras discretas.

Las variables `choice-bg` y `panel-*` son alias de estos roles, no colores nuevos. Los logos institucionales y tecnológicos mantienen un soporte blanco para su legibilidad. No se ha medido el contraste de todas las combinaciones.

**The Theme Role Rule.** Los controles secundarios y superficies siguen las variables del tema. El botón primario conserva su azul y blanco explícitos, conforme al código actual.

## Typography

**Display Font / Body Font:** Portfolio Sans, con Arial y sans-serif de respaldo. `src/index.css` carga SF Pro Display local bajo ese alias en pesos regular y bold, con `font-display: swap` y sin síntesis de fuentes.

**Label/Mono Font:** Las etiquetas comparten la familia principal. El terminal usa Consolas con respaldo monospace.

La jerarquía usa tamaños fluidos, títulos compactos y peso bold. No hay una escala proporcional declarada: las medidas responden a roles concretos.

- **Display:** nombre en el hero, hasta 14 caracteres de ancho de línea (`14ch`) en escritorio; el tamaño y ancho se adaptan en móvil.
- **Headline:** encabezados de sección; ancho máximo habitual de `15ch` o `16ch` según sección.
- **Title:** títulos de contenido, con ajustes locales en proyectos, formación e investigación.
- **Body:** cuerpo general; la carta personal llega a `65ch` y su interlineado a `1.7`. Los detalles de tecnologías alcanzan `70ch`.
- **Label:** navegación y datos de apoyo; existen usos de `13px` para metadatos. Las etiquetas no se convierten globalmente a mayúsculas.

## Layout

Contenedor centrado con ancho máximo de `1280px`, gutter fluido y espacio de sección declarados en el frontmatter. La cabecera sticky reserva altura y el documento aplica desplazamiento de ancla para que el contenido no quede bajo ella.

La composición observada sigue presentación, proyectos, tecnologías, carta personal, formación con investigación y credenciales, y contacto. Es la composición de esta página, no una prohibición para futuros productos. Proyectos usan un campo ancho de fondo azul suave y un carrusel con contenido visual y texto en columnas. About combina carta y principios; formación usa pestañas; investigación usa filas; credenciales usan una retícula de dos columnas. El contacto combina invitación y ubicación.

El hero distribuye texto y retrato en dos columnas iguales en escritorio. En móvil, la secuencia visual es nombre/rol/disponibilidad, escritura progresiva, retrato, estudios, acciones y metadatos. El retrato limita su ancho exterior a `480px` en escritorio y `290px` en móvil; su área fotográfica conserva una proporción `4:5`. Con ancho móvil exterior de `290px` y el padding declarado, la altura exterior calculada es `353.5px`, más el margen inferior de `16px`; esta cifra es una estimación de CSS, no una medición en pantalla. El orden móvil se define con flex y `order`; no altera por sí mismo el orden del DOM.

Los puntos de adaptación observados son `1050px`, `900px`, `760px` y `380px`. A `900px` aparece el menú desplegable. A `760px` los bloques principales pasan a una columna, el gutter es `24px` y la separación de sección `64px`; bajo `380px` el gutter es `20px`. El mínimo de documento declarado en la base es `320px`. Estos valores no sustituyen una revisión real de tamaños intermedios.

## Elevation & Depth

Las diferencias de tono y superficie expresan profundidad. Las tarjetas no tienen sombras ambientales generales. La excepción observable es el diálogo modal, con sombra (`0 24px 80px #0005`) y fondo de superposición (`#0b1120ba`). El retrato combina fotografía, marco desplazado y geometría SVG en planos DOM; el parallax de escritorio desplaza esos planos suavemente y no utiliza WebGL. El uso de transformaciones CSS no demuestra por sí solo composición acelerada ni rendimiento medido.

**The Modal Elevation Rule.** Reservar la sombra documentada para la capa modal; no convertirla en decoración predeterminada de todas las tarjetas.

## Shapes

Controles y piezas pequeñas usan esquinas suaves; las superficies principales y diálogos usan la curva mayor del frontmatter. El carrusel recorta contenido en su contenedor. El retrato tiene máscara de `16px`, contorno desplazado de `18px` y destello de borde de `17px`; son valores locales de esa composición, no sustituyen los radios generales. Flechas de carrusel y cambio de tema son circulares. Los logos conservan su proporción mediante `object-fit: contain`; la fotografía real usa un recorte deliberado. La estructura se apoya en espacio y tono, con bordes discretos donde existen.

## Components

### Buttons

Acciones directas con texto e icono cuando corresponde. La base tiene altura mínima de `48px`, peso bold, gap de `10px` y los paddings del frontmatter. La acción primaria utiliza azul y blanco; la secundaria sigue la superficie alternativa del tema. El hover solo se aplica a puntero fino con capacidad de hover. La pulsación escala a `.98` y se elimina con movimiento reducido. El foco visible global es un contorno de `3px` en el acento, separado `5px`.

### Navigation

Cabecera sticky con firma TM, enlaces de sección, ES/EN y tema. La sección activa utiliza color de tinta y marcador azul de `2px`; el movimiento compartido del marcador se desactiva con movimiento reducido. En móvil, el menú abre los enlaces en columna, mueve el foco al primer enlace y Escape devuelve el foco al control.

### Chips and selectors

Las etiquetas de proyectos son una lista ligera de tecnologías con iconos, sin convertir cada etiqueta en una tarjeta. Los selectores de tecnología y principios muestran el estado con superficie y acento, además de `aria-pressed`. Los filtros y pestañas mantienen objetivos de interacción amplios.

### Cards and expandable content

Proyecto: imagen o composición tipográfica a un lado y descripción, rol, tecnologías y acciones al otro. En móvil se apilan. El carrusel ofrece flechas, indicadores, teclado y arrastre, y usa scroll snap. Su reproducción se condiciona a visibilidad, interacción y preferencias de movimiento. Las credenciales son piezas compactas con identidad del emisor y estado real; no deben confundirse los estudios en curso con certificaciones obtenidas. Los detalles de tecnologías y terminal se abren con `details` / `summary`.

### Dialog

Diálogo nativo con contenido desplazable, ancho limitado y altura máxima de `88dvh`. El contenido anima entrada/salida; el contenedor protege el foco mediante `showModal()`, inicia en el botón de cierre y devuelve el foco al elemento anterior. Escape y clic en el fondo solicitan cierre. La variante de credenciales limita el ancho a `620px`.

### Arrival, portrait and technology band

Bienvenida de `1.45s`, descartable con tecla o puntero, con salida de respaldo desde la aplicación. La entrada posterior dura `.4s` con pequeñas demoras escalonadas. La máquina de escribir reserva altura, ofrece texto estable para lectores de pantalla y muestra una frase fija con movimiento reducido.

El retrato usa la imagen original de `1200 × 1600px` y un recorte de origen (`x:455`, `y:470`, `width:420`, `height:525`), definido en `src/data/portrait.ts` sin modificar el archivo. Tras la bienvenida, carga y visibilidad, una máscara revela la fotografía en `.85s` con demora de `.1s`; el zoom pasa de `1.07` a `1` en `1.05s` con la misma demora. El marco entra en `.55s` con demora de `.08s` y las formas TM en `.65s` con demora de `.18s`. Las formas SVG tienen ambiente de `18s` y `22s`, con desplazamientos de `6px` vertical y `5px` horizontal respectivamente, solo tras completar la entrada, en escritorio y mientras hay visibilidad.

El parallax responde únicamente al mouse con puntero fino, entrada completada y retrato visible: fotografía hasta `2px`, marco hasta `4px` y fondo hasta `7px` en dirección opuesta, con spring de rigidez `100`, amortiguación `20` y masa `1`. Un destello de borde de `.55s` responde a la entrada del puntero. Al salir o perder visibilidad se restablece la posición. Con movimiento reducido, la fotografía se presenta completa dentro del recorte, sin máscara animada, zoom, parallax ni ambiente; solo queda una transición breve de opacidad de `.15s`. Los fallos de carga muestran un mensaje de estado. La presentación anterior de gafete, cordón y sus módulos exclusivos fue retirada.

La banda de logos utiliza un ciclo lineal de `100s`, pausa con foco/hover y falta de visibilidad, y se convierte en lista estática con movimiento reducido. No hay inputs de formulario en la interfaz activa.

### Contact

Correo y canales visibles sin depender de hover, con acción de copia y mensaje de estado. La invitación tipográfica y globo de ubicación acompañan la información; no sustituyen los enlaces operables.

La invitación mantiene dos líneas fijas: «¿Tienes una idea?» / «Hagámosla realidad.» en español y «Have an idea?» / «Let’s bring it to life.» en inglés. La segunda línea utiliza el acento del tema. Cada línea entra una vez durante `.65s`, con escalonamiento de `.12s`; no hay marquee. La adaptación de Kinetic Typography / Reactive Typography de Orix Studio conserva la respuesta de elevación y escala por carácter del módulo identificado en el código. Dentro de un radio de `110px`, la elevación máxima es `6px` y la escala máxima `1.045`, con interpolación de `.2` por actualización. Solo responde al mouse con puntero fino, encabezado visible y pestaña activa; se restablece al desplazar la página y se desactiva con movimiento reducido. Los caracteres visuales están ocultos a lectores de pantalla y el título expone la frase completa como nombre accesible. Preservar atribución y licencia Limited registradas en `public/ASSET-CREDITS.md`.

El soporte vigente es «Disponible para trabajar y colaborar en nuevos proyectos. Escríbeme y conversemos.» / «Available for work and new collaborations. Get in touch.». La ubicación indica «Con base en Morelia. Abierto a nuevas colaboraciones.» / «Based in Morelia. Open to new collaborations.». Son textos observados en `ProfessionalContact.tsx`, no afirmaciones de disponibilidad verificadas externamente.

## Do's and Don'ts

### Do:

- **Do** mantener identidad, fotografía real, estados de contenido y enlaces accesibles.
- **Do** reutilizar variables de tema y jerarquía tipográfica antes de añadir estilos locales.
- **Do** preservar foco visible, teclado y alternativas estáticas de movimiento.
- **Do** comprobar en navegador temas, tamaños y contenido expandido antes de afirmar calidad visual.

### Don't:

- **Don't** reincorporar cursor trail, ojos que siguen al cursor ni nombre con dither en esta composición.
- **Don't** añadir sombras decorativas generales a las tarjetas.
- **Don't** ocultar datos esenciales de contacto detrás de hover.
- **Don't** tratar esta extracción de código como una aprobación visual, auditoría WCAG o medición de rendimiento.
