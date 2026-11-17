import { useState } from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { services, industries, DIAGNOSTICO_HREF } from '../data/content';
import { ServiceVisual } from './ServiceVisual';

export type MenuKey = 'soluciones' | 'industrias' | null;

/* Panel desplegable. Soluciones: índice numerado + vista previa de la solución
   activa. Industrias: cuatro sectores con su enunciado y un acceso a casos. */
export function NavigationMenu({
  open,
  onClose,
}: {
  open: MenuKey;
  onClose: () => void;
}) {
  const [active, setActive] = useState(0);
  const s = services[active];

  return (
    <div className={`mega${open ? ' is-open' : ''}`} aria-hidden={!open}>
      <div className="mega__inner container">
        <div
          id="menu-soluciones"
          className={`mega__panel mega__panel--sol${open === 'soluciones' ? ' is-active' : ''}`}
          role="region"
          aria-label="Soluciones"
        >
          <ol className="mega__list">
            {services.map((item, i) => (
              <li key={item.key} style={{ ['--i' as string]: i }}>
                <a
                  href={item.href}
                  className={`mega__item${i === active ? ' is-active' : ''}`}
                  onPointerEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={onClose}
                  tabIndex={open === 'soluciones' ? 0 : -1}
                >
                  <span className="mega__num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="mega__name">{item.name}</span>
                  <ArrowRight className="mega__arrow" strokeWidth={1.5} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ol>

          <div className="mega__preview">
            <div className="mega__visual" key={s.key}>
              <ServiceVisual k={s.key} />
            </div>
            <div className="mega__meta">
              <p className="mega__desc">{s.short}</p>
              <ul className="mega__tags">
                {s.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div
          id="menu-industrias"
          className={`mega__panel mega__panel--ind${open === 'industrias' ? ' is-active' : ''}`}
          role="region"
          aria-label="Industrias"
        >
          <ul className="mega__ind">
            {industries.map((ind, i) => (
              <li key={ind.name} style={{ ['--i' as string]: i }}>
                <a
                  href={ind.href}
                  className="mega__ind-card"
                  onClick={onClose}
                  tabIndex={open === 'industrias' ? 0 : -1}
                >
                  <span className="mega__num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="mega__ind-name">{ind.name}</span>
                  <span className="mega__ind-text">{ind.short}</span>
                  <ArrowUpRight className="mega__ind-arrow" strokeWidth={1.5} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
          <a
            href="/dev/casos"
            className="mega__aside"
            onClick={onClose}
            tabIndex={open === 'industrias' ? 0 : -1}
          >
            <span className="t-label">Casos por sector</span>
            <span className="mega__aside-title">Filtra los casos por industria o por tipo de solución.</span>
            <span className="mega__aside-link">
              Ver casos <ArrowRight strokeWidth={1.5} aria-hidden="true" />
            </span>
          </a>
        </div>

        <div className="mega__foot">
          <span className="muted">¿No sabes por dónde empezar?</span>
          <a
            href={DIAGNOSTICO_HREF}
            className="link-line"
            onClick={onClose}
            tabIndex={open ? 0 : -1}
          >
            Diagnóstico gratis <ArrowRight strokeWidth={1.5} aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}
