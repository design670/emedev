import { solutionPages, type SolutionPage as S } from '../data/pages';
import { faqs as generalFaqs } from '../data/content';
import {
  PageHero,
  ProblemStatement,
  NumberedList,
  UseCases,
  Callout,
  RelatedLinks,
  BlockHead,
} from '../components/page/blocks';
import { FAQAccordion } from '../components/FAQAccordion';
import { FeaturedProject } from './CasesPages';
import { CTASection } from '../components/CTASection';
import { WithPlaceholders } from '../components/ui';
import { useMeta } from '../lib/router';
import { t } from '../lib/i18n';
import { SERVICE_PHOTOS } from '../components/ServiceVisual';

/* Estructura común del brief: hero, problema, qué incluye, casos de uso,
   cómo se contrata, preguntas frecuentes y cierre. */
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
        crumbs={[{ label: t('Soluciones', 'Solutions'), href: '/dev#soluciones' }, { label: page.name }]}
        label={page.name}
        title={[head, { t: tail, cls: 'hl' }]}
        subtitle={page.subtitle}
        visual={page.key}
        visualSrc={SERVICE_PHOTOS[page.key]}
        secondary={{ label: t('Ver casos', 'View case studies'), href: '/dev/casos' }}
      />

      {page.problem && <ProblemStatement index={idx()} text={page.problem} />}

      <NumberedList
        index={idx()}
        label={t('Qué incluye', 'What’s included')}
        title={[t('Qué', 'What’s'), { t: t('incluye.', 'included.'), cls: 'mark' }]}
        items={page.includes}
        surface={page.problem ? 'on-surface' : 'on-light'}
        id="includes-title"
      />

      {page.security && <Callout label={t('Seguridad', 'Security')} text={page.security} />}
      {page.whenFits && <Callout label={t('Cuándo conviene y cuándo no', 'When it fits and when it doesn’t')} text={page.whenFits} tone="ink" />}

      {page.useCases && <UseCases index={idx()} items={page.useCases} id="usecases-title" />}

      {page.integrates && (
        <section className="integrates section on-dark" aria-labelledby="integrates-title">
          <div className="container">
            <BlockHead index={idx()} label={t('Qué integramos', 'What we integrate')} title={[t('Lo que', 'What we'), { t: t('conectamos.', 'connect.'), cls: 'hl' }]} id="integrates-title" />
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
            <BlockHead index={idx()} label={t('Paquetes', 'Packages')} title={[t('Paquetes', 'Clear'), { t: t('claros.', 'packages.'), cls: 'mark' }]} id="packages-title" />
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

      <FeaturedProject solution={page.key} index={idx()} />
      <FAQAccordion index={idx()} items={page.faqs ?? generalFaqs} title={[t('Preguntas', 'Frequently asked'), t('frecuentes.', 'questions.')]} surface="on-surface" />
      <RelatedLinks
        title={t('Otras soluciones', 'Other solutions')}
        items={solutionPages
          .filter((s) => s.slug !== page.slug)
          .map((s) => ({ label: s.name, href: `/dev/soluciones/${s.slug}` }))}
      />
      <CTASection />
    </>
  );
}
