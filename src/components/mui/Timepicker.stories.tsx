import * as React from 'react';
import { TimePicker as MuiTimePicker } from "./storybookExports/FormFields.component";

import type {Meta, StoryObj} from '@storybook/react';

const meta: Meta<typeof MuiTimePicker> = {
    title: "DRT Components/MUI Components/Forms/TimePicker",
    component: MuiTimePicker,
    args: {
      label: "Basic time picker",
    }
};

export default meta;
type Story = StoryObj<typeof MuiTimePicker>;

export const TimePicker: Story = {
  render: (args) => {
    return <MuiTimePicker {...args} />
  }
};
