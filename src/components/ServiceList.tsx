import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { services, type ServiceKey } from '../data/content';
import { SectionHeading } from './ui';
import { ServiceVisual } from './ServiceVisual';
import { isFinePointer } from '../lib/motion';
import { t } from '../lib/i18n';

export function ServiceList() {
  const [active, setActive] = useState<ServiceKey | null>(null);
  const [hovering, setHovering] = useState(false);
  const [fine, setFine] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => setFine(isFinePointer()), []);

  return (
    <section className="services section on-light" id="soluciones" aria-labelledby="services-title">
      <div className="container">
        <SectionHeading
          index="03"
          label={t('Soluciones', 'Solutions')}
          id="services-title"
          className="services__head"
          parts={[t('Qué', 'What'), { t: t('construimos.', 'we build.'), cls: '' }]}
         />

        <div
          className={`slist${hovering && fine ? ' is-hovering' : ''}`}
          ref={listRef}
          onPointerLeave={() => {
            setHovering(false);
            if (fine) setActive(null);
          }}
        >
          <ol className="slist__items" data-reveal="stagger">
            {services.map((s) => {
              const isActive = active === s.key;
              const inner = (
                <>
                  <span className="srow__name">{s.name}</span>
                  <span className="srow__desc">{s.short}</span>
                  <span className="srow__arrow" aria-hidden="true">
                    <ArrowUpRight strokeWidth={1.5} />
                  </span>
                </>
              );
              return (
                <li key={s.key} className={`srow${isActive ? ' is-active' : ''}`}>
                  {fine ? (
                    <a
                      href={s.href}
                      className="srow__hit"
                      data-cursor-label={t('EXPLORAR', 'EXPLORE')}
                      onPointerEnter={() => {
                        setActive(s.key);
                        setHovering(true);
                      }}
                      onFocus={() => setActive(s.key)}
                    >
                      {inner}
                    </a>
                  ) : (
                    <>
                      <button
                        className="srow__hit"
                        aria-expanded={isActive}
                        aria-controls={`srow-panel-${s.key}`}
                        onClick={() => setActive(isActive ? null : s.key)}
                      >
                        {inner}
                      </button>
                      <div className="srow__panel" id={`srow-panel-${s.key}`} role="region" aria-label={s.name}>
                        <div className="srow__panel-inner">
                          <ServiceVisual k={s.key} />
                          <a className="link-line" href={s.href}>
                            {t('Explorar solución', 'Explore solution')} <ArrowUpRight strokeWidth={1.5} aria-hidden="true" />
                          </a>
                        </div>
                      </div>
                    </>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
