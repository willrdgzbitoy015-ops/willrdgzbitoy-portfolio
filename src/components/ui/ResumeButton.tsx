import { RESUME } from '../../data/links'
import { useLanguage } from '../../i18n/LanguageContext'
import type { TranslationKey } from '../../i18n/en'
import { Button } from './Button'
import { DownloadIcon } from './icons'
import { useToast } from './Toast'

interface ResumeButtonProps {
  labelKey?: TranslationKey
  variant?: 'primary' | 'ghost'
  size?: 'md' | 'sm'
  className?: string
  onClick?: () => void
}

/**
 * Downloads the resume PDF. While the PDF hasn't been added yet
 * (RESUME.available is false) it shows a short message instead.
 */
export function ResumeButton({
  labelKey = 'cta.resume',
  variant = 'primary',
  size = 'md',
  className,
  onClick,
}: ResumeButtonProps) {
  const { t } = useLanguage()
  const toast = useToast()

  const content = (
    <>
      <DownloadIcon />
      <span>{t(labelKey)}</span>
    </>
  )

  if (RESUME.available) {
    return (
      <Button
        href={RESUME.href}
        download={RESUME.fileName}
        variant={variant}
        size={size}
        className={className}
        onClick={onClick}
      >
        {content}
      </Button>
    )
  }

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={() => {
        onClick?.()
        toast(t('toast.resumeSoon'))
      }}
    >
      {content}
    </Button>
  )
}
