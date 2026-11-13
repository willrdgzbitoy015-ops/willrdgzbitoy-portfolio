import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

type ShowToast = (message: string) => void

const ToastContext = createContext<ShowToast | null>(null)

const VISIBLE_MS = 2800

/**
 * One small message bar at the bottom of the screen ("Email copied", ...).
 * Any component can call `const toast = useToast()` then `toast('...')`.
 * role="status" makes screen readers announce it without stealing focus.
 */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState('')
  const [visible, setVisible] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  const showToast = useCallback<ShowToast>((next) => {
    setMessage(next)
    setVisible(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setVisible(false), VISIBLE_MS)
  }, [])

  useEffect(() => () => window.clearTimeout(timer.current), [])

  return (
    <ToastContext value={showToast}>
      {children}
      <div
        role="status"
        aria-live="polite"
        className={`bg-ink text-bg pointer-events-none fixed bottom-5 left-1/2 z-80 max-w-[calc(100%-32px)] -translate-x-1/2 rounded-xl px-4 py-2.5 text-center text-sm transition duration-250 ${
          visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}
      >
        {message}
      </div>
    </ToastContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components -- the hook belongs next to its provider
export function useToast(): ShowToast {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>')
  return ctx
}
