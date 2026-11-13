import { useEffect, useRef, useState } from 'react'

/**
 * Tells you when an element scrolls into view, using IntersectionObserver
 * (the browser does the watching, so there is no scroll listener).
 *
 * `inView` is null until the browser's first report, then false (off-screen)
 * or true (seen). Once it turns true it stays true: animations play one time.
 */
export function useInView<T extends Element>(threshold = 0.6) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState<boolean | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        } else {
          setInView(false)
        }
      },
      { threshold },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, inView }
}
