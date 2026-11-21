/*
  CEBUANO (BISAYA)
  Every piece of text on the site, by key. When BIS is on, js/core.js looks up each key
  here. If a key is missing, the English stays and a warning shows in the browser
  console (F12), so nothing is ever blank.

  Markers: **bold**, [placeholder Will still has to fill in], {n} / {name} = filled in by JS.
*/
window.WB = window.WB || {}

WB.ceb = {
  // Navbar and menu
  'a11y.skip': 'Laktaw ngadto sa sulod',
  'nav.home': 'Will R. Bitoy, balik sa taas',
  'nav.homeLink': 'Home',
  'nav.about': 'Bahin nako',
  'nav.skills': 'Kahanas',
  'nav.projects': 'Mga proyekto',
  'nav.experience': 'Kasinatian',
  'nav.contact': 'Kontak',
  'nav.sections': 'Mga seksyon',
  'nav.sectionsMobile': 'Mga seksyon (mobile)',
  'nav.language': 'Pinulongan',
  'nav.openPalette': 'Ablihi ang command palette (Ctrl+K)',
  'nav.openMenu': 'Ablihi ang menu',
  'nav.closeMenu': 'Sirad-i ang menu',

  // Theme button and resume
  'theme.toNight': 'Ilisi ngadto sa night mode',
  'theme.toDay': 'Ilisi ngadto sa day mode',
  'theme.night': 'Night mode',
  'theme.day': 'Day mode',
  'toast.resumeSoon': 'Wala pa ma-upload ang resume PDF.',
  'cta.resume': 'I-download ang CV',
  'cta.contact': 'Kontaka ko',

  // Hero
  'hero.hiPrefix': 'Hi, ako si',
  'hero.role': 'Estudyante sa BS Information Technology',
  'hero.sub':
    '**Nagbuhat ko og mga sistema nga mopuli sa papel.** Ika-3 nga tuig nga estudyante ko sa BSIT sa Western Leyte College sa Palompon, Leyte, ug nagdisenyo ug nagbuhat ko og web ug mobile nga mga sistema nga mopadali ug mopasayon sa inadlaw-adlaw nga buluhaton.',
  'hero.photoAlt':
    'Si Will nga nagtikubo ug nagtan-aw sa camera, usa ka kamot nga naka-glove gipataas ngadto niini.',
  'hero.scroll': 'Padulong sa Bahin nako',

  // About
  'about.title': 'Bahin Nako',
  'about.sub': 'Gamay nga istorya bahin sa akong kagikan ug unsay ganahan nakong buhaton.',
  'about.bio1':
    'Ako si Will, ika-3 nga tuig nga estudyante sa BSIT nga taga-Palompon, Leyte. Makakat-on ko pinaagi sa pagguba ug pag-ayo sa mga butang, ug nagbuhat ko og mga website ug app nga mopadali ug mopasayon sa inadlaw-adlaw nga buluhaton.',
  'about.bio2a': 'Simple ra ang akong lagda:',
  'about.bio2b': 'Mga rekord sa multa nga naa sa papel?',
  'about.bio2c':
    'Mao kana ang sinugdanan sa SmartFine: QR scan, dihadiha nga pahibalo ug bayad sa GCash imbes papel.',
  'about.bio3':
    'Fun fact: makaayo ko sa imong PC ug makatudlo nimo og HTML sama sa resipe sa lumpia, kay kinahanglan sakto ang pagputos sa tanan.',
  'about.edu1': 'BS Information Technology · 2024 hangtod karon (ika-3 nga tuig)',
  'about.edu2': 'Migraduwar with honors · 2024',
  'about.basedIn': 'Nagpuyo sa Palompon, Leyte',
  'about.speaks': 'Kahibalo og English, Filipino ug Bisaya',
  'about.whyLabel': 'Nganong IT?',
  'about.whyQuote':
    'Sa tinuod lang, wala koy kapilian. Nagsugod ni tanan tungod sa akong ig-agaw. Karon nagpahayahay na siya sa kinabuhi, ug ako ania, nag-debug sa alas 2 sa kaadlawon.',
  'about.interests': 'Mga hilig',
  'interest.web': 'Web Development',
  'interest.mobile': 'Mga Mobile App',
  'interest.security': 'Seguridad sa Sistema',
  'interest.hardware': 'PC Hardware',
  'interest.editing': 'Pag-edit og Video ug Litrato',
  'interest.cooking': 'Pagluto ug Pag-bake',
  'interest.driving': 'Pagdrayb ug Motor',
  'interest.gaming': 'Gaming',

  // Skills
  'skills.title': 'Mga Kahanas ug Teknolohiya',
  'skills.sub': 'Ang mga pinulongan, framework, himan ug natad nga akong gitun-an ug gigamit.',
  'skills.filterLabel': 'Salaa ang mga kahanas',
  'skills.count': '{n} ka kahanas ang gipakita',
  'cat.all': 'Tanan',
  'cat.lang': 'Mga pinulongan',
  'cat.frontend': 'Frontend',
  'cat.mobile': 'Mobile',
  'cat.backend': 'Backend',
  'cat.security': 'Seguridad',
  'cat.tools': 'Mga himan',
  'cat.creative': 'Paglalang',
  'cat.beyond': 'Lapas sa code',
  'cat.lang.one': 'Pinulongan',
  'cat.frontend.one': 'Frontend',
  'cat.mobile.one': 'Mobile',
  'cat.backend.one': 'Backend',
  'cat.security.one': 'Seguridad',
  'cat.tools.one': 'Himan',
  'cat.creative.one': 'Paglalang',
  'cat.beyond.one': 'Lapas sa code',
  'skill.htmlcss': 'HTML ug CSS',
  'skill.analysis': 'System analysis',
  'skill.rbac': 'Access base sa role',
  'skill.audit': 'Audit log trail',
  'skill.git': 'Git ug GitHub',
  'skill.pc': 'Pag-assemble og PC',
  'skill.troubleshooting': 'Troubleshooting',
  'skill.networking': 'Sukaranan sa networking',
  'skill.cooking': 'Pagluto',
  'skill.team': 'Pagtinabangay sa grupo',

  // Projects (home page cards)
  'projects.title': 'Mga Proyekto',
  'projects.sub':
    'Mga sistema ug site nga akong gibuhat, gikan sa mobile app hangtod sa website sa kliyente.',
  'projects.view': 'Tan-awa ang proyekto',
  'tag.mobile': 'Mobile app',
  'tag.web': 'Web nga sistema',
  'tag.client': 'Website sa kliyente',
  'tag.team2': 'Grupo sa 2',
  'tag.hardware': 'Hardware',
  'tag.networking': 'Networking',
  'card.sf':
    'Usa ka sistema sa multa sa mga estudyante para sa eskwelahan: i-scan sa officer ang QR code, makita dayon sa estudyante ang multa ug mobayad pinaagi sa GCash.',
  'card.ug':
    'Usa ka point-of-sale ug sistema sa negosyo para sa tindahan og sinina: halin, imbentaryo matag kolor ug gidak-on, supplier ug payroll.',
  'card.rp':
    'Usa ka one-page nga showcase site para sa usa ka photographer sa Palompon, diin ang matag "Book" nga button moabli sa Messenger.',
  'badge.soloProject': 'Solo nga proyekto',
  'badge.prototype': 'Prototype nga mogana',
  'badge.mobileWeb': 'Mobile app + bersyon sa web',
  'badge.team2': 'Grupo sa 2',
  'badge.testing': 'Nahuman ang kinauyokan · gi-test pa',
  'badge.solo': 'Solo',
  'badge.client': 'Website sa kliyente',

  // Experience timeline
  'exp.title': 'Panaw sa Akong Kinabuhi',
  'exp.sub': 'Ang eskwelahan, pagbansay, mga proyekto ug mga papel nga naghulma sa akong gibuhat.',
  'tl.rp.date': 'Nob 2026',
  'tl.rp.title': "Website sa Ruben's Photography",
  'tl.rp.org': 'Website sa kliyente · Solo',
  'tl.rp.desc': 'Usa ka one-page nga showcase site para sa usa ka photographer sa Palompon.',
  'tl.sf.date': 'Okt 2026',
  'tl.sf.title': 'SmartFine nga prototype nga mogana',
  'tl.sf.org': 'Application Development + Information Assurance and Security 1',
  'tl.sf.desc':
    'Usa ka mobile app nga naay bersyon sa web nga mopuli sa papel nga rekord sa multa sa mga eskwelahan.',
  'tl.css.title': 'Computer Systems Servicing NC II',
  'tl.css.desc':
    'Pag-assemble, pag-setup ug pag-troubleshoot sa mga kompyuter, apil ang networking.',
  'tl.ug.org': 'Grupo sa 2',
  'tl.ug.desc':
    'Usa ka point-of-sale ug sistema sa negosyo para sa tindahan og sinina, gibuhat uban ang usa ka klasmet.',
  'tl.bsit.date': '2024 – karon',
  'tl.bsit.desc': 'Ika-3 nga tuig, klase sa 2028.',
  'tl.grad.title': 'Migraduwar with honors',
  'tl.award.title': 'Best Home Economics Student ug Best Presenter',
  'tl.bpp.title': 'Bread and Pastry Production NC II',
  'tl.bpp.desc': 'Pagluto og pan, pagkuwenta sa gasto ug kaluwasan sa pagkaon.',
  'tl.hailey.title': 'Admin sa page',
  'tl.hailey.org': 'Facebook page nga Hailey',
  'tl.kira.title': 'Editor',
  'tl.kira.org': 'Kira, usa ka anime fan page',

  // "Preview" label on project screenshots
  'certs.preview': 'Tan-awa',

  // Contact
  'contact.title': 'Kontaka Ko',
  'contact.sub':
    'Naa kay proyekto, pangutana o oportunidad? Padad-i ko og mensahe ug motubag ko sulod sa usa ka adlaw.',
  'contact.email': 'Email',
  'contact.copy': 'Kopyaha ang email address',
  'contact.location': 'Lokasyon',
  'contact.locationValue': 'Palompon, Leyte, Pilipinas',
  'form.name': 'Ngalan',
  'form.topic': 'Hilisgutan',
  'form.topic1': 'Ideya sa proyekto',
  'form.topic2': 'Trabaho o internship',
  'form.topic3': 'Pangutana bahin sa teknolohiya',
  'form.topic4': 'Nangumusta lang',
  'form.message': 'Mensahe',
  'form.messagePh': 'Sultihi ko bahin sa imong proyekto o ideya…',
  'form.note': 'Gamiton ra nako ang imong detalye aron motubag nimo.',
  'form.send': 'Ipadala ang Mensahe',
  'form.sending': 'Gipadala…',
  'form.okLabel': 'Napadala ang mensahe!',
  'form.okText':
    'Salamat! Naa na sa akong inbox ang imong mensahe ug motubag ko sulod sa usa ka adlaw.',
  'form.ref': 'Reperensya',
  'form.again': 'Padala og lain',
  'form.errName': 'Palihog isulat ang imong ngalan.',
  'form.errEmail': 'Palihog isulat ang sakto nga email address, sama sa juan@example.com.',
  'form.errMessage': 'Palihog pagsulat og mensahe nga dili moubos sa 10 ka karakter.',
  'form.failed':
    'Wala mapadala ang mensahe. Palihog susiha ang imong koneksyon ug sulayi pag-usab, o i-email ko direkta:',
  'form.notConnected': 'Wala pa makonektar ang form. Palihog i-email ko direkta:',
  'toast.copied': 'Nakopya ang email address.',
  'toast.copyFailed': 'Wala makopya. Palihog pilia ang address ug kopyaha kini.',

  // Footer
  'footer.rights': 'Tanang katungod gitagana.',
  'footer.elsewhere': 'Sa ubang dapit',
  'footer.backToTop': 'Balik sa taas',

  // Lightbox
  'lb.label': 'Tan-awa',
  'lb.close': 'Sirad-i',
  'lb.prev': 'Miagi',
  'lb.next': 'Sunod',

  // Command palette
  'cmdk.label': 'Command palette',
  'cmdk.placeholder': 'Pangitaa ang seksyon o command',
  'cmdk.inputLabel': 'Command',
  'cmdk.listLabel': 'Mga command',
  'cmdk.foot': '↑ ↓ aron mobalhin · Enter aron padaganon · Esc aron sirad-an',
  'cmdk.empty': 'Walay nakit-an. Sulayi ang "proyekto" o "tema".',
  'cmd.about': 'Adto sa Bahin nako',
  'cmd.skills': 'Adto sa Mga kahanas',
  'cmd.projects': 'Adto sa Mga proyekto',
  'cmd.experience': 'Adto sa Kasinatian',
  'cmd.contact': 'Adto sa Kontak',
  'cmd.top': 'Balik sa taas',
  'cmd.openProject': 'Ablihi ang proyekto: {name}',
  'cmd.theme': 'Ilisi ang Day / Night mode',
  'cmd.lang': 'Ilisi ang pinulongan (English / Bisaya)',
  'cmd.resume': 'I-download ang CV',
  'cmd.copyEmail': 'Kopyaha ang email address',
  'cmd.github': 'Ablihi ang GitHub',
  'cmd.linkedin': 'Ablihi ang LinkedIn',
  'hint.section': 'Seksyon',
  'hint.project': 'Proyekto',
  'hint.theme': 'Tema',
  'hint.lang': 'Pinulongan',
  'hint.file': 'File',
  'hint.contact': 'Kontak',
  'hint.link': 'Link',

  // Project page
  'pp.back': 'Balik sa Mga Proyekto',
  'pp.code': 'Tan-awa ang Code',
  'pp.next': 'Sunod nga proyekto',
  'pp.missingTitle': 'Wala makit-an ang proyekto',
  'pp.missingText': 'Wala kining link sa proyekto. Pagpili og usa sa lista sa home page.',
  'm.overview': 'Kinatibuk-an',
  'm.challenges': 'Mga hagit',
  'm.how': 'Giunsa kini paglihok',
  'm.roles': 'Tulo ka role',
  'm.security': 'Seguridad sa yanong pinulongan',
  'm.status': 'Kahimtang',
  'm.what': 'Unsay mahimo niini',
  'm.myPart': 'Akong bahin',
  'm.team': 'Grupo',
  'm.brief': 'Ang hangyo',
  'm.built': 'Unsay akong gibuhat',
  'm.gallery': 'Mga Screenshot',
  'gal.soon': '[screenshot sunod pa]',
  'gal.sf1': 'Panan-aw sa estudyante',
  'gal.sf2': 'Panan-aw sa fines officer',
  'gal.sf3': 'Panan-aw sa administrator',
  'gal.ugLogin': 'Panid sa pag-sign in',
  'gal.ug1': 'Point of sale',
  'gal.ug2': 'Imbentaryo',
  'gal.ug3': 'Payroll',
  'gal.rp1': 'Home page nga naay hero slideshow',
  'gal.rp2': 'Seksyon sa portfolio',
  'gal.rp3': 'Sa phone',

  // SmartFine
  'sf.problem':
    'Ang mga rekord sa multa nga naa sa papel sayon mawala, lisod susihon sa mga estudyante ug sayon usbon nga walay makamatikod.',
  'sf.ch1.t': 'Mga rekord nga walay makausab sa hilom',
  'sf.ch1.d':
    'Ang matag lihok isulat sa log trail diin ang matag entry gi-hash ug gisumpay sa nag-una niini, busa makita dayon kon naay rekord nga giusab o gipapas.',
  'sf.ch2.t': 'Tulo ka klase sa user, usa ka app',
  'sf.ch2.d':
    'Ang mga estudyante, fines officer ug administrator makakita lang sa gitugot sa ilang role.',
  'sf.ch3.t': 'Pagbayad nga walay peligro sa tinuod nga kuwarta',
  'sf.ch3.d':
    'Ang bayad sa GCash moagi sa PayMongo nga naka-test mode samtang prototype pa ang app, busa walay tinuod nga kuwarta nga molihok.',
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
  'sf.role3':
    '**Administrator**: nagdumala sa mga account sa estudyante, officer ug admin ug sa mga klase sa multa, nagrekord sa mga bayad nga cash, nag-asikaso sa mga refund, ug makakita sa mga report, sa log trail ug sa mga encrypted backup.',
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
    'Prototype nga mogana, nahuman niadtong Oktubre 2026: usa ka mobile app nga naay bersyon sa web. Ang mga bayad anaa sa test mode sa PayMongo, busa walay tinuod nga kuwarta nga molihok. Gisulayan sa mga klasmet, magtutudlo ug higala. Gibuhat para sa Application Development ug Information Assurance and Security 1. Code: [public GitHub repo link]',

  // Underground Apparel POS
  'ug.problem':
    'Ang Underground Apparel namaligya og mga sinina nga daghag kolor ug gidak-on. Ang mano-manong pagsubay sa halin, stock, supplier ug sweldo sa mga kawani dali rang magubot.',
  'ug.ch1.t': 'Usa ka sinina, daghang variant',
  'ug.ch1.d':
    'Ang matag produkto naay lain-laing kolor ug gidak-on, busa ang stock gisubay matag variant, uban ang litrato sa produkto ug mga nawala nga stock.',
  'ug.ch2.t': 'Mga void nga nagkinahanglan og pagtugot',
  'ug.ch2.d':
    'Maka-void lang ang cashier og halin kon aprobahan kini sa manager o admin, busa walay halin nga mawala sa hilom.',
  'ug.ch3.t': 'Duha ka magbubuhat, usa ka sistema',
  'ug.ch3.d':
    'Gibahin namo ang mga module ug gisusi ang trabaho sa usag usa sa GitHub, aron makabuhat mi nga duha sa samang higayon.',
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
    'Gibuhat uban ni Kisha Kyle Samson. Gibahin namo ang mga module ug gisusi ang trabaho sa usag usa sa GitHub.',
  'ug.status':
    'Nahuman na ang mga nag-unang module. Karon nag-ayo mi sa mga bug, nagpalig-on sa seguridad ug nag-test sa browser.',

  // Ruben's Photography
  'rp.brief':
    'Usa ka lokal nga photographer sa Palompon nanginahanglan og site nga mopakita sa iyang mga kuha ug modasig sa mga tawo nga makig-istorya niya, nga walay presyo o booking form.',
  'rp.ch1.t': 'Walay presyo, walay booking form',
  'rp.ch1.d':
    'Ang presyo depende sa lugar, busa ang matag "Book" nga button moabli sa Messenger ug ang presyo mahisgotan sa tinuod nga panag-istorya.',
  'rp.ch2.t': 'Site nga daghang litrato apan paspas gihapon',
  'rp.ch2.d':
    'Ang mga litrato gipagamay ug gi-compress samtang gibuhat ang site, ug ang gallery moabli lang sa dagkong bersyon kon pangayoon.',
  'rp.ch3.t': 'Sayon usbon sa tag-iya',
  'rp.ch3.d':
    'Ang tanang teksto, serbisyo, review ug lista sa litrato anaa sa usa ka file, busa ang pag-usab sa pulong dili na kinahanglan mohikap sa layout.',
  'rp.built1': 'Full-screen nga hero slideshow ug portfolio nga naay photo lightbox',
  'rp.built2': 'Mga serbisyo, review sa mga kliyente ug FAQ',
  'rp.built3':
    'Ang matag "Book" nga button moabli sa Messenger, aron ang presyo mahisgotan sa tinuod nga panag-istorya',
  'rp.built4': 'Light ug dark nga tema ug mubo nga loading intro',
  'rp.status': 'Gibuhat niadtong Nobyembre 2026. Live sa [link kon ma-deploy na].',
}
