/**
 * The square handles of a design-tool selection box.
 * 4 = corners only (section titles), 8 = corners + edge midpoints (hero photo).
 * Positions and the look live in styles/effects.css (.handle-*).
 */
const CORNERS = ['tl', 'tr', 'bl', 'br'] as const
const MIDPOINTS = ['tm', 'bm', 'ml', 'mr'] as const

export function Handles({ count = 4 }: { count?: 4 | 8 }) {
  const positions = count === 8 ? [...CORNERS, ...MIDPOINTS] : CORNERS
  return (
    <>
      {positions.map((pos) => (
        <i key={pos} className={`handle handle-${pos}`} aria-hidden="true" />
      ))}
    </>
  )
}
