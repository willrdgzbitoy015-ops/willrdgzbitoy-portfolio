/*
  LAYOUT: the parts around the content (used on index.html and project.html).
    1. Preloader
    2. Mobile menu (hamburger)
    3. Resume buttons
    4. Navbar shadow + active link
    5. Fade-up on scroll
    6. Custom cursor
*/
;(function () {
  const { $, $$, t, toast, reducedMotion, onLangChange } = WB
  const root = document.documentElement

  /* ---------- 1. Preloader ----------
     The script in <head> adds "preload" on the first page of a visit. We let the little
     intro play for at least 0.9 s (and at most until the page has loaded), then fade it
     out and remember it for this visit, so it doesn't replay on every page. */
  const preloader = $('.preloader')
  if (root.classList.contains('preload') && preloader) {
    const started = performance.now()
    const finish = () => {
      const wait = Math.max(0, 900 - (performance.now() - started))
      setTimeout(() => {
        preloader.classList.add('done')
        setTimeout(() => root.classList.remove('preload'), 450)
      }, wait)
    }
    if (document.readyState === 'complete') finish()
    else window.addEventListener('load', finish, { once: true })
  }
  try {
    sessionStorage.setItem('wb-seen', '1')
  } catch (e) {
    /* not remembered: the intro may show again, nothing else breaks */
  }

  /* ---------- 2. Mobile menu ---------- */
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
  // A click outside the menu and the navbar closes it too.
  document.addEventListener('click', (event) => {
    if (menuIsOpen() && !event.target.closest('#menu-panel, .nav-bar')) setMenu(false)
  })
  // Widening the window past the mobile breakpoint closes it (same 1100px as the CSS).
  window.matchMedia('(min-width: 1101px)').addEventListener('change', (event) => {
    if (event.matches && menuIsOpen()) setMenu(false)
  })
  onLangChange(() => setMenu(menuIsOpen())) // refresh the button's label in the new language
  setMenu(false)

  /* ---------- 3. Resume buttons ----------
     The PDF is will-bitoy-resume.pdf, next to index.html. To update the resume, replace
     that file and keep the same name. (If the file is ever removed, set RESUME_READY to
     false so the buttons explain that it's missing instead of downloading a broken file.) */
  const RESUME_READY = true
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
    // On a web server the line above downloads the file. When the page is opened straight
    // from a folder (file://) browsers ignore it, so open the PDF in a new tab instead of
    // leaving the site.
    link.target = '_blank'
    link.rel = 'noopener'
    document.body.append(link)
    link.click()
    link.remove()
  }
  for (const button of $$('[data-resume]')) button.addEventListener('click', downloadResume)

  // Other scripts (the command palette) need these two.
  WB.downloadResume = downloadResume
  WB.closeMenu = () => setMenu(false)

  /* ---------- 4. Navbar shadow + active link ----------
     The pill gets a shadow once the page has scrolled. requestAnimationFrame limits the
     work to once per frame. */
  const nav = $('.nav')
  let ticking = false
  function onScroll() {
    if (ticking) return
    ticking = true
    requestAnimationFrame(() => {
      ticking = false
      nav.classList.toggle('scrolled', window.scrollY > 12)
    })
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()

  // On a project page, the "Projects" link is the current one.
  const currentPage = document.body.dataset.page
  if (currentPage === 'project') {
    for (const link of $$('.links a, .panel a')) {
      if (link.getAttribute('href').endsWith('#projects')) link.setAttribute('aria-current', 'true')
    }
  }

  if (!('IntersectionObserver' in window)) return // very old browsers: skip the extras below

  /* On the home page: IntersectionObserver tells us when a section crosses a thin band just
     above the middle of the screen; that section's link gets the filled pill. */
  const navLinks = $$('.links a, .panel a')
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
  if (currentPage !== 'project') {
    for (const section of $$('main section[id]')) sectionWatcher.observe(section)
  }

  /* ---------- 5. Fade-up on scroll ----------
     Elements with class "reveal" slide up gently the first time they come into view.
     Cards in the same row get a small stagger (--d). Without JavaScript, or with reduced
     motion, the class "reveal-on" is never added, so nothing is ever hidden. */
  if (!reducedMotion) {
    root.classList.add('reveal-on')
    const revealWatcher = new IntersectionObserver(
      (entries) => {
        let stagger = 0
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.style.setProperty('--d', Math.min(stagger, 4) * 0.08 + 's')
          entry.target.classList.add('is-in')
          revealWatcher.unobserve(entry.target) // play once
          stagger += 1
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
    WB.watchReveal = (nodes) => {
      for (const node of nodes) revealWatcher.observe(node)
    }
    WB.watchReveal($$('.reveal'))
  } else {
    WB.watchReveal = () => {}
  }

  /* ---------- 6. Custom cursor ----------
     A dot that sticks to the mouse and a ring that follows a little behind it.
     Only for a real mouse ("pointer: fine") and when motion is allowed. */
  const fineMouse = window.matchMedia('(hover: hover) and (pointer: fine)').matches
  const cursor = $('.cursor')
  if (!cursor || !fineMouse || reducedMotion) return

  root.classList.add('has-cursor')
  const dot = $('.cursor-dot', cursor)
  const ring = $('.cursor-ring', cursor)
  let mouseX = -100
  let mouseY = -100
  let ringX = -100
  let ringY = -100

  window.addEventListener(
    'mousemove',
    (event) => {
      mouseX = event.clientX
      mouseY = event.clientY
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`
      cursor.classList.remove('hidden')
      // Grow the ring over anything clickable.
      cursor.classList.toggle('hover', !!event.target.closest('a, button, [role=option], label'))
    },
    { passive: true },
  )
  document.addEventListener('mouseleave', () => cursor.classList.add('hidden'))

  // The ring eases toward the mouse every frame (18% of the remaining distance).
  function follow() {
    ringX += (mouseX - ringX) * 0.18
    ringY += (mouseY - ringY) * 0.18
    ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`
    requestAnimationFrame(follow)
  }
  requestAnimationFrame(follow)
})()
