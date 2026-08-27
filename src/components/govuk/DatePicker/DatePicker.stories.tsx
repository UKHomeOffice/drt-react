import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { DatePicker, type IsoDate } from './DatePicker'

const meta: Meta<typeof DatePicker> = {
  title: 'GOV.UK/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'MOJ-style, GOV.UK-compatible date-only picker. It accepts and emits a calendar-date `YYYY-MM-DD` value, while users enter a padded UK date in `DD/MM/YYYY` format. Users can type a date directly or use the keyboard-accessible calendar dialog.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof DatePicker>

// ── Default ─────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    id: 'arrival-date',
    label: 'Arrival date',
  },
}

// ── With a preselected date ──────────────────────────────────────────────────

export const WithValue: Story = {
  args: {
    id: 'departure-date',
    label: 'Departure date',
    hint: 'Choose the date your flight departs.',
    defaultValue: '2026-08-27',
  },
}

// ── With inclusive bounds ────────────────────────────────────────────────────

export const WithBounds: Story = {
  args: {
    id: 'report-date',
    label: 'Report date',
    minDate: '2026-01-01',
    maxDate: '2026-12-31',
  },
}

// ── Error state ──────────────────────────────────────────────────────────────

export const WithError: Story = {
  args: {
    id: 'required-date',
    label: 'Date of birth',
    error: 'Enter your date of birth',
  },
}

// ── Controlled ───────────────────────────────────────────────────────────────

const ControlledTemplate = () => {
  const [value, setValue] = useState<IsoDate | null>('2026-08-27')
  return (
    <div>
      <DatePicker id="controlled-date" label="Arrival date" value={value} onChange={setValue} />
      <p style={{ marginTop: 16 }}>Selected ISO date: <strong>{value || 'None'}</strong></p>
    </div>
  )
}

export const Controlled: Story = {
  render: () => <ControlledTemplate />,
}

// ── Disabled ─────────────────────────────────────────────────────────────────

export const Disabled: Story = {
  args: {
    id: 'disabled-date',
    label: 'Date',
    defaultValue: '2026-08-27',
    disabled: true,
  },
}
