import { useMemo, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { cases, services, clients, clientLogos, type ServiceKey } from '../data/content';
import { casesPage, industryPages, industryProjects } from '../data/pages';
import { PageHero, BlockHead } from '../components/page/blocks';
import { CaseStudyCard } from '../components/CaseStudies';
import { ImagePlaceholder } from '../components/ServiceVisual';
import { CTASection } from '../components/CTASection';
import { Button, initials } from '../components/ui';
import { useMeta } from '../lib/router';
import { t } from '../lib/i18n';
import { NotFoundPage } from './InfoPages';

const ALL = 'Todas';
const logoFor = (name: string) => clients.find((c) => c.name === name)?.logo ?? clientLogos[name];
const serviceName = (k: ServiceKey) => services.find((s) => s.key === k)?.name ?? k;

/* Soluciones que se deducen del tipo de trabajo de cada proyecto
   (sirve en español y en inglés). */
function solutionsFor(client: string, work: string): string[] {
  const keys = new Set<ServiceKey>();
  if (/software/i.test(work)) {
    keys.add('software');
    keys.add('web');
    keys.add('integraciones');
  }
  if (/\bapp\b/i.test(work)) keys.add('apps');
  if (/agente|AI agent/i.test(work)) keys.add('agentes');
  if (/integraci|integration/i.test(work)) keys.add('integraciones');
  if (/^(web|website)\b|tienda|store|e-?commerce|landing/i.test(work)) keys.add('sitios');
  // Genial Foods: logística, comercial, financiero y operativo en un solo sistema
  if (client === 'Genial Foods') keys.add('erp');
  return [...keys].map(serviceName);
}

interface Entry {
  id: string;
  kind: 'case' | 'project';
  industries: string[];
  solutions: string[];
}

/* Listado filtrable: casos documentados + proyectos de las páginas de industria */
export function CasesPage() {
  useMeta(casesPage.seoTitle, casesPage.seoDesc);
  const [industry, setIndustry] = useState<string>(ALL);
  const [solution, setSolution] = useState<string>(ALL);

  // Proyectos de cada industria, sin repetir clientes (algunos están en dos industrias)
  const projects = useMemo(() => {
    const map = new Map<
      string,
      { client: string; what: string; work: string; software: boolean; industries: string[]; solutions: string[]; href: string }
    >();
    industryPages.forEach((ind) => {
      (industryProjects[ind.slug] ?? []).forEach((p) => {
        const sols = solutionsFor(p.client, p.work);
        const prev = map.get(p.client);
        if (prev) {
          if (!prev.industries.includes(ind.name)) prev.industries.push(ind.name);
          sols.forEach((s) => !prev.solutions.includes(s) && prev.solutions.push(s));
          prev.software = prev.software || p.software;
        } else {
          map.set(p.client, { ...p, industries: [ind.name], solutions: sols, href: `/dev/industrias/${ind.slug}` });
        }
      });
    });
    // primero los que tienen software o app
    return [...map.values()].sort((a, b) => Number(b.software) - Number(a.software));
  }, []);

  const entries: Entry[] = useMemo(
    () => [
      ...cases.map((c) => ({
        id: `case-${c.id}`,
        kind: 'case' as const,
        industries: c.industry ? [c.industry] : [],
        solutions: [c.solutionName],
      })),
      ...projects.map((p) => ({ id: `p-${p.client}`, kind: 'project' as const, industries: p.industries, solutions: p.solutions })),
    ],
    [projects],
  );

  const matches = (e: Entry, ind: string, sol: string) =>
    (ind === ALL || e.industries.includes(ind)) && (sol === ALL || e.solutions.includes(sol));

  // Solo se ofrecen las opciones que tienen resultados con el otro filtro elegido
  const industryOpts = industryPages.map((i) => i.name).filter((n) => entries.some((e) => matches(e, n, solution)));
  const solutionOpts = services.map((s) => s.name).filter((n) => entries.some((e) => matches(e, industry, n)));

  const shownCases = cases.filter((c) => {
    const e = entries.find((x) => x.id === `case-${c.id}`)!;
    return matches(e, industry, solution);
  });
  const shownProjects = projects.filter((p) => matches(entries.find((x) => x.id === `p-${p.client}`)!, industry, solution));
  const total = shownCases.length + shownProjects.length;

  // Al cambiar de filtro las tarjetas se vuelven a montar. Desde el primer cambio se
  // muestran con una animación CSS propia (si no, quedan con la opacidad 0 inicial
  // de los revelados y la lista se ve vacía).
  const [touched, setTouched] = useState(false);

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
        {[ALL, ...options].map((o) => (
          <button key={o} className={`chip${value === o ? ' is-on' : ''}`} aria-pressed={value === o} onClick={() => onChange(o)}>
            {o === ALL ? t('Todas', 'All') : o}
          </button>
        ))}
      </div>
    </div>
  );

  // Al elegir un filtro, si el otro deja de tener resultados vuelve a «Todas»
  const pickIndustry = (v: string) => {
    setTouched(true);
    setIndustry(v);
    if (solution !== ALL && !entries.some((e) => matches(e, v, solution))) setSolution(ALL);
  };
  const pickSolution = (v: string) => {
    setTouched(true);
    setSolution(v);
    if (industry !== ALL && !entries.some((e) => matches(e, industry, v))) setIndustry(ALL);
  };

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
            <Chips label={t('Industria', 'Industry')} options={industryOpts} value={industry} onChange={pickIndustry} />
            <Chips label={t('Solución', 'Solution')} options={solutionOpts} value={solution} onChange={pickSolution} />
          </div>
          <p className="caselist__count muted t-small" aria-live="polite">
            {total} {total === 1 ? t('resultado', 'result') : t('resultados', 'results')}
          </p>
          <div className={`caselist__grid${touched ? ' is-filtered' : ''}`} key={`${industry}-${solution}`}>
            {shownCases.map((c) => (
              <CaseStudyCard key={c.id} c={c} size="sm" />
            ))}
            {shownProjects.map((p) => {
              const logo = logoFor(p.client);
              return (
                <a key={p.client} href={p.href} className={`pcard${p.software ? ' is-software' : ''}`} data-reveal="up">
                  <span className="pcard__top">
                    <span className="pcard__logo">
                      {logo ? <img src={logo} alt="" loading="lazy" /> : <span>{p.client.slice(0, 2)}</span>}
                    </span>
                    <span className="pcard__work">{p.work}</span>
                  </span>
                  <span className="pcard__body">
                    <span className="pcard__client">{p.client}</span>
                    <span className="pcard__what">{p.what}</span>
                  </span>
                  <span className="pcard__foot">
                    <span>{p.industries.join(' · ')}</span>
                    <ArrowUpRight strokeWidth={1.5} aria-hidden="true" />
                  </span>
                </a>
              );
            })}
          </div>
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
