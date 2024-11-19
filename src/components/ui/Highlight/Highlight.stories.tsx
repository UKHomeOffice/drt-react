import * as React from 'react';
import { Highlight } from './Highlight';

import type { Meta, StoryObj } from '@storybook/react';
import { Stack } from '@mui/material';

const meta: Meta<typeof Highlight> = {
  title: "DRT Components/UI/Highlight",
  component: Highlight,
};

export default meta;
type Story = StoryObj<typeof Highlight>;

export const Info: Story = {
  render: (storyContext) => {
      return <Stack spacing={2} display="inline-flex">
          <Highlight color="primary" text="The quick brown fox..." tooltipText="...jumps over the lazy dog" />
          <Highlight color="secondary" text="The quick brown fox..." tooltipText="...jumps over the lazy dog" />
          <Highlight color="info" text="The quick brown fox..." tooltipText="...jumps over the lazy dog" />
          <Highlight color="warning" text="The quick brown fox..." tooltipText="...jumps over the lazy dog" />
          <Highlight color="error" text="The quick brown fox..." tooltipText="...jumps over the lazy dog" />
          <Highlight color="success" text="The quick brown fox..." tooltipText="...jumps over the lazy dog" />
      </Stack>
  }
};
