import {LocalDate} from "./LocalDate";
import moment from "moment/moment";
import {ShiftSummary, StaffTableEntry} from "./ShiftHotTableView";

export const generateShiftAssignments = (shiftSummary: ShiftSummary, interval: number, months: LocalDate[]): StaffTableEntry[] => {
  const assignments: StaffTableEntry[] = [];
  months.forEach(date => {
    const startDay = (date.month === shiftSummary.startDate.month && date.year === shiftSummary.startDate.year) ? shiftSummary.startDate.day : 1;
    const daysInMonth = shiftSummary.endDate ? shiftSummary.endDate.day : moment().month(date.month - 1).daysInMonth();
    for (let day = startDay; day <= daysInMonth; day++) {
      const [startHour, startMinute] = shiftSummary.startTime.split(':').map(Number);
      const [endHour, endMinute] = shiftSummary.endTime.split(':').map(Number);
      const start = new LocalDate(date.year, date.month, day, startHour, startMinute);
      const isShiftEndAfterMidNight = endHour < startHour || (endHour === startHour && endMinute < startMinute);
      let endDate = new LocalDate(date.year, date.month, day, endHour, endMinute);
      if (isShiftEndAfterMidNight) {
        endDate = endDate.addDays(1);
      }

      const end = endDate;

      let current = start;
      let rowId = 0;
      while (current.isBefore(end) || (current.hour === end.hour && current.minute < end.minute)) {
        let next;
        if ((current.minute === 30 && interval === 60) || (current.hour === endHour && interval === 60 && endMinute === 30)) {
          next = current.addMinutes(30);
        } else {
          next = current.addMinutes(interval);
        }

        if (next.hour === 24) {
          next = new LocalDate(next.year, next.month, next.day + 1, 0, 0);
        }

        const nextDaysInMonth = moment().month(next.month - 1).daysInMonth();

        if (next.day > nextDaysInMonth) {
          next = new LocalDate(next.year, next.month + 1, 1, next.hour, next.minute);
        }

        if (next.month > 12) {
          next = new LocalDate(next.year + 1, 1, next.day, next.hour, next.minute);
        }

        const staffNumber = shiftSummary.defaultStaffNumber + day;
        const staffRecommendation = staffNumber + Math.floor(Math.random() * 11) - 5;
        assignments.push({
          column: day,
          row: rowId++,
          name: shiftSummary.name,
          staffRecommendation: staffRecommendation,
          staffNumber: staffNumber,
          startTime: current,
          endTime: next
        });
        current = next;
      }
    }
  });

  return assignments;
};
