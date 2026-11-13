// Copy de las páginas internas, tomado del brief "EME Dev: mapa del sitio y copy".
// Los corchetes son datos que EME debe completar o confirmar antes de publicar.
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
    name: 'Agentes de IA',
    seoTitle: 'Agentes de IA para empresas | EME Dev',
    seoDesc:
      'Agentes de IA para cobranza, atención y ventas por WhatsApp, voz y web, conectados a tus sistemas. Conoce casos y agenda un diagnóstico.',
    title: 'Agentes de IA que hacen el trabajo, no solo responden preguntas.',
    subtitle:
      'Diseñamos agentes que cobran cartera, atienden clientes, califican prospectos y agendan citas por WhatsApp, voz o web. Conectados a tus sistemas, con reglas claras y supervisión humana.',
    problem:
      'Tu equipo dedica horas a tareas que se repiten: perseguir pagos, contestar las mismas preguntas, pasar datos de un sistema a otro. Un chatbot genérico no lo resuelve porque no conoce tu negocio ni puede actuar en tus sistemas.',
    includes: [
      'Levantamiento del proceso y definición de qué decide el agente y qué escala a una persona.',
      'Conexión con tu CRM, ERP, agenda y WhatsApp Business API.',
      'Base de conocimiento con la información de tu empresa.',
      'Panel para ver conversaciones, resultados y costos.',
      'Pruebas con casos reales antes de salir a producción.',
      'Monitoreo y ajustes después del lanzamiento.',
    ],
    useCases: [
      'Cobranza: recordatorios, acuerdos de pago y seguimiento de cartera.',
      'Atención al cliente: respuestas, estado de pedidos, radicación de solicitudes.',
      'Ventas: calificación de prospectos, cotizaciones y agendamiento.',
      'Reclutamiento: filtro inicial y agendamiento de entrevistas.',
      'Operación interna: consultas sobre documentos, políticas e inventario.',
    ],
    security:
      'Tus datos no se usan para entrenar modelos de terceros [confirmar con los proveedores que usan]. El agente solo accede a lo que le autorizas, y cada acción queda registrada.',
    faqs: [
      {
        q: '¿En qué se diferencia de un chatbot?',
        a: 'Un chatbot responde. Un agente consulta tus sistemas, toma decisiones dentro de las reglas que defines y ejecuta acciones, como registrar un acuerdo de pago o agendar una cita.',
      },
      {
        q: '¿Qué pasa si el agente no sabe algo?',
        a: 'Pasa la conversación a una persona de tu equipo con todo el contexto.',
      },
      {
        q: '¿Cómo se mide el resultado?',
        a: 'Definimos contigo el indicador antes de empezar: cartera recuperada, tiempo de respuesta, citas agendadas o casos resueltos sin intervención.',
      },
    ],
  },
  {
    slug: 'software-a-la-medida',
    key: 'software',
    name: 'Software a la medida',
    seoTitle: 'Desarrollo de software a la medida en Colombia | EME Dev',
    seoDesc:
      'Construimos el sistema que tu operación necesita, con entregas cada dos semanas y alcance claro desde el inicio.',
    title: 'El sistema que tu operación necesita y que no existe en ningún catálogo.',
    subtitle:
      'Diseñamos y construimos software para procesos que te diferencian: el que hoy vive en Excel, en correos o en un sistema que ya se quedó corto.',
    problem:
      'Los productos genéricos te obligan a adaptar tu proceso a la herramienta. Cuando ese proceso es justo lo que te hace competitivo, pierdes más de lo que ahorras.',
    includes: [
      'Diagnóstico del proceso y definición de alcance.',
      'Diseño de experiencia y prototipo navegable.',
      'Arquitectura en la nube, pensada para crecer.',
      'Desarrollo con entregas cada dos semanas.',
      'Pruebas, migración de datos y capacitación.',
      'Documentación y entrega del código fuente [confirmar].',
    ],
    whenFits:
      'Conviene si el proceso es propio de tu negocio, si pagas muchas licencias por funciones que no usas o si ningún producto se integra con lo que tienes. No conviene para necesidades estándar, como contabilidad o nómina, donde un producto del mercado sale mejor. En el diagnóstico te decimos cuál es tu caso.',
    faqs: [
      {
        q: '¿A la medida es más caro que un SaaS?',
        a: 'Al inicio, sí. A tres o cinco años suele costar menos si hoy pagas licencias por usuario o si el SaaS te obliga a hacer trabajo manual alrededor.',
      },
      {
        q: '¿Puedo empezar con algo pequeño?',
        a: 'Sí. Recomendamos una primera versión con lo esencial, que esté en uso en [N] meses, y crecer desde ahí.',
      },
    ],
  },
  {
    slug: 'erp',
    key: 'erp',
    name: 'ERP a la medida',
    seoTitle: 'ERP a la medida para empresas | EME Dev',
    seoDesc:
      'Inventario, compras, ventas, cartera y finanzas en un solo sistema, integrado con facturación electrónica.',
    title: 'Un ERP que se adapta a tu empresa, no al revés.',
    subtitle:
      'Inventario, compras, ventas, cartera, producción y finanzas en un solo sistema, con los módulos que necesitas y conectado a la facturación electrónica.',
    problem:
      'La información está repartida entre hojas de cálculo, el sistema contable y la memoria de dos o tres personas. Cerrar el mes toma días y nadie confía del todo en los números.',
    includes: [
      'Módulos según tu operación: inventario, compras, ventas, cartera, producción, proyectos, talento humano.',
      'Integración con tu sistema contable y con facturación electrónica ante la DIAN [confirmar proveedor tecnológico o integración].',
      'Tableros con indicadores en tiempo real.',
      'Roles, permisos y registro de cambios.',
      'Migración de datos históricos.',
      'Asistente de IA para consultar la información en lenguaje natural [si aplica].',
    ],
    faqs: [
      {
        q: '¿Reemplaza mi sistema contable?',
        a: 'No necesariamente. Lo usual es integrarse con el que ya tienes y cubrir lo que no resuelve.',
      },
      {
        q: '¿Se puede implementar por etapas?',
        a: 'Sí. Empezamos por el módulo que más duele y sumamos los demás sin frenar la operación.',
      },
    ],
  },
  {
    slug: 'apps-moviles',
    key: 'apps',
    name: 'Apps móviles',
    seoTitle: 'Desarrollo de apps móviles iOS y Android | EME Dev',
    seoDesc:
      'Diseñamos, desarrollamos y publicamos apps para tus clientes o tu equipo en campo. Conoce el proceso y los costos.',
    title: 'Apps móviles que tus clientes y tu equipo usan todos los días.',
    subtitle:
      'Diseñamos, construimos y publicamos aplicaciones para iOS y Android, conectadas a tus sistemas y listas para crecer.',
    includes: [
      'Diseño de experiencia e interfaz.',
      'Desarrollo para iOS y Android.',
      'Backend, panel de administración y notificaciones.',
      'Pagos, mapas, cámara y funcionamiento sin conexión, según el caso.',
      'Publicación en App Store y Google Play.',
      'Analítica de uso y plan de mejoras.',
    ],
    useCases: [
      'Apps para clientes: pedidos, citas, fidelización, autoservicio.',
      'Apps para equipos en campo: visitas, inspecciones, entregas, avance de obra.',
      'Productos digitales nuevos y MicroSaaS.',
    ],
    faqs: [
      {
        q: '¿Cuánto cuesta una app?',
        a: 'Depende de las funciones. Una primera versión parte de [precio] y toma entre [N] y [N] meses.',
      },
      {
        q: '¿Necesito app o basta una aplicación web?',
        a: 'Si no necesitas cámara, GPS continuo o uso sin conexión, una aplicación web suele bastar y cuesta menos. Lo revisamos en el diagnóstico.',
      },
    ],
  },
  {
    slug: 'aplicaciones-web',
    key: 'web',
    name: 'Aplicaciones web',
    seoTitle: 'Desarrollo de aplicaciones web y SaaS | EME Dev',
    seoDesc: 'Portales, plataformas y productos SaaS rápidos, seguros y listos para crecer.',
    title: 'Plataformas web para operar, vender y atender en línea.',
    subtitle:
      'Portales de clientes, plataformas internas, marketplaces y productos SaaS, construidos para ser rápidos, seguros y fáciles de mantener.',
    includes: [
      'Diseño de experiencia y prototipo.',
      'Desarrollo con tecnologías actuales y arquitectura en la nube.',
      'Usuarios, roles, pagos y suscripciones.',
      'Integración con tus sistemas.',
      'Pruebas de carga y seguridad.',
      'Monitoreo y soporte.',
    ],
    useCases: [
      'Portal de clientes o proveedores con autoservicio.',
      'Plataforma interna que reemplaza procesos en Excel.',
      'Producto SaaS o MicroSaaS para monetizar tu conocimiento.',
      'Cotizadores, configuradores y sistemas de reservas.',
    ],
  },
  {
    slug: 'integraciones',
    key: 'integraciones',
    name: 'Integraciones',
    seoTitle: 'Integración de sistemas y APIs | EME Dev',
    seoDesc:
      'Conectamos ERP, CRM, facturación electrónica, pagos y WhatsApp para que tus datos fluyan sin digitar dos veces.',
    title: 'Tus sistemas, conectados. Sin digitar dos veces.',
    subtitle:
      'Integramos ERP, CRM, facturación electrónica, pasarelas de pago, comercio electrónico y WhatsApp para que los datos lleguen solos a donde se necesitan.',
    problem:
      'Cada sistema funciona bien por separado, pero alguien tiene que copiar la información de uno a otro. Eso cuesta horas, genera errores y deja tus datos sin condiciones para aprovechar la IA.',
    includes: [
      'Mapa de tus sistemas y flujos de información.',
      'Desarrollo de APIs e integraciones.',
      'Sincronización en tiempo real o programada.',
      'Manejo de errores, alertas y registro de cada operación.',
      'Documentación técnica.',
    ],
    integrates: [
      'ERP y sistemas contables: [listar los que ya han integrado: Siigo, SAP, Odoo, etc.]',
      'Facturación y nómina electrónica (DIAN).',
      'Pasarelas de pago: [listar]',
      'CRM: Achieve Apex, HubSpot [y otros].',
      'WhatsApp Business API, correo y telefonía.',
      'Comercio electrónico: Shopify [y otros].',
    ],
    faqs: [
      {
        q: '¿Por qué integrar antes de pensar en IA?',
        a: 'Porque la IA trabaja con los datos que le das. Las empresas con sistemas integrados tienen 4,5 veces más probabilidad de usar IA que las de baja digitalización, según CINTEL.',
      },
    ],
  },
  {
    slug: 'sitios-web',
    key: 'sitios',
    name: 'Sitios web y landings',
    seoTitle: 'Diseño y desarrollo de páginas web | EME Dev',
    seoDesc:
      'Sitios corporativos, tiendas y landings rápidos, medibles y optimizados para Google y buscadores de IA.',
    title: 'Sitios web que cargan rápido, se entienden y convierten.',
    subtitle:
      'Diseñamos y desarrollamos sitios corporativos, tiendas y landings pensados para que te encuentren en Google y en los buscadores de IA, y para que la visita termine en contacto.',
    includes: [
      'Estructura y textos orientados a conversión.',
      'Diseño a la medida, adaptable a móvil.',
      'Optimización de velocidad y SEO técnico.',
      'Contenido estructurado para aparecer en respuestas de IA.',
      'Formularios conectados a tu CRM y a WhatsApp.',
      'Medición con analítica y eventos de conversión.',
      'Administrador de contenidos para que tu equipo edite sin depender de nosotros.',
    ],
    packages: [
      { name: 'Landing', text: 'Una página para una campaña o servicio. Desde [precio], en [N] semanas.' },
      { name: 'Sitio corporativo', text: 'Hasta [N] páginas. Desde [precio], en [N] semanas.' },
      { name: 'Tienda en línea', text: 'Catálogo, pagos y envíos. Desde [precio].' },
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
  caseLabel: string;
  logos?: string[];
}

export const industryPages: IndustryPage[] = [
  {
    slug: 'constructoras',
    name: 'Constructoras',
    visual: 'web',
    seoTitle: 'Software para constructoras | EME Dev',
    seoDesc:
      'Sistemas de gestión comercial, cotizadores, portales de compradores y agentes de IA para salas de venta y cartera.',
    title: 'Tecnología para constructoras que quieren vender más y controlar mejor sus proyectos.',
    subtitle:
      'Sistemas de gestión comercial, cotizadores, portales de compradores y agentes de IA para salas de venta y cartera.',
    problems: [
      'Prospectos que se pierden entre la sala de ventas, el asesor y el CRM.',
      'Cartera y recaudo gestionados a mano.',
      'Compradores que llaman para preguntar por su estado de cuenta o el avance de obra.',
      'Inventario de unidades desactualizado entre canales.',
    ],
    solutionsTitle: 'Soluciones para el sector',
    solutions: [
      'Cotizador y disponibilidad de unidades en línea.',
      'Portal del comprador: pagos, documentos y avance de obra.',
      'Agente de IA para atención de prospectos y seguimiento de cartera.',
      'Integración entre CRM, ERP y fiducia [confirmar].',
    ],
    caseLabel: '[Constructora H3 u otro, con cifra]',
  },
  {
    slug: 'salud',
    name: 'Salud',
    visual: 'agentes',
    seoTitle: 'Software para clínicas y centros médicos | EME Dev',
    seoDesc:
      'Agendamiento, recordatorios, portales de pacientes y agentes de IA que reducen inasistencias y descargan a tu equipo administrativo.',
    title: 'Software para clínicas, centros médicos y especialistas.',
    subtitle:
      'Agendamiento, recordatorios, portales de pacientes y agentes de IA que reducen inasistencias y descargan a tu equipo administrativo.',
    problems: [
      'Citas perdidas por falta de confirmación.',
      'Líneas telefónicas saturadas con preguntas repetidas.',
      'Información del paciente repartida entre sistemas.',
      'Procesos de autorización y facturación lentos.',
    ],
    solutionsTitle: 'Soluciones para el sector',
    solutions: [
      'Agendamiento en línea y por WhatsApp, con recordatorios automáticos.',
      'Agente de IA para atención y orientación de pacientes.',
      'Portal del paciente: resultados, citas y pagos.',
      'Integración con tu sistema de historia clínica y facturación [confirmar alcance].',
    ],
    note: {
      title: 'Datos sensibles',
      text: 'Los datos de salud tienen protección especial bajo la Ley 1581 de 2012. Diseñamos cada solución con control de accesos, cifrado y registro de consultas [confirmar prácticas].',
    },
    caseLabel: '[Cajacopi u otro, con cifra]',
  },
  {
    slug: 'restaurantes',
    name: 'Restaurantes',
    visual: 'apps',
    seoTitle: 'Software para restaurantes | EME Dev',
    seoDesc:
      'Pedidos directos, reservas, fidelización y automatización por WhatsApp, conectados a tu punto de venta.',
    title:
      'Tecnología para restaurantes y negocios de comida que quieren vender más sin depender de terceros.',
    subtitle:
      'Pedidos directos, reservas, fidelización y automatización por WhatsApp, conectados a tu punto de venta.',
    problems: [
      'Comisiones altas en plataformas de domicilios.',
      'Clientes que no vuelven porque nadie los contacta.',
      'Reservas y pedidos por WhatsApp atendidos a mano.',
      'Inventario y ventas en sistemas que no se hablan.',
    ],
    solutionsTitle: 'Soluciones para el sector',
    solutions: [
      'Canal propio de pedidos web y por WhatsApp.',
      'Agente de IA para reservas y pedidos.',
      'Programa de fidelización y campañas automáticas sobre tu base de clientes.',
      'Integración con punto de venta e inventario.',
    ],
    caseLabel: '[Cliente del sector, con cifra]',
  },
  {
    slug: 'corporativo',
    name: 'Corporativo',
    visual: 'integraciones',
    seoTitle: 'Modernización de sistemas empresariales | EME Dev',
    seoDesc:
      'Modernización de sistemas, agentes de IA con gobernanza, integraciones y equipos dedicados que trabajan con tus estándares.',
    title: 'Un equipo de ingeniería para los proyectos que tu área de TI no alcanza a cubrir.',
    subtitle:
      'Modernización de sistemas, agentes de IA con gobernanza, integraciones y equipos dedicados que trabajan con tus estándares.',
    problems: [
      'Sistemas antiguos que frenan nuevos proyectos.',
      'Pilotos de IA que no pasan a producción.',
      'Falta de desarrolladores con experiencia en IA.',
      'Proveedores que entregan y desaparecen.',
    ],
    solutionsTitle: 'Cómo trabajamos con empresas grandes',
    solutions: [
      'Equipos dedicados o proyectos de alcance cerrado.',
      'Acuerdos de confidencialidad, acuerdos de nivel de servicio y documentación técnica.',
      'Trabajo sobre tu nube y tus políticas de seguridad.',
      'Transferencia de conocimiento a tu equipo interno.',
    ],
    caseLabel: '[Cliente corporativo, con cifra]',
    logos: ['Almar', 'Brilla', 'PRB', 'FIU', 'Cajacopi', 'Monark', 'B-inner', 'Secosa'],
  },
];

export const hiringModels = [
  {
    name: 'Proyecto de alcance cerrado',
    text: 'Precio y fecha definidos. Para necesidades claras y acotadas.',
  },
  {
    name: 'Equipo dedicado',
    text: 'Un equipo asignado por mes, con prioridades que tú defines. Para productos en evolución constante.',
  },
  {
    name: 'Bolsa de horas',
    text: 'Para soporte, mejoras y ajustes sobre sistemas existentes.',
  },
];

export const processPage = {
  seoTitle: 'Cómo trabajamos y cuánto cuesta | EME Dev',
  seoDesc: 'Etapas, modelos de contratación y rangos de inversión para proyectos de software e IA.',
  title: 'Así trabajamos',
  subtitle: 'Un proceso claro para que sepas en qué va tu proyecto, qué sigue y cuánto cuesta.',
  stages: [
    {
      name: 'Diagnóstico',
      time: '1 a 2 semanas',
      text: 'Reuniones con quienes viven el proceso, revisión de sistemas y datos.',
      gets: 'Documento de alcance, prioridades, cronograma y propuesta económica.',
    },
    {
      name: 'Diseño',
      time: '2 a 4 semanas',
      text: 'Flujos, prototipo navegable y arquitectura técnica.',
      gets: 'Un prototipo que puedes probar con tu equipo antes de invertir en desarrollo.',
    },
    {
      name: 'Construcción',
      time: 'Según alcance',
      text: 'Ciclos de dos semanas, con demostración al final de cada uno.',
      gets: 'Avances funcionando en un ambiente de pruebas y un tablero con el estado del proyecto.',
    },
    {
      name: 'Lanzamiento',
      time: '',
      text: 'Pruebas finales, migración de datos, capacitación y puesta en producción.',
      gets: 'El sistema en uso, manuales y accesos.',
    },
    {
      name: 'Soporte y evolución',
      time: '',
      text: 'Garantía, monitoreo y mejoras.',
      gets: 'Tiempos de respuesta definidos y un plan de evolución.',
    },
  ],
  ranges: [
    { type: 'Landing', from: '[precio]', time: '[N] semanas' },
    { type: 'Sitio corporativo', from: '[precio]', time: '[N] semanas' },
    { type: 'Agente de IA', from: '[precio]', time: '[N] semanas' },
    { type: 'Integración', from: '[precio]', time: '[N] semanas' },
    { type: 'App móvil (primera versión)', from: '[precio]', time: '[N] meses' },
    { type: 'Software o ERP a la medida', from: '[precio]', time: '[N] meses' },
  ],
  commitments: [
    'Un responsable de proyecto con nombre y contacto directo.',
    'Demostración cada dos semanas.',
    'Cambios de alcance cotizados y aprobados antes de ejecutarse.',
    'Entrega de código, documentación y accesos al cierre [confirmar].',
  ],
};

export const securityPage = {
  seoTitle: 'Seguridad y datos | EME Dev',
  seoDesc:
    'Confidencialidad, propiedad del código, protección de datos personales, uso de IA e infraestructura en los proyectos de EME Dev.',
  title: 'Cómo cuidamos tu información y tu inversión',
  subtitle:
    'Lo que tu área de tecnología, jurídica o de compras necesita saber antes de contratarnos.',
  items: [
    {
      name: 'Confidencialidad',
      text: 'Firmamos acuerdo de confidencialidad antes de recibir información de tu empresa. El acceso a tus datos se limita al equipo asignado al proyecto.',
    },
    {
      name: 'Propiedad del código',
      text: '[Confirmar]. Propuesta: el código desarrollado para tu proyecto es tuyo. Al cierre entregamos el repositorio, la documentación y las credenciales.',
    },
    {
      name: 'Protección de datos personales',
      text: 'Cumplimos la Ley 1581 de 2012 y sus normas reglamentarias. Cuando tratamos datos personales por encargo tuyo, lo formalizamos en un contrato de transmisión de datos [confirmar con jurídica].',
    },
    {
      name: 'Uso de inteligencia artificial',
      text: 'Usamos modelos de proveedores como OpenAI y AWS bajo condiciones empresariales, en las que tus datos no se usan para entrenar modelos [confirmar según contratos vigentes]. Te decimos qué modelo se usa, qué datos recibe y dónde se procesan.',
    },
    {
      name: 'Infraestructura',
      text: 'Desplegamos en AWS [u otra nube], en tu cuenta o en la nuestra. Cifrado en tránsito y en reposo, copias de seguridad y ambientes separados de pruebas y producción [confirmar].',
    },
    {
      name: 'Desarrollo seguro',
      text: 'Revisión de código, control de versiones, gestión de accesos y pruebas antes de cada despliegue [confirmar prácticas].',
    },
    {
      name: 'Continuidad',
      text: 'Documentación técnica y transferencia de conocimiento para que no dependas de una persona ni de nosotros.',
    },
  ],
  cta: 'Solicita nuestra documentación de seguridad',
};

export const teamPage = {
  seoTitle: 'Equipo | EME Dev',
  seoDesc:
    'Un equipo de ingeniería, producto y diseño con base en Barranquilla y clientes en Latinoamérica y Estados Unidos.',
  title: 'Quién construye tu proyecto',
  subtitle:
    'Un equipo de ingeniería, producto y diseño con base en Barranquilla y clientes en Latinoamérica y Estados Unidos.',
  people: [
    { name: '[Nombre]', role: 'Director de EME Dev', bio: '[Años de experiencia, tipo de proyectos liderados.]' },
    { name: '[Nombre]', role: 'Líder de arquitectura', bio: '[Especialidad, certificaciones.]' },
    { name: '[Nombre]', role: 'Líder de IA', bio: '[Especialidad, proyectos.]' },
    { name: '[Nombre]', role: 'Líder de producto y diseño', bio: '[Especialidad.]' },
  ],
  numbers: ['desarrolladores', 'diseñadores', 'líderes de proyecto', 'certificaciones'],
  certs: [
    'AWS Partner Network',
    'OpenAI',
    'Meta Business Partner',
    'Shopify Partners',
    'Certified ScrumMaster',
  ],
  parent:
    'EME Dev es la unidad de tecnología de EME, compañía con 12 años de trayectoria y más de 783 clientes.',
};

export const resourcesPage = {
  seoTitle: 'Recursos | EME Dev',
  seoDesc: 'Guías para decidir mejor sobre tecnología: costos, software a la medida, agentes de IA y ERP.',
  title: 'Guías para decidir mejor sobre tecnología',
  articles: [
    { title: '¿Cuánto cuesta desarrollar una app en Colombia en 2026?', tag: 'Apps móviles' },
    { title: 'Software a la medida o SaaS: cómo decidir.', tag: 'Software a la medida' },
    { title: 'Qué es un agente de IA y en qué se diferencia de un chatbot.', tag: 'Agentes de IA' },
    {
      title: 'Cómo elegir una empresa de desarrollo de software: diez preguntas para hacerle a tu proveedor.',
      tag: 'Proveedores',
    },
    { title: 'Antes de la IA, ordena tus datos: por dónde empezar.', tag: 'Datos' },
    { title: 'ERP a la medida o ERP comercial: ventajas y límites de cada uno.', tag: 'ERP' },
  ],
};

export const diagnosticPage = {
  seoTitle: 'Agenda un diagnóstico sin costo | EME Dev',
  seoDesc:
    'Cuéntanos qué quieres resolver. Agendamos una llamada de 30 minutos, sin costo y sin compromiso.',
  title: 'Cuéntanos qué quieres resolver',
  subtitle:
    'Te respondemos en menos de un día hábil [confirmar] para agendar una llamada de 30 minutos. Sin costo y sin compromiso.',
  steps: [
    'Revisamos tu caso antes de la llamada.',
    'En la llamada entendemos el problema y te damos una primera orientación.',
    'Si tiene sentido avanzar, recibes una propuesta con alcance, tiempo e inversión.',
  ],
  needs: [
    'Agente de IA',
    'Software a la medida',
    'ERP',
    'App móvil',
    'Aplicación web',
    'Integración',
    'Sitio web',
    'No estoy seguro',
  ],
  sizes: ['1 a 10', '11 a 50', '51 a 200', 'Más de 200'],
};

export const casesPage = {
  seoTitle: 'Casos de éxito en software e IA | EME Dev',
  seoDesc:
    'Proyectos reales con resultados medibles en constructoras, salud, restaurantes y empresas corporativas.',
  title: 'Proyectos con resultados medibles',
  subtitle: 'Filtra por industria o por tipo de solución.',
};
