# Iteración 02 · Marca Full-Stack Junior

Fecha: 16 de octubre de 2026. Trabajo local sobre la versión existente. Sin publicación, despliegue ni cambios de identidad del monograma.

## Problemas corregidos y resultado

1. El posicionamiento seguía orientado a una oportunidad específica de formación profesional. Ahora Tony aparece como **Desarrollador Full-Stack Junior disponible para trabajar y colaborar**, manteniendo la carrera como parte de su trayectoria. Se actualizaron presentación, contacto, pie y metadatos bilingües.
2. `developer.json` tenía valores literales en un solo idioma. `DeveloperTerminal.tsx` ahora los deriva de `profile.terminal` y recibe el idioma actual. Se traducen rol, enfoque, método y disponibilidad; las claves técnicas permanecen estables. No hay valores memorizados ni esperas de salida que congelen la traducción.
3. El movimiento se apoyaba principalmente en entradas de sección. Ahora hay selección compartida en tecnologías y capítulos, desplazamiento de contenido, expansión conectada en cursos/proyectos, respuestas al pulsar y profundidad ambiental pausada fuera de pantalla. Se conserva Motion como único sistema de animación.
4. Formación deja de ser una línea del tiempo y pasa a dos capítulos con navegación por flechas, Inicio/Fin y panel asociado. Las fechas son las ya disponibles: 2019–2022 y 2022–actualidad; To Do se vincula por cuarto semestre, sin deducir un año.
5. Los cursos pasan a una galería de cuatro fichas, con estados y evidencia. No se inventaron temarios ni aprendizajes personales. GCI y AWS permanecen en curso/preparación.
6. Se añadieron datos aportados en esta solicitud sobre ProjeXus, Centro de Atención Animal de Morelia y To Do. Se mantiene `caam` únicamente como ID interno para conservar anclas y datos. En la interfaz se utiliza el nombre completo; no se afirma una sigla oficial.
7. Las superficies nuevas definen colores consistentes para texto, selección, badges, fichas y contacto. El diálogo tiene tokens propios (`--panel-*`) para evitar que variables de una sección oscura determinen sus colores en modo claro.

## Referencias consultadas y aplicación

| Referencia concreta | Aplicación propia |
| --- | --- |
| [Motion Examples](https://motion.dev/examples), [Shared layout animation para React](https://motion.dev/examples/react-shared-layout-animation), [Smooth Tabs](https://examples.motion.dev/react/smooth-tabs) y [documentación de layout](https://motion.dev/docs/react-layout-animations) | Indicadores que se desplazan entre selección activa, transiciones de posición y expansión; utilizados en tecnologías, capítulos y cursos mediante `LayoutGroup` / `layoutId`. |
| [Rare UI · Folder component](https://www.rareui.com/components/foldercomponent) | Referencia conceptual para organizar formación en tarjetas que invitan a explorar contenido y responden a la activación. No se instaló ni copió el componente. |
| [Framer Academy · Master transitions and easing](https://www.framer.com/academy/lessons/framer-animations-transitions-and-easing) y [Animations](https://www.framer.com/academy/topics/animations) | Curva y duraciones consistentes, entradas breves y respuestas distintas de hover y pulsación. Se mantienen React/Vite y scroll nativo. No se migró a Framer. |
| [MotionSites · Atelier Unit Brand Studio Hero](https://motionsites.org/prompts/atelier-unit) | Referencia editorial de jerarquía de marca: monograma, titular de dos líneas, composición de retrato y contraste de acciones. Se consultó la ficha pública; no se obtuvo ni copió el recurso de pago. |

Estas referencias influyeron en las decisiones; no se reprodujo una página completa ni se incorporó código externo de esas colecciones. Los iconos descargados se documentan con sus licencias en `public/ASSET-CREDITS.md`.

## Precisión de contenido

- ProjeXus: frontend Next.js y backend Spring Boot, con TypeScript/Tailwind conservados del contenido disponible. Scrum Master, cinco personas, tareas, dailys, ERS, BPMN y planificación según esta solicitud. La tarjeta distingue stack del equipo de la aportación de coordinación.
- Centro de Atención Animal de Morelia: mismas responsabilidades de coordinación confirmadas; alcance de adopciones, registro/seguimiento y horarios veterinarios. No se le atribuye el stack de ProjeXus ni se afirma que todo esté terminado.
- To Do: práctica de C#, Java, SQL y relaciones de muchos a muchos en cuarto semestre. Sin inventar motor SQL, framework, arquitectura, despliegue o repositorio.
- React se relaciona con el código real de este portafolio; no se deduce participación en su uso a partir de Next.js.
- Delfín: institución, asesora, tema, verano de 2025 y resultado de revisión no publicada se conservaron de los registros locales. El desglose individual no se inventa.
- Fraude: se conserva el repositorio del equipo y el estado experimental fechado en su README, sin métricas nuevas ni atribución individual del trabajo del equipo.
- [Sitio oficial de GCI](https://weblab.t.u-tokyo.ac.jp/en/lecture/gci/): confirma Global Consumer Intelligence, laboratorio Matsuo-Iwasawa y The University of Tokyo. La oferta internacional actual se llama GCI World. No se asigna una edición a Tony sin constancia, ni se presenta como título universitario o certificado obtenido.

## Pruebas realizadas y límites

- Compilación TypeScript/Vite y ESLint: ambos terminaron correctamente, con código de salida 0.
- `npm test`: nueve pruebas de integración con React y jsdom. Cubren traducción de `developer.json` sin remonte; tarjetas abiertas y cambio de idioma; selección de tecnologías y evidencia; capítulos con flechas; credencial abierta, idioma y Escape; idioma dentro del modal y retorno de foco; portapapeles con éxito/error; temas, navegación, anclas y recursos; contraste de pares de color.
- El modal usa el comportamiento nativo de `<dialog>` para contención de foco. En jsdom se simulan `showModal`/`close`: la prueba confirma el código de cambio de idioma, cierre y restauración, pero no verifica la contención nativa real del navegador.
- Las pruebas se ejecutan con la preferencia de movimiento reducido activada. Verifican contenido y estados en esa condición, no la calidad visual de las animaciones normales.
- Los pares de texto/fondo comprobados cumplen al menos 4.5:1 para texto normal. Incluyen claro, oscuro, paneles de formación, selección, diálogo y contacto. Es una comprobación de colores definidos, no una medición de píxeles sobre degradados o retratos.
- Resultado final: 9 pruebas aprobadas, 0 fallos. Los 27 recursos gráficos locales referenciados existen. Los 11 SVG nuevos de tecnologías suman aproximadamente 49 KB y se sirven localmente. `git diff --check` terminó sin errores de espacios; los avisos LF/CRLF corresponden a la conversión habitual de Git en Windows.

**Sin verificación visual en navegador:** las herramientas de esta sesión no ofrecían aplicaciones ni navegadores conectados. No se hicieron capturas de escritorio/móvil, mediciones de overflow, comprobación perceptiva de las transiciones ni pruebas reales de teclado/portapapeles del navegador. El CSS conserva breakpoints de 1050, 800 y 760 px, y ajustes de 390 px; jsdom no calcula su distribución visual.

Revisión manual pendiente: 375/390, 768 y 1440 px; ambos temas e idiomas; abrir proyectos y cursos, cambiar idioma con contenido expandido; recorrer todo con Tab; navegar capítulos con flechas; cerrar investigación con Escape; copiar correo; activar movimiento reducido y verificar que el contenido no se desborde ni se pierda sobre fondos animados.

## Datos o recursos que faltan

- CV en PDF y confirmación de vigencia de los enlaces personales de GitHub/LinkedIn. El correo conserva el destino existente; no se envió nada.
- ProjeXus: repositorio/demo compartible, estado actual y desglose de cualquier implementación individual adicional a la coordinación confirmada.
- Centro de Atención Animal: stack, capturas, repositorio, demo, estado y funcionalidades terminadas. La sigla oficial no está comprobada.
- To Do: capturas, repositorio, motor SQL si se quiere nombrar y desglose individual. No hacen falta para presentar la experiencia confirmada con los tres lenguajes.
- Aquamarine: rol individual, repositorio/demo y estado. Biblioteca Digital permanece fuera de la página hasta contar con material vigente.
- Delfín y fraude: aportación técnica individual detallada y materiales compartibles; en Delfín no se afirma publicación.
- Google y UPV: fechas, documentos, temarios y URLs de verificación. Se conservan los IDs existentes sin fabricar enlaces.
- GCI: edición cursada, constancia y avances personales. AWS: plan de estudio y evidencia de progreso. No se afirman certificaciones obtenidas.
- Logos institucionales auténticos de ITM, CBTis, UPV, Delfín y GCI no disponibles en los materiales locales. Se usan nombres y monogramas tipográficos; Google y AWS tienen recursos identificados con atribución.

La instalación sigue informando 26 alertas de dependencias (la misma cifra de la versión previa). No se actualizaron de forma masiva las herramientas existentes durante esta iteración; esa revisión sigue pendiente.
