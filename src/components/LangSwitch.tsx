import { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { lang, setLang, t, type Lang } from '../lib/i18n';

/* Selector de idioma del encabezado: cambia todo el sitio entre español e inglés. */
const LANGS: { code: Lang; label: string; name: string }[] = [
  { code: 'es', label: 'ES', name: 'Español' },
  { code: 'en', label: 'EN', name: 'English' },
];

export function LangSwitch({ className = '' }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = LANGS.find((l) => l.code === lang) ?? LANGS[0];

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
        aria-label={t(`Idioma: ${current.name}`, `Language: ${current.name}`)}
        onClick={() => setOpen((v) => !v)}
      >
        {current.label}
        <ChevronDown strokeWidth={1.75} aria-hidden="true" />
      </button>
      {open && (
        <ul className="lang__menu">
          {LANGS.map((l) => {
            const active = l.code === lang;
            return (
              <li key={l.code}>
                <button
                  type="button"
                  lang={l.code}
                  className={`lang__opt${active ? ' is-active' : ''}`}
                  aria-current={active || undefined}
                  onClick={() => {
                    setOpen(false);
                    setLang(l.code);
                  }}
                >
                  <span>{l.name}</span>
                  {active && <Check strokeWidth={2} aria-hidden="true" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
