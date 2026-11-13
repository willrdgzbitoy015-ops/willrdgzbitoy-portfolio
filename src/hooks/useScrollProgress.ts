import { useEffect, useRef } from 'react'

/**
 * Returns a ref. The element it is attached to gets a CSS variable `--p`
 * (0 at the top of the page, 1 at the bottom) that updates while scrolling.
 * We write the variable straight to the element instead of using React state,
 * so scrolling never re-renders the page.
 */
export function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    let ticking = false

    const update = () => {
      ticking = false
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0
      ref.current?.style.setProperty('--p', progress.toFixed(4))
    }

    // requestAnimationFrame limits the work to once per painted frame.
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return ref
}
