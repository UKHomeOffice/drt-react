import React from 'react'
import { act, fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Checkboxes } from './Checkboxes'
import type { CheckboxOption } from './Checkboxes'

const options: CheckboxOption[] = [
  { value: 'T2', label: 'Terminal 2' },
  { value: 'T3', label: 'Terminal 3' },
  { value: 'T4', label: 'Terminal 4' },
  { value: 'T5', label: 'Terminal 5' },
]

describe('Checkboxes', () => {
  it('renders GOV.UK fieldset, legend, checkbox items, and labels', () => {
    render(<Checkboxes name="terminals" label="Terminals" options={options} />)

    expect(screen.getByRole('group', { name: 'Terminals' })).toHaveClass('govuk-fieldset')
    expect(document.querySelector('.govuk-form-group')).toHaveClass('drt-govuk-checkboxes')
    expect(document.querySelectorAll('.govuk-checkboxes__item')).toHaveLength(4)
    expect(screen.getByRole('checkbox', { name: 'Terminal 2' })).toHaveClass(
      'govuk-checkboxes__input',
    )
    expect(document.querySelector('label')).toHaveClass(
      'govuk-label',
      'govuk-checkboxes__label',
    )
  })

  it('uses name by default for input names and ID associations', () => {
    render(<Checkboxes name="terminals" label="Terminals" options={options} />)

    expect(screen.getByRole('checkbox', { name: 'Terminal 2' })).toHaveAttribute(
      'id',
      'terminals-1',
    )
    expect(screen.getByRole('checkbox', { name: 'Terminal 5' })).toHaveAttribute(
      'id',
      'terminals-4',
    )
    screen.getAllByRole('checkbox').forEach((checkbox) => {
      expect(checkbox).toHaveAttribute('name', 'terminals')
    })
  })

  it('uses idPrefix for generated IDs without changing the input name', () => {
    render(
      <Checkboxes
        name="terminal-filter"
        idPrefix="dashboard-terminal"
        label="Terminals"
        options={options}
      />,
    )

    const checkbox = screen.getByRole('checkbox', { name: 'Terminal 2' })
    expect(checkbox).toHaveAttribute('id', 'dashboard-terminal-1')
    expect(checkbox).toHaveAttribute('name', 'terminal-filter')
  })

  it('supports page-heading and legend-size presentation', () => {
    render(
      <Checkboxes
        name="terminals"
        label="Choose terminals"
        isPageHeading
        legendSize="l"
        options={options}
      />,
    )

    expect(document.querySelector('h1.govuk-fieldset__heading legend')).toHaveClass(
      'govuk-fieldset__legend--l',
    )
  })

  it('applies the GOV.UK medium legend modifier for larger bold group labels', () => {
    render(
      <Checkboxes
        name="terminals"
        label="Terminals:"
        legendSize="m"
        options={options}
      />,
    )

    expect(document.querySelector('legend')).toHaveClass('govuk-fieldset__legend--m')
  })

  it('associates the fieldset with group hint and error in document order', () => {
    render(
      <Checkboxes
        name="terminals"
        label="Terminals"
        hint="Select all that apply."
        error="Select at least one terminal"
        options={options}
      />,
    )

    expect(document.getElementById('terminals-hint')).toHaveClass('govuk-hint')
    expect(document.getElementById('terminals-error')).toHaveClass('govuk-error-message')
    expect(screen.getByRole('group')).toHaveAttribute(
      'aria-describedby',
      'terminals-hint terminals-error',
    )
  })

  it('associates an option hint with its checkbox', () => {
    render(
      <Checkboxes
        name="alerts"
        label="Alerts"
        options={[{ value: 'email', label: 'Email', hint: 'Sent to your inbox.' }]}
      />,
    )

    expect(document.getElementById('alerts-1-item-hint')).toHaveClass(
      'govuk-hint',
      'govuk-checkboxes__hint',
    )
    expect(screen.getByRole('checkbox', { name: 'Email' })).toHaveAttribute(
      'aria-describedby',
      'alerts-1-item-hint',
    )
  })

  it('renders GOV.UK error classes and marks each checkbox invalid', () => {
    render(
      <Checkboxes
        name="terminals"
        label="Terminals"
        error="Select at least one terminal"
        options={options}
      />,
    )

    expect(document.querySelector('.govuk-form-group')).toHaveClass('govuk-form-group--error')
    expect(document.querySelector('.govuk-visually-hidden')).toHaveTextContent('Error:')
    screen.getAllByRole('checkbox').forEach((checkbox) => {
      expect(checkbox).toHaveAttribute('aria-invalid', 'true')
    })
  })

  it('omits optional accessibility attributes without hint or error', () => {
    render(<Checkboxes name="terminals" label="Terminals" options={options} />)

    expect(screen.getByRole('group')).not.toHaveAttribute('aria-describedby')
    screen.getAllByRole('checkbox').forEach((checkbox) => {
      expect(checkbox).not.toHaveAttribute('aria-describedby')
      expect(checkbox).not.toHaveAttribute('aria-invalid')
    })
  })

  it('controlled mode emits the complete selected values in option order', () => {
    const onChange = jest.fn()
    render(
      <Checkboxes
        name="terminals"
        label="Terminals"
        value={['T4', 'T2']}
        onChange={onChange}
        options={options}
      />,
    )

    fireEvent.click(screen.getByRole('checkbox', { name: 'Terminal 3' }))
    expect(onChange).toHaveBeenCalledWith(['T2', 'T3', 'T4'])
  })

  it('controlled mode does not change checked state until value is updated', () => {
    const { rerender } = render(
      <Checkboxes
        name="terminals"
        label="Terminals"
        value={['T2']}
        options={options}
      />,
    )

    fireEvent.click(screen.getByRole('checkbox', { name: 'Terminal 3' }))
    expect(screen.getByRole('checkbox', { name: 'Terminal 3' })).not.toBeChecked()

    rerender(
      <Checkboxes
        name="terminals"
        label="Terminals"
        value={['T2', 'T3']}
        options={options}
      />,
    )
    expect(screen.getByRole('checkbox', { name: 'Terminal 3' })).toBeChecked()
  })

  it('uncontrolled mode starts with defaults and updates its selected values', () => {
    const onChange = jest.fn()
    render(
      <Checkboxes
        name="terminals"
        label="Terminals"
        defaultValue={['T2', 'T4']}
        onChange={onChange}
        options={options}
      />,
    )

    fireEvent.click(screen.getByRole('checkbox', { name: 'Terminal 2' }))
    expect(screen.getByRole('checkbox', { name: 'Terminal 2' })).not.toBeChecked()
    expect(onChange).toHaveBeenCalledWith(['T4'])
  })

  it('disables every option when the group is disabled', () => {
    render(
      <Checkboxes
        name="terminals"
        label="Terminals"
        disabled
        defaultValue={['T2']}
        options={options}
      />,
    )

    screen.getAllByRole('checkbox').forEach((checkbox) => {
      expect(checkbox).toBeDisabled()
    })
    expect(screen.getByRole('checkbox', { name: 'Terminal 2' })).toBeChecked()
  })

  it('disables only an individual disabled option and preserves it in callbacks', () => {
    const onChange = jest.fn()
    const optionsWithDisabled: CheckboxOption[] = [
      { value: 'T2', label: 'Terminal 2', disabled: true },
      ...options.slice(1),
    ]
    render(
      <Checkboxes
        name="terminals"
        label="Terminals"
        value={['T2']}
        onChange={onChange}
        options={optionsWithDisabled}
      />,
    )

    expect(screen.getByRole('checkbox', { name: 'Terminal 2' })).toBeDisabled()
    fireEvent.click(screen.getByRole('checkbox', { name: 'Terminal 3' }))
    expect(onChange).toHaveBeenCalledWith(['T2', 'T3'])
  })

  it('applies an option test ID to its input', () => {
    render(
      <Checkboxes
        name="terminals"
        label="Terminals"
        options={[{ value: 'T2', label: 'Terminal 2', testId: 'terminal-2-check' }]}
      />,
    )

    expect(screen.getByTestId('terminal-2-check')).toBe(
      screen.getByRole('checkbox', { name: 'Terminal 2' }),
    )
  })

  it('renders the custom responsive inline modifier without a GOV.UK inline modifier', () => {
    render(<Checkboxes name="terminals" label="Terminals" inline options={options} />)

    const checkboxes = document.querySelector('.govuk-checkboxes')
    expect(checkboxes).toHaveClass('drt-checkboxes--inline')
    expect(checkboxes).not.toHaveClass('govuk-checkboxes--inline')
  })

  it('applies the official GOV.UK small modifier', () => {
    render(<Checkboxes name="terminals" label="Terminals" small options={options} />)

    expect(document.querySelector('.govuk-checkboxes')).toHaveClass(
      'govuk-checkboxes--small',
    )
  })

  it('combines the GOV.UK small modifier with the DRT inline modifier', () => {
    render(
      <Checkboxes name="terminals" label="Terminals" small inline options={options} />,
    )

    expect(document.querySelector('.govuk-checkboxes')).toHaveClass(
      'govuk-checkboxes--small',
      'drt-checkboxes--inline',
    )
  })

  it('uses the GOV.UK focusable input and adjacent label structure', () => {
    render(<Checkboxes name="terminals" label="Terminals" options={options} />)

    const checkbox = screen.getByRole('checkbox', { name: 'Terminal 2' })
    act(() => checkbox.focus())

    expect(checkbox).toHaveFocus()
    expect(checkbox).toHaveClass('drt-checkboxes__input--focused')
    expect(checkbox.nextElementSibling).toHaveClass(
      'govuk-label',
      'govuk-checkboxes__label',
    )

    act(() => checkbox.blur())
    expect(checkbox).not.toHaveClass('drt-checkboxes__input--focused')
  })

  it('reveals and hides GOV.UK conditional content as its checkbox changes', () => {
    render(
      <Checkboxes
        name="contact"
        label="Contact methods"
        options={[
          {
            value: 'email',
            label: 'Email',
            conditional: <input aria-label="Email address" />,
          },
        ]}
      />,
    )

    const checkbox = screen.getByRole('checkbox', { name: 'Email' })
    const conditional = document.getElementById('contact-1-conditional')
    expect(checkbox).toHaveAttribute('aria-controls', 'contact-1-conditional')
    expect(checkbox).toHaveAttribute('aria-expanded', 'false')
    expect(conditional).toHaveClass('govuk-checkboxes__conditional--hidden')

    fireEvent.click(checkbox)
    expect(checkbox).toHaveAttribute('aria-expanded', 'true')
    expect(conditional).not.toHaveClass('govuk-checkboxes__conditional--hidden')
  })
})
