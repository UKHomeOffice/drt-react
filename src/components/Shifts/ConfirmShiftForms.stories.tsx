import type {Meta, StoryObj} from '@storybook/react';
import {ShiftForm} from './AddShiftsForm';
import {ConfirmShiftForms as ConfirmShiftFormsComponent} from "./ConfirmShiftForms";

export default {
  title: 'DRT Components/UI/ConfirmShiftFormsComponent',
  component: ConfirmShiftFormsComponent,
} as Meta;

type Story = StoryObj<typeof ConfirmShiftFormsComponent>;

export const ConfirmShiftForms: Story = {
  args: {
    port: 'BHX',
    terminal: 'T2',
    shifts: [
      {
        id: 1,
        name: 'Early shift',
        startTime: '00:00',
        endTime: '00:15',
        startDate: {year: 2024, month: 1, day: 1},
        editStartMonth: 2,
        defaultStaffNumber: 10
      },
      {
        id: 2,
        name: 'afternoon shift',
        startTime: '00:15',
        endTime: '00:30',
        startDate: {year: 2024, month: 1, day: 1},
        editStartMonth: 2,
        defaultStaffNumber: 10
      },
      {
        id: 3,
        name: 'evening shift',
        startTime: '00:30',
        endTime: '00:45',
        startDate: {year: 2024, month: 1, day: 1},
        editStartMonth: 2,
        defaultStaffNumber: 10
      }
    ] as ShiftForm[],
    confirmHandler: (shifts: ShiftForm[]) => {
      console.log(shifts);
    }
  }
};
