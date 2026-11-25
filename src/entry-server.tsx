import { renderToString } from 'react-dom/server';
import App from './App';
import { setServerPath, getServerMeta, type PageMeta } from './lib/router';

/* Entrada del prerender: genera el HTML de una ruta y los metadatos que declaró la página.
   La usa scripts/prerender.mjs después del build del cliente. */
export function render(path: string): { html: string; meta: PageMeta | null } {
  setServerPath(path);
  const html = renderToString(<App />);
  return { html, meta: getServerMeta() };
}
