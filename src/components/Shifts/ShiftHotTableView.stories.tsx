import type {Meta, StoryObj} from '@storybook/react';
import {
  ShiftHotTableView as ShiftHotTableViewComponent,
  ShiftSummaryStaffing,
  StaffTableEntry,
  ShiftSummary
} from './ShiftHotTableView';
import {LocalDate} from './LocalDate';
import React from 'react';
import {generateShiftAssignments} from './GenerateShift';

export default {
  title: 'DRT Components/UI/ShiftHotTableViewComponent',
  component: ShiftHotTableViewComponent,
} as Meta;

type Story = StoryObj<typeof ShiftHotTableViewComponent>;

const initialShift: ShiftSummary[] = [
  {name: 'Early shift', defaultStaffNumber: 0, startTime: '06:30', endTime: '16:30'},
  {name: 'Mid shift', defaultStaffNumber: 0, startTime: '12:30', endTime: '22:30'},
  {name: 'Late shift', defaultStaffNumber: 0, startTime: '13:00', endTime: '23:00'},
  {name: 'Night shift', defaultStaffNumber: 0, startTime: '23:30', endTime: '01:00'}
];


const initialDefaultShifts: ShiftSummaryStaffing[] = initialShift.map((defaultShift, index) => {
  const assignments = generateShiftAssignments(defaultShift, 60, [new LocalDate(2025, 1, 1, 0, 0)]);
  return {index, shiftSummary: defaultShift, staffTableEntries: assignments};
});

const handleSaveChanges = (shifts: ShiftSummaryStaffing[], changedAssignments: StaffTableEntry[]) => {
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
      shiftSummaries={initialDefaultShifts}
      handleSaveChanges={handleSaveChanges}
    />
  );
};

export const ShiftHotTableView: Story = {
  render: () => <ShiftHotTableViewStory/>
};