/*
  PROJECT DETAILS
  What the "Details" pop-up shows for each project. The structure lives here; the words
  live in the dictionaries (each ...Key points at an entry in js/i18n), so every project
  is available in English and Bisaya. The cards themselves are written in index.html.

  Each block in `details` has a `kind`:
    text   a paragraph                       { headingKey, bodyKey }
    list   bullets (or numbers if ordered)   { headingKey, itemKeys, ordered }
    table  term + plain-English meaning      { headingKey, rows: [{ term | termKey, descKey }] }
    tech   the project's tech chips          { headingKey }
*/
window.WB = window.WB || {}

WB.PROJECTS = {
  smartfine: {
    title: 'SmartFine',
    badges: [{ key: 'badge.soloProject' }, { key: 'badge.prototype', tone: 'ok' }],
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
          { termKey: 'sf.secT3', descKey: 'sf.sec3' },
          { termKey: 'sf.secT4', descKey: 'sf.sec4' },
          { term: 'AES-256-GCM', descKey: 'sf.sec5' },
          { termKey: 'sf.secT6', descKey: 'sf.sec6' },
        ],
      },
      { kind: 'tech', headingKey: 'm.tech' },
      { kind: 'text', headingKey: 'm.status', bodyKey: 'sf.status' },
      { kind: 'text', headingKey: 'm.shots', bodyKey: 'sf.shots' },
    ],
  },

  underground: {
    title: 'Underground Apparel POS',
    badges: [{ key: 'badge.team2' }, { key: 'badge.testing', tone: 'warn' }],
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

  rubens: {
    title: "Ruben's Photography",
    badges: [{ key: 'badge.solo' }, { key: 'badge.client', tone: 'ok' }],
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
}
