/*
  ENGLISH
  Most English text is written directly in index.html. This file holds the lines that
  JavaScript builds or changes: messages, labels that flip (Open menu / Close menu), the
  command palette, and everything on the project pages (project.html). Lines that appear
  both in index.html and on a project page are here too, word for word the same.
  js/core.js adds the text it finds in the page to this same list when the page starts,
  so afterwards WB.en has every key.

  Markers: **bold**, [placeholder Will still has to fill in], {n} / {name} = filled in by JS.
*/
window.WB = window.WB || {}

WB.en = {
  // Navbar, theme, resume
  'nav.openMenu': 'Open menu',
  'nav.closeMenu': 'Close menu',
  'theme.toNight': 'Switch to night mode',
  'theme.toDay': 'Switch to day mode',
  'theme.night': 'Night mode',
  'theme.day': 'Day mode',
  'toast.resumeSoon': 'The resume PDF is not uploaded yet.',
  'cta.contact': 'Contact Me',
  // Lines with **bold** (data-i18n-rich in index.html) must be here too: the page only
  // collects plain text by itself.
  'hero.sub':
    "**I build systems that replace paper.** I'm a 3rd-year BSIT student at Western Leyte College in Palompon, Leyte, and I design and build web and mobile systems that make everyday tasks faster and easier.",

  // Skills: the small label under each skill name, and the count for screen readers
  'skills.count': '{n} skills shown',
  'cat.lang.one': 'Language',
  'cat.frontend.one': 'Frontend',
  'cat.mobile.one': 'Mobile',
  'cat.backend.one': 'Backend',
  'cat.security.one': 'Security',
  'cat.tools.one': 'Tool',
  'cat.creative.one': 'Creative',
  'cat.beyond.one': 'Beyond code',

  // Shared by the home page cards and the project pages
  'tag.mobile': 'Mobile app',
  'tag.web': 'Web system',
  'tag.client': 'Client website',
  'card.sf':
    'A student fines system for schools: officers scan a QR code, students see the fine instantly and pay through GCash.',
  'card.ug':
    'A point-of-sale and business system for a clothing shop: sales, inventory by color and size, suppliers and payroll.',
  'card.rp':
    'A one-page showcase site for a photographer in Palompon, where every "Book" button opens Messenger.',
  'certs.preview': 'Preview',
  'phone.unpaidBalance': 'Unpaid balance',
  'phone.pay': 'Pay with GCash',
  'fine.noId': 'No ID',
  'fine.late': 'Late for flag ceremony',
  'pill.unpaid': 'Unpaid',
  'pill.paid': 'Paid',
  'badge.soloProject': 'Solo project',
  'badge.prototype': 'Working prototype',
  'badge.mobileWeb': 'Mobile app + web version',
  'badge.team2': 'Team of 2',
  'badge.testing': 'Core built · in testing',
  'badge.solo': 'Solo',
  'badge.client': 'Client website',

  // Project page
  'pp.back': 'Back to Projects',
  'pp.code': 'View Code',
  'pp.next': 'Next project',
  'pp.missingTitle': 'Project not found',
  'pp.missingText': "This project link doesn't exist. Pick one from the list on the home page.",
  'm.overview': 'Overview',
  'm.challenges': 'Challenges',
  'm.how': 'How it works',
  'm.roles': 'Three roles',
  'm.security': 'Security in plain English',
  'm.status': 'Status',
  'm.what': 'What it does',
  'm.myPart': 'My part',
  'm.team': 'Team',
  'm.brief': 'The brief',
  'm.built': 'What I built',
  'm.gallery': 'Screenshot Gallery',
  'gal.soon': '[screenshot coming soon]',
  'gal.sf1': 'Student view',
  'gal.sf2': 'Fines officer view',
  'gal.sf3': 'Administrator view',
  'gal.ug1': 'Point of sale',
  'gal.ug2': 'Inventory',
  'gal.ug3': 'Payroll',
  'gal.rp1': 'Home page with the hero slideshow',
  'gal.rp2': 'Portfolio section',
  'gal.rp3': 'On a phone',

  // SmartFine
  'sf.problem':
    'Paper fine records are easy to lose, hard for students to check and easy to change without anyone noticing.',
  'sf.ch1.t': 'Records nobody can quietly change',
  'sf.ch1.d':
    'Every action goes into a log trail where each entry is hashed and chained to the one before, so an edited or deleted record shows.',
  'sf.ch2.t': 'Three kinds of users, one app',
  'sf.ch2.d': 'Students, fines officers and administrators each see only what their role allows.',
  'sf.ch3.t': 'Paying without risking real money',
  'sf.ch3.d':
    'GCash payments run through PayMongo in test mode while the app is a prototype, so no real money moves.',
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
    'Working prototype, finished October 2026: a mobile app with a web version. Payments run in PayMongo test mode, so no real money moves. Tested by classmates, teachers and friends. Built for Application Development and Information Assurance and Security 1. Code: [public GitHub repo link]',

  // Underground Apparel POS
  'ug.problem':
    'Underground Apparel sells clothes that come in many color and size variants. Tracking sales, stock, suppliers and staff pay by hand gets messy fast.',
  'ug.ch1.t': 'One shirt, many variants',
  'ug.ch1.d':
    'Every product comes in several colors and sizes, so stock is tracked per variant, with product photos and stock losses.',
  'ug.ch2.t': 'Voids that need approval',
  'ug.ch2.d':
    "A cashier can only void a sale when a manager or admin approves it, so sales can't quietly disappear.",
  'ug.ch3.t': 'Two builders, one system',
  'ug.ch3.d':
    "We split the modules and reviewed each other's work on GitHub, so both of us could build at the same time.",
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
  'rp.brief':
    'A local photographer in Palompon needed a site that shows his work and gets people talking to him, with no prices or booking forms.',
  'rp.ch1.t': 'No prices, no booking forms',
  'rp.ch1.d':
    'Rates depend on the location, so every "Book" button opens Messenger and the quote happens in a real conversation.',
  'rp.ch2.t': 'A photo-heavy site that stays fast',
  'rp.ch2.d':
    'Photos are resized and compressed when the site is built, and the gallery opens the big versions only when asked.',
  'rp.ch3.t': 'Easy for the owner to update',
  'rp.ch3.d':
    'All the text, services, reviews and photo lists live in one file, so changing the wording never means touching the layout.',
  'rp.built1': 'A full-screen hero slideshow and a portfolio with a photo lightbox',
  'rp.built2': 'Services, client reviews and an FAQ',
  'rp.built3': 'Every "Book" button opens Messenger, so quotes happen in a real conversation',
  'rp.built4': 'Light and dark themes and a short loading intro',
  'rp.status': 'Built November 2026. Live at [link once deployed].',

  // Contact form (text that JavaScript builds)
  'form.sending': 'Sending…',
  'form.errName': 'Please enter your name.',
  'form.errEmail': 'Please enter a valid email address, like juan@example.com.',
  'form.errMessage': 'Please write a message of at least 10 characters.',
  'form.failed':
    "The message couldn't be sent. Please check your connection and try again, or email me directly:",
  'form.notConnected': "The form isn't connected yet. Please email me directly:",
  'toast.copied': 'Email address copied.',
  'toast.copyFailed': "Couldn't copy. Please select the address and copy it yourself.",

  // Lightbox
  'lb.prev': 'Previous',
  'lb.next': 'Next',

  // Command palette
  'cmdk.empty': 'No matches. Try "projects" or "theme".',
  'cmd.about': 'Go to About',
  'cmd.skills': 'Go to Skills',
  'cmd.projects': 'Go to Projects',
  'cmd.experience': 'Go to Experience',
  'cmd.certificates': 'Go to Certificates',
  'cmd.contact': 'Go to Contact',
  'cmd.top': 'Back to top',
  'cmd.openProject': 'Open project: {name}',
  'cmd.theme': 'Switch Day / Night mode',
  'cmd.lang': 'Switch language (English / Bisaya)',
  'cmd.resume': 'Download CV',
  'cmd.copyEmail': 'Copy email address',
  'cmd.github': 'Open GitHub',
  'cmd.linkedin': 'Open LinkedIn',
  'hint.section': 'Section',
  'hint.project': 'Project',
  'hint.theme': 'Theme',
  'hint.lang': 'Language',
  'hint.file': 'File',
  'hint.contact': 'Contact',
  'hint.link': 'Link',
}
