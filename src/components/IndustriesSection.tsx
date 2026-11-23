import { ArrowUpRight } from 'lucide-react';
import { industryPages } from '../data/pages';
import { DIAGNOSTICO_HREF } from '../data/content';
import { RevealText } from './ui';
import { t } from '../lib/i18n';

/* Inicio · «Donde más hemos construido» (industrias v3): cuatro tarjetas que enlazan a cada
   industria con su nombre general y su descripción, más un cierre para quien no se ve en la lista. */
export function IndustriesSection() {
  return (
    <section className="hindustries section on-surface" id="industrias" aria-labelledby="hindustries-title">
      <div className="container">
        <div className="hindustries__head">
          <RevealText
            as="h2"
            id="hindustries-title"
            className="t-h2"
            parts={[t('Donde más hemos', 'Where we’ve built'), { t: t('construido.', 'the most.'), cls: 'mark' }]}
          />
          <p className="hindustries__intro t-lead" data-reveal="up">
            {t(
              'No empezamos de cero contigo. Estos son los sectores donde ya resolvimos el problema varias veces.',
              'We don’t start from scratch with you. These are the industries where we’ve already solved the problem several times.',
            )}
          </p>
        </div>

        <ul className="hindustries__grid" data-reveal="stagger">
          {industryPages.map((p) => (
            <li key={p.slug}>
              <a className="hindustry" href={`/dev/industrias/${p.slug}`} data-cursor-label={t('VER', 'VIEW')}>
                <h3 className="hindustry__name">{p.name}.</h3>
                <p className="hindustry__text">{p.card}</p>
                <span className="hindustry__arrow" aria-hidden="true">
                  <ArrowUpRight strokeWidth={1.5} />
                </span>
              </a>
            </li>
          ))}
        </ul>

        <p className="hindustries__outro" data-reveal="up">
          {t(
            '¿No estás en esta lista? La mayoría de nuestros proyectos nace del mismo problema: pedidos, seguimiento y cobros que viven en hojas de cálculo. ',
            'Not on this list? Most of our projects start from the same problem: orders, tracking and collections living in spreadsheets. ',
          )}
          <a href={DIAGNOSTICO_HREF} className="link-line">
            {t('Escríbenos', 'Write to us')}
          </a>
          .
        </p>
      </div>
    </section>
  );
}
