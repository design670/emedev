import { useEffect, useState } from 'react';
import { gsap, getLenis, prefersReduced, ScrollTrigger } from './motion';

/* Router mínimo con History API (sin dependencias).
   Intercepta los enlaces internos /dev/... y hace una transición de cortina
   entre páginas para mantener la continuidad del movimiento. */

export const HOME = '/dev';

export const normalize = (p: string) => {
  let path = p.replace(/\/+$/, '') || '/';
  if (path === '/') path = HOME;
  return path;
};

type Listener = (path: string) => void;
const listeners = new Set<Listener>();
let current = typeof window !== 'undefined' ? normalize(window.location.pathname) : HOME;
let busy = false;

export const getPath = () => current;

function curtain(): HTMLElement | null {
  return document.querySelector('.page-curtain');
}

function scrollTop() {
  const lenis = getLenis();
  if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
  window.scrollTo(0, 0);
}

function scrollToHash(hash: string) {
  if (!hash) return;
  const el = document.querySelector<HTMLElement>(hash);
  if (!el) return;
  const lenis = getLenis();
  if (lenis) lenis.scrollTo(el, { offset: -60, immediate: true, force: true });
  else el.scrollIntoView();
}

function commit(path: string, hash: string) {
  current = path;
  listeners.forEach((l) => l(path));
  // esperar al render de la nueva página
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      if (hash) scrollToHash(hash);
      else scrollTop();
      ScrollTrigger.refresh();
    }),
  );
}

export function navigate(to: string, { replace = false } = {}) {
  const url = new URL(to, window.location.origin);
  const path = normalize(url.pathname);
  const hash = url.hash;
  if (busy) return;

  if (path === current) {
    if (hash) {
      const el = document.querySelector<HTMLElement>(hash);
      const lenis = getLenis();
      if (el && lenis) lenis.scrollTo(el, { offset: -60, duration: 1.4 });
      else el?.scrollIntoView({ behavior: 'smooth' });
    } else {
      const lenis = getLenis();
      if (lenis) lenis.scrollTo(0, { duration: 1.2 });
      else window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    return;
  }

  const fullUrl = path + hash;
  if (replace) history.replaceState({}, '', fullUrl);
  else history.pushState({}, '', fullUrl);

  const el = curtain();
  if (!el || prefersReduced()) {
    commit(path, hash);
    return;
  }

  busy = true;
  const tl = gsap.timeline({
    onComplete: () => {
      busy = false;
    },
  });
  tl.set(el, { display: 'block', clipPath: 'inset(100% 0% 0% 0%)' })
    .to(el, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.6, ease: 'expo.inOut' })
    .fromTo(el.querySelector('.page-curtain__bar'), { scaleX: 0 }, { scaleX: 1, duration: 0.45, ease: 'power2.inOut' }, '-=0.25')
    .add(() => commit(path, hash))
    .to(el, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.75, ease: 'expo.inOut', delay: 0.12 })
    .set(el, { display: 'none' });
}

export function usePath() {
  const [path, setPath] = useState(current);
  useEffect(() => {
    const l: Listener = (p) => setPath(p);
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  }, []);
  return path;
}

/* Interceptor global: cualquier <a href="/dev/..."> navega sin recargar. */
export function useLinkInterceptor() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement).closest('a');
      if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
      const href = a.getAttribute('href');
      if (!href) return;
      if (href.startsWith('#')) {
        // ancla de la Home usada desde otra página
        if (!document.querySelector(href)) {
          e.preventDefault();
          navigate(HOME + href);
        }
        return;
      }
      if (!href.startsWith('/')) return;
      e.preventDefault();
      navigate(href);
    };
    const onPop = () => {
      const path = normalize(window.location.pathname);
      commit(path, window.location.hash);
    };
    document.addEventListener('click', onClick);
    window.addEventListener('popstate', onPop);
    return () => {
      document.removeEventListener('click', onClick);
      window.removeEventListener('popstate', onPop);
    };
  }, []);
}

/* Título y descripción por página */
export function useMeta(title: string, description?: string) {
  useEffect(() => {
    document.title = title;
    if (description) {
      document.querySelector('meta[name="description"]')?.setAttribute('content', description);
      document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
    }
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
    const canonical = `https://e-me.co${current}`;
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', canonical);
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', canonical);
  }, [title, description]);
}
