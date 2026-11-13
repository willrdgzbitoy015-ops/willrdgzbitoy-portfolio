import { useState } from 'react'
import { defaultSrc, HERO_IMAGE, srcSet } from '../../data/images'
import { useLocalTime } from '../../hooks/useLocalTime'
import { useLanguage } from '../../i18n/LanguageContext'
import { Button } from '../ui/Button'
import { ArrowRightIcon, ClockIcon } from '../ui/icons'
import { Logo } from '../ui/Logo'
import { ResumeButton } from '../ui/ResumeButton'
import { Handles } from '../ui/SelectionBox'

/*
  Floating tech tiles around the photo. Positions are % of the stage; colors are fixed
  (they are little brand-style stickers, so they look the same in Day and Night).
*/
const TILES = [
  {
    label: 'RN',
    title: 'React Native',
    style: { top: '25%', left: '0%' },
    color: 'bg-[#1E1733] text-[#8EE3CF]',
    delay: '0s',
  },
  {
    label: 'TS',
    title: 'TypeScript',
    style: { top: '47%', left: '1.5%' },
    color: 'bg-[#DBEAFE] text-[#1E40AF]',
    delay: '-3.7s',
  },
  {
    label: 'Expo',
    title: 'Expo',
    style: { bottom: '17%', left: '3%' },
    color: 'bg-[#EDE9FE] text-[#5B21B6]',
    delay: '-3s',
  },
  {
    label: '₱',
    big: true,
    title: 'PayMongo / GCash',
    style: { top: '22%', right: '1.5%' },
    color: 'bg-[#DCFCE7] text-[#166534]',
    delay: '-2.2s',
  },
  {
    label: 'SQL',
    title: 'SQLite',
    style: { top: '45%', right: '0%' },
    color: 'bg-[#FCE7F3] text-[#9D174D]',
    delay: '-1.5s',
  },
  {
    label: 'JS',
    title: 'JavaScript',
    style: { bottom: '4%', right: '3%' },
    color: 'bg-[#0F172A] text-[#FDE047]',
    delay: '-4.5s',
  },
] as const

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function Hero() {
  const { t } = useLanguage()
  const time = useLocalTime()
  // The drag-in animation plays once on load, unless the visitor asked for reduced motion.
  const [play] = useState(() => !prefersReducedMotion())

  return (
    <section id="home" className="pt-11 pb-18 min-[921px]:pt-16 min-[921px]:pb-22">
      <div className="wrap grid grid-cols-[minmax(0,1fr)] items-center gap-18 min-[921px]:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] min-[921px]:gap-14">
        <div>
          <p className="text-t1 font-mono text-[15px] font-medium">{t('hero.hi')}</p>
          <h1 className="mt-3.5 text-[clamp(2.6rem,5.8vw,4.5rem)] leading-[1.02] font-bold tracking-[-0.03em]">
            {t('hero.h1a')} <span className="grad-text">{t('hero.h1b')}</span>
          </h1>
          <p className="text-muted mt-5.5 max-w-[50ch] text-lg">{t('hero.sub')}</p>

          {/* Stacked on small phones: side by side they only just fit, and would jump to two rows when the font loads. */}
          <div className="mt-7.5 flex flex-wrap gap-3 max-[480px]:flex-col max-[480px]:items-start">
            <Button href="#demo">
              <span>{t('cta.try')}</span>
              <ArrowRightIcon />
            </Button>
            <ResumeButton variant="ghost" />
          </div>

          <div className="mt-7.5 flex flex-wrap gap-2.5">
            <span className="border-line bg-surface text-muted inline-flex max-w-full flex-wrap items-center gap-x-2 gap-y-1.5 rounded-[18px] border px-3.5 py-[7px] text-[13px]">
              <span className="live-dot" aria-hidden="true" />
              <span>{t('hero.statusLabel')}</span>
              <b className="text-ink font-semibold">{t('hero.statusText')}</b>
            </span>
            <span className="border-line bg-surface text-muted inline-flex max-w-full flex-wrap items-center gap-x-2 gap-y-1.5 rounded-full border px-3.5 py-[7px] text-[13px]">
              <ClockIcon className="size-[15px]" />
              <b className="text-ink font-semibold tabular-nums">{time}</b>
              <span>{t('hero.timeIn')}</span>
            </span>
          </div>
        </div>

        {/* THE STAGE. Everything here is decoration except the photo, which has the alt text. */}
        <div className={`stage ${play ? 'play' : ''}`}>
          <span className="artboard" aria-hidden="true">
            <span className="text-muted absolute -top-[22px] -left-px font-mono text-[11px]">
              Frame 00 · {t('frame.home')}
            </span>
            <Handles />
          </span>

          <Logo className="absolute top-[4%] right-[4%] w-[13%] opacity-95" />

          {TILES.map((tile) => (
            <span
              key={tile.label}
              title={tile.title}
              aria-hidden="true"
              className={`tile ${tile.color} ${'big' in tile ? 'tile-big' : ''}`}
              style={{ ...tile.style, animationDelay: tile.delay }}
            >
              {tile.label}
            </span>
          ))}

          {/* Stacking order, back to front: gradient arch, selection box, photo, pointer.
              The photo is above the box, so the raised hand covers the box's top edge. */}
          <div className="drag">
            <div className="arch" aria-hidden="true" />
            <div className="selbox" aria-hidden="true">
              <Handles count={8} />
            </div>
            <div className="photo-clip">
              {/* Not lazy-loaded: this is the first thing people see (it is preloaded in index.html). */}
              <img
                src={defaultSrc(HERO_IMAGE)}
                srcSet={srcSet(HERO_IMAGE)}
                sizes="(min-width: 500px) 365px, 78vw"
                width={HERO_IMAGE.width}
                height={HERO_IMAGE.height}
                alt={t('hero.photoAlt')}
                fetchPriority="high"
                decoding="async"
              />
            </div>
            <span className="readout" aria-hidden="true">
              X 88 · Y 72 · W 294 · H 340
            </span>
            <svg className="pointer" viewBox="0 0 36 36" aria-hidden="true">
              <path
                d="M5 3 L5 24 L10.5 19 L14.2 27.4 L17.6 25.9 L14 17.8 L21.4 17.5 Z"
                style={{ fill: 'var(--ink)', stroke: 'var(--surface)' }}
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
              <path
                d="M27 20v12M21 26h12M27 20l-2 2M27 20l2 2M27 32l-2-2M27 32l2-2M21 26l2-2M21 26l2 2M33 26l-2-2M33 26l-2 2"
                style={{ stroke: 'var(--ink)' }}
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
