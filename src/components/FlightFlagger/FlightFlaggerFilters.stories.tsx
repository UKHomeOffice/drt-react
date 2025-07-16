import type { Meta, StoryObj } from '@storybook/react';
import {
  FlightFlaggerFilters as FlightFlaggerFiltersComponent,
  SearchFilterPayload,
} from "./FlightFlaggerFilters";

const meta: Meta<typeof FlightFlaggerFiltersComponent> = {
  title: "DRT Components/Features/Flight Flagger/Filters",
  component: FlightFlaggerFiltersComponent,
};

export default meta;
type Story = StoryObj<typeof FlightFlaggerFiltersComponent>;

export const Filters: Story = {
  args: {
    nationalities: [
      {name: 'Great Britain', code: 'GBR'},
      {name: 'France', code: 'FRA'},
      {name: 'Spain', code: 'SPA'}
    ],
    ageGroups: ["0-9", "10-24", "25-39", "40-55", "55-69", "70+"],
    submitCallback: (searchFilters: SearchFilterPayload) => console.log(searchFilters),
    showAllCallback: (event: React.ChangeEvent<HTMLInputElement>) => console.log(event),
    onChangeInput: (searchTerm: string) => console.log(searchTerm),
    sendEvent: () => {},
  }
};
