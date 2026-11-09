import React from 'react'
import { fireEvent, render, screen, within } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Card } from './Card'
import { Card as PublicCard } from '../../../index'

describe('Card', () => {
  it('renders a heading and arbitrary content', () => {
    render(<Card heading="Regional pressure"><p>Forecast data</p></Card>)

    expect(screen.getByRole('heading', { level: 2, name: 'Regional pressure' })).toBeInTheDocument()
    expect(screen.getByText('Forecast data')).toBeInTheDocument()
  })

  it('supports the heading level and HTML attributes supplied by the consumer', () => {
    render(<Card heading="Heathrow" headingLevel={3} id="heathrow" aria-label="Forecast" className="custom-card" />)

    expect(screen.getByRole('heading', { level: 3, name: 'Heathrow' })).toBeInTheDocument()
    expect(screen.getByLabelText('Forecast')).toHaveAttribute('id', 'heathrow')
    expect(screen.getByLabelText('Forecast')).toHaveClass('custom-card')
  })

  it('renders a keyboard-accessible heading link without wrapping its content', () => {
    render(<Card heading="View region" href="/region" clickable showChevron><p>Forecast data</p></Card>)

    const link = screen.getByRole('link', { name: 'View region' })
    expect(link).toHaveAttribute('href', '/region')
    expect(within(link).queryByText('Forecast data')).not.toBeInTheDocument()
    link.focus()
    expect(link).toHaveFocus()
  })

  it('renders an independently operable header action and content', () => {
    const onClick = jest.fn()
    render(
      <Card heading="Heathrow" action={<button onClick={onClick}>View arrivals</button>}>
        <p>Passenger chart</p>
      </Card>,
    )

    fireEvent.click(screen.getByRole('button', { name: 'View arrivals' }))
    expect(onClick).toHaveBeenCalledTimes(1)
    expect(screen.getByText('Passenger chart')).toBeInTheDocument()
  })

  it('supports a secondary card with a non-clickable heading link and an action', () => {
    render(
      <Card variant="secondary" heading="Region" href="/region" clickable={false} action={<button>Export</button>} />,
    )

    expect(screen.getByRole('link', { name: 'Region' })).toHaveAttribute('href', '/region')
    expect(screen.getByRole('button', { name: 'Export' })).toBeInTheDocument()
  })

  it('renders image alternative text, including an empty alt for decorative images', () => {
    const { rerender } = render(<Card image={{ src: '/airport.png', alt: 'Airport terminal' }} />)
    expect(screen.getByRole('img', { name: 'Airport terminal' })).toHaveAttribute('src', '/airport.png')

    rerender(<Card image={{ src: '/decoration.png', alt: '' }} />)
    expect(screen.getByAltText('')).toHaveAttribute('src', '/decoration.png')
  })

  it('exports Card from the public package entry point', () => {
    expect(PublicCard).toBe(Card)
  })
})
