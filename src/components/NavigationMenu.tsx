import { useState } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { services, industries, DIAGNOSTICO_HREF } from '../data/content';
import { ServiceVisual, ImagePlaceholder } from './ServiceVisual';
import { t as tr } from '../lib/i18n';

export type MenuKey = 'soluciones' | 'industrias' | null;

/* Panel desplegable. Soluciones: índice numerado + vista previa de la solución
   activa. Industrias: misma estructura, con su imagen (Image 018–021). */
export function NavigationMenu({
  open,
  onClose,
}: {
  open: MenuKey;
  onClose: () => void;
}) {
  const [active, setActive] = useState(0);
  const s = services[active];
  const [activeInd, setActiveInd] = useState(0);
  const ind = industries[activeInd];

  return (
    <div className={`mega${open ? ' is-open' : ''}`} aria-hidden={!open}>
      <div className="mega__inner container">
        <button
          type="button"
          className="mega__close"
          onClick={onClose}
          tabIndex={open ? 0 : -1}
          aria-label={tr('Cerrar menú', 'Close menu')}
        >
          <span>{tr('Cerrar', 'Close')}</span>
          <X strokeWidth={1.75} aria-hidden="true" />
        </button>
        <div
          id="menu-soluciones"
          className={`mega__panel mega__panel--sol${open === 'soluciones' ? ' is-active' : ''}`}
          role="region"
          aria-label={tr('Soluciones', 'Solutions')}
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
          className={`mega__panel mega__panel--sol mega__panel--ind${open === 'industrias' ? ' is-active' : ''}`}
          role="region"
          aria-label={tr('Industrias', 'Industries')}
        >
          <ol className="mega__list">
            {industries.map((item, i) => (
              <li key={item.name} style={{ ['--i' as string]: i }}>
                <a
                  href={item.href}
                  className={`mega__item${i === activeInd ? ' is-active' : ''}`}
                  onPointerEnter={() => setActiveInd(i)}
                  onFocus={() => setActiveInd(i)}
                  onClick={onClose}
                  tabIndex={open === 'industrias' ? 0 : -1}
                >
                  <span className="mega__num">{String(i + 1).padStart(2, '0')}</span>
                  {/* Nombre general + línea de apoyo en letra pequeña (sin ella no se entiende) */}
                  <span className="mega__name mega__name--stack">
                    {item.name}
                    <small className="mega__line">{item.line}</small>
                  </span>
                  <ArrowRight className="mega__arrow" strokeWidth={1.5} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ol>

          <div className="mega__preview">
            <div className="mega__visual" key={ind.name}>
              <div className="service-visual" aria-hidden="true">
                <ImagePlaceholder n={18 + activeInd} />
              </div>
            </div>
            <div className="mega__meta">
              <p className="mega__desc">{ind.short}</p>
              {ind.tags.length > 0 && (
                <ul className="mega__tags">
                  {ind.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className="mega__foot">
          <span className="muted">{tr('¿No sabes por dónde empezar?', 'Not sure where to start?')}</span>
          <a
            href={DIAGNOSTICO_HREF}
            className="link-line"
            onClick={onClose}
            tabIndex={open ? 0 : -1}
          >
            {tr('Diagnóstico gratis', 'Free diagnostic')} <ArrowRight strokeWidth={1.5} aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}
