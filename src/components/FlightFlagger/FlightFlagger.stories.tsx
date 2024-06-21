import { SearchFilterPayload } from "./FlightFlaggerFilters";
import ExampleFlights from "./ExampleFlights";

import type { Meta, StoryObj } from '@storybook/react';

import { default as FlightFlaggerComponent } from "./";

const meta: Meta<typeof FlightFlaggerComponent> = {
  title: "DRT Components/Flight Flagger",
  component: FlightFlaggerComponent,
};

export default meta;
type Story = StoryObj<typeof FlightFlaggerComponent>;

export const FlightFlagger: Story = {
  args: {
    nationalities: ["FRA", "GBR", "USA", "CHL"],
    ageGroups: ["0-9", "10-24", "25-39", "40-55", "55-69", "70+"],
    submitCallback: (searchFilters: SearchFilterPayload) =>
      console.log(searchFilters),
    flights: ExampleFlights,
    isLoading: false,
  },
  parameters: {
    jest: ["FlightFlagger.test.tsx"],
  }
};
