# Iteración 08 · Composición, fotografía y contacto

Cambios locales sobre la versión anterior. No se publicó ni se modificaron hosting/DNS. Se conservan TM, fuentes locales, paleta, contenido de proyectos y las interacciones existentes.

## Vista previa y comparación

- [Propuesta con FlipCard](http://127.0.0.1:5177/?contact=flip).
- [Contacto anterior conservado](http://127.0.0.1:5177/?contact=classic#contacto).
- La comparación de fotografía continúa en `?portrait=classic`; puede combinarse con `&contact=classic`.
- Inicio del servidor si se cierra: `npm run dev -- --host 127.0.0.1 --port 5177 --strictPort`.

## Fotografía y gafete

Archivo inspeccionado: `public/profesionaltony.jpg`, 1200×1600, 125.312 bytes, RGB 24 bits. Es la única fotografía profesional encontrada en el proyecto. SHA-256: `1674DA43BA40635C42FA84EBBB08D97ACD178AC0ADD4B2169D3059FBAA9634C3`. No se reexportó, recomprimió, retocó ni aplicó enfoque. Su rostro ocupa una parte pequeña de la escena original y el JPEG presenta suavidad propia; no se ha recuperado detalle inexistente.

Inspección del render anterior:

- No había filtro CSS blur sobre el Canvas ni opacidad reducida de la cara lista. La opacidad del contenedor solo se utiliza durante la carga.
- La cara se rasterizaba a 768×1024 y WebGL limitaba DPR a 1,5. Se usaba el JPG original, no una miniatura.
- La textura fotográfica pasaba por un material físico, iluminación de estudio y entorno. Esto puede reducir contraste/lavar colores aunque no sea un desenfoque real.
- Las capas de tinta/papel quedan en la cabecera y zona inferior; no se añadió una capa translúcida sobre el rostro. Se conservan acabado sin foil, sin funda y sin mapas normales sobre la fotografía.

Ajustes:

- FOV de escritorio 28° → 25° y escenario 420 → 440 px: proyección de tarjeta aproximadamente **18 % mayor** en reposo, antes de las pequeñas correcciones de perspectiva. El cambio principal viene del encuadre de cámara; no es solo espacio exterior. Móvil conserva 370 px y FOV 28°.
- Cordón acortado, anclaje y cámara recolocados para mostrar el recorrido completo y aprovechar el espacio con la tarjeta.
- Cara frontal 1152×1536, manteniendo layout lógico 768×1024. Supersampling del dibujo, suavizado de muestreo de alta calidad y anisotropía hasta el máximo real de GPU (máximo 8).
- DPR de escritorio hasta 2; móvil sigue hasta 1,5. Aumenta el coste de píxeles del visor 3D en pantallas densas; la textura frontal ocupa ~6,75 MiB sin mipmaps frente a ~3 MiB antes. No se añadieron dependencias ni otro visor.
- Material frontal Basic con sRGB y sin tone mapping ni reflejos del estudio sobre la impresión. Bordes/reverso conservan material físico. Se busca fidelidad a los colores del archivo, sin alterar facciones.
- `fitLanyardInView.js` comprueba los ocho vértices proyectados antes de dibujar, corrige posición y, cuando es necesario durante un giro, aplica escala uniforme para mantener margen dentro del visor. No deforma el retrato ni añade un bucle.
- La alternativa estática y la foto clásica siguen disponibles. El encuadre final y la nitidez percibida requieren revisión en pantalla; la resolución mayor de Canvas no añade información al JPG.

## Secciones y continuidad

- `About.tsx`: “Sobre mí” inmediatamente después de Inicio, con enlace de navegación ES/EN. Contiene enfoque, coordinación, aprendizaje, principios seleccionables y developer.json. Inicio conserva nombre, rol, formación breve, disponibilidad, typewriter, acciones, GitHub y foto.
- El revelado de texto sigue aplicado a un único H3 seleccionable en Sobre mí. Párrafos sin ocultación ni blur.
- `Welcome.tsx`: se inicia en cada montaje completo, **sin leer/escribir almacenamiento**. Duración 1,45 s con salida incluida; cambios de idioma, diálogos y anclas no la reinician. Fondo opaco durante la presentación, carga principal paralela y salida independiente de recursos. Temporizador y animationend se respaldan; teclado/toque pueden retirarla antes. Bloqueo temporal de overflow raíz, restaurado sin alterar la posición nativa de scroll. Lenis se detiene mientras está visible. Movimiento reducido: solo fundido.
- Una sola instancia de Dot Grid, ahora fija y del tamaño del viewport. La intensidad CSS cambia suavemente según la sección activa: más visible al inicio, tenue en lectura y coherente al cerrar. No se crean Canvas por sección ni un bitmap del alto de toda la página.
- `ReadingProgress.tsx` observa scroll nativo con Motion, igual que Lenis. Línea superior de 2 px; no hay otro motor ni RAF. Navegación con aria-current e indicador compartido de Motion. Microinteracciones usan la misma paleta, contornos y tiempos.

## Carrusel protagonista

Tarjeta centrada con vecinas visibles, escala 0,94 y desplazamiento 10 px en las inactivas; sin desvanecer demasiado el contenido. Imágenes más presentes y con object-fit contain, texto compacto, roles y tecnologías conservados. Flechas integradas en una barra y puntos con selección alargada. En móvil se conserva tarjeta vertical con imagen de 175 px.

El movimiento continúa con Motion sobre scrollLeft, arrastre táctil nativo y arrastre de ratón. Avance cada seis segundos de lectura, con pausa por hover, foco, arrastre, movimiento, diálogo, pestaña oculta y fuera del viewport. Hay dos copias visuales inertes en cada extremo para que también el vecino anterior coincida al normalizar el bucle centrado. No tienen IDs, acceso de foco ni diálogos. Los cinco proyectos reales siguen teniendo una sola instancia accesible cada uno. Se mantiene el detalle animado y no aparece barra horizontal.

## FlipCard: inspección y adaptación

URL exacta solicitada: [FlipCard-5rQ9.js@Bfm4iXxehEahJxoOelkH](https://framer.com/m/FlipCard-5rQ9.js@Bfm4iXxehEahJxoOelkH). El wrapper reexporta `https://framerusercontent.com/modules/h9N7yjMZihTunOIO7Wss/Bfm4iXxehEahJxoOelkH/FlipCard.js`.

El código fue descargado y leído antes de la integración. Importa React, framer-motion y controles de Framer. Usa dos caras absolutas, perspectiva, rotateX/rotateY y backface-visibility. Propiedades: frontContent/backContent (slots), dirección horizontal/vertical, trigger hover/click, duración 0,1–2 s, easing, perspectiva 500–2000 px, fondo, radio 0–50 px, sombra y giro automático/intervalo 1–10 s. Por defecto: hover, horizontal, 0,6 s, easeInOut, perspectiva 1000 px. No gestiona por sí solo inert, foco, teclado ni evitar el giro al pulsar enlaces internos.

La [ficha oficial 3D Flip Card de Can Girgin](https://www.framer.com/marketplace/components/3d-flip-card/) contiene exactamente la URL versionada anterior. Figura gratuita con licencia Limited; su enlace dirige a [Framer Community Terms §7.3.1](https://www.framer.com/legal/community-terms), que permite uso/modificación dentro de proyectos propios, incluidos comerciales, y prohíbe redistribuir como asset autónomo o reclamar autoría original. No se presenta como software MIT ni como componente original TM.

`FlipContact.tsx` es una **adaptación**, no una importación del módulo Framer. Usa Motion ya instalado, mantiene la rotación independiente de las dos caras y elimina runtime de editor/slots/autoFlip. Perspectiva 1200 px, duración 0,6 s, fondos y fuente del portafolio.

- Frente: TM, invitación, disponibilidad y botón nativo visible para girar; clic/toque también en superficie no interactiva.
- Reverso: correo real, copia con confirmación/error, GitHub, LinkedIn, currículum y botón Volver. Los enlaces no disparan giro.
- Cara inactiva: aria-hidden e inert inmediatamente. Foco al título del reverso al abrir y al botón del frente al volver; Escape vuelve al frente. Sin cambio de foco al cargar.
- Ambas caras ocupan la misma celda Grid: se reserva el máximo de sus alturas, con mínimo responsive, sin altura rígida que recorte texto. Movimiento reducido: fundido de 0,16 s sin rotación.
- `Contact.tsx` anterior permanece intacto y se utiliza con `?contact=classic`; nunca se montan ambas variantes en la misma vista.

## Verificación

- **33 pruebas** React/JSDOM correctas: regresiones anteriores, varias cargas completas de bienvenida, rerenders sin repetición, restauración de overflow, separación de Sobre mí, caras inertes, foco, Escape, correo, idiomas, ambos temas, preferencias OS, comparación de contacto, un solo fondo y dimensiones de viewport.
- Las pruebas de carrusel simulan geometría e incluyen normalización en ambos extremos, autoplay, pausas y animación completada. No equivalen a verificar el aspecto del centrado en un navegador.
- Prueba matemática con Three sin GPU: proyección de los ocho vértices durante giros, desplazamientos y cuatro tamaños de visor desktop/móvil. Escala uniforme y anclaje del cordón visibles en los casos comprobados. No equivale a probar todos los gestos físicos.
- Build y lint. Vite conserva el aviso previo del bloque diferido Three/Lanyard (~599 KB sin comprimir, ~157 KB gzip).
- Vista previa local y comparación responden HTTP 200. Los recursos nuevos también responden correctamente.
- Browser Use no expuso superficies para captura. No se considera completada la inspección visual real de ambos temas, recargas en navegador, nitidez final, pantalla táctil física o ausencia de desbordamientos. No se entregan capturas simuladas como si fueran del sitio. La revisión pendiente debe hacerse en la vista previa, particularmente a 1440, 390 y 320 px.

El currículum conserva el destino provisional aprobado `#inicio`; no se inventó un archivo PDF.
