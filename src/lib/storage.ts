/*
  Safe wrappers around localStorage. Reading or writing can throw (private mode,
  blocked site data), so every call is wrapped and the site keeps working without it.
*/

export const STORAGE_KEYS = {
  theme: 'wb-theme',
  lang: 'wb-lang',
} as const

export function loadItem(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

export function saveItem(key: string, value: string): void {
  try {
    localStorage.setItem(key, value)
  } catch {
    // Nothing to do: the choice just won't be remembered next visit.
  }
}
