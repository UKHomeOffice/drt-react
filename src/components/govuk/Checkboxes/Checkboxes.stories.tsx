import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Checkboxes } from './Checkboxes'

const meta: Meta<typeof Checkboxes> = {
  title: 'GOV.UK/Checkboxes',
  component: Checkboxes,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Checkboxes>

const terminalOptions = [
  { value: 'T2', label: 'Terminal 2' },
  { value: 'T3', label: 'Terminal 3' },
  { value: 'T4', label: 'Terminal 4' },
  { value: 'T5', label: 'Terminal 5' },
]

export const Default: Story = {
  args: {
    name: 'terminals',
    label: 'Select terminals',
    hint: 'Select all terminals you want to include.',
    options: terminalOptions,
  },
}

export const Inline: Story = {
  args: {
    name: 'inline-terminals',
    label: 'Terminals',
    inline: true,
    defaultValue: ['T2', 'T3', 'T4', 'T5'],
    options: terminalOptions,
  },
}

export const ErrorState: Story = {
  args: {
    name: 'terminals-error',
    label: 'Select terminals',
    hint: 'Select all terminals you want to include.',
    error: 'Select at least one terminal',
    options: terminalOptions,
  },
}

export const WithOptionHints: Story = {
  args: {
    name: 'notification-types',
    label: 'Which notifications do you want?',
    options: [
      {
        value: 'email',
        label: 'Email',
        hint: 'Get notifications by email.',
      },
      {
        value: 'text',
        label: 'Text message',
        hint: 'Get notifications on your mobile phone.',
      },
    ],
  },
}

export const ConditionalReveal: Story = {
  args: {
    name: 'contact-methods',
    label: 'How should we contact you?',
    options: [
      {
        value: 'email',
        label: 'Email',
        conditional: (
          <div className="govuk-form-group">
            <label className="govuk-label" htmlFor="contact-email">
              Email address
            </label>
            <input className="govuk-input" id="contact-email" name="contact-email" type="email" />
          </div>
        ),
      },
      { value: 'post', label: 'Post' },
    ],
  },
}

const ControlledTemplate = () => {
  const [values, setValues] = useState(['T2', 'T4'])

  return (
    <div>
      <Checkboxes
        name="controlled-terminals"
        label="Terminals"
        inline
        value={values}
        onChange={setValues}
        options={terminalOptions}
      />
      <p className="govuk-body">
        Selected: <strong>{values.join(', ') || 'None'}</strong>
      </p>
    </div>
  )
}

export const Controlled: Story = {
  render: () => <ControlledTemplate />,
}

export const Disabled: Story = {
  args: {
    name: 'disabled-terminals',
    label: 'Terminals',
    defaultValue: ['T2'],
    disabled: true,
    options: terminalOptions,
  },
}
