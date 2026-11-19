import { companySizes } from '../data/content';
import { SectionHeading } from './ui';
import { t } from '../lib/i18n';

/* Tres composiciones distintas sobre el mismo sistema:
   pequeña = ficha de alcance cerrado · mediana = sistemas que se unen ·
   grande = capas de arquitectura empresarial. */

function VisualSmall() {
  return (
    <div className="cs-ticket" aria-hidden="true">
      {[t('Alcance', 'Scope'), t('Precio', 'Price'), t('Fecha', 'Date')].map((r) => (
        <div className="cs-ticket__row" key={r}>
          <span>{r}</span>
          <span className="cs-ticket__dash" />
          <span className="cs-ticket__ok">{t('Definido', 'Defined')}</span>
        </div>
      ))}
      <span className="cs-ticket__stamp">{t('Cerrado', 'Locked')}</span>
    </div>
  );
}

function VisualMedium() {
  return (
    <svg className="cs-merge" viewBox="0 0 300 150" aria-hidden="true">
      {[30, 75, 120].map((y, i) => (
        <g key={y}>
          <path d={`M60 ${y} C 140 ${y}, 150 75, 222 75`} className="cs-merge__path" style={{ animationDelay: `${i * 0.4}s` }} />
          <rect x="8" y={y - 12} width="52" height="24" rx="12" className="cs-merge__node" />
          <text x="34" y={y + 4} textAnchor="middle" className="cs-merge__t">
            {[t('Ventas', 'Sales'), t('Bodega', 'Warehouse'), t('Contab.', 'Acctg.')][i]}
          </text>
        </g>
      ))}
      <rect x="222" y="51" width="70" height="48" rx="12" className="cs-merge__hub" />
      <text x="257" y="79" textAnchor="middle" className="cs-merge__ht">
        {t('1 sistema', '1 system')}
      </text>
    </svg>
  );
}

function VisualLarge() {
  const layers = [
    t('Agentes de IA', 'AI agents'),
    t('Integraciones', 'Integrations'),
    t('Tu arquitectura', 'Your architecture'),
    t('Seguridad', 'Security'),
  ];
  return (
    <div className="cs-stack" aria-hidden="true">
      {layers.map((l, i) => (
        <span key={l} className="cs-stack__layer" style={{ ['--i' as string]: i }}>
          {l}
        </span>
      ))}
    </div>
  );
}

const visuals = [VisualSmall, VisualMedium, VisualLarge];

export function CompanySize() {
  return (
    <section className="sizes section on-dark" aria-labelledby="sizes-title">
      <div className="container">
        <SectionHeading
          index="04"
          label={t('Por tamaño de empresa', 'By company size')}
          id="sizes-title"
          className="sizes__head"
          parts={[t('Partimos de', 'We start from'), { t: t('donde estás.', 'where you are.'), cls: 'hl' }]}
        />
        <div className="sizes__grid">
          {companySizes.map((c, i) => {
            const V = visuals[i];
            return (
              <article className={`size size--${c.key}`} key={c.key} data-reveal="up" data-delay={i * 0.12}>
                <div className="size__top">
                  <span className="size__idx">{String(i + 1).padStart(2, '0')}</span>
                  <span className="size__dots" aria-hidden="true">
                    {[0, 1, 2].map((d) => (
                      <i key={d} className={d <= i ? 'on' : ''} />
                    ))}
                  </span>
                </div>
                <div className="size__visual">
                  <V />
                </div>
                <h3 className="t-h3 size__title">{c.title}</h3>
                <p className="size__text">{c.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
