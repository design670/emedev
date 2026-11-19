import { services, type ServiceKey } from '../data/content';
import { t } from '../lib/i18n';

/* Espacio reservado para imagen: una tarjeta de color plano con su número.
   Cada solución tiene un número fijo (Image 001 … 007) para que reemplazarlo
   por la imagen definitiva sea directo. Los productos propios usan 008 y 009. */

export function ImagePlaceholder({ n, className = '' }: { n: number; className?: string }) {
  return (
    <div className={`img-ph ${className}`} role="img" aria-label={t(`Imagen ${String(n).padStart(3, '0')} pendiente`, `Image ${String(n).padStart(3, '0')} pending`)}>
      <span>Image {String(n).padStart(3, '0')}</span>
    </div>
  );
}

export function ServiceVisual({ k, className = '' }: { k: ServiceKey; className?: string }) {
  const n = services.findIndex((s) => s.key === k) + 1;
  return (
    <div className={`service-visual ${className}`} aria-hidden="true">
      <ImagePlaceholder n={n} />
    </div>
  );
}
