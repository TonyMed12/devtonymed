# Recursos visuales

El monograma `tm.`, los patrones, las composiciones conceptuales de proyectos y los diagramas de investigación son componentes originales del proyecto. Las imágenes y los iconos que ya estaban en el repositorio se conservan.

## Iconos añadidos en esta iteración

- Devicon: Next.js, C#, TypeScript, Python, PHP, Pandas, NumPy, PostgreSQL, scikit-learn, Matplotlib, Google y AWS. Fuente: https://github.com/devicons/devicon/tree/master/icons. Licencia MIT, copyright (c) 2015 konpa. El texto íntegro se conserva en `tech/DEVICON-LICENSE.txt`.
- Simple Icons: Spring Boot. Fuente: https://github.com/simple-icons/simple-icons/blob/develop/icons/springboot.svg. Colección publicada bajo CC0 1.0; texto íntegro en `tech/SIMPLE-ICONS-LICENSE.txt`.
- SQL se representa con un símbolo genérico de base de datos creado en código. No identifica un motor concreto.
- XGBoost: logo PNG de https://xgboost.ai/images/logo/xgboost-logo.png, enlazado por su documentación oficial. Licencia del proyecto conservada en `tech/XGBOOST-LICENSE.txt`.
- imbalanced-learn: logo PNG de https://imbalanced-learn.org/stable/_static/logo_wide.png. Licencia conservada en `tech/IMBALANCED-LEARN-LICENSE.txt`.
- Seaborn: marca SVG de https://seaborn.pydata.org/_images/logo-mark-lightbg.svg, documentada en https://seaborn.pydata.org/citing.html. Se optimizó con SVGO sin cambiar su paleta. Licencia y reconocimiento conservados en `tech/SEABORN-LICENSE.txt`; diseño inicial atribuido a Matthias Bussonnier por la documentación oficial.
- Los símbolos de correo, GitHub, LinkedIn, copiar y navegación se dibujan con SVG en `src/components/Icons.tsx`.

Los nombres e iconos de tecnologías e instituciones identifican las herramientas y los emisores correspondientes. No indican afiliación ni patrocinio. Los recursos de terceros conservan sus marcas y sus condiciones aplicables. Para instituciones sin un logo disponible se utilizan etiquetas tipográficas, no emblemas institucionales inventados.

Las referencias de Motion, Rare UI, Framer Academy y MotionSites se utilizaron como inspiración. No se incorporó su código, contenido de pago ni una plantilla externa.

## Logos institucionales incorporados en la iteración 04

Recuperados de sitios oficiales el 16 de octubre de 2026 y usados para identificar la formación y la institución anfitriona. No expresan patrocinio, afiliación laboral ni obtención de un grado universitario. No se modificaron las proporciones de los archivos.

- `institutions/itm.png`: encabezado conjunto TecNM / Instituto Tecnológico de Morelia, localizado en el encabezado del sitio oficial. Archivo: https://morelia.tecnm.mx/assets/files/main/img/pleca-tecnm-itm.png
- `institutions/tecnm.png`: variante blanca disponible en https://www.tecnm.mx/images/LogoTecNM%20Blanco.png; conservada como recurso, la página usa el encabezado conjunto anterior.
- `institutions/cbtis147.png`: emblema del encabezado del sitio oficial CBTis 147: https://www.cbtis147.edu.mx/images/logo.png
- `institutions/cul.jpg`: escudo actual identificado en https://ul.edu.co/cul/informacion-institucional/logo.html. Archivo: https://ul.edu.co/images/logo/logo-03.jpg
- `institutions/upv.svg`: logo de Universitat Politècnica de València, emisor completo presente en los datos locales existentes: https://www.upv.es/imagenes/svg/logo-upv.svg. No se recibió el documento original de la credencial en esta solicitud.
- `institutions/utokyo.svg`: recurso público del pie institucional https://www.u-tokyo.ac.jp/content/400244322.svg. Identidad y condiciones: https://www.u-tokyo.ac.jp/ja/about/public-relations/visual_identity.html. La página de identidad indica un procedimiento de solicitud de uso; no se tramitó ni se afirma autorización institucional. Acompaña exclusivamente la identificación educativa de GCI.

Los logos se muestran sobre fondo blanco con `object-fit: contain`. Las marcas conservan las condiciones de sus titulares.

## Iteración 05 — laboratorio e identidad azul

- `institutions/matsuo-iwasawa.png`: logo auténtico “Matsuo-Iwasawa Lab UTokyo”, tomado del elemento `img.custom-logo` de https://weblab.t.u-tokyo.ac.jp/en/. Fuente exacta: https://weblab.t.u-tokyo.ac.jp/wp-content/uploads/2024/09/479f053d38b915662e871d114191a2b4-3.png. Se descargó y abrió para inspección. Identifica al laboratorio organizador de GCI; no acredita certificación o afiliación personal. Se conserva la proporción original y el apoyo blanco.
- El logo general `utokyo.svg` de la iteración anterior queda sin uso en la página; GCI muestra exclusivamente el del laboratorio.
- Los archivos de logos tecnológicos e institucionales conservan sus colores. La migración a azul se aplica a estilos, Canvas e identidad propia TM, incluido el favicon.
- Canvas y spotlight son implementaciones originales del proyecto. No se copió el código del fondo del compañero ni se añadió un paquete SpotlightCard. El símbolo de conversación es una ilustración de comunicación, no una marca.

La tabla de identificación de marcas en uso está en `docs/ITERATION-05.md`.

## Propuesta de fotografía Lanyard

- Lanyard Pass de BuiltByKern: https://www.framer.com/marketplace/components/lanyard-pass/ . Módulo indicado por el usuario: https://framer.com/m/Kern-LanyardPass-757vlY.js@tLX19FzkqPTLtw2tLnqO . Reexporta https://framerusercontent.com/modules/OBYThRcComdwLglVaxyE/tLX19FzkqPTLtw2tLnqO/Kern_LanyardPass.js . Se incorpora una adaptación a este portafolio, con el motor original y su atribución en `src/vendor/KernLanyardPass.js`.
- Licencia Limited Commercial License (Free Content), Framer Community Terms §7.3.1: https://www.framer.com/legal/community-terms . No es un componente MIT ni una creación original TM; no redistribuir como asset independiente o producto competidor.
- Three.js, MIT, https://github.com/mrdoob/three.js/blob/dev/LICENSE . La licencia instalada se conserva en `node_modules/three/LICENSE`; solo se usa como dependencia del renderizador.
- `tm-pass.svg`: variante propia del monograma TM sobre fondo azul, creada en SVG para esta prueba; no representa una institución. La fotografía es el archivo real `profesionaltony.jpg` existente, sin sustitución ni edición del bitmap.

Compatibilidad, cambios, rendimiento y límites de prueba visual: `docs/LANYARD-REVIEW.md`.

## Ilustraciones genéricas de proyectos

- `projects/caam.svg` y `projects/fraud.svg`: composiciones abstractas originales del proyecto, sin texto, logos ni referencias a una institución o a datos reales. Se usan en los proyectos que no tenían imagen.
