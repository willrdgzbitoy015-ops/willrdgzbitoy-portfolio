import { useLanguage } from '../../i18n/LanguageContext'
import { Button } from '../ui/Button'
import { PlayIcon } from '../ui/icons'
import { ResumeButton } from '../ui/ResumeButton'

/**
 * Hero, milestone 1 version: the text and the two buttons only.
 * Milestone 2 adds the photo stage (drag-in animation, selection box, tech tiles) and the chips.
 */
export function Hero() {
  const { t } = useLanguage()

  return (
    <section id="home" className="pt-11 pb-18 min-[921px]:pt-16 min-[921px]:pb-22">
      <div className="wrap">
        <p className="text-t1 font-mono text-[15px] font-medium">{t('hero.hi')}</p>
        <h1 className="mt-3.5 max-w-[14ch] text-[clamp(2.6rem,5.8vw,4.5rem)] leading-[1.02] font-bold tracking-[-0.03em]">
          {t('hero.h1a')} <span className="grad-text">{t('hero.h1b')}</span>
        </h1>
        <p className="text-muted mt-5.5 max-w-[50ch] text-lg">{t('hero.sub')}</p>
        <div className="mt-7.5 flex flex-wrap gap-3">
          <Button href="#demo">
            <PlayIcon />
            <span>{t('cta.try')}</span>
          </Button>
          <ResumeButton variant="ghost" />
        </div>
      </div>
    </section>
  )
}
