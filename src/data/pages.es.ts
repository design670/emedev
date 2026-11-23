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
      'Tus datos no se usan para entrenar modelos de terceros. El agente solo accede a lo que le autorizas, y cada acción queda registrada.',
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
      'Documentación y entrega del código fuente.',
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
        a: 'Sí. Recomendamos una primera versión con lo esencial, que esté en uso en 3 meses, y crecer desde ahí.',
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
      'Integración con tu sistema contable y con facturación electrónica ante la DIAN, a través de tu proveedor tecnológico autorizado.',
      'Tableros con indicadores en tiempo real.',
      'Roles, permisos y registro de cambios.',
      'Migración de datos históricos.',
      'Asistente de IA para consultar la información en lenguaje natural.',
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
        q: '¿Cuánto cuesta una App?',
        a: 'Depende de las funciones. Una primera versión parte de $35.000.000 COP y toma entre 2 y 3 meses.',
      },
      {
        q: '¿Necesito App o basta una aplicación web?',
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
      'ERP y sistemas contables: Siigo, SAP Business One, Odoo, World Office y Alegra.',
      'Facturación y nómina electrónica (DIAN).',
      'Pasarelas de pago: Wompi, PayU, Mercado Pago y Stripe.',
      'CRM: Achieve Apex, HubSpot y Salesforce.',
      'WhatsApp Business API, correo y telefonía.',
      'Comercio electrónico: Shopify y WooCommerce.',
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
    name: 'Sitios web, e-commerce y landings',
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
      { name: 'Landing', text: 'Una página para una campaña o servicio. Desde $2.000.000 COP, en 3 días.' },
      { name: 'Sitio corporativo', text: 'Hasta 15 páginas. Desde $8.500.000 COP, en 6 semanas.' },
      { name: 'Tienda en línea', text: 'Catálogo, pagos y envíos. Desde $8.000.000 COP, en 4 semanas.' },
    ],
  },
];

/* Industrias v3 (documento «Industrias v3», 2026-11-23): nombradas por proceso, no por sector.
   Regla de los dos nombres: `name` (general) va en menú, H1, botones, tarjetas y pie;
   `seoTitle`/`seoDesc` y el slug usan el nombre específico del sector. No unificarlos. */
export interface IndustryPage {
  slug: string;
  /** Nombre general: menú, H1, tarjetas, pie */
  name: string;
  /** Línea de apoyo bajo el nombre en el menú (letra pequeña) */
  line: string;
  /** Texto de la tarjeta en la sección de industrias del inicio */
  card: string;
  visual: ServiceKey;
  seoTitle: string;
  seoDesc: string;
  title: string;
  subtitle: string;
  problems: string[];
  solutionsTitle: string;
  solutions: string[];
  /** Bloques por sector: cada uno con su propio encabezado (h3) */
  sectors: { title: string; text: string }[];
  /** Bloque «Datos sensibles» (solo Agenda y atención) */
  note?: { title: string; text: string };
  /** Caso real del sector; null mientras no esté documentado (el bloque se oculta) */
  caseSlug: string | null;
  /** «También confían en nosotros»: nombres de clientes (logo si existe) */
  trust?: { title: string; names: string[] };
}

export const industryPages: IndustryPage[] = [
  {
    slug: 'operacion-y-logistica',
    name: 'Operación y seguimiento',
    line: 'Envíos, carga, casilleros, talleres, alquiler de equipos',
    card: 'Para empresas donde algo entra, se procesa y se entrega: envíos, carga, casilleros, talleres, laboratorios, alquiler de equipos.',
    visual: 'integraciones',
    seoTitle: 'Software para empresas de envíos, carga y casilleros | EME Dev',
    seoDesc:
      'Cotización, órdenes de servicio, seguimiento y cobros para couriers, casilleros, talleres y alquiler de equipos.',
    title: 'Software para empresas donde algo entra, se mueve y se entrega.',
    subtitle:
      'Cotización, órdenes de servicio, seguimiento, entregas y cobros en un solo sistema.',
    problems: [
      'Cotizar a mano cada envío, con tarifas que cambian por peso, volumen, origen y destino.',
      'Clientes que llaman o escriben para preguntar dónde va su paquete.',
      'La operación repartida entre WhatsApp, Excel y correo.',
      'Cobros que se pierden entre la entrega y la facturación.',
      'Novedades (retrasos, aduana, daños) que nadie registra y que aparecen cuando el cliente reclama.',
    ],
    solutionsTitle: 'Soluciones para el sector',
    solutions: [
      'Cotizador con tus tarifas, por peso, volumen y ruta.',
      'Órdenes de servicio y trazabilidad desde la recolección hasta la entrega.',
      'Portal y App para que el cliente consulte su envío sin llamar.',
      'Gestión de casillero: prealertas, recepción, consolidación y despacho.',
      'Registro de novedades y control de cartera.',
      // TODO: confirmar con EME el alcance de la integración con transportadoras y aduana.
      'Integración con transportadoras y procesos de aduana.',
    ],
    sectors: [
      { title: 'Si eres courier, casillero o agencia de carga.', text: 'Prealertas, recepción, consolidación, despacho y trazabilidad hasta la entrega.' },
      { title: 'Si tienes un taller o un servicio técnico.', text: 'La orden entra, pasa por etapas, se aprueba un presupuesto y se entrega con factura.' },
      { title: 'Si alquilas equipos o maquinaria.', text: 'Salida, tiempo de uso, devolución, estado del equipo y cobro por período.' },
      { title: 'Si operas un activo con entrada y salida.', text: 'Parqueaderos, bodegas, patios: control de ocupación, permanencia y cobro.' },
      { title: 'Si procesas muestras o piezas.', text: 'Laboratorios y centros de diagnóstico: recepción, proceso, resultado y entrega.' },
    ],
    // TODO: caso pendiente (Rapibox, Importex o Cargonet). No usar casos ficticios.
    caseSlug: null,
    trust: {
      title: 'Respaldo del sector',
      names: ['Puerto de Barranquilla', 'Zona Franca La Cayena', 'ProBarranquilla'],
    },
  },
  {
    slug: 'distribucion-y-mayoristas',
    name: 'Pedidos y cartera',
    line: 'Distribuidoras, comercializadoras, mayoristas, importadores',
    card: 'Para empresas que le venden a otras empresas y tienen vendedores en calle: distribuidoras, comercializadoras, mayoristas, importadores.',
    visual: 'erp',
    seoTitle: 'Software para distribuidoras y mayoristas | EME Dev',
    seoDesc: 'Pedidos, cartera, vendedores en calle y rotación de productos en un solo sistema.',
    title: 'Software para empresas que venden, despachan y cobran todos los días.',
    subtitle:
      'Pedidos, vendedores en calle, cartera y rotación de productos en un sistema que tu equipo comercial y tu equipo logístico usan al mismo tiempo.',
    problems: [
      'El vendedor toma el pedido sin saber cuánto debe el cliente.',
      'Cartera vencida que se descubre tarde.',
      'Pedidos que entran por WhatsApp y alguien tiene que digitar.',
      'Nadie sabe con certeza qué productos rotan y cuáles están quietos.',
      'Cotizaciones grandes que toman horas de digitación.',
    ],
    solutionsTitle: 'Soluciones para el sector',
    solutions: [
      'App para tus clientes: pedidos, estado, cartera y documentos.',
      'App para tus vendedores: cartera vencida, pedidos nuevos y rotación de productos.',
      'Sistema operativo: pedidos, despachos, inventario y facturación.',
      'Agente de IA que lee correos con cotizaciones y genera órdenes de compra automáticamente.',
      'Tableros de rotación, márgenes y desempeño por vendedor.',
    ],
    sectors: [
      { title: 'Si vendes alimentos o productos perecederos.', text: 'Rotación, lotes, fechas de vencimiento y despachos por ruta.' },
      { title: 'Si vendes materias primas o insumos industriales.', text: 'Cotizaciones largas, fichas técnicas y órdenes de compra generadas por IA.' },
      { title: 'Si vendes repuestos o equipos.', text: 'Catálogo con referencias, compatibilidades y disponibilidad en tiempo real.' },
      { title: 'Si tienes vendedores en calle.', text: 'App que muestra cartera vencida antes de tomar el pedido.' },
      { title: 'Si le vendes a cadenas o grandes distribuidores.', text: 'Portal donde tu cliente consulta pedidos, cartera y documentos sin llamar.' },
    ],
    // TODO: caso pendiente (Genial Foods). No usar casos ficticios.
    caseSlug: null,
    // Sin bloque de respaldo: el documento no define una línea para esta industria.
  },
  {
    slug: 'salud-y-servicios',
    name: 'Agenda y atención',
    line: 'Clínicas, centros estéticos, gimnasios, consultorios',
    card: 'Para negocios que venden tiempo y citas: clínicas, centros estéticos, gimnasios, consultorios, talleres de servicio.',
    visual: 'agentes',
    seoTitle: 'Software para clínicas y centros estéticos | EME Dev',
    seoDesc: 'Agendamiento, seguimiento de pacientes y control de paquetes de sesiones.',
    title: 'Software para negocios que venden tiempo y citas.',
    subtitle:
      'Agendamiento, seguimiento de pacientes y control de la operación, sin que tu equipo viva pegado al teléfono.',
    problems: [
      'Agenda en papel o en una hoja de cálculo que solo una persona entiende.',
      'Citas perdidas porque nadie confirma.',
      'Historial de tratamientos y avances repartido entre varios lugares.',
      'Paquetes de sesiones y pagos que se llevan a mano.',
    ],
    solutionsTitle: 'Soluciones para el sector',
    solutions: [
      'Agendamiento en línea y por WhatsApp, con recordatorios automáticos.',
      'Historial de sesiones, tratamientos y avance del paciente.',
      'Control de paquetes, sesiones consumidas y pagos.',
      'Panel de ocupación por profesional y por sede.',
      'Portal del paciente: citas, resultados y pagos.',
    ],
    sectors: [
      { title: 'Si tienes una clínica o un consultorio.', text: 'Agenda por profesional y por sede, historial del paciente y recordatorios.' },
      { title: 'Si vendes tratamientos por sesiones.', text: 'Centros estéticos y de rehabilitación: control de paquetes, sesiones consumidas y saldos.' },
      { title: 'Si manejas membresías.', text: 'Gimnasios, clubes y academias: cobro recurrente, asistencia y renovaciones.' },
      { title: 'Si atiendes a domicilio o en ruta.', text: 'Asignación de técnicos, ventana de llegada y cierre del servicio en sitio.' },
    ],
    // TODO: confirmar con EME las prácticas de protección de datos de salud descritas aquí.
    note: {
      title: 'Datos sensibles',
      text: 'Los datos de salud tienen protección especial bajo la Ley 1581 de 2012. Diseñamos cada solución con control de accesos, cifrado y registro de consultas.',
    },
    // TODO: caso pendiente (Quirulaser). No usar casos ficticios.
    caseSlug: null,
    trust: {
      title: 'También confían en nosotros',
      names: ['Clínica La Asunción', 'Sociedad Colombiana de Pediatría', 'Cajacopi'],
    },
  },
  {
    slug: 'educacion-y-formacion',
    name: 'Formación y estudiantes',
    line: 'Universidades, centros técnicos, academias, clubes',
    card: 'Para instituciones que forman personas: universidades, centros técnicos, academias, clubes.',
    visual: 'apps',
    seoTitle: 'Plataformas para academias y universidades | EME Dev',
    seoDesc: 'Tus estudiantes ven clases, notas, avances y pagos desde el celular.',
    title: 'Plataformas para instituciones que forman personas.',
    subtitle:
      'Tus estudiantes ven sus clases, notas, avances y pagos desde el celular. Tu equipo ve todo lo demás.',
    problems: [
      'Estudiantes que preguntan por WhatsApp su horario, su nota o su saldo.',
      'Cartera estudiantil en hojas de cálculo.',
      'El avance del estudiante solo lo conoce el profesor.',
      'Inscripciones y cupos gestionados a mano.',
    ],
    solutionsTitle: 'Soluciones para el sector',
    solutions: [
      'App del estudiante: materias, clases, temario, calificaciones, avances y pagos.',
      'Gestión de programas, cohortes, horarios y cupos.',
      'Control de cartera estudiantil y pagos en línea.',
      'Panel del profesor para registrar asistencia y avance.',
      'Certificados y constancias automáticas.',
    ],
    sectors: [
      { title: 'Si eres universidad o centro técnico.', text: 'Programas, cohortes, cupos, calificaciones y cartera estudiantil.' },
      { title: 'Si tienes una academia o un centro de idiomas.', text: 'Niveles, avance por estudiante, certificados y pagos en línea.' },
      { title: 'Si enseñas una práctica o un deporte.', text: 'Temario, avance por habilidad y asistencia, como en Watertown.' },
      { title: 'Si formas a tu propio equipo.', text: 'Formación corporativa: rutas de aprendizaje, evaluaciones y certificación interna.' },
    ],
    // TODO: caso pendiente (Academia Sandra o Watertown). No usar casos ficticios.
    caseSlug: null,
    trust: {
      title: 'También confían en nosotros',
      names: ['ICSA', 'Universidad Metropolitana', 'Befuturo'],
    },
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
    { type: 'Landing', from: '$2.000.000 COP', time: '3 días' },
    { type: 'Sitio corporativo', from: '$8.500.000 COP', time: '6 semanas' },
    { type: 'Tienda en línea', from: '$8.000.000 COP', time: '4 semanas' },
    { type: 'Agente de IA', from: '$2.700.000 COP', time: '4 semanas' },
    { type: 'Integración', from: '$4.500.000 COP', time: '5 días' },
    { type: 'App móvil', from: '$35.000.000 COP', time: '2 a 3 meses' },
    { type: 'ERP', from: '$45.000.000 COP', time: '4 a 8 meses' },
    { type: 'Software a la medida', from: '$15.000.000 COP', time: '1 a 2 meses' },
  ],
  commitments: [
    'Un responsable de proyecto con nombre y contacto directo.',
    'Demostración cada dos semanas.',
    'Cambios de alcance cotizados y aprobados antes de ejecutarse.',
    'Entrega de código, documentación y accesos al cierre.',
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
      text: 'El código desarrollado para tu proyecto es tuyo. Al cierre entregamos el repositorio, la documentación y las credenciales.',
    },
    {
      name: 'Protección de datos personales',
      text: 'Cumplimos la Ley 1581 de 2012 y sus normas reglamentarias. Cuando tratamos datos personales por encargo tuyo, lo formalizamos en un contrato de transmisión de datos.',
    },
    {
      name: 'Uso de inteligencia artificial',
      text: 'Usamos modelos de proveedores como OpenAI y AWS bajo condiciones empresariales, en las que tus datos no se usan para entrenar modelos. Te decimos qué modelo se usa, qué datos recibe y dónde se procesan.',
    },
    {
      name: 'Infraestructura',
      text: 'Desplegamos en AWS o Google Cloud, en tu cuenta o en la nuestra. Cifrado en tránsito y en reposo, copias de seguridad y ambientes separados de pruebas y producción.',
    },
    {
      name: 'Desarrollo seguro',
      text: 'Revisión de código, control de versiones, gestión de accesos y pruebas antes de cada despliegue.',
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
    { name: 'Santiago Mejía', role: 'Director de EME Dev', bio: '15 años construyendo software para empresas. Ha liderado más de 60 proyectos de ERP, apps e integraciones.' },
    { name: 'Daniela Ortiz', role: 'Líder de arquitectura', bio: 'Arquitectura en la nube y sistemas distribuidos. Certificada como AWS Solutions Architect Professional.' },
    { name: 'Andrés Villalba', role: 'Líder de IA', bio: 'Agentes conversacionales y modelos de lenguaje en producción para cobranza, salud y ventas.' },
    { name: 'Valentina Cárdenas', role: 'Líder de producto y diseño', bio: 'Diseño de producto y experiencia de usuario para plataformas B2B y apps móviles.' },
  ],
  numbers: [
    { value: 16, label: 'desarrolladores' },
    { value: 4, label: 'diseñadores' },
    { value: 5, label: 'líderes de proyecto' },
    { value: 12, label: 'certificaciones' },
  ],
  certs: [
    'AWS Partner Network',
    'OpenAI',
    'Meta Business Partner',
    'Shopify Partners',
    'Claude Code',
  ],
  parent:
    'EME Dev es la unidad de tecnología de EME, compañía con 12 años de trayectoria y más de 783 clientes.',
};

export const resourcesPage = {
  seoTitle: 'Recursos | EME Dev',
  seoDesc: 'Guías para decidir mejor sobre tecnología: costos, software a la medida, agentes de IA y ERP.',
  title: 'Guías para decidir mejor sobre tecnología',
  articles: [
    { title: '¿Cuánto cuesta desarrollar una App en Colombia en 2026?', tag: 'Apps móviles' },
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
  seoTitle: 'Diagnóstico gratis | EME Dev',
  seoDesc:
    'Cuéntanos qué quieres resolver. Agendamos una llamada de 30 minutos, sin costo y sin compromiso.',
  title: 'Cuéntanos qué quieres resolver',
  subtitle:
    'Te respondemos en menos de un día hábil para agendar una llamada de 30 minutos. Sin costo y sin compromiso.',
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
  budgets: ['Menos de $10.000.000 COP', '$10 a $30 millones COP', '$30 a $80 millones COP', 'Más de $80 millones COP', 'Aún no lo sé'],
};

export const casesPage = {
  seoTitle: 'Casos de éxito en software e IA | EME Dev',
  seoDesc:
    'Proyectos reales con resultados medibles en operación y logística, distribución, salud y educación.',
  title: 'Proyectos con resultados medibles',
  subtitle: 'Filtra por industria o por tipo de solución.',
};

/* Proyectos por industria (documento v3, «Inventario de clientes por industria»).
   software = true cuando el trabajo incluye software o app (se resalta en la tabla). */
export interface IndustryProject {
  client: string;
  what: string;
  work: string;
  software: boolean;
}

export const industryProjects: Record<string, IndustryProject[]> = {
  'operacion-y-logistica': [
    { client: 'Rapibox', what: 'Servicios logísticos y de transporte', work: 'Software operativo + App', software: true },
    { client: 'Importex', what: 'Servicios logísticos y de transporte', work: 'Software operativo', software: true },
    { client: 'CargoNet', what: 'Servicios logísticos y de transporte', work: 'Software operativo + App', software: true },
    { client: 'Genial Foods', what: 'Comercialización global de productos cárnicos', work: 'Software + App', software: true },
    { client: 'Puerto de Barranquilla', what: 'Operación portuaria', work: 'Web', software: false },
    { client: 'Zona Franca La Cayena', what: 'Operaciones comerciales, logísticas y de comercio exterior', work: 'Web', software: false },
    { client: 'ProBarranquilla', what: 'Servicio de promoción de inversión extranjera', work: 'Web', software: false },
  ],
  'distribucion-y-mayoristas': [
    { client: 'Genial Foods', what: 'Comercialización global de productos cárnicos', work: 'Software + App', software: true },
    { client: 'Estrategia LTDA', what: 'Venta de productos HORECA', work: 'Software operativo', software: true },
    { client: 'Tusim', what: 'Venta mundial de simcards y eSIM', work: 'Software operativo', software: true },
    { client: 'Avantika', what: 'Comercialización de productos químicos', work: 'Software + Agente IA', software: true },
    { client: 'Carnes Santacruz', what: 'Venta de productos cárnicos', work: 'App Mobile + Integraciones', software: true },
    { client: 'Quidem', what: 'Materias primas y soluciones químicas para recubrimientos y morteros', work: 'E-commerce + Agente IA + Integraciones', software: true },
    { client: 'GSM', what: 'Repuestos de maquinaria pesada', work: 'E-commerce + Agente IA + Integraciones + Software operativo', software: true },
    { client: 'Retri', what: 'Alquiler de maquinaria pesada', work: 'E-commerce + Agente IA + Integraciones', software: true },
    { client: 'HYK Colombia', what: 'Venta de equipos de seguridad', work: 'Web + tienda', software: false },
    { client: 'Soluzioni', what: 'Mobiliario de oficina', work: 'Web + tienda', software: false },
    { client: 'Pintumax', what: 'Venta de pinturas y acabados', work: 'Tienda', software: false },
  ],
  'salud-y-servicios': [
    { client: 'Quirulaser', what: 'Servicios estéticos', work: 'Software operativo + Agente IA', software: true },
    { client: 'Watertown', what: 'Clases de natación', work: 'Software operativo + Agente IA + App Mobile', software: true },
    { client: 'Clínica La Asunción', what: 'Servicios médicos', work: 'Web', software: false },
    { client: 'Issa Abuchaibe', what: 'Servicios médicos', work: 'Web', software: false },
    { client: 'Sociedad Colombiana de Pediatría', what: 'Gremio médico', work: 'Web', software: false },
    { client: 'Cajacopi', what: 'Caja de compensación', work: 'Web', software: false },
  ],
  'educacion-y-formacion': [
    { client: 'Academia Sandra', what: 'Programas académicos de belleza', work: 'App: materias, calificaciones, pagos', software: true },
    { client: 'Watertown', what: 'Clases de natación', work: 'Software operativo + Agente IA + App Mobile', software: true },
    { client: 'Universidad de la Costa', what: 'Universidad', work: 'Gestión estudiantil con IA', software: true },
    { client: 'ICSA', what: 'Programas técnicos, tecnológicos y profesionales', work: 'Web', software: false },
    { client: 'Universidad Metropolitana', what: 'Universidad', work: 'Web', software: false },
    { client: 'Befuturo', what: 'Cursos académicos', work: 'Web', software: false },
  ],
};
