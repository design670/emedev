/* Idioma del sitio (español por defecto, inglés opcional).
   El idioma se decide al cargar la página: ?lang=en|es en la URL, si no, la última
   elección guardada. Cambiar de idioma recarga la página, así los datos
   (content.ts / pages.ts) y los textos t('es', 'en') salen en el idioma correcto. */

export type Lang = 'es' | 'en';

const KEY = 'emedev-lang';

function detect(): Lang {
  if (typeof window === 'undefined') return 'es';
  const q = new URLSearchParams(window.location.search).get('lang');
  if (q === 'en' || q === 'es') {
    try {
      localStorage.setItem(KEY, q);
    } catch {
      /* almacenamiento bloqueado: se usa solo el parámetro */
    }
    return q;
  }
  try {
    const saved = localStorage.getItem(KEY);
    if (saved === 'en' || saved === 'es') return saved;
  } catch {
    /* sin acceso a localStorage */
  }
  return 'es';
}

export const lang: Lang = detect();
export const isEn = lang === 'en';

if (typeof document !== 'undefined') {
  document.documentElement.lang = isEn ? 'en' : 'es-CO';
}

/** Devuelve el texto en el idioma actual: t('Casos', 'Case studies'). */
export function t<T>(es: T, en: T): T {
  return isEn ? en : es;
}

/** Cambia el idioma y recarga la página en la misma ruta. */
export function setLang(next: Lang) {
  if (next === lang) return;
  try {
    localStorage.setItem(KEY, next);
  } catch {
    /* sin acceso a localStorage: se usa el parámetro de la URL */
  }
  const url = new URL(window.location.href);
  url.searchParams.set('lang', next);
  window.location.replace(url.toString());
}
