import type { TranslationKey } from '../i18n/en'
import type { ProjectId } from './projects'

/** 3 = Use often, 2 = Comfortable, 1 = Learning. No level = no meter shown. */
export type SkillLevel = 1 | 2 | 3

/** Where a skill was used: a project card, or this website itself. */
export type SkillUse = ProjectId | 'portfolio'

export interface Skill {
  /** Unique id, also used to remember which skill is selected. */
  id: string
  /** Tech and brand names stay the same in both languages... */
  name: string
  /** ...but descriptive names ("Team collaboration") have a translation key. */
  nameKey?: TranslationKey
  level?: SkillLevel
  usedIn: SkillUse[]
}

export interface SkillGroup {
  titleKey: TranslationKey
  skills: Skill[]
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    titleKey: 'group.build',
    skills: [
      { id: 'react-native', name: 'React Native', level: 2, usedIn: ['smartfine'] },
      { id: 'expo', name: 'Expo', level: 2, usedIn: ['smartfine'] },
      { id: 'javascript', name: 'JavaScript', level: 2, usedIn: ['smartfine', 'underground'] },
      { id: 'typescript', name: 'TypeScript', usedIn: ['rubens', 'portfolio'] },
      { id: 'react', name: 'React', usedIn: ['portfolio'] },
      {
        id: 'html-css',
        name: 'HTML and CSS',
        nameKey: 'skill.htmlcss',
        level: 2,
        usedIn: ['underground', 'rubens'],
      },
      { id: 'php', name: 'PHP', usedIn: ['underground'] },
      { id: 'python', name: 'Python', usedIn: [] },
      { id: 'java', name: 'Java', usedIn: [] },
      { id: 'sqlite', name: 'SQLite', level: 3, usedIn: ['smartfine', 'underground'] },
      { id: 'mysql', name: 'MySQL', usedIn: [] },
      { id: 'paymongo', name: 'PayMongo (GCash)', level: 2, usedIn: ['smartfine'] },
      {
        id: 'analysis',
        name: 'System analysis',
        nameKey: 'skill.analysis',
        level: 2,
        usedIn: ['smartfine', 'underground', 'dialysis'],
      },
    ],
  },
  {
    titleKey: 'group.secure',
    skills: [
      { id: 'bcrypt', name: 'bcrypt', level: 1, usedIn: ['smartfine'] },
      { id: 'aes', name: 'AES-256-GCM', level: 1, usedIn: ['smartfine'] },
      { id: 'otp', name: 'Email OTP', level: 2, usedIn: ['smartfine'] },
      {
        id: 'rbac',
        name: 'Role-based access',
        nameKey: 'skill.rbac',
        level: 3,
        usedIn: ['smartfine', 'underground'],
      },
      {
        id: 'audit',
        name: 'Audit log trail',
        nameKey: 'skill.audit',
        level: 3,
        usedIn: ['smartfine', 'underground'],
      },
    ],
  },
  {
    titleKey: 'group.tools',
    skills: [
      {
        id: 'git',
        name: 'Git and GitHub',
        nameKey: 'skill.git',
        usedIn: ['underground', 'rubens'],
      },
      { id: 'vscode', name: 'VS Code', usedIn: ['smartfine', 'underground', 'rubens'] },
      { id: 'android-studio', name: 'Android Studio', usedIn: [] },
      { id: 'dbeaver', name: 'DBeaver', usedIn: [] },
      { id: 'figma', name: 'Figma', usedIn: [] },
      { id: 'office', name: 'Microsoft Office', usedIn: [] },
    ],
  },
  {
    titleKey: 'group.create',
    skills: [
      { id: 'canva', name: 'Canva', usedIn: [] },
      { id: 'photoshop', name: 'Photoshop', usedIn: [] },
      { id: 'capcut', name: 'CapCut', usedIn: [] },
      { id: 'alight-motion', name: 'Alight Motion', usedIn: [] },
      { id: 'after-effects', name: 'After Effects', usedIn: [] },
      { id: 'virtual-dj', name: 'Virtual DJ', usedIn: [] },
    ],
  },
  {
    titleKey: 'group.beyond',
    skills: [
      { id: 'pc', name: 'PC assembly', nameKey: 'skill.pc', level: 2, usedIn: [] },
      {
        id: 'troubleshooting',
        name: 'Troubleshooting',
        nameKey: 'skill.troubleshooting',
        level: 3,
        usedIn: [],
      },
      {
        id: 'networking',
        name: 'Networking basics',
        nameKey: 'skill.networking',
        level: 2,
        usedIn: [],
      },
      { id: 'costing', name: 'Recipe costing', nameKey: 'skill.costing', level: 3, usedIn: [] },
      {
        id: 'team',
        name: 'Team collaboration',
        nameKey: 'skill.team',
        level: 3,
        usedIn: ['underground', 'dialysis'],
      },
    ],
  },
]

/** Flat list of every skill, for quick lookup by id. */
export const ALL_SKILLS: Skill[] = SKILL_GROUPS.flatMap((group) => group.skills)

export interface Certification {
  /** Short text inside the round seal. */
  seal: string
  titleKey: TranslationKey
  descKey: TranslationKey
}

export const CERTIFICATIONS: Certification[] = [
  { seal: 'NC II', titleKey: 'cert.css.title', descKey: 'cert.css.desc' },
  { seal: 'NC II', titleKey: 'cert.bpp.title', descKey: 'cert.bpp.desc' },
  { seal: '2023', titleKey: 'cert.honors.title', descKey: 'cert.honors.desc' },
]
