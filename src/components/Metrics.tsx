import { useEffect, useRef } from 'react';
import { metrics } from '../data/content';
import { RevealText } from './ui';
import { gsap, prefersReduced } from '../lib/motion';

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
      <span className="metric__value is-ph" title="Dato pendiente de confirmar">
        [N]
      </span>
    );
  return (
    <span className="metric__value" ref={ref}>
      {prefix}
      {value.toLocaleString('es-CO')}
      {suffix}
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
            parts={['Experiencia que se traduce en', { t: 'resultados.', cls: 'mark' }]}
          />
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
      </div>
    </section>
  );
}
