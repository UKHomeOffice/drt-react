import type {Meta, StoryObj} from '@storybook/react';
import {
  ShiftHotTableView as ShiftHotTableViewComponent,
  ShiftData,
  ShiftAssignment,
  DefaultShift
} from './ShiftHotTableView';
import {LocalDate} from './LocalDate';
import React from 'react';
import moment from "moment/moment";

export default {
  title: 'DRT Components/UI/ShiftHotTableViewComponent',
  component: ShiftHotTableViewComponent,
} as Meta;

type Story = StoryObj<typeof ShiftHotTableViewComponent>;

const initialShift: DefaultShift[] = [
  {name: 'Early shift', defaultStaffNumber: 0, startTime: '06:30', endTime: '16:30'},
  {name: 'Mid shift', defaultStaffNumber: 0, startTime: '12:00', endTime: '22:30'},
  {name: 'Late shift', defaultStaffNumber: 0, startTime: '13:00', endTime: '23:00'},
  {name: 'Night shift', defaultStaffNumber: 0, startTime: '21:30', endTime: '23:30'}
];


const generateShiftAssignments = (defaultShifts: DefaultShift, interval: number, months: LocalDate[]): ShiftAssignment[] => {
  const assignments: ShiftAssignment[] = [];
  months.forEach(date => {
    const daysInMonth = moment().month(date.month - 1).daysInMonth();
    for (let day = 1; day <= daysInMonth; day++) {
      const [startHour, startMinute] = defaultShifts.startTime.split(':').map(Number);
      const [endHour, endMinute] = defaultShifts.endTime.split(':').map(Number);
      const start = new LocalDate(date.year, date.month, day, startHour, startMinute);
      const end = new LocalDate(date.year, date.month, day, endHour, endMinute);
      let current = start;
      let rowId = 1;
      while (current.isBefore(end)) {
        let next
        if((current.minute === 30 && interval === 60) || (current.hour === endHour && interval === 60 && endMinute === 30)) {
          next = current.addMinutes(30);
        } else {
          next = current.addMinutes(interval);
        }

        assignments.push({
          column: day,
          row: rowId++,
          name: defaultShifts.name,
          staffNumber: defaultShifts.defaultStaffNumber + day,
          startTime: current,
          endTime: next
        });
        current = next;
      }
    }
  })

  return assignments;
};

const initialDefaultShifts: ShiftData[] = initialShift.map((defaultShift, index) => {
  const assignments = generateShiftAssignments(defaultShift, 60, [new LocalDate(2024, 12, 1, 0, 0), new LocalDate(2025, 1, 1, 0, 0), new LocalDate(2025, 2, 1, 0, 0)]);
  return {index, defaultShift, assignments};
});

const handleSaveChanges = (shifts: ShiftData[], changedAssignments: ShiftAssignment[]) => {
  // Function to handle saving changes
  console.log('Data to be saved:', shifts);
  console.log('Changed assignments:', changedAssignments);
  // Add your data submission logic here
};

const ShiftHotTableViewStory: React.FC = () => {

  return (
    <ShiftHotTableViewComponent
      interval={60}
      dayRange={'monthly'}
      viewDate={{year: 2025, month: 1, day: 1}}
      initialShifts={initialDefaultShifts}
      handleSaveChanges={handleSaveChanges}
    />
  );
};

export const ShiftHotTableView: Story = {
  render: () => <ShiftHotTableViewStory/>
};