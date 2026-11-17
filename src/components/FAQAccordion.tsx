import { useId, useState } from 'react';
import { faqs, contact } from '../data/content';
import { RevealText, WithPlaceholders } from './ui';

export function FAQAccordion({
  items = faqs,
  title = ['Resolvemos', 'tus dudas.'],
  surface = 'on-light',
}: {
  items?: { q: string; a: string }[];
  index?: string; // se conserva por compatibilidad
  title?: string[];
  surface?: string;
} = {}) {
  const [open, setOpen] = useState<number | null>(0);
  const uid = useId();

  return (
    <section className={`faq section ${surface}`} aria-labelledby="faq-title">
      <div className="container faq__grid">
        <div className="faq__side">
          <RevealText as="h2" id="faq-title" className="t-h2" parts={title} />
          <p className="faq__aside muted" data-reveal="up">
            ¿Tienes otra pregunta? Escríbenos por{' '}
            <a className="link-line" href={contact.whatsappHref}>
              WhatsApp
            </a>
          </p>
        </div>
        <ul className="faq__list" data-reveal="stagger">
          {items.map((f, i) => {
            const isOpen = open === i;
            const bid = `${uid}-b${i}`;
            const pid = `${uid}-p${i}`;
            return (
              <li key={f.q} className={`faq__item${isOpen ? ' is-open' : ''}`}>
                <h3 className="faq__h">
                  <button
                    id={bid}
                    className="faq__btn"
                    aria-expanded={isOpen}
                    aria-controls={pid}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span className="faq__q">{f.q}</span>
                    <span className="faq__icon" aria-hidden="true" />
                  </button>
                </h3>
                <div id={pid} role="region" aria-labelledby={bid} className="faq__panel">
                  <div className="faq__panel-inner">
                    <p>
                      <WithPlaceholders text={f.a} />
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
