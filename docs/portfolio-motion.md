# Movimiento del portafolio

Se conserva la composición, el orden de secciones, los enlaces, los principios y el contenido restante. Se reemplazan las entradas anteriores de los grupos afectados; no se agregan dependencias, configuración Pro ni licencias.

## Implementación

- `AnimatedContent.tsx`: adaptación propia con Motion del comportamiento vertical de [React Bits Animated Content](https://reactbits.dev/animations/animated-content). Cada grupo entra una vez, después de la bienvenida: 20–32 px, 0.6 s, ease-out del sitio, desfases cortos de 0.06–0.08 s y demora máxima de 0.24 s. El contenido parte visible; el foco cancela la entrada y deja los controles nítidos. Un respaldo limpia los estilos de animación.
- `ScrollRevealText.tsx`: implementación propia, sin React Bits Pro. Un único párrafo semántico, sin aria-live ni duplicados; opacidad 0.4→1 y desenfoque 2→0 px por palabra, según scroll. Las dos frases solicitadas conservan su flujo natural al cambiar de línea y reciben el énfasis azul. Al terminar la lectura permanecen reveladas; la selección con puntero muestra todo.
- Movimiento reducido: contenido y énfasis completos, sin desenfoque ni entradas. La preferencia puede cambiar durante la visita.
- Carrusel: se anima su contenedor. Se retira la entrada adicional de los slots; colocación, arrastre, autoplay, pausa, hover, foco y diálogos conservan su lógica. Se conserva el typewriter y la bienvenida.
- HTML estático de producción: el build genera un respaldo legible y versiones ES/EN con enlaces nativos y los cinco proyectos. Se muestran si JavaScript está desactivado; el límite de errores recupera el mismo contenido si falla la aplicación. Las acciones que requieren JavaScript se omiten en ese respaldo.

## Archivos de esta tarea

| Grupo | Archivos |
| --- | --- |
| Patrón común | `src/components/AnimatedContent.tsx`, `src/components/Reveal.tsx`, `src/hooks/useEntranceReady.ts` |
| Sobre mí | `src/components/About.tsx`, `src/components/About.css`, `src/components/ScrollRevealText.tsx`, `src/components/Principles.tsx` |
| Entradas por sección | `TechnologySection.tsx`, `Journey.tsx`, `ResearchSection.tsx`, `Languages.tsx`, `ProfessionalContact.tsx`, `KineticInvitation.tsx`, `ProjectPresentationHeading.tsx` en `src/components/` |
| Tarjetas y carrusel | `ExperienceCard.tsx`, `CredentialReveal.tsx`, `CredentialGallery.tsx`, `ProjectCarouselSlot.tsx`, `ProjectCarousel.css` en `src/components/` |
| Coordinación y respaldo | `src/App.tsx`, `src/main.tsx`, `scripts/prerender.mjs`, `package.json` |
| Evidencia | `docs/screenshots/portfolio-motion/`, `docs/previews/portfolio-motion.html`, `docs/previews/portfolio-motion.gif`, este documento |

Se preservaron los cambios previos que ya existían en el directorio de trabajo. No se modificó `tests/portfolio.test.mjs` durante esta tarea.

## Verificación

- Compilación de producción con TypeScript y Vite: pasa, incluido el HTML estático ES/EN.
- ESLint: pasa.
- Chrome real, viewport de 1440 y 390 px: 16 combinaciones de ES/EN, claro/oscuro y movimiento normal/reducido. Sin errores de ejecución ni desbordamientos. Todas las palabras terminan con opacidad 1 y blur 0; ambos énfasis completos. Ningún grupo queda oculto y el párrafo no tiene un wrapper de entrada adicional.
- Autoplay: continúa al entrar en pantalla. Orden confirmado: inicio, sobre mí, proyectos, tecnologías, formación, contacto.
- Teclado a 390 px: menú y Escape, carrusel, diálogos de investigación y credenciales con devolución del foco, cambio de idioma/tema y cambio dinámico a movimiento reducido: pasan. Skip-link con foco visible.
- Producción sin JavaScript: ES/EN a 320 y 768 px, seis secciones y cinco proyectos visibles, navegación y énfasis completos, sin desbordamientos. Fallo simulado de IntersectionObserver: recupera el respaldo legible. Aplicación normal a 320 px: sin desbordamientos ni errores.
- Vista previa: reproductor HTML con tres clips capturados del navegador y controles de pausa/repetición; respeta movimiento reducido al abrir. GIF de las mismas capturas.
- Suite existente: 29 de 39 pruebas pasan. Las 10 fallidas contienen expectativas incompatibles con el estado actual del portafolio, entre ellas `.carousel-track`, la proporción antigua del retrato, el selector interactivo de principios, otro orden de secciones y un párrafo `h3`. No se presenta esa suite como aprobada ni se cambia el diseño para satisfacer sus expectativas antiguas.
- Inspector de diseño: ejecutado a 1440, 768 y 390 px; sin desbordamiento horizontal ni imágenes rotas. Señala reglas estéticas sobre el diseño conservado (etiquetas, monospace, tarjetas con borde/sombra, tamaño de notas e imágenes de los slots laterales superpuestas), además del fondo de énfasis solicitado. No se presenta como una auditoría estética aprobada; estas reglas no autorizan un rediseño fuera del alcance solicitado.

Evidencia detallada: `docs/screenshots/portfolio-motion/{validation,keyboard-validation,fallback-validation}.json`. Capturas de escritorio y móvil en ambos idiomas y temas en la misma carpeta. Pruebas en emulación de tamaños de Chrome; no se afirma prueba en hardware móvil físico.

No hay configuración local pendiente, nuevas dependencias ni publicación. El respaldo estático se regenera con `npm run build`.
