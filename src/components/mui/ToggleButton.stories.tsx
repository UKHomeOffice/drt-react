import * as React from 'react';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from '@mui/x-date-pickers';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import {InfoTooltip} from '../ui/InfoTooltip';


import { useArgs } from '@storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';
import { ToggleButton as MuiToggleButton, ToggleButtonGroup } from "./storybookExports/Buttons.component";

const meta: Meta<typeof ToggleButtonGroup> = {
  title: "DRT Components/MUI Components/Forms/ToggleButton",
  component: ToggleButtonGroup,
  args: {
    value: "yesterday",
    sx: {
      maxWidth: '400px'
    }
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ToggleButton: Story = {

  render: (storyContext) => {
    const [args, updateArgs] = useArgs();

    const handleChange = (event: React.MouseEvent<HTMLElement>, newValue: string | null) => {
      updateArgs({
        ...args,
        value: newValue
      });
    };

    return (
      <ToggleButtonGroup exclusive color='primary' {...args} onChange={handleChange}>
        <MuiToggleButton value="yesterday" defaultChecked>Yesterday</MuiToggleButton>
        <MuiToggleButton value="today">Today</MuiToggleButton>
        <MuiToggleButton value="tomorrow">Tomorrow</MuiToggleButton>
      </ToggleButtonGroup>
    )
  }
};
