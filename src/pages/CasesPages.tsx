import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { cases, services, industries, type ServiceKey } from '../data/content';
import { casesPage } from '../data/pages';
import { PageHero, BlockHead } from '../components/page/blocks';
import { CaseStudyCard } from '../components/CaseStudies';
import { ImagePlaceholder } from '../components/ServiceVisual';
import { CTASection } from '../components/CTASection';
import { Button, WithPlaceholders } from '../components/ui';
import { useMeta } from '../lib/router';

/* Listado filtrable. Los casos aún no tienen industria ni solución asignadas
   (se completan con los datos reales), así que un filtro específico muestra
   un estado vacío honesto en lugar de inventar clasificaciones. */
export function CasesPage() {
  useMeta(casesPage.seoTitle, casesPage.seoDesc);
  const [industry, setIndustry] = useState<string>('Todas');
  const [solution, setSolution] = useState<string>('Todas');
  const visuals: ServiceKey[] = ['erp', 'agentes', 'apps'];
  const filtered = industry === 'Todas' && solution === 'Todas' ? cases : [];

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
      <PageHero crumbs={[{ label: 'Casos' }]} label="Casos" title={['Proyectos con', { t: 'resultados medibles.', cls: 'hl' }]} subtitle={casesPage.subtitle} cta={null} compact />
      <section className="caselist section on-light" aria-label="Listado de casos">
        <div className="container">
          <div className="filters" data-reveal="up">
            <Chips label="Industria" options={industries.map((i) => i.name)} value={industry} onChange={setIndustry} />
            <Chips label="Solución" options={services.map((s) => s.name)} value={solution} onChange={setSolution} />
          </div>
          {filtered.length ? (
            <div className="caselist__grid">
              {filtered.map((c, i) => (
                <CaseStudyCard key={c.id} c={c} visual={visuals[i % 3]} size="sm" />
              ))}
            </div>
          ) : (
            <div className="caselist__empty" aria-live="polite">
              <p className="t-h3">Aún no hay casos publicados con este filtro.</p>
              <button className="link-line" onClick={() => { setIndustry('Todas'); setSolution('Todas'); }}>
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

/* Plantilla de caso individual */
export function CasePage({ slug }: { slug: string }) {
  const n = Number(slug.replace(/\D/g, '')) || 1;
  const c = cases[(n - 1) % cases.length];
  useMeta('Caso de éxito | EME Dev', 'Cómo un cliente de EME Dev logró resultados medibles con software e IA.');

  const ficha = [
    ['Industria', '[industria]'],
    ['Tamaño de la empresa', '[tamaño]'],
    ['Solución', '[solución]'],
    ['Duración del proyecto', '[duración]'],
    ['Tecnologías', '[tecnologías]'],
  ];

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Casos', href: '/dev/casos' }, { label: c.client }]}
        label="Caso"
        title={['Cómo', { t: '[cliente]', cls: 'ph' }, { t: '[logró resultado con cifra]', cls: 'ph' }]}
        cta="Quiero algo parecido"
        compact
      />

      <section className="cdetail section on-light" aria-label="Detalle del caso">
        <div className="container cdetail__grid">
          <dl className="cdetail__ficha" data-reveal="stagger">
            {ficha.map(([k, v]) => (
              <div key={k}>
                <dt className="t-label muted">{k}</dt>
                <dd>
                  <WithPlaceholders text={v} />
                </dd>
              </div>
            ))}
          </dl>
          <div className="cdetail__body">
            <article className="cdetail__block" data-reveal="up">
              <h2 className="t-h3">El punto de partida</h2>
              <p className="muted">
                <WithPlaceholders text="[Dos o tres frases sobre el problema, en palabras del cliente. Qué les costaba en tiempo, dinero o clientes.]" />
              </p>
            </article>
            <div className="cdetail__media" data-reveal="mask">
              <div data-mask-inner className="cdetail__media-inner">
                <ImagePlaceholder n={9 + c.id} />
              </div>
            </div>
            <article className="cdetail__block" data-reveal="up">
              <h2 className="t-h3">Lo que construimos</h2>
              <p className="muted">
                <WithPlaceholders text="[Qué se hizo y por qué se eligió ese camino.]" />
              </p>
            </article>
            <article className="cdetail__block" data-reveal="up">
              <h2 className="t-h3">Cómo fue el proceso</h2>
              <p className="muted">
                <WithPlaceholders text="[Tiempos, etapas y quiénes participaron de ambos lados.]" />
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="cresults section on-dark" aria-labelledby="cresults-title">
        <div className="container">
          <BlockHead index="01" label="Resultados" title={['Antes y', { t: 'después.', cls: 'hl' }]} id="cresults-title" />
          <ul className="cresults__grid" data-reveal="stagger">
            {[1, 2, 3].map((k) => (
              <li key={k} className="cresult">
                <span className="cresult__label t-label">[Indicador]</span>
                <div className="cresult__row">
                  <span>
                    <small className="muted">Antes</small>
                    <em className="ph">[cifra]</em>
                  </span>
                  <ArrowUpRight strokeWidth={1.25} aria-hidden="true" />
                  <span>
                    <small className="muted">Después</small>
                    <em className="ph hl">[cifra]</em>
                  </span>
                </div>
              </li>
            ))}
          </ul>
          <p className="t-small muted cresults__note">Si un dato es estimado, se indica.</p>
        </div>
      </section>

      <section className="ctesti section on-surface" aria-label="Testimonio">
        <div className="container">
          <figure className="tcard is-active ctesti__card" data-reveal="up">
            <blockquote className="tcard__quote">
              <p>
                “<WithPlaceholders text="[Testimonio que mencione un resultado concreto y cómo fue trabajar con el equipo]" />”
              </p>
            </blockquote>
            <figcaption className="tcard__who">
              <span className="tcard__photo">[Foto]</span>
              <span>
                <strong>
                  <em className="ph">[Nombre]</em>
                </strong>
                <span className="muted">
                  <em className="ph">[Cargo], [Empresa]</em>
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
