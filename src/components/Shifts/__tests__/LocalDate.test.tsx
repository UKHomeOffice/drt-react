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
  describe('addDays', () => {
    it('should correctly add days within the same month', () => {
      const date = new LocalDate(2023, 10, 1, 10, 30);
      const newDate = date.addDays(1);
      expect(newDate.year).toBe(2023);
      expect(newDate.month).toBe(10);
      expect(newDate.day).toBe(2);
      expect(newDate.hour).toBe(10);
      expect(newDate.minute).toBe(30);
    });

    it('should correctly add days across month boundaries', () => {
      const date = new LocalDate(2023, 10, 28, 10, 30);
      const newDate = date.addDays(5);
      expect(newDate.year).toBe(2023);
      expect(newDate.month).toBe(11);
      expect(newDate.day).toBe(2);
      expect(newDate.hour).toBe(10);
      expect(newDate.minute).toBe(30);
    });

    it('should correctly add days across year boundaries', () => {
      const date = new LocalDate(2023, 12, 28, 10, 30);
      const newDate = date.addDays(5);
      expect(newDate.year).toBe(2024);
      expect(newDate.month).toBe(1);
      expect(newDate.day).toBe(2);
      expect(newDate.hour).toBe(10);
      expect(newDate.minute).toBe(30);
    });

    it('should correctly handle leap years', () => {
      const date = new LocalDate(2024, 2, 28, 10, 30);
      const newDate = date.addDays(2);
      expect(newDate.year).toBe(2024);
      expect(newDate.month).toBe(3);
      expect(newDate.day).toBe(1);
      expect(newDate.hour).toBe(10);
      expect(newDate.minute).toBe(30);
    });
  });
  describe('addMinutes', () => {
    it('should correctly add minutes within the same hour', () => {
      const date = new LocalDate(2023, 10, 1, 10, 30);
      const newDate = date.addMinutes(15);
      expect(newDate.year).toBe(2023);
      expect(newDate.month).toBe(10);
      expect(newDate.day).toBe(1);
      expect(newDate.hour).toBe(10);
      expect(newDate.minute).toBe(45);
    });

    it('should correctly add minutes across hour boundaries', () => {
      const date = new LocalDate(2023, 10, 1, 10, 45);
      const newDate = date.addMinutes(30);
      expect(newDate.year).toBe(2023);
      expect(newDate.month).toBe(10);
      expect(newDate.day).toBe(1);
      expect(newDate.hour).toBe(11);
      expect(newDate.minute).toBe(15);
    });

    it('should correctly add minutes across day boundaries', () => {
      const date = new LocalDate(2023, 10, 1, 23, 45);
      const newDate = date.addMinutes(30);
      expect(newDate.year).toBe(2023);
      expect(newDate.month).toBe(10);
      expect(newDate.day).toBe(2);
      expect(newDate.hour).toBe(0);
      expect(newDate.minute).toBe(15);
    });

    it('should correctly add minutes across month boundaries', () => {
      const date = new LocalDate(2023, 10, 31, 23, 45);
      const newDate = date.addMinutes(30);
      expect(newDate.year).toBe(2023);
      expect(newDate.month).toBe(11);
      expect(newDate.day).toBe(1);
      expect(newDate.hour).toBe(0);
      expect(newDate.minute).toBe(15);
    });

    it('should correctly add minutes across year boundaries', () => {
      const date = new LocalDate(2023, 12, 31, 23, 45);
      const newDate = date.addMinutes(30);
      expect(newDate.year).toBe(2024);
      expect(newDate.month).toBe(1);
      expect(newDate.day).toBe(1);
      expect(newDate.hour).toBe(0);
      expect(newDate.minute).toBe(15);
    });
  });
});