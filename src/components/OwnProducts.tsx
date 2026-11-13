import { RevealText } from './ui';
import { MetricCounter } from './Metrics';
import { ImagePlaceholder } from './ServiceVisual';

/* Espacios de imagen: reemplazar por capturas reales de cada producto. */

export function OwnProducts() {
  return (
    <section className="products section on-light" aria-labelledby="products-title">
      <div className="container">
        <div className="products__head">
          <RevealText
            as="h2"
            id="products-title"
            className="t-h2 products__title"
            parts={['También construimos y operamos', { t: 'nuestros propios productos.', cls: 'mark' }]}
          />
        </div>

        <div className="products__grid">
          <article className="product product--apex" data-reveal="up">
            <div className="product__media" data-reveal="mask">
              <div data-mask-inner className="product__media-inner">
                <ImagePlaceholder n={8} />
              </div>
            </div>
            <div className="product__info">
              <div>
                <h3 className="t-h4">Achieve Apex</h3>
                <p className="muted">
                  Nuestro CRM con inteligencia artificial, lo usan más de 700 empresas en
                  Latinoamérica.
                </p>
              </div>
              <p className="product__stat">
                <MetricCounter value={700} prefix="+" />
                <span className="t-small muted">empresas</span>
              </p>
            </div>
          </article>

          <article className="product product--tr" data-reveal="up" data-delay="0.12">
            <div className="product__media" data-reveal="mask" data-delay="0.12">
              <div data-mask-inner className="product__media-inner">
                <ImagePlaceholder n={9} />
              </div>
            </div>
            <div className="product__info">
              <div>
                <h3 className="t-h4">Get Transcribe</h3>
                <p className="muted">Analiza video de redes sociales en minutos.</p>
              </div>
            </div>
          </article>

          <div className="products__why" data-reveal="up">
            <p className="t-lead">
              Mantener productos propios en producción nos obliga a resolver lo que después
              resolvemos para ti:
            </p>
            <ul className="products__list">
              {['Escala', 'Seguridad', 'Soporte', 'Costos de infraestructura'].map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
