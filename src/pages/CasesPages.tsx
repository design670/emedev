import { useMemo, useState, type ReactNode } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { cases, services, clients, clientLogos, DIAGNOSTICO_HREF, type ServiceKey } from '../data/content';
import { caseStories, processByKind } from '../data/caseStories';
import { casesPage, industryPages, industryProjects } from '../data/pages';
import { PageHero, BlockHead, RelatedLinks } from '../components/page/blocks';
import { ImagePlaceholder } from '../components/ServiceVisual';
import { CTASection } from '../components/CTASection';
import { Button, initials } from '../components/ui';
import { useMeta } from '../lib/router';
import { t } from '../lib/i18n';
import { NotFoundPage } from './InfoPages';

const ALL = 'Todas';
const logoFor = (name: string) => clients.find((c) => c.name === name)?.logo ?? clientLogos[name];
const serviceName = (k: ServiceKey) => services.find((s) => s.key === k)?.name ?? k;

/* Miniatura de cada proyecto (tomada de las mesas de trabajo de Figma «Eme 2.0»).
   Los clientes sin miniatura muestran su logo sobre el bloque negro. */
const thumbs: Record<string, string> = {
  Rapibox: 'rapibox',
  Importex: 'importex',
  CargoNet: 'cargonet',
  'Puerto de Barranquilla': 'puerto-barranquilla',
  'Zona Franca La Cayena': 'zona-franca-la-cayena',
  ProBarranquilla: 'probarranquilla',
  'Estrategia LTDA': 'estrategias',
  Avantika: 'avantika',
  'Carnes Santacruz': 'carnes-santacruz',
  Quidem: 'quidem',
  'HYK Colombia': 'hyk',
  Soluzioni: 'soluzioni',
  Pintumax: 'pintumax',
  Quirulaser: 'quirulaser',
  Watertown: 'watertown',
  'Clínica La Asunción': 'clinica-la-asuncion',
  'Issa Abuchaibe': 'issa-abuchaibe',
  'Sociedad Colombiana de Pediatría': 'sociedad-colombiana-de-pediatria',
  Cajacopi: 'cajacopi',
  'Academia Sandra': 'academia-sandra',
  'Almacén Sandra': 'almacen-sandra',
  ICSA: 'icsa',
  'Universidad Metropolitana': 'universidad-metropolitana',
  'Universidad de la Costa': 'universidad-de-la-costa',
  Befuturo: 'befuturo',
};
const thumbFor = (name: string) => (thumbs[name] ? `/casos/${thumbs[name]}.jpg` : undefined);

/* Cards grandes de imagen de la página interna, exportadas en 2x de las mesas
   de cada cliente en el Figma «Eme 2.0» (página Aprobada), en el mismo orden. */
const SHOTS: Record<string, number> = {
  avantika: 4,
  cajacopi: 2,
  'carnes-santacruz': 3,
  'clinica-la-asuncion': 4,
  estrategias: 3,
  hyk: 4,
  importex: 4,
  'issa-abuchaibe': 4,
  pintumax: 4,
  probarranquilla: 4,
  'puerto-barranquilla': 4,
  quidem: 3,
  quirulaser: 4,
  rapibox: 4,
  'sociedad-colombiana-de-pediatria': 2,
  soluzioni: 4,
  watertown: 1,
  'zona-franca-la-cayena': 4,
};
/* Clientes que aún no tienen sus cards: una sola imagen de mockup */
const LEGACY_SHOT = new Set(['almacen-sandra', 'cargonet']);
const shotsFor = (name: string): string[] => {
  const slug = thumbs[name];
  if (!slug) return [];
  if (SHOTS[slug]) return Array.from({ length: SHOTS[slug] }, (_, i) => `/casos/galeria/${slug}-${i + 1}.jpg`);
  return LEGACY_SHOT.has(slug) ? [`/casos/galeria/${slug}.jpg`] : [];
};

function Shot({ src, first }: { src?: string; first?: boolean }) {
  if (!src) return null;
  return (
    <section className={`pcase-gallery on-light${first ? ' pcase-gallery--first' : ''}`} aria-hidden="true">
      <div className="container">
        <figure className="pcase__shot" data-reveal="up">
          <img src={src} alt="" loading={first ? 'eager' : 'lazy'} decoding="async" />
        </figure>
      </div>
    </section>
  );
}

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

/* «Almacén Sandra» → «almacen-sandra» */
const slugify = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

interface Project {
  client: string;
  what: string;
  work: string;
  software: boolean;
  slug: string;
  industries: { name: string; slug: string }[];
  solutions: string[];
}

/* Proyectos de cada industria, sin repetir clientes (algunos están en dos industrias) */
function buildProjects(): Project[] {
  const map = new Map<string, Project>();
  industryPages.forEach((ind) => {
    (industryProjects[ind.slug] ?? []).forEach((p) => {
      const sols = solutionsFor(p.client, p.work);
      const prev = map.get(p.client);
      if (prev) {
        if (!prev.industries.some((i) => i.slug === ind.slug)) prev.industries.push({ name: ind.name, slug: ind.slug });
        sols.forEach((s) => !prev.solutions.includes(s) && prev.solutions.push(s));
        prev.software = prev.software || p.software;
      } else {
        map.set(p.client, { ...p, slug: slugify(p.client), industries: [{ name: ind.name, slug: ind.slug }], solutions: sols });
      }
    });
  });
  // primero los que tienen software o app
  return [...map.values()].sort((a, b) => Number(b.software) - Number(a.software));
}

/* Listado filtrable de los proyectos de las páginas de industria */
export function CasesPage() {
  useMeta(casesPage.seoTitle, casesPage.seoDesc);
  const [industry, setIndustry] = useState<string>(ALL);
  const [solution, setSolution] = useState<string>(ALL);

  const projects = useMemo(buildProjects, []);

  const entries: Entry[] = useMemo(
    () => [
      // Los casos de ejemplo (Constructora Litoral, Red Médica Andina…) ya no se listan:
      // solo proyectos reales de clientes
      ...projects.map((p) => ({ id: `p-${p.client}`, kind: 'project' as const, industries: p.industries.map((i) => i.name), solutions: p.solutions })),
    ],
    [projects],
  );

  const matches = (e: Entry, ind: string, sol: string) =>
    (ind === ALL || e.industries.includes(ind)) && (sol === ALL || e.solutions.includes(sol));

  // Solo se ofrecen las opciones que tienen resultados con el otro filtro elegido
  const industryOpts = industryPages.map((i) => i.name).filter((n) => entries.some((e) => matches(e, n, solution)));
  const solutionOpts = services.map((s) => s.name).filter((n) => entries.some((e) => matches(e, industry, n)));

  const shownProjects = projects.filter((p) => matches(entries.find((x) => x.id === `p-${p.client}`)!, industry, solution));
  const total = shownProjects.length;

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
            {shownProjects.map((p) => {
              const logo = logoFor(p.client);
              // Misma tarjeta que los casos: bloque negro arriba (con el logo), cliente,
              // trabajo realizado, qué hace y la ficha industria / soluciones
              return (
                <article key={p.client} className="case case--sm case--project" data-reveal="up">
                  <a
                    href={`/dev/casos/${p.slug}`}
                    className="case__link"
                    data-cursor-label={t('VER', 'VIEW')}
                    aria-label={t(`Ver el caso de ${p.client}`, `View the ${p.client} case`)}
                  >
                    <div className="case__media">
                      {thumbFor(p.client) ? (
                        <div className="case__media-inner">
                          <img className="case__thumb" src={thumbFor(p.client)} alt="" loading="lazy" />
                        </div>
                      ) : (
                        <div className="case__media-inner case__media-logo">
                          <span className="case__logo">
                            {logo ? <img src={logo} alt="" loading="lazy" /> : <span>{p.client}</span>}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="case__body">
                      <p className="case__meta">
                        {p.client} · {p.industries.map((i) => i.name).join(' · ')}
                      </p>
                      <div className="case__result">
                        <span className="case__result-num">{p.work}</span>
                        <span className="case__result-note muted t-small">{p.what}</span>
                      </div>
                      <dl className="case__dl">
                        <div>
                          <dt>{t('El problema', 'The problem')}</dt>
                          <dd>{caseStories[p.client]?.problem}</dd>
                        </div>
                        <div>
                          <dt>{t('Lo que construimos', 'What we built')}</dt>
                          <dd>{caseStories[p.client]?.built}</dd>
                        </div>
                      </dl>
                      <span className="link-line case__more">
                        {t('Ver caso', 'View case')} <ArrowUpRight strokeWidth={1.5} aria-hidden="true" />
                      </span>
                    </div>
                  </a>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}

/* Página interna de cada proyecto, armada como un proyecto de portafolio:
   portada, ficha, el reto, el impacto, la solución, el proceso, el resultado
   y la invitación a empresas con un problema parecido. */
function ProjectPage({ p, all }: { p: Project; all: Project[] }) {
  const s = caseStories[p.client];
  useMeta(
    t(`${p.client}: ${p.work} | Caso EME Dev`, `${p.client}: ${p.work} | EME Dev case study`),
    s?.problem ?? `${p.work} · ${p.what}`,
  );
  const logo = logoFor(p.client);
  const thumb = thumbFor(p.client);
  const shots = shotsFor(p.client);
  /* Con historia, la primera card va después del hero y las demás entre secciones;
     sin historia, todas van seguidas después del hero. */
  const lead = s ? shots.slice(0, 1) : shots;
  const indSlugs = p.industries.map((i) => i.slug);
  const others = all.filter((o) => o.client !== p.client && o.industries.some((i) => indSlugs.includes(i.slug))).slice(0, 6);
  const steps = s ? processByKind[s.kind] : [];

  const facts: [string, ReactNode][] = [
    [t('Cliente', 'Client'), p.client],
    [t('A qué se dedica', 'What they do'), p.what],
    [
      t('Industria', 'Industry'),
      p.industries.map((i, n) => (
        <span key={i.slug}>
          {n > 0 && ' · '}
          <a className="link-line" href={`/dev/industrias/${i.slug}`}>
            {i.name}
          </a>
        </span>
      )),
    ],
    [t('Lo que construimos', 'What we built'), p.work],
  ];

  return (
    <>
      <PageHero
        crumbs={[{ label: t('Casos', 'Case studies'), href: '/dev/casos' }, { label: p.client }]}
        title={[{ t: p.client, cls: 'hl' }]}
        subtitle={s?.built ?? `${p.work} · ${p.what}`}
        cta={t('Quiero algo parecido', 'I want something similar')}
        compact
      />

      {lead.map((src, i) => (
        <Shot key={src} src={src} first={i === 0} />
      ))}

      {/* Portada y ficha */}
      <section className="pcase section on-light" aria-label={t('Resumen del caso', 'Case summary')}>
        {/* Ficha a la izquierda, imagen a la derecha */}
        <div className="container cdetail__grid">
          <dl className="cdetail__ficha" data-reveal="stagger">
            {facts.map(([k, v]) => (
              <div key={k}>
                <dt className="t-label muted">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          <div className="cdetail__body">
            <figure className={`pcase__cover${thumb ? '' : ' is-logo'}`} data-reveal="up">
              {thumb ? (
                <img src={thumb} alt={t(`Proyecto de ${p.client}`, `${p.client} project`)} />
              ) : (
                <span className="case__logo pcase__logo">{logo ? <img src={logo} alt={p.client} /> : <span>{p.client}</span>}</span>
              )}
            </figure>
          </div>
        </div>
      </section>

      {s && (
        <>
          {/* El reto y el impacto */}
          <section className="pcase-story section on-light" aria-label={t('El reto', 'The challenge')}>
            <div className="container pcase-story__grid">
              <article className="pcase-story__row" data-reveal="up">
                <h2 className="pcase-story__title">{t('El reto', 'The challenge')}</h2>
                <p className="pcase-story__lead">{s.problem}</p>
              </article>
              <article className="pcase-story__row" data-reveal="up">
                <h2 className="pcase-story__title">{t('El impacto', 'The impact')}</h2>
                <p className="pcase-story__text">{s.impact}</p>
              </article>
            </div>
          </section>

          <Shot src={shots[1]} />

          {/* La solución */}
          <section className="pcase-solution section on-surface" aria-labelledby="pcase-solution">
            <div className="container pcase-story__grid">
              <article className="pcase-story__row" data-reveal="up">
                <h2 className="pcase-story__title" id="pcase-solution">
                  {t('La solución', 'The solution')}
                </h2>
                <p className="pcase-story__lead">{s.solution}</p>
              </article>
              <ol className="pcase-features" data-reveal="stagger">
                {s.features.map((f, i) => (
                  <li key={f} className="pcase-feature">
                    <span className="pcase-feature__num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="pcase-feature__name">{f}</span>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <Shot src={shots[2]} />

          {/* El proceso */}
          <section className="pcase-process section on-dark" aria-labelledby="pcase-process">
            <div className="container">
              <h2 className="pcase-story__title" id="pcase-process" data-reveal="up">
                {t('El proceso', 'The process')}
              </h2>
              <ol className="pcase-steps" data-reveal="stagger">
                {steps.map((st, i) => (
                  <li key={st.title} className="pcase-step">
                    <span className="pcase-step__num">{String(i + 1).padStart(2, '0')}</span>
                    <h3 className="pcase-step__title">{st.title}</h3>
                    <p className="pcase-step__text">{st.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <Shot src={shots[3]} />

          {/* El resultado */}
          <section className="pcase-result section on-light" aria-labelledby="pcase-result">
            <div className="container pcase-story__grid">
              <article className="pcase-story__row" data-reveal="up">
                <h2 className="pcase-story__title" id="pcase-result">
                  {t('El resultado', 'The result')}
                </h2>
                <p className="pcase-story__lead">{s.result}</p>
              </article>
              <ul className="pcase-outcomes" data-reveal="stagger">
                {s.outcomes.map((o) => (
                  <li key={o} className="pcase-outcome">
                    <Check strokeWidth={2} aria-hidden="true" />
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </>
      )}

      {/* Invitación a empresas con un problema parecido */}
      <section className="pcase-invite section on-dark" aria-labelledby="pcase-invite">
        <div className="container pcase-invite__inner" data-reveal="up">
          <h2 className="pcase-invite__title" id="pcase-invite">
            {t('¿Tu empresa tiene un reto parecido?', 'Does your company face a similar challenge?')}
          </h2>
          <p className="pcase-invite__text">
            {t(
              `Construimos para ${p.client} una solución a la medida de su operación. En 30 minutos revisamos tu caso y te decimos si podemos ayudarte y cómo.`,
              `We built ${p.client} a solution tailored to its operation. In 30 minutes we review your case and tell you whether we can help and how.`,
            )}
          </p>
          <Button href={DIAGNOSTICO_HREF}>{t('Diagnóstico Gratuito', 'Free Diagnostic')}</Button>
        </div>
      </section>

      {others.length > 0 && (
        <RelatedLinks
          title={t('Otros casos de la industria', 'Other cases in this industry')}
          items={others.map((o) => ({ label: o.client, href: `/dev/casos/${o.slug}`, text: o.work }))}
          surface="on-light"
        />
      )}
    </>
  );
}

/* Caso individual: primero los proyectos de clientes; si no, los casos documentados */
export function CasePage({ slug }: { slug: string }) {
  const all = useMemo(buildProjects, []);
  const p = all.find((x) => x.slug === slug);
  if (p) return <ProjectPage p={p} all={all} />;
  return <DocumentedCase slug={slug} />;
}

function DocumentedCase({ slug }: { slug: string }) {
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
