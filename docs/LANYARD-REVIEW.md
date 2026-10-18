# Propuesta de fotografía — Lanyard Pass

Resultado: **adaptación del código original de BuiltByKern**, incorporada al portafolio. No es una importación directa de Framer ni una imitación creada desde cero. No se publicó el sitio.

## Vista previa y reversión

Servidor de revisión local: `npm run dev -- --host 127.0.0.1 --port 5177 --strictPort`.

- [Pase adaptado](http://127.0.0.1:5177/?portrait=lanyard)
- [Fotografía anterior](http://127.0.0.1:5177/?portrait=classic)

Ambos destinos y sus recursos respondieron HTTP 200. Se mantiene el servidor iniciado para esta revisión local; no es alojamiento público. Se puede reiniciar con el comando anterior si la sesión se cierra.

`src/data/portrait.ts` centraliza la variante predeterminada, fotografía, logo, altura, colores, textos y opciones. Cambiar `defaultVariant` a `classic` restaura la presentación anterior. El parámetro `portrait` permite comparar sin cambiar archivos. `ClassicPortrait.tsx` conserva la composición anterior y también proporciona la alternativa estática.

## Inspección del componente

El enlace indicado devuelve un módulo de 322 bytes que reexporta este archivo de 72.332 bytes:

https://framerusercontent.com/modules/OBYThRcComdwLglVaxyE/tLX19FzkqPTLtw2tLnqO/Kern_LanyardPass.js

Se descargó y leyó su código antes de incorporarlo. Importaciones originales: React y JSX runtime, `framer` (addPropertyControls, ControlType, useIsStaticRenderer), `framer-motion` (useReducedMotion) y `three`. Es un renderizador Three/WebGL con física propia de partículas/cuerda; no utiliza React Three Fiber, Rapier, modelos GLTF o texturas de correa externas.

| Grupo configurable original | Opciones observadas |
| --- | --- |
| Content | Nombre, línea secundaria, evento, fecha, número, código decorativo, reverso y texto de correa. |
| Look | Papel, tinta, acento, correa plana/cuerda, color, logo, fotografía, encuadre cover/inset, arte posterior, acabados gloss/matte/linen, foil, funda y textura PVC; fuentes de nombre/meta/número. |
| Layout | Tamaño 240–560 px, espesor 0,8–12 mm, margen 28–88 px y separación tipográfica 8–48 %. |
| Light | Ángulo, altura, intensidad y luz de borde. |
| Motion | Activar física o mantener reposo. |
| Preview | Enlaces del panel del editor al creador y a Framer; no son necesarios para renderizar el pase. |

El original ya contiene raycasting para agarrar la credencial, arrastre/lanzamiento, reposo, ajuste por ResizeObserver, pausa fuera de pantalla/pestaña oculta, limpieza de recursos y detección de pérdida de contexto WebGL. Solo evita el gesto táctil de página cuando el toque comienza sobre la tarjeta; el resto del escenario permite desplazarse.

## Condiciones de uso

La [ficha oficial de Lanyard Pass](https://www.framer.com/marketplace/components/lanyard-pass/) identifica a BuiltByKern y la licencia Limited para un componente gratuito. La [sección 7.3.1 de las condiciones de Framer](https://www.framer.com/legal/community-terms) permite usar y modificar contenido gratuito en proyectos propios, incorporado en un producto mayor. Prohíbe redistribuirlo como asset independiente o competidor y atribuirse su autoría. Se conserva el crédito en el archivo adaptado y aquí; no se presenta como componente original TM ni como software MIT.

La [documentación oficial sobre compartir componentes](https://www.framer.com/help/articles/sharing-components/) contempla su uso en entornos React externos mediante Copy Import. Esto respalda evaluar el uso externo, pero no hace compatibles por sí solos los imports específicos del editor. Los derechos siguen perteneciendo al creador. No se distribuye un paquete de componentes ni una plantilla para reventa.

## Adaptación al proyecto

- `src/vendor/KernLanyardPass.js`: cuerpo del motor original, con autoría y procedencia conservadas. Se retiraron controles, metadatos y enlaces del editor, y la dependencia de `framer`. El hook de movimiento se conecta a la preferencia reactiva del sistema ya utilizada por el portafolio; no se instaló otra copia de Motion.
- Se añadió únicamente Three.js 0.186.1, licencia MIT propia de esa biblioteca, no del componente. No se migró el proyecto ni se añadieron Fiber, Rapier u otro motor de físicas.
- Las APIs de Three utilizadas se importan explícitamente para permitir tree shaking. El pase y Three se cargan mediante `React.lazy`, después de comprobar WebGL2 y precargar los dos recursos locales. La variante clásica y el movimiento reducido evitan esta carga.
- Medición de producción: paquete principal de JS aproximadamente 441 KB / 143 KB gzip; bloque diferido del pase aproximadamente **598 KB / 156 KB gzip**. Vite avisa de que ese bloque supera 500 KB sin comprimir; el aviso queda visible y no se ocultó aumentando el límite. Es un coste real del renderizador 3D que debe valorarse durante la revisión.
- DPR limitado a 1,5, preferencia gráfica low-power y sin preserveDrawingBuffer. Se mantiene antialiasing y se libera también la textura de entorno al desmontar.
- Paleta azul, papel/tinta para tema claro y oscuro, acabado mate sin foil ni funda y correa azul con TM. En la cara aparecen TM y Full-Stack Developer. Se vaciaron evento, fecha, número y código para no introducir datos de una acreditación ficticia.
- Se usa exclusivamente `/profesionaltony.jpg` (fotografía real inspeccionada, 1200×1600), sin editar el archivo original. El dibujo en Canvas conserva proporciones y aplica acercamiento 1,6×, con referencia del rostro en torno a x=55 %, y=36 %. El texto queda en la zona inferior y el logo en la superior. Este encuadre es una propuesta pendiente de confirmación visual dentro del pase.
- `/tm-pass.svg` representa el monograma propio, no un sello de institución. No se utilizan la foto ni el logo de demostración remotos del componente original.
- Altura reservada de 420 px en escritorio y 370 px en móvil, en lugar del mínimo original ligado a size×1,72. La API local `stageHeight` permite ese ajuste sin estirar la foto.
- Se conserva la interacción de agarrar/lanzar, con intensidad algo menor y límites de la posición de la tarjeta basados en el encuadre de cámara. Lenis se excluye únicamente durante un agarre real dentro del pase, no sobre toda la presentación. Al cancelar/soltar/desenfocar se libera ese estado.
- Se conserva el titular “De la idea al código”, disponibilidad, monograma de cabecera y botones Ver currículum/Hablemos. El terminal y la composición general permanecen.

## Alternativa estática

`HeroPortrait.tsx` reserva el espacio antes de cargar, precarga foto/logo, comprueba WebGL2 y supervisa el estado del motor. Muestra la fotografía anterior mientras carga. Solicitar movimiento reducido, no disponer de WebGL2, fallar la carga del módulo/imagen, perder el contexto o superar 12 segundos de espera conserva esa fotografía. Un límite de errores cubre excepciones de React durante el montaje. Si la propia foto faltara físicamente, su texto alternativo permanece; no se inventa un retrato sustituto.

## Verificación real

- `npm.cmd run build`: correcto; incluye advertencia por el tamaño del bloque diferido, indicada arriba.
- `npm.cmd run lint`: correcto.
- `npm.cmd test`: **24 pruebas aprobadas, 0 fallos**.
- Nuevas pruebas: variante clásica conservada, selección por URL, foto auténtica y configuración TM/azul, espacio reservado, ausencia de inicialización WebGL con movimiento reducido, fallback por GPU no disponible y por error de recursos, liberación del contexto de sondeo. Las pruebas se ejecutan con jsdom y sensores simulados.
- Se conservan las comprobaciones de ambos temas, idiomas, `developer.json`, enlaces, teclado, diálogos, carrusel, marquee, Lenis, Canvas y contacto. No son capturas de navegador.
- HTTP 200 en ambas variantes, el adaptador, el módulo servido por Vite, la foto y el SVG propio. No hay un import HTTP de Framer en el paquete que ejecuta el portafolio.

## Bloqueo de la prueba visual

Computer Use detectó ventanas de Brave, pero se detuvo al intentar inspeccionar la del portafolio porque no pudo determinar su URL actual con suficiente certeza para aplicar sus controles de seguridad. Se suspendió la automatización de esa ventana. No se hicieron capturas ni se ensayó otra ruta de automatización del navegador para eludir ese bloqueo.

Por ello, **no se verificaron visualmente** escritorio/móvil, los píxeles finales de ambos temas, el encuadre dentro del objeto 3D, la liberación física del arrastre con ratón o pantalla táctil, la ausencia perceptiva de clipping y la fluidez GPU. El código responsive y los handlers están implementados; la vista previa permite revisarlos manualmente. No se afirma que esas pruebas físicas hayan pasado.

Revisión pendiente: comparar ambos enlaces a 390/768/1440 px; cambiar tema con el control existente; arrastrar por la foto, soltar y cancelar; deslizar fuera de la tarjeta para comprobar scroll; activar movimiento reducido; comprobar que rostro y botones permanecen visibles y que la presentación no gana una altura excesiva.
