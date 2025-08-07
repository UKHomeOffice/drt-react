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
  render: () => {
      return <Stack spacing={2} display="inline-flex">
          <Highlight color="primary" text="Sphinx of black quartz..." tooltipText="...hear my vow!" />
          <Highlight color="secondary" text="Sphinx of black quartz..." tooltipText="...hear my vow!" />
          <Highlight color="info" text="Sphinx of black quartz..." tooltipText="...hear my vow!" />
          <Highlight color="warning" text="Sphinx of black quartz..." tooltipText="...hear my vow!" />
          <Highlight color="error" text="Sphinx of black quartz..." tooltipText="...hear my vow!" />
          <Highlight color="success" text="Sphinx of black quartz..." tooltipText="...hear my vow!" />
      </Stack>
  }
};
