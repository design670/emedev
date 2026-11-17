import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { cases, services, industries } from '../data/content';
import { casesPage } from '../data/pages';
import { PageHero, BlockHead } from '../components/page/blocks';
import { CaseStudyCard } from '../components/CaseStudies';
import { ImagePlaceholder } from '../components/ServiceVisual';
import { CTASection } from '../components/CTASection';
import { Button, initials } from '../components/ui';
import { useMeta } from '../lib/router';
import { NotFoundPage } from './InfoPages';

/* Listado filtrable por industria y por solución */
export function CasesPage() {
  useMeta(casesPage.seoTitle, casesPage.seoDesc);
  const [industry, setIndustry] = useState<string>('Todas');
  const [solution, setSolution] = useState<string>('Todas');
  const filtered = cases.filter(
    (c) => (industry === 'Todas' || c.industry === industry) && (solution === 'Todas' || c.solutionName === solution),
  );

  const Chips = ({
    label,
    options,
    value,
    onChange,
  }: {
    label: string;
    options: string[];
    value: string;
    onChange: (v: string) => void;
  }) => (
    <div className="filters__group" role="group" aria-label={label}>
      <span className="t-label muted">{label}</span>
      <div className="filters__chips">
        {['Todas', ...options].map((o) => (
          <button key={o} className={`chip${value === o ? ' is-on' : ''}`} aria-pressed={value === o} onClick={() => onChange(o)}>
            {o}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Casos' }]}
        title={['Proyectos con', { t: 'resultados medibles.', cls: 'hl' }]}
        subtitle={casesPage.subtitle}
        cta={null}
        compact
      />
      <section className="caselist section on-light" aria-label="Listado de casos">
        <div className="container">
          <div className="filters" data-reveal="up">
            <Chips label="Industria" options={industries.map((i) => i.name)} value={industry} onChange={setIndustry} />
            <Chips label="Solución" options={services.map((s) => s.name)} value={solution} onChange={setSolution} />
          </div>
          {filtered.length ? (
            <div className="caselist__grid" key={`${industry}-${solution}`}>
              {filtered.map((c) => (
                <CaseStudyCard key={c.id} c={c} size="sm" />
              ))}
            </div>
          ) : (
            <div className="caselist__empty" aria-live="polite">
              <p className="t-h3">Aún no hay casos publicados con este filtro.</p>
              <button
                className="link-line"
                onClick={() => {
                  setIndustry('Todas');
                  setSolution('Todas');
                }}
              >
                Ver todos los casos
              </button>
            </div>
          )}
        </div>
      </section>
      <CTASection />
    </>
  );
}

/* Caso individual */
export function CasePage({ slug }: { slug: string }) {
  const c = cases.find((x) => x.slug === slug);
  useMeta(c ? `${c.client}: caso de éxito | EME Dev` : 'Caso no encontrado | EME Dev', c?.result);
  if (!c) return <NotFoundPage />;

  const words = c.title.split(' ');
  const cut = words.findIndex((w) => w === 'con' || w === 'su' || w === 'sus');
  const head = words.slice(0, cut > 2 ? cut : -3).join(' ');
  const tail = words.slice(cut > 2 ? cut : -3).join(' ');

  const ficha = [
    ['Industria', c.sector],
    ['Tamaño de la empresa', c.size],
    ['Solución', c.solutionName],
    ['Duración del proyecto', c.duration],
    ['Tecnologías', c.tech],
  ];

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Casos', href: '/dev/casos' }, { label: c.client }]}
        title={[head, { t: tail, cls: 'hl' }]}
        subtitle={c.problem}
        cta="Quiero algo parecido"
        compact
      />

      <section className="cdetail section on-light" aria-label="Detalle del caso">
        <div className="container cdetail__grid">
          <dl className="cdetail__ficha" data-reveal="stagger">
            {ficha.map(([k, v]) => (
              <div key={k}>
                <dt className="t-label muted">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          <div className="cdetail__body">
            <article className="cdetail__block" data-reveal="up">
              <h2 className="t-h3">El punto de partida</h2>
              <p className="muted">{c.start}</p>
            </article>
            <div className="cdetail__media" data-reveal="mask">
              <div data-mask-inner className="cdetail__media-inner">
                <ImagePlaceholder n={9 + c.id} />
              </div>
            </div>
            <article className="cdetail__block" data-reveal="up">
              <h2 className="t-h3">Lo que construimos</h2>
              <p className="muted">{c.built}</p>
            </article>
            <article className="cdetail__block" data-reveal="up">
              <h2 className="t-h3">Cómo fue el proceso</h2>
              <p className="muted">{c.process}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="cresults section on-dark" aria-labelledby="cresults-title">
        <div className="container">
          <BlockHead title={['Antes y', { t: 'después.', cls: 'hl' }]} id="cresults-title" />
          <ul className="cresults__grid" data-reveal="stagger">
            {c.results.map((r) => (
              <li key={r.label} className="cresult">
                <span className="cresult__label t-label">{r.label}</span>
                <div className="cresult__row">
                  <span>
                    <small className="muted">Antes</small>
                    {r.before}
                  </span>
                  <ArrowUpRight strokeWidth={1.25} aria-hidden="true" />
                  <span>
                    <small className="muted">Después</small>
                    <span className="hl">{r.after}</span>
                  </span>
                </div>
              </li>
            ))}
          </ul>
          <p className="t-small muted cresults__note">{c.resultNote}</p>
        </div>
      </section>

      <section className="ctesti section on-surface" aria-label="Testimonio">
        <div className="container">
          <figure className="tcard is-active ctesti__card" data-reveal="up">
            <blockquote className="tcard__quote">
              <p>“{c.testimonial.quote}”</p>
            </blockquote>
            <figcaption className="tcard__who">
              <span className="tcard__photo" aria-hidden="true">
                {initials(c.testimonial.name)}
              </span>
              <span>
                <strong>{c.testimonial.name}</strong>
                <span className="muted">
                  {c.testimonial.role}, {c.client}
                </span>
              </span>
            </figcaption>
          </figure>
          <div className="ctesti__cta" data-reveal="up">
            <Button href="/dev/diagnostico" variant="ink">
              Quiero algo parecido
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
