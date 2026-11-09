import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Card } from './Card'
import { Button } from '../Button'

const meta: Meta<typeof Card> = {
  title: 'GOV.UK/Card',
  component: Card,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Card>

export const Primary: Story = {
  args: {
    heading: 'Regional pressure',
    children: <p>View passenger forecasts and previous year comparisons.</p>,
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    heading: 'Regional pressure',
    children: <p>View passenger forecasts and previous year comparisons.</p>,
  },
}

export const Clickable: Story = {
  args: {
    heading: 'View regional pressure',
    href: '#regional-pressure',
    clickable: true,
    showChevron: true,
    children: <p>Explore the latest regional forecasts.</p>,
  },
}

export const SecondaryClickable: Story = {
  args: {
    variant: 'secondary',
    heading: 'View regional pressure',
    href: '#regional-pressure',
    clickable: true,
    children: <p>Explore the latest regional forecasts.</p>,
  },
}

export const WithAction: Story = {
  args: {
    heading: 'Heathrow',
    headingLevel: 3,
    action: <Button href="#arrivals">View Heathrow arrivals</Button>,
    children: <p>Passenger forecast chart</p>,
  },
}

export const WithImage: Story = {
  args: {
    heading: 'Airport information',
    image: {
      src: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="600" height="160"%3E%3Crect width="600" height="160" fill="%23d8dde0"/%3E%3C/svg%3E',
      alt: '',
    },
    children: <p>Information about the airport.</p>,
  },
}

export const Group: Story = {
  render: () => (
    <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: 16, padding: 0, listStyle: 'none' }}>
      <li><Card heading="North" href="#north" clickable style={{ height: '100%' }}><p>View northern forecasts.</p></Card></li>
      <li><Card heading="South" href="#south" clickable style={{ height: '100%' }}><p>View southern forecasts.</p></Card></li>
    </ul>
  ),
}


