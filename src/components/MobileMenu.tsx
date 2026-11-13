import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { services, industries, navLinks, DIAGNOSTICO_HREF, contact } from '../data/content';
import { Button } from './ui';
import { getLenis, scrollToTarget } from '../lib/motion';

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [sub, setSub] = useState<'sol' | 'ind' | null>(null);

  useEffect(() => {
    if (open) {
      getLenis()?.stop();
      document.body.style.overflow = 'hidden';
    } else {
      getLenis()?.start();
      document.body.style.overflow = '';
      setSub(null);
    }
  }, [open]);

  const go = (href: string) => (e: React.MouseEvent) => {
    onClose();
    if (href.startsWith('#')) {
      e.preventDefault();
      setTimeout(() => scrollToTarget(href), 350);
    }
  };

  const tab = open ? 0 : -1;

  return (
    <div
      id="mobile-menu"
      className={`mmenu${open ? ' is-open' : ''}`}
      aria-hidden={!open}
      role="dialog"
      aria-modal="true"
      aria-label="Menú"
    >
      <nav className="mmenu__nav container" aria-label="Principal móvil">
        <ul className="mmenu__list">
          <li>
            <button
              className="mmenu__link"
              aria-expanded={sub === 'sol'}
              onClick={() => setSub(sub === 'sol' ? null : 'sol')}
              tabIndex={tab}
            >
              Soluciones <Plus aria-hidden="true" />
            </button>
            <div className={`mmenu__sub${sub === 'sol' ? ' is-open' : ''}`}>
              <ul>
                {services.map((s, i) => (
                  <li key={s.key}>
                    <a href={s.href} onClick={go(s.href)} tabIndex={sub === 'sol' ? tab : -1}>
                      <span>{String(i + 1).padStart(2, '0')}</span>
                      {s.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </li>
          <li>
            <button
              className="mmenu__link"
              aria-expanded={sub === 'ind'}
              onClick={() => setSub(sub === 'ind' ? null : 'ind')}
              tabIndex={tab}
            >
              Industrias <Plus aria-hidden="true" />
            </button>
            <div className={`mmenu__sub${sub === 'ind' ? ' is-open' : ''}`}>
              <ul>
                {industries.map((s, i) => (
                  <li key={s.name}>
                    <a href={s.href} onClick={go(s.href)} tabIndex={sub === 'ind' ? tab : -1}>
                      <span>{String(i + 1).padStart(2, '0')}</span>
                      {s.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </li>
          {navLinks.map((l) => (
            <li key={l.label}>
              <a className="mmenu__link" href={l.href} onClick={go(l.href)} tabIndex={tab}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mmenu__foot">
          <Button href={DIAGNOSTICO_HREF} tabIndex={tab}>
            Agenda un diagnóstico sin costo
          </Button>
          <p className="muted t-small">
            <a href={contact.whatsappHref} tabIndex={tab}>
              WhatsApp {contact.whatsapp}
            </a>
            <br />
            <a href={`mailto:${contact.email}`} tabIndex={tab}>
              {contact.email}
            </a>
          </p>
        </div>
      </nav>
    </div>
  );
}
