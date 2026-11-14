/*
  SECTIONS: the interactive parts inside the content.
    1. Live Palompon clock (Hero)
    2. Skills: level meters + "click a skill to highlight its projects"
    3. Project filter
    4. Project details pop-up, with shareable #project-... links
*/
;(function () {
  const { $, $$, el, t, rich, onLangChange } = WB

  /* ---------- 1. Palompon clock ----------
     Always Philippine time (Asia/Manila), wherever the visitor is. */
  const manilaTime = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Manila',
    hour: 'numeric',
    minute: '2-digit',
  })
  const clock = $('#ph-time')
  const tick = () => {
    clock.textContent = manilaTime.format(new Date())
  }
  tick()
  setInterval(tick, 20000)

  /* ---------- 2. Skills ---------- */
  const skillButtons = $$('.skill')
  const hint = $('#used-hint')
  const result = $('#used-result')
  const cards = () => $$('#proj-grid [data-id]')
  let selectedSkill = null // the pressed button, or null

  // Add the three-bar level meter to every skill that has a data-level.
  for (const button of skillButtons) {
    const level = button.dataset.level
    if (!level) continue
    button.append(
      el('i', { class: 'lv lv' + level, 'aria-hidden': 'true' }, el('b'), el('b'), el('b')),
      // The meter is a picture, so the level is also given as hidden text for screen readers.
      el('span', { class: 'sr-only', 'data-level-text': '' }),
    )
  }
  function paintLevelLabels() {
    for (const button of skillButtons) {
      const level = button.dataset.level
      if (!level) continue
      const label = t('level.' + level)
      button.title = label
      $('[data-level-text]', button).textContent = ', ' + label
    }
  }

  /** Puts the bold skill name where the dictionary sentence says {skill}. */
  function sentenceWithSkill(key, name) {
    const [before, after] = t(key).split('{skill}')
    return el('span', {}, before, el('b', {}, name), after)
  }

  function paintSkillResult() {
    for (const button of skillButtons) {
      button.setAttribute('aria-pressed', String(button === selectedSkill))
    }
    for (const card of cards()) card.classList.remove('is-match', 'is-dim')
    hint.hidden = selectedSkill !== null
    result.hidden = selectedSkill === null
    if (!selectedSkill) return

    const name = $('.nm', selectedSkill).textContent
    const used = selectedSkill.dataset.used.split(' ').filter(Boolean)
    const usedCards = used.filter((id) => id in WB.PROJECTS)
    const clearButton = el('button', { class: 'linkbtn', type: 'button' }, t('skills.clear'))
    clearButton.addEventListener('click', () => selectSkill(null))

    if (used.length === 0) {
      result.replaceChildren(sentenceWithSkill('skills.notUsed', name), ' ', clearButton)
      return
    }
    // Outline the cards that use this skill and fade the others.
    // (A skill used only in this portfolio has no card, so nothing is faded.)
    if (usedCards.length) {
      for (const card of cards()) {
        const match = usedCards.includes(card.dataset.id)
        card.classList.toggle('is-match', match)
        card.classList.toggle('is-dim', !match)
      }
    }
    const badges = used.flatMap((id) => [
      ' ',
      id === 'portfolio'
        ? el('span', { class: 'badge' }, t('skills.thisPortfolio'))
        : el('a', { class: 'badge', href: '#projects' }, WB.PROJECTS[id].title),
    ])
    result.replaceChildren(sentenceWithSkill('skills.usedIn', name), ...badges, ' ', clearButton)
  }

  function selectSkill(button) {
    selectedSkill = button
    paintSkillResult()
  }

  for (const button of skillButtons) {
    // Clicking the pressed skill again switches it off.
    button.addEventListener('click', () => selectSkill(button === selectedSkill ? null : button))
  }
  paintLevelLabels()

  /* ---------- 3. Project filter ---------- */
  const filterButtons = $$('[data-filter]')
  for (const button of filterButtons) {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter
      for (const other of filterButtons)
        other.setAttribute('aria-pressed', String(other === button))
      for (const card of cards()) {
        card.hidden = !(filter === 'all' || card.dataset.cats.split(' ').includes(filter))
      }
    })
  }

  /* ---------- 4. Project details pop-up ----------
     Built on the browser's native <dialog>. dialog.showModal() gives us the hard parts:
       - Esc closes it
       - Tab stays inside (the page behind becomes "inert")
       - focus returns to the button that opened it
     We add: no scrolling of the page behind, click-outside-to-close, and deep links.

     DEEP LINKS: the address bar is the single source of truth. Opening a project only
     changes the hash to #project-<id>; the "hashchange" event then shows the pop-up.
     So a shared link opens the right project, and the Back button closes it. */
  const modal = $('#modal')
  const modalBody = $('#modal-body')
  const PREFIX = '#project-'

  /** "#project-smartfine" -> "smartfine". Anything else -> null. */
  function projectFromHash() {
    const hash = window.location.hash
    if (!hash.startsWith(PREFIX)) return null
    const id = hash.slice(PREFIX.length)
    return id in WB.PROJECTS ? id : null
  }

  const badge = (b) => el('span', { class: 'badge' + (b.tone ? ' ' + b.tone : '') }, t(b.key))
  const techChips = (project) =>
    el('div', { class: 'tech' }, ...project.tech.map((name) => el('span', {}, name)))

  /** Builds one block of the pop-up, depending on its `kind` (see js/data/projects.js). */
  function detailBlock(section, project) {
    const block = el('div', { class: 'msec' }, el('h4', {}, t(section.headingKey)))
    if (section.kind === 'text') {
      block.append(el('p', {}, rich(t(section.bodyKey))))
    } else if (section.kind === 'list') {
      const items = section.itemKeys.map((key) => el('li', {}, rich(t(key))))
      block.append(el(section.ordered ? 'ol' : 'ul', {}, ...items))
    } else if (section.kind === 'table') {
      const rows = section.rows.map((row) =>
        el(
          'tr',
          {},
          el('th', { scope: 'row' }, row.termKey ? t(row.termKey) : row.term),
          el('td', {}, t(row.descKey)),
        ),
      )
      block.append(el('table', { class: 'sec-table' }, el('tbody', {}, ...rows)))
    } else if (section.kind === 'tech') {
      block.append(techChips(project))
    }
    return block
  }

  function renderModal(id) {
    const project = WB.PROJECTS[id]
    modalBody.replaceChildren(
      el('div', { class: 'badges' }, ...project.badges.map(badge)),
      el('h3', { id: 'modal-title' }, project.title),
      el('div', { class: 'mgrid' }, ...project.details.map((s) => detailBlock(s, project))),
    )
  }

  /** Make the pop-up match the address bar. */
  function syncModalToHash() {
    const id = projectFromHash()
    if (id) {
      renderModal(id)
      if (!modal.open) modal.showModal()
      document.body.classList.add('locked')
    } else if (modal.open) {
      modal.close()
    }
  }

  // Opening = only change the hash; "hashchange" does the rest.
  for (const button of $$('[data-open]')) {
    button.addEventListener('click', () => {
      window.location.hash = PREFIX + button.dataset.open
    })
  }
  window.addEventListener('hashchange', syncModalToHash)

  // "close" fires for Esc, the X button and backdrop clicks alike.
  modal.addEventListener('close', () => {
    document.body.classList.remove('locked')
    // replaceState doesn't jump the page (setting the hash to "#projects" would scroll).
    if (projectFromHash()) window.history.replaceState(null, '', '#projects')
  })
  $('#modal-close').addEventListener('click', () => modal.close())
  // The <dialog> element is only the box. A click that lands on the dialog itself,
  // not on something inside it, is a click on the dimmed backdrop.
  modal.addEventListener('click', (event) => {
    if (event.target === modal) modal.close()
  })

  syncModalToHash() // the page may have been opened from a shared #project-... link

  /* ---------- Language switch: rebuild the text this file created ---------- */
  onLangChange(() => {
    paintLevelLabels()
    paintSkillResult()
    if (modal.open && projectFromHash()) renderModal(projectFromHash())
  })
})()
