import React, { useEffect, useId, useRef, useState } from 'react'
import './DatePicker.scss'
import {
  addDays,
  addMonths,
  addYears,
  compareDates,
  formatDisplayDate,
  formatIsoDate,
  getMonthGrid,
  hasDisplayDateFormat,
  isDateWithinBounds,
  parseDisplayDate,
  parseIsoDate,
  type CalendarDate,
  type IsoDate,
} from './dateUtils'

export type { IsoDate } from './dateUtils'

export interface DatePickerProps {
  id: string
  name?: string
  label: React.ReactNode
  hint?: React.ReactNode
  error?: React.ReactNode
  value?: IsoDate | null
  defaultValue?: IsoDate | null
  onChange?: (value: IsoDate | null) => void
  onBlur?: () => void
  required?: boolean
  disabled?: boolean
  readOnly?: boolean
  minDate?: IsoDate
  maxDate?: IsoDate
  className?: string
  inputClassName?: string
  formGroupClassName?: string
}

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const WEEKDAY_NAMES = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const DEFAULT_HINT = 'For example, 27/08/2026'

function today(): CalendarDate {
  const date = new Date()
  return { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() }
}

function joinClasses(...classes: Array<string | undefined | false>): string | undefined {
  const result = classes.filter(Boolean).join(' ')
  return result || undefined
}

const NavigationIcon: React.FC<{ direction: 'previous' | 'next', year?: boolean }> = ({ direction, year = false }) => {
  const points = direction === 'previous' ? '25,13 19,20 25,27' : '19,13 25,20 19,27'
  const secondPoints = direction === 'previous' ? '19,13 13,20 19,27' : '25,13 31,20 25,27'
  return (
    <svg width="44" height="40" viewBox="0 0 44 40" fill="none" focusable="false" aria-hidden="true">
      <polyline points={points} stroke="currentColor" strokeWidth="2" fill="none" />
      {year && <polyline points={secondPoints} stroke="currentColor" strokeWidth="2" fill="none" />}
    </svg>
  )
}

/**
 * MOJ-style, GOV.UK-compatible date-only picker.
 *
 * Uses `YYYY-MM-DD` for committed values and a padded `DD/MM/YYYY` text input.
 * It supports manual entry as well as a keyboard-accessible calendar dialog,
 * without depending on MUI, Moment, Day.js, or MOJ's DOM-mutating JavaScript.
 */
export const DatePicker: React.FC<DatePickerProps> = ({
  id,
  name,
  label,
  hint,
  error: hostError,
  value: controlledValue,
  defaultValue,
  onChange,
  onBlur,
  required = false,
  disabled = false,
  readOnly = false,
  minDate: minDateValue,
  maxDate: maxDateValue,
  className,
  inputClassName,
  formGroupClassName,
}) => {
  const generatedId = useId().replace(/:/g, '')
  const dialogId = `${id}-calendar-${generatedId}`
  const hintId = `${id}-hint`
  const errorId = `${id}-error`
  const toggleRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const isControlled = controlledValue !== undefined
  const committedValue = isControlled ? controlledValue ?? null : undefined
  const [internalValue, setInternalValue] = useState<IsoDate | null>(defaultValue ?? null)
  const selectedValue = isControlled ? committedValue : internalValue
  const [rawValue, setRawValue] = useState(() => {
    const parsed = selectedValue ? parseIsoDate(selectedValue) : null
    return parsed ? formatDisplayDate(parsed) : ''
  })
  const [inputError, setInputError] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const [viewDate, setViewDate] = useState<CalendarDate>(() => parseIsoDate(selectedValue ?? '') ?? today())
  const [focusedDate, setFocusedDate] = useState<CalendarDate>(() => parseIsoDate(selectedValue ?? '') ?? today())
  const minDate = minDateValue ? parseIsoDate(minDateValue) : undefined
  const maxDate = maxDateValue ? parseIsoDate(maxDateValue) : undefined
  const configError = minDateValue && !minDate || maxDateValue && !maxDate || minDate && maxDate && compareDates(minDate, maxDate) > 0
  const selectedDate = selectedValue ? parseIsoDate(selectedValue) : null
  const selectedValueError = selectedDate && !isDateWithinBounds(selectedDate, minDate ?? undefined, maxDate ?? undefined)
    ? minDate && compareDates(selectedDate, minDate) < 0
      ? `Date must be on or after ${formatDisplayDate(minDate)}`
      : maxDate ? `Date must be on or before ${formatDisplayDate(maxDate)}` : null
    : null
  const visibleError = hostError || inputError || selectedValueError
  const effectiveHint = hint ?? DEFAULT_HINT
  const describedBy = [effectiveHint ? hintId : null, visibleError ? errorId : null].filter(Boolean).join(' ')

  useEffect(() => {
    if (!isControlled) return
    const parsed = controlledValue ? parseIsoDate(controlledValue) : null
    setRawValue(parsed ? formatDisplayDate(parsed) : '')
  }, [controlledValue, isControlled])

  useEffect(() => {
    if (!open) return
    const handleOutsideClick = (event: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target as Node) && !toggleRef.current?.contains(event.target as Node)) {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [open])

  useEffect(() => {
    if (!open) return
    const target = dialogRef.current?.querySelector<HTMLButtonElement>(`[data-date="${formatIsoDate(focusedDate)}"]`)
    target?.focus()
  }, [open, focusedDate, viewDate])

  const commit = (nextValue: IsoDate | null) => {
    const hasChanged = nextValue !== selectedValue
    if (!isControlled) setInternalValue(nextValue)
    const parsed = nextValue ? parseIsoDate(nextValue) : null
    setRawValue(parsed ? formatDisplayDate(parsed) : '')
    setInputError(null)
    if (hasChanged) onChange?.(nextValue)
  }

  const validateAndCommit = (text: string): boolean => {
    if (!text.trim()) {
      commit(null)
      return true
    }
    const parsed = parseDisplayDate(text)
    if (!parsed) {
      setInputError(hasDisplayDateFormat(text) ? 'Enter a real date' : 'Enter a date in the format DD/MM/YYYY')
      return false
    }
    if (!isDateWithinBounds(parsed, minDate ?? undefined, maxDate ?? undefined)) {
      setInputError(minDate && compareDates(parsed, minDate) < 0
        ? `Date must be on or after ${formatDisplayDate(minDate)}`
        : maxDate ? `Date must be on or before ${formatDisplayDate(maxDate)}` : 'Enter a valid date')
      return false
    }
    commit(formatIsoDate(parsed))
    return true
  }

  const getInitialCalendarDate = (): CalendarDate | null => {
    const parsed = parseDisplayDate(rawValue) ?? parseIsoDate(selectedValue ?? '')
    const candidate = parsed ?? today()
    if (isDateWithinBounds(candidate, minDate ?? undefined, maxDate ?? undefined)) return candidate
    if (minDate && compareDates(candidate, minDate) < 0) return minDate
    if (maxDate && compareDates(candidate, maxDate) > 0) return maxDate
    return null
  }

  const openCalendar = () => {
    if (disabled || readOnly || configError) return
    if (rawValue.trim() && !validateAndCommit(rawValue)) return
    const initial = getInitialCalendarDate()
    if (!initial) return
    setFocusedDate(initial)
    setViewDate({ year: initial.year, month: initial.month, day: 1 })
    setOpen(true)
  }

  const closeCalendar = (restoreFocus = true) => {
    setOpen(false)
    if (restoreFocus) toggleRef.current?.focus()
  }

  const moveFocus = (date: CalendarDate) => {
    const bounded = isDateWithinBounds(date, minDate ?? undefined, maxDate ?? undefined)
    if (!bounded) return
    setFocusedDate(date)
    if (date.month !== viewDate.month || date.year !== viewDate.year) setViewDate({ year: date.year, month: date.month, day: 1 })
  }

  const navigateCalendar = (amount: number, unit: 'month' | 'year') => {
    const firstOfMonth = { ...focusedDate, day: 1 }
    const next = unit === 'month' ? addMonths(firstOfMonth, amount) : addYears(firstOfMonth, amount)
    moveFocus(next)
  }

  const selectDate = (date: CalendarDate) => {
    if (readOnly || !isDateWithinBounds(date, minDate ?? undefined, maxDate ?? undefined)) return
    commit(formatIsoDate(date))
    closeCalendar()
  }

  const handleDayKeyDown = (event: React.KeyboardEvent, date: CalendarDate) => {
    let next: CalendarDate | null = null
    if (event.key === 'ArrowLeft') next = addDays(date, -1)
    if (event.key === 'ArrowRight') next = addDays(date, 1)
    if (event.key === 'ArrowUp') next = addDays(date, -7)
    if (event.key === 'ArrowDown') next = addDays(date, 7)
    if (event.key === 'Home') next = addDays(date, -(dateToWeekday(date)))
    if (event.key === 'End') next = addDays(date, 6 - dateToWeekday(date))
    if (event.key === 'PageUp') next = event.shiftKey ? addYears(date, -1) : addMonths(date, -1)
    if (event.key === 'PageDown') next = event.shiftKey ? addYears(date, 1) : addMonths(date, 1)
    if (event.key === 'Escape') {
      event.preventDefault()
      closeCalendar()
      return
    }
    if (next) {
      event.preventDefault()
      moveFocus(next)
    }
  }

  const handleDialogKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      closeCalendar()
      return
    }
    if (event.key !== 'Tab' || !dialogRef.current) return
    const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('button:not(:disabled), [href], input:not(:disabled)'))
    if (!focusable.length) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  const grid = getMonthGrid(viewDate.year, viewDate.month)
  const todayValue = formatIsoDate(today())
  const formGroupClasses = joinClasses('govuk-form-group', 'drt-date-picker', visibleError ? 'govuk-form-group--error' : false, formGroupClassName)

  return (
    <div className={formGroupClasses}>
      <label className="govuk-label" htmlFor={id}>{label}</label>
      {effectiveHint && <div id={hintId} className="govuk-hint">{effectiveHint}</div>}
      {visibleError && <p id={errorId} className="govuk-error-message"><span className="govuk-visually-hidden">Error:</span>{visibleError}</p>}
      <div className={joinClasses('moj-datepicker', className)}>
        <div className="moj-datepicker__wrapper">
          <input
            id={id}
            name={name ?? id}
            className={joinClasses('govuk-input', 'moj-datepicker__input', inputClassName)}
            value={rawValue}
            onChange={(event) => { setRawValue(event.target.value); setInputError(null) }}
            onBlur={() => { validateAndCommit(rawValue); onBlur?.() }}
            onKeyDown={(event) => { if (event.key === 'Enter') { event.preventDefault(); validateAndCommit(rawValue) } }}
            aria-describedby={describedBy || undefined}
            aria-invalid={visibleError ? true : undefined}
            required={required}
            disabled={disabled}
            readOnly={readOnly}
            autoComplete="off"
          />
            <button ref={toggleRef} className="moj-datepicker__toggle" type="button" aria-label={`Choose ${typeof label === 'string' ? label.toLowerCase() : 'date'}`} aria-haspopup="dialog" aria-controls={dialogId} aria-expanded={open} disabled={disabled || readOnly} onClick={() => open ? closeCalendar(false) : openCalendar()}>
            <svg width="32" height="24" viewBox="0 0 22 22" aria-hidden="true" focusable="false">
              <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M16.1333 2.93333H5.86668V4.4C5.86668 5.21002 5.21003 5.86667 4.40002 5.86667C3.59 5.86667 2.93335 5.21002 2.93335 4.4V2.93333H2C.895 2.93333 0 3.829 0 4.933V19.267c0 1.104.895 2 2 2h18c1.105 0 2-.896 2-2V4.933c0-1.104-.895-2-2-2h-.933V4.4c0 .81-.657 1.467-1.467 1.467s-1.467-.657-1.467-1.467V2.933ZM20.533 8.067H1.467V18.8c0 .552.447 1 1 1h17.066c.553 0 1-.448 1-1V8.067Z" />
              <rect x="3.667" width="1.467" height="5.133" rx=".733" fill="currentColor" />
              <rect x="16.867" width="1.467" height="5.133" rx=".733" fill="currentColor" />
            </svg>
          </button>
        </div>
        {open && <div ref={dialogRef} id={dialogId} className="moj-datepicker__dialog" role="dialog" aria-modal="true" aria-labelledby={`${dialogId}-heading`} onKeyDown={handleDialogKeyDown}>
          <div className="moj-datepicker__dialog-header">
            <div className="moj-datepicker__dialog-navbuttons">
              <button className="moj-datepicker__button" type="button" onClick={() => navigateCalendar(-1, 'year')} aria-label="Previous year"><NavigationIcon direction="previous" year /></button>
              <button className="moj-datepicker__button" type="button" onClick={() => navigateCalendar(-1, 'month')} aria-label="Previous month"><NavigationIcon direction="previous" /></button>
            </div>
            <h2 id={`${dialogId}-heading`} className="moj-datepicker__dialog-title">{MONTH_NAMES[viewDate.month - 1]} {viewDate.year}</h2>
            <div className="moj-datepicker__dialog-navbuttons">
              <button className="moj-datepicker__button" type="button" onClick={() => navigateCalendar(1, 'month')} aria-label="Next month"><NavigationIcon direction="next" /></button>
              <button className="moj-datepicker__button" type="button" onClick={() => navigateCalendar(1, 'year')} aria-label="Next year"><NavigationIcon direction="next" year /></button>
            </div>
          </div>
          <table className="moj-datepicker__calendar" aria-labelledby={`${dialogId}-heading`}>
            <thead><tr>{WEEKDAY_NAMES.map((day) => <th key={day} scope="col"><span aria-hidden="true">{day.slice(0, 3)}</span><span className="govuk-visually-hidden">{day}</span></th>)}</tr></thead>
            <tbody>{Array.from({ length: 6 }, (_, row) => <tr key={row}>{grid.slice(row * 7, row * 7 + 7).map((date) => {
              const available = !readOnly && isDateWithinBounds(date, minDate ?? undefined, maxDate ?? undefined)
              const current = selectedValue === date.isoDate
              const isToday = todayValue === date.isoDate
              const isFocused = focusedDate.year === date.year && focusedDate.month === date.month && focusedDate.day === date.day
              return <td key={date.isoDate}><button type="button" data-date={date.isoDate} className={joinClasses('moj-datepicker__button', 'moj-datepicker__calendar-day', isFocused && 'moj-datepicker__button--selected', current && 'moj-datepicker__button--current', isToday && 'moj-datepicker__button--today')} aria-label={`${WEEKDAY_NAMES[dateToWeekday(date)]} ${date.day} ${MONTH_NAMES[date.month - 1]} ${date.year}${isToday ? ', today' : ''}`} aria-current={current ? 'date' : undefined} aria-disabled={!available} disabled={!available} hidden={!date.isCurrentMonth} tabIndex={isFocused ? 0 : -1} onKeyDown={(event) => handleDayKeyDown(event, date)} onClick={() => selectDate(date)}>{date.day}</button></td>
            })}</tr>)}</tbody>
          </table>
          <div className="govuk-button-group moj-datepicker__actions"><button type="button" className="govuk-button" disabled={readOnly || !isDateWithinBounds(focusedDate, minDate ?? undefined, maxDate ?? undefined)} onClick={() => selectDate(focusedDate)}>Select</button><button type="button" className="govuk-button govuk-button--secondary" onClick={() => closeCalendar()}>Close</button></div>
        </div>}
      </div>
      {configError && <span className="govuk-visually-hidden">The date picker bounds are invalid.</span>}
    </div>
  )
}

function dateToWeekday(date: CalendarDate): number {
  const utcDate = new Date(0)
  utcDate.setUTCFullYear(date.year, date.month - 1, date.day)
  utcDate.setUTCHours(0, 0, 0, 0)
  const sundayFirst = utcDate.getUTCDay()
  return (sundayFirst + 6) % 7
}

export default DatePicker
