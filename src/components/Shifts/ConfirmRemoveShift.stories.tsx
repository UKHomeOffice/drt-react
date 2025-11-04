import {ConfirmRemoveShift as ConfirmRemoveShiftComponent} from "./ConfirmRemoveShift";
import type {Meta, StoryObj} from "@storybook/react";

export default {
  title: 'DRT Components/Features/Shifts/ConfirmRemoveShift',
  component: ConfirmRemoveShiftComponent,
} as Meta;

type Story = StoryObj<typeof ConfirmRemoveShiftComponent>;


export const ConfirmRemoveShift: Story = {
  args: {
    shift : {
        id: 1,
        name: 'Early Shift',
        startTime: '08:00',
        endTime: '16:00',
        defaultStaffNumber: 5,
        startDate: {year: 2024, month: 7, day: 1}},
    removeShiftConfirmHandler: () => {
      console.log('Shift removed');
    },
    cancelRemoveShiftHandler: () => {
      console.log('Remove shift cancelled');
    }
  }
};