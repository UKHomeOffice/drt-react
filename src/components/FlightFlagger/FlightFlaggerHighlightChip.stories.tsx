import type { Meta, StoryObj } from '@storybook/react';

import { FlightHighlightChip as FlightHighlightChipComponent } from './FlightFlaggerHighlightChip';

const meta: Meta<typeof FlightHighlightChipComponent> = {
  title: "DRT Components/Flight Flagger",
  component: FlightHighlightChipComponent,
};

export default meta;
type Story = StoryObj<typeof FlightHighlightChipComponent>;

export const FlightHighlightChip: Story = {
  args: {
    text: 'Highlighted info',
  },
};
