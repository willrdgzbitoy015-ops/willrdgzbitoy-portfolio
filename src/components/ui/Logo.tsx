import { useId } from 'react'

/**
 * The logo: a "W" drawn as a bird in flight (kalanggaman = bird, a nod to
 * Kalanggaman Island in Palompon). The stroke uses the g1 -> g2 -> g3 gradient.
 * To swap in Will's own drawing later, replace the <path> here and public/favicon.svg.
 */
export function Logo({ className }: { className?: string }) {
  // Each copy of the logo needs its own gradient id, or two logos on one page would clash.
  const gradientId = useId()

  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: 'var(--g1)' }} />
          <stop offset=".55" style={{ stopColor: 'var(--g2)' }} />
          <stop offset="1" style={{ stopColor: 'var(--g3)' }} />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="38" height="38" rx="11" style={{ fill: 'var(--surface-2)' }} />
      <path
        d="M6 13 C9 22 11.5 28 14 28 C16.6 28 18 21 20 17 C22 21 23.4 28 26 28 C28.5 28 31 22 34 13"
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="20" cy="11.5" r="2.3" style={{ fill: 'var(--t1)' }} />
    </svg>
  )
}
