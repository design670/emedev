import { useEffect, useRef } from 'react';
import { RevealText } from './ui';
import { gsap, prefersReduced } from '../lib/motion';
import { t } from '../lib/i18n';

const systems = [
  { l: 'ERP', x: 70, y: 70 },
  { l: 'CRM', x: 330, y: 52 },
  { l: 'Excel', x: 40, y: 220 },
  { l: 'WhatsApp', x: 360, y: 214 },
  { l: t('Facturación', 'Invoicing'), x: 92, y: 366 },
  { l: 'Chatbot', x: 312, y: 372 },
];
const HUB = { x: 200, y: 214 };

/* Sistemas sueltos que se conectan al centro a medida que avanza el scroll. */
export function Problem() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current!;
    const q = gsap.utils.selector(el);
    const lines = q<SVGLineElement>('.pb-link');
    lines.forEach((l) => {
      const len = Math.hypot(+l.getAttribute('x2')! - +l.getAttribute('x1')!, +l.getAttribute('y2')! - +l.getAttribute('y1')!);
      l.style.strokeDasharray = `${len}`;
      l.style.strokeDashoffset = prefersReduced() ? '0' : `${len}`;
    });
    if (prefersReduced()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: q('.problem__diagram')[0], start: 'top 75%', end: 'center 40%', scrub: 0.8 },
      });
      tl.fromTo(q('.pb-node'), { x: (i) => (i % 2 ? 24 : -24), opacity: 0.25 }, { x: 0, opacity: 1, stagger: 0.05 })
        .to(lines, { strokeDashoffset: 0, stagger: 0.06, ease: 'none' }, 0.2)
        .fromTo(q('.pb-hub'), { scale: 0.4, opacity: 0, transformOrigin: '50% 50%' }, { scale: 1, opacity: 1 }, 0.55);

      gsap.fromTo(
        q('.stat__fill'),
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.8,
          ease: 'expo.inOut',
          stagger: 0.25,
          scrollTrigger: { trigger: q('.problem__stats')[0], start: 'top 85%', once: true },
        },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section className="problem section on-dark" aria-labelledby="problem-title">
      <div className="container problem__grid">
        <div className="problem__copy">
          <RevealText
            as="h2"
            id="problem-title"
            className="t-h2 problem__title"
            parts={[
              t('Casi todas las empresas ya usan IA.', 'Almost every company already uses AI.'),
              { t: t('Muy pocas le sacan provecho.', 'Very few get real value from it.'), cls: 'is-dim' },
            ]}
          />

          <div className="problem__stats" data-reveal="up">
            <div className="stat">
              <span className="stat__num">42%</span>
              <span className="stat__track">
                <span className="stat__fill" style={{ width: '42%' }} />
              </span>
              <span className="stat__label">{t('de las empresas en Colombia ya usa inteligencia artificial', 'of companies in Colombia already use artificial intelligence')}</span>
            </div>
            <div className="stat is-lime">
              <span className="stat__num">12%</span>
              <span className="stat__track">
                <span className="stat__fill" style={{ width: '12%' }} />
              </span>
              <span className="stat__label">{t('pasó de lo básico', 'have gone beyond the basics')}</span>
            </div>
          </div>

          <div className="problem__text" data-reveal="up">
            <p>
              {t(
                'La mayoría se quedó en un chatbot o en una herramienta comprada que nadie conectó con el resto del negocio. La diferencia no está en la herramienta. Está en tener los datos ordenados, los sistemas integrados y un equipo que sepa construir sobre eso.',
                'Most stopped at a chatbot or an off-the-shelf tool that nobody connected to the rest of the business. The difference isn’t the tool. It’s having organized data, integrated systems and a team that knows how to build on top of them.',
              )}
            </p>
          </div>
          <RevealText as="p" className="problem__punch t-h3" parts={[{ t: t('Ahí entramos nosotros.', 'That’s where we come in.'), cls: 'hl' }]} />
        </div>

        <figure className="problem__diagram" aria-hidden="true">
          <svg viewBox="0 0 430 430" className="pb-svg">
            <circle cx={HUB.x} cy={HUB.y} r="150" className="pb-orbit" />
            <circle cx={HUB.x} cy={HUB.y} r="92" className="pb-orbit is-dash" />
            {systems.map((s) => (
              <line key={s.l} className="pb-link" x1={s.x} y1={s.y} x2={HUB.x} y2={HUB.y} />
            ))}
            <g className="pb-hub">
              <circle cx={HUB.x} cy={HUB.y} r="38" className="pb-hub__bg" />
              <text x={HUB.x} y={HUB.y + 5} textAnchor="middle" className="pb-hub__t">
                {t('Datos', 'Data')}
              </text>
            </g>
            {systems.map((s) => (
              <g className="pb-node" key={s.l}>
                <rect
                  x={s.x - (s.l.length * 4.2 + 16)}
                  y={s.y - 15}
                  width={s.l.length * 8.4 + 32}
                  height="30"
                  rx="15"
                  className="pb-node__bg"
                />
                <text x={s.x} y={s.y + 5} textAnchor="middle" className="pb-node__t">
                  {s.l}
                </text>
              </g>
            ))}
          </svg>
          <figcaption className="problem__caption t-label muted">
            {t('Datos ordenados · sistemas integrados · equipo que construye', 'Organized data · integrated systems · a team that builds')}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
