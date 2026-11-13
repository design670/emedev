# EME Dev — Home y páginas internas

Vite + React + TypeScript + GSAP/ScrollTrigger + Lenis + Lucide. Tipografía: **Inter Tight** (la misma que usa Kitpro, Google Fonts, licencia OFL, autoalojada con @fontsource).

- Desarrollo: `npm run dev` → http://localhost:5204 (preview "eme-dev" en `.claude/launch.json`)
- Producción: `npm run build` → `dist/`
- Textos: `src/data/content.ts` (todo sale del brief del 13-nov-2026)
- Tokens del sistema de diseño: `src/styles/tokens.css`

## Datos que faltan (se ven como `[ ... ]` en la página)

- [ ] Confirmar «+120 proyectos de software entregados» (cifra provisional)
- [ ] Confirmar «+25 personas en ingeniería y producto» (cifra provisional)
- [ ] Tres casos con cliente, sector, problema, solución, cifra y capturas
- [ ] Testimonios reales con nombre, cargo, empresa y foto
- [ ] Precios y plazos de las preguntas frecuentes; meses de garantía
- [ ] Política de propiedad del código (FAQ y sección Respaldo técnico)
- [ ] Plazos de cada etapa del proceso (hoy son los de referencia del brief)
- [ ] Rangos de inversión por tipo de proyecto (página Proceso) y rangos de presupuesto del formulario
- [ ] Nombres, fotos, perfiles y LinkedIn del equipo; cifras del equipo
- [ ] Sistemas ya integrados (ERP, pasarelas, CRM) para la página Integraciones
- [ ] Paquetes de sitios web (precios y plazos)
- [ ] Confirmar las prácticas de la página Seguridad y datos antes de publicarla
- [ ] Tiempo de respuesta del diagnóstico («menos de un día hábil»)

## Archivos que faltan

- [ ] Logo oficial de EME Dev (hoy hay un wordmark provisional en `Logo`, `ui.tsx`)
- [ ] Logos oficiales de clientes de desarrollo (Cajacopi, Constructora H3 y los que se confirmen)
- [ ] Logos oficiales de los seis sellos de partner
- [ ] Imágenes 001–012 (ver mapa en Notas), incluidas las capturas reales de Achieve Apex (008) y Get Transcribe (009)
- [ ] Imagen Open Graph `og-image.png` (1200×630) en `public/`

## Notas

- Imágenes: todas las tarjetas visuales son espacios numerados («Image 001»…) en `ImagePlaceholder` / `ServiceVisual` (`src/components/ServiceVisual.tsx`). Mapa: 001 Agentes de IA · 002 Software a la medida · 003 ERP · 004 Apps móviles · 005 Aplicaciones web · 006 Integraciones · 007 Sitios web (se repiten en la lista de servicios, el menú y el hero de cada solución; las industrias usan la de su solución relacionada) · 008 Achieve Apex · 009 Get Transcribe · 010–012 casos 1–3.
- Páginas internas (fase 7) listas en `src/pages/` con router propio (`src/lib/router.tsx`): 7 soluciones, 4 industrias, Casos (con filtros), caso individual (`/dev/casos/caso-1..3`), Proceso, Seguridad y datos, Equipo, Recursos, Diagnóstico y 404. Copy en `src/data/pages.ts`.
- **Formulario de diagnóstico:** valida y muestra confirmación, pero todavía **no envía a ningún lado**. Falta conectarlo al pipeline de Dev en Achieve Apex.
- **Servidor:** al publicar en e-me.co/dev, el servidor debe devolver `index.html` para cualquier ruta `/dev/*` (fallback de SPA).
- **SEO:** título y descripción cambian por página con JavaScript. Para que Google y los buscadores de IA lean cada página sin ejecutar JS, conviene prerenderizar las rutas en el build (siguiente paso técnico).
- Recursos: los seis artículos aparecen como «Próximamente» hasta que estén escritos.
- Caso individual y listado de Casos: todo en placeholders; los filtros muestran estado vacío porque los casos aún no tienen industria ni solución asignadas.
- Industria Corporativo: logos de Almar, Brilla, PRB, FIU, Cajacopi, Monark, B-inner, Secosa en texto, pendiente confirmar cuáles contrataron desarrollo.
