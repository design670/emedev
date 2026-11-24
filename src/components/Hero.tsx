import { useEffect, useRef } from 'react';
import { DIAGNOSTICO_HREF } from '../data/content';
import { Button, RevealText } from './ui';
import { HeroVisual } from './HeroVisual';
import { gsap, onReady, prefersReduced, ScrollTrigger } from '../lib/motion';
import { t } from '../lib/i18n';

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
          parts={[
            t('Software e IA a la medida que tu operación', 'Custom software and AI your operation'),
            { t: t('sí usa.', 'actually uses.'), cls: 'hl' },
          ]}
        />

        <div className="hero__visual" aria-hidden="true">
          <HeroVisual />
          <span className="hero__chip c1">
            <i /> {t('Agente de IA · activo', 'AI agent · active')}
          </span>
          <span className="hero__chip c2">
            <i /> {t('ERP ↔ CRM · sincronizado', 'ERP ↔ CRM · synced')}
          </span>
          <span className="hero__chip c3">
            <i /> {t('API /facturas · 200 OK', 'API /invoices · 200 OK')}
          </span>
        </div>

        <span className="hero__rule" aria-hidden="true" />

        <div className="hero__bottom">
          <p className="hero__sub t-lead" data-intro="up">
            {t(
              'Construimos software con IA, agentes de IA, apps, webs, e-commerce e integraciones para empresas que ya probaron herramientas genéricas y necesitan algo que encaje con su forma de trabajar.',
              'We build AI-powered software, AI agents, apps, websites, e-commerce and integrations for companies that have already tried generic tools and need something that fits the way they work.',
            )}
          </p>
          <div className="hero__ctas" data-intro="up">
            <Button href={DIAGNOSTICO_HREF}>{t('Diagnóstico Gratuito', 'Free Diagnostic')}</Button>
            <Button href="/dev/casos" variant="ghost" icon={false}>
              {t('Ver casos', 'View case studies')}
            </Button>
          </div>
        </div>
      </div>

    </section>
  );
}
