# Iteración 04 — recorrido y exploración manual

Implementada sobre la versión existente, conservando el monograma `tm.`, la paleta, las fuentes locales y React / TypeScript / Vite / Motion. Sin publicación ni despliegue.

## Cambios

- Encabezado con monograma y preferencias globales de movimiento; presentación y contacto reescritos en ES/EN. Se conserva el nombre completo existente, José Antonio Medina Ayala, sin añadir “Tony” junto a la marca. `developer.json` y metadatos cambian de idioma.
- Dos enlaces “Ver currículum”, con icono de documento. El destino temporal es `#inicio`, centralizado en `src/data/site.ts` (`resumeHref`). No descarga ni abre un PDF.
- Banda sin botones de pausa dentro de la sección: se pausa con hover, foco, pestaña oculta o fuera de pantalla. “Movimiento → Reducido” en el encabezado detiene las animaciones continuas y presenta la banda completa estática. También se respeta automáticamente la preferencia del sistema.
- Carrusel manual de cinco proyectos, pista horizontal nativa con scroll snap, parte de la siguiente tarjeta visible, flechas, posición y botones directos. Flechas del teclado, Inicio y Fin; sin reproducción automática. Los diálogos contienen problema, contribución, organización, aprendizaje y tecnologías, con selector de idioma y retorno de foco al cerrar.
- Recorrido abierto de tres estaciones: técnico 2019–2022, ingeniería 2022–actualidad y egreso previsto 2027. Vía y marcador ligados al scroll nativo; tarjetas escalonadas, etapa actual destacada y futuro explícitamente previsto. En móvil la vía se simplifica; con movimiento reducido todas las etapas se mantienen estáticas.
- Cédula 15938245 destacada y enlace a la consulta general oficial de SEP. No se afirma una validación del registro personal.
- Logos institucionales locales, investigación con título específico de fraude e institución real; la estancia muestra Corporación Universitaria Latinoamericana y Barranquilla, Colombia · 2025. Taller de Investigación II permanece como contexto dentro del diálogo.
- Cursos narrados en primera persona, idiomas con Español nativo y B2 reportado en Voxy / certificación pendiente. Sin atribuir certificaciones TOEFL/IELTS.
- GCI mantiene estado En curso. Calendario por hitos mensuales agosto–diciembre de 2026, fin previsto 31 de diciembre, fecha actual de Ciudad de México actualizada cada minuto. No calcula porcentajes ni inventa un día de inicio. Nunca cambia a certificado por el paso del tiempo.
- Rastro breve con cursor nativo, subrayados, respuesta de tarjetas al puntero y estados de foco. Los párrafos permanecen estables.

## Fuentes y alcance

Consultadas el 16 de octubre de 2026. Estas fuentes describen instituciones o programas; no acreditan por sí mismas la trayectoria individual.

- [Oferta educativa del Departamento de Sistemas y Computación del ITM](https://dsc.morelia.tecnm.mx/oferta_educativa.php): el contenido oficial indexado confirma software, bases de datos, infraestructura y colaboración. El acceso directo fue intermitente; se contrastó con la retícula oficial recuperada.
- [Retícula oficial ISC, campus Morelia](https://morelia.tecnm.mx/assets/carreras/isc/Reticula%20Ingenieria%20en%20Sistemas%20Computacionales.pdf): ISIC-2010-224. Se utiliza como referencia formativa general; no se recuperó el expediente ni la retícula individual. El texto no adjudica una especialidad, asignaturas cursadas ni dominio completo del perfil de egreso.
- [Programación, CBTis 147](https://cbtis147.edu.mx/programacion.php): base institucional para programación, aplicaciones y datos. No se atribuye el plan actual completo a la cohorte 2019–2022. Nombre y número de cédula se conservan de los datos locales existentes.
- [Portal oficial de cédula profesional](https://www.gob.mx/cedulaprofesional): destino genérico. La consulta pública puede presentar restricciones de acceso; no se creó una supuesta URL personal ni se verificó automáticamente el número.
- [Global Consumer Intelligence, Matsuo-Iwasawa Laboratory, The University of Tokyo](https://weblab.t.u-tokyo.ac.jp/en/lecture/gci/): confirma nombre y organización. El periodo personal agosto–31 de diciembre de 2026 procede de esta solicitud. No se equipara a una edición concreta del calendario público del programa.
- [Universitat Politècnica de València](https://www.upv.es/): el emisor completo ya estaba escrito en los datos del portafolio, no se dedujo de “UPV”. No se adjuntó aquí el certificado original. Se conserva el ID existente sin inventar URL de verificación, fecha, temario o edición.
- [Identidad institucional CUL](https://ul.edu.co/cul/informacion-institucional/logo.html): se identificó el escudo actual frente a versiones históricas.
- [Identidad visual de The University of Tokyo](https://www.u-tokyo.ac.jp/ja/about/public-relations/visual_identity.html): fuente de identificación de la marca; sus condiciones de uso siguen siendo aplicables. El logo acompaña el curso, sin afirmar grado, afiliación o patrocinio.

Las procedencias exactas de los archivos están en `public/ASSET-CREDITS.md`.

## Comprobaciones reales

- `npm.cmd run build`: correcto (TypeScript + Vite).
- `npm.cmd run lint`: correcto.
- `npm.cmd test`: 16 casos aprobados, 0 fallos.
- React/jsdom: ES/EN y `developer.json`, diálogos y retorno de foco, carrusel con desplazamientos simulados y límites de teclado, ruta completa y etapa futura, calendario GCI en octubre de 2026 y enero de 2027, idiomas y currículum, copia de correo con éxito/error, temas, anclas, existencia de imágenes locales y relaciones `aria-controls`.
- Preferencias: cambios de sistema y del sitio durante la visita, pausa de banda por foco/hover/visibilidad/viewport y ausencia de estela con movimiento reducido o puntero grueso. Los sensores se simularon.
- La prueba del rastro confirma actualizaciones DOM sin commits React; no es una medición de FPS.
- Contraste: cálculo de pares de colores definidos en los estilos para ambos temas, tarjetas oscuras y diálogos. No es una auditoría visual completa de todas las composiciones. Los logos usan fondos claros y `object-fit: contain`.
- Se abrieron las imágenes raster institucionales de ITM/TecNM, CBTis 147 y CUL para identificar sus marcas. Esto no equivale a revisar su composición en la página.

## Pendientes y límites de revisión

- En el adjunto de esta solicitud solo existe `Texto pegado.txt`. No se recibieron las capturas del portafolio del compañero; no se afirma haberlas revisado.
- No hay navegador conectado disponible. jsdom carece de motor de layout: quedan pendientes la revisión visual real en móvil/escritorio, gestos táctiles, altura y encuadre perceptivo del carrusel, dibujo de la vía, ausencia de desbordamientos, fluidez y contraste del resultado compuesto. Los estilos responsive se implementaron, pero no se presentan como validados visualmente.
- Falta el archivo real de currículum para reemplazar `site.resumeHref`.
- Faltan documentos originales de credenciales (especialmente el emisor UPV), resultado de Voxy y evidencia adicional de contribuciones individuales, demos y finalización de formación. No se generaron enlaces o certificados inexistentes. Se conservan los IDs existentes de Google y UPV; el único enlace público nuevo de curso es el programa oficial GCI.
- No se validaron por sesión autenticada los destinos personales GitHub/LinkedIn ni se enviaron mensajes. Se conservaron las direcciones existentes y se comprobaron sus acciones y enlaces en el DOM.
- El egreso 2027 y el fin de GCI siguen siendo previstos; requieren confirmación para cambiar a completados.
