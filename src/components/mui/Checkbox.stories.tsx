import * as React from 'react';
import { FormGroup, Checkbox as MuiCheckbox, FormControlLabel } from "./storybookExports/FormFields.component";

import { useArgs } from '@storybook/preview-api';
import type {Meta, StoryObj} from '@storybook/react';

const meta: Meta<typeof MuiCheckbox> = {
    title: "DRT Components/MUI Components/Forms/Checkbox",
    component: MuiCheckbox,
};

export default meta;
type Story = StoryObj<typeof MuiCheckbox>;

export const Checkbox: Story = {
  render: (storyContext) => {
    return <FormControlLabel value="Checkbox 1" control={<MuiCheckbox defaultChecked />} label="Checkbox 1" />
  }
};
