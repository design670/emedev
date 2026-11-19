import { ArrowUpRight } from 'lucide-react';
import { DIAGNOSTICO_HREF, contact } from '../data/content';
import { Button, RevealText, useMagnetic } from './ui';
import { t } from '../lib/i18n';

export function CTASection() {
  const badge = useMagnetic<HTMLAnchorElement>(0.35);
  const ring = t('Diagnóstico sin costo · 30 minutos · ', 'Free diagnostic · 30 minutes · ');
  return (
    <section className="cta section" aria-labelledby="cta-title">
      <div className="container cta__grid">
        <RevealText
          as="h2"
          id="cta-title"
          className="cta__title"
          parts={[t('Cuéntanos qué', 'Tell us what'), t('quieres resolver.', 'you want to solve.')]}
        />
        <div className="cta__bottom">
          <p className="cta__text t-lead" data-reveal="up">
            {t(
              'En 30 minutos revisamos tu caso y te decimos si podemos ayudarte, cómo y con qué inversión aproximada. Si no somos la opción correcta, también te lo decimos.',
              'In 30 minutes we review your case and tell you whether we can help, how, and at roughly what investment. If we’re not the right fit, we’ll tell you that too.',
            )}
          </p>
          <div className="cta__contact t-small" data-reveal="up" data-delay="0.1">
            <a href={contact.whatsappHref}>WhatsApp {contact.whatsapp}</a>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </div>
          <Button href={DIAGNOSTICO_HREF} variant="ink" className="cta__btn">
            {t('Diagnóstico gratis', 'Free diagnostic')}
          </Button>
          <a
            ref={badge}
            href={DIAGNOSTICO_HREF}
            className="cta__badge"
            aria-label={t('Diagnóstico gratis', 'Free diagnostic')}
            data-cursor-label={t('AGENDAR', 'BOOK')}
            data-reveal="fade"
          >
            <svg viewBox="0 0 200 200" className="cta__ring" aria-hidden="true">
              <defs>
                <path id="cta-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
              </defs>
              <text textLength="486" lengthAdjust="spacing">
                <textPath href="#cta-circle" textLength="486" lengthAdjust="spacing">
                  {ring}
                </textPath>
              </text>
            </svg>
            <span className="cta__badge-core">
              <ArrowUpRight strokeWidth={1.5} aria-hidden="true" />
            </span>
            <span className="cta__badge-label">{t('Diagnóstico gratis', 'Free diagnostic')}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
