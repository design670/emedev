import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { cases } from '../data/content';
import { Button, SectionHeading, WithPlaceholders } from './ui';
import { ImagePlaceholder } from './ServiceVisual';
import type { ServiceKey } from '../data/content';
import { t } from '../lib/i18n';

type Case = (typeof cases)[number];

export function CaseStudyCard({ c, size }: { c: Case; visual?: ServiceKey; size: 'lg' | 'sm' | 'slide' }) {
  return (
    <article className={`case case--${size}`} data-reveal="up">
      <a href={c.href} className="case__link" data-cursor-label={t('VER CASO', 'VIEW CASE')} aria-label={t(`Ver el caso completo de ${c.client}`, `View the full ${c.client} case study`)}>
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
              <dt>{t('El problema', 'The problem')}</dt>
              <dd>
                <WithPlaceholders text={c.problem} />
              </dd>
            </div>
            <div>
              <dt>{t('Lo que construimos', 'What we built')}</dt>
              <dd>
                <WithPlaceholders text={c.solution} />
              </dd>
            </div>
          </dl>
          <span className="link-line case__more">
            {t('Ver el caso completo', 'View full case study')} <ArrowUpRight strokeWidth={1.5} aria-hidden="true" />
          </span>
        </div>
      </a>
    </article>
  );
}

export function CaseStudies() {
  const track = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const update = () => {
    const el = track.current;
    if (!el) return;
    setEdge({ start: el.scrollLeft <= 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
  };

  useEffect(() => {
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const go = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const stops = [...el.querySelectorAll<HTMLElement>('.case')].map((c) => Math.min(c.offsetLeft - el.offsetLeft, max));
    const cur = el.scrollLeft;
    const target =
      dir > 0
        ? (stops.find((x) => x > cur + 4) ?? max)
        : ([...stops].reverse().find((x) => x < cur - 4) ?? 0);
    el.scrollTo({ left: target, behavior: 'smooth' });
  };

  return (
    <section className="cases section on-light" id="casos" aria-labelledby="cases-title">
      <div className="container">
        <div className="cases__head">
          <SectionHeading
            index="05"
            label={t('Casos destacados', 'Featured case studies')}
            id="cases-title"
            parts={[t('Resultados que puedes', 'Results you can'), { t: t('verificar.', 'verify.'), cls: 'mark' }]}
          />
          <div className="cases__cta" data-reveal="up">
            <div className="cases__nav">
              <button className="circle-btn" onClick={() => go(-1)} disabled={edge.start} aria-label={t('Caso anterior', 'Previous case')}>
                <ArrowLeft strokeWidth={1.5} />
              </button>
              <button className="circle-btn" onClick={() => go(1)} disabled={edge.end} aria-label={t('Caso siguiente', 'Next case')}>
                <ArrowRight strokeWidth={1.5} />
              </button>
            </div>
            <Button href="/dev/casos" variant="ink">
              {t('Ver todos los casos', 'View all case studies')}
            </Button>
          </div>
        </div>
        <div className="cases__track" ref={track} onScroll={update} aria-label={t('Casos destacados', 'Featured case studies')} tabIndex={0}>
          {cases.map((c) => (
            <CaseStudyCard key={c.id} c={c} size="slide" />
          ))}
        </div>
      </div>
    </section>
  );
}
