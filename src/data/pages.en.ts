// Inner-page copy, taken from the brief "EME Dev: site map and copy" (English version).
// Bracketed items are data EME must complete or confirm before publishing.
import type { ServiceKey } from './content';

export interface QA {
  q: string;
  a: string;
}

export interface SolutionPage {
  slug: string;
  key: ServiceKey;
  name: string;
  seoTitle: string;
  seoDesc: string;
  title: string;
  subtitle: string;
  problem?: string;
  includes: string[];
  useCases?: string[];
  security?: string;
  whenFits?: string;
  integrates?: string[];
  packages?: { name: string; text: string }[];
  faqs?: QA[];
}

export const solutionPages: SolutionPage[] = [
  {
    slug: 'agentes-ia',
    key: 'agentes',
    name: 'AI agents',
    seoTitle: 'AI agents for businesses | EME Dev',
    seoDesc:
      'AI agents for collections, customer service and sales over WhatsApp, voice and web, connected to your systems. See case studies and book a diagnostic.',
    title: 'AI agents that do the work, not just answer questions.',
    subtitle:
      'We design agents that collect receivables, serve customers, qualify leads and book appointments over WhatsApp, voice or web. Connected to your systems, with clear rules and human oversight.',
    problem:
      'Your team spends hours on repetitive tasks: chasing payments, answering the same questions, moving data from one system to another. A generic chatbot won’t fix that, because it doesn’t know your business and can’t act inside your systems.',
    includes: [
      'Process mapping and a clear definition of what the agent decides and what it escalates to a person.',
      'Connection to your CRM, ERP, calendar and WhatsApp Business API.',
      'A knowledge base built on your company’s information.',
      'A dashboard to review conversations, results and costs.',
      'Testing with real cases before going live.',
      'Monitoring and fine-tuning after launch.',
    ],
    useCases: [
      'Collections: reminders, payment agreements and receivables follow-up.',
      'Customer service: answers, order status, request intake.',
      'Sales: lead qualification, quotes and scheduling.',
      'Recruiting: initial screening and interview scheduling.',
      'Internal operations: questions about documents, policies and inventory.',
    ],
    security:
      'Your data is never used to train third-party models. The agent only accesses what you authorize, and every action is logged.',
    faqs: [
      {
        q: 'How is it different from a chatbot?',
        a: 'A chatbot answers. An agent queries your systems, makes decisions within the rules you set and takes action, such as recording a payment agreement or booking an appointment.',
      },
      {
        q: 'What happens if the agent doesn’t know something?',
        a: 'It hands the conversation off to someone on your team, with full context.',
      },
      {
        q: 'How do you measure results?',
        a: 'We agree on the metric with you before we start: receivables recovered, response time, appointments booked or cases resolved without human intervention.',
      },
    ],
  },
  {
    slug: 'software-a-la-medida',
    key: 'software',
    name: 'Custom software',
    seoTitle: 'Custom software development in Colombia | EME Dev',
    seoDesc:
      'We build the system your operation needs, with releases every two weeks and a clear scope from day one.',
    title: 'The system your operation needs, and that you won’t find in any catalog.',
    subtitle:
      'We design and build software for the processes that set you apart: the ones that live in Excel, in email threads or in a system you’ve outgrown.',
    problem:
      'Off-the-shelf products force you to bend your process to fit the tool. When that process is exactly what makes you competitive, you lose more than you save.',
    includes: [
      'Process diagnostic and scope definition.',
      'Experience design and a clickable prototype.',
      'Cloud architecture built to scale.',
      'Development with releases every two weeks.',
      'Testing, data migration and training.',
      'Documentation and handover of the source code.',
    ],
    whenFits:
      'It makes sense if the process is unique to your business, if you pay for many licenses with features you don’t use, or if no product integrates with what you already have. It doesn’t make sense for standard needs like accounting or payroll, where an off-the-shelf product is the better choice. In the diagnostic, we’ll tell you which one applies to you.',
    faqs: [
      {
        q: 'Is custom software more expensive than SaaS?',
        a: 'Up front, yes. Over three to five years it usually costs less if you’re paying per-user licenses today or if the SaaS forces you into manual workarounds.',
      },
      {
        q: 'Can I start small?',
        a: 'Yes. We recommend a first version with the essentials, in use within 3 months, and growing from there.',
      },
    ],
  },
  {
    slug: 'erp',
    key: 'erp',
    name: 'Custom ERP',
    seoTitle: 'Custom ERP for businesses | EME Dev',
    seoDesc:
      'Inventory, purchasing, sales, receivables and finance in a single system, integrated with electronic invoicing.',
    title: 'An ERP that adapts to your company, not the other way around.',
    subtitle:
      'Inventory, purchasing, sales, receivables, production and finance in a single system, with the modules you need and connected to electronic invoicing.',
    problem:
      'Information is scattered across spreadsheets, the accounting system and the memory of two or three people. Closing the month takes days and nobody fully trusts the numbers.',
    includes: [
      'Modules based on your operation: inventory, purchasing, sales, receivables, production, projects, human resources.',
      'Integration with your accounting system and with DIAN electronic invoicing through your authorized technology provider.',
      'Dashboards with real-time KPIs.',
      'Roles, permissions and change logs.',
      'Historical data migration.',
      'AI assistant to query your information in plain language.',
    ],
    faqs: [
      {
        q: 'Does it replace my accounting system?',
        a: 'Not necessarily. Usually we integrate with the one you already have and cover what it doesn’t.',
      },
      {
        q: 'Can it be rolled out in stages?',
        a: 'Yes. We start with the module that hurts the most and add the rest without disrupting operations.',
      },
    ],
  },
  {
    slug: 'apps-moviles',
    key: 'apps',
    name: 'Mobile apps',
    seoTitle: 'iOS and Android mobile app development | EME Dev',
    seoDesc:
      'We design, develop and publish apps for your customers or your field team. Learn about the process and costs.',
    title: 'Mobile apps your customers and your team use every day.',
    subtitle:
      'We design, build and publish iOS and Android apps, connected to your systems and ready to grow.',
    includes: [
      'Experience and interface design.',
      'iOS and Android development.',
      'Backend, admin panel and notifications.',
      'Payments, maps, camera and offline mode, as needed.',
      'Publishing on the App Store and Google Play.',
      'Usage analytics and an improvement plan.',
    ],
    useCases: [
      'Customer apps: orders, appointments, loyalty, self-service.',
      'Field team apps: visits, inspections, deliveries, construction progress.',
      'New digital products and MicroSaaS.',
    ],
    faqs: [
      {
        q: 'How much does an app cost?',
        a: 'It depends on the features. A first version starts at COP 35,000,000 and takes 2 to 3 months.',
      },
      {
        q: 'Do I need an app, or is a web application enough?',
        a: 'If you don’t need the camera, continuous GPS or offline use, a web application is usually enough and costs less. We review it in the diagnostic.',
      },
    ],
  },
  {
    slug: 'aplicaciones-web',
    key: 'web',
    name: 'Web applications',
    seoTitle: 'Web application and SaaS development | EME Dev',
    seoDesc: 'Fast, secure portals, platforms and SaaS products, ready to scale.',
    title: 'Web platforms to run, sell and serve online.',
    subtitle:
      'Customer portals, internal platforms, marketplaces and SaaS products, built to be fast, secure and easy to maintain.',
    includes: [
      'Experience design and prototype.',
      'Development with modern technologies and cloud architecture.',
      'Users, roles, payments and subscriptions.',
      'Integration with your systems.',
      'Load and security testing.',
      'Monitoring and support.',
    ],
    useCases: [
      'Self-service customer or vendor portal.',
      'Internal platform that replaces Excel-based processes.',
      'SaaS or MicroSaaS product to monetize your know-how.',
      'Quoting tools, configurators and booking systems.',
    ],
  },
  {
    slug: 'integraciones',
    key: 'integraciones',
    name: 'Integrations',
    seoTitle: 'Systems and API integration | EME Dev',
    seoDesc:
      'We connect ERP, CRM, electronic invoicing, payments and WhatsApp so your data flows without double entry.',
    title: 'Your systems, connected. No double entry.',
    subtitle:
      'We integrate ERP, CRM, electronic invoicing, payment gateways, e-commerce and WhatsApp so data automatically gets where it’s needed.',
    problem:
      'Each system works fine on its own, but someone has to copy information from one to the next. That costs hours, creates errors and leaves your data unready to take advantage of AI.',
    includes: [
      'A map of your systems and data flows.',
      'API and integration development.',
      'Real-time or scheduled synchronization.',
      'Error handling, alerts and a log of every transaction.',
      'Technical documentation.',
    ],
    integrates: [
      'ERP and accounting systems: Siigo, SAP Business One, Odoo, World Office and Alegra.',
      'Electronic invoicing and payroll (DIAN).',
      'Payment gateways: Wompi, PayU, Mercado Pago and Stripe.',
      'CRM: Achieve Apex, HubSpot and Salesforce.',
      'WhatsApp Business API, email and telephony.',
      'E-commerce: Shopify and WooCommerce.',
    ],
    faqs: [
      {
        q: 'Why integrate before thinking about AI?',
        a: 'Because AI works with the data you give it. Companies with integrated systems are 4.5 times more likely to use AI than those with low digitalization, according to CINTEL.',
      },
    ],
  },
  {
    slug: 'sitios-web',
    key: 'sitios',
    name: 'Websites, e-commerce & landing pages',
    seoTitle: 'Website design and development | EME Dev',
    seoDesc:
      'Fast, measurable corporate sites, online stores and landing pages optimized for Google and AI search engines.',
    title: 'Websites that load fast, read clearly and convert.',
    subtitle:
      'We design and develop corporate sites, online stores and landing pages built to be found on Google and AI search engines, and to turn visits into leads.',
    includes: [
      'Conversion-focused structure and copy.',
      'Custom, mobile-responsive design.',
      'Speed optimization and technical SEO.',
      'Structured content to appear in AI answers.',
      'Forms connected to your CRM and WhatsApp.',
      'Analytics and conversion event tracking.',
      'A content management system so your team can make edits without depending on us.',
    ],
    packages: [
      { name: 'Landing page', text: 'A single page for a campaign or service. From COP 2,000,000, in 3 days.' },
      { name: 'Corporate site', text: 'Up to 15 pages. From COP 8,500,000, in 6 weeks.' },
      { name: 'Online store', text: 'Catalog, payments and shipping. From COP 8,000,000, in 4 weeks.' },
    ],
  },
];

/* Industries v3: named by process, not by sector. Two-name rule: `name` (general) goes in
   menu, H1, buttons, cards and footer; `seoTitle`/`seoDesc` and the slug use the sector name. */
export interface IndustryPage {
  slug: string;
  name: string;
  line: string;
  card: string;
  visual: ServiceKey;
  seoTitle: string;
  seoDesc: string;
  title: string;
  subtitle: string;
  problems: string[];
  solutionsTitle: string;
  solutions: string[];
  sectors: { title: string; text: string }[];
  note?: { title: string; text: string };
  caseSlug: string | null;
  trust?: { title: string; names: string[] };
}

export const industryPages: IndustryPage[] = [
  {
    slug: 'operacion-y-logistica',
    name: 'Operations and tracking',
    line: 'Shipping, freight, mailboxes, repair shops, equipment rental',
    card: 'For businesses where something comes in, gets processed and goes out: shipping, freight, mailboxes, repair shops, labs, equipment rental.',
    visual: 'integraciones',
    seoTitle: 'Software for shipping, freight and mailbox companies | EME Dev',
    seoDesc:
      'Quotes, service orders, tracking and collections for couriers, mailbox services, repair shops and equipment rental.',
    title: 'Software for businesses where something comes in, moves and gets delivered.',
    subtitle:
      'Quotes, service orders, tracking, deliveries and collections in a single system.',
    problems: [
      'Quoting every shipment by hand, with rates that change by weight, volume, origin and destination.',
      'Customers who call or text to ask where their package is.',
      'Operations scattered across WhatsApp, Excel and email.',
      'Payments that get lost between delivery and invoicing.',
      'Incidents (delays, customs, damage) that nobody logs and that surface when the customer complains.',
    ],
    solutionsTitle: 'Solutions for the industry',
    solutions: [
      'A quote calculator with your rates, by weight, volume and route.',
      'Service orders and tracking from pickup to delivery.',
      'A portal and app so customers can check their shipment without calling.',
      'Mailbox management: pre-alerts, receiving, consolidation and dispatch.',
      'Incident logging and receivables control.',
      // TODO: confirm with EME the scope of the carrier and customs integration.
      'Integration with carriers and customs processes.',
    ],
    sectors: [
      { title: 'If you run a courier, mailbox service or freight agency.', text: 'Pre-alerts, receiving, consolidation, dispatch and tracking all the way to delivery.' },
      { title: 'If you run a repair shop or technical service.', text: 'The order comes in, moves through stages, a quote gets approved and it’s delivered with an invoice.' },
      { title: 'If you rent equipment or machinery.', text: 'Check-out, usage time, return, equipment condition and billing by period.' },
      { title: 'If you operate an asset with check-in and check-out.', text: 'Parking lots, warehouses, yards: occupancy, length of stay and billing.' },
      { title: 'If you process samples or parts.', text: 'Labs and diagnostic centers: intake, processing, results and delivery.' },
    ],
    // TODO: pending case study (Rapibox, Importex or Cargonet). Do not use fictional cases.
    caseSlug: null,
    trust: {
      title: 'Industry backing',
      names: ['Puerto de Barranquilla', 'Zona Franca La Cayena', 'ProBarranquilla'],
    },
  },
  {
    slug: 'distribucion-y-mayoristas',
    name: 'Orders and receivables',
    line: 'Distributors, trading companies, wholesalers, importers',
    card: 'For businesses that sell to other businesses and have field sales reps: distributors, trading companies, wholesalers, importers.',
    visual: 'erp',
    seoTitle: 'Software for distributors and wholesalers | EME Dev',
    seoDesc: 'Orders, receivables, field sales reps and product turnover in a single system.',
    title: 'Software for businesses that sell, ship and collect every day.',
    subtitle:
      'Orders, field sales reps, receivables and product turnover in one system your sales and logistics teams use at the same time.',
    problems: [
      'Sales reps take orders without knowing how much the customer owes.',
      'Overdue receivables discovered too late.',
      'Orders that come in through WhatsApp and someone has to type in.',
      'Nobody knows for sure which products move and which ones sit still.',
      'Large quotes that take hours of data entry.',
    ],
    solutionsTitle: 'Solutions for the industry',
    solutions: [
      'An app for your customers: orders, status, balance and documents.',
      'An app for your sales reps: overdue accounts, new orders and product turnover.',
      'An operations system: orders, dispatch, inventory and invoicing.',
      'An AI agent that reads emails with quotes and creates purchase orders automatically.',
      'Dashboards for turnover, margins and performance by sales rep.',
    ],
    sectors: [
      { title: 'If you sell food or perishable goods.', text: 'Turnover, batches, expiration dates and dispatch by route.' },
      { title: 'If you sell raw materials or industrial supplies.', text: 'Long quotes, technical data sheets and AI-generated purchase orders.' },
      { title: 'If you sell spare parts or equipment.', text: 'A catalog with part numbers, compatibility and real-time availability.' },
      { title: 'If you have field sales reps.', text: 'An app that shows overdue accounts before the order is taken.' },
      { title: 'If you sell to chains or large distributors.', text: 'A portal where your customer checks orders, balance and documents without calling.' },
    ],
    // TODO: pending case study (Genial Foods). Do not use fictional cases.
    caseSlug: null,
  },
  {
    slug: 'salud-y-servicios',
    name: 'Scheduling and care',
    line: 'Clinics, aesthetic centers, gyms, medical offices',
    card: 'For businesses that sell time and appointments: clinics, aesthetic centers, gyms, medical offices, service shops.',
    visual: 'agentes',
    seoTitle: 'Software for clinics and aesthetic centers | EME Dev',
    seoDesc: 'Scheduling, patient follow-up and session package tracking.',
    title: 'Software for businesses that sell time and appointments.',
    subtitle:
      'Scheduling, patient follow-up and operations control, without your team living on the phone.',
    problems: [
      'A paper calendar or a spreadsheet only one person understands.',
      'Missed appointments because nobody confirms.',
      'Treatment history and progress scattered across several places.',
      'Session packages and payments tracked by hand.',
    ],
    solutionsTitle: 'Solutions for the industry',
    solutions: [
      'Online and WhatsApp scheduling, with automatic reminders.',
      'History of sessions, treatments and patient progress.',
      'Tracking of packages, used sessions and payments.',
      'Occupancy dashboard by professional and by location.',
      'Patient portal: appointments, results and payments.',
    ],
    sectors: [
      { title: 'If you run a clinic or a medical office.', text: 'Scheduling by professional and location, patient history and reminders.' },
      { title: 'If you sell treatments by session.', text: 'Aesthetic and rehab centers: package tracking, used sessions and balances.' },
      { title: 'If you manage memberships.', text: 'Gyms, clubs and academies: recurring billing, attendance and renewals.' },
      { title: 'If you provide home or on-route services.', text: 'Technician assignment, arrival window and on-site service closeout.' },
    ],
    // TODO: confirm with EME the health-data protection practices described here.
    note: {
      title: 'Sensitive data',
      text: 'Health data has special protection under Colombia’s Law 1581 of 2012. We design every solution with access controls, encryption and query logging.',
    },
    // TODO: pending case study (Quirulaser). Do not use fictional cases.
    caseSlug: null,
    trust: {
      title: 'They also trust us',
      names: ['Clínica La Asunción', 'Sociedad Colombiana de Pediatría', 'Cajacopi'],
    },
  },
  {
    slug: 'educacion-y-formacion',
    name: 'Education and students',
    line: 'Universities, technical schools, academies, clubs',
    card: 'For institutions that educate people: universities, technical schools, academies, clubs.',
    visual: 'apps',
    seoTitle: 'Platforms for academies and universities | EME Dev',
    seoDesc: 'Your students see classes, grades, progress and payments on their phone.',
    title: 'Platforms for institutions that educate people.',
    subtitle:
      'Your students see their classes, grades, progress and payments on their phone. Your team sees everything else.',
    problems: [
      'Students who ask on WhatsApp for their schedule, grade or balance.',
      'Student receivables kept in spreadsheets.',
      'Only the teacher knows how each student is progressing.',
      'Enrollment and seats managed by hand.',
    ],
    solutionsTitle: 'Solutions for the industry',
    solutions: [
      'A student app: courses, classes, syllabus, grades, progress and payments.',
      'Management of programs, cohorts, schedules and seats.',
      'Student receivables control and online payments.',
      'A teacher dashboard to record attendance and progress.',
      'Automatic certificates and letters.',
    ],
    sectors: [
      { title: 'If you are a university or technical school.', text: 'Programs, cohorts, seats, grades and student receivables.' },
      { title: 'If you run an academy or language school.', text: 'Levels, progress by student, certificates and online payments.' },
      { title: 'If you teach a practice or a sport.', text: 'Syllabus, progress by skill and attendance, as at Watertown.' },
      { title: 'If you train your own team.', text: 'Corporate training: learning paths, assessments and internal certification.' },
    ],
    // TODO: pending case study (Academia Sandra or Watertown). Do not use fictional cases.
    caseSlug: null,
    trust: {
      title: 'They also trust us',
      names: ['ICSA', 'Universidad Metropolitana', 'Befuturo'],
    },
  },
];


export const processPage = {
  seoTitle: 'How we work and what it costs | EME Dev',
  seoDesc: 'Stages, engagement models and investment ranges for software and AI projects.',
  title: 'How we work',
  subtitle: 'A clear process so you always know where your project stands, what’s next and what it costs.',
  stages: [
    {
      name: 'Diagnostic',
      time: '1 to 2 weeks',
      text: 'Meetings with the people who run the process, plus a review of systems and data.',
      gets: 'A scope document, priorities, timeline and cost proposal.',
    },
    {
      name: 'Design',
      time: '2 to 4 weeks',
      text: 'Flows, clickable prototype and technical architecture.',
      gets: 'A prototype you can test with your team before investing in development.',
    },
    {
      name: 'Build',
      time: 'Depends on scope',
      text: 'Two-week sprints, with a demo at the end of each one.',
      gets: 'Working progress in a staging environment and a dashboard with the project status.',
    },
    {
      name: 'Launch',
      time: '',
      text: 'Final testing, data migration, training and go-live.',
      gets: 'The system in use, user manuals and access credentials.',
    },
    {
      name: 'Support and evolution',
      time: '',
      text: 'Warranty, monitoring and improvements.',
      gets: 'Defined response times and an evolution roadmap.',
    },
  ],
  ranges: [
    { type: 'Landing page', from: 'COP 2,000,000', time: '3 days' },
    { type: 'Corporate site', from: 'COP 8,500,000', time: '6 weeks' },
    { type: 'Online store', from: 'COP 8,000,000', time: '4 weeks' },
    { type: 'AI agent', from: 'COP 2,700,000', time: '4 weeks' },
    { type: 'Integration', from: 'COP 4,500,000', time: '5 days' },
    { type: 'Mobile app', from: 'COP 35,000,000', time: '2 to 3 months' },
    { type: 'ERP', from: 'COP 45,000,000', time: '4 to 8 months' },
    { type: 'Custom software', from: 'COP 15,000,000', time: '1 to 2 months' },
  ],
  commitments: [
    'A named project lead with a direct line.',
    'A demo every two weeks.',
    'Scope changes quoted and approved before any work begins.',
    'Handover of code, documentation and access at closeout.',
  ],
};

export const securityPage = {
  seoTitle: 'Security & data | EME Dev',
  seoDesc:
    'Confidentiality, code ownership, personal data protection, AI usage and infrastructure in EME Dev projects.',
  title: 'How we protect your information and your investment',
  subtitle:
    'What your IT, legal or procurement team needs to know before hiring us.',
  items: [
    {
      name: 'Confidentiality',
      text: 'We sign a non-disclosure agreement before receiving any information from your company. Access to your data is limited to the team assigned to the project.',
    },
    {
      name: 'Code ownership',
      text: 'The code developed for your project is yours. At closeout we hand over the repository, documentation and credentials.',
    },
    {
      name: 'Personal data protection',
      text: 'We comply with Colombia’s Law 1581 of 2012 and its implementing regulations. When we process personal data on your behalf, we formalize it in a data transfer agreement.',
    },
    {
      name: 'Use of artificial intelligence',
      text: 'We use models from providers such as OpenAI and AWS under enterprise terms, where your data is not used to train models. We tell you which model is used, what data it receives and where it is processed.',
    },
    {
      name: 'Infrastructure',
      text: 'We deploy on AWS or Google Cloud, in your account or ours. Encryption in transit and at rest, backups, and separate staging and production environments.',
    },
    {
      name: 'Secure development',
      text: 'Code review, version control, access management and testing before every deployment.',
    },
    {
      name: 'Continuity',
      text: 'Technical documentation and knowledge transfer so you don’t depend on any one person, or on us.',
    },
  ],
  cta: 'Request our security documentation',
};

export const teamPage = {
  seoTitle: 'Team | EME Dev',
  seoDesc:
    'An engineering, product and design team based in Barranquilla, with clients across Latin America and the United States.',
  title: 'Who builds your project',
  subtitle:
    'An engineering, product and design team based in Barranquilla, with clients across Latin America and the United States.',
  people: [
    { name: 'Santiago Mejía', role: 'Director of EME Dev', bio: '15 years building software for businesses. He has led more than 60 ERP, app and integration projects.' },
    { name: 'Daniela Ortiz', role: 'Architecture Lead', bio: 'Cloud architecture and distributed systems. AWS Certified Solutions Architect – Professional.' },
    { name: 'Andrés Villalba', role: 'AI Lead', bio: 'Conversational agents and language models in production for collections, healthcare and sales.' },
    { name: 'Valentina Cárdenas', role: 'Product and Design Lead', bio: 'Product design and user experience for B2B platforms and mobile apps.' },
  ],
  numbers: [
    { value: 16, label: 'developers' },
    { value: 4, label: 'designers' },
    { value: 5, label: 'project leads' },
    { value: 12, label: 'certifications' },
  ],
  certs: [
    'AWS Partner Network',
    'OpenAI',
    'Meta Business Partner',
    'Shopify Partners',
    'Claude Code',
  ],
  parent:
    'EME Dev is the technology unit of EME, a company with 12 years in business and more than 783 clients.',
};

export const resourcesPage = {
  seoTitle: 'Resources | EME Dev',
  seoDesc: 'Guides to make better technology decisions: costs, custom software, AI agents and ERP.',
  title: 'Guides to make better technology decisions',
  articles: [
    { title: 'How much does it cost to develop an app in Colombia in 2026?', tag: 'Mobile apps' },
    { title: 'Custom software or SaaS: how to decide.', tag: 'Custom software' },
    { title: 'What an AI agent is and how it differs from a chatbot.', tag: 'AI agents' },
    {
      title: 'How to choose a software development company: ten questions to ask your vendor.',
      tag: 'Vendors',
    },
    { title: 'Before AI, get your data in order: where to start.', tag: 'Data' },
    { title: 'Custom ERP or commercial ERP: the pros and limits of each.', tag: 'ERP' },
  ],
};

export const diagnosticPage = {
  seoTitle: 'Free diagnostic | EME Dev',
  seoDesc:
    'Tell us what you want to solve. We’ll schedule a 30-minute call, free and with no commitment.',
  title: 'Tell us what you want to solve',
  subtitle:
    'We’ll get back to you in less than one business day to schedule a 30-minute call. Free and with no commitment.',
  steps: [
    'We review your case before the call.',
    'On the call, we get to know the problem and give you initial guidance.',
    'If it makes sense to move forward, you get a proposal with scope, timeline and investment.',
  ],
  needs: [
    'AI agent',
    'Custom software',
    'ERP',
    'Mobile app',
    'Web application',
    'Integration',
    'Website',
    'I’m not sure',
  ],
  sizes: ['1 to 10', '11 to 50', '51 to 200', 'More than 200'],
  budgets: ['Less than COP 10,000,000', 'COP 10 to 30 million', 'COP 30 to 80 million', 'More than COP 80 million', 'I don’t know yet'],
};

export const casesPage = {
  seoTitle: 'Software and AI case studies | EME Dev',
  seoDesc:
    'Real projects with measurable results in operations and logistics, distribution, healthcare and education.',
  title: 'Projects with measurable results',
  subtitle: 'Filter by industry or by solution type.',
};

/* Projects by industry (v3 document, client inventory by industry).
   software = true when the work includes software or an app (highlighted in the table). */
export interface IndustryProject {
  client: string;
  what: string;
  work: string;
  software: boolean;
}

export const industryProjects: Record<string, IndustryProject[]> = {
  'operacion-y-logistica': [
    { client: 'Rapibox', what: 'Logistics and transportation services', work: 'Operations software + app', software: true },
    { client: 'Importex', what: 'Logistics and transportation services', work: 'Operations software', software: true },
    { client: 'CargoNet', what: 'Logistics and transportation services', work: 'Operations software + app', software: true },
    { client: 'Genial Foods', what: 'Global meat products trading', work: 'Software + App', software: true },
    { client: 'Puerto de Barranquilla', what: 'Port operations', work: 'Website', software: false },
    { client: 'Zona Franca La Cayena', what: 'Commercial, logistics and foreign trade operations', work: 'Website', software: false },
    { client: 'ProBarranquilla', what: 'Foreign investment promotion services', work: 'Website', software: false },
  ],
  'distribucion-y-mayoristas': [
    { client: 'Genial Foods', what: 'Global meat products trading', work: 'Software + App', software: true },
    { client: 'Estrategia LTDA', what: 'HORECA products', work: 'Operations software', software: true },
    { client: 'Tusim', what: 'Worldwide SIM card and eSIM sales', work: 'Operations software', software: true },
    { client: 'Avantika', what: 'Chemical products distribution', work: 'Software + AI Agent', software: true },
    { client: 'Carnes Santacruz', what: 'Meat products', work: 'Mobile App + Integrations', software: true },
    { client: 'Quidem', what: 'Raw materials and chemical solutions for coatings and mortars', work: 'E-commerce + AI Agent + Integrations', software: true },
    { client: 'GSM', what: 'Heavy machinery spare parts', work: 'E-commerce + AI Agent + Integrations + Operations software', software: true },
    { client: 'Retri', what: 'Heavy machinery rental', work: 'E-commerce + AI Agent + Integrations', software: true },
    { client: 'HYK Colombia', what: 'Technology', work: 'Website + store', software: false },
    { client: 'Soluzioni', what: 'Office furniture', work: 'Website + store', software: false },
    { client: 'Pintumax', what: 'Paints', work: 'Online store', software: false },
  ],
  'salud-y-servicios': [
    { client: 'Quirulaser', what: 'Aesthetic services', work: 'Scheduling and follow-up software', software: true },
    { client: 'Watertown', what: 'Swimming lessons', work: 'Scheduling, payments and progress app', software: true },
    { client: 'Clínica La Asunción', what: 'Clinic', work: 'Website', software: false },
    { client: 'Issa Abuchaibe', what: 'Medical services', work: 'Website', software: false },
    { client: 'Sociedad Colombiana de Pediatría', what: 'Medical association', work: 'Website', software: false },
    { client: 'Cajacopi', what: 'Family compensation fund', work: 'Website', software: false },
  ],
  'educacion-y-formacion': [
    { client: 'Academia Sandra', what: 'Beauty academic programs', work: 'App: courses, grades, payments', software: true },
    { client: 'Watertown', what: 'Swimming lessons', work: 'App: scheduling, syllabus, progress, payments', software: true },
    { client: 'Universidad de la Costa', what: 'University', work: 'AI student management', software: true },
    { client: 'ICSA', what: 'Technical, technological and professional programs', work: 'Website', software: false },
    { client: 'Universidad Metropolitana', what: 'University', work: 'Website', software: false },
    { client: 'Befuturo', what: 'Academic courses', work: 'Website', software: false },
  ],
};
