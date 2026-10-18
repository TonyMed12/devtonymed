# Ampliación visual · De la idea al código

Implementación local del 16 de octubre de 2026. Se conservan el logo, el posicionamiento Full-Stack Junior, las secciones y los datos de proyectos. No se publica ni despliega el sitio.

## Referencias y alcance real de la consulta

No había aplicaciones ni navegadores conectados en las herramientas de esta sesión. **No se observaron visualmente las animaciones de ninguna referencia ni se compararon sus respuestas al puntero.** La consulta web proporciona contenido/estructura, no una reproducción del movimiento.

| Referencia solicitada | Acceso obtenido y decisión |
| --- | --- |
| [portfolio-xplq · Sobre mí](https://portfolio-xplq.vercel.app/#sobre-mi) | La URL no fue accesible desde la herramienta web. No se atribuyen a ese sitio patrones observados. La composición de principios se diseñó a partir del texto y requisitos de Tony. |
| [Achyut Katiyar](https://www.achyutkatiyar.com/) | Se consultó el documento, con presentación profesional, tecnologías y proyectos; el fondo y sus animaciones no se pudieron observar. No se copiaron sus datos, habilidades ni afirmaciones. |
| [Mohd Ubaid Khan](https://mdubaid.in/) | Se consultó el documento de presentación, sobre mí y contacto. Su movimiento de fondo no se pudo inspeccionar. No se le atribuye el efecto implementado. |
| [parish.cv](https://parish.cv/) | El documento accesible contiene una secuencia de tecnologías con iconos y una repetición del mismo conjunto. Se tomó la dirección de banda continua pedida por Tony; no se observó su velocidad o continuidad visual, ni se añadieron tecnologías de ese perfil. |

Ante esa limitación, la dirección definida es propia: un trazo curvo de dos arcos y un punto que recupera la **m** del monograma `tm.`. Se sustituyó la mezcla anterior de órbitas, cuadrícula y marca de fondo por esa familia única. No hay partículas, shader, canvas pesado ni una librería de cursor añadida.

## Implementación

- **Fondo:** SVG original con una deriva lenta. La versión clara utiliza verde suave sobre papel; la oscura, tinta/verde y un acento lima. El bloque de texto del hero tiene una superficie opaca del tema, para que el movimiento no altere su fondo de lectura. Retrato y terminal conservan superficies sólidas.
- **Puntero:** en equipos con `(hover: hover) and (pointer: fine)`, el fondo responde con desplazamientos acotados de 16/12 px y resortes de Motion. Las lecturas se agrupan en un único `requestAnimationFrame`. Se detiene fuera de pantalla, con pestaña oculta y mediante el control existente.
- **Estela:** tres marcas pequeñas derivadas del trazo y punto. Mantiene el cursor nativo, usa `pointer-events: none`, no crea elementos por cada evento ni actualiza React al mover el puntero. Su alcance está limitado a 30 px y desaparece tras 180 ms. Se oculta al salir, perder foco o recibir eventos táctiles; no se monta con puntero grueso o movimiento reducido.
- **Principios:** Curiosidad, Propósito y Precisión mantienen sus nombres visibles. Botones nativos con `aria-pressed`, foco visible y región explicativa asociada. La selección mueve un indicador compartido; las explicaciones derivan del idioma actual sin mantener texto anterior en una animación de salida. Los textos en español son los proporcionados por Tony.
- **Banda:** una lista informativa completa con iconos/nombres y una copia decorativa `aria-hidden` / `inert`, sin controles duplicados. No hay enlaces o botones que viajen fuera de la pantalla al enfocar. La consulta interactiva de uso/proyectos se mantiene debajo, con los botones y filtros existentes.
- **Continuidad:** dos cajas de secuencia idénticas, con espaciado incluido en cada caja, se desplazan exactamente la mitad del ancho total. Cada secuencia cubre como mínimo el ancho del viewport; se utilizan dimensiones CSS, sin medir una distancia fija al montar ni reiniciar la animación en cada resize. El recorrido de una secuencia dura 105 s en escritorio y 120 s en móvil.
- **Pausas de banda:** control explícito, hover de ratón, foco dentro, pestaña oculta y salida del viewport. Si el control tiene foco al reanudar, la banda sigue detenida hasta salir con Tab, y la descripción lo explica. El estado de pausa explícito se conserva al cambiar de idioma.
- **Movimiento reducido:** cuadrícula estática, sin copia visible, fondo fijo y sin estela. Un hook basado en `useSyncExternalStore` escucha cambios de preferencia durante la visita. Se añadió porque el hook de la versión instalada de Motion conserva el valor inicial; no se cambió de librería.

## Archivos principales

- `src/components/BrandBackdrop.tsx`: fondo y estela, con limpieza de listeners y frames.
- `src/components/Principles.tsx`, `src/data/principles.ts`: interacción y contenido bilingüe.
- `src/components/TechnologyBand.tsx`: secuencias, pausas y alternativa estática.
- `src/brand-motion.css`: composición, variaciones claro/oscuro, móvil y movimiento reducido.
- `src/hooks/useMediaQuery.ts`, `useReducedMotion.ts`, `usePageVisible.ts`: preferencias y visibilidad reactivas.
- `src/App.tsx`, `TechnologySection.tsx`: integración en las posiciones existentes. Los componentes previos usan el hook reactivo de movimiento reducido.
- `src/components/Icons.tsx`, `public/tech/`: se completaron los logos de XGBoost, imbalanced-learn y Seaborn desde sus sitios oficiales; el SVG de Seaborn se optimizó de unos 269 KB a 68 KB. Se conservaron licencias y fuentes en `public/ASSET-CREDITS.md`.

No se añadieron dependencias de ejecución ni se modificó el catálogo de tecnologías del usuario.

## Validación real

Resultado final: `npm run build` y `npm run lint` correctos; `npm test` con 13 casos aprobados y 0 fallos; 30 referencias a imágenes locales comprobadas, todas existentes. `git diff --check` sin errores de espacios (solo avisos habituales de conversión LF/CRLF en Windows).

Se mantienen y amplían las pruebas de componentes con React/jsdom. La suite contiene trece casos: los nueve anteriores y cuatro adicionales sobre principios, lista estática/accesibilidad de copias, pausas con sensores simulados y estela.

Las nuevas pruebas verifican:

- Cambio de idioma con el principio seleccionado, conservando su selección y relaciones accesibles.
- Inclusión de Next.js, Spring Boot, Java, C# y SQL, nombres únicos en la lista principal y ausencia de controles en la copia decorativa.
- Pausa/reanudación por control, hover, foco, visibilidad de página y viewport, simulando los eventos del navegador.
- Transición entre movimiento normal/reducido y entre puntero fino/grueso durante la visita.
- Actualización y desvanecimiento de la estela con frames controlados, un solo frame pendiente y cancelación al recibir un evento táctil.
- Ausencia de commits de React durante esos movimientos, medida con React Profiler; no es un benchmark de FPS.
- Pares de contraste definidos para textos de ambos temas, banda y superficies de principios, además de las comprobaciones previas.

**Límites:** jsdom no tiene motor de layout. No se verificaron visualmente móvil/escritorio, continuidad perceptiva al redimensionar, velocidad aparente, respuesta física del puntero, contraste sobre el resultado compuesto o calidad de las transiciones. No se generaron capturas. La construcción de la pista evita distancias fijas y cajas desiguales, pero la ausencia de saltos requiere todavía esa comprobación real en navegador.

Revisión manual pendiente: 375/390, 768, 1440 y 2560 px; ES/EN; claro/oscuro; pausar con hover/Tab/control, salir y volver a la pestaña, desplazar fuera de pantalla, cambiar ancho mientras corre la banda y alternar la preferencia del sistema. En móvil comprobar toque, ausencia de estela y legibilidad; con movimiento reducido comprobar cuadrícula completa y contenido accesible.

Los pendientes de evidencia personal (CV, demos y desgloses individuales) siguen registrados en `ITERATION-02.md`; esta ampliación no inventa esos datos.
