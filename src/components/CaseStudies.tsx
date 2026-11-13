import { ArrowUpRight } from 'lucide-react';
import { cases } from '../data/content';
import { Button, SectionHeading, WithPlaceholders } from './ui';
import { ImagePlaceholder } from './ServiceVisual';
import type { ServiceKey } from '../data/content';

type Case = (typeof cases)[number];

export function CaseStudyCard({ c, size }: { c: Case; visual?: ServiceKey; size: 'lg' | 'sm' }) {
  return (
    <article className={`case case--${size}`} data-reveal="up">
      <a href={c.href} className="case__link" data-cursor-label="VER CASO" aria-label={`Ver el caso completo de ${c.client}`}>
        <div className="case__media" data-reveal="mask">
          <div className="case__media-inner" data-mask-inner>
            <ImagePlaceholder n={9 + c.id} />
          </div>
        </div>
        <div className="case__body">
          <p className="case__meta">
            <WithPlaceholders text={`${c.client} · ${c.sector}`} />
          </p>
          <div className="case__result">
            <span className="case__result-num">
              <WithPlaceholders text={c.result} />
            </span>
            <span className="case__result-note muted t-small">{c.resultNote}</span>
          </div>
          <dl className="case__dl">
            <div>
              <dt>El problema</dt>
              <dd>
                <WithPlaceholders text={c.problem} />
              </dd>
            </div>
            <div>
              <dt>Lo que construimos</dt>
              <dd>
                <WithPlaceholders text={c.solution} />
              </dd>
            </div>
          </dl>
          <span className="link-line case__more">
            Ver el caso completo <ArrowUpRight strokeWidth={1.5} aria-hidden="true" />
          </span>
        </div>
      </a>
    </article>
  );
}

export function CaseStudies() {
  const visuals: ServiceKey[] = ['erp', 'agentes', 'apps'];
  return (
    <section className="cases section on-light" id="casos" aria-labelledby="cases-title">
      <div className="container">
        <div className="cases__head">
          <SectionHeading
            index="05"
            label="Casos destacados"
            id="cases-title"
            parts={['Resultados que puedes', { t: 'verificar.', cls: 'mark' }]}
          />
          <div className="cases__cta" data-reveal="up">
            <Button href="/dev/casos" variant="ink">
              Ver todos los casos
            </Button>
          </div>
        </div>
        <div className="cases__grid">
          <CaseStudyCard c={cases[0]} visual={visuals[0]} size="lg" />
          <div className="cases__col">
            <CaseStudyCard c={cases[1]} visual={visuals[1]} size="sm" />
            <CaseStudyCard c={cases[2]} visual={visuals[2]} size="sm" />
          </div>
        </div>
      </div>
    </section>
  );
}
