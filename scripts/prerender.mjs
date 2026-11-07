// A readable HTML snapshot survives disabled or failed client JavaScript.
// createRoot replaces this snapshot only when the interactive app mounts.
import { createServer } from 'vite';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
try {
  const { default: App } = await server.ssrLoadModule('/src/App.tsx');
  const template = await readFile('dist/index.html', 'utf8');
  const styles = `<style>
    [data-static-render] * { animation: none !important; transition: none !important; }
    [data-static-render] .site-header { flex-wrap: wrap; }
    [data-static-render] .main-nav { display: flex !important; position: static; flex-wrap: wrap; }
    [data-static-render] :is(.header-controls,button,.reading-progress,.typewriter-cursor) { display: none !important; }
    [data-static-render] .static-projects { display: grid; gap: 32px; }
    [data-static-render] .project-card { height: auto; overflow: visible; }
    [data-static-render] .project-body > * { opacity: 1 !important; transform: none !important; }
    .static-language { display: block; padding: 12px 5vw; }
  </style>`;
  await mkdir('dist/static', { recursive: true });
  for (const language of ['es', 'en']) {
    const content = renderToString(createElement(App, { staticView: true, staticLanguage: language }));
    const switcher = `<a class="static-language" href="/static/${language === 'es' ? 'en' : 'es'}.html">${language === 'es' ? 'Read in English' : 'Leer en español'}</a>`;
    const html = template.replace('<html lang="es">', `<html lang="${language}">`).replace('<div id="root"></div>', `<div id="root"><div data-static-render>${styles}${switcher}${content}</div></div>`);
    // Standalone language snapshots intentionally use native links and details.
    await writeFile(`dist/static/${language}.html`, html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, ''));
    if (language === 'es') await writeFile('dist/index.html', html);
  }
  console.log('Static HTML fallback generated (ES/EN).');
} finally { await server.close(); }
