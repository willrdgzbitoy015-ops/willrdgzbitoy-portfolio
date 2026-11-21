/*
  PROJECTS
  Everything each project page (project.html?p=<id>) shows. The structure lives here;
  the words live in the dictionaries (each ...Key points at an entry in js/i18n), so every
  page is available in English and Bisaya. js/project-page.js builds the page from this.

  Fields:
    title      the project's name (the same in both languages)
    tagKey     category label (shown on the cover)
    leadKey    the short description under the title (also used on the home page card)
    badges     small labels; tone 'ok' = green, 'warn' = amber
    tech       tech tags (not translated)
    repo       public code link, or null when there is none to show
    cover      the cover screenshot (an image path, 1200 x 750); clicking it opens the lightbox
    sections   the blocks of the page, in order. Each has a `kind`:
      text        a paragraph                      { headingKey, bodyKey }
      challenges  three cards                      { headingKey, items: [{ icon, titleKey, textKey }] }
      list        numbered or bullet list          { headingKey, itemKeys, ordered }
      table       term + plain-English meaning     { headingKey, rows: [{ term | termKey, descKey }] }
      gallery     screenshots (lightbox)           { headingKey, shots: [{ src?, captionKey }] }
                  a shot without src is a slot still waiting for its screenshot
*/
window.WB = window.WB || {}

WB.PROJECTS = {
  smartfine: {
    title: 'SmartFine',
    tagKey: 'tag.mobile',
    leadKey: 'card.sf',
    badges: [
      { key: 'badge.soloProject' },
      { key: 'badge.prototype', tone: 'ok' },
      { key: 'badge.mobileWeb' },
    ],
    tech: ['React Native (Expo)', 'SQLite', 'PayMongo', 'bcrypt', 'AES-256-GCM'],
    repo: null, // [public GitHub repo link] still to come from Will
    cover: 'images/smartfine-overview-1200.webp',
    sections: [
      { kind: 'text', headingKey: 'm.overview', bodyKey: 'sf.problem' },
      {
        kind: 'challenges',
        headingKey: 'm.challenges',
        items: [
          { icon: 'shield', titleKey: 'sf.ch1.t', textKey: 'sf.ch1.d' },
          { icon: 'users', titleKey: 'sf.ch2.t', textKey: 'sf.ch2.d' },
          { icon: 'phone', titleKey: 'sf.ch3.t', textKey: 'sf.ch3.d' },
        ],
      },
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
          { termKey: 'sf.secT3', descKey: 'sf.sec3' },
          { termKey: 'sf.secT4', descKey: 'sf.sec4' },
          { term: 'AES-256-GCM', descKey: 'sf.sec5' },
          { termKey: 'sf.secT6', descKey: 'sf.sec6' },
        ],
      },
      { kind: 'text', headingKey: 'm.status', bodyKey: 'sf.status' },
      {
        kind: 'gallery',
        headingKey: 'm.gallery',
        shots: [
          { src: 'images/smartfine-student-1200.webp', captionKey: 'gal.sf1' },
          { src: 'images/smartfine-officer-1200.webp', captionKey: 'gal.sf2' },
          { src: 'images/smartfine-admin-1200.webp', captionKey: 'gal.sf3' },
        ],
      },
    ],
  },

  underground: {
    title: 'Underground Apparel POS',
    tagKey: 'tag.web',
    leadKey: 'card.ug',
    badges: [{ key: 'badge.team2' }, { key: 'badge.testing', tone: 'warn' }],
    tech: ['PHP 8', 'SQLite', 'HTML and CSS', 'JavaScript', 'Git and GitHub'],
    repo: 'https://github.com/kishakylepc-ui/CompAcc_POS',
    cover: 'images/pos-sale-1200.webp',
    sections: [
      { kind: 'text', headingKey: 'm.overview', bodyKey: 'ug.problem' },
      {
        kind: 'challenges',
        headingKey: 'm.challenges',
        items: [
          { icon: 'db', titleKey: 'ug.ch1.t', textKey: 'ug.ch1.d' },
          { icon: 'shield', titleKey: 'ug.ch2.t', textKey: 'ug.ch2.d' },
          { icon: 'users', titleKey: 'ug.ch3.t', textKey: 'ug.ch3.d' },
        ],
      },
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
      { kind: 'text', headingKey: 'm.status', bodyKey: 'ug.status' },
      {
        kind: 'gallery',
        headingKey: 'm.gallery',
        shots: [
          { src: 'images/pos-login-1200.webp', captionKey: 'gal.ugLogin' },
          { src: 'images/pos-sale-1200.webp', captionKey: 'gal.ug1' },
          { src: 'images/pos-inventory-1200.webp', captionKey: 'gal.ug2' },
          { src: 'images/pos-payroll-1200.webp', captionKey: 'gal.ug3' },
        ],
      },
    ],
  },

  rubens: {
    title: "Ruben's Photography",
    tagKey: 'tag.client',
    leadKey: 'card.rp',
    badges: [{ key: 'badge.solo' }, { key: 'badge.client', tone: 'ok' }],
    tech: ['Astro', 'Tailwind CSS', 'TypeScript', 'PhotoSwipe'],
    repo: null, // the repository is private
    cover: 'images/rubens-home-1200.webp',
    sections: [
      { kind: 'text', headingKey: 'm.brief', bodyKey: 'rp.brief' },
      {
        kind: 'challenges',
        headingKey: 'm.challenges',
        items: [
          { icon: 'mail', titleKey: 'rp.ch1.t', textKey: 'rp.ch1.d' },
          { icon: 'eye', titleKey: 'rp.ch2.t', textKey: 'rp.ch2.d' },
          { icon: 'layout', titleKey: 'rp.ch3.t', textKey: 'rp.ch3.d' },
        ],
      },
      {
        kind: 'list',
        headingKey: 'm.built',
        itemKeys: ['rp.built1', 'rp.built2', 'rp.built3', 'rp.built4'],
      },
      { kind: 'text', headingKey: 'm.status', bodyKey: 'rp.status' },
      {
        kind: 'gallery',
        headingKey: 'm.gallery',
        shots: [
          { src: 'images/rubens-home-1200.webp', captionKey: 'gal.rp1' },
          { src: 'images/rubens-work-1200.webp', captionKey: 'gal.rp2' },
          { src: 'images/rubens-mobile-1200.webp', captionKey: 'gal.rp3' },
        ],
      },
    ],
  },
}

/* The order of the "Next project" link at the bottom of each page. */
WB.PROJECT_ORDER = ['smartfine', 'underground', 'rubens']
