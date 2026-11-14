# Portafolio · Full-Stack Junior

Portafolio de José Antonio Medina Ayala, estudiante de Ingeniería en Sistemas Computacionales en el Instituto Tecnológico de Morelia. Publicado en [tonymed.dev](https://tonymed.dev). Bilingüe (ES/EN), con temas claro y oscuro.

Stack: React 19, TypeScript, Vite, Tailwind, Motion y Lenis.

## Ejecutar y comprobar

```sh
npm install
npm run dev
npm run build
npm run lint
npm test
```

En Windows puede usarse `npm.cmd`.

## Dónde editar

| Archivo | Uso |
| --- | --- |
| `src/data/site.ts` | Nombre, dominio, currículum (`resumeHref`) y fuentes académicas. |
| `src/data/experience.ts` | Perfil bilingüe, propuesta de valor, disponibilidad y aportaciones por proyecto. |
| `src/data/portfolio.ts` | Proyectos, tecnologías, imágenes y repositorios. |
| `src/data/education.ts` | Formación, fechas y estado. |
| `src/data/contact.ts` | Correo, GitHub y LinkedIn. |
| `src/data/ui.ts`, `src/data/i18n.ts` | Textos de interfaz y traducciones. |
| `src/components/` | Secciones y componentes. |
| `src/portfolio.css` | Sistema visual activo. |
| `tests/portfolio.test.mjs` | Pruebas de integración con React y jsdom. |

Para añadir un proyecto, completar `projects` y `projectStories`. No atribuir toda la implementación del equipo al autor.

Procedencia y condiciones de recursos de terceros en [ASSET-CREDITS.md](public/ASSET-CREDITS.md).
