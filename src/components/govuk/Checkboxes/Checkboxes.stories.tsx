import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { expect, userEvent, within } from '@storybook/test'
import { Checkboxes } from './Checkboxes'
import { Select } from '../Select'

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

export const Small: Story = {
  args: {
    name: 'small-terminals',
    label: 'Terminals:',
    legendSize: 'm',
    small: true,
    options: terminalOptions,
  },
}

export const SmallInline: Story = {
  args: {
    name: 'small-inline-terminals',
    label: 'Terminals:',
    legendSize: 'm',
    small: true,
    inline: true,
    defaultValue: ['T2', 'T3', 'T4', 'T5'],
    options: terminalOptions,
  },
}

export const FocusedSmallInline: Story = {
  args: {
    ...SmallInline.args,
    name: 'focused-small-inline-terminals',
    defaultValue: [],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.tab()
    const checkbox = canvas.getByRole('checkbox', { name: 'Terminal 2' })
    await expect(checkbox).toHaveFocus()

    const label = checkbox.nextElementSibling
    await expect(label).toHaveClass('govuk-checkboxes__label')

    const focusIndicator = window.getComputedStyle(label as Element, '::before')
    await expect(focusIndicator.boxShadow).toContain(
      'rgb(255, 221, 0) 0px 0px 0px 2px',
    )
    await expect(focusIndicator.boxShadow).toContain(
      'rgb(11, 12, 12) 0px 0px 0px 4px',
    )
  },
}

export const RootFontSizeRegression: Story = {
  render: () => (
    <div>
      <Select
        name="root-size-select"
        label="Arrival window:"
        labelClassName="govuk-label--m"
        hint="Choose an arrival window."
        error="Select an arrival window"
        options={[
          { value: 'before', label: 'Previous' },
          { value: 'after', label: 'Upcoming' },
        ]}
      />
      <Checkboxes
        name="root-size-checkboxes"
        label="Terminals:"
        legendSize="m"
        hint="Select one or more terminals."
        small
        inline
        options={terminalOptions}
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const originalRootFontSize = document.documentElement.style.fontSize
    const canvas = within(canvasElement)
    const select = canvas.getByRole('combobox', { name: 'Arrival window:' })
    const selectLabel = canvas.getByText('Arrival window:')
    const selectHint = canvas.getByText('Choose an arrival window.')
    const selectError = canvas.getByText('Select an arrival window')
    const checkbox = canvas.getByRole('checkbox', { name: 'Terminal 2' })
    const checkboxLabel = checkbox.nextElementSibling as Element
    const legend = canvas.getByText('Terminals:')
    const checkboxHint = canvas.getByText('Select one or more terminals.')

    try {
      for (const rootFontSize of [10, 16]) {
        document.documentElement.style.fontSize = `${rootFontSize}px`

        await expect(window.getComputedStyle(select).fontSize).toBe('19px')
        await expect(window.getComputedStyle(select).height).toBe('40px')
        await expect(window.getComputedStyle(selectLabel).fontSize).toBe('24px')
        await expect(window.getComputedStyle(selectLabel).lineHeight).toBe('30px')
        await expect(window.getComputedStyle(selectHint).fontSize).toBe('19px')
        await expect(window.getComputedStyle(selectHint).lineHeight).toBe('25px')
        await expect(window.getComputedStyle(selectError).fontSize).toBe('19px')
        await expect(window.getComputedStyle(selectError).lineHeight).toBe('25px')
        await expect(window.getComputedStyle(legend).fontSize).toBe('24px')
        await expect(window.getComputedStyle(legend).lineHeight).toBe('30px')
        await expect(window.getComputedStyle(checkboxHint).fontSize).toBe('19px')
        await expect(window.getComputedStyle(checkboxHint).lineHeight).toBe('25px')
        await expect(window.getComputedStyle(checkboxLabel).fontSize).toBe('19px')
        await expect(window.getComputedStyle(checkboxLabel).lineHeight).toBe('25px')
        await expect(window.getComputedStyle(checkbox).width).toBe('44px')
        await expect(
          window.getComputedStyle(checkboxLabel, '::before').width,
        ).toBe('24px')

        checkbox.focus()
        await new Promise<void>((resolve) => {
          window.requestAnimationFrame(() => resolve())
        })
        const focusIndicator = window.getComputedStyle(checkboxLabel, '::before')
        await expect(focusIndicator.boxShadow).toContain(
          'rgb(255, 221, 0) 0px 0px 0px 2px',
        )
      }
    } finally {
      document.documentElement.style.fontSize = originalRootFontSize
    }
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
