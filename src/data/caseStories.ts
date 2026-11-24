/* Selector de idioma de las historias de casos: caseStories.es.ts o caseStories.en.ts */
import { isEn } from '../lib/i18n';
import * as es from './caseStories.es';
import * as en from './caseStories.en';

export type { CaseKind, CaseStory } from './caseStories.es';

const d: typeof es = isEn ? (en as unknown as typeof es) : es;

export const caseStories = d.caseStories;
export const processByKind = d.processByKind;
