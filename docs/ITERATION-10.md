# Iteración 10 · Reestructuración integral

Propuesta local implementada para revisión. Sin publicación, despliegue ni cambios de dominio.

## Dirección y decisiones

La página presenta primero a José Antonio Medina Ayala y después la evidencia de su trabajo. Conserva TM, tonymed.dev como dominio previsto, Full-Stack Junior, Ingeniería en Sistemas Computacionales, disponibilidad y azul en ambos temas.

| Antes | Ahora | Motivo |
| --- | --- | --- |
| Diez hojas de estilos acumuladas | `index.css` y un único sistema en `portfolio.css` | Una jerarquía y tokens que se pueden mantener sin encadenar iteraciones. |
| Sobre mí y explorador técnico antes del trabajo | Inicio → proyectos → tecnologías → sobre mí → trayectoria → contacto | Acercar la evidencia al nombre y posicionamiento. |
| Explorador técnico y JSON siempre desplegados | Banda visible; contexto técnico y `developer.json` en `<details>` nativos | Reducir lectura repetida conservando la exploración y el acceso por teclado. |
| Investigación con grandes paneles decorativos | Filas con institución, título, resultado y diálogo | Mostrar el contenido con una composición distinta a los proyectos. |
| Credenciales e idiomas extensos | Credenciales en filas de dos columnas; idiomas en una franja breve | Mantener institución, estado y evidencia sin alargar cada ficha. |
| Rastro del cursor, ojos y descifrado del nombre | Cursor nativo, nombre completo estable, contacto directo | Reservar la personalidad para bienvenida, gafete y contenido. |
| Apariencia de apertura por hover en contacto | Canales siempre visibles, sin estado de apertura | Mismo acceso con ratón, teclado y táctil. |

Los componentes y CSS anteriores se conservan como fuentes históricas, fuera del árbol de estilos activo. Las variantes antiguas de contacto ya no se cargan en la página; su recuperación completa está en el archivo de respaldo. `?portrait=classic` sigue disponible como alternativa del retrato.

## Presentación y fotografía

- Nombre real como H1, rol, disponibilidad y frase fija/typewriter con espacio reservado.
- CV y Hablemos son acciones principales; GitHub es secundario.
- Bienvenida de 1,45 segundos por montaje completo, salida coordinada con entradas de 60 ms entre grupos y typewriter posterior. Idioma y navegación no la repiten.
- El gafete sigue siendo la **adaptación de Kern Lanyard Pass**, no una importación directa del entorno Framer. Procedencia y licencia permanecen en [LANYARD-REVIEW.md](LANYARD-REVIEW.md).
- Carga WebGL después de la bienvenida. Reserva 480 px en escritorio y 320 px en móvil. Mantiene alternativa real estática por movimiento reducido, falta de WebGL, error o timeout.
- Encuadre proporcional más próximo en textura (`3.1`), metadatos algo menores y uso de la misma foto. No se retocaron rasgos ni se generó otra persona.
- Archivo original `public/profesionaltony.jpg`: 1200 × 1600, SHA256 `1674DA43BA40635C42FA84EBBB08D97ACD178AC0ADD4B2169D3059FBAA9634C3`, idéntico al estado anterior. El detalle facial disponible en esta fotografía limita la nitidez; el encuadre final requiere comprobarse en GPU real.

## Movimiento y recursos

`src/data/motion.ts` y los tokens de `portfolio.css` definen una curva `cubic-bezier(0.23, 1, 0.32, 1)`: respuesta 160 ms, estados y diálogos 240 ms, entrada 400 ms, recorrido del carrusel 450 ms. La banda mantiene velocidad lineal; el gafete conserva física propia, sin forzarle una duración de UI.

Las acciones de teclado y el enfoque de proyectos alinean el carrusel de inmediato. El avance automático continúa a seis segundos con pausas por interacción, foco, arrastre, diálogo, visibilidad y preferencia de movimiento. Los duplicados siguen inertes. Lenis conserva un único reloj de Motion, anclas, scroll táctil nativo y exclusión del arrastre real del gafete.

El Canvas de fondo responde solamente mientras la presentación está activa; se detiene fuera de ella, con pestaña oculta o movimiento reducido. El globo conserva su carga diferida y orientación finita hacia Morelia. No se añadieron controles visibles de movimiento.

No se añadieron dependencias de aplicación: `package.json` y `package-lock.json` coinciden exactamente con los del respaldo anterior a esta reestructuración. Motion, Lenis y Three ya existían.

## Datos y accesibilidad

Se mantienen contribuciones reales y límites de alcance de ProjeXus, Centro de Atención Animal de Morelia y To Do. Investigación conserva el artículo de revisión no publicado, CUL/Barranquilla/2025 y presentación en el Congreso Internacional del XXX Verano de la Investigación Científica y Tecnológica del Pacífico; el título académico completo está en su diálogo.

Formación mantiene cédula 15938245 y consulta oficial, ISC/ITM/TecNM, especialidad en Tecnologías de Desarrollo de Software, promedio 94/100 y egreso previsto 2027. UPV conserva estado completado y 3 ECTS. GCI conserva Matsuo–Iwasawa, estado en curso y periodo agosto–31 de diciembre de 2026; el porcentaje dice **periodo transcurrido**, nunca actividades completadas. Inglés B2 sigue reportado con certificación pendiente, sin Voxy.

ES/EN incluye claves y valores de `developer.json`, desplegables, diálogos y etiquetas. Los diálogos nativos conservan entrada y restitución de foco. Logos locales se muestran contenidos, con soporte blanco para identidades que de otro modo se perderían en tema oscuro.

El enlace de CV sigue temporalmente configurado como `#inicio`, conforme a la instrucción del usuario: no existe un PDF confirmado y no se simula una descarga.

## Habilidades instaladas y utilizadas

Instalación local mediante la CLI solicitada (`npx skills add … --agent codex --yes`), sin configuración global del proyecto ni migración. Versiones/hashes en `skills-lock.json`; archivos en `.agents/skills/`, disponibles para siguientes sesiones del proyecto.

- **emilkowalski/skill:** instaló 15 habilidades. Se leyeron las guías pertinentes; se aplicaron `animate` y `animation-performance` para escoger CSS frente a Motion, propiedades, duración, interacción y movimiento reducido. Las habilidades de Expo/Swift no se aplicaron a esta web. `improve-animations` se consultó por alcance; su flujo de planes no sustituye la implementación solicitada.
- **pbakaus/impeccable:** se leyó `SKILL.md`, guías de contexto/nuevo trabajo y `craft-floor.md`. Se aplicaron jerarquía, contraste, reducción de repetición y revisión independiente del código. El comando `context --target src/App.tsx` falló porque falta `curl.exe`; se siguió el fallback documentado de lectura directa. No se afirma haber ejecutado su detector binario.
- **Leonxlnx/taste-skill / design-taste-frontend:** se leyó la habilidad y guías de texto/movimiento. Se generó una dirección preservando paleta y tipografía, semilla `1653829763`, `page-is-the-object`. Se adaptó su idea del objeto físico al gafete y a composiciones editoriales; no se aplicaron el hero de sala fotográfica, índice de 20–40 obras ni contacto sobre fotografía porque contradicen los recursos reales y el carrusel/gafete/contacto visibles solicitados. No se añadieron fotografías ajenas ni vídeo decorativo para cumplir una cuota de imágenes.
- **Sites y Computer Use:** guías del flujo local y tentativa de inspección de la vista previa. No se utilizó hosting.

No se ejecutó `inspect.mjs` ni una vía alternativa de automatización de navegador después del bloqueo de Computer Use. No hay puntuaciones visuales ni capturas inventadas.

## Comprobaciones reales

- `npm.cmd run build`: correcto. CSS 49,39 kB / 10,94 kB gzip, frente a 104,67 kB / 21,56 kB de la iteración anterior. JS principal 452,43 kB / 146,78 kB gzip.
- `npm.cmd run lint`: correcto.
- `npm.cmd test`: **39/39 correctas**. Incluyen ES/EN, temas, teclado, foco al cerrar, pausas/avance/ciclos del carrusel, enlaces, credenciales, GCI, fotos de respaldo, dimensiones simuladas móvil/escritorio y carga WebGL diferida hasta la entrada.
- Contraste matemático de pares declarados ≥4,5:1. No equivale a medición de todos los píxeles renderizados.
- Auditoría estática de Taste sobre los 13 archivos principales modificados: **0 FAIL / 0 WARN**. Excepción explícita y justificada: sombra del diálogo real. No es una auditoría de todas las fuentes históricas retiradas ni una inspección del render.
- Vista previa existente `http://127.0.0.1:5177/`: HTTP 200.
- Revisión independiente: dos observaciones sobre etiquetas antes de títulos corregidas y verificadas por otro agente. Resolución limitada a código; sin aprobación visual.

Vite conserva el aviso de chunk grande: el módulo diferido del gafete/Three pesa 598,88 kB / 156,89 kB gzip. No se ocultó el aviso ni se incorporó otra biblioteca 3D.

## Verificación pendiente

El navegador de CUA no expone superficies (`apps: [], browsers: []`). Al seleccionar la ventana existente del portafolio, Computer Use se detuvo porque no pudo verificar con suficiente confianza su URL de Windows para aplicar la política. No se emitieron más acciones de navegador ni se eludió el bloqueo.

Por tanto están pendientes las capturas y el recorrido visual completo en 1440/768/390/320 px, ambos temas e idiomas; nitidez facial, recortes reales, foco visible, desbordamientos, rendimiento GPU y gestos en móvil físico. Las pruebas usan JSDOM y geometría simulada, no un motor de layout. La página está implementada, pero esos puntos no se presentan como aprobados.

## Recuperación

Respaldo completo anterior a cualquier edición de esta reestructuración:

`.tmp/baselines/before-restructure-20261016-233158.zip` (10.741.708 bytes).

Incluye `src`, `public`, pruebas, informes, manifiestos, lockfile, HTML y configuración; no contiene `.git`, `node_modules`, build ni secretos de entorno. No se restablecieron archivos de Git ni se sobrescribió trabajo ajeno.

Para comparar, extraerlo a una carpeta nueva y vacía, por ejemplo `.tmp/comparison-iteration09`, conservando el directorio actual. El ZIP permite recuperar el estado anterior; no hay restauración automática que borre cambios posteriores.
