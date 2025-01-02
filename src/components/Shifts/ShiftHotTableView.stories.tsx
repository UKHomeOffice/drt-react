import type {Meta, StoryObj} from '@storybook/react';
import {
  ShiftHotTableView as ShiftHotTableViewComponent,
  ShiftData,
  ShiftAssignment,
  DefaultShift
} from './ShiftHotTableView';
import {LocalDate} from './LocalDate';
import React from 'react';

export default {
  title: 'DRT Components/UI/ShiftHotTableViewComponent',
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
const generateShiftAssignments = (defaultShifts: DefaultShift, interval: number): ShiftAssignment[] => {
  const assignments: ShiftAssignment[] = [];
  const daysInMonth = 31; // Assuming 31 days in the 1st month

  for (let day = 1; day <= daysInMonth; day++) {
    const [startHour, startMinute] = defaultShifts.startTime.split(':').map(Number);
    const [endHour, endMinute] = defaultShifts.endTime.split(':').map(Number);
    const start = new LocalDate(year, month, day, startHour, startMinute);
    const end = new LocalDate(year, month, day, endHour, endMinute);
    let current = start;
    let rowId = 1;
    while (current.isBefore(end)) {
      const next = current.addMinutes(interval);
      assignments.push({
        column: day,
        row: rowId++,
        name: defaultShifts.name,
        staffNumber: defaultShifts.defaultStaffNumber,
        startTime: current,
        endTime: next
      });
      current = next;
    }
  }

  return assignments;
};

const initialDefaultShifts: ShiftData[] = initialShift.map((defaultShift, index) => {
  const assignments = generateShiftAssignments(defaultShift, 60);
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