import { createRoot } from 'react-dom/client';
import '@fontsource-variable/inter-tight';
import './styles/tokens.css';
import './styles/base.css';
import './styles/layout.css';
import './styles/sections.css';
import './styles/visuals.css';
import './styles/pages.css';
import App from './App';

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.classList.add('js-motion');
}
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
window.scrollTo(0, 0);

createRoot(document.getElementById('root')!).render(
  <App />,
);
