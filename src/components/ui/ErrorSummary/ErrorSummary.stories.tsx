import * as React from 'react';
import {ErrorSummary as ErrorSummaryComponent} from './ErrorSummary';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ErrorSummaryComponent> = {
  title: "DRT Components/UI/ErrorSummary",
  component: ErrorSummaryComponent,
};

export default meta;
type Story = StoryObj<typeof ErrorSummaryComponent>;

export const ErrorSummary: Story = {
  args: {
    errors: [
      {
        text: 'This is an error',
        target: '#error-target'
      },
      {
        text: 'This is another error',
        target: '#error-target'
      },
      {
        text: 'Someone should be proofreading this...',
        target: '#error-target'
      }
    ]
  },
  render: (args) => {
      return <ErrorSummaryComponent {...args} />
  }
};
