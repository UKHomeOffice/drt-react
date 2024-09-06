import type {Meta, StoryObj} from '@storybook/react';
import {MinStaffForm as MinStaffFormComponent} from "./MinStaffForm";
import React from "react";

const meta: Meta<typeof MinStaffFormComponent> = {
  title: "DRT Components/MinStaffFormComponent",
  component: MinStaffFormComponent,
};

export default meta;
type Story = StoryObj<typeof MinStaffFormComponent>;

export const MinStaffForm: Story = {
  args: {
    port: "Birmingham (BHX)",
    terminal: "Terminal 1",
    message: "This number will be applied to all future dates. It will overwrite all staff numbers " +
      "that are currently zero with your new specified number",
    minStaffNumber: null,
    handleSubmit: (minStaff: number) => {
      console.log(minStaff)
    },
    cancelHandler : () => {
      console.log("Cancel clicked")
    }
  }
};
