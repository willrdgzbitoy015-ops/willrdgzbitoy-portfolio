import type { ReactNode } from 'react'
import { PROJECTS } from '../../data/projects'
import { ALL_SKILLS, CERTIFICATIONS, SKILL_GROUPS } from '../../data/skills'
import type { Skill, SkillLevel } from '../../data/skills'
import { useLanguage } from '../../i18n/LanguageContext'
import type { TranslationKey } from '../../i18n/en'
import { Section } from '../ui/Section'

const LEVEL_KEYS: Record<SkillLevel, TranslationKey> = {
  3: 'level.3',
  2: 'level.2',
  1: 'level.1',
}

/** Three little bars; `level` of them are lit. Decorative: the label is given in text. */
function LevelMeter({ level }: { level: SkillLevel }) {
  return (
    <i className="level" data-level={level} aria-hidden="true">
      <b />
      <b />
      <b />
    </i>
  )
}

interface SkillsProps {
  /** id of the highlighted skill, or null. The state lives in App so Projects can react too. */
  selectedSkillId: string | null
  onSelectSkill: (id: string | null) => void
}

export function Skills({ selectedSkillId, onSelectSkill }: SkillsProps) {
  const { t } = useLanguage()

  const skillName = (skill: Skill) => (skill.nameKey ? t(skill.nameKey) : skill.name)
  const selected = ALL_SKILLS.find((skill) => skill.id === selectedSkillId) ?? null

  /** Puts the bold skill name where the dictionary sentence says {skill}. */
  const withSkillName = (key: TranslationKey, name: string): ReactNode => {
    const [before, after] = t(key).split('{skill}')
    return (
      <span>
        {before}
        <b className="text-ink">{name}</b>
        {after}
      </span>
    )
  }

  return (
    <Section id="skills" lead={t('skills.lead')}>
      <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-6 min-[921px]:grid-cols-[minmax(0,1fr)_330px]">
        <div className="border-line bg-surface overflow-hidden rounded-[14px] border">
          <div className="border-line bg-surface-2 text-muted flex flex-wrap justify-between gap-2 border-b px-4 py-2.5 font-mono text-xs">
            <span>{t('skills.panel')}</span>
            <span className="flex flex-wrap gap-x-3 gap-y-1">
              {([3, 2, 1] as const).map((level) => (
                <span key={level} className="inline-flex items-center gap-1.5">
                  <LevelMeter level={level} />
                  {t(LEVEL_KEYS[level])}
                </span>
              ))}
            </span>
          </div>

          {SKILL_GROUPS.map((group) => (
            <div key={group.titleKey} className="border-line border-b border-dashed p-4.5">
              <h3 className="text-muted mb-3 flex items-center gap-2.5 font-mono text-xs font-semibold tracking-[0.07em] uppercase">
                <span className="border-t1 size-2 rotate-45 border-[1.5px]" aria-hidden="true" />
                {t(group.titleKey)}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => {
                  const isOn = skill.id === selectedSkillId
                  const levelLabel = skill.level ? t(LEVEL_KEYS[skill.level]) : undefined
                  return (
                    // A toggle button: aria-pressed tells screen readers if it is on.
                    <button
                      key={skill.id}
                      type="button"
                      aria-pressed={isOn}
                      title={levelLabel}
                      onClick={() => onSelectSkill(isOn ? null : skill.id)}
                      className="border-line bg-bg hover:border-sel aria-pressed:border-sel aria-pressed:bg-surface-2 aria-pressed:outline-sel inline-flex cursor-pointer items-center gap-2 rounded-[10px] border px-3 py-2 text-sm font-medium transition duration-150 hover:-translate-y-0.5 aria-pressed:outline-[1.5px] aria-pressed:outline-offset-[3px]"
                    >
                      {skillName(skill)}
                      {skill.level && <LevelMeter level={skill.level} />}
                      {levelLabel && <span className="sr-only">, {levelLabel}</span>}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}

          {/* aria-live: screen readers read the result out when a skill is picked. */}
          <div
            aria-live="polite"
            className="text-muted flex min-h-[54px] flex-wrap items-center gap-2 px-4.5 py-3.5 text-sm"
          >
            {!selected && <span>{t('skills.hint')}</span>}

            {selected && selected.usedIn.length === 0 && (
              <>{withSkillName('skills.notUsed', skillName(selected))}</>
            )}

            {selected && selected.usedIn.length > 0 && (
              <>
                {withSkillName('skills.usedIn', skillName(selected))}
                {selected.usedIn.map((use) =>
                  use === 'portfolio' ? (
                    <span
                      key={use}
                      className="bg-surface-2 text-muted rounded-md px-2 py-[3px] font-mono text-[11.5px] font-medium"
                    >
                      {t('skills.thisPortfolio')}
                    </span>
                  ) : (
                    <a
                      key={use}
                      href="#projects"
                      className="bg-surface-2 text-muted hover:text-ink rounded-md px-2 py-[3px] font-mono text-[11.5px] font-medium no-underline transition-colors"
                    >
                      {PROJECTS.find((project) => project.id === use)?.title}
                    </a>
                  ),
                )}
              </>
            )}

            {selected && (
              <button
                type="button"
                onClick={() => onSelectSkill(null)}
                className="text-t1 cursor-pointer text-[13.5px] font-semibold underline underline-offset-[3px] hover:no-underline"
              >
                {t('skills.clear')}
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3.5">
          {CERTIFICATIONS.map((cert) => (
            <div
              key={cert.titleKey}
              className="border-line bg-surface hover:border-sel flex items-center gap-4 rounded-[14px] border p-4.5 transition duration-200 hover:-translate-y-[3px]"
            >
              <div
                className="grid size-[58px] flex-none place-items-center rounded-full"
                style={{ background: 'var(--grad)' }}
              >
                <span className="bg-surface text-t1 grid size-[46px] place-items-center rounded-full font-mono text-xs font-bold">
                  {cert.seal}
                </span>
              </div>
              <div>
                <h3 className="text-[16.5px] leading-tight font-semibold">{t(cert.titleKey)}</h3>
                <p className="text-muted mt-1 text-[13px]">{t(cert.descKey)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
