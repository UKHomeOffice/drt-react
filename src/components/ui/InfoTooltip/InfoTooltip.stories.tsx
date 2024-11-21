import * as React from 'react';
import { InfoTooltip as InfoTooltipComponent } from './InfoTooltip';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof InfoTooltipComponent> = {
  title: "DRT Components/UI/InfoTooltip",
  component: InfoTooltipComponent,
};

export default meta;
type Story = StoryObj<typeof InfoTooltipComponent>;

export const InfoTooltip: Story = {
  args: {
    text: "Wow, what a useful tooltip!",
  },
};
