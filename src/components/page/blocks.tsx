import { useEffect, useRef, type ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { DIAGNOSTICO_HREF, cases, type ServiceKey } from '../../data/content';
import { Button, RevealText, WithPlaceholders, type Part } from '../ui';
import { ServiceVisual } from '../ServiceVisual';
import { CaseStudyCard } from '../CaseStudies';
import { gsap, onReady, prefersReduced } from '../../lib/motion';
import { t } from '../../lib/i18n';

/* ------------------------------------------------------------------ */
/* Breadcrumb                                                          */
/* ------------------------------------------------------------------ */
export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="crumbs" aria-label={t('Ruta de navegación', 'Breadcrumb')} data-intro="fade">
      <ol>
        <li>
          <a href="/dev">EME Dev</a>
        </li>
        {items.map((it, i) => (
          <li key={i}>
            {it.href ? <a href={it.href}>{it.label}</a> : <span aria-current="page">{it.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/* PageHero — misma coreografía de entrada que el Hero de la Home       */
/* ------------------------------------------------------------------ */
export function PageHero({
  crumbs,
  title,
  subtitle,
  visual,
  aside,
  cta = t('Diagnóstico gratis', 'Free diagnostic'),
  ctaHref = DIAGNOSTICO_HREF,
  secondary,
  compact = false,
}: {
  crumbs: { label: string; href?: string }[];
  label?: string;
  title: Part[];
  subtitle?: string;
  visual?: ServiceKey;
  aside?: ReactNode;
  cta?: string | null;
  ctaHref?: string;
  secondary?: { label: string; href: string };
  compact?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current!;
    const q = gsap.utils.selector(el);
    gsap.set(q('[data-reveal]'), { opacity: 1 });
    if (prefersReduced()) return;
    const ctx = gsap.context(() => {
      gsap.set(q('.phero__title .rt-word'), { yPercent: 118 });
      gsap.set(q('[data-intro]'), { opacity: 0 });
      gsap.set(q('.phero__visual'), { opacity: 0 });
    }, el);
    const off = onReady(() => ctx.add(() => {
      const tl = gsap.timeline({ delay: 0.25, defaults: { ease: 'expo.out' } });
      tl.fromTo(q('.phero__title .rt-word'), { yPercent: 118, rotate: 4 }, { yPercent: 0, rotate: 0, duration: 1.4, stagger: 0.045 })
        .fromTo(q('[data-intro="fade"]'), { opacity: 0 }, { opacity: 1, duration: 1 }, 0.1)
        .fromTo(q('[data-intro="up"]'), { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, stagger: 0.08 }, 0.45)
        .fromTo(
          q('.phero__visual'),
          { opacity: 0, clipPath: 'inset(20% 10% 20% 10% round 28px)' },
          { opacity: 1, clipPath: 'inset(0% 0% 0% 0% round 28px)', duration: 1.6, ease: 'expo.inOut' },
          0.2,
        );
      gsap.to(q('.phero__visual'), {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true },
      });
    }));
    return () => {
      off();
      ctx.revert();
    };
  }, []);

  return (
    <section
      className={`phero on-dark${visual || aside ? ' has-visual' : ''}${compact ? ' is-compact' : ''}`}
      ref={ref}
      data-intro-scope
      aria-labelledby="page-title"
    >
      <div className="container phero__grid">
        <div className="phero__copy">
          <Breadcrumb items={crumbs} />
          <RevealText as="h1" id="page-title" className="phero__title" parts={title} reveal="intro" />
          {subtitle && (
            <p className="phero__sub t-lead" data-intro="up">
              <WithPlaceholders text={subtitle} />
            </p>
          )}
          {(cta || secondary) && (
            <div className="phero__ctas" data-intro="up">
              {cta && <Button href={ctaHref}>{cta}</Button>}
              {secondary && (
                <Button href={secondary.href} variant="ghost" icon={false}>
                  {secondary.label}
                </Button>
              )}
            </div>
          )}
        </div>
        {visual && (
          <div className="phero__visual" aria-hidden="true">
            <ServiceVisual k={visual} />
          </div>
        )}
        {aside && !visual && <div className="phero__aside" data-intro="up">{aside}</div>}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* BlockHead — título de bloque (index/label se conservan como datos)  */
/* ------------------------------------------------------------------ */
export function BlockHead({
  title,
  id,
  children,
}: {
  index?: string;
  label?: string;
  title: Part[];
  id: string;
  children?: ReactNode;
}) {
  return (
    <header className="bhead">
      <RevealText as="h2" id={id} className="t-h2 bhead__title" parts={title} />
      {children}
    </header>
  );
}

/* Problema: frase grande en contraste */
export function ProblemStatement({ index, text, label = t('El problema', 'The problem') }: { index: string; text: string; label?: string }) {
  return (
    <section className="pstate section on-light" aria-labelledby={`pstate-${index}`}>
      <div className="container pstate__grid">
        <h2 className="sr-only" id={`pstate-${index}`}>
          {label}
        </h2>
        <RevealText as="p" className="pstate__text" parts={[text]} />
      </div>
    </section>
  );
}

/* Lista numerada en dos columnas ("Qué incluye", "Soluciones para el sector") */
export function NumberedList({
  index,
  label,
  title,
  items,
  surface = 'on-light',
  id,
}: {
  index: string;
  label: string;
  title: Part[];
  items: string[];
  surface?: string;
  id: string;
}) {
  return (
    <section className={`nlist section ${surface}`} aria-labelledby={id}>
      <div className="container nlist__grid">
        <BlockHead index={index} label={label} title={title} id={id} />
        <ol className="nlist__items" data-reveal="stagger">
          {items.map((it, i) => (
            <li key={i}>
              <p>
                <WithPlaceholders text={it} />
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* Casos de uso: etiqueta + descripción, en filas grandes */
export function UseCases({ index, items, id }: { index: string; items: string[]; id: string }) {
  return (
    <section className="ucases section on-dark" aria-labelledby={id}>
      <div className="container">
        <BlockHead index={index} label={t('Casos de uso', 'Use cases')} title={[t('Dónde', 'Where'), { t: t('se usa.', 'it’s used.'), cls: 'hl' }]} id={id} />
        <ul className="ucases__list" data-reveal="stagger">
          {items.map((it, i) => {
            const [head, ...rest] = it.split(':');
            const raw = rest.join(':').trim();
            const body = raw ? raw[0].toUpperCase() + raw.slice(1) : '';
            return (
              <li key={i} className="ucase">
                <span className="ucase__num">{String(i + 1).padStart(2, '0')}</span>
                <span className="ucase__name">{body ? head : it.replace(/\.$/, '')}</span>
                {body && <span className="ucase__text">{body}</span>}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* Nota destacada (seguridad, cuándo conviene, datos sensibles) */
export function Callout({ label, text, tone = 'lime' }: { label: string; text: string; tone?: 'lime' | 'ink' }) {
  return (
    <section className="callout-wrap on-light">
      <div className="container">
        <div className={`callout callout--${tone}`} data-reveal="up">
          <p className="t-label">{label}</p>
          <p className="callout__text">
            <WithPlaceholders text={text} />
          </p>
        </div>
      </div>
    </section>
  );
}

/* Caso destacado: por slug (industrias) o por solución (páginas de solución) */
export function FeaturedCase({
  index,
  visual,
  slug,
  solutionName,
}: {
  index: string;
  visual: ServiceKey;
  slug?: string;
  solutionName?: string;
}) {
  const c =
    cases.find((x) => x.slug === slug) ??
    cases.find((x) => x.solutionName === solutionName) ??
    cases[0];
  return (
    <section className="fcase section on-surface" aria-labelledby={`fcase-${index}`}>
      <div className="container">
        <div className="cases__head">
          <BlockHead index={index} label={t('Caso', 'Case study')} title={[t('Un caso', 'A case study'), { t: t('con cifras.', 'with numbers.'), cls: 'mark' }]} id={`fcase-${index}`} />
          <div className="cases__cta" data-reveal="up">
            <Button href="/dev/casos" variant="ink">
              {t('Ver todos los casos', 'View all case studies')}
            </Button>
          </div>
        </div>
        <div className="fcase__card">
          <CaseStudyCard c={c} visual={visual} size="lg" />
        </div>
      </div>
    </section>
  );
}

/* Enlaces a otras páginas del mismo grupo */
export function RelatedLinks({
  title,
  items,
  surface = 'on-dark',
}: {
  title: string;
  items: { label: string; href: string; text?: string }[];
  surface?: 'on-dark' | 'on-light';
}) {
  return (
    <section className={`related ${surface}`}>
      <div className="container">
        <h2 className="related__title">{title}</h2>
        <ul className="related__list">
          {items.map((it) => (
            <li key={it.href}>
              <a href={it.href} className="related__item">
                <span className="related__body">
                  <span className="related__name">{it.label}</span>
                  {it.text && <span className="related__text">{it.text}</span>}
                </span>
                <ArrowUpRight strokeWidth={1.5} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
