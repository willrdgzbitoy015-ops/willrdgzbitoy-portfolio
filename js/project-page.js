/*
  PROJECT PAGE (project.html?p=<id>)
  Builds one project's page from js/data/projects.js: back link, title and tags, a big
  cover picture, then the sections (overview, challenges, lists, security table, status,
  screenshot gallery) and a "Next project" link. It is rebuilt when the language changes.
  Text is always set with textContent / WB.rich, never innerHTML.
*/
;(function () {
  const { $, el, t, rich, onLangChange } = WB
  const main = $('#main')

  // Which project? project.html?p=smartfine -> "smartfine"
  const id = new URLSearchParams(window.location.search).get('p')
  const project = WB.PROJECTS[id]

  /** An icon from the sprite in project.html: <svg><use href="#i-name"></svg> */
  function icon(name) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use')
    use.setAttribute('href', '#i-' + name)
    svg.setAttribute('aria-hidden', 'true')
    svg.append(use)
    return svg
  }

  const badge = (b) => el('span', { class: 'badge' + (b.tone ? ' ' + b.tone : '') }, t(b.key))
  const tags = (names) => el('ul', { class: 'tags' }, ...names.map((name) => el('li', {}, name)))

  /* ---------- The cover picture ---------- */
  function cover() {
    const box = el('div', { class: 'proj-thumb pp-cover reveal', 'aria-hidden': 'true' })
    box.append(el('span', { class: 'proj-tag' }, t(project.tagKey)))
    if (project.cover === 'phone') {
      box.classList.add('thumb-smartfine')
      box.append(
        el(
          'div',
          { class: 'mini-phone' },
          el('div', { class: 'mp-bar' }, el('span', {}, 'SmartFine'), el('i')),
          el(
            'div',
            { class: 'mp-bal' },
            el('small', {}, t('phone.unpaidBalance')),
            el('b', {}, '₱50'),
          ),
          el(
            'div',
            { class: 'mp-row' },
            el('span', {}, t('fine.noId')),
            el('em', { class: 'unpaid' }, t('pill.unpaid')),
          ),
          el(
            'div',
            { class: 'mp-row' },
            el('span', {}, t('fine.late')),
            el('em', { class: 'paid' }, t('pill.paid')),
          ),
          el('div', { class: 'mp-pay' }, t('phone.pay')),
        ),
      )
    } else if (project.cover === 'pos') {
      box.classList.add('thumb-pos')
      const bars = (n, tag) => Array.from({ length: n }, () => el(tag))
      box.append(
        el(
          'div',
          { class: 'mini-pos' },
          el('div', { class: 'pos-side' }, ...bars(4, 'i')),
          el('div', { class: 'pos-items' }, ...bars(6, 'i')),
          el('div', { class: 'pos-receipt' }, el('b'), ...bars(3, 'i'), el('span')),
        ),
      )
    } else {
      return screenshotCover()
    }
    return box
  }

  /* ---------- A real screenshot as the cover ----------
     Shown whole (not cropped), and it is a button: clicking it opens the full-screen
     lightbox. If the cover is also in the gallery, the lightbox starts there, so the
     arrow keys continue through the other screenshots. */
  function screenshotCover() {
    const gallery = project.sections.find((block) => block.kind === 'gallery')
    const shots = gallery ? gallery.shots.filter((shot) => shot.src) : []
    let items = lightboxItemsFor(shots)
    let start = shots.findIndex((shot) => shot.src === project.cover)
    if (start < 0) {
      items = [{ src: project.cover, alt: project.title, caption: project.title }]
      start = 0
    }
    const button = el(
      'button',
      {
        class: 'proj-thumb pp-cover thumb-shot reveal',
        type: 'button',
        'aria-label': t('certs.preview') + ': ' + project.title,
      },
      el('span', { class: 'proj-tag' }, t(project.tagKey)),
      el('img', { src: project.cover, alt: '', width: '1200', height: '750', decoding: 'async' }),
      el('span', { class: 'cert-hover' }, icon('eye'), el('span', {}, t('certs.preview'))),
    )
    button.addEventListener('click', () => WB.openLightbox(items, start))
    return button
  }

  /** The list the lightbox needs: one entry per screenshot. */
  function lightboxItemsFor(shots) {
    return shots.map((shot) => ({
      src: shot.src,
      alt: t(shot.captionKey),
      caption: project.title + ' · ' + t(shot.captionKey),
    }))
  }

  /* ---------- One section of the page, depending on its `kind` ---------- */
  function section(block) {
    const wrap = el('section', { class: 'pp-section reveal' }, el('h2', {}, t(block.headingKey)))

    if (block.kind === 'text') {
      wrap.append(el('p', { class: 'pp-text' }, rich(t(block.bodyKey))))
    } else if (block.kind === 'challenges') {
      wrap.append(
        el(
          'div',
          { class: 'pp-grid-3' },
          ...block.items.map((item) =>
            el(
              'article',
              { class: 'pp-card' },
              el('span', { class: 'ic' }, icon(item.icon)),
              el('h3', {}, t(item.titleKey)),
              el('p', {}, t(item.textKey)),
            ),
          ),
        ),
      )
    } else if (block.kind === 'list') {
      const items = block.itemKeys.map((key) => el('li', {}, rich(t(key))))
      wrap.append(
        el(
          block.ordered ? 'ol' : 'ul',
          { class: 'pp-list' + (block.ordered ? '' : ' bullets') },
          ...items,
        ),
      )
    } else if (block.kind === 'table') {
      const rows = block.rows.map((row) =>
        el(
          'tr',
          {},
          el('th', { scope: 'row' }, row.termKey ? t(row.termKey) : row.term),
          el('td', {}, t(row.descKey)),
        ),
      )
      wrap.append(el('table', { class: 'sec-table' }, el('tbody', {}, ...rows)))
    } else if (block.kind === 'gallery') {
      wrap.append(gallery(block.shots))
    }
    return wrap
  }

  /* ---------- Screenshot gallery ---------- */
  function gallery(shots) {
    const real = shots.filter((shot) => shot.src)
    const lightboxItems = lightboxItemsFor(real)
    const grid = el('div', { class: 'gallery' })
    for (const shot of shots) {
      if (!shot.src) {
        // A slot still waiting for its screenshot
        grid.append(
          el(
            'div',
            { class: 'shot-empty' },
            el('span', {}, el('b', {}, t(shot.captionKey)), el('br'), rich(t('gal.soon'))),
          ),
        )
        continue
      }
      const index = real.indexOf(shot)
      const button = el(
        'button',
        {
          class: 'shot',
          type: 'button',
          'aria-label': t('certs.preview') + ': ' + t(shot.captionKey),
        },
        el('img', {
          src: shot.src,
          alt: '',
          loading: 'lazy',
          decoding: 'async',
          width: '1200',
          height: '750',
        }),
        el('span', { class: 'cert-hover' }, icon('eye'), el('span', {}, t('certs.preview'))),
      )
      button.addEventListener('click', () => WB.openLightbox(lightboxItems, index))
      grid.append(button)
    }
    return grid
  }

  /* ---------- "Next project" link ---------- */
  function nextLink() {
    const order = WB.PROJECT_ORDER
    const nextId = order[(order.indexOf(id) + 1) % order.length]
    return el(
      'a',
      { class: 'pp-next reveal', href: 'project.html?p=' + nextId },
      el('span', {}, el('small', {}, t('pp.next')), el('b', {}, WB.PROJECTS[nextId].title)),
      icon('arrow-right'),
    )
  }

  /* ---------- The whole page ----------
     `animate` is false when rebuilding for a language switch: then everything is shown at
     once instead of fading in again. */
  function render(animate = true) {
    if (!project) {
      document.title = t('pp.missingTitle') + ' · Will R. Bitoy'
      main.replaceChildren(
        el(
          'section',
          { class: 'pp-missing wrap' },
          el('h1', {}, t('pp.missingTitle')),
          el('p', {}, t('pp.missingText')),
          el('a', { class: 'btn btn-primary', href: 'index.html#projects' }, t('pp.back')),
        ),
      )
      return
    }

    document.title = project.title + ' · Will R. Bitoy'
    const actions = el('div', { class: 'pp-actions' })
    if (project.repo) {
      actions.append(
        el(
          'a',
          { class: 'btn btn-primary', href: project.repo, target: '_blank', rel: 'noopener' },
          icon('github'),
          t('pp.code'),
        ),
      )
    }
    actions.append(
      el(
        'a',
        { class: 'btn btn-ghost', href: 'index.html#contact' },
        icon('mail'),
        t('cta.contact'),
      ),
    )

    const hero = el(
      'section',
      { class: 'pp-hero' },
      el('div', { class: 'glow glow-hero', 'aria-hidden': 'true' }),
      el(
        'div',
        { class: 'wrap' },
        el(
          'a',
          { class: 'back-link', href: 'index.html#projects' },
          icon('chevron-left'),
          t('pp.back'),
        ),
        el(
          'div',
          { class: 'pp-head' },
          el('div', { class: 'pp-row' }, ...project.badges.map(badge)),
          el('h1', { id: 'project-title' }, project.title),
          el('p', { class: 'pp-lead' }, t(project.leadKey)),
          tags(project.tech),
          actions,
        ),
        cover(),
      ),
    )
    const body = el('div', { class: 'wrap pp-body' }, ...project.sections.map(section), nextLink())

    main.setAttribute('aria-labelledby', 'project-title')
    main.replaceChildren(hero, body)
    const reveals = main.querySelectorAll('.reveal')
    if (animate) WB.watchReveal(reveals)
    else for (const node of reveals) node.classList.add('is-in')
  }

  render()
  onLangChange(() => render(false))
})()
