import * as React from 'react';
import { NativeSelect as MuiNativeSelect, MenuItem, FormControl, InputLabel } from "./storybookExports/FormFields.component";
import { SelectChangeEvent } from "@mui/material";

import { useArgs } from '@storybook/preview-api';
import type {Meta, StoryObj} from '@storybook/react';

const meta: Meta<typeof MuiNativeSelect> = {
    title: "DRT Components/MUI Components/Forms/Select",
    component: MuiNativeSelect,
    args: {
      value: "Menu item 1"
    },
    argTypes: {
      value: {
        options: [ "Menu item 1", "Menu item 2", "Menu item 3"],
        control: {
          type: 'select'
        }
      }
    }
};

const options = [
  {value: 1, }
]

export default meta;
type Story = StoryObj<typeof MuiNativeSelect>;

export const Select: Story = {
  render: (storyContext) => {
    const [args, updateArgs] = useArgs();

    return (
      <FormControl>
        <InputLabel>Basic select</InputLabel>
        <MuiNativeSelect 
          {...args}
          value={args.value}>
          <option value="Menu item 1">Menu item 1</option>
          <option value="Menu item 2">Menu item 2</option>
          <option value="Menu item 3">Menu item 3</option>
        </MuiNativeSelect>
      </FormControl>
    )
  }
};
