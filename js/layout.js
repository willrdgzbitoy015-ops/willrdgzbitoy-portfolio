/*
  LAYOUT: the parts around the content.
    1. Mobile menu (hamburger)
    2. Resume buttons
    3. Ruler (scroll progress)
    4. Active navbar link
    5. Frame titles that draw themselves
*/
;(function () {
  const { $, $$, t, toast, reducedMotion, onLangChange } = WB

  /* ---------- 1. Mobile menu ---------- */
  const menuButton = $('#menu-btn')
  const panel = $('#menu-panel')
  const ICON_MENU =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>'
  const ICON_CLOSE =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'

  const menuIsOpen = () => !panel.hidden

  function setMenu(open) {
    panel.hidden = !open
    // aria-expanded tells screen readers whether the menu is open.
    menuButton.setAttribute('aria-expanded', String(open))
    menuButton.setAttribute('aria-label', t(open ? 'nav.closeMenu' : 'nav.openMenu'))
    menuButton.innerHTML = open ? ICON_CLOSE : ICON_MENU // fixed icon markup, not user text
    // The page behind must not scroll while the menu covers it.
    document.body.classList.toggle('locked', open)
  }

  menuButton.addEventListener('click', () => setMenu(!menuIsOpen()))
  // Tapping a link closes the menu (the browser then scrolls to the section).
  for (const link of $$('a', panel)) link.addEventListener('click', () => setMenu(false))
  // Esc closes it and puts keyboard focus back on the hamburger.
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuIsOpen()) {
      setMenu(false)
      menuButton.focus()
    }
  })
  // Widening the window past the mobile breakpoint closes it (same 880px as the CSS).
  window.matchMedia('(min-width: 881px)').addEventListener('change', (event) => {
    if (event.matches && menuIsOpen()) setMenu(false)
  })
  onLangChange(() => setMenu(menuIsOpen())) // refresh the button's label in the new language
  setMenu(false)

  /* ---------- 2. Resume buttons ----------
     When the PDF is added: put it at will-bitoy-resume.pdf (next to index.html)
     and change RESUME_READY to true. Until then the buttons explain that it's missing,
     instead of downloading a broken file. */
  const RESUME_READY = false
  const RESUME_FILE = 'will-bitoy-resume.pdf'

  function downloadResume() {
    if (menuIsOpen()) setMenu(false)
    if (!RESUME_READY) {
      toast(t('toast.resumeSoon'))
      return
    }
    // A temporary <a download> link is the standard way to start a download from JS.
    const link = document.createElement('a')
    link.href = RESUME_FILE
    link.download = RESUME_FILE
    document.body.append(link)
    link.click()
    link.remove()
  }
  for (const button of $$('[data-resume]')) button.addEventListener('click', downloadResume)

  // Other scripts (the command palette) need these two.
  WB.downloadResume = downloadResume
  WB.closeMenu = () => setMenu(false)

  /* ---------- 3. Ruler ----------
     Writes --p (0 at the top of the page, 1 at the bottom) onto the ruler; the CSS turns
     it into the bar's width. requestAnimationFrame limits the work to once per frame. */
  const ruler = $('.ruler')
  let ticking = false

  function updateRuler() {
    ticking = false
    const scrollable = document.documentElement.scrollHeight - window.innerHeight
    const progress = scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0
    ruler.style.setProperty('--p', progress.toFixed(4))
  }
  function onScroll() {
    if (ticking) return
    ticking = true
    requestAnimationFrame(updateRuler)
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll)
  updateRuler()

  if (!('IntersectionObserver' in window)) return // very old browsers: skip the extras below

  /* ---------- 4. Active navbar link ----------
     IntersectionObserver lets the browser tell us when a section crosses a line.
     The rootMargin shrinks the "viewport" to a thin band just above the middle of the
     screen; whichever section is in that band gets its link underlined. */
  const navLinks = $$('.links a')
  const sectionWatcher = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        for (const link of navLinks) {
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.setAttribute('aria-current', 'true')
          } else {
            link.removeAttribute('aria-current')
          }
        }
      }
    },
    { rootMargin: '-45% 0px -50% 0px' },
  )
  for (const section of $$('main section[id]')) sectionWatcher.observe(section)

  /* ---------- 5. Frame titles ----------
     The selection box around each section title draws itself the first time it scrolls
     into view. "armed" hides the box while it waits off-screen; "in" plays the drawing.
     The heading text itself is never hidden. Skipped entirely for reduced motion. */
  if (reducedMotion) return
  const titleWatcher = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const title = entry.target
        if (entry.isIntersecting) {
          title.classList.remove('armed')
          title.classList.add('in')
          titleWatcher.unobserve(title) // play once
        } else if (!title.classList.contains('in')) {
          title.classList.add('armed')
        }
      }
    },
    { threshold: 0.6 },
  )
  for (const title of $$('.ftitle')) titleWatcher.observe(title)
})()
