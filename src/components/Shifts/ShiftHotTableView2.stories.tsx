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
  title: 'DRT Components/UI/ShiftHotTableViewComponent2',
  component: ShiftHotTableViewComponent,
} as Meta;

type Story = StoryObj<typeof ShiftHotTableViewComponent>;

const shiftSummary: ShiftSummary[] = [
  {name: 'Early shift', defaultStaffNumber: 0, startTime: '06:30', endTime: '16:30',startDate : {year: 2025, month: 1, day: 1}},
  {name: 'Mid shift', defaultStaffNumber: 0, startTime: '12:00', endTime: '22:30',startDate : {year: 2025, month: 1, day: 1}},
  {name: 'Late shift', defaultStaffNumber: 0, startTime: '13:00', endTime: '23:00',startDate : {year: 2025, month: 1, day: 1}},
  {name: 'Night shift', defaultStaffNumber: 0, startTime: '21:30', endTime: '02:00',startDate : {year: 2025, month: 1, day: 1}}
];

const initialDefaultShifts: ShiftSummaryStaffing[] = shiftSummary.map((defaultShift, index) => {
  const assignments = generateShiftAssignments(defaultShift, 30, [new LocalDate(2024, 12, 1, 0, 0), new LocalDate(2025, 1, 1, 0, 0), new LocalDate(2025, 2, 1, 0, 0)]);
  return {index, shiftSummary: defaultShift, staffTableEntries: assignments};
});

 const handleEditShift  = (index: number, shiftSummary: ShiftSummary) => {
  // Function to handle editing a shift
  console.log(`Editing shift at index ${index}:`, shiftSummary);
  // Add your edit logic here
 }

const handleSaveChanges = (shifts: ShiftSummaryStaffing[], changedAssignments: StaffTableEntry[]) => {
  // Function to handle saving changes
  console.log('Data to be saved:', shifts);
  console.log('Changed assignments:', changedAssignments);
  // Add your data submission logic here
};

const ShiftHotTableViewStory: React.FC = () => {

  return (
    <ShiftHotTableViewComponent
      interval={30}
      dayRange={'weekly'}
      shiftDate={{year: 2025, month: 1, day: 1}}
      shiftSummaries={initialDefaultShifts}
      handleSaveChanges={handleSaveChanges}
      handleEditShift={handleEditShift}
    />
  );
};

export const ShiftHotTableView: Story = {
  render: () => <ShiftHotTableViewStory/>
};