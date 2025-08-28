import {ShiftDate} from "../Shifts";
import moment, {Moment} from "moment";

export const Months = [
  {name: 'January', value: 1},
  {name: 'February', value: 2},
  {name: 'March', value: 3},
  {name: 'April', value: 4},
  {name: 'May', value: 5},
  {name: 'June', value: 6},
  {name: 'July', value: 7},
  {name: 'August', value: 8},
  {name: 'September', value: 9},
  {name: 'October', value: 10},
  {name: 'November', value: 11},
  {name: 'December', value: 12}
];


export function shiftDateToMoment(shiftDate: ShiftDate): Moment {
  return moment([shiftDate.year, shiftDate.month - 1, shiftDate.day]);
}

// Moment to ShiftDate (as JS Date)
export function momentToShiftDate(momentDate: Moment): ShiftDate {
  return {year: momentDate.year(), month: momentDate.month() + 1, day: momentDate.date()};
}

// Moment to ShiftDate (as string, e.g. 'YYYY-MM-DD')
export function momentToShiftDateString(momentDate: Moment): string {
  return momentDate.format('YYYY-MM-DD');
}

export function shiftDateToString(shiftDate: ShiftDate): string {
  return `${String(shiftDate.day).padStart(2, '0')} ${Months[shiftDate.month -1].name} ${shiftDate.year}`;
}