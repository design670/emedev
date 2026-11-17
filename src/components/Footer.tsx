import { ArrowUpRight } from 'lucide-react';
import { services, industries, partners, contact, DIAGNOSTICO_HREF } from '../data/content';
import { PartnerIcon } from './PartnerIcon';
import { Logo } from './ui';

const unit = [
  { label: 'Casos', href: '/dev/casos' },
  { label: 'Proceso', href: '/dev/proceso' },
  { label: 'Seguridad y datos', href: '/dev/seguridad' },
  { label: 'Equipo', href: '/dev/equipo' },
  { label: 'Recursos', href: '/dev/recursos' },
  { label: 'Diagnóstico', href: DIAGNOSTICO_HREF },
];

export function Footer() {
  return (
    <footer className="footer on-dark">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Logo />
            <p className="muted">
              EME Dev es la unidad de tecnología de EME, compañía con 12 años de trayectoria y más
              de 783 clientes.
            </p>
            <a className="footer__growth link-line" href="https://e-me.co" rel="noopener">
              EME Growth (marketing) <ArrowUpRight strokeWidth={1.5} aria-hidden="true" />
            </a>
          </div>

          <nav className="footer__cols" aria-label="Pie de página">
            <div>
              <h2 className="footer__h t-label">Soluciones</h2>
              <ul>
                {services.map((s) => (
                  <li key={s.key}>
                    <a href={s.href}>{s.name}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="footer__h t-label">Industrias</h2>
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
              <h2 className="footer__h t-label">Contacto</h2>
              <ul>
                <li>
                  <a href={contact.whatsappHref}>WhatsApp {contact.whatsapp}</a>
                </li>
                <li>
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>
                </li>
                <li className="muted">{contact.address}</li>
              </ul>
            </div>
          </nav>
        </div>

        <ul className="footer__seals" aria-label="Sellos de partner">
          {partners.map((p) => (
            <li key={p}>
              <PartnerIcon name={p} />
              {p}
            </li>
          ))}
        </ul>

        <div className="footer__bottom t-small muted">
          <span>© {new Date().getFullYear()} EME. Todos los derechos reservados.</span>
          <span>Barranquilla, Colombia</span>
        </div>
      </div>
      <p className="footer__giant" aria-hidden="true">
        EME <span>Dev</span>
      </p>
    </footer>
  );
}
