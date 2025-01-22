import type {Meta, StoryObj} from '@storybook/react';
import {AddShiftForm as AddShiftFormComponent, Shift} from './AddShiftForm';

export default {
  title: 'DRT Components/UI/AddShiftFormComponent',
  component: AddShiftFormComponent,
} as Meta;

type Story = StoryObj<typeof AddShiftFormComponent>;


export const AddShiftForm: Story = {
  args: {
    port: 'BHX',
    terminal: 'T2',
    interval: 15,
    initialShifts: [
      {
        id: 1,
        name: 'shift 1',
        startTime: '00:00',
        endTime: '00:15',
        defaultStaffNumber: 10
      } as Shift
    ],
    confirmHandler: (shifts: Shift[]) => {
      console.log(shifts);
    }
  }
};