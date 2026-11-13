import type { ReactNode } from 'react'
import { SECTIONS } from '../../data/links'
import { useLanguage } from '../../i18n/LanguageContext'
import { FrameTitle } from './FrameTitle'

type SectionId = (typeof SECTIONS)[number]['id']

interface SectionProps {
  /** Which page section this is. The number, tag and title come from data/links.ts. */
  id: SectionId
  /** Optional intro line under the title. */
  lead?: ReactNode
  children: ReactNode
}

/** The shared wrapper of every "frame": spacing, the selection-box title, then the content. */
export function Section({ id, lead, children }: SectionProps) {
  const { t } = useLanguage()
  const section = SECTIONS.find((s) => s.id === id)!

  return (
    <section id={id} aria-labelledby={`${id}-title`} className="py-17 min-[701px]:py-24">
      <div className="wrap">
        <div className="mb-11 flex flex-col gap-4.5">
          <FrameTitle
            id={`${id}-title`}
            tag={`Frame ${section.number} · ${t(section.frameKey)}`}
            title={t(section.titleKey)}
          />
          {lead && <p className="text-muted max-w-[60ch] text-lg">{lead}</p>}
        </div>
        {children}
      </div>
    </section>
  )
}
