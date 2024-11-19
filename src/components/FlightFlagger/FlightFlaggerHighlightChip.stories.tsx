import type { Meta, StoryObj } from '@storybook/react';

import { FlightHighlightChip as FlightHighlightChipComponent } from './FlightFlaggerHighlightChip';

const meta: Meta<typeof FlightHighlightChipComponent> = {
  title: "DRT Components/Features/Flight Flagger/Highlight Chip",
  component: FlightHighlightChipComponent,
};

export default meta;
type Story = StoryObj<typeof FlightHighlightChipComponent>;

export const HighlightChip: Story = {
  args: {
    text: 'Highlighted info',
  },
};
