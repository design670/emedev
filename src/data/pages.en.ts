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
        a: 'It depends on the features. A first version starts at COP 35,000,000 and takes 3 to 5 months.',
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
      { name: 'Landing page', text: 'A single page for a campaign or service. From COP 3,500,000, in 3 weeks.' },
      { name: 'Corporate site', text: 'Up to 10 pages. From COP 9,000,000, in 6 weeks.' },
      { name: 'Online store', text: 'Catalog, payments and shipping. From COP 14,000,000, in 8 weeks.' },
    ],
  },
];

export interface IndustryPage {
  slug: string;
  name: string;
  visual: ServiceKey;
  seoTitle: string;
  seoDesc: string;
  title: string;
  subtitle: string;
  problems: string[];
  solutionsTitle: string;
  solutions: string[];
  note?: { title: string; text: string };
  caseSlug: string;
  logos?: string[];
}

export const industryPages: IndustryPage[] = [
  {
    slug: 'constructoras',
    name: 'Construction companies',
    visual: 'web',
    seoTitle: 'Software for construction companies | EME Dev',
    seoDesc:
      'Sales management systems, quoting tools, buyer portals and AI agents for sales offices and receivables.',
    title: 'Technology for construction companies that want to sell more and keep tighter control of their projects.',
    subtitle:
      'Sales management systems, quoting tools, buyer portals and AI agents for sales offices and receivables.',
    problems: [
      'Leads that get lost between the sales office, the agent and the CRM.',
      'Receivables and collections managed by hand.',
      'Buyers calling to ask about their account balance or construction progress.',
      'Unit inventory out of sync across channels.',
    ],
    solutionsTitle: 'Solutions for the industry',
    solutions: [
      'Online quoting tool and unit availability.',
      'Buyer portal: payments, documents and construction progress.',
      'AI agent for lead handling and receivables follow-up.',
      'Integration between CRM, ERP and the trust company.',
    ],
    caseSlug: 'constructora-litoral',
  },
  {
    slug: 'salud',
    name: 'Healthcare',
    visual: 'agentes',
    seoTitle: 'Software for clinics and medical centers | EME Dev',
    seoDesc:
      'Scheduling, reminders, patient portals and AI agents that reduce no-shows and take work off your administrative team.',
    title: 'Software for clinics, medical centers and specialists.',
    subtitle:
      'Scheduling, reminders, patient portals and AI agents that reduce no-shows and take work off your administrative team.',
    problems: [
      'Missed appointments due to lack of confirmation.',
      'Phone lines jammed with the same questions.',
      'Patient information scattered across systems.',
      'Slow authorization and billing processes.',
    ],
    solutionsTitle: 'Solutions for the industry',
    solutions: [
      'Online and WhatsApp scheduling, with automatic reminders.',
      'AI agent for patient service and guidance.',
      'Patient portal: results, appointments and payments.',
      'Integration with your electronic health record and billing systems.',
    ],
    note: {
      title: 'Sensitive data',
      text: 'Health data has special protection under Colombia’s Law 1581 of 2012. We design every solution with access control, encryption and query logging.',
    },
    caseSlug: 'red-medica-andina',
  },
  {
    slug: 'restaurantes',
    name: 'Restaurants',
    visual: 'apps',
    seoTitle: 'Software for restaurants | EME Dev',
    seoDesc:
      'Direct ordering, reservations, loyalty and WhatsApp automation, connected to your point of sale.',
    title:
      'Technology for restaurants and food businesses that want to sell more without relying on third parties.',
    subtitle:
      'Direct ordering, reservations, loyalty and WhatsApp automation, connected to your point of sale.',
    problems: [
      'High commissions on delivery platforms.',
      'Customers who don’t come back because nobody reaches out.',
      'Reservations and WhatsApp orders handled by hand.',
      'Inventory and sales in systems that don’t talk to each other.',
    ],
    solutionsTitle: 'Solutions for the industry',
    solutions: [
      'Your own web and WhatsApp ordering channel.',
      'AI agent for reservations and orders.',
      'Loyalty program and automated campaigns for your customer base.',
      'Integration with your point of sale and inventory.',
    ],
    caseSlug: 'grupo-fogon',
  },
  {
    slug: 'corporativo',
    name: 'Corporate',
    visual: 'integraciones',
    seoTitle: 'Enterprise systems modernization | EME Dev',
    seoDesc:
      'Systems modernization, governed AI agents, integrations and dedicated teams that work to your standards.',
    title: 'An engineering team for the projects your IT department can’t get to.',
    subtitle:
      'Systems modernization, governed AI agents, integrations and dedicated teams that work to your standards.',
    problems: [
      'Legacy systems that hold back new projects.',
      'AI pilots that never make it to production.',
      'A shortage of developers with AI experience.',
      'Vendors that deliver and disappear.',
    ],
    solutionsTitle: 'How we work with large companies',
    solutions: [
      'Dedicated teams or fixed-scope projects.',
      'Non-disclosure agreements, service level agreements and technical documentation.',
      'Work on your cloud and under your security policies.',
      'Knowledge transfer to your in-house team.',
    ],
    caseSlug: 'distribuidora-nexo',
    logos: ['Almar', 'Brilla', 'PRB', 'FIU', 'Cajacopi', 'Monark', 'B-inner', 'Secosa'],
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
    { type: 'Landing page', from: 'COP 3,500,000', time: '3 weeks' },
    { type: 'Corporate site', from: 'COP 9,000,000', time: '6 weeks' },
    { type: 'AI agent', from: 'COP 18,000,000', time: '6 to 10 weeks' },
    { type: 'Integration', from: 'COP 12,000,000', time: '4 to 8 weeks' },
    { type: 'Mobile app (first version)', from: 'COP 35,000,000', time: '3 to 5 months' },
    { type: 'Custom software or ERP', from: 'COP 45,000,000', time: '4 to 8 months' },
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
    'Pinterest Partners',
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
    'Real projects with measurable results in construction, healthcare, restaurants and corporate companies.',
  title: 'Projects with measurable results',
  subtitle: 'Filter by industry or by solution type.',
};
