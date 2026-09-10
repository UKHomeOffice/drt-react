import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { DatePicker } from './DatePicker'

describe('DatePicker', () => {
  it('renders an associated input, hint, and default format guidance', () => {
    render(<DatePicker id="arrival-date" label="Arrival date" />)
    expect(screen.getByLabelText('Arrival date')).toHaveAttribute('id', 'arrival-date')
    expect(screen.getByText('For example, 27/08/2026')).toBeInTheDocument()
    expect(screen.getByLabelText('Arrival date')).toHaveAttribute('aria-describedby', 'arrival-date-hint')
  })

  it('does not render or describe an intentionally suppressed hint', () => {
    render(<DatePicker id="date" label="Date" hint="" />)
    expect(document.getElementById('date-hint')).not.toBeInTheDocument()
    expect(screen.getByLabelText('Date')).not.toHaveAttribute('aria-describedby')
  })

  it('renders host errors with invalid state and precedence over parser errors', () => {
    render(<DatePicker id="date" label="Date" error="Choose a date" />)
    expect(screen.getByText('Choose a date')).toBeInTheDocument()
    expect(screen.getByLabelText('Date')).toHaveAttribute('aria-invalid', 'true')
    fireEvent.change(screen.getByLabelText('Date'), { target: { value: 'bad' } })
    fireEvent.blur(screen.getByLabelText('Date'))
    expect(screen.getByText('Choose a date')).toBeInTheDocument()
    expect(screen.queryByText('Enter a date in the format DD/MM/YYYY')).not.toBeInTheDocument()
  })

  it('uses custom form props and describes the input with hint and visible error', () => {
    render(<DatePicker id="date" name="arrival" label="Date" hint="Use a UK date" error="Choose a date" className="picker" inputClassName="input" formGroupClassName="group" />)
    const input = screen.getByLabelText('Date')
    expect(input).toHaveAttribute('name', 'arrival')
    expect(input).toHaveAttribute('aria-describedby', 'date-hint date-error')
    expect(input).toHaveClass('input')
    expect(input.closest('.govuk-form-group')).toHaveClass('drt-date-picker', 'group', 'govuk-form-group--error')
    expect(input.closest('.moj-datepicker')).toHaveClass('picker')
  })

  it('commits valid text in canonical ISO format and preserves invalid text', () => {
    const onChange = jest.fn()
    render(<DatePicker id="date" label="Date" onChange={onChange} />)
    const input = screen.getByLabelText('Date')
    fireEvent.change(input, { target: { value: '27/08/2026' } })
    fireEvent.blur(input)
    expect(onChange).toHaveBeenCalledWith('2026-08-27')
    fireEvent.change(input, { target: { value: '31/02/2026' } })
    fireEvent.blur(input)
    expect(input).toHaveValue('31/02/2026')
    expect(screen.getByText('Enter a real date')).toBeInTheDocument()
  })

  it('accepts unpadded UK input and normalises it to padded display text', () => {
    const onChange = jest.fn()
    render(<DatePicker id="date" label="Date" onChange={onChange} />)
    const input = screen.getByLabelText('Date')
    fireEvent.change(input, { target: { value: '1/8/2026' } })
    fireEvent.blur(input)
    expect(onChange).toHaveBeenCalledWith('2026-08-01')
    expect(input).toHaveValue('01/08/2026')
  })

  it('reports an impossible unpadded date as not a real date', () => {
    render(<DatePicker id="date" label="Date" />)
    const input = screen.getByLabelText('Date')
    fireEvent.change(input, { target: { value: '31/4/2026' } })
    fireEvent.blur(input)
    expect(input).toHaveValue('31/4/2026')
    expect(screen.getByText('Enter a real date')).toBeInTheDocument()
  })

  it('retains invalid text and its validation error instead of opening the calendar', () => {
    render(<DatePicker id="date" label="Date" />)
    const input = screen.getByLabelText('Date')
    fireEvent.change(input, { target: { value: '31/02/2026' } })
    fireEvent.click(screen.getByRole('button', { name: 'Choose date' }))
    expect(input).toHaveValue('31/02/2026')
    expect(screen.getByText('Enter a real date')).toBeInTheDocument()
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('supports clearing and uncontrolled default values', () => {
    const onChange = jest.fn()
    render(<DatePicker id="date" label="Date" defaultValue="2026-08-27" onChange={onChange} />)
    const input = screen.getByLabelText('Date')
    expect(input).toHaveValue('27/08/2026')
    fireEvent.change(input, { target: { value: '' } })
    fireEvent.blur(input)
    expect(onChange).toHaveBeenCalledWith(null)
    expect(input).toHaveValue('')
  })

  it('updates controlled values from the parent, including null', () => {
    const { rerender } = render(<DatePicker id="date" label="Date" value="2026-08-27" />)
    expect(screen.getByLabelText('Date')).toHaveValue('27/08/2026')
    rerender(<DatePicker id="date" label="Date" value="2026-09-01" />)
    expect(screen.getByLabelText('Date')).toHaveValue('01/09/2026')
    rerender(<DatePicker id="date" label="Date" value={null} />)
    expect(screen.getByLabelText('Date')).toHaveValue('')
  })

  it('opens the calendar without emitting an unchanged controlled value after input blur', () => {
    const onChange = jest.fn()
    render(<DatePicker id="date" label="Date" value="2026-09-01" onChange={onChange} />)
    const input = screen.getByLabelText('Date')
    fireEvent.focus(input)
    fireEvent.blur(input)
    fireEvent.click(screen.getByRole('button', { name: 'Choose date' }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(onChange).not.toHaveBeenCalled()
  })

  it('retains an incoming out-of-bounds value and displays a component bounds error', () => {
    const onChange = jest.fn()
    render(<DatePicker id="date" label="Date" defaultValue="2025-12-31" minDate="2026-01-01" onChange={onChange} />)
    expect(screen.getByLabelText('Date')).toHaveValue('31/12/2025')
    expect(screen.getByText('Date must be on or after 01/01/2026')).toBeInTheDocument()
    expect(onChange).not.toHaveBeenCalled()
  })

  it('retains a controlled value that becomes out of bounds without emitting a change', () => {
    const onChange = jest.fn()
    const { rerender } = render(<DatePicker id="date" label="Date" value="2026-01-10" onChange={onChange} />)
    rerender(<DatePicker id="date" label="Date" value="2026-01-10" minDate="2026-01-11" onChange={onChange} />)
    expect(screen.getByLabelText('Date')).toHaveValue('10/01/2026')
    expect(screen.getByText('Date must be on or after 11/01/2026')).toBeInTheDocument()
    expect(onChange).not.toHaveBeenCalled()
  })

  it('opens the calendar and immediately selects a clicked date', () => {
    const onChange = jest.fn()
    render(<DatePicker id="date" label="Date" defaultValue="2026-08-27" onChange={onChange} />)
    fireEvent.click(screen.getByRole('button', { name: 'Choose date' }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /^Thursday 27 August 2026/ })).toHaveClass('moj-datepicker__button--selected')
    expect(screen.getByRole('button', { name: /^Thursday 27 August 2026/ })).toHaveAttribute('aria-current', 'date')
    fireEvent.click(screen.getByRole('button', { name: /^Friday 28 August 2026/ }))
    expect(onChange).toHaveBeenCalledWith('2026-08-28')
    expect(screen.getByLabelText('Date')).toHaveValue('28/08/2026')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('hides dates outside the displayed month like the MOJ calendar', () => {
    render(<DatePicker id="date" label="Date" defaultValue="2026-08-27" />)
    fireEvent.click(screen.getByRole('button', { name: 'Choose date' }))
    expect(screen.queryByRole('button', { name: 'Monday 27 July 2026' })).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Saturday 1 August 2026' })).toBeInTheDocument()
  })

  it('visually hides full weekday names while exposing them to assistive technology', () => {
    render(<DatePicker id="date" label="Date" defaultValue="2026-08-27" />)
    fireEvent.click(screen.getByRole('button', { name: 'Choose date' }))
    expect(screen.getByText('Monday')).toHaveClass('govuk-visually-hidden')
    expect(screen.getByText('Mon')).toHaveAttribute('aria-hidden', 'true')
  })

  it('supports escape close and focus restoration', () => {
    render(<DatePicker id="date" label="Date" />)
    const toggle = screen.getByRole('button', { name: 'Choose date' })
    fireEvent.click(toggle)
    const firstDay = screen.getAllByRole('button').find((button) => button.hasAttribute('data-date'))
    if (!firstDay) throw new Error('Expected the calendar to contain a day button')
    fireEvent.keyDown(firstDay, { key: 'Escape' })
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(toggle).toHaveFocus()
  })

  it('closes with Escape from a dialog navigation button and restores toggle focus', () => {
    render(<DatePicker id="date" label="Date" />)
    const toggle = screen.getByRole('button', { name: 'Choose date' })
    fireEvent.click(toggle)
    const previousMonth = screen.getByRole('button', { name: 'Previous month' })
    previousMonth.focus()
    fireEvent.keyDown(previousMonth, { key: 'Escape' })
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(toggle).toHaveFocus()
  })

  it('initially focuses the nearest selectable bound when today is unavailable', () => {
    render(<DatePicker id="date" label="Date" minDate="2099-01-01" />)
    fireEvent.click(screen.getByRole('button', { name: 'Choose date' }))
    const minimumDate = screen.getByRole('button', { name: /^Thursday 1 January 2099/ })
    expect(minimumDate).toHaveAttribute('tabindex', '0')
    expect(minimumDate).not.toBeDisabled()
    expect(minimumDate).toHaveFocus()
  })

  it('does not open or change a read-only picker from the calendar toggle', () => {
    const onChange = jest.fn()
    render(<DatePicker id="date" label="Date" defaultValue="2026-08-27" readOnly onChange={onChange} />)
    const toggle = screen.getByRole('button', { name: 'Choose date' })
    expect(toggle).toBeDisabled()
    fireEvent.click(toggle)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(onChange).not.toHaveBeenCalled()
  })

  it('rejects typed values outside inclusive bounds', () => {
    render(<DatePicker id="date" label="Date" minDate="2026-01-01" maxDate="2026-12-31" />)
    const input = screen.getByLabelText('Date')
    fireEvent.change(input, { target: { value: '31/12/2025' } })
    fireEvent.blur(input)
    expect(screen.getByText('Date must be on or after 01/01/2026')).toBeInTheDocument()
    fireEvent.change(input, { target: { value: '01/01/2027' } })
    fireEvent.blur(input)
    expect(screen.getByText('Date must be on or before 31/12/2026')).toBeInTheDocument()
  })

  it('disables unavailable calendar dates while allowing inclusive bounds', () => {
    const onChange = jest.fn()
    render(<DatePicker id="date" label="Date" minDate="2026-01-10" maxDate="2026-01-20" onChange={onChange} />)
    fireEvent.click(screen.getByRole('button', { name: 'Choose date' }))
    const unavailable = screen.getByRole('button', { name: 'Friday 9 January 2026' })
    expect(unavailable).toBeDisabled()
    fireEvent.click(unavailable)
    expect(onChange).not.toHaveBeenCalled()
    fireEvent.click(screen.getByRole('button', { name: 'Saturday 10 January 2026' }))
    expect(onChange).toHaveBeenCalledWith('2026-01-10')
  })

  it('closes after an outside click and restores focus to the toggle', () => {
    render(<DatePicker id="date" label="Date" />)
    const toggle = screen.getByRole('button', { name: 'Choose date' })
    fireEvent.click(toggle)
    fireEvent.mouseDown(document.body)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(toggle).toHaveFocus()
  })

  it('cycles Tab focus within the dialog', () => {
    render(<DatePicker id="date" label="Date" />)
    fireEvent.click(screen.getByRole('button', { name: 'Choose date' }))
    const first = screen.getByRole('button', { name: 'Previous year' })
    const last = screen.getByRole('button', { name: 'Close' })
    last.focus()
    fireEvent.keyDown(last, { key: 'Tab' })
    expect(first).toHaveFocus()
    fireEvent.keyDown(first, { key: 'Tab', shiftKey: true })
    expect(last).toHaveFocus()
  })

  it('supports day, week, month, and year keyboard navigation', () => {
    render(<DatePicker id="date" label="Date" defaultValue="2026-01-15" />)
    fireEvent.click(screen.getByRole('button', { name: 'Choose date' }))
    const day = screen.getByRole('button', { name: 'Thursday 15 January 2026' })
    fireEvent.keyDown(day, { key: 'ArrowRight' })
    expect(screen.getByRole('button', { name: 'Friday 16 January 2026' })).toHaveFocus()
    fireEvent.keyDown(document.activeElement as Element, { key: 'Home' })
    expect(screen.getByRole('button', { name: 'Monday 12 January 2026' })).toHaveFocus()
    fireEvent.keyDown(document.activeElement as Element, { key: 'End' })
    expect(screen.getByRole('button', { name: 'Sunday 18 January 2026' })).toHaveFocus()
    fireEvent.keyDown(document.activeElement as Element, { key: 'PageDown' })
    expect(screen.getByRole('button', { name: 'Wednesday 18 February 2026' })).toHaveFocus()
    fireEvent.keyDown(document.activeElement as Element, { key: 'PageDown', shiftKey: true })
    expect(screen.getByRole('button', { name: 'Thursday 18 February 2027' })).toHaveFocus()
  })

  it('prevents interaction when disabled', () => {
    const onChange = jest.fn()
    render(<DatePicker id="date" label="Date" disabled onChange={onChange} />)
    expect(screen.getByLabelText('Date')).toBeDisabled()
    const toggle = screen.getByRole('button', { name: 'Choose date' })
    expect(toggle).toBeDisabled()
    fireEvent.click(toggle)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(onChange).not.toHaveBeenCalled()
  })
})
