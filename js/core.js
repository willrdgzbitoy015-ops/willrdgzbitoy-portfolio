/*
  CORE: the shared tools every other script uses.
    1. Small helpers ($, $$, el)
    2. Safe localStorage
    3. Toast (the small message bar)
    4. Rich text (**bold** and [placeholder])
    5. Language: English / Bisaya
    6. Theme: Day / Night

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
     Turns a dictionary string into page elements. It understands two markers:
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

  /* ---------- 5. Language ----------
     index.html is written in English. Elements carry a key:
       data-i18n="key"            their text gets swapped
       data-i18n-rich="key"       same, with **bold** / [placeholder] styling
       data-i18n-attr="attr:key"  an attribute gets swapped (aria-label, alt, title)
     Step 1 (once): copy the English found in the page into WB.en, next to the
                    JS-only lines from js/i18n/en.js. Now WB.en has every key.
     Step 2 (each switch): write the chosen language's line into every element. */
  const dictionaries = { en: WB.en, ceb: WB.ceb }
  let currentLang = 'en'
  const langListeners = []

  /** "aria-label:nav.home, title:nav.home" -> [['aria-label','nav.home'], ['title','nav.home']] */
  const attrPairs = (node) =>
    node.dataset.i18nAttr.split(',').map((pair) => pair.split(':').map((s) => s.trim()))

  function collectEnglish() {
    for (const node of $$('[data-i18n]')) {
      const key = node.dataset.i18n
      // Collapse the line breaks and indentation the HTML formatter adds.
      if (!(key in WB.en)) WB.en[key] = node.textContent.replace(/\s+/g, ' ').trim()
    }
    for (const node of $$('[data-i18n-attr]')) {
      for (const [attr, key] of attrPairs(node)) {
        if (!(key in WB.en)) WB.en[key] = node.getAttribute(attr)
      }
    }
  }

  /** Translate a key into the current language. Falls back to English, then to the key. */
  function t(key) {
    return dictionaries[currentLang][key] ?? WB.en[key] ?? key
  }

  function applyLanguage() {
    for (const node of $$('[data-i18n]')) node.textContent = t(node.dataset.i18n)
    for (const node of $$('[data-i18n-rich]')) node.replaceChildren(rich(t(node.dataset.i18nRich)))
    for (const node of $$('[data-i18n-attr]')) {
      for (const [attr, key] of attrPairs(node)) node.setAttribute(attr, t(key))
    }
  }

  function setLang(lang) {
    currentLang = lang === 'ceb' ? 'ceb' : 'en'
    root.lang = currentLang // screen readers use this to pronounce the page correctly
    applyLanguage()
    for (const button of $$('[data-lang]')) {
      button.setAttribute('aria-pressed', String(button.dataset.lang === currentLang))
    }
    save('wb-lang', currentLang)
    // Tell the other scripts, so text they built themselves gets rebuilt too.
    for (const listener of langListeners) listener(currentLang)
  }

  /** Our safety net (the job TypeScript used to do): list keys on this page that have no
      Bisaya line. (Keys used only on the other page are fine, so they aren't reported.) */
  function checkDictionaries() {
    const missing = Object.keys(WB.en).filter((key) => !(key in WB.ceb))
    if (missing.length) console.warn('Bisaya is missing these keys:', missing)
  }

  /* ---------- 6. Theme ----------
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
    themeButton.setAttribute('aria-label', t(isDark() ? 'theme.toDay' : 'theme.toNight'))
    themeButton.title = t(isDark() ? 'theme.day' : 'theme.night')
    $('meta[name="theme-color"]').content = TOOLBAR_COLOR[isDark() ? 'dark' : 'light']
  }

  function setTheme(theme, remember) {
    root.dataset.theme = theme
    if (remember) save('wb-theme', theme)
    paintTheme()
  }

  function toggleTheme() {
    setTheme(isDark() ? 'light' : 'dark', true)
  }

  /* ---------- Start ---------- */
  collectEnglish()
  checkDictionaries()

  themeButton.addEventListener('click', toggleTheme)
  // Follow the device setting live, but only while the visitor hasn't picked a theme.
  // (Night is the default look; Day is used when the device asks for light.)
  deviceDark.addEventListener('change', () => {
    if (!load('wb-theme')) setTheme(deviceLight.matches ? 'light' : 'dark', false)
  })

  for (const button of $$('[data-lang]')) {
    button.addEventListener('click', () => setLang(button.dataset.lang))
  }
  langListeners.push(paintTheme)
  if (load('wb-lang') === 'ceb') setLang('ceb')
  paintTheme()

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
    t,
    setLang,
    getLang: () => currentLang,
    /** Run a function every time the language changes. */
    onLangChange: (listener) => langListeners.push(listener),
    toggleTheme,
  })
})()
