import { useInView } from '../../hooks/useInView'
import { Handles } from './SelectionBox'

interface FrameTitleProps {
  /** The layer-name tag above the box, e.g. "Frame 01 · About". */
  tag: string
  /** The heading text. */
  title: string
  /** id for the <h2>, so the <section> can point at it with aria-labelledby. */
  id?: string
}

/**
 * A section heading inside a selection box with 4 corner handles.
 * The box "draws itself" the first time it scrolls into view. The heading
 * text itself is never hidden, so nothing waits on the animation.
 */
export function FrameTitle({ tag, title, id }: FrameTitleProps) {
  const { ref, inView } = useInView<HTMLDivElement>(0.6)
  // null = not measured yet (show the box), false = wait off-screen, true = draw.
  const state = inView === null ? '' : inView ? 'in' : 'armed'

  return (
    <div
      ref={ref}
      className={`frame-title relative mt-5 -ml-3.5 self-start px-3.5 py-1.5 ${state}`}
    >
      <span
        className="bg-sel text-sel-ink absolute -top-[21px] -left-px px-[7px] py-px font-mono text-[11px] font-medium whitespace-nowrap"
        aria-hidden="true"
      >
        {tag}
      </span>
      <h2 id={id} className="text-[clamp(2.1rem,4.2vw,3rem)] font-bold tracking-[-0.025em]">
        {title}
      </h2>
      <span className="frame-box" aria-hidden="true">
        <Handles />
      </span>
    </div>
  )
}
