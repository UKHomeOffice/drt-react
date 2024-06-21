import type { Meta, StoryObj } from '@storybook/react';

import { FlightHighlight as FlightHighlightComponent } from './FlightFlaggerResults';

const meta: Meta<typeof FlightHighlightComponent> = {
  title: "DRT Components/Flight Flagger",
  component: FlightHighlightComponent,
};

export default meta;
type Story = StoryObj<typeof FlightHighlightComponent>;

export const HighlightChip: Story = {
  args: {
    text: 'Highlighted info',
  },
};
