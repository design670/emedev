import { ArrowRight } from 'lucide-react';
import { partners } from '../data/content';
import { RevealText } from './ui';

/* Los sellos se muestran como espacios tipográficos hasta tener los archivos
   oficiales de cada programa de partners. */
export function Trust() {
  return (
    <section className="trust section on-surface" aria-labelledby="trust-title">
      <div className="container trust__grid">
        <div className="trust__copy">
          <RevealText as="h2" id="trust-title" className="t-h2" parts={['Respaldo técnico.']} />
          <p className="trust__text" data-reveal="up">
            El código y los datos de tu proyecto son tuyos <em className="ph">[confirmar política]</em>.
            Firmamos acuerdo de confidencialidad antes de ver tu información.
          </p>
          <a href="/dev/seguridad" className="link-line" data-reveal="up">
            Más detalle en Seguridad y datos <ArrowRight strokeWidth={1.5} aria-hidden="true" />
          </a>
        </div>
        <ul className="seals" data-reveal="stagger" aria-label="Sellos y alianzas">
          {partners.map((p, i) => (
            <li className="seal" key={p}>
              <span className="seal__idx">{String(i + 1).padStart(2, '0')}</span>
              <span className="seal__name">{p}</span>
              <span className="seal__ph t-label">Logo oficial</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
