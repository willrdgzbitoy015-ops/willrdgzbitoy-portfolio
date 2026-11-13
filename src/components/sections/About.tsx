import type { ReactNode } from 'react'
import { ABOUT_IMAGE, defaultSrc, srcSet } from '../../data/images'
import { TIMELINE } from '../../data/timeline'
import { useLanguage } from '../../i18n/LanguageContext'
import type { TranslationKey } from '../../i18n/en'
import { renderRich } from '../../lib/richText'
import { CodeIcon, DatabaseIcon, HeadsetIcon, SteeringWheelIcon } from '../ui/icons'
import { Section } from '../ui/Section'

const ROLES: { icon: ReactNode; titleKey: TranslationKey; descKey: TranslationKey }[] = [
  { icon: <CodeIcon />, titleKey: 'role.dev.title', descKey: 'role.dev.desc' },
  { icon: <DatabaseIcon />, titleKey: 'role.encoder.title', descKey: 'role.encoder.desc' },
  { icon: <HeadsetIcon />, titleKey: 'role.support.title', descKey: 'role.support.desc' },
  { icon: <SteeringWheelIcon />, titleKey: 'role.driver.title', descKey: 'role.driver.desc' },
]

const FACTS: { labelKey: TranslationKey; valueKey: TranslationKey }[] = [
  { labelKey: 'facts.based', valueKey: 'facts.basedValue' },
  { labelKey: 'facts.studying', valueKey: 'facts.studyingValue' },
  { labelKey: 'facts.speaks', valueKey: 'facts.speaksValue' },
  { labelKey: 'facts.offscreen', valueKey: 'facts.offscreenValue' },
  { labelKey: 'facts.fun', valueKey: 'facts.funValue' },
]

export function About() {
  const { t } = useLanguage()

  return (
    <Section id="about">
      <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-11 min-[921px]:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div>
          {/* Bio with the photo beside it. flow-root keeps the floated photo inside this block. */}
          <div className="flow-root max-w-[62ch] text-[17px]">
            <figure className="border-line bg-surface mx-auto mb-5 w-[min(100%,260px)] rounded-[14px] border p-1.5 min-[521px]:float-left min-[521px]:mr-6 min-[521px]:mb-2 min-[521px]:w-[42%] min-[521px]:max-w-[230px]">
              <img
                src={defaultSrc(ABOUT_IMAGE)}
                srcSet={srcSet(ABOUT_IMAGE)}
                sizes="(min-width: 521px) 230px, 260px"
                width={ABOUT_IMAGE.width}
                height={ABOUT_IMAGE.height}
                alt={t('about.photoAlt')}
                loading="lazy"
                decoding="async"
                className="h-auto w-full rounded-[9px]"
              />
              <figcaption className="text-muted px-1 pt-1.5 pb-0.5 font-mono text-[11px]">
                sunset.jpg · Palompon
              </figcaption>
            </figure>

            <p>{t('about.bio1')}</p>
            {/* The Taglish lines are the same in both languages (lang="tl" helps screen readers). */}
            <p className="mt-3.5">
              {t('about.bio2a')} <em lang="tl">wala nang papel-papel.</em> {t('about.bio2b')}{' '}
              <span lang="tl" className="subtitle-text">
                Anong gentle gentle?
              </span>{' '}
              <span lang="tl">Ilalabas ko na ang aking app.</span> {t('about.bio2c')}
            </p>
            <p className="mt-3.5">{t('about.bio3')}</p>
          </div>

          <figure className="border-sel bg-surface-2 mt-6.5 rounded-[14px] border border-dashed px-5 py-4.5">
            <figcaption className="text-t1 font-mono text-[11.5px] font-semibold tracking-[0.07em] uppercase">
              {t('about.whyLabel')}
            </figcaption>
            <blockquote className="font-display mt-1.5 text-[17px] leading-normal font-medium">
              "{t('about.whyQuote')}"
            </blockquote>
          </figure>

          <div className="mt-7.5 grid grid-cols-[minmax(0,1fr)] gap-3 min-[561px]:grid-cols-2">
            {ROLES.map((role) => (
              <div
                key={role.titleKey}
                className="border-line bg-surface hover:border-sel rounded-[14px] border p-4 transition duration-200 hover:-translate-y-1"
              >
                <div className="bg-surface-2 text-t1 mb-3 grid size-[38px] place-items-center rounded-[10px] [&_svg]:size-5">
                  {role.icon}
                </div>
                <h3 className="mb-1 text-base font-semibold">{t(role.titleKey)}</h3>
                <p className="text-muted text-sm leading-normal">{t(role.descKey)}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          {/* Timeline styled like `git log --oneline`. The command text stays as-is on purpose. */}
          <div className="border-line bg-surface overflow-hidden rounded-[14px] border">
            <div className="border-line bg-surface-2 text-muted flex flex-wrap justify-between gap-2 border-b px-4 py-2.5 font-mono text-xs">
              <span>git log --oneline will</span>
              <span>branch: main</span>
            </div>
            <ol className="py-1.5">
              {TIMELINE.map((entry) => (
                <li
                  key={entry.hash}
                  className="hover:bg-surface-2 grid grid-cols-[auto_minmax(0,1fr)_auto] items-baseline gap-3 px-4 py-[9px] font-mono text-[13px] leading-normal"
                >
                  <span className="text-t1" aria-hidden="true">
                    {entry.hash}
                  </span>
                  <span>
                    <span
                      className={`font-semibold ${entry.type === 'wip' ? 'text-warn' : 'text-ok'}`}
                    >
                      {entry.type}:
                    </span>{' '}
                    {t(entry.textKey)}
                  </span>
                  <span className="text-muted whitespace-nowrap">{renderRich(entry.when)}</span>
                </li>
              ))}
            </ol>
          </div>

          <dl className="border-line bg-surface mt-4 grid grid-cols-[auto_minmax(0,1fr)] gap-x-4.5 gap-y-2.5 rounded-[14px] border p-4.5 text-[14.5px]">
            {FACTS.map((fact) => (
              <div key={fact.labelKey} className="contents">
                <dt className="text-muted pt-[3px] font-mono text-[11.5px] tracking-[0.06em] uppercase">
                  {t(fact.labelKey)}
                </dt>
                <dd>{t(fact.valueKey)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  )
}
