import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, prefersReduced, setLenis, setupReveals, onReady } from './lib/motion';
import { usePath, useLinkInterceptor, useMeta, navigate, HOME } from './lib/router';
import { t } from './lib/i18n';
import { solutionPages, industryPages } from './data/pages';
import { Preloader } from './components/Preloader';
import { CustomCursor } from './components/CustomCursor';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Metrics } from './components/Metrics';
import { Problem } from './components/Problem';
import { ServiceList } from './components/ServiceList';
import { IndustriesSection } from './components/IndustriesSection';
import { ProcessSection } from './components/ProcessSection';
import { Trust } from './components/Trust';
import { Testimonials } from './components/Testimonials';
import { FAQAccordion } from './components/FAQAccordion';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';
import { Logo } from './components/ui';
import { SolutionPage } from './pages/SolutionPage';
import { IndustryPage } from './pages/IndustryPage';
import { CasesPage, CasePage } from './pages/CasesPages';
import {
  ProcessPage,
  SecurityPage,
  TeamPage,
  ResourcesPage,
  DiagnosticPage,
  NotFoundPage,
} from './pages/InfoPages';

// Lenis se crea antes del primer render para que el Header pueda suscribirse
if (typeof window !== 'undefined' && !prefersReduced()) {
  const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  setLenis(lenis);
}

function HomePage() {
  useMeta(
    t('Desarrollo de software e IA a la medida | EME Dev', 'Custom software and AI development | EME Dev'),
    t(
      'Agentes de IA, software, ERP, apps e integraciones para empresas. 12 años y más de 783 clientes. Diagnóstico gratis.',
      'AI agents, software, ERP, apps and integrations for businesses. 12 years and more than 783 clients. Free diagnostic.',
    ),
  );
  return (
    <>
      <Hero />
      <Metrics />
      <Problem />
      <ServiceList />
      <IndustriesSection />
      <ProcessSection />
      <Trust />
      <Testimonials />
      <FAQAccordion />
      <CTASection />
    </>
  );
}

/* Industrias que salieron en la v3: salud pasa a salud-y-servicios; las demás vuelven al inicio */
const LEGACY_INDUSTRIES: Record<string, string> = {
  salud: '/dev/industrias/salud-y-servicios',
  constructoras: HOME,
  restaurantes: HOME,
  corporativo: HOME,
};

function Redirect({ to }: { to: string }) {
  useEffect(() => {
    navigate(to, { replace: true });
  }, [to]);
  return null;
}

function resolve(path: string) {
  if (path === HOME) return <HomePage />;
  const parts = path.replace(/^\/dev\/?/, '').split('/');
  const [section, slug] = parts;
  if (section === 'soluciones' && slug) {
    const p = solutionPages.find((s) => s.slug === slug);
    if (p) return <SolutionPage key={path} page={p} />;
  }
  if (section === 'industrias' && slug && LEGACY_INDUSTRIES[slug]) return <Redirect to={LEGACY_INDUSTRIES[slug]} />;
  if (section === 'industrias' && slug) {
    const p = industryPages.find((s) => s.slug === slug);
    if (p) return <IndustryPage key={path} page={p} />;
  }
  if (section === 'casos') return slug ? <CasePage key={path} slug={slug} /> : <CasesPage />;
  if (section === 'proceso' && !slug) return <ProcessPage />;
  if (section === 'seguridad' && !slug) return <SecurityPage />;
  if (section === 'equipo' && !slug) return <TeamPage />;
  if (section === 'recursos' && !slug) return <ResourcesPage />;
  if (section === 'diagnostico' && !slug) return <DiagnosticPage />;
  return <NotFoundPage />;
}

export default function App() {
  const main = useRef<HTMLElement>(null);
  const path = usePath();
  useLinkInterceptor();

  // Revelados al hacer scroll: se rearman en cada página
  useEffect(() => {
    const cleanup = setupReveals(main.current!);
    ScrollTrigger.refresh();
    return cleanup;
  }, [path]);

  useEffect(() => {
    const off = onReady(() => ScrollTrigger.refresh());
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    return () => {
      off();
      window.removeEventListener('load', onLoad);
    };
  }, []);

  return (
    <>
      <a href="#contenido" className="skip-link">
        {t('Saltar al contenido', 'Skip to content')}
      </a>
      <Preloader />
      <CustomCursor />
      <div className="page-curtain" aria-hidden="true">
        <Logo />
        <span className="page-curtain__bar" />
      </div>
      <Header />
      <main id="contenido" ref={main} key={path}>
        {resolve(path)}
      </main>
      <Footer />
    </>
  );
}
