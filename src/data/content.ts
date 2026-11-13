// Todo el texto sale del brief "EME Dev: mapa del sitio y copy" (13-nov-2026).
// Lo que va entre corchetes es un dato pendiente de confirmar por EME: no se inventa.

export type ServiceKey =
  | 'agentes'
  | 'software'
  | 'erp'
  | 'apps'
  | 'web'
  | 'integraciones'
  | 'sitios';

export interface Service {
  key: ServiceKey;
  name: string;
  short: string;
  href: string;
  tags: string[];
}

export const services: Service[] = [
  {
    key: 'agentes',
    name: 'Agentes de IA',
    short:
      'Agentes que cobran, atienden, califican y agendan por WhatsApp, voz o web, conectados a tus sistemas.',
    href: '/dev/soluciones/agentes-ia',
    tags: ['Cobranza', 'Atención', 'Ventas'],
  },
  {
    key: 'software',
    name: 'Software a la medida',
    short: 'El sistema que tu operación necesita y que ningún producto de catálogo resuelve.',
    href: '/dev/soluciones/software-a-la-medida',
    tags: ['Procesos propios', 'Nube', 'Entregas quincenales'],
  },
  {
    key: 'erp',
    name: 'ERP a la medida',
    short:
      'Inventario, compras, ventas, cartera y finanzas en un solo lugar, adaptado a tu proceso.',
    href: '/dev/soluciones/erp',
    tags: ['Inventario', 'Cartera', 'Facturación DIAN'],
  },
  {
    key: 'apps',
    name: 'Apps móviles',
    short: 'Aplicaciones iOS y Android para tus clientes o para tu equipo en campo.',
    href: '/dev/soluciones/apps-moviles',
    tags: ['iOS', 'Android', 'Sin conexión'],
  },
  {
    key: 'web',
    name: 'Aplicaciones web',
    short: 'Portales, plataformas y productos SaaS listos para crecer.',
    href: '/dev/soluciones/aplicaciones-web',
    tags: ['Portales', 'SaaS', 'Suscripciones'],
  },
  {
    key: 'integraciones',
    name: 'Integraciones',
    short:
      'Conectamos tu ERP, CRM, facturación electrónica, pasarelas de pago y WhatsApp para que la información fluya sola.',
    href: '/dev/soluciones/integraciones',
    tags: ['APIs', 'ERP + CRM', 'WhatsApp'],
  },
  {
    key: 'sitios',
    name: 'Sitios web y landings',
    short: 'Sitios rápidos, medibles y pensados para convertir visitas en clientes.',
    href: '/dev/soluciones/sitios-web',
    tags: ['SEO técnico', 'Conversión', 'CMS'],
  },
];

export const industries = [
  {
    name: 'Constructoras',
    short: 'Cotizadores, portales de compradores y agentes de IA para salas de venta y cartera.',
    href: '/dev/industrias/constructoras',
  },
  {
    name: 'Salud',
    short: 'Agendamiento, recordatorios y portales de pacientes que reducen inasistencias.',
    href: '/dev/industrias/salud',
  },
  {
    name: 'Restaurantes',
    short: 'Pedidos directos, reservas y fidelización por WhatsApp, conectados a tu punto de venta.',
    href: '/dev/industrias/restaurantes',
  },
  {
    name: 'Corporativo',
    short: 'Modernización de sistemas, agentes de IA con gobernanza y equipos dedicados.',
    href: '/dev/industrias/corporativo',
  },
];

export const navLinks = [
  { label: 'Casos', href: '/dev/casos' },
  { label: 'Proceso', href: '/dev/proceso' },
  { label: 'Equipo', href: '/dev/equipo' },
];

export const DIAGNOSTICO_HREF = '/dev/diagnostico';

// Solo clientes que el brief nombra. Sin archivos oficiales se muestran como espacio de logo.
export const clients = ['Cajacopi', 'Constructora H3', '[Cliente por confirmar]', '[Cliente por confirmar]', '[Cliente por confirmar]'];

// +120 y +25 son cifras provisionales pedidas por el cliente: confirmar antes de publicar.
export const metrics = [
  { value: 120, prefix: '+', suffix: '', label: 'proyectos de software entregados' },
  { value: 12, prefix: '', suffix: '', label: 'años construyendo tecnología para empresas' },
  { value: 700, prefix: '+', suffix: '', label: 'empresas usan Achieve Apex, nuestro CRM con IA' },
  { value: 25, prefix: '+', suffix: '', label: 'personas en el equipo de ingeniería y producto' },
] as const;

export const companySizes = [
  {
    key: 'pequenas',
    title: 'Empresas pequeñas',
    text: 'Quieres dejar Excel, vender más por tu web o automatizar la atención. Te proponemos un alcance cerrado, con precio y fecha definidos desde el inicio.',
  },
  {
    key: 'medianas',
    title: 'Empresas medianas',
    text: 'Tienes varios sistemas que no se hablan y procesos que dependen de personas clave. Diseñamos el sistema o la integración que los une y lo dejamos funcionando con tu equipo capacitado.',
  },
  {
    key: 'grandes',
    title: 'Empresas grandes',
    text: 'Necesitas modernizar sistemas, sumar agentes de IA con gobernanza o ampliar capacidad de desarrollo. Trabajamos con tu área de TI, sobre tu arquitectura y con tus estándares de seguridad.',
  },
] as const;

export const cases = [1, 2, 3].map((n) => ({
  id: n,
  client: '[Cliente]',
  sector: '[sector]',
  problem: '[El problema, en una frase]',
  solution: '[Lo que construimos, en una frase]',
  result: '[Cifra principal]',
  resultNote: 'Ej.: redujo de X días a Y horas el proceso de Z',
  href: `/dev/casos/caso-${n}`,
}));

export const processSteps = [
  {
    name: 'Diagnóstico',
    text: 'Entendemos el proceso, los sistemas y los datos que tienes. Sales con un alcance y un rango de inversión.',
    deliverable: 'Documento de alcance, prioridades, cronograma y propuesta económica.',
    time: '1 a 2 semanas',
  },
  {
    name: 'Diseño',
    text: 'Prototipo navegable y arquitectura antes de escribir código.',
    deliverable: 'Un prototipo que puedes probar con tu equipo antes de invertir en desarrollo.',
    time: '2 a 4 semanas',
  },
  {
    name: 'Construcción',
    text: 'Entregas cada dos semanas que puedes probar.',
    deliverable: 'Avances funcionando en un ambiente de pruebas y un tablero con el estado del proyecto.',
    time: 'Según alcance',
  },
  {
    name: 'Lanzamiento',
    text: 'Puesta en producción, migración de datos y capacitación.',
    deliverable: 'El sistema en uso, manuales y accesos.',
    time: 'Puesta en producción',
  },
  {
    name: 'Soporte y evolución',
    text: 'Garantía, mantenimiento y mejoras continuas.',
    deliverable: 'Tiempos de respuesta definidos y un plan de evolución.',
    time: 'Continuo',
  },
];

export const partners = [
  'AWS Partner Network',
  'OpenAI',
  'Meta Business Partner',
  'WhatsApp Business',
  'Shopify Partners',
  'Certified ScrumMaster',
];

export const testimonials = [1, 2, 3, 4, 5, 6].map((n) => ({
  id: n,
  quote:
    '[Testimonio que mencione un resultado concreto y cómo fue trabajar con el equipo]',
  name: '[Nombre]',
  role: '[Cargo]',
  company: '[Empresa]',
}));

export const faqs = [
  {
    q: '¿Cuánto cuesta un proyecto?',
    a: 'Depende del alcance. Como referencia, una landing parte de [precio], un agente de IA de [precio] y un sistema a la medida de [precio]. Después del diagnóstico recibes una propuesta con precio y cronograma.',
  },
  {
    q: '¿Cuánto tarda?',
    a: 'Una landing, [N] semanas. Un agente de IA, entre [N] y [N] semanas. Un sistema a la medida, entre [N] y [N] meses, con entregas parciales cada dos semanas.',
  },
  {
    q: '¿De quién es el código?',
    a: '[Por confirmar]. Propuesta: tuyo. Al terminar el proyecto recibes el código fuente, la documentación y los accesos.',
  },
  {
    q: '¿Qué pasa después del lanzamiento?',
    a: 'Todos los proyectos incluyen [N] meses de garantía. Después puedes contratar un plan de soporte y evolución.',
  },
  {
    q: '¿Trabajan con el sistema que ya tengo?',
    a: 'Sí. La mayoría de nuestros proyectos se conecta con un ERP, CRM o sistema contable existente.',
  },
  {
    q: '¿Atienden empresas fuera de Colombia?',
    a: 'Sí. Trabajamos con clientes en Latinoamérica y Estados Unidos, en español e inglés.',
  },
];

export const contact = {
  whatsapp: '+57 304 288 2759',
  whatsappHref: 'https://wa.me/573042882759',
  email: 'comercial@e-me.co',
  address: 'Calle 107 # 50-69, Barranquilla',
};
