import { useEffect, useRef } from 'react';
import { clients, DIAGNOSTICO_HREF } from '../data/content';
import { Button, RevealText } from './ui';
import { HeroVisual } from './HeroVisual';
import { gsap, onReady, prefersReduced, ScrollTrigger } from '../lib/motion';

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current!;
    const q = gsap.utils.selector(el);
    if (prefersReduced()) {
      gsap.set(q('[data-reveal]'), { opacity: 1 });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.set(q('[data-reveal]'), { opacity: 1 });
      gsap.set(q('.hero__title .rt-word'), { yPercent: 118, rotate: 4 });
      gsap.set(q('[data-intro="up"]'), { y: 36, opacity: 0 });
      gsap.set(q('[data-intro="fade"]'), { opacity: 0 });
      gsap.set(q('.hero__visual'), { opacity: 0, scale: 0.86 });
      gsap.set(q('.hero__chip'), { opacity: 0, y: 16 });
      gsap.set(q('.hero__rule'), { scaleX: 0, transformOrigin: 'left center' });
    }, el);

    const off = onReady(() => {
      ctx.add(() => {
        const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
        tl.to(q('.hero__visual'), { opacity: 1, scale: 1, duration: 2.2 }, 0)
          .to(q('.hero__title .rt-word'), { yPercent: 0, rotate: 0, duration: 1.5, stagger: 0.06 }, 0.1)
          .to(q('[data-intro="fade"]'), { opacity: 1, duration: 1.2 }, 0.4)
          .to(q('.hero__rule'), { scaleX: 1, duration: 1.6, ease: 'expo.inOut' }, 0.5)
          .to(q('[data-intro="up"]'), { y: 0, opacity: 1, duration: 1.2, stagger: 0.09 }, 0.75)
          .to(q('.hero__chip'), { opacity: 1, y: 0, duration: 1, stagger: 0.15 }, 1.1);

        // Salida suave al hacer scroll (continuidad hacia la siguiente escena)
        gsap.to(q('.hero__visual'), {
          yPercent: 18,
          scale: 0.92,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true },
        });
        gsap.to(q('.hero__title'), {
          yPercent: -12,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true },
        });
        ScrollTrigger.refresh();
      });
    });

    return () => {
      off();
      ctx.revert();
    };
  }, []);

  return (
    <section className="hero on-dark" id="top" ref={ref} data-intro-scope aria-labelledby="hero-title">
      <div className="hero__grid container">
        <RevealText
          as="h1"
          id="hero-title"
          className="hero__title t-display"
          reveal="intro"
          parts={['Software e IA a la medida que tu operación', { t: 'sí usa.', cls: 'hl' }]}
        />

        <div className="hero__visual" aria-hidden="true">
          <HeroVisual />
          <span className="hero__chip c1">
            <i /> Agente de IA · activo
          </span>
          <span className="hero__chip c2">
            <i /> ERP ↔ CRM · sincronizado
          </span>
          <span className="hero__chip c3">
            <i /> API /facturas · 200 OK
          </span>
        </div>

        <span className="hero__rule" aria-hidden="true" />

        <div className="hero__bottom">
          <p className="hero__sub t-lead" data-intro="up">
            Construimos agentes de IA, sistemas de gestión, apps e integraciones para empresas que
            ya probaron herramientas genéricas y necesitan algo que encaje con su forma de trabajar.
          </p>
          <div className="hero__ctas" data-intro="up">
            <Button href={DIAGNOSTICO_HREF}>Agenda un diagnóstico sin costo</Button>
            <Button href="#casos" variant="ghost" icon={false}>
              Ver casos
            </Button>
          </div>
          <p className="hero__proof" data-intro="up">
            <strong>12 años</strong> y más de <strong>783 clientes</strong> en Latinoamérica y
            Estados Unidos.
          </p>
        </div>
      </div>

      {/* SECCIÓN 03 — Clientes de desarrollo */}
      <div className="clients container" data-intro="fade" aria-labelledby="clients-title">
        <p id="clients-title" className="clients__title t-label muted">
          Clientes de desarrollo
        </p>
        <ul className="clients__list">
          {clients.map((c, i) => (
            <li key={i} className={c.startsWith('[') ? 'is-ph' : ''}>
              {c.startsWith('[') ? <span className="ph">{c}</span> : <span>{c}</span>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
