import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { expect, userEvent, within } from '@storybook/test'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'GOV.UK/Button',
  component: Button,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    children: 'Primary Button',
  },
}

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
  },
}

export const Warning: Story = {
  args: {
    children: 'Delete',
    variant: 'warning',
  },
}

export const Small: Story = {
  args: {
    children: 'Small Button',
    size: 'small',
  },
}

export const SmallSecondary: Story = {
  args: {
    children: 'Small Secondary',
    variant: 'secondary',
    size: 'small',
  },
}

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
}

export const DisabledSecondary: Story = {
  args: {
    children: 'Disabled Secondary',
    variant: 'secondary',
    disabled: true,
  },
}

export const FullWidth: Story = {
  render: () => (
    <div style={{ maxWidth: '480px' }}>
      <Button fullWidth>Continue</Button>
    </div>
  ),
}

export const WithStartIcon: Story = {
  args: {
    startIcon: (
      <svg aria-hidden="true" focusable="false" width="16" height="16" viewBox="0 0 16 16">
        <path fill="currentColor" d="M8 1v8.17l2.59-2.58L12 8l-4 4-4-4 1.41-1.41L7 9.17V1h1ZM2 13h12v2H2z" />
      </svg>
    ),
    children: 'Download report',
  },
}

export const WithEndIcon: Story = {
  args: {
    endIcon: (
      <svg aria-hidden="true" focusable="false" width="16" height="16" viewBox="0 0 16 16">
        <path fill="currentColor" d="m9.29 3.29 1.42 1.42L7.41 8l3.3 3.29-1.42 1.42L4.59 8z" />
      </svg>
    ),
    children: 'Back',
  },
}

export const LinkButton: Story = {
  args: {
    children: 'Link Button',
    href: '#',
  },
}

export const ExternalLink: Story = {
  args: {
    children: 'External Link',
    href: 'https://www.gov.uk',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
}

export const SecondaryLink: Story = {
  args: {
    children: 'Secondary Link',
    href: '#',
    variant: 'secondary',
  },
}

export const SubmitButton: Story = {
  args: {
    children: 'Submit',
    type: 'submit',
  },
}

export const ButtonGroup: Story = {
  render: () => (
    <div className="govuk-button-group">
      <Button>Save and Continue</Button>
      <Button variant="secondary">Cancel</Button>
    </div>
  ),
}

export const MultipleVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h3>Primary</h3>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button>Default</Button>
          <Button size="small">Small</Button>
          <Button disabled>Disabled</Button>
        </div>
      </div>
      <div>
        <h3>Secondary</h3>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button variant="secondary">Default</Button>
          <Button variant="secondary" size="small">
            Small
          </Button>
          <Button variant="secondary" disabled>
            Disabled
          </Button>
        </div>
      </div>
      <div>
        <h3>Warning</h3>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button variant="warning">Default</Button>
          <Button variant="warning" size="small">
            Small
          </Button>
          <Button variant="warning" disabled>
            Disabled
          </Button>
        </div>
      </div>
    </div>
  ),
}

export const Accessibility: Story = {
  args: {
    children: 'Delete Item',
    variant: 'warning',
    ariaLabel: 'Delete user account',
    ariaDescribedBy: 'delete-warning',
  },
  render: (args) => (
    <div>
      <Button {...args} />
      <div id="delete-warning" style={{ marginTop: '16px', fontSize: '14px', color: '#d4351c' }}>
        Warning: This action cannot be undone.
      </div>
    </div>
  ),
}

export const Loading: Story = {
  args: {
    children: 'Loading...',
    'aria-busy': true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button', { name: 'Loading...' })
    await expect(button).toHaveAttribute('aria-busy', 'true')
  },
}

export const Focus: Story = {
  args: {
    children: 'Focused Button',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button', { name: 'Focused Button' })
    await userEvent.tab()
    await expect(button).toHaveFocus()
  },
}
