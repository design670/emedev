import { solutionPages, type SolutionPage as S } from '../data/pages';
import { faqs as generalFaqs } from '../data/content';
import {
  PageHero,
  ProblemStatement,
  NumberedList,
  UseCases,
  Callout,
  FeaturedCase,
  HiringModels,
  RelatedLinks,
  BlockHead,
} from '../components/page/blocks';
import { FAQAccordion } from '../components/FAQAccordion';
import { CTASection } from '../components/CTASection';
import { WithPlaceholders } from '../components/ui';
import { useMeta } from '../lib/router';

/* Estructura común del brief: hero, problema, qué incluye, casos de uso,
   un caso con cifras, cómo se contrata, preguntas frecuentes y cierre. */
export function SolutionPage({ page }: { page: S }) {
  useMeta(page.seoTitle, page.seoDesc);
  let n = 0;
  const idx = () => String(++n).padStart(2, '0');
  const lastWords = page.title.split(' ');
  const tail = lastWords.slice(-2).join(' ');
  const head = lastWords.slice(0, -2).join(' ');

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Soluciones', href: '/dev#soluciones' }, { label: page.name }]}
        label={page.name}
        title={[head, { t: tail, cls: 'hl' }]}
        subtitle={page.subtitle}
        visual={page.key}
        secondary={{ label: 'Ver casos', href: '/dev/casos' }}
      />

      {page.problem && <ProblemStatement index={idx()} text={page.problem} />}

      <NumberedList
        index={idx()}
        label="Qué incluye"
        title={['Qué', { t: 'incluye.', cls: 'mark' }]}
        items={page.includes}
        surface={page.problem ? 'on-surface' : 'on-light'}
        id="includes-title"
      />

      {page.security && <Callout label="Seguridad" text={page.security} />}
      {page.whenFits && <Callout label="Cuándo conviene y cuándo no" text={page.whenFits} tone="ink" />}

      {page.useCases && <UseCases index={idx()} items={page.useCases} id="usecases-title" />}

      {page.integrates && (
        <section className="integrates section on-dark" aria-labelledby="integrates-title">
          <div className="container">
            <BlockHead index={idx()} label="Qué integramos" title={['Lo que', { t: 'conectamos.', cls: 'hl' }]} id="integrates-title" />
            <ul className="integrates__grid" data-reveal="stagger">
              {page.integrates.map((it) => {
                const [h, ...r] = it.split(':');
                const raw = r.join(':').trim();
                const body = raw ? raw[0].toUpperCase() + raw.slice(1) : '';
                return (
                  <li key={it} className="integrate">
                    <span className="integrate__name">{body ? h : it}</span>
                    {body && (
                      <span className="integrate__text">
                        <WithPlaceholders text={body} />
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}

      {page.packages && (
        <section className="packages section on-light" aria-labelledby="packages-title">
          <div className="container">
            <BlockHead index={idx()} label="Paquetes" title={['Paquetes', { t: 'claros.', cls: 'mark' }]} id="packages-title" />
            <ol className="packages__grid" data-reveal="stagger">
              {page.packages.map((p, i) => (
                <li key={p.name} className={`pack pack--${i}`}>
                  <span className="pack__num">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="t-h3">{p.name}</h3>
                  <p>
                    <WithPlaceholders text={p.text} />
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      <FeaturedCase index={idx()} visual={page.key} solutionName={page.name} />
      <HiringModels index={idx()} />
      <FAQAccordion index={idx()} items={page.faqs ?? generalFaqs} title={['Preguntas', 'frecuentes.']} surface="on-surface" />
      <RelatedLinks
        title="Otras soluciones"
        items={solutionPages
          .filter((s) => s.slug !== page.slug)
          .map((s) => ({ label: s.name, href: `/dev/soluciones/${s.slug}` }))}
      />
      <CTASection />
    </>
  );
}
