import { industryPages, type IndustryPage as I } from '../data/pages';
import { PageHero, NumberedList, Callout, FeaturedCase, RelatedLinks, BlockHead } from '../components/page/blocks';
import { CTASection } from '../components/CTASection';
import { useMeta } from '../lib/router';

/* Estructura común del brief: hero, problemas típicos del sector, soluciones
   que aplican, un caso del sector, logos del sector y cierre. */
export function IndustryPage({ page }: { page: I }) {
  useMeta(page.seoTitle, page.seoDesc);
  const words = page.title.split(' ');
  const tail = words.slice(-3).join(' ');
  const head = words.slice(0, -3).join(' ');

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Industrias' }, { label: page.name }]}
        label={`Industrias · ${page.name}`}
        title={[head, { t: tail, cls: 'hl' }]}
        subtitle={page.subtitle}
        visual={page.visual}
        secondary={{ label: 'Ver casos', href: '/dev/casos' }}
      />

      <section className="iproblems section on-light" aria-labelledby="iproblems-title">
        <div className="container">
          <BlockHead index="01" label="Problemas que resolvemos" title={['Lo que', { t: 'frena', cls: 'mark' }, 'al sector.']} id="iproblems-title" />
          <ol className="iproblems__grid" data-reveal="stagger">
            {page.problems.map((p, i) => (
              <li key={p} className="iproblem">
                <span className="iproblem__num">{String(i + 1).padStart(2, '0')}</span>
                <p>{p}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <NumberedList
        index="02"
        label={page.solutionsTitle}
        title={page.slug === 'corporativo' ? ['Cómo trabajamos con', { t: 'empresas grandes.', cls: 'mark' }] : ['Soluciones para', { t: 'el sector.', cls: 'mark' }]}
        items={page.solutions}
        surface="on-surface"
        id="isolutions-title"
      />

      {page.note && <Callout label={page.note.title} text={page.note.text} tone="ink" />}

      <FeaturedCase index="03" visual={page.visual} slug={page.caseSlug} />

      {page.logos && (
        <section className="ilogos section on-light" aria-labelledby="ilogos-title">
          <div className="container">
            <BlockHead index="04" label="Clientes" title={['Clientes', 'corporativos.']} id="ilogos-title" />
            <ul className="ilogos__grid" data-reveal="stagger">
              {page.logos.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <RelatedLinks
        title="Otras industrias"
        items={industryPages
          .filter((s) => s.slug !== page.slug)
          .map((s) => ({ label: s.name, href: `/dev/industrias/${s.slug}` }))}
      />
      <CTASection />
    </>
  );
}
