import type { Meta, StoryObj } from '@storybook/react';
import { StaffUpdateSuccess as StaffUpdateSuccessComponent } from "./StaffUpdateSuccess";

const meta: Meta<typeof StaffUpdateSuccessComponent> = {
  title: "DRT Components/StaffSuccessComponent",
  component: StaffUpdateSuccessComponent,
};

export default meta;
type Story = StoryObj<typeof StaffUpdateSuccessComponent>;

export const StaffSuccess: Story = {
  args: {
    staffNumber: 1,
    message: "You updated the staff number for selected date and time",
    closeHandler: () => {
      console.log("Close handler")
    }
  }
};
