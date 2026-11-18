import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { LoadingSpinner } from './LoadingSpinner'

const meta: Meta<typeof LoadingSpinner> = {
  title: 'GOV.UK/LoadingSpinner',
  component: LoadingSpinner,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Use a loading spinner to explain what the user is waiting for. It includes a level-one heading; avoid another level-one heading on the same page. Handle failures and timeouts rather than letting it spin indefinitely.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof LoadingSpinner>

export const Default: Story = {}

export const CustomMessage: Story = {
  args: { children: 'Loading passenger forecasts' },
}
