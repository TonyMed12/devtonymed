# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

El propietario y protagonista confirmado es José Antonio Medina Ayala. La audiencia visitante todavía no está confirmada. **Hipótesis de trabajo:** personas que evalúan su perfil para oportunidades profesionales, proyectos o colaboración. Esta hipótesis no acredita usuarios reales ni resultados de investigación.

## Product Purpose

Presentar el perfil profesional de José Antonio, sus contribuciones a proyectos, conocimientos, formación e investigación, y facilitar el contacto. Comunica disponibilidad para proyectos y oportunidades profesionales. No se han establecido métricas de conversión ni metas cuantitativas.

## Positioning

Perfil de Desarrollador Full-Stack Junior y estudiante de Ingeniería en Sistemas Computacionales del Instituto Tecnológico de Morelia. Combina construcción de software, modelado de datos, planificación y coordinación de equipos. Cada proyecto distingue el contexto y la contribución personal; coordinar un equipo no debe presentarse como haber implementado todo el producto.

## Operating Context

Portafolio público adaptable a pantallas de escritorio y móviles, con contenido en español e inglés y preferencia de tema claro u oscuro. Permite consultar proyectos y ampliar fichas, explorar evidencias de tecnologías y consultar formación, investigación y credenciales. El contacto ofrece correo, GitHub y LinkedIn.

## Capabilities and Constraints

- Identidad, disponibilidad, fotografía real y acceso a contacto desde la presentación inicial.
- El retrato editorial conserva el archivo fotográfico original (`/profesionaltony.jpg`, 1200 × 1600) y define el recorte en código. Sustituye al gafete y al cordón; la presentación del retrato ya no depende de WebGL ni de Three.js.
- Proyectos con descripción, contribución y detalles; las evidencias y enlaces disponibles dependen de los datos de cada proyecto.
- Tecnologías relacionadas con experiencia concreta; formación y credenciales distinguen finalización, estudios en curso y preparación.
- Ingeniería en curso, noveno semestre, promedio de 94/100, especialidad en Tecnologías de Desarrollo de Software y egreso previsto en 2027. El egreso previsto no equivale a un título obtenido.
- Estancia de investigación en CUL, Barranquilla, en 2025 y presentación en el Congreso Internacional del XXX Verano de la Investigación Científica y Tecnológica del Pacífico.
- Microcredencial de Desarrollo de Software Seguro de la Universitat Politècnica de València, completada, con 3 ECTS.
- GCI del laboratorio Matsuo-Iwasawa de The University of Tokyo figura en curso. Su periodo visible va de agosto al 31 de diciembre de 2026. El 1 de agosto es una referencia estimada para el cálculo de avance temporal, no una fecha exacta acreditada ni progreso académico.
- Español nativo e inglés B2 reportado, con certificación pendiente. La preparación para AWS CloudOps Engineer – Associate tampoco equivale a certificación obtenida.
- El acceso a currículum existe, pero `site.resumeHref` apunta actualmente a `#inicio`: falta un documento o destino definitivo. No presentar el CV como descargable verificado.
- `tonymed.dev` es la identidad de dominio prevista y configurada en los datos; esto no demuestra propiedad, despliegue ni publicación.
- Se conserva la implementación React/TypeScript existente y no se requieren nuevas dependencias de ejecución para este rediseño. La lógica editorial vive en `src/data/*`.

## Brand Commitments

Nombre completo: José Antonio Medina Ayala. Firma: TonyMed / TM y `tonymed.dev`. Tono profesional, cercano y preciso. Curiosidad, propósito y precisión son principios confirmados. Se conserva la fotografía real en un retrato editorial, con formas TM y la identidad azul en los temas claro y oscuro. La bienvenida breve y la escritura progresiva forman parte de la presentación solicitada; deben respetar las preferencias de movimiento. La modificación autorizada sustituye la presentación anterior de gafete por este retrato.

## Evidence on Hand

Fuentes del producto: `src/data/site.ts`, `src/data/experience.ts`, `src/data/portfolio.ts`, `src/data/education.ts`, `src/data/principles.ts`, `src/data/contact.ts`, `src/data/gciPeriod.ts` y `src/data/ui.ts`. La fotografía y el recorte editorial se declaran en `src/data/portrait.ts`; las marcas institucionales se sirven desde `public/institutions/`. El texto vigente de contacto está en `src/components/ProfessionalContact.tsx`.

La invitación de contacto adapta Kinetic Typography / Reactive Typography de Orix Studio, módulo `Kinetic-Typography-AmloH2.js@tHy6gRwfgbJ04LktvYNT`, con procedencia indicada en `src/components/KineticInvitation.tsx` y licencia Limited registrada en `public/ASSET-CREDITS.md`. Preservar esos créditos; no atribuir el módulo original a TM ni describirlo como MIT.

Los datos y assets son evidencia disponible en el repositorio, no una verificación independiente de sus afirmaciones. No hay testimonios, clientes ni métricas comerciales confirmadas en este registro. No inventarlos. Los estados con fechas y las credenciales requieren revisión editorial cuando cambien.

## Product Principles

- Atribuir el trabajo con precisión y separar contribución personal, coordinación e investigación.
- Mostrar evidencia y estados reales antes de formular promesas sobre el perfil.
- Facilitar que las personas conozcan al autor y encuentren una vía de contacto visible.
- Mantener el significado del contenido al cambiar idioma, tema o preferencia de movimiento.

## Accessibility & Inclusion

Mantener navegación por teclado, foco visible, salto al contenido, nombres accesibles y diálogo con devolución de foco. Los datos esenciales y vías de contacto deben estar disponibles sin depender del hover. Respetar `prefers-reduced-motion` con alternativas estáticas y limitar reproducción cuando no hay visibilidad. No se declara certificación WCAG ni auditoría de accesibilidad completa.
