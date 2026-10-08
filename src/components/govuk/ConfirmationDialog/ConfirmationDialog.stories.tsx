import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../Button'
import { ConfirmationDialog } from './ConfirmationDialog'

const meta: Meta<typeof ConfirmationDialog> = {
  title: 'GOV.UK/ConfirmationDialog',
  component: ConfirmationDialog,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A controlled native-dialog confirmation component following the GOV.UK and MOJ modal-dialogue patterns.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ConfirmationDialog>

const PrimaryExample = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button type="button" onClick={() => setIsOpen(true)}>
        Open publish confirmation
      </Button>
      <ConfirmationDialog
        isOpen={isOpen}
        title="Are you sure you want to publish this?"
        confirmLabel="Publish"
        onConfirm={() => setIsOpen(false)}
        onCancel={() => setIsOpen(false)}
      />
    </>
  )
}

const WarningExample = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button type="button" onClick={() => setIsOpen(true)}>
        Open remove confirmation
      </Button>
      <ConfirmationDialog
        isOpen={isOpen}
        title="Are you sure you want to remove this item?"
        confirmVariant="warning"
        onConfirm={() => setIsOpen(false)}
        onCancel={() => setIsOpen(false)}
      />
    </>
  )
}

const WithBodyContentExample = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button type="button" onClick={() => setIsOpen(true)}>
        Open archive confirmation
      </Button>
      <ConfirmationDialog
        isOpen={isOpen}
        title="Archive all completed tasks?"
        confirmLabel="Archive"
        onConfirm={() => setIsOpen(false)}
        onCancel={() => setIsOpen(false)}
      >
        <p className="govuk-body">
          This will move completed tasks to the archive. You can still access them through the archive view.
        </p>
        <p className="govuk-body">
          <strong>This action cannot be undone.</strong>
        </p>
      </ConfirmationDialog>
    </>
  )
}

/** A non-destructive confirmation, using the default primary action. */
export const Primary: Story = {
  render: () => <PrimaryExample />,
}

/** A destructive confirmation, opting explicitly into the shared warning Button variant. */
export const Warning: Story = {
  render: () => <WarningExample />,
}

/** A confirmation dialog with explanatory content between heading and actions. */
export const WithBodyContent: Story = {
  render: () => <WithBodyContentExample />,
}
