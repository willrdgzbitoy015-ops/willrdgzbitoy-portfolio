import { useEffect, useRef } from 'react'
import type { MouseEvent, ReactNode } from 'react'
import { useLanguage } from '../../i18n/LanguageContext'
import { CloseIcon } from './icons'

interface ModalProps {
  open: boolean
  onClose: () => void
  /** id of the heading inside, so screen readers announce the modal by its title. */
  labelledBy: string
  children: ReactNode
}

/**
 * Accessible pop-up built on the browser's native <dialog>.
 * dialog.showModal() gives us the hard parts for free:
 *  - Esc closes it
 *  - Tab stays inside (the page behind becomes "inert")
 *  - focus returns to the button that opened it
 * We add: no scrolling of the page behind, and click-outside-to-close.
 */
export function Modal({ open, onClose, labelledBy, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const { t } = useLanguage()

  // Keep the real dialog in step with the `open` prop.
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  // Lock page scrolling while the modal is open.
  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // The dialog element covers only the box; a click that lands on the <dialog>
  // itself (not on something inside it) is a click on the dimmed backdrop.
  const onBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === dialogRef.current) dialogRef.current?.close()
  }

  return (
    // The "close" event fires for Esc, the X button and backdrop clicks alike.
    <dialog
      ref={dialogRef}
      className="modal"
      aria-labelledby={labelledBy}
      onClose={onClose}
      onClick={onBackdropClick}
    >
      {open && (
        <div className="relative p-5 min-[561px]:p-7.5">
          <button
            type="button"
            aria-label={t('modal.close')}
            onClick={() => dialogRef.current?.close()}
            className="border-line bg-surface text-ink hover:border-sel absolute top-4 right-4 inline-grid size-[38px] cursor-pointer place-items-center rounded-full border transition duration-250 hover:rotate-90"
          >
            <CloseIcon className="size-[18px]" />
          </button>
          {children}
        </div>
      )}
    </dialog>
  )
}
