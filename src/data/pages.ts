/* Selector de idioma de los datos: pages.es.ts (español) o pages.en.ts (inglés).
   Ambos archivos deben exportar lo mismo, con la misma estructura. */
import { isEn } from '../lib/i18n';
import * as es from './pages.es';
import * as en from './pages.en';

export type { QA, SolutionPage, IndustryPage } from './pages.es';

const d: typeof es = isEn ? (en as unknown as typeof es) : es;

export const solutionPages = d.solutionPages;
export const industryPages = d.industryPages;
export const processPage = d.processPage;
export const securityPage = d.securityPage;
export const teamPage = d.teamPage;
export const resourcesPage = d.resourcesPage;
export const diagnosticPage = d.diagnosticPage;
export const casesPage = d.casesPage;
