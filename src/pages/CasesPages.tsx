import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { cases, services, industries } from '../data/content';
import { casesPage } from '../data/pages';
import { PageHero, BlockHead } from '../components/page/blocks';
import { CaseStudyCard } from '../components/CaseStudies';
import { ImagePlaceholder } from '../components/ServiceVisual';
import { CTASection } from '../components/CTASection';
import { Button, initials } from '../components/ui';
import { useMeta } from '../lib/router';
import { t } from '../lib/i18n';
import { NotFoundPage } from './InfoPages';
import { gsap, prefersReduced } from '../lib/motion';

/* Listado filtrable por industria y por solución */
export function CasesPage() {
  useMeta(casesPage.seoTitle, casesPage.seoDesc);
  const [industry, setIndustry] = useState<string>('Todas');
  const [solution, setSolution] = useState<string>('Todas');
  const filtered = cases.filter(
    (c) => (industry === 'Todas' || c.industry === industry) && (solution === 'Todas' || c.solutionName === solution),
  );

  // Al cambiar de filtro las tarjetas se vuelven a montar: hay que mostrarlas
  // (si no, quedan con la opacidad 0 inicial de los revelados y la lista se ve vacía)
  const grid = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);
  useEffect(() => {
    const el = grid.current;
    if (!el) return;
    const items = el.querySelectorAll<HTMLElement>('[data-reveal]');
    if (firstRender.current) {
      firstRender.current = false;
      // en la primera carga lo anima el sistema de revelados de la página
      return;
    }
    gsap.killTweensOf(items);
    gsap.set(el.querySelectorAll('[data-reveal="mask"]'), { clipPath: 'none' });
    if (prefersReduced()) {
      gsap.set(items, { opacity: 1, y: 0 });
      return;
    }
    gsap.fromTo(
      el.querySelectorAll('.case'),
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.06, ease: 'power3.out' },
    );
    gsap.set(el.querySelectorAll('[data-reveal="mask"]'), { opacity: 1 });
  }, [industry, solution]);

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
            {o === 'Todas' ? t('Todas', 'All') : o}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <PageHero
        crumbs={[{ label: t('Casos', 'Case studies') }]}
        title={[t('Proyectos con', 'Projects with'), { t: t('resultados medibles.', 'measurable results.'), cls: 'hl' }]}
        subtitle={casesPage.subtitle}
        cta={null}
        compact
      />
      <section className="caselist section on-light" aria-label={t('Listado de casos', 'Case study list')}>
        <div className="container">
          <div className="filters" data-reveal="up">
            <Chips label={t('Industria', 'Industry')} options={industries.map((i) => i.name)} value={industry} onChange={setIndustry} />
            <Chips label={t('Solución', 'Solution')} options={services.map((s) => s.name)} value={solution} onChange={setSolution} />
          </div>
          {filtered.length ? (
            <div className="caselist__grid" ref={grid} key={`${industry}-${solution}`}>
              {filtered.map((c) => (
                <CaseStudyCard key={c.id} c={c} size="sm" />
              ))}
            </div>
          ) : (
            <div className="caselist__empty" aria-live="polite">
              <p className="t-h3">{t('Aún no hay casos publicados con este filtro.', 'No case studies published for this filter yet.')}</p>
              <button
                className="link-line"
                onClick={() => {
                  setIndustry('Todas');
                  setSolution('Todas');
                }}
              >
                {t('Ver todos los casos', 'View all case studies')}
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
  useMeta(
    c
      ? t(`${c.client}: caso de éxito | EME Dev`, `${c.client}: case study | EME Dev`)
      : t('Caso no encontrado | EME Dev', 'Case study not found | EME Dev'),
    c?.result,
  );
  if (!c) return <NotFoundPage />;

  const words = c.title.split(' ');
  const cut = words.findIndex((w) => ['con', 'su', 'sus', 'with', 'its', 'their'].includes(w));
  const head = words.slice(0, cut > 2 ? cut : -3).join(' ');
  const tail = words.slice(cut > 2 ? cut : -3).join(' ');

  const ficha = [
    [t('Industria', 'Industry'), c.sector],
    [t('Tamaño de la empresa', 'Company size'), c.size],
    [t('Solución', 'Solution'), c.solutionName],
    [t('Duración del proyecto', 'Project duration'), c.duration],
    [t('Tecnologías', 'Technologies'), c.tech],
  ];

  return (
    <>
      <PageHero
        crumbs={[{ label: t('Casos', 'Case studies'), href: '/dev/casos' }, { label: c.client }]}
        title={[head, { t: tail, cls: 'hl' }]}
        subtitle={c.problem}
        cta={t('Quiero algo parecido', 'I want something similar')}
        compact
      />

      <section className="cdetail section on-light" aria-label={t('Detalle del caso', 'Case study details')}>
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
              <h2 className="t-h3">{t('El punto de partida', 'The starting point')}</h2>
              <p className="muted">{c.start}</p>
            </article>
            <div className="cdetail__media" data-reveal="mask">
              <div data-mask-inner className="cdetail__media-inner">
                <ImagePlaceholder n={9 + c.id} />
              </div>
            </div>
            <article className="cdetail__block" data-reveal="up">
              <h2 className="t-h3">{t('Lo que construimos', 'What we built')}</h2>
              <p className="muted">{c.built}</p>
            </article>
            <article className="cdetail__block" data-reveal="up">
              <h2 className="t-h3">{t('Cómo fue el proceso', 'How the process went')}</h2>
              <p className="muted">{c.process}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="cresults section on-dark" aria-labelledby="cresults-title">
        <div className="container">
          <BlockHead title={[t('Antes y', 'Before and'), { t: t('después.', 'after.'), cls: 'hl' }]} id="cresults-title" />
          <ul className="cresults__grid" data-reveal="stagger">
            {c.results.map((r) => (
              <li key={r.label} className="cresult">
                <span className="cresult__label t-label">{r.label}</span>
                <div className="cresult__row">
                  <span>
                    <small className="muted">{t('Antes', 'Before')}</small>
                    {r.before}
                  </span>
                  <ArrowUpRight strokeWidth={1.25} aria-hidden="true" />
                  <span>
                    <small className="muted">{t('Después', 'After')}</small>
                    <span className="hl">{r.after}</span>
                  </span>
                </div>
              </li>
            ))}
          </ul>
          <p className="t-small muted cresults__note">{c.resultNote}</p>
        </div>
      </section>

      <section className="ctesti section on-surface" aria-label={t('Testimonio', 'Testimonial')}>
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
              {t('Quiero algo parecido', 'I want something similar')}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
