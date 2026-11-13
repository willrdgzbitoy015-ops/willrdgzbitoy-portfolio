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
  // Hero extras
  'frame.home': 'Home',
  'hero.statusLabel': 'Currently working on',
  'hero.statusText': 'A scheduling system for Palompon Hemodialysis Center (capstone)',
  'hero.timeIn': 'in Palompon',
  'hero.photoAlt':
    'Will crouching and looking down at the camera, one gloved hand raised toward it.',

  // About
  'about.bio1':
    "I'm Will, a 3rd-year BSIT student from Palompon, Leyte. I learn by breaking things and fixing them, and I build websites and apps that make everyday tasks faster and easier.",
  'about.bio2a': 'My rule is simple:',
  'about.bio2b': 'Fine records on paper?',
  'about.bio2c':
    "That's how SmartFine was born: QR scans, instant notices and GCash payments instead of paper.",
  'about.bio3':
    "I've also worked part-time in data entry, customer support and as a driver. That work taught me two things I still build around: records have to be accurate, and users should never feel lost. It also taught me to keep going and do my best every day, even when things feel dark, and that people remember how you lived, not how much you earned.",
  'about.photoAlt':
    'Will in a black hoodie on a grassy hilltop, looking out over the sea at sunset.',
  'about.whyLabel': 'Why IT?',
  'about.whyQuote':
    "Honestly, I had no choice. It all started because of my cousin. Now he's living his best life, and I'm here debugging at 2 AM.",
  'role.dev.title': 'Developer',
  'role.dev.desc': 'Builds web and mobile systems with React Native, Expo and SQLite.',
  'role.encoder.title': 'Data encoder',
  'role.encoder.desc': 'Learned accuracy and respect for clean records.',
  'role.support.title': 'Customer support',
  'role.support.desc': 'Learned to listen first and design for real users.',
  'role.driver.title': 'Driver',
  'role.driver.desc':
    'Learned to be punctual and reliable, and to get people where they need to go safely.',
  'timeline.capstone': 'hemodialysis scheduling system (capstone, team of 2)',
  'timeline.rubens': "Ruben's Photography website",
  'timeline.smartfine': 'SmartFine working prototype',
  'timeline.css': 'Computer Systems Servicing NC II',
  'timeline.pos': 'Underground Apparel POS (team of 2)',
  'timeline.bsit': 'BS Information Technology, Western Leyte College',
  'timeline.bpp': 'Bread and Pastry Production NC II',
  'timeline.grad': 'Isabel National Comprehensive School, with honors',
  'timeline.award': 'Best Home Economics Student and Best Presenter',
  'timeline.hailey': 'admin of the Hailey Facebook page',
  'timeline.kira': 'editor of Kira, an anime edits page',
  'timeline.work': 'data entry, customer support and driver (part-time)',
  'facts.based': 'Based in',
  'facts.basedValue': 'Palompon, Leyte, Philippines',
  'facts.studying': 'Studying',
  'facts.studyingValue':
    'BS Information Technology, 3rd year, Western Leyte College (class of 2028)',
  'facts.speaks': 'Speaks',
  'facts.speaksValue': 'English, Filipino, Bisaya',
  'facts.offscreen': 'Off-screen',
  'facts.offscreenValue': 'Gaming, and driving anything with wheels, from motorbikes to cars',
  'facts.fun': 'Fun fact',
  'facts.funValue':
    'I can fix your PC and teach you HTML like a lumpia recipe: everything has to be wrapped right.',

  // Skills
  'skills.lead':
    'My skills as a component library. Every skill links to the project where I used it.',
  'skills.panel': 'Assets · Components',
  'level.3': 'Use often',
  'level.2': 'Comfortable',
  'level.1': 'Learning',
  'group.build': 'Build',
  'group.secure': 'Secure',
  'group.tools': 'Tools',
  'group.create': 'Create',
  'group.beyond': 'Beyond code',
  'skill.htmlcss': 'HTML and CSS',
  'skill.analysis': 'System analysis',
  'skill.rbac': 'Role-based access',
  'skill.audit': 'Audit log trail',
  'skill.git': 'Git and GitHub',
  'skill.pc': 'PC assembly',
  'skill.troubleshooting': 'Troubleshooting',
  'skill.networking': 'Networking basics',
  'skill.costing': 'Recipe costing',
  'skill.team': 'Team collaboration',
  'skills.hint': 'Select a skill to see where I used it.',
  'skills.usedIn': '{skill} is used in',
  'skills.notUsed': "{skill} isn't in these projects yet. I use it outside them.",
  'skills.clear': 'Clear',
  'skills.thisPortfolio': 'This portfolio',
  'cert.css.title': 'Computer Systems Servicing',
  'cert.css.desc': 'National Certificate II · 2026 · assembly, setup, troubleshooting, networking',
  'cert.bpp.title': 'Bread and Pastry Production',
  'cert.bpp.desc': 'National Certificate II · 2023 · baking, costing, food safety',
  'cert.honors.title': 'With honors',
  'cert.honors.desc':
    'Isabel National Comprehensive School · Best Home Economics Student and Best Presenter',

  // Projects: filters, buttons, badges
  'filter.label': 'Filter projects',
  'filter.all': 'All',
  'filter.mobile': 'Mobile',
  'filter.web': 'Web',
  'filter.solo': 'Solo',
  'filter.team': 'Team',
  'projects.details': 'Details',
  'projects.caseStudy': 'Read the case study',
  'projects.tryDemo': 'Try the live demo',
  'modal.close': 'Close',
  'badge.featured': 'Featured',
  'badge.soloProject': 'Solo project',
  'badge.prototype': 'Working prototype',
  'badge.mobileWeb': 'Mobile app + web version',
  'badge.team2': 'Team of 2',
  'badge.testing': 'Core built · in testing',
  'badge.solo': 'Solo',
  'badge.client': 'Client website',
  'badge.capstone': 'Capstone · team of 2',
  'badge.planning': 'Planning · 2027',

  // Phone mockup on the SmartFine card (reused by the live demo)
  'phone.student': 'Student',
  'phone.unpaidBalance': 'Unpaid balance',
  'phone.myFines': 'My fines',
  'phone.pay': 'Pay with GCash',
  'phone.today': 'Today 8:02',
  'phone.mon': 'Mon 7:31',
  'pill.unpaid': 'Unpaid',
  'pill.paid': 'Paid',
  'fine.noId': 'No ID',
  'fine.late': 'Late for flag ceremony',

  // Project details: section headings
  'm.problem': 'The problem',
  'm.how': 'How it works',
  'm.roles': 'Three roles',
  'm.security': 'Security in plain English',
  'm.tech': 'Tech',
  'm.status': 'Status',
  'm.shots': 'Screenshots and code',
  'm.what': 'What it does',
  'm.myPart': 'My part',
  'm.team': 'Team',
  'm.brief': 'The brief',
  'm.built': 'What I built',
  'm.plan': 'The plan',
  'm.myRole': 'My role',

  // SmartFine
  'sf.hook': 'From paper logbooks to a QR scan.',
  'sf.desc':
    "A student fines system for schools. Officers scan a student's QR code and record the violation with photo evidence. The student sees the fine instantly and pays through GCash (PayMongo) or at the cashier. If a fine was a mistake, the student requests a refund and an administrator approves or rejects it.",
  'sf.fx1': '3 roles',
  'sf.fx2': 'Hash-chained log trail',
  'sf.fx3': 'Email OTP',
  'sf.fx4': 'Encrypted daily backups',
  'sf.fx5': 'Tested by classmates, teachers and friends',
  'sf.built':
    'Built for Application Development + Information Assurance and Security 1 · October 2026 · Code: [public GitHub repo link]',
  'sf.problem':
    'Paper fine records are easy to lose, hard for students to check and easy to change without anyone noticing.',
  'sf.how1': "An officer scans the student's QR code.",
  'sf.how2': 'The officer records the violation and attaches photo evidence.',
  'sf.how3': 'The student sees the fine instantly on their phone.',
  'sf.how4': 'The student pays through GCash (via PayMongo) or at the cashier.',
  'sf.how5':
    'If a fine was a mistake, the student requests a refund and an administrator approves or rejects it.',
  'sf.how6':
    'Every action is written to a log trail where each entry is hashed and chained to the one before.',
  'sf.role1': '**Student**: sees fines, pays, requests refunds.',
  'sf.role2': '**Fines officer**: scans QR codes and records violations.',
  'sf.role3': '**Administrator**: [duties to be confirmed by Will]',
  'sf.secT3': 'Account lockout',
  'sf.secT4': 'Session control',
  'sf.secT6': 'Log trail',
  'sf.sec1': "A stolen database still can't reveal passwords.",
  'sf.sec2': "A stolen password alone isn't enough to log in.",
  'sf.sec3': 'Stops attackers from guessing passwords over and over.',
  'sf.sec4': "A phone left logged in doesn't stay logged in.",
  'sf.sec5':
    "Daily backups (saved on my laptop and Google Drive) can't be read if stolen, and any change to them is detected.",
  'sf.sec6':
    'Each entry is hashed and chained to the one before, so no one can quietly edit or delete a record.',
  'sf.status':
    'Working prototype, finished October 2026: a mobile app with a web version. Payments run in PayMongo test mode, so no real money moves. Tested by classmates, teachers and friends. Built for Application Development and Information Assurance and Security 1.',
  'sf.shots': '[3 screenshots with dummy data] [public GitHub repo link]',

  // Underground Apparel POS
  'ug.desc':
    'A point-of-sale and business system for a clothing shop whose products come in color and size variants: sales, receipts, inventory, suppliers, payroll and reports.',
  'ug.note':
    'My part: login and dashboard, suppliers, payroll processing, accounts, POS redesign, manager-approved voids',
  'ug.problem':
    'Underground Apparel sells clothes that come in many color and size variants. Tracking sales, stock, suppliers and staff pay by hand gets messy fast.',
  'ug.what1': 'Counter sales with receipts, discounts, VAT and voids',
  'ug.what2': 'Inventory for every color and size, with product photos and stock losses',
  'ug.what3': 'Suppliers and supplier-linked restocking',
  'ug.what4': 'Payroll with deductions, payslips and 13th month pay',
  'ug.what5': 'Expenses, reports, user accounts, settings, backups and system logs',
  'ug.what6': 'Admin, Manager and Cashier roles',
  'ug.part1': 'Login and dashboard redesign',
  'ug.part2': 'Supplier management and employee payroll processing',
  'ug.part3': 'User accounts and the POS fit-to-screen redesign',
  'ug.part4': "Payroll voids and a cashier void that needs a manager's approval",
  'ug.part5': 'Shared UI: toasts, loading states and confirmations',
  'ug.team':
    "Built with [teammate's name, only if they agree]. We split modules and review each other's work on GitHub.",
  'ug.status':
    'Core modules are built. We are now fixing bugs, tightening security and testing in the browser. [screenshots]',

  // Ruben's Photography
  'rp.desc':
    'A one-page showcase site for a photographer in Palompon: hero slideshow, photo lightbox, services, client reviews and FAQ. Every "Book" button opens Messenger. No prices or booking forms, by design.',
  'rp.note': 'Live at: [link once deployed]',
  'rp.brief':
    'A local photographer in Palompon needed a site that shows his work and gets people talking to him, with no prices or booking forms.',
  'rp.built1': 'A full-screen hero slideshow and a portfolio with a photo lightbox',
  'rp.built2': 'Services, client reviews and an FAQ',
  'rp.built3': 'Every "Book" button opens Messenger, so quotes happen in a real conversation',
  'rp.built4': 'Light and dark themes and a short loading intro',
  'rp.status': 'Built November 2026. Live at [link once deployed].',

  // Hemodialysis Scheduling System
  'hd.desc':
    'Palompon Hemodialysis Center books sessions and checks free slots in Excel. Our capstone replaces that with a system where staff book patients and see open slots at a glance.',
  'hd.note': 'My role: programming and documentation, shared with my teammate',
  'hd.techChip': 'Tech stack: to be decided',
  'hd.problem':
    'Palompon Hemodialysis Center books sessions and checks which slots are free in Excel sheets, which is slow and easy to get wrong.',
  'hd.plan':
    'A scheduling system where staff book patients into sessions and see open slots at a glance.',
  'hd.role': 'We are a team of two. We share the programming and the documentation.',
  'hd.techBody': "To be decided. We haven't started coding yet.",
  'hd.status': 'Planning stage. Expected to finish in 2027.',
} as const

/** Every valid key, e.g. 'nav.about'. Using a key that doesn't exist is a compile error. */
export type TranslationKey = keyof typeof en

/**
 * The shape every other language must have: all of the English keys, each a string.
 * A missing key (or a typo'd extra key) in ceb.ts makes `npm run build` fail.
 */
export type Dictionary = Record<TranslationKey, string>
