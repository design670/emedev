import { useEffect, useRef, useState } from 'react';
import { gsap, isFinePointer, prefersReduced } from '../lib/motion';

/* Cursor circular con seguimiento suavizado.
   - [data-cursor="link"]        → anillo ampliado
   - [data-cursor-label="VER"]   → disco lima con etiqueta
   Solo se activa con puntero fino; en táctil queda el cursor nativo. */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!enabled || !isFinePointer()) return;
    const el = ref.current!;
    const root = document.documentElement;
    root.classList.add('has-cursor');
    const dur = prefersReduced() ? 0.01 : 0.38;
    const xTo = gsap.quickTo(el, 'x', { duration: dur, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: dur, ease: 'power3.out' });
    let visible = false;

    // Color según el fondo real bajo el puntero: negro sobre claro, blanco sobre negro
    let px = 0,
      py = 0,
      raf = 0;
    const bgIsLight = (node: Element | null) => {
      while (node && node !== document.documentElement) {
        const bg = getComputedStyle(node).backgroundColor;
        const m = bg.match(/[\d.]+/g);
        if (m && (m.length < 4 || parseFloat(m[3]) > 0.5)) {
          const [r, g, b] = m.map(Number);
          return 0.2126 * r + 0.7152 * g + 0.0722 * b > 140;
        }
        node = node.parentElement;
      }
      return true; // body es blanco
    };
    const sample = () => {
      raf = 0;
      el.classList.toggle('is-on-light', bgIsLight(document.elementFromPoint(px, py)));
    };
    const scheduleSample = () => {
      if (!raf) raf = requestAnimationFrame(sample);
    };

    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      if (!visible) {
        visible = true;
        gsap.set(el, { x: e.clientX, y: e.clientY });
        el.classList.add('is-visible');
      }
      xTo(e.clientX);
      yTo(e.clientY);
      px = e.clientX;
      py = e.clientY;
      scheduleSample();
    };
    // al hacer scroll el fondo cambia aunque el mouse no se mueva
    window.addEventListener('scroll', scheduleSample, { passive: true });

    const over = (e: PointerEvent) => {
      const t = (e.target as HTMLElement).closest<HTMLElement>(
        '[data-cursor-label], [data-cursor], a, button, [role="button"], input, textarea, select, label',
      );
      el.classList.remove('is-link', 'is-label', 'is-text', 'is-nav');
      // En el encabezado y su menú: punto pequeño y sólido (el anillo tapaba el texto)
      if ((e.target as HTMLElement).closest('.header')) {
        el.classList.add('is-nav');
        return;
      }
      if (!t) return;
      const label = t.dataset.cursorLabel;
      if (label) {
        if (labelRef.current) labelRef.current.textContent = label;
        el.classList.add('is-label');
      } else if (t.matches('input, textarea')) {
        el.classList.add('is-text');
      } else {
        el.classList.add('is-link');
      }
    };

    const leaveWin = () => {
      visible = false;
      el.classList.remove('is-visible');
    };
    const down = () => el.classList.add('is-down');
    const up = () => el.classList.remove('is-down');

    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerover', over);
    document.documentElement.addEventListener('pointerleave', leaveWin);
    window.addEventListener('pointerdown', down);
    window.addEventListener('pointerup', up);
    return () => {
      root.classList.remove('has-cursor');
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', scheduleSample);
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerover', over);
      document.documentElement.removeEventListener('pointerleave', leaveWin);
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <div className="cursor" ref={ref} aria-hidden="true">
      <span className="cursor__disc" />
      <span className="cursor__label" ref={labelRef} />
    </div>
  );
}
