export type IsoDate = string

export interface CalendarDate {
  year: number
  month: number
  day: number
}

export interface CalendarDay extends CalendarDate {
  isoDate: IsoDate
  isCurrentMonth: boolean
}

const ISO_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/
const DISPLAY_DATE_PATTERN = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/

export function isLeapYear(year: number): boolean {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)
}

export function daysInMonth(year: number, month: number): number {
  if (month < 1 || month > 12) return 0
  if (month === 2) return isLeapYear(year) ? 29 : 28
  return [4, 6, 9, 11].includes(month) ? 30 : 31
}

export function isValidCalendarDate(date: CalendarDate): boolean {
  return Number.isInteger(date.year) && date.year >= 1 &&
    Number.isInteger(date.month) && date.month >= 1 && date.month <= 12 &&
    Number.isInteger(date.day) && date.day >= 1 && date.day <= daysInMonth(date.year, date.month)
}

export function parseIsoDate(value: string): CalendarDate | null {
  const match = ISO_DATE_PATTERN.exec(value)
  if (!match) return null
  const date = { year: Number(match[1]), month: Number(match[2]), day: Number(match[3]) }
  return isValidCalendarDate(date) ? date : null
}

export function formatIsoDate(date: CalendarDate): IsoDate {
  if (!isValidCalendarDate(date)) throw new Error('Cannot format an invalid calendar date')
  return `${String(date.year).padStart(4, '0')}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}`
}

export function parseDisplayDate(value: string): CalendarDate | null {
  const match = DISPLAY_DATE_PATTERN.exec(value)
  if (!match) return null
  const date = { year: Number(match[3]), month: Number(match[2]), day: Number(match[1]) }
  return isValidCalendarDate(date) ? date : null
}

export function hasDisplayDateFormat(value: string): boolean {
  return DISPLAY_DATE_PATTERN.test(value)
}

export function formatDisplayDate(date: CalendarDate): string {
  if (!isValidCalendarDate(date)) throw new Error('Cannot format an invalid calendar date')
  return `${String(date.day).padStart(2, '0')}/${String(date.month).padStart(2, '0')}/${String(date.year).padStart(4, '0')}`
}

export function compareDates(left: CalendarDate, right: CalendarDate): -1 | 0 | 1 {
  const leftValue = left.year * 10000 + left.month * 100 + left.day
  const rightValue = right.year * 10000 + right.month * 100 + right.day
  return leftValue < rightValue ? -1 : leftValue > rightValue ? 1 : 0
}

function toUtcDayNumber(date: CalendarDate): number {
  const utcDate = new Date(0)
  utcDate.setUTCFullYear(date.year, date.month - 1, date.day)
  utcDate.setUTCHours(0, 0, 0, 0)
  return Math.floor(utcDate.getTime() / 86400000)
}

function fromUtcDayNumber(dayNumber: number): CalendarDate {
  const date = new Date(dayNumber * 86400000)
  return { year: date.getUTCFullYear(), month: date.getUTCMonth() + 1, day: date.getUTCDate() }
}

export function addDays(date: CalendarDate, days: number): CalendarDate {
  return fromUtcDayNumber(toUtcDayNumber(date) + days)
}

export function addMonths(date: CalendarDate, months: number): CalendarDate {
  const monthIndex = date.year * 12 + date.month - 1 + months
  const year = Math.floor(monthIndex / 12)
  const month = monthIndex - year * 12 + 1
  return { year, month, day: Math.min(date.day, daysInMonth(year, month)) }
}

export function addYears(date: CalendarDate, years: number): CalendarDate {
  const year = date.year + years
  return { year, month: date.month, day: Math.min(date.day, daysInMonth(year, date.month)) }
}

export function getMonthGrid(year: number, month: number): CalendarDay[] {
  const first = { year, month, day: 1 }
  const firstDate = new Date(0)
  firstDate.setUTCFullYear(year, month - 1, 1)
  firstDate.setUTCHours(0, 0, 0, 0)
  const firstWeekday = firstDate.getUTCDay()
  const mondayFirstOffset = (firstWeekday + 6) % 7
  const start = addDays(first, -mondayFirstOffset)
  return Array.from({ length: 42 }, (_, index) => {
    const date = addDays(start, index)
    return { ...date, isoDate: formatIsoDate(date), isCurrentMonth: date.month === month }
  })
}

export function isDateWithinBounds(date: CalendarDate, min?: CalendarDate, max?: CalendarDate): boolean {
  return (!min || compareDates(date, min) >= 0) && (!max || compareDates(date, max) <= 0)
}
