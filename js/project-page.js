/*
  PROJECT PAGE (project.html?p=<id>)
  Builds one project's page from js/data/projects.js: back link, title and tags, a big
  cover picture, then the sections (overview, challenges, lists, security table, status,
  screenshot gallery) and a "Next project" link.
  Text is always set with textContent / WB.rich, never innerHTML.
*/
;(function () {
  const { $, el, rich } = WB
  const main = $('#main')

  // The words this file adds around the project's own text.
  const TEXT = {
    preview: 'Preview',
    back: 'Back to Projects',
    code: 'View Code',
    live: 'Visit Site',
    contact: 'Contact Me',
    next: 'Next project',
    soon: '[screenshot coming soon]',
    missingTitle: 'Project not found',
    missingText: "This project link doesn't exist. Pick one from the list on the home page.",
  }

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

  const badge = (b) => el('span', { class: 'badge' + (b.tone ? ' ' + b.tone : '') }, b.label)
  const tags = (names) => el('ul', { class: 'tags' }, ...names.map((name) => el('li', {}, name)))

  /* ---------- The cover picture: a real screenshot ----------
     Shown whole (not cropped), and it is a button: clicking it opens the full-screen
     lightbox. If the cover is also in the gallery, the lightbox starts there; if not
     (SmartFine's three-phone overview), the cover comes first. Either way the arrow
     keys continue through the gallery screenshots. */
  function cover() {
    const gallery = project.sections.find((block) => block.kind === 'gallery')
    const shots = gallery ? gallery.shots.filter((shot) => shot.src) : []
    let items = lightboxItemsFor(shots)
    let start = shots.findIndex((shot) => shot.src === project.cover)
    if (start < 0) {
      items = [{ src: project.cover, alt: project.title, caption: project.title }, ...items]
      start = 0
    }
    const button = el(
      'button',
      {
        class: 'proj-thumb pp-cover thumb-shot reveal',
        type: 'button',
        'aria-label': TEXT.preview + ': ' + project.title,
      },
      el('span', { class: 'proj-tag' }, project.tag),
      el('img', { src: project.cover, alt: '', width: '1200', height: '750', decoding: 'async' }),
      el('span', { class: 'cert-hover' }, icon('eye'), el('span', {}, TEXT.preview)),
    )
    button.addEventListener('click', () => WB.openLightbox(items, start))
    return button
  }

  /** The list the lightbox needs: one entry per screenshot. */
  function lightboxItemsFor(shots) {
    return shots.map((shot) => ({
      src: shot.src,
      alt: shot.caption,
      caption: project.title + ' · ' + shot.caption,
    }))
  }

  /* ---------- One section of the page, depending on its `kind` ---------- */
  function section(block) {
    const wrap = el('section', { class: 'pp-section reveal' }, el('h2', {}, block.heading))

    if (block.kind === 'text') {
      wrap.append(el('p', { class: 'pp-text' }, rich(block.body)))
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
              el('h3', {}, item.title),
              el('p', {}, item.text),
            ),
          ),
        ),
      )
    } else if (block.kind === 'list') {
      const items = block.items.map((text) => el('li', {}, rich(text)))
      wrap.append(
        el(
          block.ordered ? 'ol' : 'ul',
          { class: 'pp-list' + (block.ordered ? '' : ' bullets') },
          ...items,
        ),
      )
    } else if (block.kind === 'table') {
      const rows = block.rows.map((row) =>
        el('tr', {}, el('th', { scope: 'row' }, row.term), el('td', {}, row.desc)),
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
            el('span', {}, el('b', {}, shot.caption), el('br'), rich(TEXT.soon)),
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
          'aria-label': TEXT.preview + ': ' + shot.caption,
        },
        el('img', {
          src: shot.src,
          alt: '',
          loading: 'lazy',
          decoding: 'async',
          width: '1200',
          height: '750',
        }),
        el('span', { class: 'cert-hover' }, icon('eye'), el('span', {}, TEXT.preview)),
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
      el('span', {}, el('small', {}, TEXT.next), el('b', {}, WB.PROJECTS[nextId].title)),
      icon('arrow-right'),
    )
  }

  /* ---------- The whole page ---------- */
  function render() {
    if (!project) {
      document.title = TEXT.missingTitle + ' · Will R. Bitoy'
      main.replaceChildren(
        el(
          'section',
          { class: 'pp-missing wrap' },
          el('h1', {}, TEXT.missingTitle),
          el('p', {}, TEXT.missingText),
          el('a', { class: 'btn btn-primary', href: 'index.html#projects' }, TEXT.back),
        ),
      )
      return
    }

    document.title = project.title + ' · Will R. Bitoy'
    const actions = el('div', { class: 'pp-actions' })
    // A live website opens in a new tab. rel="noopener" stops that tab from controlling this one.
    if (project.live) {
      actions.append(
        el(
          'a',
          { class: 'btn btn-primary', href: project.live, target: '_blank', rel: 'noopener' },
          icon('globe'),
          TEXT.live,
        ),
      )
    }
    if (project.repo) {
      actions.append(
        el(
          'a',
          { class: 'btn btn-primary', href: project.repo, target: '_blank', rel: 'noopener' },
          icon('github'),
          TEXT.code,
        ),
      )
    }
    actions.append(
      el('a', { class: 'btn btn-ghost', href: 'index.html#contact' }, icon('mail'), TEXT.contact),
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
          TEXT.back,
        ),
        el(
          'div',
          { class: 'pp-head' },
          el('div', { class: 'pp-row' }, ...project.badges.map(badge)),
          el('h1', { id: 'project-title' }, project.title),
          el('p', { class: 'pp-lead' }, project.lead),
          tags(project.tech),
          actions,
        ),
        cover(),
      ),
    )
    const body = el('div', { class: 'wrap pp-body' }, ...project.sections.map(section), nextLink())

    main.setAttribute('aria-labelledby', 'project-title')
    main.replaceChildren(hero, body)
    WB.watchReveal(main.querySelectorAll('.reveal'))
  }

  render()
})()
