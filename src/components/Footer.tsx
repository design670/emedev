import { ArrowUpRight } from 'lucide-react';
import { services, industries, contact, socials, DIAGNOSTICO_HREF } from '../data/content';
import { SocialIcon } from './SocialIcon';
import { Logo } from './ui';
import { t } from '../lib/i18n';

const unit = [
  { label: t('Casos', 'Case studies'), href: '/dev/casos' },
  { label: t('Proceso', 'Process'), href: '/dev/proceso' },
  { label: t('Seguridad y datos', 'Security & data'), href: '/dev/seguridad' },
  { label: t('Blogs', 'Blog'), href: '/dev/recursos' },
  { label: t('Diagnóstico', 'Diagnostic'), href: DIAGNOSTICO_HREF },
];

export function Footer() {
  return (
    <footer className="footer on-dark">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Logo className="footer__logo" />
            <p className="muted">
              {t(
                'EME Dev es la unidad de tecnología de EME, compañía con +15 años de trayectoria y más de 346 proyectos y clientes.',
                'EME Dev is the technology unit of EME, a company with 15+ years of track record and more than 346 projects and clients.',
              )}
            </p>
            <a className="footer__growth link-line" href="https://e-me.co" rel="noopener">
              EME Growth (marketing) <ArrowUpRight strokeWidth={1.5} aria-hidden="true" />
            </a>
            <ul className="footer__social" aria-label={t('Redes sociales', 'Social media')}>
              {socials
                .filter((s) => s.href)
                .map((s) => (
                  <li key={s.name}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={t(`EME en ${s.name}`, `EME on ${s.name}`)}>
                      <SocialIcon name={s.name} />
                    </a>
                  </li>
                ))}
            </ul>
          </div>

          <nav className="footer__cols" aria-label={t('Pie de página', 'Footer')}>
            <div>
              <h2 className="footer__h t-label">{t('Soluciones', 'Solutions')}</h2>
              <ul>
                {services.map((s) => (
                  <li key={s.key}>
                    <a href={s.href}>{s.name}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="footer__h t-label">{t('Industrias', 'Industries')}</h2>
              <ul>
                {industries.map((s) => (
                  <li key={s.name}>
                    <a href={s.href}>{s.name}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="footer__h t-label">EME Dev</h2>
              <ul>
                {unit.map((s) => (
                  <li key={s.label}>
                    <a href={s.href}>{s.label}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="footer__h t-label">{t('Contacto', 'Contact')}</h2>
              <ul>
                <li>
                  <a href={contact.whatsappHref} className="footer__phone">
                    WhatsApp {contact.whatsapp}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>
                </li>
                <li className="muted footer__address">{contact.address}</li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="footer__bottom t-small muted">
          <span>© {new Date().getFullYear()} EME. {t('Todos los derechos reservados.', 'All rights reserved.')}</span>
          <span>Barranquilla, Colombia</span>
        </div>
      </div>
    </footer>
  );
}
