import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Radios } from './Radios'
import type { RadiosOption } from './Radios'

const basicOptions: RadiosOption[] = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
]

describe('Radios', () => {
  // ── Basic rendering ──────────────────────────────────────────────────────

  it('renders with minimum props (name + options)', () => {
    render(<Radios name="test" options={basicOptions} />)
    expect(screen.getByRole('radio', { name: 'Yes' })).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: 'No' })).toBeInTheDocument()
  })

  it('sets correct name attribute on all radio inputs', () => {
    render(<Radios name="my-name" options={basicOptions} />)
    const inputs = screen.getAllByRole('radio')
    inputs.forEach((input) => {
      expect(input).toHaveAttribute('name', 'my-name')
    })
  })

  // ── ID and label associations ────────────────────────────────────────────

  it('generates correct id/htmlFor associations using name as default idPrefix', () => {
    render(<Radios name="choice" options={basicOptions} />)
    const yesInput = screen.getByRole('radio', { name: 'Yes' })
    const noInput = screen.getByRole('radio', { name: 'No' })
    expect(yesInput).toHaveAttribute('id', 'choice-1')
    expect(noInput).toHaveAttribute('id', 'choice-2')
    expect(screen.getByLabelText('Yes')).toBe(yesInput)
    expect(screen.getByLabelText('No')).toBe(noInput)
  })

  it('uses custom idPrefix for element IDs', () => {
    render(<Radios name="choice" idPrefix="q1" options={basicOptions} />)
    expect(screen.getByRole('radio', { name: 'Yes' })).toHaveAttribute('id', 'q1-1')
    expect(screen.getByRole('radio', { name: 'No' })).toHaveAttribute('id', 'q1-2')
  })

  // ── Legend / label rendering ─────────────────────────────────────────────

  it('renders label inside <legend>', () => {
    render(<Radios name="test" label="Pick one" options={basicOptions} />)
    const legend = document.querySelector('legend')
    expect(legend).toHaveTextContent('Pick one')
  })

  it('applies legendSize class to legend', () => {
    render(<Radios name="test" label="Pick one" legendSize="l" options={basicOptions} />)
    const legend = document.querySelector('legend')
    expect(legend).toHaveClass('govuk-fieldset__legend--l')
  })

  it('wraps legend in h1 when isPageHeading is true', () => {
    render(<Radios name="test" label="Pick one" isPageHeading={true} options={basicOptions} />)
    const h1 = document.querySelector('h1.govuk-fieldset__heading')
    expect(h1).toBeInTheDocument()
    const legend = h1?.querySelector('legend')
    expect(legend).toBeTruthy()
  })

  it('does not render h1 when isPageHeading is false (default)', () => {
    render(<Radios name="test" label="Pick one" options={basicOptions} />)
    expect(document.querySelector('h1.govuk-fieldset__heading')).not.toBeInTheDocument()
  })

  // ── Group-level hint ─────────────────────────────────────────────────────

  it('renders group-level hint with correct ID', () => {
    render(<Radios name="test" hint="Group hint text" options={basicOptions} />)
    const hint = document.getElementById('test-hint')
    expect(hint).toBeInTheDocument()
    expect(hint).toHaveTextContent('Group hint text')
  })

  it('links fieldset to group hint via aria-describedby', () => {
    render(<Radios name="test" hint="Group hint text" options={basicOptions} />)
    const fieldset = document.querySelector('fieldset')
    expect(fieldset).toHaveAttribute('aria-describedby', 'test-hint')
  })

  it('links fieldset to both hint and error via aria-describedby', () => {
    render(<Radios name="test" hint="Hint" error="Error" options={basicOptions} />)
    const fieldset = document.querySelector('fieldset')
    expect(fieldset).toHaveAttribute('aria-describedby', 'test-hint test-error')
  })

  it('does not set aria-describedby on fieldset when no hint or error', () => {
    render(<Radios name="test" options={basicOptions} />)
    const fieldset = document.querySelector('fieldset')
    expect(fieldset).not.toHaveAttribute('aria-describedby')
  })

  // ── Per-option hints ─────────────────────────────────────────────────────

  it('renders per-option hint with correct ID', () => {
    const options: RadiosOption[] = [
      { value: 'yes', label: 'Yes', hint: 'Option hint text' },
    ]
    render(<Radios name="test" options={options} />)
    const hint = document.getElementById('test-1-item-hint')
    expect(hint).toBeInTheDocument()
    expect(hint).toHaveTextContent('Option hint text')
  })

  it('links input to per-option hint via aria-describedby', () => {
    const options: RadiosOption[] = [
      { value: 'yes', label: 'Yes', hint: 'Option hint text' },
    ]
    render(<Radios name="test" options={options} />)
    const input = screen.getByRole('radio', { name: 'Yes' })
    expect(input).toHaveAttribute('aria-describedby', 'test-1-item-hint')
  })

  it('does not set aria-describedby on input when option has no hint', () => {
    render(<Radios name="test" options={basicOptions} />)
    const inputs = screen.getAllByRole('radio')
    inputs.forEach((input) => {
      expect(input).not.toHaveAttribute('aria-describedby')
    })
  })

  // ── Error state ──────────────────────────────────────────────────────────

  it('renders error message with correct ID', () => {
    render(<Radios name="test" error="Select an option" options={basicOptions} />)
    const error = document.getElementById('test-error')
    expect(error).toBeInTheDocument()
    expect(error).toHaveTextContent('Select an option')
  })

  it('includes visually-hidden "Error:" prefix in error message', () => {
    render(<Radios name="test" error="Select an option" options={basicOptions} />)
    const hidden = document.querySelector('.govuk-visually-hidden')
    expect(hidden).toHaveTextContent('Error:')
  })

  it('applies govuk-form-group--error class when error is present', () => {
    render(<Radios name="test" error="Select an option" options={basicOptions} />)
    const formGroup = document.querySelector('.govuk-form-group')
    expect(formGroup).toHaveClass('govuk-form-group--error')
  })

  it('sets aria-invalid="true" on all inputs when error is present', () => {
    render(<Radios name="test" error="Select an option" options={basicOptions} />)
    const inputs = screen.getAllByRole('radio')
    inputs.forEach((input) => {
      expect(input).toHaveAttribute('aria-invalid', 'true')
    })
  })

  it('does not set aria-invalid when no error', () => {
    render(<Radios name="test" options={basicOptions} />)
    const inputs = screen.getAllByRole('radio')
    inputs.forEach((input) => {
      expect(input).not.toHaveAttribute('aria-invalid')
    })
  })

  // ── Dividers ─────────────────────────────────────────────────────────────

  it('renders string "or" as a divider', () => {
    const options: RadiosOption[] = [
      { value: 'yes', label: 'Yes' },
      'or',
      { value: 'no', label: 'No' },
    ]
    render(<Radios name="test" options={options} />)
    const divider = document.querySelector('.govuk-radios__divider')
    expect(divider).toBeInTheDocument()
    expect(divider).toHaveTextContent('or')
  })

  it('renders RadioDivider object with custom text', () => {
    const options: RadiosOption[] = [
      { value: 'yes', label: 'Yes' },
      { divider: 'or alternatively' },
      { value: 'no', label: 'No' },
    ]
    render(<Radios name="test" options={options} />)
    const divider = document.querySelector('.govuk-radios__divider')
    expect(divider).toBeInTheDocument()
    expect(divider).toHaveTextContent('or alternatively')
  })

  it('dividers do not affect option index numbering', () => {
    const options: RadiosOption[] = [
      { value: 'yes', label: 'Yes' },
      'or',
      { value: 'no', label: 'No' },
    ]
    render(<Radios name="test" options={options} />)
    expect(screen.getByRole('radio', { name: 'Yes' })).toHaveAttribute('id', 'test-1')
    expect(screen.getByRole('radio', { name: 'No' })).toHaveAttribute('id', 'test-2')
  })

  // ── Conditional reveal ───────────────────────────────────────────────────

  it('hides conditional content when option is not selected', () => {
    const options: RadiosOption[] = [
      { value: 'yes', label: 'Yes', conditional: <input type="text" id="extra" /> },
      { value: 'no', label: 'No' },
    ]
    render(<Radios name="test" options={options} />)
    const conditional = document.getElementById('test-1-conditional')
    expect(conditional).toHaveClass('govuk-radios__conditional--hidden')
  })

  it('shows conditional content when option is selected', () => {
    const options: RadiosOption[] = [
      { value: 'yes', label: 'Yes', conditional: <input type="text" id="extra" /> },
      { value: 'no', label: 'No' },
    ]
    render(<Radios name="test" defaultValue="yes" options={options} />)
    const conditional = document.getElementById('test-1-conditional')
    expect(conditional).not.toHaveClass('govuk-radios__conditional--hidden')
  })

  it('reveals conditional content on radio selection', () => {
    const options: RadiosOption[] = [
      { value: 'yes', label: 'Yes', conditional: <input type="text" id="extra" /> },
      { value: 'no', label: 'No' },
    ]
    render(<Radios name="test" options={options} />)
    const conditional = document.getElementById('test-1-conditional')
    expect(conditional).toHaveClass('govuk-radios__conditional--hidden')

    fireEvent.click(screen.getByRole('radio', { name: 'Yes' }))
    expect(conditional).not.toHaveClass('govuk-radios__conditional--hidden')
  })

  // ── Controlled mode ──────────────────────────────────────────────────────

  it('controlled mode: sets checked state from value prop', () => {
    render(<Radios name="test" value="yes" onChange={() => {}} options={basicOptions} />)
    expect(screen.getByRole('radio', { name: 'Yes' })).toBeChecked()
    expect(screen.getByRole('radio', { name: 'No' })).not.toBeChecked()
  })

  it('controlled mode: fires onChange with selected value', () => {
    const handleChange = jest.fn()
    render(<Radios name="test" value="yes" onChange={handleChange} options={basicOptions} />)
    fireEvent.click(screen.getByRole('radio', { name: 'No' }))
    expect(handleChange).toHaveBeenCalledWith('no')
  })

  it('uncontrolled mode: defaultValue sets initial checked state', () => {
    render(<Radios name="test" defaultValue="no" options={basicOptions} />)
    expect(screen.getByRole('radio', { name: 'No' })).toBeChecked()
    expect(screen.getByRole('radio', { name: 'Yes' })).not.toBeChecked()
  })

  // ── inline / small modifiers ─────────────────────────────────────────────

  it('applies govuk-radios--inline class when inline={true}', () => {
    render(<Radios name="test" inline={true} options={basicOptions} />)
    const radios = document.querySelector('.govuk-radios')
    expect(radios).toHaveClass('govuk-radios--inline')
  })

  it('does not apply govuk-radios--inline class by default', () => {
    render(<Radios name="test" options={basicOptions} />)
    const radios = document.querySelector('.govuk-radios')
    expect(radios).not.toHaveClass('govuk-radios--inline')
  })

  it('applies govuk-radios--small class when small={true}', () => {
    render(<Radios name="test" small={true} options={basicOptions} />)
    const radios = document.querySelector('.govuk-radios')
    expect(radios).toHaveClass('govuk-radios--small')
  })

  // ── Disabled ─────────────────────────────────────────────────────────────

  it('disables all inputs when disabled prop is true on RadiosProps', () => {
    render(<Radios name="test" disabled={true} options={basicOptions} />)
    const inputs = screen.getAllByRole('radio')
    inputs.forEach((input) => {
      expect(input).toBeDisabled()
    })
  })

  it('disables only the specified option when disabled is on RadioOption', () => {
    const options: RadiosOption[] = [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No', disabled: true },
    ]
    render(<Radios name="test" options={options} />)
    expect(screen.getByRole('radio', { name: 'Yes' })).not.toBeDisabled()
    expect(screen.getByRole('radio', { name: 'No' })).toBeDisabled()
  })
})
