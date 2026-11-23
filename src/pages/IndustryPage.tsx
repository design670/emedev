import { clientLogos, clients } from '../data/content';
import { industryPages, industryProjects, type IndustryPage as I } from '../data/pages';
import { PageHero, NumberedList, FeaturedCase, RelatedLinks, BlockHead } from '../components/page/blocks';
import { CTASection } from '../components/CTASection';
import { useMeta } from '../lib/router';
import { t } from '../lib/i18n';

/* Logo de un cliente por nombre, si existe en el proyecto (si no, se muestra el nombre) */
const logoFor = (name: string) => clients.find((c) => c.name === name)?.logo ?? clientLogos[name];

/* Copias sin margen blanco interno (public/clientes/recorte) para que el logo llene el recuadro de la lista */
const TRIMMED = ['cargonet', 'universidad-de-la-costa', 'brilla'];
const listLogo = (name: string) => {
  const src = logoFor(name);
  const file = src?.split('/').pop()?.replace(/\.png$/, '');
  return src && file && TRIMMED.includes(file) ? '/clientes/recorte/' + file + '.png' : src;
};

/* Plantilla de industria (v3): hero, problemas, soluciones, bloques por sector (cada uno con
   su propio h3), datos sensibles (si aplica), caso (solo si hay uno real), respaldo y cierre.
   El <title> y la descripción usan el nombre específico del sector; el H1, el nombre general. */
export function IndustryPage({ page }: { page: I }) {
  useMeta(page.seoTitle, page.seoDesc);
  const projects = industryProjects[page.slug] ?? [];
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

      {/* Proyectos que ya hicimos en esta industria (documento v3) */}
      {projects.length > 0 && (
        <section className="iprojects section on-light" aria-labelledby="iprojects-title">
          <div className="container">
            <div className="iprojects__head">
              <BlockHead
                title={[t('Proyectos en', 'Projects in'), { t: t('esta industria.', 'this industry.'), cls: 'mark' }]}
                id="iprojects-title"
              />
              <p className="iprojects__count" data-reveal="up">
                <strong>{projects.length}</strong> {t('proyectos', 'projects')} ·{' '}
                <strong>{projects.filter((p) => p.software).length}</strong> {t('con software o app', 'with software or an app')}
              </p>
            </div>
            <ul className="iprojects__list" data-reveal="stagger">
              {projects.map((p) => {
                const logo = listLogo(p.client);
                return (
                  <li key={p.client} className={`iproject${p.software ? ' is-software' : ''}`}>
                    <span className="iproject__logo">
                      {logo ? <img src={logo} alt="" loading="lazy" /> : <span>{p.client.slice(0, 2)}</span>}
                    </span>
                    <span className="iproject__client">{p.client}</span>
                    <span className="iproject__what">{p.what}</span>
                    <span className="iproject__work">{p.work}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}

      <section className="iproblems section on-surface" aria-labelledby="iproblems-title">
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
        title={[t('Soluciones para', 'Solutions for'), { t: t('el sector.', 'the industry.'), cls: 'hl' }]}
        items={page.solutions}
        surface="on-dark"
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

      {/* Sin caso real documentado, el bloque no se muestra */}
      {page.caseSlug && <FeaturedCase index="04" visual={page.visual} slug={page.caseSlug} />}

      <RelatedLinks
        title={t('Otras industrias', 'Other industries')}
        surface="on-light"
        items={industryPages
          .filter((s) => s.slug !== page.slug)
          .map((s) => ({ label: s.name, text: s.line, href: `/dev/industrias/${s.slug}` }))}
      />
      <CTASection />
    </>
  );
}
