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
        startTime: '04:00',
        endTime: '13:15',
        startDate: {year: 2024, month: 1, day: 1},
        defaultStaffNumber: 10
      },
      {
        id: 2,
        name: 'afternoon shift',
        startTime: '16:15',
        endTime: '23:30',
        startDate: {year: 2024, month: 1, day: 1},
        defaultStaffNumber: 10
      },
      {
        id: 3,
        name: 'evening shift',
        startTime: '15:30',
        endTime: '22:45',
        startDate: {year: 2024, month: 1, day: 1},
        defaultStaffNumber: 10
      }
    ] as ShiftForm[],
    confirmHandler: (shifts: ShiftForm[]) => {
      console.log(shifts);
    }
  }
};
