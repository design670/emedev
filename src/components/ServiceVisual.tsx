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

/* Imagen de cada solución tomada de la galería de un caso real que la representa.
   Se usa en el menú desplegable de Soluciones y en el hero de cada página de solución. */
export const SERVICE_PHOTOS: Record<ServiceKey, string> = {
  agentes: '/casos/galeria/estrategias-2.jpg', // Estrategia LTDA: software + agente de IA, atención desde el celular
  software: '/casos/galeria/rapibox-2.jpg', // Rapibox: software de cotización y envíos
  erp: '/casos/galeria/genial-foods-2.jpg', // Genial Foods: logística, comercial y financiero en un sistema
  apps: '/casos/galeria/watertown-3.jpg', // Watertown: su app con eventos y clases
  web: '/casos/galeria/flexxi-2.jpg', // Flexxi: plataforma web de créditos
  integraciones: '/casos/galeria/tusim-2.jpg', // Tusim: su software de órdenes, activaciones y compras
  sitios: '/casos/galeria/clinica-la-asuncion-4.jpg', // Clínica La Asunción: su sitio web en uso
};

/* Imagen de cada industria (clave = slug de la industria): de la galería de un caso
   de esa industria. Se usa en el menú de Industrias y en el hero de cada industria. */
export const INDUSTRY_PHOTOS: Record<string, string> = {
  'operacion-y-logistica': '/casos/galeria/cargonet-2.jpg', // CargoNet: su plataforma de envíos internacionales
  'distribucion-y-mayoristas': '/casos/galeria/genial-foods-4.jpg', // Genial Foods: clientes y límites de crédito
  'salud-y-servicios': '/casos/galeria/watertown-2.jpg', // Watertown: agenda de clases en computador y celular
  'educacion-y-formacion': '/casos/galeria/academia-sandra-1.jpg', // Academia Sandra: su web en celular
};

/* photo: usa la imagen de la solución (SERVICE_PHOTOS); src: usa esa imagen */
export function ServiceVisual({ k, className = '', photo = false, src }: { k: ServiceKey; className?: string; photo?: boolean; src?: string }) {
  const n = services.findIndex((s) => s.key === k) + 1;
  const img = src ?? (photo ? SERVICE_PHOTOS[k] : undefined);
  return (
    <div className={`service-visual ${className}`} aria-hidden="true">
      {img ? <img className="service-visual__img" src={img} alt="" decoding="async" /> : <ImagePlaceholder n={n} />}
    </div>
  );
}
