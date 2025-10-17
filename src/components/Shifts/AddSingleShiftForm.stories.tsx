import type {Meta, StoryObj} from '@storybook/react';
import {ShiftsForm as AddShiftsFormComponent, ShiftForm} from './ShiftsForm';

export default {
  title: 'DRT Components/Features/Shifts/AddSingleShiftForm',
  component: AddShiftsFormComponent,
} as Meta;

type Story = StoryObj<typeof AddShiftsFormComponent>;


export const AddShiftsForm: Story = {
  args: {
    port: 'BHX',
    terminal: 'T2',
    interval: 15,
    shiftForms: [],
    confirmHandler: (shifts: ShiftForm[]) => {
      console.log(shifts);
    },
    formMode: 'add',
    disableAdd: true
  }
};
