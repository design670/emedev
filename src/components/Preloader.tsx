import { useEffect, useRef } from 'react';
import { gsap, getLenis, markReady, prefersReduced } from '../lib/motion';
import { t as tr } from '../lib/i18n';
import { EmeWordmark } from './EmeWordmark';

/* Pantalla de carga: avanza con recursos reales (fuentes + load) y nunca
   simula una espera larga. En la segunda visita de la sesión es casi inmediata. */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = root.current!;
    const reduced = prefersReduced();
    let seen = false;
    try {
      seen = sessionStorage.getItem('eme-dev-loaded') === '1';
    } catch {
      /* almacenamiento no disponible */
    }

    document.body.classList.add('is-loading');
    getLenis()?.stop();

    const finish = () => {
      document.body.classList.remove('is-loading');
      getLenis()?.start();
      try {
        sessionStorage.setItem('eme-dev-loaded', '1');
      } catch {
        /* sin almacenamiento */
      }
    };

    if (reduced) {
      gsap.to(el, {
        opacity: 0,
        duration: 0.3,
        delay: 0.15,
        onComplete: () => {
          el.style.display = 'none';
          finish();
          markReady();
        },
      });
      return;
    }

    const state = { p: 0 };
    let target = 8;
    let done = false;
    const minTime = seen ? 250 : 900;
    const start = performance.now();

    const render = () => {
      const v = Math.round(state.p);
      if (countRef.current) countRef.current.textContent = String(v).padStart(3, '0');
      if (barRef.current) barRef.current.style.transform = `scaleX(${state.p / 100})`;
    };

    const tweenTo = (t: number) => {
      target = Math.max(target, t);
      gsap.to(state, {
        p: target,
        duration: seen ? 0.35 : 0.9,
        ease: 'power2.out',
        overwrite: true,
        onUpdate: render,
        onComplete: () => {
          if (target >= 100) exit();
        },
      });
    };

    const exit = () => {
      if (done) return;
      done = true;
      const wait = Math.max(0, minTime - (performance.now() - start)) / 1000;
      const tl = gsap.timeline({ delay: wait, onComplete: () => {
        el.style.display = 'none';
      } });
      tl.to('.preloader__word > span', { yPercent: -110, duration: 0.8, stagger: 0.04, ease: 'expo.in' })
        .to('.preloader__meta', { opacity: 0, duration: 0.4 }, '<')
        .to(el, { clipPath: 'inset(0% 0% 100% 0%)', duration: 1.1, ease: 'expo.inOut' }, '-=0.15')
        .add(() => {
          finish();
          markReady();
        }, '-=0.75');
    };

    // Entrada del logotipo
    gsap.fromTo(
      '.preloader__word > span',
      { yPercent: 110 },
      { yPercent: 0, duration: seen ? 0.5 : 1, stagger: 0.05, ease: 'expo.out' },
    );

    tweenTo(seen ? 60 : 32);
    document.fonts?.ready.then(() => tweenTo(72));
    const onLoad = () => tweenTo(100);
    if (document.readyState === 'complete') setTimeout(onLoad, 60);
    else window.addEventListener('load', onLoad, { once: true });
    const safety = setTimeout(onLoad, 3200); // nunca bloquear la navegación

    return () => {
      clearTimeout(safety);
      window.removeEventListener('load', onLoad);
    };
  }, []);

  return (
    <div className="preloader" ref={root} aria-hidden="true">
      <span className="preloader__corner tl" />
      <span className="preloader__corner tr" />
      <span className="preloader__corner bl" />
      <span className="preloader__corner br" />
      <div className="preloader__center">
        {/* Logo EME Dev: el trazo de EME y la pastilla «Dev» entran por separado */}
        <p className="preloader__word">
          <span>
            <EmeWordmark className="logo__eme" />
          </span>
          <span>
            <span className="logo__dev">Dev</span>
          </span>
        </p>
      </div>
      <div className="preloader__meta">
        <span className="t-label">{tr('Software e inteligencia artificial', 'Software and artificial intelligence')}</span>
        <span className="preloader__count">
          <span ref={countRef}>000</span>
          <small>%</small>
        </span>
      </div>
      <span className="preloader__bar">
        <span ref={barRef} />
      </span>
    </div>
  );
}
