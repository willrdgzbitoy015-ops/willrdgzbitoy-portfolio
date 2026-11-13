import { useEffect, useState } from 'react'

// Always Philippine time (Asia/Manila), wherever the visitor is.
const MANILA_TIME = new Intl.DateTimeFormat('en-US', {
  timeZone: 'Asia/Manila',
  hour: 'numeric',
  minute: '2-digit',
})

/** The current time in Palompon as text, e.g. "9:41 PM". Refreshes every 20 seconds. */
export function useLocalTime(): string {
  const [time, setTime] = useState(() => MANILA_TIME.format(new Date()))

  useEffect(() => {
    const timer = window.setInterval(() => setTime(MANILA_TIME.format(new Date())), 20_000)
    return () => window.clearInterval(timer)
  }, [])

  return time
}
