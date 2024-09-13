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
    message: "All future dates with the previously entered minimum staff number will be updated.",
    minStaffNumber: null,
    handleSubmit: (minStaff: number) => {
      console.log(minStaff)
    },
    cancelHandler : () => {
      console.log("Cancel clicked")
    }
  }
};
