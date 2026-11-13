import { useState } from 'react'
import type { ReactNode } from 'react'
import { FILTERS, PROJECTS } from '../../data/projects'
import type { Project, ProjectCategory, ProjectId } from '../../data/projects'
import { useLanguage } from '../../i18n/LanguageContext'
import { renderRich } from '../../lib/richText'
import { Badge, TechChip } from '../ui/Badge'
import { Button } from '../ui/Button'
import { CameraIcon, ShirtIcon } from '../ui/icons'
import { FineRow, Phone } from '../ui/Phone'
import { Section } from '../ui/Section'

const THUMB_ICONS: Partial<Record<ProjectId, ReactNode>> = {
  underground: <ShirtIcon />,
  rubens: <CameraIcon />,
}

interface ProjectsProps {
  /**
   * Project ids to highlight because a skill is selected in the Skills section.
   * null = no skill selected, show every card normally.
   */
  highlighted: ProjectId[] | null
  onOpenProject: (id: ProjectId) => void
}

export function Projects({ highlighted, onOpenProject }: ProjectsProps) {
  const { t } = useLanguage()
  const [filter, setFilter] = useState<'all' | ProjectCategory>('all')

  const visible = PROJECTS.filter((p) => filter === 'all' || p.categories.includes(filter))

  /** Outline the cards that use the selected skill and fade the rest. */
  const highlightClass = (id: ProjectId) => {
    if (!highlighted) return ''
    return highlighted.includes(id)
      ? 'outline-2 outline-offset-[5px] outline-sel'
      : 'opacity-[0.38]'
  }

  return (
    <Section id="projects">
      <div role="group" aria-label={t('filter.label')} className="mb-6.5 flex flex-wrap gap-2">
        {FILTERS.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={filter === item.id}
            onClick={() => setFilter(item.id)}
            className="border-line bg-surface text-muted hover:border-sel hover:text-ink aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-bg cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200"
          >
            {t(item.labelKey)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)] gap-5 min-[761px]:grid-cols-2">
        {visible.map((project) =>
          project.featured ? (
            <FeaturedCard
              key={project.id}
              project={project}
              className={highlightClass(project.id)}
              onOpen={() => onOpenProject(project.id)}
            />
          ) : (
            <article
              key={project.id}
              className={`border-line bg-surface hover:border-sel hover:shadow-card relative flex flex-col gap-3 rounded-[18px] border p-5 transition duration-200 hover:-translate-y-[5px] ${highlightClass(project.id)}`}
            >
              <div
                className="text-t1 grid h-32 place-items-center rounded-xl [&_svg]:size-[54px] [&_svg]:stroke-[1.5]"
                style={{ background: 'color-mix(in srgb, var(--g1) 16%, var(--surface))' }}
              >
                {THUMB_ICONS[project.id]}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {project.badges.map((badge) => (
                  <Badge key={badge.key} tone={badge.tone}>
                    {t(badge.key)}
                  </Badge>
                ))}
              </div>
              <h3 className="text-[21px] font-semibold tracking-[-0.01em]">{project.title}</h3>
              <p className="text-muted text-[14.5px]">{t(project.descKey)}</p>
              {project.noteKey && (
                <p className="text-muted text-[11.5px]">{renderRich(t(project.noteKey))}</p>
              )}
              <div className="mt-auto flex flex-wrap gap-1.5">
                {project.tech.map((tech) => (
                  <TechChip key={tech}>{tech}</TechChip>
                ))}
              </div>
              <div>
                <Button variant="ghost" size="sm" onClick={() => onOpenProject(project.id)}>
                  {t('projects.details')}
                  {/* Screen readers hear "Details, Underground Apparel POS" instead of four identical "Details". */}
                  <span className="sr-only">, {project.title}</span>
                </Button>
              </div>
            </article>
          ),
        )}
      </div>
    </Section>
  )
}

/** SmartFine: the large dark card with a phone mockup. */
function FeaturedCard({
  project,
  className,
  onOpen,
}: {
  project: Project
  className: string
  onOpen: () => void
}) {
  const { t } = useLanguage()
  const highlights = [t('sf.fx1'), t('sf.fx2'), t('sf.fx3'), t('sf.fx4'), t('sf.fx5')]

  return (
    <article
      className={`feature-glow border-feat-line bg-feat-bg text-feat-ink relative col-span-full grid grid-cols-[minmax(0,1fr)] items-center gap-9 overflow-hidden rounded-[26px] border p-[clamp(22px,4vw,46px)] transition-opacity duration-250 min-[821px]:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] ${className}`}
    >
      <div className="relative z-1">
        <div className="flex flex-wrap gap-1.5">
          {project.badges.map((badge) => (
            <Badge key={badge.key} tone={badge.tone} onFeature>
              {t(badge.key)}
            </Badge>
          ))}
        </div>
        <h3 className="mt-3.5 text-[clamp(2.2rem,4.6vw,3.4rem)] font-bold tracking-[-0.03em]">
          {project.title}
        </h3>
        {/* Decorative gradient on one short line; the fixed colors pass contrast on the dark card. */}
        <p
          className="font-display mt-2 bg-clip-text text-[clamp(1.15rem,2vw,1.4rem)] leading-[1.3] font-semibold text-transparent"
          style={{ backgroundImage: 'linear-gradient(90deg, #C4B5FD, #F0ABFC 55%, #8EE3CF)' }}
        >
          {t('sf.hook')}
        </p>
        <p className="text-feat-muted mt-4 max-w-[56ch]">{t(project.descKey)}</p>
        <ul className="text-feat-muted mt-4.5 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[12.5px]">
          {highlights.map((text) => (
            <li key={text} className="flex items-center gap-2">
              <span className="bg-g3 size-1.5 rotate-45" aria-hidden="true" />
              {text}
            </li>
          ))}
        </ul>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.tech.map((tech) => (
            <TechChip key={tech} onFeature>
              {tech}
            </TechChip>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          <Button onClick={onOpen}>{t('projects.caseStudy')}</Button>
        </div>
        <p className="text-feat-muted mt-4 font-mono text-xs [&_.placeholder]:text-[#C4B5FD]">
          {renderRich(t('sf.built'))}
        </p>
      </div>

      {/* A static picture of the student's screen. Hidden from screen readers: the text beside it says it all. */}
      <div className="relative z-1" aria-hidden="true">
        <Phone appName="SmartFine" role={t('phone.student')}>
          <div className="bg-surface-2 flex flex-col rounded-[14px] px-3.5 py-3">
            <span className="text-muted text-[11.5px]">{t('phone.unpaidBalance')}</span>
            <b className="grad-text self-start font-mono text-[26px] font-bold">₱50</b>
          </div>
          <p className="font-display text-[15px] font-semibold">{t('phone.myFines')}</p>
          <div className="flex flex-col gap-2">
            <FineRow
              name={t('fine.noId')}
              amount="₱50"
              time={t('phone.today')}
              status="unpaid"
              statusLabel={t('pill.unpaid')}
              action={
                <span className="bg-btn text-btn-ink col-span-full mt-2 block rounded-[9px] p-2 text-center text-[12.5px] font-semibold">
                  {t('phone.pay')}
                </span>
              }
            />
            <FineRow
              name={t('fine.late')}
              amount="₱20"
              time={t('phone.mon')}
              status="paid"
              statusLabel={t('pill.paid')}
            />
          </div>
        </Phone>
      </div>
    </article>
  )
}
