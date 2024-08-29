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
    minStaffNumber: null,
    handleSubmit: (minStaff: number) => {
      console.log(minStaff)
      if (minStaff === null || minStaff === undefined) {
        return false;
      }
      return true;
    },
    continueCallback: () => {
      console.log("Continue")
  }}
};
