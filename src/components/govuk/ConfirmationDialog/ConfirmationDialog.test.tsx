import React, { useState } from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ConfirmationDialog } from './ConfirmationDialog'

let showModalMock: jest.Mock
let closeMock: jest.Mock

// JSDOM does not implement the native modal-dialog API. These mocks retain the
// observable `open` state so controlled open/close effects can be tested.
beforeEach(() => {
  showModalMock = jest.fn(function showModal(this: HTMLDialogElement) {
    this.open = true
  })
  closeMock = jest.fn(function close(this: HTMLDialogElement) {
    this.open = false
  })

  Object.defineProperty(HTMLDialogElement.prototype, 'showModal', {
    configurable: true,
    value: showModalMock,
  })
  Object.defineProperty(HTMLDialogElement.prototype, 'close', {
    configurable: true,
    value: closeMock,
  })
})

describe('ConfirmationDialog', () => {
  describe('rendering and basic structure', () => {
    it('renders a dialog element when open', () => {
      render(
        <ConfirmationDialog
          isOpen={true}
          title="Confirm action"
          onConfirm={jest.fn()}
          onCancel={jest.fn()}
        />,
      )

      const dialog = screen.getByRole('dialog')
      expect(dialog).toBeInTheDocument()
    })

    it('renders the title as a heading', () => {
      render(
        <ConfirmationDialog
          isOpen={true}
          title="Delete item?"
          onConfirm={jest.fn()}
          onCancel={jest.fn()}
        />,
      )

      const heading = screen.getByRole('heading', { name: 'Delete item?' })
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveClass('govuk-heading-l')
    })

    it('renders close button with aria-label', () => {
      render(
        <ConfirmationDialog
          isOpen={true}
          title="Confirm"
          onConfirm={jest.fn()}
          onCancel={jest.fn()}
        />,
      )

      const closeButton = screen.getByRole('button', { name: 'Close dialog' })
      expect(closeButton).toBeInTheDocument()
      expect(closeButton).toHaveClass('moj-modal__close')
    })

    it('renders optional children content', () => {
      render(
        <ConfirmationDialog
          isOpen={true}
          title="Confirm"
          onConfirm={jest.fn()}
          onCancel={jest.fn()}
        >
          <p>This action cannot be undone.</p>
        </ConfirmationDialog>,
      )

      expect(screen.getByText('This action cannot be undone.')).toBeInTheDocument()
    })

    it('does not render body wrapper when children is absent', () => {
      render(
        <ConfirmationDialog
          isOpen={true}
          title="Confirm"
          onConfirm={jest.fn()}
          onCancel={jest.fn()}
        />,
      )

      const body = document.querySelector('.govuk-confirmation-dialog__body')
      expect(body).not.toBeInTheDocument()
    })
  })

  describe('button labels and variants', () => {
    it('uses default labels when not provided', () => {
      render(
        <ConfirmationDialog
          isOpen={true}
          title="Confirm"
          onConfirm={jest.fn()}
          onCancel={jest.fn()}
        />,
      )

      expect(screen.getByRole('button', { name: 'Confirm' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
    })

    it('renders custom confirm and cancel labels', () => {
      render(
        <ConfirmationDialog
          isOpen={true}
          title="Confirm"
          confirmLabel="Delete permanently"
          cancelLabel="Keep it"
          onConfirm={jest.fn()}
          onCancel={jest.fn()}
        />,
      )

      expect(screen.getByRole('button', { name: 'Delete permanently' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Keep it' })).toBeInTheDocument()
    })

    it('applies primary variant to confirm button by default', () => {
      render(
        <ConfirmationDialog
          isOpen={true}
          title="Confirm"
          onConfirm={jest.fn()}
          onCancel={jest.fn()}
        />,
      )

      const confirmButton = screen.getByRole('button', { name: 'Confirm' })
      expect(confirmButton).toHaveClass('govuk-button')
      expect(confirmButton).not.toHaveClass('govuk-button--warning')
    })

    it('applies warning variant to confirm button when specified', () => {
      render(
        <ConfirmationDialog
          isOpen={true}
          title="Confirm"
          confirmVariant="warning"
          onConfirm={jest.fn()}
          onCancel={jest.fn()}
        />,
      )

      const confirmButton = screen.getByRole('button', { name: 'Confirm' })
      expect(confirmButton).toHaveClass('govuk-button', 'govuk-button--warning')
    })

    it('renders cancel as a native button styled as link', () => {
      render(
        <ConfirmationDialog
          isOpen={true}
          title="Confirm"
          onConfirm={jest.fn()}
          onCancel={jest.fn()}
        />,
      )

      const cancelLink = screen.getByRole('button', { name: 'Cancel' })
      expect(cancelLink).toHaveClass('govuk-confirmation-dialog__cancel')
      expect(cancelLink).toHaveClass('govuk-link')
      expect(cancelLink).toHaveAttribute('type', 'button')
      // Should NOT be a secondary or outlined button
      expect(cancelLink).not.toHaveClass('govuk-button')
    })
  })

  describe('user interactions', () => {
    it('calls onConfirm when confirm button is clicked', () => {
      const handleConfirm = jest.fn()
      render(
        <ConfirmationDialog
          isOpen={true}
          title="Confirm"
          onConfirm={handleConfirm}
          onCancel={jest.fn()}
        />,
      )

      fireEvent.click(screen.getByRole('button', { name: 'Confirm' }))
      expect(handleConfirm).toHaveBeenCalledTimes(1)
    })

    it('calls onCancel when cancel button is clicked', () => {
      const handleCancel = jest.fn()
      render(
        <ConfirmationDialog
          isOpen={true}
          title="Confirm"
          onConfirm={jest.fn()}
          onCancel={handleCancel}
        />,
      )

      fireEvent.click(screen.getByRole('button', { name: 'Cancel' }))
      expect(handleCancel).toHaveBeenCalledTimes(1)
    })

    it('calls onCancel when close button is clicked', () => {
      const handleCancel = jest.fn()
      render(
        <ConfirmationDialog
          isOpen={true}
          title="Confirm"
          onConfirm={jest.fn()}
          onCancel={handleCancel}
        />,
      )

      fireEvent.click(screen.getByRole('button', { name: 'Close dialog' }))
      expect(handleCancel).toHaveBeenCalledTimes(1)
    })

    it('does not call onConfirm when cancel is used', () => {
      const handleConfirm = jest.fn()
      const handleCancel = jest.fn()
      render(
        <ConfirmationDialog
          isOpen={true}
          title="Confirm"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />,
      )

      fireEvent.click(screen.getByRole('button', { name: 'Cancel' }))

      expect(handleCancel).toHaveBeenCalledTimes(1)
      expect(handleConfirm).not.toHaveBeenCalled()
    })
  })

  describe('dialog state management', () => {
    it('opens once and moves focus to the close control when isOpen becomes true', () => {
      const { container, rerender } = render(
        <ConfirmationDialog
          isOpen={false}
          title="Confirm"
          onConfirm={jest.fn()}
          onCancel={jest.fn()}
        />,
      )

      const dialog = container.querySelector('dialog')
      expect(dialog).toBeInstanceOf(HTMLDialogElement)
      rerender(
        <ConfirmationDialog
          isOpen={true}
          title="Confirm"
          onConfirm={jest.fn()}
          onCancel={jest.fn()}
        />,
      )

      expect(showModalMock).toHaveBeenCalledTimes(1)
      expect(dialog?.open).toBe(true)
      expect(screen.getByRole('button', { name: 'Close dialog' })).toHaveFocus()

      rerender(
        <ConfirmationDialog
          isOpen={true}
          title="Confirm"
          onConfirm={jest.fn()}
          onCancel={jest.fn()}
        />,
      )
      expect(showModalMock).toHaveBeenCalledTimes(1)
    })

    it('closes once when isOpen becomes false', () => {
      const { rerender } = render(
        <ConfirmationDialog
          isOpen={true}
          title="Confirm"
          onConfirm={jest.fn()}
          onCancel={jest.fn()}
        />,
      )

      const dialog = screen.getByRole('dialog')
      rerender(
        <ConfirmationDialog
          isOpen={false}
          title="Confirm"
          onConfirm={jest.fn()}
          onCancel={jest.fn()}
        />,
      )

      expect(closeMock).toHaveBeenCalledTimes(1)
      expect(dialog.open).toBe(false)

      rerender(
        <ConfirmationDialog
          isOpen={false}
          title="Confirm"
          onConfirm={jest.fn()}
          onCancel={jest.fn()}
        />,
      )
      expect(closeMock).toHaveBeenCalledTimes(1)
    })
  })

  describe('accessibility', () => {
    it('connects title with aria-labelledby', () => {
      render(
        <ConfirmationDialog
          isOpen={true}
          title="Delete item?"
          onConfirm={jest.fn()}
          onCancel={jest.fn()}
        />,
      )

      const dialog = screen.getByRole('dialog')
      const titleId = dialog.getAttribute('aria-labelledby')
      expect(titleId).toBeTruthy()

      if (titleId) {
        const heading = document.getElementById(titleId)
        expect(heading).toHaveTextContent('Delete item?')
      }
    })

    it('generates unique heading IDs for multiple dialogs', () => {
      render(
        <>
          <ConfirmationDialog
            isOpen={true}
            title="First dialog"
            onConfirm={jest.fn()}
            onCancel={jest.fn()}
          />
          <ConfirmationDialog
            isOpen={true}
            title="Second dialog"
            onConfirm={jest.fn()}
            onCancel={jest.fn()}
          />
        </>,
      )

      const dialogs = screen.getAllByRole('dialog')
      expect(dialogs).toHaveLength(2)

      const id1 = dialogs[0].getAttribute('aria-labelledby')
      const id2 = dialogs[1].getAttribute('aria-labelledby')
      expect(id1).not.toBe(id2)
    })

    it('handles Escape key via native cancel event', () => {
      const handleCancel = jest.fn()
      render(
        <ConfirmationDialog
          isOpen={true}
          title="Confirm"
          onConfirm={jest.fn()}
          onCancel={handleCancel}
        />,
      )

      const dialog = screen.getByRole('dialog')
      const cancelEvent = new Event('cancel', { bubbles: true, cancelable: true })
      dialog.dispatchEvent(cancelEvent)

      expect(cancelEvent.defaultPrevented).toBe(true)
      expect(handleCancel).toHaveBeenCalledTimes(1)
    })
  })

  describe('controlled component pattern', () => {
    it('requires parent to manage isOpen state', () => {
      const TestComponent = () => {
        const [isOpen, setIsOpen] = useState(true)

        return (
          <>
            <button onClick={() => setIsOpen(!isOpen)}>Toggle</button>
            <ConfirmationDialog
              isOpen={isOpen}
              title="Confirm"
              onConfirm={() => setIsOpen(false)}
              onCancel={() => setIsOpen(false)}
            />
          </>
        )
      }

      render(<TestComponent />)

      const dialog = screen.getByRole('dialog')
      expect(dialog).toBeInTheDocument()

      fireEvent.click(screen.getByRole('button', { name: 'Toggle' }))
      // Dialog should still be present but state changes
      expect(dialog).toBeInTheDocument()
    })
  })

  describe('destructive usage example', () => {
    it('supports warning variant for destructive actions', () => {
      const handleRemove = jest.fn()
      render(
        <ConfirmationDialog
          isOpen={true}
          title="Remove item?"
          confirmLabel="Remove"
          confirmVariant="warning"
          onConfirm={handleRemove}
          onCancel={jest.fn()}
        />,
      )

      const removeButton = screen.getByRole('button', { name: 'Remove' })
      expect(removeButton).toHaveClass('govuk-button--warning')

      fireEvent.click(removeButton)
      expect(handleRemove).toHaveBeenCalledTimes(1)
    })
  })

  describe('non-destructive usage example', () => {
    it('supports primary variant for ordinary confirmations', () => {
      const handlePublish = jest.fn()
      render(
        <ConfirmationDialog
          isOpen={true}
          title="Publish this?"
          confirmLabel="Publish"
          confirmVariant="primary"
          onConfirm={handlePublish}
          onCancel={jest.fn()}
        />,
      )

      const publishButton = screen.getByRole('button', { name: 'Publish' })
      expect(publishButton).toHaveClass('govuk-button')
      expect(publishButton).not.toHaveClass('govuk-button--warning')

      fireEvent.click(publishButton)
      expect(handlePublish).toHaveBeenCalledTimes(1)
    })
  })
})
