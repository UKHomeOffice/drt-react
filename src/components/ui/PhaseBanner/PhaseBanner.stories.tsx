import * as React from 'react';
import {PhaseBanner as PhaseBannerComponent} from './PhaseBanner';
import type { Meta, StoryObj } from '@storybook/react';
import { Link, Typography } from '@mui/material';

const meta: Meta<typeof PhaseBannerComponent> = {
  title: "DRT Components/UI/PhaseBanner",
  component: PhaseBannerComponent,
};

export default meta;
type Story = StoryObj<typeof PhaseBannerComponent>;

export const PhaseBanner: Story = {
  args: {
    tagText: 'Alpha',
    content: <Typography variant="body1" mb={0}>This is a new service. Help us improve it and <Link href="mailto:feedback">give us your feedback</Link></Typography>
  },
  render: (args) => {
      return <PhaseBannerComponent {...args} />
  }
};
