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
  const { $, $$, toast, reducedMotion } = WB
  const root = document.documentElement

  /* ---------- 1. Preloader and entrance ----------
     The script in <head> adds "preload" on the first page of a visit and on every refresh
     (otherwise "intro": just the entrance, see css/styles.css section 3).
     While the preloader shows, its bar and number follow the real loading progress: we
     count the fonts plus every image that loads right away (not the lazy ones), and the
     number glides toward that share. It stops at 90% until the browser says the whole page
     has loaded, then runs to 100%. After that (and at least MIN_TIME after this script
     started, so the letters can finish rising) the curtain lifts and the hero comes in. */
  const preloader = $('.preloader')
  if (root.classList.contains('preload') && preloader) {
    const MIN_TIME = 1000 // ms
    const started = performance.now()
    const SAFETY_NET = 2900 // ms: about when the CSS lifts the curtain by itself
    const bar = $('.pl-bar i', preloader)
    const number = $('.pl-pct', preloader)
    preloader.classList.add('live') // from now on this script moves the bar, not the CSS

    const images = $$('img').filter((img) => img.loading !== 'lazy')
    const total = images.length + 1 // + 1 for the fonts
    let ready = 0
    const oneMore = () => {
      ready += 1
    }
    if (document.fonts) document.fonts.ready.then(oneMore)
    else oneMore()
    for (const img of images) {
      if (img.complete) oneMore()
      else {
        img.addEventListener('load', oneMore, { once: true })
        img.addEventListener('error', oneMore, { once: true }) // a broken image still counts as done
      }
    }
    let pageLoaded = document.readyState === 'complete'
    window.addEventListener('load', () => (pageLoaded = true), { once: true })

    let shown = 0 // what the bar shows now (0 to 1)
    function step() {
      const real = pageLoaded ? 1 : Math.min(ready / total, 0.9)
      shown += (real - shown) * 0.12 // move 12% of the way each frame: a smooth glide
      if (real - shown < 0.005) shown = real
      bar.style.transform = `scaleX(${shown})`
      number.textContent = Math.round(shown * 100) + '%'
      if (shown === 1 && performance.now() - started >= MIN_TIME) finish()
      else requestAnimationFrame(step)
    }
    requestAnimationFrame(step)

    function finish() {
      // performance.now() counts from the moment the page started loading. If the CSS
      // safety net already lifted the curtain (a very slow load, or the tab was in the
      // background), don't play it again: just tidy up.
      if (performance.now() > SAFETY_NET) {
        root.classList.remove('preload')
        return
      }
      preloader.classList.add('done') // CSS: the words float away, the curtain lifts
      root.classList.add('intro') // CSS: navbar and hero come in, one after another
      setTimeout(() => root.classList.remove('preload'), 1000)
      setTimeout(() => root.classList.remove('intro'), 2600)
    }
  } else if (root.classList.contains('intro')) {
    // No preloader: the entrance started on its own; tidy up when it's over.
    setTimeout(() => root.classList.remove('intro'), 2200)
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
    menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu')
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
      toast('The resume PDF is not uploaded yet.')
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
          const node = entry.target
          node.style.setProperty('--d', Math.min(stagger, 4) * 0.08 + 's')
          node.classList.add('is-in')
          revealWatcher.unobserve(node) // play once
          stagger += 1
          // When the fade-up has finished, drop the classes: the reveal's slow transition
          // would otherwise also slow down the card's own hover effects (lift, border color).
          node.addEventListener('transitionend', function done(event) {
            if (event.target !== node || event.propertyName !== 'opacity') return
            node.classList.remove('reveal', 'is-in')
            node.style.removeProperty('--d')
            node.removeEventListener('transitionend', done)
          })
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
      cursor.classList.toggle('hover', !!event.target.closest('a, button, label'))
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
