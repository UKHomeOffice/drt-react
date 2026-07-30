import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Radios } from './Radios'

const meta: Meta<typeof Radios> = {
  title: 'GOV.UK/Radios',
  component: Radios,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Radios>

// ── Default ─────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    name: 'example',
    label: 'Have you changed your name?',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
    ],
  },
}

// ── With legend as page heading ──────────────────────────────────────────────

export const WithLegendAsHeading: Story = {
  args: {
    name: 'changed-name',
    label: 'Have you changed your name?',
    isPageHeading: true,
    legendSize: 'l',
    hint: 'This includes changing your last name or spelling your name differently.',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
    ],
  },
}

// ── With hint ────────────────────────────────────────────────────────────────

export const WithHint: Story = {
  args: {
    name: 'sign-in',
    label: 'How do you want to sign in?',
    hint: 'You will need to prove your identity.',
    options: [
      { value: 'gateway', label: 'Sign in with Government Gateway' },
      { value: 'verify', label: 'Sign in with GOV.UK Verify' },
    ],
  },
}

// ── Inline ───────────────────────────────────────────────────────────────────

export const Inline: Story = {
  args: {
    name: 'changed-name-inline',
    label: 'Have you changed your name?',
    inline: true,
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
    ],
  },
}

// ── Small ─────────────────────────────────────────────────────────────────────

export const Small: Story = {
  args: {
    name: 'filter',
    label: 'Filter by status',
    small: true,
    options: [
      { value: 'open', label: 'Open' },
      { value: 'in-progress', label: 'In progress' },
      { value: 'closed', label: 'Closed' },
    ],
  },
}

// ── With divider ─────────────────────────────────────────────────────────────

export const WithDivider: Story = {
  args: {
    name: 'where-do-you-live',
    label: 'Where do you live?',
    options: [
      { value: 'england', label: 'England' },
      { value: 'scotland', label: 'Scotland' },
      { value: 'wales', label: 'Wales' },
      { value: 'northern-ireland', label: 'Northern Ireland' },
      'or',
      { value: 'abroad', label: 'I am a British citizen living abroad' },
    ],
  },
}

export const WithCustomDivider: Story = {
  name: 'With custom divider text',
  args: {
    name: 'contact-method',
    label: 'How should we contact you?',
    options: [
      { value: 'email', label: 'Email' },
      { value: 'phone', label: 'Phone' },
      { divider: 'or alternatively' },
      { value: 'post', label: 'Post' },
    ],
  },
}

// ── With hints per option ────────────────────────────────────────────────────

export const WithHintsPerOption: Story = {
  args: {
    name: 'sign-in-hints',
    label: 'How do you want to sign in?',
    options: [
      {
        value: 'gateway',
        label: 'Sign in with Government Gateway',
        hint: "You'll have a user ID if you've registered for Self Assessment or filed a tax return online before.",
      },
      {
        value: 'verify',
        label: 'Sign in with GOV.UK Verify',
        hint: "You'll have an account if you've already proved your identity with either Barclays, CitizenSafe, Digidentity, Experian, Post Office, Royal Mail or SecureIdentity.",
      },
    ],
  },
}

// ── Conditional reveal ───────────────────────────────────────────────────────

export const ConditionalReveal: Story = {
  args: {
    name: 'contact',
    label: 'How would you prefer to be contacted?',
    hint: 'Select one option.',
    options: [
      {
        value: 'email',
        label: 'Email',
        conditional: (
          <div className="govuk-form-group">
            <label className="govuk-label" htmlFor="contact-by-email">
              Email address
            </label>
            <input
              className="govuk-input govuk-!-width-one-third"
              id="contact-by-email"
              name="contact-by-email"
              type="email"
              autoComplete="email"
              spellCheck={false}
            />
          </div>
        ),
      },
      {
        value: 'phone',
        label: 'Phone',
        conditional: (
          <div className="govuk-form-group">
            <label className="govuk-label" htmlFor="contact-by-phone">
              Phone number
            </label>
            <input
              className="govuk-input govuk-!-width-one-third"
              id="contact-by-phone"
              name="contact-by-phone"
              type="tel"
              autoComplete="tel"
            />
          </div>
        ),
      },
      {
        value: 'text',
        label: 'Text message',
        conditional: (
          <div className="govuk-form-group">
            <label className="govuk-label" htmlFor="contact-by-text">
              Mobile phone number
            </label>
            <input
              className="govuk-input govuk-!-width-one-third"
              id="contact-by-text"
              name="contact-by-text"
              type="tel"
              autoComplete="tel"
            />
          </div>
        ),
      },
    ],
  },
}

// ── Error state ──────────────────────────────────────────────────────────────

export const ErrorState: Story = {
  args: {
    name: 'changed-name-error',
    label: 'Have you changed your name?',
    hint: 'This includes changing your last name or spelling your name differently.',
    error: 'Select yes if you have changed your name',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
    ],
  },
}

// ── Controlled ───────────────────────────────────────────────────────────────

const ControlledTemplate = () => {
  const [value, setValue] = useState('no')
  return (
    <div>
      <Radios
        name="controlled-example"
        label="Have you changed your name?"
        value={value}
        onChange={setValue}
        options={[
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ]}
      />
      <p style={{ marginTop: 16 }}>
        Selected: <strong>{value}</strong>
      </p>
    </div>
  )
}

export const Controlled: Story = {
  render: () => <ControlledTemplate />,
}

// ── Disabled group ────────────────────────────────────────────────────────────

export const DisabledGroup: Story = {
  args: {
    name: 'disabled-group',
    label: 'Have you changed your name?',
    disabled: true,
    defaultValue: 'yes',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
    ],
  },
}

// ── Disabled option ───────────────────────────────────────────────────────────

export const DisabledOption: Story = {
  args: {
    name: 'disabled-option',
    label: 'Where do you live?',
    options: [
      { value: 'england', label: 'England' },
      { value: 'scotland', label: 'Scotland' },
      { value: 'wales', label: 'Wales' },
      { value: 'northern-ireland', label: 'Northern Ireland', disabled: true },
    ],
  },
}
