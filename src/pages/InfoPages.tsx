import { PartnerIcon } from '../components/PartnerIcon';
import { useState, type FormEvent } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { processPage, securityPage, teamPage, resourcesPage, diagnosticPage } from '../data/pages';
import { contact } from '../data/content';
import { PageHero, BlockHead } from '../components/page/blocks';
import { CTASection } from '../components/CTASection';
import { Button, WithPlaceholders } from '../components/ui';
import { ImagePlaceholder } from '../components/ServiceVisual';
import { MetricCounter } from '../components/Metrics';
import { useMeta } from '../lib/router';
import { t } from '../lib/i18n';

/* ------------------------------------------------------------------ */
/* Proceso                                                             */
/* ------------------------------------------------------------------ */
export function ProcessPage() {
  useMeta(processPage.seoTitle, processPage.seoDesc);
  return (
    <>
      <PageHero
        crumbs={[{ label: t('Proceso', 'Process') }]}
        label={t('Proceso', 'Process')}
        title={[t('Así', 'How we'), { t: t('trabajamos.', 'work.'), cls: 'hl' }]}
        subtitle={processPage.subtitle}
        secondary={{ label: t('Ver rangos de inversión', 'View investment ranges'), href: '#rangos' }}
      />

      <section className="stages section on-light" aria-labelledby="stages-title">
        <div className="container">
          <BlockHead index="01" label={t('Las cinco etapas', 'The five stages')} title={[t('De la primera reunión', 'From the first meeting'), { t: t('al sistema en uso.', 'to a system in use.'), cls: 'mark' }]} id="stages-title" />
          <ol className="stages__list">
            {processPage.stages.map((s, i) => (
              <li key={s.name} className="stage" data-reveal="up">
                <span className="stage__num">{String(i + 1).padStart(2, '0')}</span>
                <div className="stage__main">
                  <h3 className="t-h3">{s.name}</h3>
                  {s.time && <span className="stage__time">{s.time}</span>}
                  <p className="muted">{s.text}</p>
                </div>
                <div className="stage__gets">
                  <span className="t-label">{t('Recibes', 'You get')}</span>
                  <p>{s.gets}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="ranges section on-dark" id="rangos" aria-labelledby="ranges-title">
        <div className="container ranges__grid">
          <BlockHead index="03" label={t('Rangos de inversión', 'Investment ranges')} title={[t('Cuánto cuesta,', 'What it costs,'), { t: t('antes de empezar.', 'before you start.'), cls: 'hl' }]} id="ranges-title" />
          <div className="ranges__table" role="table" aria-label={t('Rangos de inversión por tipo de proyecto', 'Investment ranges by project type')} data-reveal="up">
            <div className="ranges__row is-head" role="row">
              <span role="columnheader">{t('Tipo de proyecto', 'Project type')}</span>
              <span role="columnheader">{t('Inversión desde', 'Investment from')}</span>
              <span role="columnheader">{t('Tiempo estimado', 'Estimated time')}</span>
            </div>
            {processPage.ranges.map((r) => (
              <div className="ranges__row" role="row" key={r.type}>
                <span role="cell">{r.type}</span>
                <span role="cell">
                  <WithPlaceholders text={r.from} />
                </span>
                <span role="cell">
                  <WithPlaceholders text={r.time} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="commit section on-light" aria-labelledby="commit-title">
        <div className="container commit__grid">
          <BlockHead index="04" label={t('Compromisos', 'Commitments')} title={[t('Lo que nos comprometemos', 'What we commit'), { t: t('a cumplir.', 'to deliver.'), cls: 'mark' }]} id="commit-title" />
          <ul className="commit__list" data-reveal="stagger">
            {processPage.commitments.map((c) => (
              <li key={c}>
                <span className="commit__check" aria-hidden="true">
                  <Check strokeWidth={2} />
                </span>
                <p>
                  <WithPlaceholders text={c} />
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CTASection />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Seguridad y datos                                                   */
/* ------------------------------------------------------------------ */
export function SecurityPage() {
  useMeta(securityPage.seoTitle, securityPage.seoDesc);
  return (
    <>
      <PageHero
        crumbs={[{ label: t('Seguridad y datos', 'Security & data') }]}
        label={t('Seguridad y datos', 'Security & data')}
        title={[t('Cómo cuidamos tu información', 'How we protect your information'), { t: t('y tu inversión.', 'and your investment.'), cls: 'hl' }]}
        subtitle={securityPage.subtitle}
        cta={securityPage.cta}
        ctaHref={`mailto:${contact.email}?subject=${t('Documentación de seguridad EME Dev', 'EME Dev security documentation')}`}
      />
      <section className="secitems section on-light" aria-label={t('Prácticas de seguridad', 'Security practices')}>
        <div className="container">
          <ol className="secitems__list">
            {securityPage.items.map((it, i) => (
              <li key={it.name} className="secitem" data-reveal="up">
                <span className="secitem__num">{String(i + 1).padStart(2, '0')}</span>
                <h2 className="t-h3 secitem__name">{it.name}</h2>
                <p className="secitem__text">
                  <WithPlaceholders text={it.text} />
                </p>
              </li>
            ))}
          </ol>
          <div className="secitems__cta" data-reveal="up">
            <Button href={`mailto:${contact.email}?subject=${t('Documentación de seguridad EME Dev', 'EME Dev security documentation')}`} variant="ink">
              {securityPage.cta}
            </Button>
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Equipo                                                              */
/* ------------------------------------------------------------------ */
export function TeamPage() {
  useMeta(teamPage.seoTitle, teamPage.seoDesc);
  return (
    <>
      <PageHero
        crumbs={[{ label: t('Equipo', 'Team') }]}
        label={t('Equipo', 'Team')}
        title={[t('Quién construye', 'Who builds'), { t: t('tu proyecto.', 'your project.'), cls: 'hl' }]}
        subtitle={teamPage.subtitle}
      />
      <section className="team section on-light" aria-labelledby="team-title">
        <div className="container">
          <BlockHead index="01" label={t('Líderes', 'Leaders')} title={[t('Las personas', 'The people'), { t: t('detrás.', 'behind it.'), cls: 'mark' }]} id="team-title" />
          <ul className="team__grid" data-reveal="stagger">
            {teamPage.people.map((p, i) => (
              <li key={i} className="person">
                <div className="person__photo">
                  <ImagePlaceholder n={14 + i} />
                </div>
                <h3 className="t-h4">{p.name}</h3>
                <p className="person__role">{p.role}</p>
                <p className="muted t-small">
                  <WithPlaceholders text={p.bio} />
                </p>
                <a className="link-line person__in" href="https://www.linkedin.com/" target="_blank" rel="noopener">
                  LinkedIn <ArrowUpRight strokeWidth={1.5} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="tnums section on-dark" aria-labelledby="tnums-title">
        <div className="container">
          <BlockHead index="02" label={t('El equipo en cifras', 'The team in numbers')} title={[t('El equipo', 'The team'), { t: t('en cifras.', 'in numbers.'), cls: 'hl' }]} id="tnums-title" />
          <ul className="tnums__grid" data-reveal="stagger">
            {teamPage.numbers.map((n) => (
              <li key={n.label}>
                <MetricCounter value={n.value} />
                <span className="muted">{n.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="tcerts section on-surface" aria-labelledby="tcerts-title">
        <div className="container tcerts__grid">
          <BlockHead index="03" label={t('Certificaciones y alianzas', 'Certifications and partnerships')} title={[t('Parte de', 'Part of'), { t: 'EME.', cls: 'mark' }]} id="tcerts-title">
            <p className="t-lead" data-reveal="up">
              {teamPage.parent}
            </p>
          </BlockHead>
          <ul className="tcerts__list" data-reveal="stagger">
            {teamPage.certs.map((c) => (
              <li key={c}>
                <PartnerIcon name={c} className="tcerts__icon" />
                <span className="tcerts__name">{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CTASection />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Recursos                                                            */
/* ------------------------------------------------------------------ */
export function ResourcesPage() {
  useMeta(resourcesPage.seoTitle, resourcesPage.seoDesc);
  return (
    <>
      <PageHero
        crumbs={[{ label: t('Recursos', 'Resources') }]}
        label={t('Recursos', 'Resources')}
        title={[t('Guías para decidir mejor', 'Guides to make better'), { t: t('sobre tecnología.', 'technology decisions.'), cls: 'hl' }]}
        cta={null}
        compact
      />
      <section className="articles section on-light" aria-label={t('Artículos', 'Articles')}>
        <div className="container">
          <ul className="articles__grid" data-reveal="stagger">
            {resourcesPage.articles.map((a, i) => (
              <li key={a.title} className={`article${i === 0 ? ' is-feature' : ''}`}>
                <div className="article__top">
                  <span className="t-label">{a.tag}</span>
                  <span className="article__soon">{t('Próximamente', 'Coming soon')}</span>
                </div>
                <h2 className="article__title">{a.title}</h2>
                <span className="article__num">{String(i + 1).padStart(2, '0')}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CTASection />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Diagnóstico                                                         */
/* ------------------------------------------------------------------ */
export function DiagnosticPage() {
  useMeta(diagnosticPage.seoTitle, diagnosticPage.seoDesc);
  const [sent, setSent] = useState(false);
  const [need, setNeed] = useState<string[]>([]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    // Pendiente: enviar al pipeline de Dev en Achieve Apex
    setSent(true);
  };

  return (
    <>
      <PageHero
        crumbs={[{ label: t('Diagnóstico', 'Diagnostic') }]}
        label={t('Diagnóstico gratis', 'Free diagnostic')}
        title={[t('Cuéntanos qué', 'Tell us what'), { t: t('quieres resolver.', 'you want to solve.'), cls: 'hl' }]}
        subtitle={diagnosticPage.subtitle}
        cta={null}
        compact
      />
      <section className="diag section on-light" aria-label={t('Formulario de diagnóstico', 'Diagnostic form')}>
        <div className="container diag__grid">
          <aside className="diag__side">
            <h2 className="t-h4" data-reveal="fade">
              {t('Qué pasa después', 'What happens next')}
            </h2>
            <ol className="diag__steps" data-reveal="stagger">
              {diagnosticPage.steps.map((s, i) => (
                <li key={s}>
                  <span className="diag__stepnum">{i + 1}</span>
                  <p>{s}</p>
                </li>
              ))}
            </ol>
            <div className="diag__contact" data-reveal="up">
              <p className="t-label muted">{t('Otras formas de contacto', 'Other ways to reach us')}</p>
              <a href={contact.whatsappHref}>WhatsApp {contact.whatsapp}</a>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <span className="muted">{contact.address}</span>
            </div>
          </aside>

          {sent ? (
            <div className="diag__done" role="status">
              <span className="diag__done-icon" aria-hidden="true">
                <Check strokeWidth={2} />
              </span>
              <h2 className="t-h2">{t('Recibimos tu información.', 'We received your information.')}</h2>
              <p className="t-lead muted">
                {t(
                  'Te escribimos para agendar la llamada de 30 minutos. Si prefieres, escríbenos por',
                  'We’ll reach out to schedule the 30-minute call. If you prefer, message us on',
                )}{' '}
                <a className="link-line" href={contact.whatsappHref}>
                  WhatsApp
                </a>
                .
              </p>
            </div>
          ) : (
            <form className="diag__form" onSubmit={onSubmit} noValidate data-reveal="up">
              <div className="field-row">
                <label className="field">
                  <span>{t('Nombre', 'Name')}</span>
                  <input name="nombre" required autoComplete="name" />
                </label>
                <label className="field">
                  <span>{t('Empresa', 'Company')}</span>
                  <input name="empresa" required autoComplete="organization" />
                </label>
              </div>
              <div className="field-row">
                <label className="field">
                  <span>{t('Cargo', 'Job title')}</span>
                  <input name="cargo" autoComplete="organization-title" />
                </label>
                <label className="field">
                  <span>{t('Correo', 'Email')}</span>
                  <input name="correo" type="email" required autoComplete="email" />
                </label>
              </div>
              <label className="field">
                <span>WhatsApp</span>
                <input name="whatsapp" type="tel" inputMode="tel" autoComplete="tel" />
              </label>

              <fieldset className="field field--chips">
                <legend>{t('¿Qué necesitas?', 'What do you need?')}</legend>
                <div className="filters__chips">
                  {diagnosticPage.needs.map((n) => {
                    const on = need.includes(n);
                    return (
                      <label key={n} className={`chip${on ? ' is-on' : ''}`}>
                        <input
                          type="checkbox"
                          name="necesidad"
                          value={n}
                          checked={on}
                          onChange={() => setNeed(on ? need.filter((x) => x !== n) : [...need, n])}
                          className="sr-only"
                        />
                        {n}
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              <div className="field-row">
                <label className="field">
                  <span>{t('Tamaño de la empresa', 'Company size')}</span>
                  <select name="tamano" defaultValue="">
                    <option value="" disabled>
                      {t('Selecciona', 'Select')}
                    </option>
                    {diagnosticPage.sizes.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </label>
                <label className="field">
                  <span>{t('Presupuesto aproximado', 'Approximate budget')}</span>
                  <select name="presupuesto" defaultValue="">
                    <option value="" disabled>
                      {t('Selecciona', 'Select')}
                    </option>
                    {diagnosticPage.budgets.map((b) => (
                      <option key={b}>{b}</option>
                    ))}
                  </select>
                </label>
              </div>
              <label className="field">
                <span>{t('Cuéntanos el problema en dos o tres líneas', 'Describe the problem in two or three lines')}</span>
                <textarea name="problema" rows={4} required />
              </label>
              <div className="diag__submit">
                <button type="submit" className="btn btn--ink" data-cursor="link">
                  <span className="btn__label">
                    <span>{t('Enviar y agendar', 'Send and schedule')}</span>
                    <span aria-hidden="true">{t('Enviar y agendar', 'Send and schedule')}</span>
                  </span>
                  <span className="btn__icon" aria-hidden="true">
                    <ArrowUpRight strokeWidth={1.75} />
                  </span>
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* 404                                                                 */
/* ------------------------------------------------------------------ */
export function NotFoundPage() {
  useMeta(t('Página no encontrada | EME Dev', 'Page not found | EME Dev'));
  return (
    <PageHero
      crumbs={[{ label: t('Página no encontrada', 'Page not found') }]}
      title={[t('Esta página', 'This page'), { t: t('no existe.', 'doesn’t exist.'), cls: 'hl' }]}
      subtitle={t('Revisa la dirección o vuelve al inicio.', 'Check the address or go back to the home page.')}
      cta={t('Volver al inicio', 'Back to home')}
      ctaHref="/dev"
    />
  );
}
