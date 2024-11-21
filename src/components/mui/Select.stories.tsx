import * as React from 'react';
import { Select as MuiSelect, MenuItem, FormControl, InputLabel } from "./storybookExports/FormFields.component";
import { SelectChangeEvent } from "@mui/material";

import { useArgs } from '@storybook/preview-api';
import type {Meta, StoryObj} from '@storybook/react';

const meta: Meta<typeof MuiSelect> = {
    title: "DRT Components/MUI Components/Forms/Select",
    component: MuiSelect,
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
type Story = StoryObj<typeof MuiSelect>;

export const Select: Story = {
  render: (storyContext) => {
    const [args, updateArgs] = useArgs();

    const handleSelect = (event: SelectChangeEvent<unknown>, child: React.ReactNode) => {
      console.log('hello', event.target.value as string)
      updateArgs({
        ...args,
        value: event.target.value as string
      });
    };

    return (
      <FormControl>
        <InputLabel>Basic select</InputLabel>
        <MuiSelect 
          {...args}
          value={args.value}
          onChange={handleSelect}>
          <MenuItem value="Menu item 1">Menu item 1</MenuItem>
          <MenuItem value="Menu item 2">Menu item 2</MenuItem>
          <MenuItem value="Menu item 3">Menu item 3</MenuItem>
        </MuiSelect>
      </FormControl>
    )
  }
};
