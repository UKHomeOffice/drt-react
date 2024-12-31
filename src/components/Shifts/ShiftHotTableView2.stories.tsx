import type {Meta, StoryObj} from '@storybook/react';
import {
  ShiftHotTableView as ShiftHotTableViewComponent,
  ShiftData,
  ShiftAssignment,
  DefaultShift
} from './ShiftHotTableView';
import {LocalDate} from './LocalDate';
import React from 'react';
import { data as testData } from './TestData';

export default {
  title: 'DRT Components/UI/ShiftHotTableViewComponent2',
  component: ShiftHotTableViewComponent,
} as Meta;

type Story = StoryObj<typeof ShiftHotTableViewComponent>;

const initialShift: DefaultShift[] = [
  {name: 'Early shift', defaultStaffNumber: 12, startTime: '06:30', endTime: '16:30'},
  {name: 'Mid shift', defaultStaffNumber: 12, startTime: '12:00', endTime: '22:30'},
  {name: 'Late shift', defaultStaffNumber: 12, startTime: '13:00', endTime: '23:00'},
  {name: 'Night shift', defaultStaffNumber: 12, startTime: '21:30', endTime: '23:30'}
];

const month = 1;
const year = 2025;

const parseShiftAssignments = (data: string): ShiftAssignment[] => {
  const jsonData = JSON.parse(data).assignments;
  return jsonData.map((item: any) => ({
    column: item.column,
    row: item.row,
    name: item.name,
    staffNumber: item.staffNumber,
    startTime: {
      year: item.startTime.year,
      month: item.startTime.month,
      day: item.startTime.day,
      hour: item.startTime.hour,
      minute: item.startTime.minute
    },
    endTime: {
      year: item.endTime.year,
      month: item.endTime.month,
      day: item.endTime.day,
      hour: item.endTime.hour,
      minute: item.endTime.minute
    }
  }));
};

const assignments: ShiftAssignment[] = parseShiftAssignments(testData);
console.log(assignments);

const generateShiftAssignments = (defaultShifts: DefaultShift, interval: number, parsedAssignments: ShiftAssignment[]): ShiftAssignment[] => {
  const assignments: ShiftAssignment[] = [];
  const daysInMonth = 31; // Assuming 31 days in the 1st month

  for (let day = 1; day <= daysInMonth; day++) {
    const [startHour, startMinute] = defaultShifts.startTime.split(':').map(Number);
    const [endHour, endMinute] = defaultShifts.endTime.split(':').map(Number);
    const start = new LocalDate(2025, month, day, startHour, startMinute);
    const end = new LocalDate(2025, month, day, endHour, endMinute);
    let current = start;
    let rowId = 1;
    while (current.isBefore(end)) {
      const next = current.addMinutes(interval);
      const assignment = parsedAssignments.find(a => a.column === day && a.row === rowId);
      if (assignment) {
        assignments.push(assignment);
      } else {
        assignments.push({
          column: day,
          row: rowId++,
          name: defaultShifts.name,
          staffNumber: defaultShifts.defaultStaffNumber,
          startTime: current,
          endTime: next
        });
      }
      current = next;
    }
  }

  return assignments;
};

const parsedAssignments: ShiftAssignment[] = parseShiftAssignments(testData);
const initialDefaultShifts: ShiftData[] = initialShift.map((defaultShift, index) => {
  const assignments = generateShiftAssignments(defaultShift, 60, parsedAssignments);
  return { index, defaultShift, assignments };
});

const handleSaveChanges = (shifts: ShiftData[]) => {
  // Function to handle saving changes
  console.log('Data to be saved:', shifts);
  // Add your data submission logic here
};

const ShiftHotTableViewStory: React.FC = () => {

  return (
    <ShiftHotTableViewComponent
      month={month}
      year={year}
      interval={60}
      initialShifts={initialDefaultShifts}
      handleSaveChanges={handleSaveChanges}
    />
  );
};

export const ShiftHotTableView: Story = {
  render: () => <ShiftHotTableViewStory/>
};