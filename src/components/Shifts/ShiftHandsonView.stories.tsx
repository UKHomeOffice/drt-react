import type {Meta, StoryObj} from '@storybook/react';
import {
  ShiftHotTableView as ShiftHotTableViewComponent,
  Shift,
  ShiftAssignment,
  DefaultShift
} from "./ShiftHotTableView";
import {LocalDate} from "./LocalDate";

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
]


const month = 1;

const generateShiftAssignments = (defaultShifts: DefaultShift, interval: number): ShiftAssignment[] => {
  const assignments: ShiftAssignment[] = [];
  const daysInMonth = 31; // Assuming 31 days in the 1st month

  for (let day = 1; day <= daysInMonth; day++) {
    const [startHour, startMinute] = defaultShifts.startTime.split(':').map(Number);
    const [endHour, endMinute] = defaultShifts.endTime.split(':').map(Number);
    const start = new LocalDate(2024, month, day, startHour, startMinute);
    const end = new LocalDate(2024, month, day, endHour, endMinute);
    let current = start;

    while (current.isBefore(end)) {
      const next = current.addMinutes(interval);
      assignments.push({
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

const initialDefaultShifts: Shift[] = initialShift.map((defaultShift) => {
  const assignments = generateShiftAssignments(defaultShift, 60);
  return {defaultShift, assignments};
});


const handleSaveChanges = (shifts:Shift[]) => {
  // Function to handle saving changes
  console.log('Data to be saved:', shifts);
  // Add your data submission logic here
};

export const ShiftHotTableView: Story = {
  args: {
    month: month,
    interval: 60,
    shifts: initialDefaultShifts,
    handleSaveChanges: handleSaveChanges
  }
};