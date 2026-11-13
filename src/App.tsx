import { Footer } from './components/sections/Footer'
import { Hero } from './components/sections/Hero'
import { Navbar } from './components/sections/Navbar'
import { FrameTitle } from './components/ui/FrameTitle'
import { useToast } from './components/ui/Toast'
import { SECTIONS } from './data/links'
import { useLanguage } from './i18n/LanguageContext'

export default function App() {
  const { t } = useLanguage()
  const toast = useToast()

  return (
    <>
      {/* Keyboard users can jump past the navbar. Only visible when focused. */}
      <a
        href="#main"
        className="focus:bg-btn focus:text-btn-ink sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-100 focus:rounded-lg focus:px-4 focus:py-2"
      >
        {t('a11y.skip')}
      </a>

      {/* The real command palette replaces this message in milestone 3. */}
      <Navbar onOpenPalette={() => toast(t('toast.paletteSoon'))} />

      {/* overflow-x-clip: decorations may poke outside, but the page never scrolls sideways. */}
      <main id="main" className="overflow-x-clip">
        <Hero />

        {/* Milestone 1 shell: every frame exists so the navbar, ruler and titles can be tested.
            Milestones 2 and 3 replace each one with its real section component. */}
        {SECTIONS.map((section) => (
          <section
            key={section.id}
            id={section.id}
            aria-labelledby={`${section.id}-title`}
            className="py-17 min-[701px]:py-24"
          >
            <div className="wrap">
              <div className="mb-11 flex flex-col gap-4.5">
                <FrameTitle
                  id={`${section.id}-title`}
                  tag={`Frame ${section.number} · ${t(section.frameKey)}`}
                  title={t(section.titleKey)}
                />
              </div>
              <p className="border-line bg-surface text-muted rounded-[14px] border border-dashed px-5 py-10 text-center font-mono text-[13px]">
                {t('shell.comingSoon')}
              </p>
            </div>
          </section>
        ))}
      </main>

      <Footer />
    </>
  )
}
