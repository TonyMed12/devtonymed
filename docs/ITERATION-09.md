# Iteración 09 · Entrada, retrato y contacto

Trabajo local sobre la versión actual, sin publicación, migración ni cambios de hosting/DNS. Se conservan fuentes, TM, azules, contenido de proyectos y comportamientos anteriores compatibles.

## Vista previa

- [Presentación inicial](http://127.0.0.1:5177/).
- [Contacto profesional](http://127.0.0.1:5177/#contacto).
- [FlipCard anterior](http://127.0.0.1:5177/?contact=flip#contacto).
- [Contacto clásico](http://127.0.0.1:5177/?contact=classic#contacto).
- Continúa disponible `?portrait=classic` para comparar la fotografía anterior.

## Bienvenida y secuencia

TM + `tonymed.dev` + “Bienvenido / Welcome”, con jerarquía tipográfica y firma centralizada en site.ts. Duración de bienvenida: 1,45 s incluida su salida, sin almacenamiento que impida repetirla al recargar. Idioma, anclas y diálogos no la remontan. No espera fotografía, visor o recursos del globo.

Al cerrarse, Welcome comunica el inicio de la entrada. Hay respaldo independiente a los 1,9 s. Navegación, nombre, rol/disponibilidad, contenedor typewriter, formación breve y acciones entran de arriba hacia abajo, con desfases de 0,08 s y duración 0,4 s por bloque. El retrato entra a los 0,1 s, en paralelo con nombre/rol. No se acumulan esperas completas entre bloques.

El contenedor del typewriter termina de entrar a los 0,64 s; el permiso de escritura se activa a los 0,7 s. Dither solo afecta al nombre y nunca a las letras del typewriter. Texto y tamaño final del nombre existen desde el primer render; el efecto añade glifos temporales decorativos con aria-hidden, sin cambiar el texto semántico ni el ancho de letras. Termina antes de medio segundo. Con movimiento reducido: fundido simple, nombre sin Dither y frase completa. Si CSS no anima, los bloques conservan su presentación normal; no hay contenido permanentemente oculto por estado inicial.

## Presencia de la fotografía

- Dos columnas iguales: 50 % del ancho útil para la composición visual, descontando el espacio entre columnas.
- Geometría física del pase ampliada de 1,90×2,55 a 2,10×2,82, manteniendo proporción. Escenario de escritorio 480 px, antes 440; se conserva el encuadre de cámara y el ajuste de vértices proyectados dentro del visor.
- Encuadre fotográfico 1,85× → 2,65×, con el mismo anclaje de rostro. Se reduce fondo de la sala sin cortar la cabeza en el rectángulo de encuadre previsto. El JPG se dibuja proporcionalmente; no se modificó el archivo.
- La región aproximada de la cabeza observada en el original (alrededor de x=600–730, y=535–700 sobre 1200×1600) pasa a tener una proyección esperada del orden de 100 px de alto en el pase de escritorio, frente a unos 60 px de la versión previa. Es una estimación de encuadre/proyección, **no una medición visual del navegador**.
- En móvil se reduce el escenario a 320 px, con una tipografía inicial algo más compacta y menores espacios. El acercamiento del retrato conserva protagonismo sin hacer crecer su escenario. La alternativa estática también tiene un encuadre más cercano.
- Se conserva la textura frontal 1152×1536, DPR hasta 2 escritorio/1,5 móvil, sRGB y material frontal sin reflejos ni tone mapping. Sin blur, foil, funda o transparencia sobre el rostro listo.
- El recurso sigue siendo el único original disponible: `public/profesionaltony.jpg`, 1200×1600, 125.312 bytes. SHA-256 sin cambios: `1674DA43BA40635C42FA84EBBB08D97ACD178AC0ADD4B2169D3059FBAA9634C3`. El acercamiento no recupera detalle que el JPEG no tenga; su nitidez final queda pendiente de revisión en pantalla.

## Contacto abierto y profesional

El contacto predeterminado evoluciona a una composición amplia con invitación y acciones a la izquierda, globo secundario a la derecha. Ya no oculta correo y redes detrás de un giro.

Hover de ratón y foco dentro de la composición activan una apertura visual breve del fondo de los canales. El área, correo y enlaces permanecen estables y accesibles; abrirla nunca navega ni envía nada. Mientras el foco siga en un enlace, retirar el puntero no cierra su estado. Dispositivos táctiles muestran el panel directamente. La copia conserva confirmación/error real y traducción. No se mueve el foco al pasar el puntero.

Invitación exacta solicitada:

- ES: “¿Tienes una idea?” / “Hagámosla realidad.” y el texto de apoyo indicado.
- EN: “Have an idea?” / “Let’s bring it to life.” y el texto de apoyo indicado.

Solo se elevan/escalan brevemente las palabras destacadas. No se mueve continuamente el párrafo, no hay ticker infinito y los enlaces no se desplazan por la animación. Contacto clásico y FlipCard permanecen en archivos/variantes separados para comparar.

## Globo de Morelia

Coordenadas verificadas en [INEGI, división geoestadística y coordenadas de las cabeceras municipales de Michoacán](https://www.inegi.org.mx/contenidos/app/areasgeograficas/resumen/resumen_16.pdf): Morelia, 19°42′12″ N, 101°11′31″ O. Convertidas en `src/data/location.ts` a **19,703333° / −101,191944°**. Se representa la ciudad profesional, no al visitante. No se usa la API de geolocalización.

El globo usa proyección esférica/ortográfica, meridianos y tierra grabada del módulo Sextant inspeccionado. La cámara termina mirando a Morelia; el marcador queda sobre el hemisferio visible y su etiqueta HTML “Morelia, MX” permanece legible. La geografía original es deliberadamente esquemática.

Carga diferida al aproximarse a 300 px de la sección, con espacio reservado y fallback estático. Canvas 2D de 320 px escritorio/210 móvil, menor densidad de grabado en móvil. Entrada finita de 1,1 s, luego queda quieto. Se detiene al ocultar la pestaña/salir de vista y es estático con movimiento reducido. Temas: azules, fondo y líneas adaptados. El Canvas del globo es independiente de propósito del único Dot Grid compartido; no se añadieron otros fondos.

## Módulos: inspección, licencia y adaptación

Se descargaron los tres módulos exactos y se leyeron imports, lógica y controles relevantes antes de utilizarlos. Sus fichas oficiales contienen las mismas URLs versionadas del usuario. Los originales de inspección quedan en `.tmp/framer-review`, ignorado por Git y ESLint, fuera de public.

| Módulo | Inspección del original | Aplicación compatible |
|---|---|---|
| [Dither Reveal](https://framer.com/m/Dither-Reveal-LUnvnb.js@ryyqiS3iLEdHps5bqxbQ) · [Dither Text Reveal, Nora Salem](https://www.framer.com/marketplace/components/dither-text-reveal/) | React, framer-motion useInView, controles/useIsStaticRenderer Framer. Texto/fuente/colores, juegos de glifos dither/binario/bloques/ruido/custom, velocidad de intercambio, tiempo por carácter, stagger, demora, orden izquierda/derecha/centro/aleatorio, trigger carga/scroll, zona de viewport, alineación y tag. Original: letras inicialmente transparentes y sustitución progresiva con RAF. | **Adaptación** en DitherName.tsx. Conserva el juego dither y bloqueo escalonado; superposición breve y tenue con DOM updates, texto real siempre presente, solo nombre, sin imports Framer ni RAF permanente. |
| [Sextant](https://framer.com/m/Sextant-2F8qNO.js@1pzjnNxWy0LYqAOklZaN) · [Global Locations Pro, Design Foundry](https://www.framer.com/marketplace/components/global-locations-pro/) | React, framer-motion, controles y contexto Framer. Canvas 2D, costas esquemáticas, grabado por latitudes, proyección, selección de oficinas, rutas, arrastre/inercia, autoavance y relojes. Props: hasta 12 ciudades con lat/lng, imágenes/contacto/enlaces; tamaño/lado del globo, trama, rejilla, bisel, etiquetas/rutas, vuelo/rotación; layout, colores, tipografía y textos. | **Adaptación parcial** en SextantGeometry.js y LocationGlobeCanvas.tsx: conserva costas, grabado y matemáticas de esfera/cámara; reduce el directorio a una ciudad. Sin imágenes de oficinas, rutas ficticias, relojes ni giro infinito. Renderiza con Canvas y Motion existentes, lazy y con fallback. |
| [Kinetic Typography](https://framer.com/m/Kinetic-Typography-AmloH2.js@tHy6gRwfgbJ04LktvYNT) · [Reactive Typography, Orix Studio](https://www.framer.com/marketplace/components/reactive-typography/) | React y controles/useIsStaticRenderer Framer. Ticker infinito con dos secuencias y elevación/escala por proximidad del cursor. Texto, separador, repeticiones 2–20, velocidad 10–400 px/s, dirección, pausa hover, fuente/colores, radio de efecto 20–400, elevación 0–80, escala 0–1,5. | **Adaptación de su lenguaje de movimiento**, KineticInvitation.tsx: elevación y escala de palabras elegidas mediante Motion, una sola entrada finita y lectura final estable. No se integró el ticker ni su distorsión por proximidad, porque el usuario pidió evitar animación continua y movimiento de enlaces. No se afirma reproducción exacta del original. |

Los tres figuran gratuitos con licencia Limited y enlazan a [Framer Community Terms §7.3.1](https://www.framer.com/legal/community-terms): uso/modificación dentro de proyectos propios, incluidos comerciales; sin redistribución como asset autónomo, oferta en plataformas competidoras o atribución de autoría original. Se conservan procedencia y créditos. No se presenta ninguno como componente original TM ni como licencia MIT. No se instaló ninguna dependencia del proyecto.

## Formación e iconografía

Dentro de la ingeniería en curso se incorporó el dato proporcionado por el usuario: “Especialidad en Tecnologías de Desarrollo de Software” y “Promedio actual: 94/100”. En inglés: “Specialization in Software Development Technologies” y “Current average: 94/100”. La especialidad está subordinada al grado y el promedio es una etiqueta, sin gráfica ni distinción inventada. Se conserva el egreso previsto de 2027.

Se reutiliza la familia de iconos existente para correo, copiar, redes, currículum y código; se añade un pin con el mismo trazo y texto “Morelia, MX”. Logos auténticos de instituciones/tecnologías intactos. En el directorio del adjunto de esta iteración solo se encontró `Texto pegado.txt`: no se atribuyen detalles a una captura no disponible.

## Resultado real de validaciones

- **37 pruebas correctas** con Node 22/React/JSDOM. Incluyen regresiones, bienvenida con dominio en recargas simuladas, coordinación temporal hasta iniciar typewriter, no repetición al cambiar idioma, texto semántico y limpieza del Dither, contacto hover/foco/táctil simulado con acciones disponibles, traducciones, especialidad/promedio y proyección matemática de Morelia al centro del hemisferio visible.
- Se conserva la prueba matemática de límites del gafete, ahora con la nueva geometría y escenarios de escritorio/móvil, y pruebas de preferencias reducidas, temas y fallos del visor. No equivalen a gestos físicos ni a capturas.
- Build y lint correctos. Globo diferido: **5,95 KB / 2,71 KB gzip**. JS principal: ~469 KB / 151 KB gzip. Continúa el aviso conocido de Vite para el visor Three/Lanyard (~599 KB / 157 KB gzip).
- Vista previa y variantes responden HTTP 200, al igual que fotografía y recursos nuevos.
- El navegador integrado respondió “Browser is not available: iab”. No se considera aprobada la revisión visual real de encuadre/nitidez, composición responsive o ambos temas, ni se entregan capturas simuladas. La vista previa funcional queda preparada para revisar inicio y contacto. La herramienta nativa de captura ha tenido además bloqueos al no poder verificar la URL de Brave; si persiste, debe mantenerse explícita esta limitación.

Sin publicación. El enlace provisional de currículum permanece en #inicio según la configuración aprobada; no se inventó un PDF.
