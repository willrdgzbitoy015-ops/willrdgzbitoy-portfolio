import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from 'react'
import type { ReactNode } from 'react'
import { loadItem, saveItem, STORAGE_KEYS } from '../lib/storage'

export type Theme = 'light' | 'dark'

interface ThemeContextValue {
  /** The theme on screen right now: 'light' = Day, 'dark' = Night. */
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

const DARK_QUERY = '(prefers-color-scheme: dark)'
// Browser toolbar color on phones, matched to the --bg token of each theme.
const THEME_COLOR: Record<Theme, string> = { light: '#F7F5FB', dark: '#140F22' }

/** Subscribe to the device's light/dark setting so we follow it live. */
function subscribeToDevice(onChange: () => void) {
  const mq = window.matchMedia(DARK_QUERY)
  mq.addEventListener('change', onChange)
  return () => mq.removeEventListener('change', onChange)
}
const deviceIsDark = () => window.matchMedia(DARK_QUERY).matches

function loadSavedTheme(): Theme | null {
  const saved = loadItem(STORAGE_KEYS.theme)
  return saved === 'light' || saved === 'dark' ? saved : null
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  // `choice` is what the visitor picked by hand. null = no pick yet, follow the device.
  const [choice, setChoice] = useState<Theme | null>(loadSavedTheme)
  const systemDark = useSyncExternalStore(subscribeToDevice, deviceIsDark)
  const theme: Theme = choice ?? (systemDark ? 'dark' : 'light')

  // The CSS reads this attribute to swap the color variables (see index.css).
  // The inline script in index.html already set it before first paint, so there is no flash.
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[theme])
  }, [theme])

  const toggleTheme = useCallback(() => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    setChoice(next)
    saveItem(STORAGE_KEYS.theme, next)
  }, [theme])

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme])

  return <ThemeContext value={value}>{children}</ThemeContext>
}

// eslint-disable-next-line react-refresh/only-export-components -- the hook belongs next to its provider
export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>')
  return ctx
}
