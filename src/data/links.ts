import type { TranslationKey } from '../i18n/en'

/** Page sections in order. `id` is the anchor (#about), `number` shows in the frame tag ("Frame 01 · About") and the mobile menu. */
export const SECTIONS = [
  {
    id: 'about',
    number: '01',
    frameKey: 'frame.about',
    navKey: 'nav.about',
    titleKey: 'about.title',
  },
  {
    id: 'skills',
    number: '02',
    frameKey: 'frame.skills',
    navKey: 'nav.skills',
    titleKey: 'skills.title',
  },
  {
    id: 'projects',
    number: '03',
    frameKey: 'frame.projects',
    navKey: 'nav.projects',
    titleKey: 'projects.title',
  },
  { id: 'demo', number: '04', frameKey: 'frame.demo', navKey: 'nav.demo', titleKey: 'demo.title' },
  {
    id: 'contact',
    number: '05',
    frameKey: 'frame.contact',
    navKey: 'nav.contact',
    titleKey: 'contact.title',
  },
] as const satisfies readonly {
  id: string
  number: string
  frameKey: TranslationKey
  navKey: TranslationKey
  titleKey: TranslationKey
}[]

export const EMAIL = 'willrdgzbitoy015@gmail.com'

/** Social links shown in the footer (and later in the Contact section). Names are brand names, so not translated. */
export const SOCIALS = [
  { name: 'GitHub', href: 'https://github.com/willrdgzbitoy015-ops' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/will-bitoy-637305417/' },
  { name: 'Facebook', href: 'https://www.facebook.com/willrdrgzbitoy001' },
  { name: 'Instagram', href: 'https://www.instagram.com/_cheeze.dogg/' },
  { name: 'YouTube', href: 'https://www.youtube.com/@guren.325' },
] as const

export const RESUME = {
  href: '/will-bitoy-resume.pdf',
  fileName: 'will-bitoy-resume.pdf',
  // Flip to true once public/will-bitoy-resume.pdf exists. Until then the
  // resume buttons show a short message instead of downloading a broken file.
  available: false,
}
