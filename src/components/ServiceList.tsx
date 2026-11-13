import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { services, type ServiceKey } from '../data/content';
import { SectionHeading } from './ui';
import { ServiceVisual } from './ServiceVisual';
import { gsap, isFinePointer, prefersReduced } from '../lib/motion';

/* Imagen flotante que acompaña al cursor dentro de la lista de servicios. */
export function FloatingImagePreview({
  active,
  visible,
  boundsRef,
}: {
  active: ServiceKey | null;
  visible: boolean;
  boundsRef: React.RefObject<HTMLElement>;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const bounds = boundsRef.current;
    if (!el || !bounds) return;
    const reduced = prefersReduced();
    const xTo = gsap.quickTo(el, 'x', { duration: reduced ? 0.01 : 0.7, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: reduced ? 0.01 : 0.7, ease: 'power3.out' });
    const rTo = gsap.quickTo(el, 'rotate', { duration: 0.9, ease: 'power3.out' });
    let lastX = 0;
    const move = (e: PointerEvent) => {
      const r = bounds.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      xTo(x + 36);
      yTo(y - el.offsetHeight / 2);
      if (!reduced) rTo(gsap.utils.clamp(-8, 8, (e.clientX - lastX) * 0.5));
      lastX = e.clientX;
    };
    bounds.addEventListener('pointermove', move);
    return () => bounds.removeEventListener('pointermove', move);
  }, [boundsRef]);

  return (
    <div className={`fpreview${visible ? ' is-visible' : ''}`} ref={ref} aria-hidden="true">
      <div className="fpreview__frame">
        {services.map((s) => (
          <div key={s.key} className={`fpreview__item${active === s.key ? ' is-active' : ''}`}>
            <ServiceVisual k={s.key} />
          </div>
        ))}
      </div>
    </div>
  );
}

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
          label="Soluciones"
          id="services-title"
          className="services__head"
          parts={['Qué', { t: 'construimos.', cls: '' }]}
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
            {services.map((s, i) => {
              const isActive = active === s.key;
              const inner = (
                <>
                  <span className="srow__num">{String(i + 1).padStart(2, '0')}</span>
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
                      data-cursor-label="EXPLORAR"
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
                            Explorar solución <ArrowUpRight strokeWidth={1.5} aria-hidden="true" />
                          </a>
                        </div>
                      </div>
                    </>
                  )}
                </li>
              );
            })}
          </ol>
          {fine && <FloatingImagePreview active={active} visible={hovering && !!active} boundsRef={listRef} />}
        </div>
      </div>
    </section>
  );
}
