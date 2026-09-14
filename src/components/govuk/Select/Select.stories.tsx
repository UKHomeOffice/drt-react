import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Select } from './Select'

const meta: Meta<typeof Select> = {
  title: 'GOV.UK/Select',
  component: Select,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Select>

const countries = [
  { value: 'england', label: 'England' },
  { value: 'scotland', label: 'Scotland' },
  { value: 'wales', label: 'Wales' },
  { value: 'northern-ireland', label: 'Northern Ireland' },
]

export const Default: Story = {
  args: {
    name: 'country',
    label: 'Choose your country',
    labelClassName: 'govuk-label--m',
    options: countries,
  },
}

export const WithHint: Story = {
  args: {
    name: 'country-with-hint',
    label: 'Choose your country',
    hint: 'This is the country you usually live in.',
    options: countries,
  },
}

export const ErrorState: Story = {
  args: {
    name: 'country-error',
    label: 'Choose your country',
    hint: 'This is the country you usually live in.',
    error: 'Select the country you live in',
    options: countries,
  },
}

export const DynamicWidth: Story = {
  args: {
    name: 'country-dynamic-width',
    label: 'Choose your country',
    className: 'govuk-select--width-20 dynamic-width',
    options: countries,
  },
}

export const VisuallyHiddenLabel: Story = {
  args: {
    name: 'secondary-country',
    label: 'Choose a second country',
    labelClassName: 'govuk-visually-hidden',
    className: 'dynamic-width',
    options: countries,
  },
}

export const AriaLabelOnly: Story = {
  args: {
    name: 'upcoming-period',
    ariaLabel: 'Choose upcoming arrivals period',
    className: 'dynamic-width',
    options: [
      { value: '15', label: '15 minutes' },
      { value: '30', label: '30 minutes' },
      { value: '60', label: '1 hour' },
    ],
  },
}

export const PortDashboardArrivalWindow: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, flexWrap: 'wrap' }}>
      <Select
        name="arrival-window-direction"
        label="Arrival window:"
        labelClassName="govuk-label--m"
        defaultValue="before"
        options={[
          { value: 'before', label: 'Previous' },
          { value: 'after', label: 'Upcoming' },
        ]}
      />
      <Select
        name="arrival-window-period"
        ariaLabel="Choose upcoming arrivals period"
        className="dynamic-width"
        defaultValue="60"
        options={[
          { value: '15', label: '15 minutes' },
          { value: '30', label: '30 minutes' },
          { value: '60', label: '1 hour' },
        ]}
      />
    </div>
  ),
}

const ControlledTemplate = () => {
  const [value, setValue] = useState('scotland')

  return (
    <div>
      <Select
        name="controlled-country"
        label="Choose your country"
        value={value}
        onChange={setValue}
        options={countries}
      />
      <p className="govuk-body">
        Selected: <strong>{value}</strong>
      </p>
    </div>
  )
}

export const Controlled: Story = {
  render: () => <ControlledTemplate />,
}

export const Disabled: Story = {
  args: {
    name: 'disabled-country',
    label: 'Choose your country',
    defaultValue: 'wales',
    disabled: true,
    options: countries,
  },
}
