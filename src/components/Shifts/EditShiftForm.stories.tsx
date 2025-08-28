import type {Meta, StoryObj} from '@storybook/react';
import {EditShiftForm} from './EditShiftForm';

export default {
  title: 'DRT Components/UI/EditShiftForm',
  component: EditShiftForm,
} as Meta;

type Story = StoryObj<typeof EditShiftForm>;


export const EditShiftFormStory: Story = {
  args: {
    index: 0,
    formState: {
      id: 1,
      name: 'Morning Shift',
      startTime: '09:00',
      endTime: '12:00',
      defaultStaffNumber: 7,
      startDate: { year: 2025, month: 8, day: 10 },
      editStartMonth: 1,
    },
    interval: 15,
    onUpdate: (updatedFormState) => {
      console.log('Updated Form State:', updatedFormState);
    },
    removeShift: (shiftId) => {
      console.log('Remove Shift with ID:', shiftId);
    },
    showSubmitErrors: false,
  },
};
