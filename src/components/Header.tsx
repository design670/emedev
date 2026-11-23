import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { navLinks, DIAGNOSTICO_HREF } from '../data/content';
import { Button, Logo } from './ui';
import { NavigationMenu, type MenuKey } from './NavigationMenu';
import { MobileMenu } from './MobileMenu';
import { LangSwitch } from './LangSwitch';
import { getLenis, onReady, gsap, prefersReduced } from '../lib/motion';
import { usePath, navigate, HOME } from '../lib/router';
import { t } from '../lib/i18n';

export function Header() {
  const [menu, setMenu] = useState<MenuKey>(null);
  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const path = usePath();
  useEffect(() => {
    setMenu(null);
    setMobile(false);
  }, [path]);
  const ref = useRef<HTMLElement>(null);

  // Estado según scroll: sólido al bajar, se oculta al bajar y vuelve al subir
  useEffect(() => {
    const onScroll = (y: number) => {
      setScrolled(y > 40);
    };
    const lenis = getLenis();
    const handler = () => onScroll(window.scrollY);
    if (lenis) lenis.on('scroll', handler);
    window.addEventListener('scroll', handler, { passive: true });
    return () => {
      lenis?.off('scroll', handler);
      window.removeEventListener('scroll', handler);
    };
  }, []);

  // Entrada del header junto con el Hero
  useEffect(() => {
    const el = ref.current!.querySelector('.header__bar');
    if (prefersReduced() || !el) return;
    gsap.set(el, { yPercent: -140, opacity: 0 });
    return onReady(() => gsap.to(el, { yPercent: 0, opacity: 1, duration: 1.2, delay: 0.55 }));
  }, []);

  // Cerrar con Escape o clic fuera
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenu(null);
        setMobile(false);
      }
    };
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setMenu(null);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('pointerdown', onDown);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('pointerdown', onDown);
    };
  }, []);


  const trigger = (k: Exclude<MenuKey, null>, label: string) => (
    <li>
      <button
        className={`nav__link${menu === k ? ' is-open' : ''}${path.startsWith(`/dev/${k}`) ? ' is-current' : ''}`}
        aria-expanded={menu === k}
        aria-controls={`menu-${k}`}
        onClick={() => setMenu(menu === k ? null : k)}
      >
        {label}
        <ChevronDown aria-hidden="true" strokeWidth={1.75} />
      </button>
    </li>
  );

  const cls = [
    'header',
    scrolled && 'is-scrolled',
    menu && 'is-menu',
    mobile && 'is-mobile-open',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <header className={cls} ref={ref}>
      <div className="header__bar container">
        <a href={HOME} className="header__logo" aria-label={t('EME Dev, inicio', 'EME Dev, home')} onClick={(e) => { e.preventDefault(); setMenu(null); setMobile(false); navigate(HOME); }}>
          <Logo />
        </a>

        <nav className="nav" aria-label={t('Principal', 'Main')}>
          <ul className="nav__list">
            {trigger('soluciones', t('Soluciones', 'Solutions'))}
            {trigger('industrias', t('Industrias', 'Industries'))}
            {navLinks.map((l) => (
              <li key={l.label}>
                <a
                  className={`nav__link${path.startsWith(l.href) ? ' is-current' : ''}`}
                  href={l.href}
                  aria-current={path.startsWith(l.href) ? 'page' : undefined}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <LangSwitch />

        <div className="header__cta">
          <Button href={DIAGNOSTICO_HREF} size="sm">
            {t('Diagnóstico Gratuito', 'Free Diagnostic')}
          </Button>
        </div>

        <button
          className={`burger${mobile ? ' is-open' : ''}`}
          aria-label={mobile ? t('Cerrar menú', 'Close menu') : t('Abrir menú', 'Open menu')}
          aria-expanded={mobile}
          aria-controls="mobile-menu"
          onClick={() => setMobile((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>

      <NavigationMenu open={menu} onClose={() => setMenu(null)} />
      <MobileMenu open={mobile} onClose={() => setMobile(false)} />
    </header>
  );
}
