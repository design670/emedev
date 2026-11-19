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
    // Tiempo del dibujo del logo: la pantalla no se va hasta que termine de rellenarse
    const drawTime = seen ? 0.9 : 1.9;
    const minTime = (drawTime + 0.7) * 1000;
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

    const intro = gsap.timeline();

    const exit = () => {
      if (done) return;
      done = true;
      const leave = () => {
        const wait = Math.max(0, minTime - (performance.now() - start)) / 1000;
        const tl = gsap.timeline({ delay: Math.min(wait, 0.35), onComplete: () => {
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
      // La salida espera a que el logo termine de dibujarse y rellenarse
      if (intro.progress() < 1) intro.eventCallback('onComplete', leave);
      else leave();
    };

    // Entrada del logotipo: el trazo «eme» se dibuja como a lápiz (contorno),
    // luego se rellena y por último entra la pastilla «Dev».
    const paths = Array.from(el.querySelectorAll<SVGPathElement>('.preloader__word .logo__eme path'));
    paths.forEach((p) => {
      const len = p.getTotalLength();
      p.style.stroke = p.getAttribute('fill') ?? 'currentColor';
      p.style.strokeWidth = '6';
      p.style.strokeLinejoin = 'round';
      p.style.strokeDasharray = `${len}`;
      p.style.strokeDashoffset = `${len}`;
      p.style.fillOpacity = '0';
    });
    gsap.set('.preloader__word > span:last-child', { yPercent: 110, opacity: 0 });
    intro
      .to(paths, { strokeDashoffset: 0, duration: drawTime, ease: 'power1.inOut', stagger: drawTime * 0.06 })
      .to(paths, { fillOpacity: 1, duration: 0.5, ease: 'power2.out' }, '-=0.25')
      .to(paths, { strokeWidth: 0, duration: 0.4 }, '<')
      .to('.preloader__word > span:last-child', { yPercent: 0, opacity: 1, duration: 0.7, ease: 'expo.out' }, '-=0.35');

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
