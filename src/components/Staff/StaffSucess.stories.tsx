import type { Meta, StoryObj } from '@storybook/react';
import { StaffSuccess as StaffSuccessComponent } from "./StaffSuccess";

const meta: Meta<typeof StaffSuccessComponent> = {
  title: "DRT Components/StaffSuccessComponent",
  component: StaffSuccessComponent,
};

export default meta;
type Story = StoryObj<typeof StaffSuccessComponent>;

export const StaffSuccess: Story = {
  args: {
    staffNumber: 1,
    message: "You updated the staff number for selected date and time",
    closeHandler: () => {
      console.log("Close handler")
    }
  }
};
