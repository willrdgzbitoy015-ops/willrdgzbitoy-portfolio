import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'ghost'
type Size = 'md' | 'sm'

const BASE =
  'inline-flex cursor-pointer items-center justify-center gap-2 border font-semibold no-underline transition duration-200 [&_svg]:flex-none'

const VARIANTS: Record<Variant, string> = {
  primary:
    'border-transparent bg-btn text-btn-ink hover:-translate-y-0.5 hover:bg-btn-hover hover:shadow-[0_12px_26px_-12px_var(--t1)]',
  ghost: 'border-line bg-surface text-ink hover:-translate-y-0.5 hover:border-sel',
}

const SIZES: Record<Size, string> = {
  md: 'rounded-xl px-5 py-3 text-[15px] [&_svg]:size-[18px]',
  sm: 'rounded-[10px] px-3.5 py-2 text-[13px] [&_svg]:size-[15px]',
}

interface StyleProps {
  variant?: Variant
  size?: Size
}

/** Builds the class string from the variant and size. */
function buttonClasses({ variant = 'primary', size = 'md' }: StyleProps = {}, extra = '') {
  return `${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${extra}`.trim()
}

// With `href` it renders a link (<a>), otherwise a real <button>. Same look either way.
type ButtonProps = StyleProps &
  (
    | ({ href: string } & AnchorHTMLAttributes<HTMLAnchorElement>)
    | ({ href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>)
  )

export function Button({ variant, size, className, ...props }: ButtonProps) {
  const classes = buttonClasses({ variant, size }, className)
  if (props.href !== undefined) {
    return <a className={classes} {...props} />
  }
  return <button type="button" className={classes} {...props} />
}
