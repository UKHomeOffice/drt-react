export class LocalDate {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;

  constructor(year: number, month: number, day: number, hour: number, minute: number) {
    this.year = year;
    this.month = month;
    this.day = day;
    this.hour = hour;
    this.minute = minute;
  }

  static fromEpochMillis(epochMillis: number): LocalDate {
    const date = new Date(epochMillis);
    return new LocalDate(
      date.getFullYear(),
      date.getMonth() + 1, // Months are zero-based in JavaScript
      date.getDate(),
      date.getHours(),
      date.getMinutes()
    );
  }

  addDays(days: number): LocalDate {
    const date = new Date(this.year, this.month - 1, this.day + days, this.hour, this.minute);
    return new LocalDate(date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes());
  }

  addMinutes(minutes: number): LocalDate {
    const totalMinutes = this.minute + minutes;
    const newHour = this.hour + Math.floor(totalMinutes / 60);
    const newMinute = totalMinutes % 60;
    return new LocalDate(this.year, this.month, this.day, newHour, newMinute);
  }

  isBefore(other: LocalDate): boolean {
    if (this.year !== other.year) return this.year < other.year;
    if (this.month !== other.month) return this.month < other.month;
    if (this.day !== other.day) return this.day < other.day;
    if (this.hour !== other.hour) return this.hour < other.hour;
    return this.minute < other.minute;
  }

  equals(other: LocalDate): boolean {
    return this.year === other.year &&
      this.month === other.month &&
      this.day === other.day &&
      this.hour === other.hour &&
      this.minute === other.minute;
  }
}