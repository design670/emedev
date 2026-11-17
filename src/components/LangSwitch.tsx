import { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';

/* Selector de idioma del encabezado. Por ahora el sitio está solo en español:
   English aparece como «Próximamente» hasta que exista la versión en inglés. */
const LANGS = [
  { code: 'ES', name: 'Español', ready: true },
  { code: 'EN', name: 'English', ready: false },
];

export function LangSwitch({ className = '' }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = LANGS[0];

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div className={`lang ${className}`} ref={ref}>
      <button
        type="button"
        className="lang__btn"
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={`Idioma: ${current.name}`}
        onClick={() => setOpen((v) => !v)}
      >
        {current.code}
        <ChevronDown strokeWidth={1.75} aria-hidden="true" />
      </button>
      {open && (
        <ul className="lang__menu">
          {LANGS.map((l) => (
            <li key={l.code}>
              {l.ready ? (
                <button type="button" className="lang__opt is-active" aria-current="true" onClick={() => setOpen(false)}>
                  <span>{l.name}</span>
                  <Check strokeWidth={2} aria-hidden="true" />
                </button>
              ) : (
                <span className="lang__opt is-soon" aria-disabled="true">
                  <span>{l.name}</span>
                  <small>Próximamente</small>
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
