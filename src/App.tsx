import { useMemo, useState } from 'react'
import { About } from './components/sections/About'
import { Footer } from './components/sections/Footer'
import { Hero } from './components/sections/Hero'
import { Navbar } from './components/sections/Navbar'
import { ProjectModal } from './components/sections/ProjectModal'
import { Projects } from './components/sections/Projects'
import { Skills } from './components/sections/Skills'
import { Section } from './components/ui/Section'
import { useToast } from './components/ui/Toast'
import type { ProjectId } from './data/projects'
import { ALL_SKILLS } from './data/skills'
import { useProjectDeepLink } from './hooks/useProjectDeepLink'
import { useLanguage } from './i18n/LanguageContext'

export default function App() {
  const { t } = useLanguage()
  const toast = useToast()

  // The selected skill lives here because two sections need it:
  // Skills shows which one is pressed, Projects highlights the cards that use it.
  const [selectedSkillId, setSelectedSkillId] = useState<string | null>(null)
  const highlightedProjects = useMemo<ProjectId[] | null>(() => {
    const skill = ALL_SKILLS.find((s) => s.id === selectedSkillId)
    if (!skill) return null
    const projectIds = skill.usedIn.filter((use): use is ProjectId => use !== 'portfolio')
    // A skill used in no project card (or only in this portfolio) dims nothing.
    return projectIds.length > 0 ? projectIds : null
  }, [selectedSkillId])

  // Which project's details are open. Synced with the address bar (#project-smartfine).
  const { projectId, openProject, closeProject } = useProjectDeepLink()

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
        <About />
        <Skills selectedSkillId={selectedSkillId} onSelectSkill={setSelectedSkillId} />
        <Projects highlighted={highlightedProjects} onOpenProject={openProject} />

        {/* Milestone 3 replaces these two empty frames with the live demo and the contact form. */}
        {(['demo', 'contact'] as const).map((id) => (
          <Section key={id} id={id}>
            <p className="border-line bg-surface text-muted rounded-[14px] border border-dashed px-5 py-10 text-center font-mono text-[13px]">
              {t('shell.comingSoon')}
            </p>
          </Section>
        ))}
      </main>

      <Footer />

      <ProjectModal projectId={projectId} onClose={closeProject} />
    </>
  )
}
