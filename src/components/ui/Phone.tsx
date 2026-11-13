import type { ReactNode } from 'react'

interface PhoneProps {
  /** App name in the top bar. */
  appName: string
  /** Small pill on the right of the top bar: which user this phone belongs to. */
  role: string
  children: ReactNode
}

/** A phone mockup drawn with CSS only: frame, notch, app bar, then the screen content. */
export function Phone({ appName, role, children }: PhoneProps) {
  return (
    <div className="bg-phone-frame mx-auto w-[min(272px,100%)] rounded-[40px] p-[9px] shadow-[0_34px_60px_-32px_rgb(30_15_70/0.65)]">
      <div className="bg-bg text-ink flex min-h-[480px] flex-col overflow-hidden rounded-[32px]">
        <div className="flex h-[26px] justify-center" aria-hidden="true">
          <i className="bg-phone-frame h-5 w-[86px] rounded-b-xl" />
        </div>
        <div className="font-display flex items-center justify-between px-4 pt-1 pb-2.5 text-sm font-bold">
          <span>{appName}</span>
          <span className="bg-surface-2 text-muted rounded-full px-2 py-0.5 font-mono text-[10.5px] font-semibold">
            {role}
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-2.5 px-3.5 pb-4">{children}</div>
      </div>
    </div>
  )
}

interface FineRowProps {
  name: string
  amount: string
  time: string
  status: 'unpaid' | 'paid'
  statusLabel: string
  /** Optional action under the row (the Pay button, or a look-alike on the static mockup). */
  action?: ReactNode
}

/** One fine in the student's list. */
export function FineRow({ name, amount, time, status, statusLabel, action }: FineRowProps) {
  return (
    <div className="border-line bg-surface grid grid-cols-[minmax(0,1fr)_auto] gap-x-2 gap-y-0.5 rounded-xl border px-3 py-2.5 text-[13px]">
      <span className="font-semibold">{name}</span>
      <span className="text-right font-mono text-[13.5px] font-semibold">{amount}</span>
      <span className="text-muted font-mono text-[11px]">{time}</span>
      <span
        className={`self-center justify-self-end rounded-full px-2 py-0.5 font-mono text-[10.5px] font-semibold ${
          status === 'paid' ? 'bg-ok-bg text-ok' : 'bg-bad-bg text-bad'
        }`}
      >
        {statusLabel}
      </span>
      {action}
    </div>
  )
}
