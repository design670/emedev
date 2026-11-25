import { createRoot, hydrateRoot } from 'react-dom/client';
import '@fontsource-variable/inter-tight';
import './styles/tokens.css';
import './styles/base.css';
import './styles/layout.css';
import './styles/sections.css';
import './styles/visuals.css';
import './styles/pages.css';
import { isEn } from './lib/i18n';
import App from './App';

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.classList.add('js-motion');
}
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
window.scrollTo(0, 0);

const root = document.getElementById('root')!;

/* En producción cada ruta llega prerenderizada en español (npm run build → scripts/prerender.mjs).
   Si el HTML ya trae la página, React la hidrata; en desarrollo, o si el visitante eligió
   inglés, se renderiza desde cero y reemplaza ese HTML. */
if (root.hasChildNodes() && !isEn) hydrateRoot(root, <App />);
else createRoot(root).render(<App />);
