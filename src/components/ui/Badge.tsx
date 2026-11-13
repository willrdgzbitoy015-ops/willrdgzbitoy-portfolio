import type { ReactNode } from 'react'

type Tone = 'neutral' | 'ok' | 'warn'

const TONES: Record<Tone, string> = {
  neutral: 'bg-surface-2 text-muted',
  ok: 'bg-ok-bg text-ok',
  warn: 'bg-warn-bg text-warn',
}

// On the dark featured card the normal tints would vanish, so it has its own set.
const TONES_ON_FEATURE: Record<Tone, string> = {
  neutral: 'bg-white/10 text-feat-ink',
  ok: 'bg-[rgb(94_224_181/0.16)] text-[#86EBCB]',
  warn: 'bg-white/10 text-feat-ink',
}

interface BadgeProps {
  tone?: Tone
  /** True when the badge sits on the dark featured project card. */
  onFeature?: boolean
  children: ReactNode
}

/** Small mono label: "Solo project", "Working prototype"... */
export function Badge({ tone = 'neutral', onFeature = false, children }: BadgeProps) {
  const colors = onFeature ? TONES_ON_FEATURE[tone] : TONES[tone]
  return (
    <span className={`rounded-md px-2 py-[3px] font-mono text-[11.5px] font-medium ${colors}`}>
      {children}
    </span>
  )
}

/** Dashed chip for a technology name. */
export function TechChip({ onFeature = false, children }: Omit<BadgeProps, 'tone'>) {
  return (
    <span
      className={`rounded-md border border-dashed px-2 py-0.5 font-mono text-xs ${
        onFeature ? 'border-feat-line text-feat-ink' : 'border-line'
      }`}
    >
      {children}
    </span>
  )
}
