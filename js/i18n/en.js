/*
  ENGLISH
  Most English text is written directly in index.html. This file only holds the lines
  that JavaScript builds or changes: the project details pop-up, messages, and labels
  that flip (Open menu / Close menu). js/core.js adds the text it finds in index.html
  to this same list when the page starts, so afterwards WB.en has every key.

  Markers: **bold**, [placeholder Will still has to fill in], {skill} = the skill's name.
*/
window.WB = window.WB || {}

WB.en = {
  'nav.openMenu': 'Open menu',
  'nav.closeMenu': 'Close menu',
  'theme.toNight': 'Switch to night mode',
  'theme.toDay': 'Switch to day mode',
  'theme.night': 'Night mode',
  'theme.day': 'Day mode',
  'toast.paletteSoon': 'The command palette arrives in milestone 3.',
  'toast.resumeSoon': 'The resume PDF is not uploaded yet.',
  'skills.usedIn': '{skill} is used in',
  'skills.notUsed': "{skill} isn't in these projects yet. I use it outside them.",
  'skills.clear': 'Clear',
  'skills.thisPortfolio': 'This portfolio',
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
  'rp.note': 'Live at: [link once deployed]',
  'rp.brief':
    'A local photographer in Palompon needed a site that shows his work and gets people talking to him, with no prices or booking forms.',
  'rp.built1': 'A full-screen hero slideshow and a portfolio with a photo lightbox',
  'rp.built2': 'Services, client reviews and an FAQ',
  'rp.built3': 'Every "Book" button opens Messenger, so quotes happen in a real conversation',
  'rp.built4': 'Light and dark themes and a short loading intro',
  'rp.status': 'Built November 2026. Live at [link once deployed].',
}
