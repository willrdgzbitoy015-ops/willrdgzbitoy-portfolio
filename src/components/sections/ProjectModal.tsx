import { PROJECTS } from '../../data/projects'
import type { DetailSection, Project, ProjectId } from '../../data/projects'
import { useLanguage } from '../../i18n/LanguageContext'
import { renderRich } from '../../lib/richText'
import { Badge, TechChip } from '../ui/Badge'
import { Modal } from '../ui/Modal'

interface ProjectModalProps {
  /** Which project to show, or null when the modal is closed. */
  projectId: ProjectId | null
  onClose: () => void
}

/** The project details pop-up. What it shows comes from `details` in data/projects.ts. */
export function ProjectModal({ projectId, onClose }: ProjectModalProps) {
  const { t } = useLanguage()
  const project = PROJECTS.find((p) => p.id === projectId) ?? null

  return (
    <Modal open={project !== null} onClose={onClose} labelledBy="project-modal-title">
      {project && (
        <>
          <div className="flex flex-wrap gap-1.5 pr-12">
            {(project.modalBadges ?? project.badges).map((badge) => (
              <Badge key={badge.key} tone={badge.tone}>
                {t(badge.key)}
              </Badge>
            ))}
          </div>
          <h3
            id="project-modal-title"
            className="mt-3 pr-11 text-[clamp(1.6rem,5vw,1.875rem)] font-bold tracking-[-0.02em]"
          >
            {project.title}
          </h3>
          <div className="mt-5.5 grid gap-5.5">
            {project.details.map((section) => (
              <div key={section.headingKey}>
                <h4 className="text-muted mb-2 font-mono text-xs font-semibold tracking-[0.07em] uppercase">
                  {t(section.headingKey)}
                </h4>
                <DetailBody section={section} project={project} />
              </div>
            ))}
          </div>
        </>
      )}
    </Modal>
  )
}

/** Renders one block of the modal depending on its `kind`. */
function DetailBody({ section, project }: { section: DetailSection; project: Project }) {
  const { t } = useLanguage()

  switch (section.kind) {
    case 'text':
      return <p className="text-[15px]">{renderRich(t(section.bodyKey))}</p>

    case 'list': {
      const ListTag = section.ordered ? 'ol' : 'ul'
      return (
        <ListTag
          className={`grid gap-1.5 pl-5 text-[15px] ${section.ordered ? 'list-decimal' : 'list-disc'}`}
        >
          {section.itemKeys.map((key) => (
            <li key={key}>{renderRich(t(key))}</li>
          ))}
        </ListTag>
      )
    }

    case 'table':
      return (
        <table className="w-full border-collapse text-sm">
          <tbody>
            {section.rows.map((row) => (
              <tr key={row.descKey} className="border-line border-t align-top">
                <th
                  scope="row"
                  className="text-t1 py-[9px] pr-2.5 text-left font-mono text-[13px] font-semibold min-[481px]:whitespace-nowrap"
                >
                  {typeof row.term === 'string' ? row.term : t(row.term.key)}
                </th>
                <td className="py-[9px] pl-2.5">{t(row.descKey)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )

    case 'tech':
      return (
        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((tech) => (
            <TechChip key={tech}>{tech}</TechChip>
          ))}
        </div>
      )
  }
}
