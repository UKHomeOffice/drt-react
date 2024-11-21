import * as React from 'react';
import { DatePicker as MuiDatepicker } from "./storybookExports/FormFields.component";

import type {Meta, StoryObj} from '@storybook/react';

const meta: Meta<typeof MuiDatepicker> = {
    title: "DRT Components/MUI Components/Forms/DatePicker",
    component: MuiDatepicker,
    args: {
      label: "Basic date picker",
    },
};

export default meta;
type Story = StoryObj<typeof MuiDatepicker>;

export const DatePicker: Story = {
  render: (args) => {
    return <MuiDatepicker {...args} />
  }
};
