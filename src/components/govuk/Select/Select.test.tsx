import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Select } from './Select'
import type { SelectOption } from './Select'

const options: SelectOption[] = [
  { value: 'recent', label: 'Recently published' },
  { value: 'updated', label: 'Recently updated' },
  { value: 'viewed', label: 'Most viewed' },
]

describe('Select', () => {
  it('renders GOV.UK form group, label, select, and options', () => {
    render(<Select name="sort" label="Sort by" options={options} />)

    expect(document.querySelector('.govuk-form-group')).toBeInTheDocument()
    expect(document.querySelector('.govuk-form-group')).toHaveClass('drt-govuk-select')
    expect(screen.getByLabelText('Sort by')).toHaveClass('govuk-select')
    expect(screen.getAllByRole('option')).toHaveLength(3)
    expect(screen.getByRole('option', { name: 'Recently updated' })).toHaveValue('updated')
  })

  it('uses name as the default select ID and associates the label with it', () => {
    render(<Select name="sort" label="Sort by" options={options} />)

    const select = screen.getByLabelText('Sort by')
    expect(select).toHaveAttribute('id', 'sort')
    expect(select).toHaveAttribute('name', 'sort')
    expect(document.querySelector('label')).toHaveAttribute('for', 'sort')
  })

  it('uses an explicit ID without changing the submitted name', () => {
    render(<Select id="result-order" name="sort" label="Sort by" options={options} />)

    const select = screen.getByLabelText('Sort by')
    expect(select).toHaveAttribute('id', 'result-order')
    expect(select).toHaveAttribute('name', 'sort')
    expect(document.querySelector('label')).toHaveAttribute('for', 'result-order')
  })

  it('retains the GOV.UK label class when applying consumer label classes', () => {
    render(
      <Select
        name="sort"
        label="Sort by"
        labelClassName="govuk-visually-hidden custom-label"
        options={options}
      />,
    )

    expect(document.querySelector('label')).toHaveClass(
      'govuk-label',
      'govuk-visually-hidden',
      'custom-label',
    )
    expect(screen.getByLabelText('Sort by')).toBeInTheDocument()
  })

  it('supports the GOV.UK medium label modifier', () => {
    render(
      <Select
        name="sort"
        label="Sort by"
        labelClassName="govuk-label--m"
        options={options}
      />,
    )

    expect(document.querySelector('label')).toHaveClass('govuk-label', 'govuk-label--m')
  })

  it('supports an aria-label without rendering a label element', () => {
    render(
      <Select
        name="upcoming-period"
        ariaLabel="Choose upcoming arrivals period"
        options={options}
      />,
    )

    const select = screen.getByRole('combobox', {
      name: 'Choose upcoming arrivals period',
    })
    expect(select).toHaveAttribute('aria-label', 'Choose upcoming arrivals period')
    expect(document.querySelector('label')).not.toBeInTheDocument()
  })

  it('renders and associates hint text using the select ID', () => {
    render(
      <Select
        id="result-order"
        name="sort"
        label="Sort by"
        hint="Choose how results are ordered."
        options={options}
      />,
    )

    expect(document.getElementById('result-order-hint')).toHaveClass('govuk-hint')
    expect(screen.getByLabelText('Sort by')).toHaveAttribute(
      'aria-describedby',
      'result-order-hint',
    )
  })

  it('renders the GOV.UK error state and associates the error with the select', () => {
    render(
      <Select
        name="sort"
        label="Sort by"
        error="Select how results are ordered"
        options={options}
      />,
    )

    expect(document.querySelector('.govuk-form-group')).toHaveClass('govuk-form-group--error')
    expect(document.getElementById('sort-error')).toHaveClass('govuk-error-message')
    expect(document.querySelector('.govuk-visually-hidden')).toHaveTextContent('Error:')
    expect(screen.getByLabelText('Sort by')).toHaveClass('govuk-select--error')
    expect(screen.getByLabelText('Sort by')).toHaveAttribute('aria-invalid', 'true')
    expect(screen.getByLabelText('Sort by')).toHaveAttribute('aria-describedby', 'sort-error')
  })

  it('associates hint and error in GOV.UK document order', () => {
    render(
      <Select
        name="sort"
        label="Sort by"
        hint="Choose an ordering."
        error="Select an ordering"
        options={options}
      />,
    )

    expect(screen.getByLabelText('Sort by')).toHaveAttribute(
      'aria-describedby',
      'sort-hint sort-error',
    )
  })

  it('omits optional accessibility attributes without hint or error', () => {
    render(<Select name="sort" label="Sort by" options={options} />)

    const select = screen.getByLabelText('Sort by')
    expect(select).not.toHaveAttribute('aria-describedby')
    expect(select).not.toHaveAttribute('aria-invalid')
  })

  it('uses the controlled value and reports the selected string value', () => {
    const onChange = jest.fn()
    const { rerender } = render(
      <Select
        name="sort"
        label="Sort by"
        value="recent"
        onChange={onChange}
        options={options}
      />,
    )

    fireEvent.change(screen.getByLabelText('Sort by'), { target: { value: 'viewed' } })
    expect(onChange).toHaveBeenCalledWith('viewed')
    expect(screen.getByLabelText('Sort by')).toHaveValue('recent')

    rerender(
      <Select
        name="sort"
        label="Sort by"
        value="viewed"
        onChange={onChange}
        options={options}
      />,
    )
    expect(screen.getByLabelText('Sort by')).toHaveValue('viewed')
  })

  it('supports an uncontrolled initial value', () => {
    render(
      <Select
        name="sort"
        label="Sort by"
        defaultValue="updated"
        options={options}
      />,
    )

    const select = screen.getByLabelText('Sort by')
    expect(select).toHaveValue('updated')
    fireEvent.change(select, { target: { value: 'viewed' } })
    expect(select).toHaveValue('viewed')
  })

  it('supports ReactNode option labels', () => {
    render(
      <Select
        name="sort"
        label="Sort by"
        options={[{ value: 'recent', label: <>Recently published</> }]}
      />,
    )

    expect(screen.getByRole('option', { name: 'Recently published' })).toBeInTheDocument()
  })

  it('disables the select when requested', () => {
    render(<Select name="sort" label="Sort by" disabled options={options} />)
    expect(screen.getByLabelText('Sort by')).toBeDisabled()
  })

  it('retains consumer select classes alongside GOV.UK classes', () => {
    render(
      <Select
        name="sort"
        label="Sort by"
        className="dynamic-width custom-select"
        options={options}
      />,
    )

    expect(screen.getByLabelText('Sort by')).toHaveClass(
      'govuk-select',
      'dynamic-width',
      'custom-select',
    )
  })
})
