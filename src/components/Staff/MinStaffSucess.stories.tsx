import type { Meta, StoryObj } from '@storybook/react';
import { MinStaffSuccess as MinStaffSuccessComponent } from "./MinStaffSuccess";

const meta: Meta<typeof MinStaffSuccessComponent> = {
  title: "DRT Components/MinStaffSuccessComponent",
  component: MinStaffSuccessComponent,
};

export default meta;
type Story = StoryObj<typeof MinStaffSuccessComponent>;

export const MinStaffSuccess: Story = {
  args: {
    minStaffNumber: 1,
    message: "You updated the minimum staff number",
    closeHandler: () => {
      console.log("Close handler")
    }
  }
};
