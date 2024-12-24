import { LocalDate } from '../LocalDate';
import '@testing-library/jest-dom'
import moment from "moment/moment";

describe('LocalDate', () => {
  describe('isBefore', () => {
    it('should return true if the first date is before the second date', () => {
      const date1 = new LocalDate(2023, 10, 1, 10, 30);
      const date2 = new LocalDate(2023, 10, 1, 11, 30);
      expect(date1.isBefore(date2)).toBe(true);
    });

    it('should return false if the first date is after the second date', () => {
      const date1 = new LocalDate(2023, 10, 1, 12, 30);
      const date2 = new LocalDate(2023, 10, 1, 11, 30);
      expect(date1.isBefore(date2)).toBe(false);
    });

    it('should return false if the dates are the same', () => {
      const date1 = new LocalDate(2023, 10, 1, 11, 30);
      const date2 = new LocalDate(2023, 10, 1, 11, 30);
      expect(date1.isBefore(date2)).toBe(false);
    });

    it('should correctly compare dates with different years', () => {
      const date1 = new LocalDate(2022, 10, 1, 11, 30);
      const date2 = new LocalDate(2023, 10, 1, 11, 30);
      expect(date1.isBefore(date2)).toBe(true);
    });

    it('should correctly compare dates with different months', () => {
      const date1 = new LocalDate(2023, 9, 1, 11, 30);
      const date2 = new LocalDate(2023, 10, 1, 11, 30);
      expect(date1.isBefore(date2)).toBe(true);
    });

    it('should correctly compare dates with different days', () => {
      const date1 = new LocalDate(2023, 10, 1, 11, 30);
      const date2 = new LocalDate(2023, 10, 2, 11, 30);
      expect(date1.isBefore(date2)).toBe(true);
    });

    it('should correctly compare dates with different hours', () => {
      const date1 = new LocalDate(2023, 10, 1, 10, 30);
      const date2 = new LocalDate(2023, 10, 1, 11, 30);
      expect(date1.isBefore(date2)).toBe(true);
    });

    it('should correctly compare dates with different minutes', () => {
      const date1 = new LocalDate(2023, 10, 1, 11, 29);
      const date2 = new LocalDate(2023, 10, 1, 11, 30);
      expect(date1.isBefore(date2)).toBe(true);
    });

    it('should return false if the first date is after the second date', () => {
      const start = LocalDate.fromEpochMillis(moment('06:30', 'HH:mm').valueOf());
      const end = LocalDate.fromEpochMillis(moment('16:30', 'HH:mm').valueOf());
      expect(start.isBefore(end)).toBe(true);
    });

  });
});