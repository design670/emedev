# EME Dev — Home y páginas internas

Vite + React + TypeScript + GSAP/ScrollTrigger + Lenis + Lucide. Tipografía: **Inter Tight** (la misma que usa Kitpro, Google Fonts, licencia OFL, autoalojada con @fontsource).

- Desarrollo: `npm run dev` → http://localhost:5204 (preview "eme-dev" en `.claude/launch.json`)
- Producción: `npm run build` → `dist/`
- Textos: `src/data/content.ts` (todo sale del brief del 13-nov-2026)
- Tokens del sistema de diseño: `src/styles/tokens.css`

## Datos de ejemplo (inventados a pedido, 2026-11-17) — reemplazar antes de publicar

Ya no quedan corchetes en el sitio: todo lo que faltaba se llenó con datos de ejemplo verosímiles. Hay que cambiarlos por los reales:

- [ ] Métricas: +120 proyectos de software, +25 personas en el equipo
- [ ] Equipo: Santiago Mejía, Daniela Ortiz, Andrés Villalba, Valentina Cárdenas (nombres, cargos, bios y LinkedIn ficticios); cifras 16 desarrolladores · 4 diseñadores · 5 líderes de proyecto · 12 certificaciones
- [ ] Casos ficticios: Constructora Litoral, Red Médica Andina, Distribuidora Nexo, Grupo Fogón (resultados, ficha técnica y testimonio inventados) — `cases` en `src/data/content.ts`
- [ ] Testimonios: los 4 de los casos + Laura Castaño (Textiles Marea) y Felipe Herrera (Logística Caribe Express), todos ficticios
- [ ] Clientes en la franja del Hero: Cajacopi, Constructora H3, Brilla, Almar, Monark (los tres últimos vienen de la lista corporativa del brief; confirmar que contrataron desarrollo)
- [ ] Precios y plazos: landing $3,5 M COP (3 sem.), sitio corporativo $9 M (6 sem.), tienda $14 M (8 sem.), agente de IA $18 M (6–10 sem.), integración $12 M (4–8 sem.), app $35 M (3–5 meses), software/ERP $45 M (4–8 meses), garantía 3 meses; rangos de presupuesto del formulario
- [ ] Integraciones: Siigo, SAP Business One, Odoo, World Office, Alegra, Wompi, PayU, Mercado Pago, Stripe, HubSpot, Salesforce, WooCommerce
- [ ] Políticas presentadas como definitivas: propiedad del código, uso de IA sin entrenamiento, AWS o Google Cloud, cifrado y copias de seguridad, Ley 1581, respuesta en menos de un día hábil

## Archivos que faltan

- [ ] Logo oficial de EME Dev (hoy hay un wordmark provisional en `Logo`, `ui.tsx`)
- [x] Logos oficiales de Cajacopi (cajacopi.com) y Brilla (gascaribe.com) en la franja del Hero (public/clientes)
- [ ] Logos de Constructora H3, Almar y Monark: no tienen sitio oficial verificable en internet; siguen como texto hasta recibir los archivos
- [x] Íconos oficiales de los seis sellos de partner (Simple Icons, en src/components/PartnerIcon.tsx). Confirmar que EME Dev tiene cada membresía/certificación antes de publicar
- [ ] Imágenes 001–017 (ver mapa en Notas), incluidas las capturas reales de Achieve Apex (008) y Get Transcribe (009)
- [ ] Imagen Open Graph `og-image.png` (1200×630) en `public/`

## Notas

- Imágenes: todas las tarjetas visuales son espacios numerados («Image 001»…) en `ImagePlaceholder` / `ServiceVisual` (`src/components/ServiceVisual.tsx`). Mapa: 001 Agentes de IA · 002 Software a la medida · 003 ERP · 004 Apps móviles · 005 Aplicaciones web · 006 Integraciones · 007 Sitios web (se repiten en la lista de servicios, el menú y el hero de cada solución; las industrias usan la de su solución relacionada) · 008 Achieve Apex · 009 Get Transcribe · 010–013 casos (Constructora Litoral, Red Médica Andina, Distribuidora Nexo, Grupo Fogón) · 014–017 fotos del equipo.
- Páginas internas (fase 7) listas en `src/pages/` con router propio (`src/lib/router.tsx`): 7 soluciones, 4 industrias, Casos (con filtros), caso individual (`/dev/casos/<slug>`), Proceso, Seguridad y datos, Equipo, Recursos, Diagnóstico y 404. Copy en `src/data/pages.ts`.
- **Formulario de diagnóstico:** valida y muestra confirmación, pero todavía **no envía a ningún lado**. Falta conectarlo al pipeline de Dev en Achieve Apex.
- **Servidor:** al publicar en e-me.co/dev, el servidor debe devolver `index.html` para cualquier ruta `/dev/*` (fallback de SPA).
- **SEO:** título y descripción cambian por página con JavaScript. Para que Google y los buscadores de IA lean cada página sin ejecutar JS, conviene prerenderizar las rutas en el build (siguiente paso técnico).
- Recursos: los seis artículos aparecen como «Próximamente» hasta que estén escritos.
- Casos: los filtros por industria y solución funcionan con los cuatro casos de ejemplo.
- Industria Corporativo: logos oficiales de Brilla, PRB (ProBarranquilla), FIU y Cajacopi ya puestos; Almar, Monark, B-inner y Secosa siguen en texto porque no tienen sitio oficial verificable (pedir archivos).
