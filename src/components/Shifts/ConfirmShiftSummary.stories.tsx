import type {Meta, StoryObj} from '@storybook/react';
import {Shift} from './AddShiftForm';
import {ConfirmShiftSummary as ConfirmShiftSummaryComponent} from "./ConfirmShiftSummary";

export default {
  title: 'DRT Components/UI/ConfirmShiftSummaryComponent',
  component: ConfirmShiftSummaryComponent,
} as Meta;

type Story = StoryObj<typeof ConfirmShiftSummaryComponent>;

export const ConfirmShiftSummary: Story = {
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
    ] as Shift[],
    confirmHandler: (shifts: Shift[]) => {
      console.log(shifts);
    }
  }
};