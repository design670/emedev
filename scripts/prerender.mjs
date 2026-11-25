/* Prerender de rutas (corre al final de `npm run build`).
   1. Carga la entrada de servidor compilada en dist-ssr/.
   2. Recorre el sitio desde /dev siguiendo los enlaces internos /dev/... del HTML generado.
   3. Escribe dist/<ruta>/index.html con el contenido de la página y su título, descripción
      y canonical, más dist/404.html (noindex) y dist/sitemap.xml con todas las rutas.
   Así Google y los buscadores de IA leen cada página sin ejecutar JavaScript. */

import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const SSR_DIR = join(ROOT, 'dist-ssr');
const ORIGIN = 'https://e-me.co';
const HOME = '/dev';

const { render } = await import(pathToFileURL(join(SSR_DIR, 'entry-server.js')).href);
const template = await readFile(join(DIST, 'index.html'), 'utf8');

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function setAttr(html, selector, attr, value) {
  // selector: fragmento único de la etiqueta, p. ej. 'name="description"'
  const re = new RegExp(`(<[^>]*${selector}[^>]*\\s${attr}=")[^"]*(")`, 's');
  if (!re.test(html)) throw new Error(`No se encontró ${selector} en index.html`);
  return html.replace(re, `$1${esc(value)}$2`);
}

function page(html, meta, path, { noindex = false } = {}) {
  let out = template;
  const url = ORIGIN + path;
  out = out.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(meta.title)}</title>`);
  out = setAttr(out, 'property="og:title"', 'content', meta.title);
  if (meta.description) {
    out = setAttr(out, 'name="description"', 'content', meta.description);
    out = setAttr(out, 'property="og:description"', 'content', meta.description);
  }
  out = setAttr(out, 'rel="canonical"', 'href', url);
  out = setAttr(out, 'property="og:url"', 'content', url);
  if (noindex) {
    out = out.replace(/\s*<link rel="canonical"[^>]*>/, '');
    out = out.replace('</title>', '</title>\n    <meta name="robots" content="noindex" />');
  }
  if (!out.includes('<div id="root"></div>')) throw new Error('index.html no tiene <div id="root"></div>');
  return out.replace('<div id="root"></div>', `<div id="root">${html}</div>`);
}

async function write(file, content) {
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, content, 'utf8');
}

const LINK_RE = /href="(\/dev(?:\/[^"#?]*)?)/g;
const norm = (p) => p.replace(/\/+$/, '') || HOME;

const queue = [HOME];
const seen = new Set(queue);
const done = [];
const skipped = [];

while (queue.length) {
  const path = queue.shift();
  const { html, meta } = render(path);
  // rutas sin metadatos = redirecciones (las resuelve vercel.json) u otras sin contenido propio
  if (!meta) {
    skipped.push(path);
    continue;
  }
  if (meta.noindex) {
    skipped.push(`${path} (404)`);
    continue;
  }
  const file = path === HOME ? join(DIST, 'dev', 'index.html') : join(DIST, ...path.split('/').filter(Boolean), 'index.html');
  await write(file, page(html, meta, path));
  done.push(path);

  for (const m of html.matchAll(LINK_RE)) {
    const next = norm(m[1]);
    if (!seen.has(next)) {
      seen.add(next);
      queue.push(next);
    }
  }
}

// La raíz del dominio en este proyecto también es la Home
{
  const { html, meta } = render(HOME);
  await write(join(DIST, 'index.html'), page(html, meta, HOME));
}

// Página 404 (la sirve el hosting con estado 404 para cualquier ruta que no exista)
{
  const { html, meta } = render('/dev/__no-existe__');
  await write(join(DIST, '404.html'), page(html, meta, '/dev/404', { noindex: true }));
}

// Sitemap con todas las rutas generadas
const today = new Date().toISOString().slice(0, 10);
const sitemap =
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  done.map((p) => `  <url><loc>${ORIGIN}${p}</loc><lastmod>${today}</lastmod></url>`).join('\n') +
  '\n</urlset>\n';
// robots.txt apunta a /dev/sitemap.xml; se deja también en la raíz
await write(join(DIST, 'sitemap.xml'), sitemap);
await write(join(DIST, 'dev', 'sitemap.xml'), sitemap);

await rm(SSR_DIR, { recursive: true, force: true });

console.log(`Prerender: ${done.length} páginas + 404.html + sitemap.xml`);
if (skipped.length) console.log(`Sin generar: ${skipped.join(', ')}`);
