import type { TranslationKey } from '../i18n/en'

/*
  PROJECTS
  The structure lives here; the words live in src/i18n (each `...Key` points at a
  dictionary entry, so every project is available in English and Bisaya).
  Text in [brackets] inside the dictionaries is a placeholder Will still has to fill in.
*/

export type ProjectId = 'smartfine' | 'underground' | 'rubens'

/** The filter buttons above the grid. */
export type ProjectCategory = 'mobile' | 'web' | 'solo' | 'team'

export const FILTERS: { id: 'all' | ProjectCategory; labelKey: TranslationKey }[] = [
  { id: 'all', labelKey: 'filter.all' },
  { id: 'mobile', labelKey: 'filter.mobile' },
  { id: 'web', labelKey: 'filter.web' },
  { id: 'solo', labelKey: 'filter.solo' },
  { id: 'team', labelKey: 'filter.team' },
]

export interface ProjectBadge {
  key: TranslationKey
  tone?: 'neutral' | 'ok' | 'warn'
}

/** One block inside the details modal. */
export type DetailSection =
  | { kind: 'text'; headingKey: TranslationKey; bodyKey: TranslationKey }
  | { kind: 'list'; headingKey: TranslationKey; ordered?: boolean; itemKeys: TranslationKey[] }
  // A two-column table: a short term (name or key) and its plain-English meaning.
  | {
      kind: 'table'
      headingKey: TranslationKey
      rows: { term: string | { key: TranslationKey }; descKey: TranslationKey }[]
    }
  // Shows the project's `tech` chips.
  | { kind: 'tech'; headingKey: TranslationKey }

export interface Project {
  id: ProjectId
  /** Project names are proper names: the same in both languages. */
  title: string
  categories: ProjectCategory[]
  featured?: boolean
  /** Badges on the card. */
  badges: ProjectBadge[]
  /** Badges in the details modal (defaults to `badges`). */
  modalBadges?: ProjectBadge[]
  descKey: TranslationKey
  /** Small extra line on the card. */
  noteKey?: TranslationKey
  /** Tech names (not translated). */
  tech: string[]
  details: DetailSection[]
}

export const PROJECTS: Project[] = [
  {
    id: 'smartfine',
    title: 'SmartFine',
    categories: ['mobile', 'web', 'solo'],
    featured: true,
    badges: [
      { key: 'badge.featured' },
      { key: 'badge.soloProject' },
      { key: 'badge.prototype', tone: 'ok' },
      { key: 'badge.mobileWeb' },
    ],
    modalBadges: [{ key: 'badge.soloProject' }, { key: 'badge.prototype', tone: 'ok' }],
    descKey: 'sf.desc',
    tech: ['React Native (Expo)', 'SQLite', 'PayMongo', 'bcrypt', 'AES-256-GCM'],
    details: [
      { kind: 'text', headingKey: 'm.problem', bodyKey: 'sf.problem' },
      {
        kind: 'list',
        headingKey: 'm.how',
        ordered: true,
        itemKeys: ['sf.how1', 'sf.how2', 'sf.how3', 'sf.how4', 'sf.how5', 'sf.how6'],
      },
      { kind: 'list', headingKey: 'm.roles', itemKeys: ['sf.role1', 'sf.role2', 'sf.role3'] },
      {
        kind: 'table',
        headingKey: 'm.security',
        rows: [
          { term: 'bcrypt', descKey: 'sf.sec1' },
          { term: 'Email OTP', descKey: 'sf.sec2' },
          { term: { key: 'sf.secT3' }, descKey: 'sf.sec3' },
          { term: { key: 'sf.secT4' }, descKey: 'sf.sec4' },
          { term: 'AES-256-GCM', descKey: 'sf.sec5' },
          { term: { key: 'sf.secT6' }, descKey: 'sf.sec6' },
        ],
      },
      { kind: 'tech', headingKey: 'm.tech' },
      { kind: 'text', headingKey: 'm.status', bodyKey: 'sf.status' },
      { kind: 'text', headingKey: 'm.shots', bodyKey: 'sf.shots' },
    ],
  },
  {
    id: 'underground',
    title: 'Underground Apparel POS',
    categories: ['web', 'team'],
    badges: [{ key: 'badge.team2' }, { key: 'badge.testing', tone: 'warn' }],
    descKey: 'ug.desc',
    noteKey: 'ug.note',
    tech: ['PHP 8', 'SQLite', 'HTML and CSS', 'JavaScript', 'Git and GitHub'],
    details: [
      { kind: 'text', headingKey: 'm.problem', bodyKey: 'ug.problem' },
      {
        kind: 'list',
        headingKey: 'm.what',
        itemKeys: ['ug.what1', 'ug.what2', 'ug.what3', 'ug.what4', 'ug.what5', 'ug.what6'],
      },
      {
        kind: 'list',
        headingKey: 'm.myPart',
        itemKeys: ['ug.part1', 'ug.part2', 'ug.part3', 'ug.part4', 'ug.part5'],
      },
      { kind: 'text', headingKey: 'm.team', bodyKey: 'ug.team' },
      { kind: 'tech', headingKey: 'm.tech' },
      { kind: 'text', headingKey: 'm.status', bodyKey: 'ug.status' },
    ],
  },
  {
    id: 'rubens',
    title: "Ruben's Photography",
    categories: ['web', 'solo'],
    badges: [{ key: 'badge.solo' }, { key: 'badge.client', tone: 'ok' }],
    descKey: 'rp.desc',
    noteKey: 'rp.note',
    tech: ['Astro', 'Tailwind CSS', 'TypeScript', 'PhotoSwipe'],
    details: [
      { kind: 'text', headingKey: 'm.brief', bodyKey: 'rp.brief' },
      {
        kind: 'list',
        headingKey: 'm.built',
        itemKeys: ['rp.built1', 'rp.built2', 'rp.built3', 'rp.built4'],
      },
      { kind: 'tech', headingKey: 'm.tech' },
      { kind: 'text', headingKey: 'm.status', bodyKey: 'rp.status' },
    ],
  },
]

export function isProjectId(value: string): value is ProjectId {
  return PROJECTS.some((project) => project.id === value)
}
