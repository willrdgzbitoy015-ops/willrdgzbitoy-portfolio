/*
  ENGLISH: the master dictionary.
  Every piece of visible text (and every screen-reader label) gets a key here.
  ceb.ts must provide the same keys, or the build fails (see the types at the bottom).
*/
export const en = {
  // Navbar
  'nav.about': 'About',
  'nav.skills': 'Skills',
  'nav.projects': 'Projects',
  'nav.demo': 'Try SmartFine',
  'nav.contact': 'Contact',
  'nav.resume': 'Resume',
  'nav.home': 'Will R. Bitoy, back to top',
  'nav.sections': 'Sections',
  'nav.sectionsMobile': 'Sections (mobile)',
  'nav.language': 'Language',
  'nav.openPalette': 'Open command palette (Ctrl+K)',
  'nav.openMenu': 'Open menu',
  'nav.closeMenu': 'Close menu',
  'a11y.skip': 'Skip to content',

  // Theme button
  'theme.toNight': 'Switch to night mode',
  'theme.toDay': 'Switch to day mode',
  'theme.night': 'Night mode',
  'theme.day': 'Day mode',

  // Hero
  'hero.hi': "Hi, I'm Will.",
  'hero.h1a': 'I build systems that',
  'hero.h1b': 'replace paper.',
  'hero.sub':
    '3rd-year BS Information Technology student at Western Leyte College, based in Palompon, Leyte. I design and build web and mobile systems.',
  'cta.try': 'Try SmartFine',
  'cta.resume': 'Download resume',

  // Layer names in the frame tags: "Frame 01 · About"
  'frame.about': 'About',
  'frame.skills': 'Skills',
  'frame.projects': 'Projects',
  'frame.demo': 'Live demo',
  'frame.contact': 'Contact',

  // Section titles
  'about.title': 'About me',
  'skills.title': 'Skills',
  'projects.title': 'Projects',
  'demo.title': 'Try SmartFine',
  'contact.title': 'Submit a ticket',

  // Temporary text while the site is being built (removed in later milestones)
  'shell.comingSoon': 'This frame is still empty. Content arrives in the next milestone.',
  'toast.paletteSoon': 'The command palette arrives in milestone 3.',
  'toast.resumeSoon': 'The resume PDF is not uploaded yet.',

  // Footer
  'footer.elsewhere': 'Elsewhere',
  'footer.backToTop': 'Back to top',
  'footer.built': 'Designed and built by Will R. Bitoy',
  'footer.status': 'Zoom 100% · 6 frames',
  'footer.updated': 'Last updated',
} as const

/** Every valid key, e.g. 'nav.about'. Using a key that doesn't exist is a compile error. */
export type TranslationKey = keyof typeof en

/**
 * The shape every other language must have: all of the English keys, each a string.
 * A missing key (or a typo'd extra key) in ceb.ts makes `npm run build` fail.
 */
export type Dictionary = Record<TranslationKey, string>
