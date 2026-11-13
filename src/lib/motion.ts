import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);
gsap.defaults({ ease: 'expo.out', duration: 1.1 });

export { gsap, ScrollTrigger };

export const prefersReduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const isFinePointer = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/* ---- Evento "listo": el preloader lo emite cuando el Hero puede entrar ---- */
let ready = false;
const READY = 'eme:ready';
export function markReady() {
  if (ready) return;
  ready = true;
  window.dispatchEvent(new Event(READY));
}
export function onReady(cb: () => void) {
  if (ready) {
    cb();
    return () => {};
  }
  window.addEventListener(READY, cb, { once: true });
  return () => window.removeEventListener(READY, cb);
}

/* ---- Lenis compartido (scroll suave) ---- */
let lenisRef: Lenis | null = null;
export const setLenis = (l: Lenis | null) => (lenisRef = l);
export const getLenis = () => lenisRef;

export function scrollToTarget(target: string | HTMLElement) {
  const el = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target;
  if (!el) return;
  if (lenisRef) lenisRef.scrollTo(el, { offset: -60, duration: 1.4 });
  else el.scrollIntoView({ behavior: prefersReduced() ? 'auto' : 'smooth' });
}

/* ---- Revelados al hacer scroll ----
   data-reveal="up | fade | mask | stagger | text | line"
   data-delay="0.1"  (opcional)                                   */
export function setupReveals(scope: HTMLElement) {
  if (prefersReduced()) {
    scope.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => (el.style.opacity = '1'));
    return () => {};
  }

  const ctx = gsap.context(() => {
    scope.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
      if (el.closest('[data-intro-scope]')) return; // el Hero tiene su propia coreografía
      const type = el.dataset.reveal;
      const delay = parseFloat(el.dataset.delay || '0');
      const st = { trigger: el, start: 'top 88%', once: true };

      switch (type) {
        case 'text': {
          const words = el.querySelectorAll('.rt-word');
          gsap.set(el, { opacity: 1 });
          gsap.fromTo(
            words,
            { yPercent: 115, rotate: 3 },
            { yPercent: 0, rotate: 0, duration: 1.25, stagger: 0.035, delay, scrollTrigger: st },
          );
          break;
        }
        case 'mask': {
          const inner = el.querySelector<HTMLElement>('[data-mask-inner]');
          gsap.fromTo(
            el,
            { opacity: 1, clipPath: 'inset(22% 8% 0% 8% round 28px)' },
            {
              clipPath: 'inset(0% 0% 0% 0% round 28px)',
              duration: 1.4,
              ease: 'expo.inOut',
              delay,
              scrollTrigger: st,
              clearProps: 'clipPath',
            },
          );
          if (inner)
            gsap.fromTo(inner, { scale: 1.18 }, { scale: 1, duration: 1.8, delay, scrollTrigger: st });
          break;
        }
        case 'stagger': {
          gsap.set(el, { opacity: 1 });
          gsap.fromTo(
            el.children,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.09, delay, scrollTrigger: st },
          );
          break;
        }
        case 'line': {
          gsap.fromTo(
            el,
            { opacity: 1, scaleX: 0, transformOrigin: 'left center' },
            { scaleX: 1, duration: 1.4, ease: 'expo.inOut', delay, scrollTrigger: st },
          );
          break;
        }
        case 'fade': {
          gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 1.4, ease: 'power2.out', delay, scrollTrigger: st });
          break;
        }
        default: {
          gsap.fromTo(el, { y: 48, opacity: 0 }, { y: 0, opacity: 1, delay, scrollTrigger: st });
        }
      }
    });

    // Elementos flotantes sutiles
    scope.querySelectorAll<HTMLElement>('[data-float]').forEach((el, i) => {
      gsap.to(el, {
        y: parseFloat(el.dataset.float || '10'),
        duration: 3.2 + (i % 3) * 0.6,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    });

    // Parallax ligado al scroll
    scope.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
      const amt = parseFloat(el.dataset.parallax || '60');
      gsap.fromTo(
        el,
        { y: amt },
        {
          y: -amt,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      );
    });
  }, scope);

  return () => ctx.revert();
}
