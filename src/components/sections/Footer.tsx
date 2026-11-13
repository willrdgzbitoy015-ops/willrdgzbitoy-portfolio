import { SOCIALS } from '../../data/links'
import { useLanguage } from '../../i18n/LanguageContext'
import { formatMonthYear } from '../../lib/formatDate'
import { ArrowUpIcon } from '../ui/icons'
import { Logo } from '../ui/Logo'

// The build time, set by Vite when the site is built (see vite.config.ts).
const LAST_UPDATED = new Date(__LAST_UPDATED__)

/** Footer with social links and a design-app style status bar. */
export function Footer() {
  const { lang, t } = useLanguage()

  return (
    <footer className="border-line bg-surface border-t">
      <div className="wrap flex flex-col gap-5 py-7">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <a
            href="#home"
            className="group font-display flex items-center gap-2.5 text-[17px] font-semibold tracking-[-0.01em] no-underline"
          >
            <Logo className="size-[34px] flex-none transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-[8deg]" />
            <span>Will R. Bitoy</span>
          </a>

          <nav className="flex flex-wrap gap-1.5" aria-label={t('footer.elsewhere')}>
            {SOCIALS.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener"
                className="border-line text-muted hover:border-sel hover:text-ink rounded-lg border px-3 py-1.5 text-sm no-underline transition-colors duration-200"
              >
                {social.name}
              </a>
            ))}
          </nav>

          <a
            href="#home"
            aria-label={t('footer.backToTop')}
            title={t('footer.backToTop')}
            className="border-line bg-surface text-ink hover:border-sel inline-grid size-[38px] place-items-center rounded-full border transition duration-250 hover:-translate-y-0.5"
          >
            <ArrowUpIcon className="size-[18px]" />
          </a>
        </div>

        <div className="border-line text-muted flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-dashed pt-4 font-mono text-xs">
          <span>{t('footer.built')} · Palompon, Leyte</span>
          <span>
            {t('footer.status')} · {t('footer.updated')} {formatMonthYear(LAST_UPDATED, lang)}
          </span>
          {/* Stays in Bisaya in both languages, so it is marked lang="ceb". */}
          <span lang="ceb" className="text-t1 font-semibold">
            Salamat sa pagbisita!
          </span>
        </div>
      </div>
    </footer>
  )
}
