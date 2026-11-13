import type { ReactNode } from 'react'

/*
  Tiny formatter for dictionary strings. It understands two markers:
    **bold words**   -> <strong>
    [placeholder]    -> highlighted mono text (something Will still has to fill in)
  Everything else is plain text. React escapes it, so there is no HTML injection risk.
*/
const MARKERS = /(\*\*[^*]+\*\*|\[[^\]]+\])/g

export function renderRich(text: string): ReactNode[] {
  return text.split(MARKERS).map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={index} className="font-semibold">
          {part.slice(2, -2)}
        </strong>
      )
    }
    if (part.startsWith('[') && part.endsWith(']')) {
      return (
        <span key={index} className="placeholder">
          {part}
        </span>
      )
    }
    return part
  })
}
