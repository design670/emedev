// Todo el texto sale del brief "EME Dev: mapa del sitio y copy" (13-nov-2026).
// Lo que va entre corchetes es un dato pendiente de confirmar por EME: no se inventa.

import { industryPages } from './pages.es';

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
    name: 'Sitios web, e-commerce y landings',
    short: 'Sitios rápidos, medibles y pensados para convertir visitas en clientes.',
    href: '/dev/soluciones/sitios-web',
    tags: ['SEO técnico', 'Conversión', 'CMS'],
  },
];

/* Industrias (v3): salen de las páginas de industria, así menú, pie, filtros y páginas
   usan siempre los mismos nombres. `line` es la línea de apoyo del menú. */
export const industries = industryPages.map((p) => ({
  name: p.name,
  line: p.line,
  short: p.card,
  href: `/dev/industrias/${p.slug}`,
  tags: [] as string[],
}));

export const navLinks = [
  { label: 'Casos', href: '/dev/casos' },
  { label: 'Proceso', href: '/dev/proceso' },
];

export const DIAGNOSTICO_HREF = '/dev/diagnostico';

// Datos de ejemplo (provisionales): reemplazar por la información real antes de publicar.
// Logos oficiales descargados de los sitios de cada marca (public/clientes). Sin logo: se muestra el nombre.
// Logos oficiales por nombre de cliente (archivos en public/clientes).
export const clientLogos: Record<string, string> = {
  Cajacopi: '/clientes/color/cajacopi.svg',
  Brilla: '/clientes/color/brilla.png',
  PRB: '/clientes/color/probarranquilla.svg',
  FIU: '/clientes/color/fiu.png',
  ICSA: '/clientes/color/icsa.png',
  'Universidad Metropolitana': '/clientes/color/universidad-metropolitana.png',
  Befuturo: '/clientes/color/befuturo.png',
  'Zona Franca La Cayena': '/clientes/color/zona-franca-la-cayena.png',
  'Clínica La Asunción': '/clientes/color/clinica-la-asuncion.png',
  'Sociedad Colombiana de Pediatría': '/clientes/color/sociedad-colombiana-de-pediatria.png',
};

// Clientes de desarrollo (cinta bajo las cifras).
export const clients: { name: string; logo?: string }[] = [
  { name: 'Bicosa', logo: '/clientes/color/bicosa.jpg' },
  { name: 'Quirulaser', logo: '/clientes/color/quirulaser.png' },
  { name: 'Genial Foods', logo: '/clientes/color/genial-foods.png' },
  { name: 'Rapibox', logo: '/clientes/color/rapibox.png' },
  { name: 'Tusim', logo: '/clientes/color/tusim.png' },
  { name: 'Flexxi Credit', logo: '/clientes/color/flexxi-credit.png' },
  { name: 'Carnes Santacruz', logo: '/clientes/color/carnes-santacruz.png' },
  { name: 'Academia Sandra', logo: '/clientes/color/academia-sandra.png' },
  { name: 'Sushi2go', logo: '/clientes/color/sushi2go.png' },
  { name: 'Watertown', logo: '/clientes/color/watertown.png' },
  { name: 'Importex', logo: '/clientes/color/importex.png' },
  { name: 'CargoNet', logo: '/clientes/color/cargonet.png' },
  { name: 'Cajacopi', logo: '/clientes/color/cajacopi.svg' },
  { name: 'Country Club', logo: '/clientes/color/country-club.png' },
  { name: 'Puerto de Barranquilla', logo: '/clientes/color/puerto-barranquilla.svg' },
  { name: 'ProBarranquilla', logo: '/clientes/color/probarranquilla.svg' },
  { name: 'Soluzioni', logo: '/clientes/color/soluzioni.png' },
];

export const metrics = [
  { value: 287, prefix: '+', suffix: '', label: 'Proyectos web' },
  { value: 92, prefix: '+', suffix: '', label: 'Proyectos de desarrollo a la medida' },
  { value: 7, prefix: '+', suffix: '', label: 'Aplicaciones móviles' },
  { value: 2, prefix: '', suffix: '', label: 'Herramientas propias\n(Apex y Get Transcribe)' },
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

export interface CaseStudy {
  id: number;
  slug: string;
  client: string;
  sector: string;
  industry: string;
  solutionName: string;
  size: string;
  duration: string;
  tech: string;
  problem: string;
  solution: string;
  result: string;
  resultNote: string;
  href: string;
  title: string;
  start: string;
  built: string;
  process: string;
  results: { label: string; before: string; after: string }[];
  testimonial: { quote: string; name: string; role: string };
}

const mk = (c: Omit<CaseStudy, 'href'>): CaseStudy => ({ ...c, href: `/dev/casos/${c.slug}` });

// Casos de ejemplo (provisionales): reemplazar por casos reales antes de publicar.
export const cases: CaseStudy[] = [
  mk({
    id: 1,
    slug: 'constructora-litoral',
    client: 'Constructora Litoral',
    sector: 'Construcción',
    industry: '',
    solutionName: 'Agentes de IA',
    size: '120 empleados',
    duration: '4 meses',
    tech: 'React, Node.js, WhatsApp Business API, OpenAI, AWS',
    problem: 'Los prospectos de la sala de ventas se perdían entre el asesor, las hojas de cálculo y el CRM.',
    solution: 'Un cotizador en línea con disponibilidad de unidades y un agente de IA que hace seguimiento por WhatsApp.',
    result: '−38 % de prospectos perdidos',
    resultNote: 'En los primeros seis meses de operación.',
    title: 'Cómo Constructora Litoral redujo 38 % los prospectos perdidos con un agente de IA',
    start: 'Cada fin de semana llegaban más de 200 visitas a la sala de ventas. El seguimiento dependía de la memoria de cada asesor y la mitad de los contactos no recibía respuesta en la primera semana.',
    built: 'Conectamos el inventario de unidades a un cotizador web y a un agente de IA por WhatsApp que responde, envía cotizaciones y agenda visitas. Todo queda registrado en el CRM y los casos complejos pasan a un asesor con el historial completo.',
    process: 'Dos semanas de diagnóstico con el equipo comercial, un prototipo validado con tres asesores y cuatro ciclos de construcción de dos semanas. El área de TI de la constructora participó desde el diseño.',
    results: [
      { label: 'Prospectos perdidos', before: '52 %', after: '14 %' },
      { label: 'Tiempo de primera respuesta', before: '26 h', after: '3 min' },
      { label: 'Visitas agendadas al mes', before: '140', after: '310' },
    ],
    testimonial: {
      quote: 'Pasamos de perseguir contactos en Excel a tener cada prospecto con seguimiento el mismo día. El equipo de EME Dev entendió cómo vendemos antes de proponer nada.',
      name: 'Andrea Molina',
      role: 'Gerente comercial',
    },
  }),
  mk({
    id: 2,
    slug: 'red-medica-andina',
    client: 'Red Médica Andina',
    sector: 'Salud',
    industry: 'Agenda y atención',
    solutionName: 'Agentes de IA',
    size: '350 empleados, 6 sedes',
    duration: '3 meses',
    tech: 'Python, WhatsApp Business API, OpenAI, PostgreSQL, AWS',
    problem: 'Casi uno de cada cuatro pacientes no asistía a su cita y las líneas telefónicas vivían saturadas.',
    solution: 'Un agente de IA que agenda, confirma y reprograma citas por WhatsApp, integrado con la agenda médica.',
    result: '−45 % de inasistencias',
    resultNote: 'Comparado con el mismo trimestre del año anterior.',
    title: 'Cómo Red Médica Andina redujo 45 % las inasistencias con agendamiento por WhatsApp',
    start: 'El call center recibía más de 1.800 llamadas diarias, la mayoría para agendar o confirmar citas. Las inasistencias llegaban al 24 % y cada cita perdida era un espacio que no se recuperaba.',
    built: 'Un agente de IA conectado a la agenda de las seis sedes que agenda, envía recordatorios 48 y 2 horas antes, y libera los cupos cancelados para la lista de espera. Los datos de salud se procesan con control de accesos y registro de consultas.',
    process: 'Diagnóstico de dos semanas, piloto en una sede durante un mes y despliegue gradual en las otras cinco. El equipo de atención se capacitó en el panel de supervisión.',
    results: [
      { label: 'Inasistencias', before: '24 %', after: '13 %' },
      { label: 'Llamadas al call center', before: '1.800/día', after: '950/día' },
      { label: 'Citas agendadas por WhatsApp', before: '0 %', after: '61 %' },
    ],
    testimonial: {
      quote: 'Liberamos casi la mitad de la carga del call center y los pacientes agendan a cualquier hora. Lo más valioso fue que el piloto nos dejó medir antes de escalar.',
      name: 'Carlos Ríos',
      role: 'Director administrativo',
    },
  }),
  mk({
    id: 3,
    slug: 'distribuidora-nexo',
    client: 'Distribuidora Nexo',
    sector: 'Distribución',
    industry: 'Pedidos y cartera',
    solutionName: 'ERP a la medida',
    size: '480 empleados',
    duration: '7 meses',
    tech: 'React, .NET, SQL Server, Azure, facturación electrónica DIAN',
    problem: 'Inventario, compras y cartera vivían en tres sistemas distintos y cerrar el mes tomaba seis días.',
    solution: 'Un ERP a la medida con inventario, compras, ventas y cartera, integrado con la facturación electrónica.',
    result: 'De 6 días a 8 horas el cierre de mes',
    resultNote: 'Desde el segundo cierre con el sistema en producción.',
    title: 'Cómo Distribuidora Nexo pasó de 6 días a 8 horas su cierre de mes con un ERP a la medida',
    start: 'La información de bodega, compras y cartera se cruzaba a mano cada fin de mes. Dos personas dedicaban casi una semana a cuadrar cifras y la gerencia tomaba decisiones con datos atrasados.',
    built: 'Un ERP con los módulos que la operación necesitaba, migración de cinco años de historia, tableros en tiempo real e integración con el proveedor de facturación electrónica. Se implementó por etapas sin frenar la operación.',
    process: 'Diagnóstico de tres semanas, prototipo navegable y construcción en catorce ciclos de dos semanas. Primero salió inventario, luego compras y ventas, y al final cartera.',
    results: [
      { label: 'Cierre de mes', before: '6 días', after: '8 horas' },
      { label: 'Diferencias de inventario', before: '7,2 %', after: '0,9 %' },
      { label: 'Días de cartera', before: '68', after: '49' },
    ],
    testimonial: {
      quote: 'Hoy cerramos el mes en un día y todos miramos los mismos números. La implementación por etapas fue clave para no parar la bodega.',
      name: 'Juliana Pérez',
      role: 'Directora financiera',
    },
  }),
  mk({
    id: 4,
    slug: 'grupo-fogon',
    client: 'Grupo Fogón',
    sector: 'Restaurantes',
    industry: '',
    solutionName: 'Aplicaciones web',
    size: '9 restaurantes',
    duration: '10 semanas',
    tech: 'Next.js, Node.js, WhatsApp Business API, Wompi',
    problem: 'Más del 60 % de los domicilios pasaba por plataformas que cobraban comisiones del 25 %.',
    solution: 'Un canal propio de pedidos web y por WhatsApp, conectado al punto de venta y a un programa de fidelización.',
    result: '+32 % de pedidos directos',
    resultNote: 'En los primeros cuatro meses.',
    title: 'Cómo Grupo Fogón aumentó 32 % sus pedidos directos con un canal propio',
    start: 'Las comisiones de las plataformas de domicilios se comían el margen y el restaurante no tenía datos de sus clientes para volver a contactarlos.',
    built: 'Una plataforma de pedidos web y por WhatsApp con pagos en línea, conectada al punto de venta de las nueve sedes, más campañas automáticas para clientes que no compran hace 30 días.',
    process: 'Una semana de diagnóstico, prototipo validado con clientes frecuentes y tres ciclos de construcción antes del lanzamiento por sedes.',
    results: [
      { label: 'Pedidos por canal propio', before: '38 %', after: '50 %' },
      { label: 'Clientes que repiten en 30 días', before: '18 %', after: '31 %' },
      { label: 'Comisión media por pedido', before: '25 %', after: '14 %' },
    ],
    testimonial: {
      quote: 'Recuperamos la relación con nuestros clientes y dejamos de regalar margen. El canal propio se pagó en menos de cinco meses.',
      name: 'Mauricio Gómez',
      role: 'Socio fundador',
    },
  }),
];

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
  'Pinterest Partners',
];

// Testimonios de ejemplo (provisionales): reemplazar por testimonios reales antes de publicar.
/* Testimonios de clientes (los levanta el equipo de EME; textos pendientes entre corchetes).
   Testimonio en video: agrega video con la ruta de un .mp4 en public/testimonios/
   o un enlace de YouTube, y opcionalmente poster con una imagen de portada. */
export type Testimonial = {
  id: number;
  company: string;
  logo?: string;
  quote: string;
  name: string;
  role: string;
  video?: string;
  poster?: string;
};

export const testimonials: Testimonial[] = [
  {
    id: 1,
    company: 'Bicosa',
    logo: '/clientes/color/bicosa.jpg',
    quote: '[Testimonio pendiente]',
    name: '[Nombre]',
    role: '[Cargo]',
  },
  {
    id: 2,
    company: 'Genial Foods',
    logo: '/clientes/color/genial-foods.png',
    quote: '[Testimonio pendiente]',
    name: '[Nombre]',
    role: '[Cargo]',
  },
  {
    id: 3,
    company: 'Country Club',
    logo: '/clientes/color/country-club.png',
    quote: '[Testimonio pendiente]',
    name: '[Nombre]',
    role: '[Cargo]',
  },
  {
    id: 4,
    company: 'Quirulaser',
    logo: '/clientes/color/quirulaser.png',
    quote: '[Testimonio pendiente]',
    name: '[Nombre]',
    role: '[Cargo]',
  },
  {
    id: 5,
    company: 'Importex',
    logo: '/clientes/color/importex.png',
    quote: '[Testimonio pendiente]',
    name: '[Nombre]',
    role: '[Cargo]',
  },
  {
    id: 6,
    company: 'CargoNet',
    logo: '/clientes/color/cargonet.png',
    quote: '[Testimonio pendiente]',
    name: '[Nombre]',
    role: '[Cargo]',
  },
  {
    id: 7,
    company: 'Templado',
    quote: '[Testimonio pendiente]',
    name: '[Nombre]',
    role: '[Cargo]',
  },
  {
    id: 8,
    company: 'Carnes Santacruz',
    logo: '/clientes/color/carnes-santacruz.png',
    quote: '[Testimonio pendiente]',
    name: '[Nombre]',
    role: '[Cargo]',
  },
  {
    id: 9,
    company: 'Watertown',
    logo: '/clientes/color/watertown.png',
    quote: '[Testimonio pendiente]',
    name: '[Nombre]',
    role: '[Cargo]',
  },
];

export const faqs = [
  {
    q: '¿Cuánto cuesta un proyecto?',
    a: 'Depende del alcance. Como referencia, una landing parte de $2.000.000 COP, un agente de IA de $2.700.000 COP, un software a la medida de $15.000.000 COP y un ERP de $45.000.000 COP. Después del diagnóstico recibes una propuesta con precio y cronograma.',
  },
  {
    q: '¿Cuánto tarda?',
    a: 'Una landing, 3 días. Un agente de IA, 4 semanas. Un software a la medida, entre 1 y 2 meses, y un ERP, entre 4 y 8 meses, con entregas parciales cada dos semanas.',
  },
  {
    q: '¿De quién es el código?',
    a: 'Tuyo. Al terminar el proyecto recibes el código fuente, la documentación y los accesos.',
  },
  {
    q: '¿Qué pasa después del lanzamiento?',
    a: 'Todos los proyectos incluyen 3 meses de garantía. Después puedes contratar un plan de soporte y evolución.',
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

// Redes de EME. Instagram y LinkedIn salen de e-me.co; TikTok sigue el mismo usuario y falta confirmarlo.
export const socials = [
  { name: 'Instagram', href: 'https://www.instagram.com/emegrowthagency/' },
  { name: 'TikTok', href: 'https://www.tiktok.com/@emegrowthagency' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/company/emegrowthagency' },
];

export const contact = {
  whatsapp: '+57 304 288 2759',
  whatsappHref: 'https://wa.me/573042882759',
  email: 'comercial@e-me.co',
  address: 'Calle 107 # 50-69, Hotel Sky Collection, oficina 1408, Barranquilla',
};
