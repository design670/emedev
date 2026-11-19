import { useEffect, useRef } from 'react';
import { clients, metrics } from '../data/content';
import { RevealText } from './ui';
import { gsap, prefersReduced } from '../lib/motion';
import { t } from '../lib/i18n';

/* Conteo animado al entrar en pantalla. Las cifras sin dato quedan como [N]. */
export function MetricCounter({
  value,
  prefix = '',
  suffix = '',
}: {
  value: number | null;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || value == null) return;
    const fmt = (n: number) => `${prefix}${Math.round(n).toLocaleString('es-CO')}${suffix}`;
    if (prefersReduced()) {
      el.textContent = fmt(value);
      return;
    }
    const o = { n: 0 };
    el.textContent = fmt(0);
    const tw = gsap.to(o, {
      n: value,
      duration: 2.2,
      ease: 'power3.out',
      onUpdate: () => {
        el.textContent = fmt(o.n);
      },
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    });
    return () => {
      tw.scrollTrigger?.kill();
      tw.kill();
    };
  }, [value, prefix, suffix]);

  if (value == null)
    return (
      <span className="metric__value is-ph" title={t('Dato pendiente de confirmar', 'Figure pending confirmation')}>
        [N]
      </span>
    );
  return (
    <span className="metric__value" ref={ref}>
      {`${prefix}${value.toLocaleString('es-CO')}${suffix}`}
    </span>
  );
}

export function Metrics() {
  return (
    <section className="metrics section on-light" aria-labelledby="metrics-title">
      <div className="container">
        <div className="metrics__head">
          <RevealText
            as="h2"
            id="metrics-title"
            className="t-h2 metrics__title"
            parts={[t('Experiencia que se traduce en', 'Experience that translates into'), { t: t('resultados.', 'results.'), cls: 'mark' }]}
          />
          <p className="metrics__proof" data-reveal="up">
            {t(
              <>
                <strong>+15 años</strong> de experiencia y más de <strong>349 proyectos</strong> en
                Latinoamérica y Estados Unidos con soluciones tecnológicas a la medida.
              </>,
              <>
                <strong>15+ years</strong> of experience and more than <strong>349 projects</strong> across
                Latin America and the United States with custom technology solutions.
              </>,
            )}
          </p>
        </div>
        <ul className="metrics__grid">
          {metrics.map((m, i) => (
            <li className="metric" key={i} data-reveal="up" data-delay={i * 0.08}>
              <span className="metric__line" data-reveal="line" data-delay={i * 0.08} />
              <MetricCounter value={m.value} prefix={m.prefix} suffix={m.suffix} />
              <p className="metric__label">{m.label}</p>
            </li>
          ))}
        </ul>

        {/* Clientes de desarrollo */}
        <div className="clients" data-reveal="fade">
          {/* Cinta infinita: la lista va dos veces para que el bucle no tenga corte */}
          <div className="clients__marquee">
            <div className="clients__track">
              {[0, 1].map((copy) => (
                <ul
                  key={copy}
                  className="clients__list"
                  aria-label={copy === 0 ? t('Clientes de desarrollo', 'Development clients') : undefined}
                  aria-hidden={copy === 1 || undefined}
                >
                  {clients.map((c) => (
                    <li key={c.name}>
                      {c.logo ? <img className="clients__logo" src={c.logo} alt={copy === 0 ? c.name : ''} /> : <span>{c.name}</span>}
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
