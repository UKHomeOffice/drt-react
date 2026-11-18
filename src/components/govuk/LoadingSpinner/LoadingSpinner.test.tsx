import React from 'react'
import { render, screen, within } from '@testing-library/react'
import '@testing-library/jest-dom'
import { LoadingSpinner } from './LoadingSpinner'
import { LoadingSpinner as PublicLoadingSpinner } from '../../../index'

describe('LoadingSpinner', () => {
  it('renders the default message as a heading inside a status live region', () => {
    render(<LoadingSpinner />)

    const status = screen.getByRole('status')
    expect(within(status).getByRole('heading', { level: 1, name: 'Loading...' })).toBeVisible()
  })

  it('renders and updates a custom message within the same status region', () => {
    const { rerender } = render(<LoadingSpinner>Loading passenger forecasts</LoadingSpinner>)
    const status = screen.getByRole('status')

    expect(within(status).getByRole('heading', { name: 'Loading passenger forecasts' })).toBeVisible()
    rerender(<LoadingSpinner>Loading arrivals</LoadingSpinner>)
    expect(screen.getByRole('status')).toBe(status)
    expect(within(status).getByRole('heading', { name: 'Loading arrivals' })).toBeVisible()
  })

  it('supports additional HTML attributes and classes', () => {
    render(<LoadingSpinner id="loading" className="custom-spinner" aria-label="Forecast status" />)

    const status = screen.getByRole('status', { name: 'Forecast status' })
    expect(status).toHaveAttribute('id', 'loading')
    expect(status).toHaveClass('drt-govuk-loading-spinner', 'custom-spinner')
  })

  it('exports the component from the public package entry point', () => {
    expect(PublicLoadingSpinner).toBe(LoadingSpinner)
  })
})
