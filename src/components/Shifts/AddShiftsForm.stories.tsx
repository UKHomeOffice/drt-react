import type {Meta, StoryObj} from '@storybook/react';
import {AddShiftsForm as AddShiftsFormComponent, ShiftForm} from './AddShiftsForm';

export default {
  title: 'DRT Components/UI/AddShiftsFormComponent',
  component: AddShiftsFormComponent,
} as Meta;

type Story = StoryObj<typeof AddShiftsFormComponent>;


export const AddShiftsForm: Story = {
  args: {
    port: 'BHX',
    terminal: 'T2',
    interval: 15,
    shiftForms: [
    ],
    confirmHandler: (shifts: ShiftForm[]) => {
      console.log(shifts);
    }
  }
};
