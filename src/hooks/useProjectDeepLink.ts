import { useCallback, useEffect, useState } from 'react'
import { isProjectId } from '../data/projects'
import type { ProjectId } from '../data/projects'

const PREFIX = '#project-'

/** "#project-smartfine" -> "smartfine". Anything else -> null. */
function projectFromHash(): ProjectId | null {
  const hash = window.location.hash
  if (!hash.startsWith(PREFIX)) return null
  const id = hash.slice(PREFIX.length)
  return isProjectId(id) ? id : null
}

/**
 * Keeps the open project modal and the address bar in sync, so a project can be
 * shared as a link (yoursite.com/#project-smartfine opens that project's details).
 *
 * The address bar is the single source of truth: open/close only change the hash,
 * and the state follows the hash. That way the Back button closes the modal too.
 */
export function useProjectDeepLink() {
  const [projectId, setProjectId] = useState<ProjectId | null>(projectFromHash)

  useEffect(() => {
    const onHashChange = () => setProjectId(projectFromHash())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const openProject = useCallback((id: ProjectId) => {
    window.location.hash = `${PREFIX}${id}`
  }, [])

  const closeProject = useCallback(() => {
    if (!window.location.hash.startsWith(PREFIX)) return
    // replaceState doesn't jump the page (setting the hash to "#projects" would scroll).
    // It also fires no hashchange event, so we update the state ourselves.
    window.history.replaceState(null, '', '#projects')
    setProjectId(null)
  }, [])

  return { projectId, openProject, closeProject }
}
