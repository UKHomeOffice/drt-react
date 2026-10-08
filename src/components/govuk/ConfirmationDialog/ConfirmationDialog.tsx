import React, { useRef, useEffect, useId, type ReactNode } from 'react'
import { Button } from '../Button'
import './ConfirmationDialog.scss'

export type ConfirmationDialogProps = {
  /** Controls whether the native modal dialog is open. */
  isOpen: boolean
  /** Accessible modal heading and visible title. */
  title: ReactNode
  /** Optional explanatory content between the title and action row. */
  children?: ReactNode
  /** Text shown on the confirmation action. Defaults to "Confirm". */
  confirmLabel?: string
  /** Text shown on the dismiss action. Defaults to "Cancel". */
  cancelLabel?: string
  /** Defaults to "primary". Destructive callers must opt in to "warning". */
  confirmVariant?: 'primary' | 'warning'
  /** Called when the confirmation action is activated. */
  onConfirm: () => void
  /** Called for every dismiss route: Cancel, close icon, and Escape. */
  onCancel: () => void
}

/**
 * GOV.UK Design System Confirmation Dialog component.
 *
 * A controlled modal dialog for confirming destructive or significant actions.
 * Uses native HTML <dialog> element for accessibility and focus management.
 *
 * The component is controlled: consumers must set `isOpen` to `false` in their
 * `onCancel` and `onConfirm` handlers.
 *
 * @example
 * ```tsx
 * const [isOpen, setIsOpen] = useState(false)
 * <ConfirmationDialog
 *   isOpen={isOpen}
 *   title="Delete item?"
 *   confirmLabel="Delete"
 *   confirmVariant="warning"
 *   onConfirm={() => {
 *     deleteItem()
 *     setIsOpen(false)
 *   }}
 *   onCancel={() => setIsOpen(false)}
 * />
 * ```
 */
export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  title,
  children,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  confirmVariant = 'primary',
  onConfirm,
  onCancel,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const titleId = useId()

  // Handle dialog open/close state
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isOpen && !dialog.open) {
      dialog.showModal()
      // Move focus to close button as deterministic initial focus
      closeButtonRef.current?.focus()
    } else if (!isOpen && dialog.open) {
      dialog.close()
    }
  }, [isOpen])

  const handleCancel = () => {
    onCancel()
  }

  // Handle native dialog cancel (Escape key) through the same dismissal path.
  const handleNativeCancel = (event: React.SyntheticEvent<HTMLDialogElement>) => {
    event.preventDefault()
    handleCancel()
  }

  const handleConfirm = () => {
    onConfirm()
  }

  return (
    <dialog
      ref={dialogRef}
      className="govuk-confirmation-dialog moj-modal"
      aria-labelledby={titleId}
      onCancel={handleNativeCancel}
    >
      <div className="moj-modal__dialog">
        <button
          ref={closeButtonRef}
          type="button"
          className="moj-modal__close"
          aria-label="Close dialog"
          onClick={handleCancel}
        >
          ×
        </button>

        <div className="moj-modal__content">
          <h2 id={titleId} className="govuk-heading-l govuk-confirmation-dialog__heading">
            {title}
          </h2>

          {children != null && (
            <div className="govuk-confirmation-dialog__body">{children}</div>
          )}

          <div className="govuk-confirmation-dialog__actions">
            <Button
              className="govuk-confirmation-dialog__confirm"
              variant={confirmVariant}
              type="button"
              onClick={handleConfirm}
            >
              {confirmLabel}
            </Button>
            <button
              type="button"
              className="govuk-link govuk-confirmation-dialog__cancel"
              onClick={handleCancel}
            >
              {cancelLabel}
            </button>
          </div>
        </div>
      </div>
    </dialog>
  )
}
