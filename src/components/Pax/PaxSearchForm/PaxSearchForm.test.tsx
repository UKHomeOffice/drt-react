import React from 'react'
import moment from 'moment'
import { fireEvent, render, screen } from '../../TestProviderRenderer'
import { LocalDateProvider } from '../../Util/LocaleDateProvider'
import {
  PaxSearchForm,
  PaxSearchFormDay,
  PaxSearchFormPayload,
  PaxSearchFormTime,
} from './PaxSearchForm'

const arrivalDate = moment('2024-01-15T12:00:00')
const fromDate = arrivalDate.clone().startOf('day').add(8, 'hours')
const toDate = arrivalDate.clone().startOf('day').add(10, 'hours')

const renderForm = (
  onChange = jest.fn<void, [PaxSearchFormPayload]>(),
  time = PaxSearchFormTime.Range,
) => {
  render(
    <LocalDateProvider>
      <PaxSearchForm
        day={PaxSearchFormDay.Today}
        time={time}
        arrivalDate={arrivalDate.toDate()}
        fromDate={fromDate.toDate()}
        toDate={toDate.toDate()}
        timeMachine={false}
        onChange={onChange}
      />
    </LocalDateProvider>,
  )

  return onChange
}

describe('PaxSearchForm custom range selects', () => {
  it('renders accessible controlled GOV.UK selects with the existing option order and labels', () => {
    renderForm()

    const fromSelect = screen.getByRole('combobox', { name: 'From' })
    const toSelect = screen.getByRole('combobox', { name: 'To' })
    const fromOptions = screen.getAllByRole('option', { name: /^\d{2}:00$/ })
    const toOptions = screen.getAllByRole('option', { name: /^\d{2}:00 \(\+\d+ hours\)$/ })

    expect(fromSelect).toHaveAttribute('id', 'from-date')
    expect(fromSelect).toHaveAttribute('name', 'from-date')
    expect(fromSelect).toHaveValue(String(fromDate.valueOf()))
    expect(fromOptions).toHaveLength(24)
    expect(fromOptions.map((option) => option.textContent)).toEqual(
      Array.from({ length: 24 }, (_, hour) => `${String(hour).padStart(2, '0')}:00`),
    )

    expect(toSelect).toHaveAttribute('id', 'to-date')
    expect(toSelect).toHaveAttribute('name', 'to-date')
    expect(toSelect).toHaveValue(String(toDate.valueOf()))
    expect(toOptions).toHaveLength(28)
    expect(toOptions[0]).toHaveTextContent('09:00 (+1 hours)')
    expect(toOptions[27]).toHaveTextContent('12:00 (+28 hours)')
  })

  it('disables both selects unless Custom range is selected', () => {
    renderForm(undefined, PaxSearchFormTime.Day)

    expect(screen.getByRole('combobox', { name: 'From' })).toBeDisabled()
    expect(screen.getByRole('combobox', { name: 'To' })).toBeDisabled()

    fireEvent.click(screen.getByRole('button', { name: 'Custom' }))

    expect(screen.getByRole('combobox', { name: 'From' })).toBeEnabled()
    expect(screen.getByRole('combobox', { name: 'To' })).toBeEnabled()
  })

  it('adjusts To to one hour after a From value that is not before To and emits the full payload', () => {
    const onChange = renderForm()
    const nextFrom = arrivalDate.clone().startOf('day').add(10, 'hours')
    const adjustedTo = nextFrom.clone().add(1, 'hour')

    fireEvent.change(screen.getByRole('combobox', { name: 'From' }), {
      target: { value: String(nextFrom.valueOf()) },
    })

    expect(screen.getByRole('combobox', { name: 'From' })).toHaveValue(String(nextFrom.valueOf()))
    expect(screen.getByRole('combobox', { name: 'To' })).toHaveValue(String(adjustedTo.valueOf()))
    expect(onChange).toHaveBeenLastCalledWith(expect.objectContaining({
      day: PaxSearchFormDay.Today,
      time: PaxSearchFormTime.Range,
      fromDate: nextFrom.toDate(),
      toDate: adjustedTo.toDate(),
      timeMachine: false,
    }))
  })

  it('changes To without changing From and emits the full payload', () => {
    const onChange = renderForm()
    const nextTo = fromDate.clone().add(6, 'hours')

    fireEvent.change(screen.getByRole('combobox', { name: 'To' }), {
      target: { value: String(nextTo.valueOf()) },
    })

    expect(screen.getByRole('combobox', { name: 'From' })).toHaveValue(String(fromDate.valueOf()))
    expect(screen.getByRole('combobox', { name: 'To' })).toHaveValue(String(nextTo.valueOf()))
    expect(onChange).toHaveBeenLastCalledWith(expect.objectContaining({
      day: PaxSearchFormDay.Today,
      time: PaxSearchFormTime.Range,
      fromDate: fromDate.toDate(),
      toDate: nextTo.toDate(),
      timeMachine: false,
    }))
  })
})
