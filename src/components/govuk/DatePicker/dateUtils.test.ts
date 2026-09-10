import {
  addDays,
  addMonths,
  compareDates,
  formatDisplayDate,
  formatIsoDate,
  getMonthGrid,
  isDateWithinBounds,
  parseDisplayDate,
  parseIsoDate,
} from './dateUtils'

describe('dateUtils', () => {
  it('parses and formats valid ISO and display dates', () => {
    const date = parseIsoDate('2024-02-29')
    if (!date) throw new Error('Expected a valid date')
    expect(date).toEqual({ year: 2024, month: 2, day: 29 })
    expect(formatDisplayDate(date)).toBe('29/02/2024')
    const displayDate = parseDisplayDate('29/02/2024')
    if (!displayDate) throw new Error('Expected a valid display date')
    expect(formatIsoDate(displayDate)).toBe('2024-02-29')
  })

  it.each([
    ['1/8/2026', { year: 2026, month: 8, day: 1 }],
    ['01/8/2026', { year: 2026, month: 8, day: 1 }],
    ['1/08/2026', { year: 2026, month: 8, day: 1 }],
  ])('parses valid unpadded display date %s', (value, expected) => {
    expect(parseDisplayDate(value)).toEqual(expected)
  })

  it.each(['2023-02-29', '2024-13-01', '2024-00-01', '2024-2-01', 'not-a-date'])('rejects invalid ISO date %s', (value) => {
    expect(parseIsoDate(value)).toBeNull()
  })

  it.each(['29/02/2023', '31/04/2024', '31/13/2024', '1/1/24'])('rejects invalid display date %s', (value) => {
    expect(parseDisplayDate(value)).toBeNull()
  })

  it('handles month boundaries and clamps month-end dates', () => {
    expect(addDays({ year: 2024, month: 2, day: 29 }, 1)).toEqual({ year: 2024, month: 3, day: 1 })
    expect(addMonths({ year: 2024, month: 1, day: 31 }, 1)).toEqual({ year: 2024, month: 2, day: 29 })
  })

  it('compares dates and applies inclusive bounds', () => {
    const min = { year: 2024, month: 1, day: 1 }
    const max = { year: 2024, month: 12, day: 31 }
    expect(compareDates(min, max)).toBe(-1)
    expect(isDateWithinBounds(min, min, max)).toBe(true)
    expect(isDateWithinBounds(max, min, max)).toBe(true)
    expect(isDateWithinBounds({ year: 2023, month: 12, day: 31 }, min, max)).toBe(false)
  })

  it('creates a Monday-first six-week grid', () => {
    const grid = getMonthGrid(2024, 9)
    expect(grid).toHaveLength(42)
    expect(grid[0].isoDate).toBe('2024-08-26')
    expect(grid[0].isCurrentMonth).toBe(false)
    expect(grid[7].isoDate).toBe('2024-09-02')
  })
})
