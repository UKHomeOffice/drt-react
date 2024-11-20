import { FlightFlaggerResults as FlightFlaggerResultsComponent } from "./FlightFlaggerResults";
import ExampleFlights from "./ExampleFlights";

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof FlightFlaggerResultsComponent> = {
  title: "DRT Components/Features/Flight Flagger/Flight Flagger Results",
  component: FlightFlaggerResultsComponent,
};

export default meta;
type Story = StoryObj<typeof FlightFlaggerResultsComponent>;

export const FlightFlaggerResults: Story = {
  args: {
    flights: ExampleFlights,
  },
};

