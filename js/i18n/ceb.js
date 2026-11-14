/*
  CEBUANO (BISAYA)
  Every piece of text on the site, by key. When BIS is on, js/core.js looks up each
  data-i18n key from index.html here. If a key is missing, the English stays and
  a warning shows in the browser console (F12), so nothing is ever blank.
  Lines Will should double-check are listed in _brief/bisaya-review.md.

  Markers: **bold**, [placeholder Will still has to fill in], {skill} = the skill's name.
*/
window.WB = window.WB || {}

WB.ceb = {
  // Navbar
  'nav.about': 'Bahin nako',
  'nav.skills': 'Kahanas',
  'nav.projects': 'Mga proyekto',
  'nav.contact': 'Kontaka ko',
  'nav.resume': 'Resume',
  'nav.home': 'Will R. Bitoy, balik sa taas',
  'nav.sections': 'Mga seksyon',
  'nav.sectionsMobile': 'Mga seksyon (mobile)',
  'nav.language': 'Pinulongan',
  'nav.openPalette': 'Ablihi ang command palette (Ctrl+K)',
  'nav.openMenu': 'Ablihi ang menu',
  'nav.closeMenu': 'Sirad-i ang menu',
  'a11y.skip': 'Laktaw ngadto sa sulod',

  // Theme button
  'theme.toNight': 'Ilisi ngadto sa night mode',
  'theme.toDay': 'Ilisi ngadto sa day mode',
  'theme.night': 'Night mode',
  'theme.day': 'Day mode',

  // Hero
  'hero.hi': 'Maayong adlaw! Ako si Will.',
  'hero.h1a': 'Nagbuhat ko og mga sistema nga',
  'hero.h1b': 'mopuli sa papel.',
  'hero.sub':
    'Ika-3 nga tuig nga estudyante sa BS Information Technology sa Western Leyte College, taga-Palompon, Leyte. Nagdisenyo ug nagbuhat ko og web ug mobile nga mga sistema.',
  'cta.work': 'Tan-awa ang akong mga gibuhat',
  'cta.resume': 'I-download ang resume',

  // Layer names in the frame tags
  'frame.about': 'Bahin nako',
  'frame.skills': 'Kahanas',
  'frame.projects': 'Mga proyekto',
  'frame.contact': 'Kontak',

  // Section titles
  'about.title': 'Bahin nako',
  'skills.title': 'Mga kahanas',
  'projects.title': 'Mga proyekto',
  'contact.title': 'Padala og tiket',

  // Temporary text while the site is being built
  'shell.comingSoon': 'Wala pay sulod kining frame. Moabot ang sulod sa sunod nga milestone.',
  'toast.paletteSoon': 'Moabot ang command palette sa milestone 3.',
  'toast.resumeSoon': 'Wala pa ma-upload ang resume PDF.',

  // Footer
  'footer.elsewhere': 'Sa ubang dapit',
  'footer.backToTop': 'Balik sa taas',
  'footer.built': 'Gidisenyo ug gibuhat ni Will R. Bitoy',
  'footer.status': 'Zoom 100% · 5 ka frame · Katapusang gi-update Nobyembre 2026',
  // Hero extras
  'frame.home': 'Home',
  'hero.statusLabel': 'Pinakabag-ong gibuhat',
  'hero.statusText': "Ruben's Photography, website sa kliyente (Nob 2026)",
  'hero.timeIn': 'sa Palompon',
  'hero.photoAlt':
    'Si Will nga nagtuy-od sa iyang kamot nga naka-glove padulong sa camera, nagtan-aw paubos niini.',

  // About
  'about.bio1':
    'Ako si Will, ika-3 nga tuig nga estudyante sa BSIT nga taga-Palompon, Leyte. Makakat-on ko pinaagi sa pagguba ug pag-ayo sa mga butang, ug nagbuhat ko og mga website ug app nga mopadali ug mopasayon sa inadlaw-adlaw nga buluhaton.',
  'about.bio2a': 'Simple ra ang akong lagda:',
  'about.bio2b': 'Mga rekord sa multa nga naa sa papel?',
  'about.bio2c':
    'Mao kana ang sinugdanan sa SmartFine: QR scan, dihadiha nga pahibalo ug bayad sa GCash imbes papel.',
  'about.photoAlt':
    'Si Will nga nagsul-ob og itom nga hoodie sa sagbuton nga bungtod, nagtan-aw sa dagat samtang nagsalop ang adlaw.',
  'about.whyLabel': 'Nganong IT?',
  'about.whyQuote':
    'Sa tinuod lang, wala koy kapilian. Nagsugod ni tanan tungod sa akong ig-agaw. Karon nagpahayahay na siya sa kinabuhi, ug ako ania, nag-debug sa alas 2 sa kaadlawon.',
  'role.dev.title': 'Developer',
  'role.dev.desc':
    'Nagbuhat og web ug mobile nga mga sistema gamit ang React Native, Expo ug SQLite.',
  'role.encoder.title': 'Data encoder',
  'role.encoder.desc': 'Nakakat-on sa pagkasakto ug pagtahod sa limpyo nga mga rekord.',
  'role.support.title': 'Customer support',
  'role.support.desc': 'Nakakat-on nga maminaw una ug magdisenyo para sa tinuod nga mga user.',
  'role.driver.title': 'Drayber',
  'role.driver.desc':
    'Nakakat-on nga dili ma-late ug kasaligan, ug ihatod ang mga tawo sa ilang adtoan nga luwas.',
  'timeline.rubens': "website sa Ruben's Photography",
  'timeline.smartfine': 'SmartFine nga prototype nga mogana',
  'timeline.css': 'Computer Systems Servicing NC II',
  'timeline.pos': 'Underground Apparel POS (grupo sa 2)',
  'timeline.bsit': 'BS Information Technology, Western Leyte College',
  'timeline.bpp': 'Bread and Pastry Production NC II',
  'timeline.grad': 'Isabel National Comprehensive School, with honors',
  'timeline.award': 'Best Home Economics Student ug Best Presenter',
  'timeline.hailey': 'admin sa Facebook page nga Hailey',
  'timeline.kira': 'editor sa Kira, usa ka anime fan page',
  'facts.based': 'Nagpuyo sa',
  'facts.basedValue': 'Palompon, Leyte, Pilipinas',
  'facts.studying': 'Nagtuon og',
  'facts.studyingValue':
    'BS Information Technology, ika-3 nga tuig, Western Leyte College (klase sa 2028)',
  'facts.speaks': 'Mga pinulongan',
  'facts.speaksValue': 'English, Filipino, Bisaya',
  'facts.offscreen': 'Gawas sa screen',
  'facts.offscreenValue':
    'Gaming, ug pagdrayb sa bisan unsang naay ligid, gikan sa motor hangtod sa sakyanan',
  'facts.fun': 'Fun fact',
  'facts.funValue':
    'Makaayo ko sa imong PC ug makatudlo nimo og HTML sama sa resipe sa lumpia: kinahanglan sakto ang pagputos sa tanan.',

  // Skills
  'skills.lead':
    'Ang akong mga kahanas isip component library. Ang matag kahanas nakasumpay sa proyekto diin nako kini gigamit.',
  'skills.panel': 'Assets · Components',
  'level.3': 'Kanunay gigamit',
  'level.2': 'Komportable',
  'level.1': 'Nagtuon pa',
  'group.build': 'Pagbuhat',
  'group.secure': 'Seguridad',
  'group.tools': 'Mga himan',
  'group.create': 'Paglalang',
  'group.beyond': 'Lapas sa code',
  'skill.htmlcss': 'HTML ug CSS',
  'skill.analysis': 'System analysis',
  'skill.rbac': 'Access base sa role',
  'skill.audit': 'Audit log trail',
  'skill.git': 'Git ug GitHub',
  'skill.pc': 'Pag-assemble og PC',
  'skill.troubleshooting': 'Troubleshooting',
  'skill.networking': 'Sukaranan sa networking',
  'skill.costing': 'Pagkuwenta sa gasto sa resipe',
  'skill.team': 'Pagtinabangay sa grupo',
  'skills.hint': 'Pilia ang usa ka kahanas aron makita kung asa nako kini gigamit.',
  'skills.usedIn': 'Ang {skill} gigamit sa',
  'skills.notUsed': 'Ang {skill} wala pa niining mga proyekto. Gigamit nako kini sa gawas niini.',
  'skills.clear': 'Hawani',
  'skills.thisPortfolio': 'Kining portfolio',
  'cert.css.title': 'Computer Systems Servicing',
  'cert.css.desc': 'National Certificate II · 2026 · assembly, setup, troubleshooting, networking',
  'cert.bpp.title': 'Bread and Pastry Production',
  'cert.bpp.desc': 'National Certificate II · 2023 · pagluto og pan, costing, kaluwasan sa pagkaon',
  'cert.honors.title': 'With honors',
  'cert.honors.desc':
    'Isabel National Comprehensive School · Best Home Economics Student ug Best Presenter',

  // Projects: filters, buttons, badges
  'filter.label': 'Salaa ang mga proyekto',
  'filter.all': 'Tanan',
  'filter.mobile': 'Mobile',
  'filter.web': 'Web',
  'filter.solo': 'Solo',
  'filter.team': 'Grupo',
  'projects.details': 'Mga detalye',
  'projects.caseStudy': 'Basaha ang case study',
  'modal.close': 'Sirad-i',
  'badge.featured': 'Pinili',
  'badge.soloProject': 'Solo nga proyekto',
  'badge.prototype': 'Prototype nga mogana',
  'badge.mobileWeb': 'Mobile app + bersyon sa web',
  'badge.team2': 'Grupo sa 2',
  'badge.testing': 'Nahuman ang kinauyokan · gi-test pa',
  'badge.solo': 'Solo',
  'badge.client': 'Website sa kliyente',

  // Phone mockup on the SmartFine card
  'phone.student': 'Estudyante',
  'phone.unpaidBalance': 'Wala pa mabayri',
  'phone.myFines': 'Akong mga multa',
  'phone.pay': 'Bayri gamit ang GCash',
  'phone.today': 'Karon 8:02',
  'phone.mon': 'Lun 7:31',
  'pill.unpaid': 'Wala mabayri',
  'pill.paid': 'Bayad na',
  'fine.noId': 'Walay ID',
  'fine.late': 'Late sa flag ceremony',

  // Project details: section headings
  'm.problem': 'Ang problema',
  'm.how': 'Giunsa kini paglihok',
  'm.roles': 'Tulo ka role',
  'm.security': 'Seguridad sa yanong pinulongan',
  'm.tech': 'Teknolohiya',
  'm.status': 'Kahimtang',
  'm.shots': 'Mga screenshot ug code',
  'm.what': 'Unsay mahimo niini',
  'm.myPart': 'Akong bahin',
  'm.team': 'Grupo',
  'm.brief': 'Ang hangyo',
  'm.built': 'Unsay akong gibuhat',

  // SmartFine
  'sf.hook': 'Gikan sa papel nga logbook ngadto sa QR scan.',
  'sf.desc':
    'Usa ka sistema sa multa sa mga estudyante para sa mga eskwelahan. I-scan sa officer ang QR code sa estudyante ug irekord ang kalapasan uban ang litrato isip ebidensya. Makita dayon sa estudyante ang multa ug mobayad pinaagi sa GCash (PayMongo) o sa cashier. Kon sayop ang multa, mohangyo ang estudyante og refund ug ang administrator ang moaprobar o mobalibad niini.',
  'sf.fx1': '3 ka role',
  'sf.fx2': 'Log trail nga naka-hash chain',
  'sf.fx3': 'Email OTP',
  'sf.fx4': 'Encrypted nga backup kada adlaw',
  'sf.fx5': 'Gisulayan sa mga klasmet, magtutudlo ug higala',
  'sf.built':
    'Gibuhat para sa Application Development + Information Assurance and Security 1 · Oktubre 2026 · Code: [public GitHub repo link]',
  'sf.problem':
    'Ang mga rekord sa multa nga naa sa papel sayon mawala, lisod susihon sa mga estudyante ug sayon usbon nga walay makamatikod.',
  'sf.how1': 'I-scan sa officer ang QR code sa estudyante.',
  'sf.how2': 'Irekord sa officer ang kalapasan ug ilakip ang litrato isip ebidensya.',
  'sf.how3': 'Makita dayon sa estudyante ang multa sa iyang phone.',
  'sf.how4': 'Mobayad ang estudyante pinaagi sa GCash (gamit ang PayMongo) o sa cashier.',
  'sf.how5':
    'Kon sayop ang multa, mohangyo ang estudyante og refund ug ang administrator ang moaprobar o mobalibad niini.',
  'sf.how6':
    'Ang matag lihok isulat sa log trail diin ang matag entry gi-hash ug gisumpay sa nag-una niini.',
  'sf.role1': '**Estudyante**: motan-aw sa mga multa, mobayad, mohangyo og refund.',
  'sf.role2': '**Fines officer**: mag-scan og QR code ug magrekord sa mga kalapasan.',
  'sf.role3': '**Administrator**: [mga katungdanan nga kumpirmahon pa ni Will]',
  'sf.secT3': 'Account lockout',
  'sf.secT4': 'Session control',
  'sf.secT6': 'Log trail',
  'sf.sec1': 'Bisan makawat ang database, dili gihapon mabasa ang mga password.',
  'sf.sec2': 'Dili igo ang kinawat nga password ra aron maka-log in.',
  'sf.sec3': 'Mopugong sa mga tig-atake nga magbalik-balik og tag-an sa password.',
  'sf.sec4': 'Ang phone nga nahibilin nga naka-log in dili magpabiling naka-log in.',
  'sf.sec5':
    'Ang mga backup kada adlaw (gitipigan sa akong laptop ug Google Drive) dili mabasa kon makawat, ug mamatikdan ang bisan unsang kausaban niini.',
  'sf.sec6':
    'Ang matag entry gi-hash ug gisumpay sa nag-una niini, busa walay makausab o makapapas og rekord sa hilom.',
  'sf.status':
    'Prototype nga mogana, nahuman niadtong Oktubre 2026: usa ka mobile app nga naay bersyon sa web. Ang mga bayad anaa sa test mode sa PayMongo, busa walay tinuod nga kuwarta nga molihok. Gisulayan sa mga klasmet, magtutudlo ug higala. Gibuhat para sa Application Development ug Information Assurance and Security 1.',
  'sf.shots': '[3 ka screenshot nga dummy ang data] [public GitHub repo link]',

  // Underground Apparel POS
  'ug.desc':
    'Usa ka point-of-sale ug sistema sa negosyo para sa tindahan og sinina nga ang mga produkto naay lain-laing kolor ug gidak-on: halin, resibo, imbentaryo, supplier, payroll ug mga report.',
  'ug.note':
    'Akong bahin: login ug dashboard, mga supplier, pagproseso sa payroll, mga account, redesign sa POS, mga void nga aprobado sa manager',
  'ug.problem':
    'Ang Underground Apparel namaligya og mga sinina nga daghag kolor ug gidak-on. Ang mano-manong pagsubay sa halin, stock, supplier ug sweldo sa mga kawani dali rang magubot.',
  'ug.what1': 'Halin sa counter nga naay resibo, diskwento, VAT ug void',
  'ug.what2':
    'Imbentaryo sa matag kolor ug gidak-on, uban ang litrato sa produkto ug mga nawala nga stock',
  'ug.what3': 'Mga supplier ug restocking nga nakasumpay sa supplier',
  'ug.what4': 'Payroll nga naay kaltas, payslip ug 13th month pay',
  'ug.what5': 'Mga gasto, report, user account, setting, backup ug system log',
  'ug.what6': 'Mga role nga Admin, Manager ug Cashier',
  'ug.part1': 'Redesign sa login ug dashboard',
  'ug.part2': 'Pagdumala sa supplier ug pagproseso sa payroll sa mga empleyado',
  'ug.part3': 'Mga user account ug ang redesign sa POS aron moigo sa screen',
  'ug.part4': 'Mga void sa payroll ug void sa cashier nga nagkinahanglan og pagtugot sa manager',
  'ug.part5': 'Shared nga UI: mga toast, loading state ug kumpirmasyon',
  'ug.team':
    'Gibuhat uban ni [ngalan sa kauban, kon mosugot lang siya]. Gibahin namo ang mga module ug gisusi ang trabaho sa usag usa sa GitHub.',
  'ug.status':
    'Nahuman na ang mga nag-unang module. Karon nag-ayo mi sa mga bug, nagpalig-on sa seguridad ug nag-test sa browser. [mga screenshot]',

  // Ruben's Photography
  'rp.desc':
    'Usa ka one-page nga showcase site para sa usa ka photographer sa Palompon: hero slideshow, photo lightbox, mga serbisyo, review sa mga kliyente ug FAQ. Ang matag "Book" nga button moabli sa Messenger. Tinuyo nga walay presyo o booking form.',
  'rp.note': 'Live sa: [link kon ma-deploy na]',
  'rp.brief':
    'Usa ka lokal nga photographer sa Palompon nanginahanglan og site nga mopakita sa iyang mga kuha ug modasig sa mga tawo nga makig-istorya niya, nga walay presyo o booking form.',
  'rp.built1': 'Full-screen nga hero slideshow ug portfolio nga naay photo lightbox',
  'rp.built2': 'Mga serbisyo, review sa mga kliyente ug FAQ',
  'rp.built3':
    'Ang matag "Book" nga button moabli sa Messenger, aron ang presyo mahisgotan sa tinuod nga panag-istorya',
  'rp.built4': 'Light ug dark nga tema ug mubo nga loading intro',
  'rp.status': 'Gibuhat niadtong Nobyembre 2026. Live sa [link kon ma-deploy na].',
}
