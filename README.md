# Portafolio · Full-Stack Junior

Portafolio de José Antonio Medina Ayala, estudiante de Ingeniería en Sistemas Computacionales en el Instituto Tecnológico de Morelia. Conserva el monograma `tm.`, las fuentes locales y una paleta azul en temas claro y oscuro. Sin publicación ni despliegue.

Última propuesta: [iteración 10 · reestructuración integral](docs/ITERATION-10.md). Proyectos inmediatamente después de la presentación, una hoja de estilos activa, contenido ampliado bajo desplegables, investigación en filas, credenciales compactas y contacto directo. [Vista previa](http://127.0.0.1:5177/) · [Proyectos](http://127.0.0.1:5177/#proyectos) · [Contacto](http://127.0.0.1:5177/#contacto).

Habilidades solicitadas instaladas en `.agents/skills/`, con procedencia y hashes en `skills-lock.json`. El informe identifica las guías realmente utilizadas, las limitaciones de sus herramientas y la copia recuperable anterior a esta reestructuración.

## Propuesta de fotografía: Lanyard Pass

La [iteración 07](docs/ITERATION-07.md) añade nombre como H1, bienvenida bilingüe por sesión, typewriter, fotografía ampliada y cuatro adaptaciones de componentes Framer inspeccionados. Incluye procedencia, propiedades, pruebas y límites pendientes de revisión visual. Metadatos y futura URL centralizados en `src/data/site.ts`.

Variante reversible basada en el código de BuiltByKern, adaptada a React/Vite con Three.js diferido. [Informe de inspección, licencia y pruebas](docs/LANYARD-REVIEW.md).

- [Pase con foto real](http://127.0.0.1:5177/?portrait=lanyard)
- [Presentación anterior](http://127.0.0.1:5177/?portrait=classic)

Para iniciar esos enlaces: `npm run dev -- --host 127.0.0.1 --port 5177 --strictPort`. Cambiar `portrait.defaultVariant` en `src/data/portrait.ts` a `classic` restaura la opción previa. La preferencia de movimiento reducido y los fallos de carga muestran la foto estática. No se publicó.

Compilación y lint correctos; **39 pruebas aprobadas**. CSS generado de 49,39 kB frente a 104,67 kB de la versión anterior; ninguna dependencia nueva de aplicación. El gafete/Three conserva un aviso de tamaño de chunk diferido. La revisión visual y las capturas están pendientes: Computer Use se detuvo al no poder verificar la URL de Windows. JSDOM no demuestra nitidez, composición ni gestos de un móvil real.
## Ejecutar y comprobar

```sh
npm install
npm run dev
npm run build
npm run lint
npm test
```

En Windows puede usarse `npm.cmd`. Stack: React 19, TypeScript, Vite, Tailwind, Motion 14.3.0 y Lenis 1.3.27; jsdom solo para pruebas de componentes.

## Contenido e interacciones

- Presentación Full-Stack Junior y disponibilidad, ES/EN, temas y `developer.json` traducido.
- Tecnologías con iconos, banda que pausa con hover/foco y selector con contexto de aplicación. El stack del equipo se distingue de la experiencia personal.
- Carrusel automático de cinco proyectos, con intervalo de seis segundos, pausas por interacción/visibilidad, flechas, teclado y arrastre táctil o con ratón. Diálogos con problema, contribución, organización y aprendizaje. Biblioteca Digital permanece en los datos, fuera de la página pública.
- Trayectoria compacta con tres etapas y un único panel seleccionable. Especialidad, 94/100 y egreso previsto 2027 presentes. Cédula con enlace general oficial de consulta, sin validación simulada.
- Investigación con identidad institucional. Credenciales en tarjetas breves que abren diálogos centrados. GCI muestra un porcentaje temporal estimado de agosto a diciembre de 2026, sin convertirlo en progreso académico ni certificación automática.
- Idiomas: español nativo y B2 reportado con certificación pendiente, en un bloque breve.
- Contacto, copia real del correo y enlaces de currículum en presentación y contacto.
- Movimiento adaptado a la preferencia del sistema, sin controles propios. Bienvenida, gafete adaptado, Canvas limitado al inicio, estados compartidos y cursor nativo. Se retiraron el rastro, ojos, descifrado de nombre y apertura por hover de contacto.

## Dónde editar

| Archivo | Uso |
| --- | --- |
| `src/data/site.ts` | Nombre, currículum, cédula y fuentes académicas. Cambiar `resumeHref` al disponer del documento real; ahora apunta a `#inicio`. |
| `src/data/experience.ts` | Perfil bilingüe, terminal, aportaciones de proyectos y cursos. |
| `src/data/education.ts` | Estaciones, fechas, estado formativo y logos. |
| `src/data/portfolio.ts` | Proyectos, tecnologías, imágenes, repositorios y datos conservados. |
| `src/data/contact.ts` | Correo, GitHub y LinkedIn. |
| `src/data/ui.ts`, `src/data/i18n.ts` | Traducciones y aplicaciones de tecnologías. |
| `src/data/principles.ts` | Curiosidad, propósito y precisión. |
| `src/components/` | Carrusel, diálogos, recorrido, cursos, calendario, idiomas y contacto. |
| `src/hooks/` | Preferencias, visibilidad y efectos del puntero. |
| `src/portfolio.css` | Único sistema visual activo, junto con la base de fuentes en `src/index.css`. Los CSS anteriores se conservan como historia, sin importarse. |
| `src/data/motion.ts` | Curva y tiempos compartidos de Motion; reflejados en los tokens CSS. |
| `src/data/gciPeriod.ts` | Referencias UTC y porcentaje estimado del periodo de GCI. |
| `tests/portfolio.test.mjs` | Integración con React/jsdom, recursos y pares de contraste. |

Para añadir un proyecto, completar `projects` y `projectStories`. No atribuir toda la implementación del equipo al autor. Para tecnologías, completar su aplicación bilingüe y usar `personal: false` cuando corresponda al stack del equipo.

## Movimiento

`useReducedMotion` escucha la preferencia reactiva del sistema. Lenis suaviza la rueda vertical usando el reloj de Motion; touch, pistas horizontales y diálogos mantienen su desplazamiento nativo. El Canvas queda limitado al inicio y se detiene al asentarse. La banda usa dos secuencias iguales; pausa con hover/foco y queda estática con movimiento reducido. El carrusel avanza después de seis segundos, pausa al interactuar, ante diálogos y fuera de pantalla, y conserva navegación manual; el teclado alinea de inmediato. Las credenciales usan diálogo nativo y la trayectoria un panel seleccionable. Con movimiento reducido se usa desplazamiento nativo y foto estática.

## Verificación y recursos pendientes

Ver [informe vigente de la iteración 10](docs/ITERATION-10.md): 39 pruebas aprobadas, compilación y lint correctos, respaldo recuperable, habilidades utilizadas y enlace temporal de CV. Las capturas, revisión visual responsive, GPU y táctil real siguen pendientes por el bloqueo de Computer Use; jsdom no sustituye esa revisión.

Se conservan como registro [iteración 05](docs/ITERATION-05.md), [iteración 04](docs/ITERATION-04.md), [iteración 03](docs/ITERATION-03.md) e [iteración 02](docs/ITERATION-02.md). Procedencia y condiciones de recursos en [ASSET-CREDITS.md](public/ASSET-CREDITS.md).
