import { SECTIONS } from '../../data/links'
import { useLanguage } from '../../i18n/LanguageContext'
import { ResumeButton } from '../ui/ResumeButton'

interface MobileMenuProps {
  open: boolean
  onClose: () => void
}

/**
 * Full-screen panel under the navbar with big numbered links (phones and tablets).
 * `hidden` removes it from the page and from keyboard/screen-reader reach when closed.
 * Opening, Esc and scroll-lock are handled by Navbar, which owns the open state.
 */
export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const { t } = useLanguage()

  return (
    <div
      id="menu-panel"
      hidden={!open}
      className="border-line bg-bg nav:hidden absolute top-full right-0 left-0 h-[calc(100dvh-var(--nav-h))] overflow-auto border-t"
    >
      <div className="wrap">
        <nav aria-label={t('nav.sectionsMobile')} className="flex flex-col pt-3 pb-7">
          {SECTIONS.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              onClick={onClose}
              className="border-line font-display hover:text-t1 flex items-baseline gap-3.5 border-b border-dashed py-4 text-3xl leading-tight font-semibold no-underline transition-colors duration-200"
            >
              <span className="text-muted font-mono text-xs font-normal">{section.number}</span>
              {t(section.navKey)}
            </a>
          ))}
          <ResumeButton className="mt-5 self-start" onClick={onClose} />
        </nav>
      </div>
    </div>
  )
}
