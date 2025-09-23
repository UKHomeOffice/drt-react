import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '@mui/material';
import { LoadingSpinner as LoadingSpinnerComponent } from './LoadingSpinner';

const meta: Meta<typeof LoadingSpinnerComponent> = {
  title: "DRT Components/UI/LoadingSpinner",
  component: LoadingSpinnerComponent,
};

export default meta;
type Story = StoryObj<typeof LoadingSpinnerComponent>;

export const LoadingSpinner: Story = {
  args: {
    loadingText: 'Loading...'
  },
  render: (args) => {
      return <Box><LoadingSpinnerComponent {...args} /></Box>
  }
};
