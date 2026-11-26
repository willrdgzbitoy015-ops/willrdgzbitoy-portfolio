/*
  CORE: the shared tools every other script uses.
    1. Small helpers ($, $$, el)
    2. Safe localStorage
    3. Toast (the small message bar)
    4. Rich text (**bold** and [placeholder])
    5. Theme: Day / Night

  Everything shared hangs on one global object, WB, so the files can talk to each
  other without a build tool. The scripts load in the order listed in index.html.
*/
window.WB = window.WB || {}

;(function () {
  const root = document.documentElement

  /* ---------- 1. Helpers ---------- */
  /** First element matching a CSS selector. */
  const $ = (selector, parent = document) => parent.querySelector(selector)
  /** All elements matching a CSS selector, as a real array. */
  const $$ = (selector, parent = document) => Array.from(parent.querySelectorAll(selector))
  /** Create an element: el('span', { class: 'badge' }, 'text or child nodes'). */
  function el(tag, attrs = {}, ...children) {
    const node = document.createElement(tag)
    for (const [name, value] of Object.entries(attrs)) node.setAttribute(name, value)
    node.append(...children)
    return node
  }
  /** True when the visitor asked their device for less animation. */
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  /* ---------- 2. Safe localStorage ----------
     Reading or writing can throw (private mode, blocked site data), so every call is
     wrapped. Without storage the site still works; choices just aren't remembered. */
  function save(key, value) {
    try {
      localStorage.setItem(key, value)
    } catch (e) {
      /* not remembered, nothing else to do */
    }
  }
  function load(key) {
    try {
      return localStorage.getItem(key)
    } catch (e) {
      return null
    }
  }

  /* ---------- 3. Toast ---------- */
  let toastTimer
  function toast(message) {
    const bar = $('#toast')
    bar.textContent = message
    bar.classList.add('show')
    clearTimeout(toastTimer)
    toastTimer = setTimeout(() => bar.classList.remove('show'), 2800)
  }

  /* ---------- 4. Rich text ----------
     Turns a line of project text (js/data/projects.js) into page elements. It understands two markers:
       **bold words**  ->  <strong>
       [placeholder]   ->  highlighted text (something Will still has to fill in)
     It builds elements and sets textContent, never innerHTML, so text can never
     be run as HTML by accident. */
  function rich(text) {
    const fragment = document.createDocumentFragment()
    for (const part of text.split(/(\*\*[^*]+\*\*|\[[^\]]+\])/g)) {
      if (part.startsWith('**') && part.endsWith('**')) {
        fragment.append(el('strong', {}, part.slice(2, -2)))
      } else if (part.startsWith('[') && part.endsWith(']')) {
        fragment.append(el('span', { class: 'ph' }, part))
      } else if (part) {
        fragment.append(part)
      }
    }
    return fragment
  }

  /* ---------- 5. Theme ----------
     The CSS reads <html data-theme="light|dark"> (see css/styles.css, section 1).
     The inline script in index.html already set it before first paint; here we wire
     the button, remember a manual choice, and keep following the device until then. */
  const SUN =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>'
  const MOON =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/></svg>'
  // Browser toolbar color on phones, matched to --bg of each theme.
  const TOOLBAR_COLOR = { light: '#F5F6FC', dark: '#070A1A' }
  const deviceDark = window.matchMedia('(prefers-color-scheme: dark)')
  const deviceLight = window.matchMedia('(prefers-color-scheme: light)')
  const themeButton = $('#theme-btn')

  const isDark = () => root.dataset.theme === 'dark'

  function paintTheme() {
    themeButton.innerHTML = isDark() ? SUN : MOON // fixed icon markup from this file, not user text
    themeButton.setAttribute('aria-label', isDark() ? 'Switch to day mode' : 'Switch to night mode')
    themeButton.title = isDark() ? 'Day mode' : 'Night mode'
    $('meta[name="theme-color"]').content = TOOLBAR_COLOR[isDark() ? 'dark' : 'light']
  }

  function setTheme(theme, remember) {
    root.dataset.theme = theme
    if (remember) save('wb-theme', theme)
    paintTheme()
  }

  /** Day <-> Night. Where the browser supports View Transitions (Chrome, Edge, Safari 18+,
      Firefox 144+), the new theme grows out of the theme button as a circle: the browser
      snapshots the old page, we switch the theme, then we animate a circular clip-path on
      the new snapshot. Older browsers, or reduced motion, simply switch. */
  function toggleTheme() {
    const next = isDark() ? 'light' : 'dark'
    if (!document.startViewTransition || reducedMotion) return setTheme(next, true)

    // Centre of the circle: the theme button. If it is hidden (width 0), the screen centre.
    const box = themeButton.getBoundingClientRect()
    const x = box.width ? box.left + box.width / 2 : innerWidth / 2
    const y = box.height ? box.top + box.height / 2 : innerHeight / 2
    // Radius that reaches the farthest corner of the screen, so the circle covers everything.
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))

    const transition = document.startViewTransition(() => setTheme(next, true))
    transition.ready
      .then(() => {
        root.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          {
            duration: 700,
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
            pseudoElement: '::view-transition-new(root)',
          },
        )
      })
      .catch(() => {}) // the browser skipped the animation: the theme has still switched
  }

  /* ---------- Start ---------- */
  themeButton.addEventListener('click', toggleTheme)
  // Follow the device setting live, but only while the visitor hasn't picked a theme.
  // (Night is the default look; Day is used when the device asks for light.)
  deviceDark.addEventListener('change', () => {
    if (!load('wb-theme')) setTheme(deviceLight.matches ? 'light' : 'dark', false)
  })

  paintTheme()

  /* ---------- A small surprise for anyone who opens DevTools (F12) ----------
     %c applies the CSS in the next argument to the text that follows it. */
  console.log(
    '%cKumusta, curious dev! 👋%c\nThis site is plain HTML, CSS and JavaScript: no framework, no build step.',
    'font: 700 16px system-ui; color: #9b6bff',
    'font: 13px system-ui',
  )

  /* ---------- Shared with the other scripts ---------- */
  Object.assign(WB, {
    $,
    $$,
    el,
    reducedMotion,
    save,
    load,
    toast,
    rich,
  })
})()
