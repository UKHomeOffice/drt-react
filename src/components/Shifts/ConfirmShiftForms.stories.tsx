import type {Meta, StoryObj} from '@storybook/react';
import {ShiftForm} from './AddShiftForm';
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
        defaultStaffNumber: 10
      },
      {
        id: 2,
        name: 'afternoon shift',
        startTime: '00:15',
        endTime: '00:30',
        defaultStaffNumber: 10
      },
      {
        id: 3,
        name: 'evening shift',
        startTime: '00:30',
        endTime: '00:45',
        defaultStaffNumber: 10
      }
    ] as ShiftForm[],
    confirmHandler: (shifts: ShiftForm[]) => {
      console.log(shifts);
    }
  }
};