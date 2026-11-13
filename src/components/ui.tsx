import { useEffect, useRef, type ElementType, type ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { gsap, isFinePointer, prefersReduced, scrollToTarget } from '../lib/motion';

/* ------------------------------------------------------------------ */
/* RevealText — divide el texto en palabras para revelarlo por máscara */
/* ------------------------------------------------------------------ */
export type Part = string | { t: string; cls: string };

export function RevealText({
  as: Tag = 'h2',
  parts,
  className = '',
  reveal = 'text',
  id,
  delay,
}: {
  as?: ElementType;
  parts: Part[];
  className?: string;
  reveal?: string | false;
  id?: string;
  delay?: number;
}) {
  const nodes: ReactNode[] = [];
  let k = 0;
  parts.forEach((p) => {
    const text = typeof p === 'string' ? p : p.t;
    const cls = typeof p === 'string' ? '' : p.cls;
    if (text === '\n') {
      nodes.push(<br key={k++} />);
      return;
    }
    text
      .split(' ')
      .filter(Boolean)
      .forEach((w) => {
        nodes.push(
          <span className="rt-line" key={k++}>
            <span className={`rt-word ${cls}`}>{w}</span>
          </span>,
          ' ',
        );
      });
  });
  return (
    <Tag
      id={id}
      className={className}
      data-reveal={reveal || undefined}
      data-delay={delay}
    >
      {nodes}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/* Magnetic — respuesta magnética sutil al cursor                      */
/* ------------------------------------------------------------------ */
export function useMagnetic<T extends HTMLElement>(strength = 0.28) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !isFinePointer() || prefersReduced()) return;
    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const leave = () => {
      xTo(0);
      yTo(0);
    };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
    };
  }, [strength]);
  return ref;
}

/* ------------------------------------------------------------------ */
/* Button                                                              */
/* ------------------------------------------------------------------ */
export function Button({
  href,
  children,
  variant = 'lime',
  size,
  icon = true,
  magnetic = true,
  className = '',
  ...rest
}: {
  href: string;
  children: string;
  variant?: 'lime' | 'ghost' | 'ink';
  size?: 'sm';
  icon?: boolean;
  magnetic?: boolean;
  className?: string;
  [k: string]: unknown;
}) {
  const ref = useMagnetic<HTMLAnchorElement>(magnetic ? 0.22 : 0);
  const cls = [
    'btn',
    variant === 'ghost' && 'btn--ghost',
    variant === 'ink' && 'btn--ink',
    size === 'sm' && 'btn--sm',
    className,
  ]
    .filter(Boolean)
    .join(' ');
  const onClick = (e: React.MouseEvent) => {
    // Ancla presente en esta página → scroll suave; si no, el router la resuelve
    if (href.startsWith('#') && document.querySelector(href)) {
      e.preventDefault();
      scrollToTarget(href);
    }
  };
  return (
    <a ref={ref} href={href} className={cls} onClick={onClick} data-cursor="link" {...rest}>
      <span className="btn__label">
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </span>
      {icon && (
        <span className="btn__icon" aria-hidden="true">
          <ArrowUpRight strokeWidth={1.75} />
        </span>
      )}
    </a>
  );
}

/* ------------------------------------------------------------------ */
/* Logo — wordmark provisional hasta recibir el archivo oficial         */
/* ------------------------------------------------------------------ */
export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`logo ${className}`}>
      <span className="logo__eme">EME</span>
      <span className="logo__dev">Dev</span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* SectionHeading                                                      */
/* ------------------------------------------------------------------ */
export function SectionHeading({
  parts,
  id,
  className = '',
  children,
}: {
  index?: string;
  label?: string;
  parts: Part[];
  id: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <header className={`section-heading ${className}`}>
      <RevealText as="h2" id={id} className="t-h2 section-heading__title" parts={parts} />
      {children}
    </header>
  );
}

/* Texto con placeholders [ ... ] resaltados de forma discreta */
export function WithPlaceholders({ text }: { text: string }) {
  const chunks = text.split(/(\[[^\]]+\])/g);
  return (
    <>
      {chunks.map((c, i) =>
        c.startsWith('[') ? (
          <em className="ph" key={i}>
            {c}
          </em>
        ) : (
          c
        ),
      )}
    </>
  );
}
