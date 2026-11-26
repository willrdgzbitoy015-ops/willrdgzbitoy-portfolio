/*
  PROJECTS
  Everything each project page (project.html?p=<id>) shows: the structure and the words.
  js/project-page.js builds the page from this. Text can use **bold** and [placeholder]
  (something Will still has to fill in); WB.rich in js/core.js styles those.

  Fields:
    title      the project's name
    tag        category label (shown on the cover)
    lead       the short description under the title (the home page card says the same)
    badges     small labels; tone 'ok' = green, 'warn' = amber
    tech       tech tags
    repo       public code link, or null when there is none to show
    live       the live website's address (adds a "Visit Site" button); leave it out when there is none
    cover      the cover screenshot (an image path, 1200 x 750); clicking it opens the lightbox
    sections   the blocks of the page, in order. Each has a `kind`:
      text        a paragraph                      { heading, body }
      challenges  three cards                      { heading, items: [{ icon, title, text }] }
      list        numbered or bullet list          { heading, items, ordered }
      table       term + plain-English meaning     { heading, rows: [{ term, desc }] }
      gallery     screenshots (lightbox)           { heading, shots: [{ src?, caption }] }
                  a shot without src is a slot still waiting for its screenshot
*/
window.WB = window.WB || {}

WB.PROJECTS = {
  smartfine: {
    title: 'SmartFine',
    tag: 'Mobile app',
    lead: 'A student fines system for schools: officers scan a QR code, students see the fine instantly and pay through GCash.',
    badges: [
      { label: 'Solo project' },
      { label: 'Working prototype', tone: 'ok' },
      { label: 'Mobile app + web version' },
    ],
    tech: ['React Native (Expo)', 'SQLite', 'PayMongo', 'bcrypt', 'AES-256-GCM'],
    repo: 'https://github.com/willrdgzbitoy015-ops/Smartfine',
    cover: 'images/smartfine-overview-1200.webp',
    sections: [
      {
        kind: 'text',
        heading: 'Overview',
        body: 'Paper fine records are easy to lose, hard for students to check and easy to change without anyone noticing.',
      },
      {
        kind: 'challenges',
        heading: 'Challenges',
        items: [
          {
            icon: 'shield',
            title: 'Records nobody can quietly change',
            text: 'Every action goes into a log trail where each entry is hashed and chained to the one before, so an edited or deleted record shows.',
          },
          {
            icon: 'users',
            title: 'Three kinds of users, one app',
            text: 'Students, fines officers and administrators each see only what their role allows.',
          },
          {
            icon: 'phone',
            title: 'Paying without risking real money',
            text: 'GCash payments run through PayMongo in test mode while the app is a prototype, so no real money moves.',
          },
        ],
      },
      {
        kind: 'list',
        heading: 'How it works',
        ordered: true,
        items: [
          "An officer scans the student's QR code.",
          'The officer records the violation and attaches photo evidence.',
          'The student sees the fine instantly on their phone.',
          'The student pays through GCash (via PayMongo) or at the cashier.',
          'If a fine was a mistake, the student requests a refund and an administrator approves or rejects it.',
          'Every action is written to a log trail where each entry is hashed and chained to the one before.',
        ],
      },
      {
        kind: 'list',
        heading: 'Three roles',
        items: [
          '**Student**: sees fines, pays, requests refunds.',
          '**Fines officer**: scans QR codes and records violations.',
          '**Administrator**: manages student, officer and admin accounts and the fine types, records cash payments, handles refunds, and sees reports, the log trail and encrypted backups.',
        ],
      },
      {
        kind: 'table',
        heading: 'Security in plain English',
        rows: [
          { term: 'bcrypt', desc: "A stolen database still can't reveal passwords." },
          { term: 'Email OTP', desc: "A stolen password alone isn't enough to log in." },
          {
            term: 'Account lockout',
            desc: 'Stops attackers from guessing passwords over and over.',
          },
          { term: 'Session control', desc: "A phone left logged in doesn't stay logged in." },
          {
            term: 'AES-256-GCM',
            desc: "Daily backups (saved on my laptop and Google Drive) can't be read if stolen, and any change to them is detected.",
          },
          {
            term: 'Log trail',
            desc: 'Each entry is hashed and chained to the one before, so no one can quietly edit or delete a record.',
          },
        ],
      },
      {
        kind: 'text',
        heading: 'Status',
        body: 'Working prototype, finished October 2026: a mobile app with a web version. Payments run in PayMongo test mode, so no real money moves. Tested by classmates, teachers and friends. Built for Application Development and Information Assurance and Security 1. Code on GitHub: github.com/willrdgzbitoy015-ops/Smartfine.',
      },
      {
        kind: 'gallery',
        heading: 'Screenshot Gallery',
        shots: [
          { src: 'images/smartfine-student-1200.webp', caption: 'Student view' },
          { src: 'images/smartfine-officer-1200.webp', caption: 'Fines officer view' },
          { src: 'images/smartfine-admin-1200.webp', caption: 'Administrator view' },
        ],
      },
    ],
  },

  underground: {
    title: 'Underground Apparel POS',
    tag: 'Web system',
    lead: 'A point-of-sale and business system for a clothing shop: sales, inventory by color and size, suppliers and payroll.',
    badges: [{ label: 'Team of 2' }, { label: 'Core built · in testing', tone: 'warn' }],
    tech: ['PHP 8', 'SQLite', 'HTML and CSS', 'JavaScript', 'Git and GitHub'],
    repo: 'https://github.com/kishakylepc-ui/CompAcc_POS',
    cover: 'images/pos-sale-1200.webp',
    sections: [
      {
        kind: 'text',
        heading: 'Overview',
        body: 'Underground Apparel sells clothes that come in many color and size variants. Tracking sales, stock, suppliers and staff pay by hand gets messy fast.',
      },
      {
        kind: 'challenges',
        heading: 'Challenges',
        items: [
          {
            icon: 'db',
            title: 'One shirt, many variants',
            text: 'Every product comes in several colors and sizes, so stock is tracked per variant, with product photos and stock losses.',
          },
          {
            icon: 'shield',
            title: 'Voids that need approval',
            text: "A cashier can only void a sale when a manager or admin approves it, so sales can't quietly disappear.",
          },
          {
            icon: 'users',
            title: 'Two builders, one system',
            text: "We split the modules and reviewed each other's work on GitHub, so both of us could build at the same time.",
          },
        ],
      },
      {
        kind: 'list',
        heading: 'What it does',
        items: [
          'Counter sales with receipts, discounts, VAT and voids',
          'Inventory for every color and size, with product photos and stock losses',
          'Suppliers and supplier-linked restocking',
          'Payroll with deductions, payslips and 13th month pay',
          'Expenses, reports, user accounts, settings, backups and system logs',
          'Admin, Manager and Cashier roles',
        ],
      },
      {
        kind: 'list',
        heading: 'My part',
        items: [
          'Login and dashboard redesign',
          'Supplier management and employee payroll processing',
          'User accounts and the POS fit-to-screen redesign',
          "Payroll voids and a cashier void that needs a manager's approval",
          'Shared UI: toasts, loading states and confirmations',
        ],
      },
      {
        kind: 'text',
        heading: 'Team',
        body: "Built with Kisha Kyle Samson. We split modules and review each other's work on GitHub.",
      },
      {
        kind: 'text',
        heading: 'Status',
        body: 'Core modules are built. We are now fixing bugs, tightening security and testing in the browser.',
      },
      {
        kind: 'gallery',
        heading: 'Screenshot Gallery',
        shots: [
          { src: 'images/pos-login-1200.webp', caption: 'Sign-in page' },
          { src: 'images/pos-sale-1200.webp', caption: 'Point of sale' },
          { src: 'images/pos-inventory-1200.webp', caption: 'Inventory' },
          { src: 'images/pos-payroll-1200.webp', caption: 'Payroll' },
        ],
      },
    ],
  },

  rubens: {
    title: "Ruben's Photography",
    tag: 'Client website',
    lead: 'A one-page showcase site for a photographer in Palompon, where every "Book" button opens Messenger.',
    badges: [{ label: 'Solo' }, { label: 'Client website', tone: 'ok' }],
    tech: ['Astro', 'Tailwind CSS', 'TypeScript', 'PhotoSwipe'],
    repo: null, // the repository is private
    live: 'https://rubens-photography-palompon.netlify.app/',
    cover: 'images/rubens-home-1200.webp',
    sections: [
      {
        kind: 'text',
        heading: 'The brief',
        body: 'A local photographer in Palompon needed a site that shows his work and gets people talking to him, with no prices or booking forms.',
      },
      {
        kind: 'challenges',
        heading: 'Challenges',
        items: [
          {
            icon: 'mail',
            title: 'No prices, no booking forms',
            text: 'Rates depend on the location, so every "Book" button opens Messenger and the quote happens in a real conversation.',
          },
          {
            icon: 'eye',
            title: 'A photo-heavy site that stays fast',
            text: 'Photos are resized and compressed when the site is built, and the gallery opens the big versions only when asked.',
          },
          {
            icon: 'layout',
            title: 'Easy for the owner to update',
            text: 'All the text, services, reviews and photo lists live in one file, so changing the wording never means touching the layout.',
          },
        ],
      },
      {
        kind: 'list',
        heading: 'What I built',
        items: [
          'A full-screen hero slideshow and a portfolio with a photo lightbox',
          'Services, client reviews and an FAQ',
          'Every "Book" button opens Messenger, so quotes happen in a real conversation',
          'Light and dark themes and a short loading intro',
        ],
      },
      {
        kind: 'text',
        heading: 'Status',
        body: 'Built November 2026. Live at rubens-photography-palompon.netlify.app.',
      },
      {
        kind: 'gallery',
        heading: 'Screenshot Gallery',
        shots: [
          { src: 'images/rubens-home-1200.webp', caption: 'Home page with the hero slideshow' },
          { src: 'images/rubens-work-1200.webp', caption: 'Portfolio section' },
          { src: 'images/rubens-mobile-1200.webp', caption: 'On a phone' },
        ],
      },
    ],
  },
}

/* The order of the "Next project" link at the bottom of each page. */
WB.PROJECT_ORDER = ['smartfine', 'underground', 'rubens']
