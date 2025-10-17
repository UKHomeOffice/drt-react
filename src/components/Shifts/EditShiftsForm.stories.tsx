import type {Meta, StoryObj} from '@storybook/react';
import {ShiftsForm as AddShiftsFormComponent, ShiftForm} from './ShiftsForm';

export default {
  title: 'DRT Components/UI/EditShiftsFormComponent',
  component: AddShiftsFormComponent,
} as Meta;

type Story = StoryObj<typeof AddShiftsFormComponent>;


export const AddShiftsForm: Story = {
  args: {
    port: 'BHX',
    terminal: 'T2',
    interval: 15,
    shiftForms: [
      {
        id: 1,
        name: 'Morning Shift',
        startTime: '08:00',
        endTime: '12:00',
        defaultStaffNumber: 5,
        startDate: {year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate()}
      }
    ],
    confirmHandler: (shifts: ShiftForm[]) => {
      console.log(shifts);
    },
    formMode: 'edit'
  }
};
