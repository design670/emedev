// All copy comes from the brief "EME Dev: site map and copy" (Nov 13, 2026), English version.
// Bracketed items are data EME still has to confirm: nothing is made up.

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
    name: 'AI agents',
    short:
      'Agents that collect payments, serve customers, qualify leads and book appointments over WhatsApp, voice or web, connected to your systems.',
    href: '/dev/soluciones/agentes-ia',
    tags: ['Collections', 'Customer service', 'Sales'],
  },
  {
    key: 'software',
    name: 'Custom software',
    short: 'The system your operation needs, and that no off-the-shelf product can deliver.',
    href: '/dev/soluciones/software-a-la-medida',
    tags: ['Your own processes', 'Cloud', 'Biweekly releases'],
  },
  {
    key: 'erp',
    name: 'Custom ERP',
    short:
      'Inventory, purchasing, sales, receivables and finance in one place, adapted to your process.',
    href: '/dev/soluciones/erp',
    tags: ['Inventory', 'Receivables', 'DIAN invoicing'],
  },
  {
    key: 'apps',
    name: 'Mobile apps',
    short: 'iOS and Android apps for your customers or your field team.',
    href: '/dev/soluciones/apps-moviles',
    tags: ['iOS', 'Android', 'Offline'],
  },
  {
    key: 'web',
    name: 'Web applications',
    short: 'Portals, platforms and SaaS products built to scale.',
    href: '/dev/soluciones/aplicaciones-web',
    tags: ['Portals', 'SaaS', 'Subscriptions'],
  },
  {
    key: 'integraciones',
    name: 'Integrations',
    short:
      'We connect your ERP, CRM, electronic invoicing, payment gateways and WhatsApp so information flows on its own.',
    href: '/dev/soluciones/integraciones',
    tags: ['APIs', 'ERP + CRM', 'WhatsApp'],
  },
  {
    key: 'sitios',
    name: 'Websites, e-commerce & landing pages',
    short: 'Fast, measurable sites designed to turn visitors into customers.',
    href: '/dev/soluciones/sitios-web',
    tags: ['Technical SEO', 'Conversion', 'CMS'],
  },
];

export const industries = [
  {
    name: 'Construction companies',
    short: 'Quote builders, buyer portals and AI agents for sales offices and receivables.',
    href: '/dev/industrias/constructoras',
    tags: ['Quote builders', 'Buyer portal', 'Receivables'],
  },
  {
    name: 'Healthcare',
    short: 'Scheduling, reminders and patient portals that reduce no-shows.',
    href: '/dev/industrias/salud',
    tags: ['Scheduling', 'Reminders', 'Patient portal'],
  },
  {
    name: 'Restaurants',
    short: 'Direct orders, reservations and loyalty over WhatsApp, connected to your point of sale.',
    href: '/dev/industrias/restaurantes',
    tags: ['Direct orders', 'Reservations', 'Loyalty'],
  },
  {
    name: 'Corporate',
    short: 'Systems modernization, governed AI agents and dedicated teams.',
    href: '/dev/industrias/corporativo',
    tags: ['Modernization', 'Governed AI', 'Dedicated teams'],
  },
];

export const navLinks = [
  { label: 'Case studies', href: '/dev/casos' },
  { label: 'Process', href: '/dev/proceso' },
];

export const DIAGNOSTICO_HREF = '/dev/diagnostico';

// Sample data (provisional): replace with real information before publishing.
// Official logos downloaded from each brand's website (public/clientes). No logo: the name is shown.
// Official logos by client name (files in public/clientes).
export const clientLogos: Record<string, string> = {
  Cajacopi: '/clientes/color/cajacopi.svg',
  Brilla: '/clientes/color/brilla.png',
  PRB: '/clientes/color/probarranquilla.svg',
  FIU: '/clientes/color/fiu.png',
};

// Development clients (strip below the metrics). No logo: the name is shown (Genial Foods, Rapibox).
export const clients: { name: string; logo?: string }[] = [
  { name: 'Bicosa', logo: '/clientes/color/bicosa.jpg' },
  { name: 'Quirulaser', logo: '/clientes/color/quirulaser.png' },
  { name: 'Genial Foods', logo: '/clientes/color/genial-foods.png' },
  { name: 'Rapibox', logo: '/clientes/color/rapibox.png' },
  { name: 'Tusim', logo: '/clientes/color/tusim.png' },
  { name: 'Flexxi Credit', logo: '/clientes/color/flexxi-credit.png' },
  { name: 'Carnes Santacruz', logo: '/clientes/carnes-santacruz.svg' },
  { name: 'Academia Sandra', logo: '/clientes/academia-sandra.svg' },
  { name: 'Sushi2go', logo: '/clientes/sushi2go.svg' },
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
  { value: 200, prefix: '+', suffix: '', label: 'Web projects' },
  { value: 65, prefix: '+', suffix: '', label: 'Custom development projects' },
  { value: 7, prefix: '+', suffix: '', label: 'Mobile apps' },
  { value: 2, prefix: '+', suffix: '', label: 'In-house tools\n(Apex and Get Transcribe)' },
] as const;

export const companySizes = [
  {
    key: 'pequenas',
    title: 'Small companies',
    text: 'You want to move off Excel, sell more through your website or automate customer service. We propose a fixed scope, with price and timeline set from the start.',
  },
  {
    key: 'medianas',
    title: 'Mid-sized companies',
    text: 'You have several systems that don’t talk to each other and processes that depend on key people. We design the system or integration that ties them together and leave it running, with your team trained.',
  },
  {
    key: 'grandes',
    title: 'Large companies',
    text: 'You need to modernize systems, add governed AI agents or expand your development capacity. We work with your IT team, on your architecture and to your security standards.',
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

// Sample case studies (provisional): replace with real cases before publishing.
export const cases: CaseStudy[] = [
  mk({
    id: 1,
    slug: 'constructora-litoral',
    client: 'Constructora Litoral',
    sector: 'Construction',
    industry: 'Construction companies',
    solutionName: 'AI agents',
    size: '120 employees',
    duration: '4 months',
    tech: 'React, Node.js, WhatsApp Business API, OpenAI, AWS',
    problem: 'Sales office leads were getting lost between the sales rep, the spreadsheets and the CRM.',
    solution: 'An online quote builder with unit availability and an AI agent that follows up over WhatsApp.',
    result: '−38% lost leads',
    resultNote: 'In the first six months of operation.',
    title: 'How Constructora Litoral cut lost leads by 38% with an AI agent',
    start: 'More than 200 visitors came to the sales office every weekend. Follow-up depended on each rep’s memory, and half of the contacts got no response in the first week.',
    built: 'We connected the unit inventory to a web quote builder and to a WhatsApp AI agent that answers questions, sends quotes and books visits. Everything is logged in the CRM, and complex cases are handed to a sales rep with the full history.',
    process: 'Two weeks of diagnostic work with the sales team, a prototype validated with three reps and four two-week build cycles. The company’s IT team was involved from the design stage.',
    results: [
      { label: 'Lost leads', before: '52%', after: '14%' },
      { label: 'First response time', before: '26 h', after: '3 min' },
      { label: 'Visits booked per month', before: '140', after: '310' },
    ],
    testimonial: {
      quote: 'We went from chasing contacts in Excel to following up on every lead the same day. The EME Dev team understood how we sell before proposing anything.',
      name: 'Andrea Molina',
      role: 'Sales Manager',
    },
  }),
  mk({
    id: 2,
    slug: 'red-medica-andina',
    client: 'Red Médica Andina',
    sector: 'Healthcare',
    industry: 'Healthcare',
    solutionName: 'AI agents',
    size: '350 employees, 6 locations',
    duration: '3 months',
    tech: 'Python, WhatsApp Business API, OpenAI, PostgreSQL, AWS',
    problem: 'Almost one in four patients missed their appointment, and the phone lines were constantly overloaded.',
    solution: 'An AI agent that books, confirms and reschedules appointments over WhatsApp, integrated with the medical calendar.',
    result: '−45% no-shows',
    resultNote: 'Compared with the same quarter of the previous year.',
    title: 'How Red Médica Andina cut no-shows by 45% with WhatsApp scheduling',
    start: 'The call center received more than 1,800 calls a day, most of them to book or confirm appointments. No-shows reached 24%, and every missed appointment was a slot that couldn’t be recovered.',
    built: 'An AI agent connected to the calendars of all six locations that books appointments, sends reminders 48 and 2 hours ahead, and releases canceled slots to the waiting list. Health data is processed with access controls and query logging.',
    process: 'A two-week diagnostic, a one-month pilot at one location and a gradual rollout to the other five. The customer service team was trained on the supervision dashboard.',
    results: [
      { label: 'No-shows', before: '24%', after: '13%' },
      { label: 'Calls to the call center', before: '1,800/day', after: '950/day' },
      { label: 'Appointments booked via WhatsApp', before: '0%', after: '61%' },
    ],
    testimonial: {
      quote: 'We freed up almost half of the call center’s workload, and patients can book at any time. The most valuable part was that the pilot let us measure before scaling.',
      name: 'Carlos Ríos',
      role: 'Administrative Director',
    },
  }),
  mk({
    id: 3,
    slug: 'distribuidora-nexo',
    client: 'Distribuidora Nexo',
    sector: 'Distribution',
    industry: 'Corporate',
    solutionName: 'Custom ERP',
    size: '480 employees',
    duration: '7 months',
    tech: 'React, .NET, SQL Server, Azure, DIAN electronic invoicing',
    problem: 'Inventory, purchasing and receivables lived in three different systems, and closing the month took six days.',
    solution: 'A custom ERP with inventory, purchasing, sales and receivables, integrated with electronic invoicing.',
    result: 'Month-end close from 6 days to 8 hours',
    resultNote: 'From the second close with the system in production.',
    title: 'How Distribuidora Nexo cut its month-end close from 6 days to 8 hours with a custom ERP',
    start: 'Warehouse, purchasing and receivables data was reconciled by hand at the end of every month. Two people spent almost a week reconciling figures, and management made decisions with outdated data.',
    built: 'An ERP with the modules the operation needed, migration of five years of history, real-time dashboards and integration with the electronic invoicing provider. It was rolled out in stages without stopping operations.',
    process: 'A three-week diagnostic, a clickable prototype and a build in fourteen two-week cycles. Inventory went live first, then purchasing and sales, and finally receivables.',
    results: [
      { label: 'Month-end close', before: '6 days', after: '8 hours' },
      { label: 'Inventory discrepancies', before: '7.2%', after: '0.9%' },
      { label: 'Days sales outstanding', before: '68', after: '49' },
    ],
    testimonial: {
      quote: 'Today we close the month in a day, and everyone looks at the same numbers. The staged rollout was key to keeping the warehouse running.',
      name: 'Juliana Pérez',
      role: 'CFO',
    },
  }),
  mk({
    id: 4,
    slug: 'grupo-fogon',
    client: 'Grupo Fogón',
    sector: 'Restaurants',
    industry: 'Restaurants',
    solutionName: 'Web applications',
    size: '9 restaurants',
    duration: '10 weeks',
    tech: 'Next.js, Node.js, WhatsApp Business API, Wompi',
    problem: 'More than 60% of delivery orders went through platforms charging 25% commissions.',
    solution: 'Its own web and WhatsApp ordering channel, connected to the point of sale and a loyalty program.',
    result: '+32% direct orders',
    resultNote: 'In the first four months.',
    title: 'How Grupo Fogón grew direct orders by 32% with its own channel',
    start: 'Delivery platform commissions were eating into margins, and the restaurant had no customer data to reach out to them again.',
    built: 'A web and WhatsApp ordering platform with online payments, connected to the point of sale at all nine locations, plus automated campaigns for customers who haven’t ordered in 30 days.',
    process: 'One week of diagnostic work, a prototype validated with regular customers and three build cycles before a location-by-location launch.',
    results: [
      { label: 'Orders through own channel', before: '38%', after: '50%' },
      { label: 'Repeat customers within 30 days', before: '18%', after: '31%' },
      { label: 'Average commission per order', before: '25%', after: '14%' },
    ],
    testimonial: {
      quote: 'We got our relationship with our customers back and stopped giving away margin. Our own channel paid for itself in less than five months.',
      name: 'Mauricio Gómez',
      role: 'Founding Partner',
    },
  }),
];

export const processSteps = [
  {
    name: 'Diagnostic',
    text: 'We get to know your process, systems and data. You walk away with a scope and an investment range.',
    deliverable: 'Scope document, priorities, timeline and cost proposal.',
    time: '1 to 2 weeks',
  },
  {
    name: 'Design',
    text: 'A clickable prototype and architecture before writing any code.',
    deliverable: 'A prototype you can test with your team before investing in development.',
    time: '2 to 4 weeks',
  },
  {
    name: 'Build',
    text: 'Releases every two weeks that you can test.',
    deliverable: 'Working progress in a test environment and a dashboard with the project status.',
    time: 'Depends on scope',
  },
  {
    name: 'Launch',
    text: 'Go-live, data migration and training.',
    deliverable: 'The system in use, manuals and access credentials.',
    time: 'Go-live',
  },
  {
    name: 'Support and evolution',
    text: 'Warranty, maintenance and continuous improvement.',
    deliverable: 'Defined response times and an evolution plan.',
    time: 'Ongoing',
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

// Sample testimonials (provisional): replace with real testimonials before publishing.
/* Client testimonials (collected by the EME team; pending copy in square brackets).
   Video testimonial: add video with the path to an .mp4 in public/testimonios/
   or a YouTube link, and optionally poster with a cover image. */
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
    quote: '[Testimonial pending]',
    name: '[Name]',
    role: '[Role]',
  },
  {
    id: 2,
    company: 'Genial Foods',
    logo: '/clientes/color/genial-foods.png',
    quote: '[Testimonial pending]',
    name: '[Name]',
    role: '[Role]',
  },
  {
    id: 3,
    company: 'Country Club',
    logo: '/clientes/color/country-club.png',
    quote: '[Testimonial pending]',
    name: '[Name]',
    role: '[Role]',
  },
  {
    id: 4,
    company: 'Quirulaser',
    logo: '/clientes/color/quirulaser.png',
    quote: '[Testimonial pending]',
    name: '[Name]',
    role: '[Role]',
  },
  {
    id: 5,
    company: 'Importex',
    logo: '/clientes/color/importex.png',
    quote: '[Testimonial pending]',
    name: '[Name]',
    role: '[Role]',
  },
  {
    id: 6,
    company: 'CargoNet',
    logo: '/clientes/color/cargonet.png',
    quote: '[Testimonial pending]',
    name: '[Name]',
    role: '[Role]',
  },
  {
    id: 7,
    company: 'Templado',
    quote: '[Testimonial pending]',
    name: '[Name]',
    role: '[Role]',
  },
  {
    id: 8,
    company: 'Carnes Santacruz',
    logo: '/clientes/carnes-santacruz.svg',
    quote: '[Testimonial pending]',
    name: '[Name]',
    role: '[Role]',
  },
  {
    id: 9,
    company: 'Watertown',
    logo: '/clientes/color/watertown.png',
    quote: '[Testimonial pending]',
    name: '[Name]',
    role: '[Role]',
  },
];

export const faqs = [
  {
    q: 'How much does a project cost?',
    a: 'It depends on the scope. As a reference, a landing page starts at COP 2,000,000, an AI agent at COP 2,700,000, custom software at COP 15,000,000 and an ERP at COP 45,000,000. After the diagnostic, you get a proposal with price and timeline.',
  },
  {
    q: 'How long does it take?',
    a: 'A landing page, 3 days. An AI agent, 4 weeks. Custom software, 1 to 2 months, and an ERP, 4 to 8 months, with partial releases every two weeks.',
  },
  {
    q: 'Who owns the code?',
    a: 'You do. When the project ends, you get the source code, documentation and access credentials.',
  },
  {
    q: 'What happens after launch?',
    a: 'Every project includes a 3-month warranty. After that, you can sign up for a support and evolution plan.',
  },
  {
    q: 'Do you work with the system I already have?',
    a: 'Yes. Most of our projects connect to an existing ERP, CRM or accounting system.',
  },
  {
    q: 'Do you work with companies outside Colombia?',
    a: 'Yes. We work with clients in Latin America and the United States, in Spanish and English.',
  },
];

// EME social accounts. Instagram and LinkedIn come from e-me.co; TikTok uses the same handle and is pending confirmation.
export const socials = [
  { name: 'Instagram', href: 'https://www.instagram.com/emegrowthagency/' },
  { name: 'TikTok', href: 'https://www.tiktok.com/@emegrowthagency' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/company/emegrowthagency' },
];

export const contact = {
  whatsapp: '+57 304 288 2759',
  whatsappHref: 'https://wa.me/573042882759',
  email: 'comercial@e-me.co',
  address: 'Calle 107 # 50-69, Hotel Sky Collection, office 1408, Barranquilla',
};
