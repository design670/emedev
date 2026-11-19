/* Selector de idioma de los datos: content.es.ts (español) o content.en.ts (inglés).
   Ambos archivos deben exportar lo mismo, con la misma estructura. */
import { isEn } from '../lib/i18n';
import * as es from './content.es';
import * as en from './content.en';

export type { ServiceKey, Service, CaseStudy, Testimonial } from './content.es';

const d: typeof es = isEn ? (en as unknown as typeof es) : es;

export const services = d.services;
export const industries = d.industries;
export const navLinks = d.navLinks;
export const DIAGNOSTICO_HREF = d.DIAGNOSTICO_HREF;
export const clientLogos = d.clientLogos;
export const clients = d.clients;
export const metrics = d.metrics;
export const companySizes = d.companySizes;
export const cases = d.cases;
export const processSteps = d.processSteps;
export const partners = d.partners;
export const testimonials = d.testimonials;
export const faqs = d.faqs;
export const socials = d.socials;
export const contact = d.contact;
