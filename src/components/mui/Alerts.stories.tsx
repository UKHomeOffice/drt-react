import * as React from 'react';
import { Alert as MuiAlert } from './storybookExports/Alerts.component';
import type {Meta, StoryObj} from '@storybook/react';

const meta: Meta<typeof MuiAlert> = {
    title: "DRT Components/MUI Components/Alert",
    component: MuiAlert,
};

export default meta;

type Story = StoryObj<typeof MuiAlert>;

export const Alert: Story = {
  render: (args) => {
    return <MuiAlert {...args}>This is an alert!</MuiAlert>
  }
};
