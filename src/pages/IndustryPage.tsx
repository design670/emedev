import { clientLogos, clients } from '../data/content';
import { industryPages, type IndustryPage as I } from '../data/pages';
import { PageHero, NumberedList, Callout, FeaturedCase, RelatedLinks, BlockHead } from '../components/page/blocks';
import { CTASection } from '../components/CTASection';
import { useMeta } from '../lib/router';
import { t } from '../lib/i18n';

/* Logo de un cliente por nombre, si existe en el proyecto (si no, se muestra el nombre) */
const logoFor = (name: string) => clients.find((c) => c.name === name)?.logo ?? clientLogos[name];

/* Plantilla de industria (v3): hero, problemas, soluciones, bloques por sector (cada uno con
   su propio h3), datos sensibles (si aplica), caso (solo si hay uno real), respaldo y cierre.
   El <title> y la descripción usan el nombre específico del sector; el H1, el nombre general. */
export function IndustryPage({ page }: { page: I }) {
  useMeta(page.seoTitle, page.seoDesc);
  const words = page.title.split(' ');
  const tail = words.slice(-3).join(' ');
  const head = words.slice(0, -3).join(' ');

  return (
    <>
      <PageHero
        crumbs={[{ label: t('Industrias', 'Industries') }, { label: page.name }]}
        label={`${t('Industrias', 'Industries')} · ${page.name}`}
        title={[head, { t: tail, cls: 'hl' }]}
        subtitle={page.subtitle}
        visual={page.visual}
        secondary={{ label: t('Ver casos', 'View case studies'), href: '/dev/casos' }}
      />

      <section className="iproblems section on-light" aria-labelledby="iproblems-title">
        <div className="container">
          <BlockHead index="01" label={t('Problemas que resolvemos', 'Problems we solve')} title={[t('Lo que', 'What'), { t: t('frena', 'holds back'), cls: 'mark' }, t('al sector.', 'the industry.')]} id="iproblems-title" />
          <ol className={`iproblems__grid iproblems__grid--n${page.problems.length}`} data-reveal="stagger">
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
        title={[t('Soluciones para', 'Solutions for'), { t: t('el sector.', 'the industry.'), cls: 'mark' }]}
        items={page.solutions}
        surface="on-surface"
        id="isolutions-title"
      />

      {/* Bloques por sector: cada tarjeta con su propio encabezado (h3) para búsquedas específicas */}
      <section className="isectors section on-light" aria-labelledby="isectors-title">
        <div className="container">
          <BlockHead index="03" label={t('Por sector', 'By sector')} title={[t('Según tu', 'Depending on'), { t: t('tipo de negocio.', 'your business.'), cls: 'mark' }]} id="isectors-title" />
          <ul className={`isectors__grid isectors__grid--n${page.sectors.length}`} data-reveal="stagger">
            {page.sectors.map((s) => (
              <li key={s.title} className="isector">
                <h3 className="isector__title">{s.title}</h3>
                <p className="isector__text">{s.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {page.note && <Callout label={page.note.title} text={page.note.text} tone="ink" />}

      {/* Sin caso real documentado, el bloque no se muestra */}
      {page.caseSlug && <FeaturedCase index="04" visual={page.visual} slug={page.caseSlug} />}

      {page.trust && (
        <section className="ilogos section on-light" aria-labelledby="ilogos-title">
          <div className="container">
            <BlockHead index="05" label={page.trust.title} title={[page.trust.title + '.']} id="ilogos-title" />
            <ul className="ilogos__grid" data-reveal="stagger">
              {page.trust.names.map((name) => {
                const logo = logoFor(name);
                return (
                  <li key={name}>
                    {logo ? <img className="ilogos__img" src={logo} alt={name} loading="lazy" /> : name}
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}

      <RelatedLinks
        title={t('Otras industrias', 'Other industries')}
        items={industryPages
          .filter((s) => s.slug !== page.slug)
          .map((s) => ({ label: s.name, text: s.line, href: `/dev/industrias/${s.slug}` }))}
      />
      <CTASection />
    </>
  );
}
