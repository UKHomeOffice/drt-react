import * as React from 'react';
import { TextField as MuiTextField } from "./storybookExports/FormFields.component";

import type {Meta, StoryObj} from '@storybook/react';

const meta: Meta<typeof MuiTextField> = {
    title: "DRT Components/MUI Components/Forms/TextField",
    component: MuiTextField,
};

export default meta;
type Story = StoryObj<typeof MuiTextField>;

export const TextField: Story = {
  args: {
    label: 'Basic textfield',
    InputLabelProps: {
      shrink: true
    }
  }
};

export const InvalidTextField: Story = {
  args: {
    label: 'Invalid textfield',
    error: true,
    helperText: 'This field is invalid',
    InputLabelProps: {
      shrink: true,
    }
  }
};
