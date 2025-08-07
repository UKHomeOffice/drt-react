import * as React from 'react';
import { Alert as MuiAlert } from './storybookExports/Alerts.component';
import type {Meta, StoryObj} from '@storybook/react';
import { Link, Typography } from '@mui/material';

const meta: Meta<typeof MuiAlert> = {
    title: "DRT Components/MUI Components/Alert",
    component: MuiAlert,
};

export default meta;

type Story = StoryObj<typeof MuiAlert>;

export const Alert: Story = {
  render: (args) => {
    return (
      <MuiAlert {...args}>
        <Typography variant='h3' sx={{mb: '10px !important'}}>Alert Title</Typography>
        <Typography>We've sent details to test-email@test-corp.co.uk</Typography>
      </MuiAlert>
    )
  }
};
