import { useCallback, useEffect, useRef, useState } from 'react'
import { SECTIONS } from '../../data/links'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useScrollProgress } from '../../hooks/useScrollProgress'
import { useLanguage } from '../../i18n/LanguageContext'
import type { Lang } from '../../i18n/LanguageContext'
import { useTheme } from '../../theme/ThemeContext'
import { CloseIcon, MenuIcon, MoonIcon, SearchIcon, SunIcon } from '../ui/icons'
import { Logo } from '../ui/Logo'
import { ResumeButton } from '../ui/ResumeButton'
import { MobileMenu } from './MobileMenu'

const SECTION_IDS = SECTIONS.map((s) => s.id)
const LANGUAGES: { code: Lang; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'ceb', label: 'BIS' },
]
// Same width as the `nav:` breakpoint in index.css (55rem = 880px).
const DESKTOP_QUERY = '(min-width: 55rem)'

// Round icon buttons (theme, hamburger) share this look.
const ICON_BUTTON =
  'inline-grid size-[38px] cursor-pointer place-items-center rounded-full border border-line bg-surface text-ink transition duration-250 hover:-rotate-[14deg] hover:border-sel [&_svg]:size-[18px]'

export function Navbar({ onOpenPalette }: { onOpenPalette: () => void }) {
  const { lang, setLang, t } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const activeId = useActiveSection(SECTION_IDS)
  const rulerRef = useScrollProgress<HTMLDivElement>()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  // While the mobile menu is open: Esc closes it (and puts focus back on the
  // hamburger), the page behind can't scroll, and widening the window closes it.
  useEffect(() => {
    if (!menuOpen) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setMenuOpen(false)
      menuButtonRef.current?.focus()
    }
    const desktop = window.matchMedia(DESKTOP_QUERY)
    const onResize = () => {
      if (desktop.matches) setMenuOpen(false)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    desktop.addEventListener('change', onResize)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
      desktop.removeEventListener('change', onResize)
    }
  }, [menuOpen])

  const isDark = theme === 'dark'

  return (
    <header
      id="top"
      className="border-line bg-nav-bg sticky top-0 z-50 border-b backdrop-blur-md backdrop-saturate-150"
    >
      <div className="wrap flex h-(--nav-h) items-center gap-3.5">
        <a
          href="#home"
          aria-label={t('nav.home')}
          className="group font-display mr-auto flex items-center gap-2.5 text-[17px] font-semibold tracking-[-0.01em] no-underline"
          onClick={closeMenu}
        >
          <Logo className="size-[34px] flex-none transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-[8deg]" />
          <span className="max-[460px]:hidden">Will R. Bitoy</span>
        </a>

        <nav className="nav:flex hidden gap-0.5" aria-label={t('nav.sections')}>
          {SECTIONS.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              aria-current={activeId === section.id ? 'true' : undefined}
              className="nav-link text-muted hover:bg-surface-2 hover:text-ink aria-[current=true]:text-ink relative rounded-lg px-3 py-2 text-[14.5px] font-medium no-underline transition-colors duration-200"
            >
              {t(section.navKey)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* EN / BIS toggle. aria-pressed tells screen readers which one is on. */}
          <div
            role="group"
            aria-label={t('nav.language')}
            className="border-line bg-surface inline-flex rounded-full border p-0.5"
          >
            {LANGUAGES.map(({ code, label }) => (
              <button
                key={code}
                type="button"
                lang={code}
                aria-pressed={lang === code}
                onClick={() => setLang(code)}
                className="text-muted hover:text-ink aria-pressed:bg-ink aria-pressed:text-bg cursor-pointer rounded-full px-[9px] py-1.5 font-mono text-[11.5px] font-semibold transition-colors duration-200"
              >
                {label}
              </button>
            ))}
          </div>

          <button
            type="button"
            aria-label={t('nav.openPalette')}
            onClick={onOpenPalette}
            className="border-line bg-surface text-muted hover:border-sel hover:text-ink inline-flex h-[38px] cursor-pointer items-center justify-center gap-2 rounded-full border px-2.5 transition-colors duration-200 max-[560px]:w-[38px] max-[560px]:px-0"
          >
            <SearchIcon className="size-4" />
            <kbd className="font-mono text-[11px] font-semibold max-[560px]:hidden">Ctrl K</kbd>
          </button>

          <button
            type="button"
            aria-label={t(isDark ? 'theme.toDay' : 'theme.toNight')}
            title={t(isDark ? 'theme.day' : 'theme.night')}
            onClick={toggleTheme}
            className={ICON_BUTTON}
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>

          <ResumeButton labelKey="nav.resume" size="sm" className="max-nav:hidden" />

          <button
            ref={menuButtonRef}
            type="button"
            aria-label={t(menuOpen ? 'nav.closeMenu' : 'nav.openMenu')}
            aria-expanded={menuOpen}
            aria-controls="menu-panel"
            onClick={() => setMenuOpen((open) => !open)}
            className={`${ICON_BUTTON} nav:hidden`}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Scroll progress, drawn as a ruler with tick marks (styles/effects.css). */}
      <div ref={rulerRef} className="ruler" aria-hidden="true">
        <i className="ruler-fill" />
      </div>

      <MobileMenu open={menuOpen} onClose={closeMenu} />
    </header>
  )
}
