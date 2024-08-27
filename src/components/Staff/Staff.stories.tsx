import type { Meta, StoryObj } from '@storybook/react';
import { MinStaffWarning as MinStaffWarningComponent } from "./MinStaffWarning";

export const meta: Meta<typeof MinStaffWarningComponent> = {
  title: "DRT Components/MinStaffWarningComponent",
  component: MinStaffWarningComponent,
};

type Story = StoryObj<typeof MinStaffWarningComponent>;

export const MinStaffWarning: Story = {
  args: {
    message1: "Your minimum staff cover in DRT is",
    message2: "You can now more accurately reflect your minimum staff cover in DRT",
    minStaff: 1,
    handleClick: () => {console.log("Add min staff clicked")}
  }
};
