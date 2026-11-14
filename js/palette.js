/*
  COMMAND PALETTE (Ctrl+K, or ⌘K on a Mac)
  A search box of shortcuts: jump to a section, open a project, switch theme or
  language, download the resume, copy my email, open GitHub or LinkedIn.

  Keys: type to filter · ↑ ↓ to move · Enter to run · Esc to close.

  Accessibility: the text box is a "combobox" that controls a "listbox". Focus stays in
  the text box the whole time; aria-activedescendant tells screen readers which
  command is highlighted.
*/
;(function () {
  const { $, $$, el, t, reducedMotion, onLangChange } = WB

  const dialog = $('#cmdk')
  const input = $('#cmdk-input')
  const list = $('#cmdk-list')
  const openButton = $('#cmdk-btn')

  /* ---------- What each kind of command does ---------- */
  const goTo = (id) => () =>
    document.getElementById(id).scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' })
  const openProject = (id) => () => {
    window.location.hash = '#project-' + id // js/sections.js opens the pop-up for this hash
  }
  // A temporary link is the reliable way to open a new tab from a keyboard action.
  const openLink = (url) => () => {
    const link = el('a', { href: url, target: '_blank', rel: 'noopener' })
    document.body.append(link)
    link.click()
    link.remove()
  }

  /* ---------- The commands ----------
     Labels are built when the palette opens, so they follow the current language. */
  function buildCommands() {
    const projects = Object.entries(WB.PROJECTS).map(([id, project]) => ({
      label: t('cmd.openProject').replace('{name}', project.title),
      hint: t('hint.project'),
      run: openProject(id),
    }))
    return [
      { label: t('cmd.about'), hint: t('hint.section'), run: goTo('about') },
      { label: t('cmd.skills'), hint: t('hint.section'), run: goTo('skills') },
      { label: t('cmd.projects'), hint: t('hint.section'), run: goTo('projects') },
      { label: t('cmd.contact'), hint: t('hint.section'), run: goTo('contact') },
      ...projects,
      { label: t('cmd.theme'), hint: t('hint.theme'), run: WB.toggleTheme },
      {
        label: t('cmd.lang'),
        hint: t('hint.lang'),
        run: () => WB.setLang(WB.getLang() === 'ceb' ? 'en' : 'ceb'),
      },
      { label: t('cmd.resume'), hint: t('hint.file'), run: WB.downloadResume },
      { label: t('cmd.copyEmail'), hint: t('hint.contact'), run: WB.copyEmail },
      {
        label: t('cmd.github'),
        hint: t('hint.link'),
        run: openLink('https://github.com/willrdgzbitoy015-ops'),
      },
      {
        label: t('cmd.linkedin'),
        hint: t('hint.link'),
        run: openLink('https://www.linkedin.com/in/will-bitoy-637305417/'),
      },
      { label: t('cmd.top'), hint: t('hint.section'), run: goTo('home') },
    ]
  }

  let commands = [] // all commands, in the current language
  let shown = [] // the ones that match what was typed
  let active = 0 // index (in `shown`) of the highlighted command

  /* ---------- Drawing the list ---------- */
  function markActive() {
    for (const item of $$('[role=option]', list)) {
      item.setAttribute('aria-selected', String(Number(item.dataset.index) === active))
    }
    const current = $('[aria-selected=true]', list)
    if (current) {
      current.scrollIntoView({ block: 'nearest' })
      input.setAttribute('aria-activedescendant', current.id)
    } else {
      input.removeAttribute('aria-activedescendant')
    }
  }

  function renderList() {
    const query = input.value.trim().toLowerCase()
    shown = commands.filter((c) => (c.label + ' ' + c.hint).toLowerCase().includes(query))
    active = 0
    if (shown.length === 0) {
      list.replaceChildren(el('li', { class: 'cmdk-empty', role: 'presentation' }, t('cmdk.empty')))
    } else {
      list.replaceChildren(
        ...shown.map((command, index) =>
          el(
            'li',
            { role: 'option', id: 'cmd-' + index, 'data-index': index, 'aria-selected': 'false' },
            command.label,
            el('span', {}, command.hint),
          ),
        ),
      )
    }
    markActive()
  }

  /* ---------- Open, close, run ---------- */
  function openPalette() {
    if (dialog.open) return
    WB.closeMenu() // the mobile menu and the project pop-up must not sit underneath
    const projectModal = $('#modal')
    if (projectModal.open) projectModal.close()
    commands = buildCommands()
    input.value = ''
    renderList()
    dialog.showModal() // native <dialog>: Esc closes it and Tab stays inside
    document.body.classList.add('locked')
    input.focus()
  }

  function runCommand(index) {
    const command = shown[index]
    if (!command) return
    dialog.close()
    // Run after the dialog has closed, so scrolling and focus are not fought over.
    setTimeout(command.run, 0)
  }

  dialog.addEventListener('close', () => document.body.classList.remove('locked'))
  // A click on the dialog element itself (not on something inside it) is a click on the backdrop.
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close()
  })

  /* ---------- Keyboard and mouse ---------- */
  input.addEventListener('input', renderList)
  input.addEventListener('keydown', (event) => {
    if (shown.length === 0) return
    if (event.key === 'ArrowDown') {
      event.preventDefault() // keep the text cursor from jumping
      active = (active + 1) % shown.length // % wraps from the last back to the first
      markActive()
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      active = (active - 1 + shown.length) % shown.length
      markActive()
    } else if (event.key === 'Enter') {
      event.preventDefault()
      runCommand(active)
    }
  })
  list.addEventListener('click', (event) => {
    const item = event.target.closest('[role=option]')
    if (item) runCommand(Number(item.dataset.index))
  })
  list.addEventListener('mousemove', (event) => {
    const item = event.target.closest('[role=option]')
    if (item && Number(item.dataset.index) !== active) {
      active = Number(item.dataset.index)
      markActive()
    }
  })

  openButton.addEventListener('click', openPalette)
  // Ctrl+K (Windows, Linux) or ⌘K (Mac) opens it from anywhere, and closes it again.
  window.addEventListener('keydown', (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault() // otherwise the browser focuses its own address bar
      if (dialog.open) dialog.close()
      else openPalette()
    }
  })

  // Show the right shortcut on the navbar button for Mac visitors.
  if (/Mac|iPhone|iPad/.test(navigator.platform)) $('kbd', openButton).textContent = '⌘ K'

  // If the language is switched while the palette is open, rebuild its labels.
  onLangChange(() => {
    if (!dialog.open) return
    commands = buildCommands()
    renderList()
  })
})()
