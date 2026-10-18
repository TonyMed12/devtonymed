# Iteración 06 — ciclos automáticos y credenciales compactas

Implementada sobre la versión actual, conservando TM, la paleta azul, Motion/Lenis y los datos aprobados. No se añadieron dependencias, logos ni capturas de productos inventadas. Sin publicación ni despliegue.

## Implementación

- **Tecnologías:** marquee automático infinito de 100 segundos por ciclo. Dos secuencias iguales, con tamaños de icono reservados y separación uniforme; el desplazamiento del 50 % corresponde exactamente a una secuencia. La copia es `aria-hidden` e `inert`. Los nombres de tecnologías no cambian entre idiomas y las imágenes no determinan el ancho de los iconos. Pausa con hover/foco, página oculta y fuera de pantalla; movimiento reducido muestra una cuadrícula estática completa. Sin barra de scroll visible.
- **Proyectos:** avance con Motion tras seis segundos completos de lectura, reiniciados después de navegación manual y al terminar una pausa/transición. Ciclo con tres copias visuales inertes (última al inicio, dos primeras al final), sin IDs ni layoutId duplicados. Tras cruzar un extremo se reposiciona la pista a su equivalente original y su vecino, sin animar un retroceso por todos los proyectos. Se conservan flechas, indicadores, teclado y desplazamiento táctil; se añade arrastre con ratón. La pista ajusta su posición ante cambios de tamaño, manteniendo la tarjeta activa.
- **Pausas del carrusel:** hover, foco dentro, arrastre, transición, cualquier diálogo abierto, sección fuera de pantalla, pestaña oculta y preferencia de movimiento reducido. El avance automático no genera anuncios continuos de lector de pantalla. No se añadieron controles visibles de animación.
- **Trayectoria:** título breve, botones con etapa y periodo, superficie y borde, hover, foco y selección diferenciados. Indicador compartido con Motion y un único panel. En móvil los botones se distribuyen en filas, sin una pista recortada. Se conservan técnico, ingeniería actual, cédula y egreso previsto 2027.
- **Credenciales:** tarjetas pequeñas con logo, nombre, institución, estado, dato destacado y “Ver credencial”. La narración sale de la tarjeta exterior. Se abre el diálogo nativo centrado con título y logo compartidos mediante layoutId, ancho máximo de 650 px y altura limitada al viewport. Scroll interno, cierre visible, Escape, foco inicial y devolución a la tarjeta. Lenis excluye y respeta el diálogo. Ya no existe una ficha expandida debajo de la galería.
- **GCI:** mismo diseño compacto, logo oficial Matsuo–Iwasawa, estado En curso y periodo agosto–diciembre de 2026. La tarjeta muestra “Periodo transcurrido · XX %”, calculado, junto a una barra pequeña. El diálogo explica la estimación y conserva la descripción profesional.
- **Logos:** se reutilizan los recursos aprobados de Google, UPV, Matsuo–Iwasawa y AWS, con soporte blanco y `object-fit: contain` en tarjetas y diálogo. Ningún emisor se reemplaza por un escudo, nube o código genéricos. UPV conserva Microcredencial, 3 ECTS, cinco contenidos, estado e ID existentes.

## Cálculo temporal de GCI

`src/data/gciPeriod.ts` centraliza la referencia estimada del **1 de agosto de 2026** y el fin del **31 de diciembre de 2026**. Todas las fechas de cálculo y la fecha visible del detalle usan UTC y precisión de día:

`porcentaje = redondear(100 × limitar((díaActualUTC − inicioReferenciaUTC) / (finUTC − inicioReferenciaUTC), 0, 1))`

No se presupone que el curso empezara realmente el día 1. El detalle dice “Estimación del periodo, tomando agosto como mes de inicio” e identifica el día 1 como referencia de cálculo. La fecha se actualiza cada minuto y al volver a la pestaña. Es tiempo transcurrido, no clases ni tareas completadas. Llegar al 100 % no cambia En curso a Completado o Certificado.

Casos comprobados: 31 de julio → 0 %, 1 de agosto → 0 %, 16 de octubre → 50 %, 31 de diciembre → 100 %, fecha posterior → 100 %. Instantes equivalentes con diferente representación horaria producen el mismo resultado.

## Comprobaciones reales

- `npm.cmd run build`: correcto, TypeScript y Vite.
- `npm.cmd run lint`: correcto.
- `npm.cmd test`: **22 casos aprobados, 0 fallos**.
- Reloj controlado para el intervalo de 6000 ms: no avanza a los 5999 ms; avanza al completar el intervalo y termina la transición. Se comprueba el paso de última a primera y la posición equivalente, los controles manuales y el intervalo completo al retomar.
- Sensores simulados de hover, foco, arrastre, diálogo, visibilidad de pestaña, intersección y preferencia reducida: todos detienen el avance. Al salir de la pausa se programa un intervalo nuevo, sin acumular avances pendientes.
- Marquee: igualdad del contenido de los dos grupos, iconos con recursos locales y copia sin controles accesibles. Las reglas fijan dimensiones y ocultan barras; no se ha medido visualmente el reinicio del ciclo.
- Credenciales: apertura en diálogo, ES/EN desde su control interno, logo correcto, cierre con cancel/Escape, bloqueo/restauración del scroll y retorno del foco. Se comprueba ausencia de expansión en el documento.
- GCI: límites, cálculo UTC, porcentaje etiquetado, explicación de estimación y estado En curso después de finalizar el periodo.
- Se conservan las comprobaciones de `developer.json`, temas, anclas, recursos locales, contacto y copia de correo, contenidos UPV, teclado, Lenis, Canvas y rastro del cursor. Las pruebas de contraste calculan pares definidos de colores; no sustituyen una inspección de todas las composiciones.
- `git diff --check`: sin errores de espacios; solo avisos habituales de LF/CRLF en Windows.

## Archivos principales

- `src/components/TechnologyBand.tsx`: grupos del marquee y sensores de pausa.
- `src/components/ProjectCarousel.tsx`, `ProjectCard.tsx`: ciclo, avance, navegación, arrastre y copias inertes.
- `src/hooks/useAutoAdvance.ts`, `useModalOpen.ts`: temporizador reiniciable y detección de diálogos.
- `src/components/Journey.tsx`: selectores explícitos y panel único.
- `src/components/CredentialGallery.tsx`, `DetailDialog.tsx`: tarjetas y diálogo compartido.
- `src/data/gciPeriod.ts`, `src/hooks/useCurrentDate.ts`, `src/components/GciCalendar.tsx`: cálculo estimado y actualización de fecha.
- `src/automatic.css`: acabado de esta iteración, barra oculta, selectores que se acomodan en móvil y límites de diálogos.

## Límites y pendientes

No hay navegador conectado: el inventario devolvió cero aplicaciones y navegadores. No se generaron capturas. jsdom no tiene motor de layout; las geometrías, sensores, Canvas y desplazamientos de las pruebas son simulados. Quedan pendientes la continuidad perceptiva del marquee y del cruce circular, la inercia táctil real, la ausencia visual de desbordamientos, la altura aparente de las secciones, el ajuste de logos y las transiciones compartidas en los navegadores de destino.

Los estilos responsive y las reglas de contención se implementaron, pero no se presentan como revisión visual móvil/escritorio. Conviene revisar 390/768/1440 px, ES/EN y ambos temas, cargar imágenes lentamente y redimensionar mientras se mueve la banda.

Siguen pendientes el CV real, documentos originales de credenciales y confirmaciones individuales ya registradas en informes anteriores. No se alteraron los datos aprobados para completar esos huecos. Fuentes de los logos: `public/ASSET-CREDITS.md` e informe 05.
