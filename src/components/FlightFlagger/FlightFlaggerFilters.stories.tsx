import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import {
  FlightFlaggerFilters as FlightFlaggerFiltersComponent,
  SearchFilterPayload,
} from "./FlightFlaggerFilters";
import { ThemeProvider, createTheme } from "@mui/material";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "DRT Components/Flight Flagger",
  component: FlightFlaggerFiltersComponent,
} as ComponentMeta<typeof FlightFlaggerFiltersComponent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const defaultTheme = createTheme();
const Template: ComponentStory<typeof FlightFlaggerFiltersComponent> = (
  args,
) => (
  <ThemeProvider theme={defaultTheme}>
    <FlightFlaggerFiltersComponent {...args} />
  </ThemeProvider>
);

export const FlightFlaggerFilters = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
FlightFlaggerFilters.args = {
  nationalities: ["FRA", "GBR", "USA", "CHL"],
  ageGroups: ["0-9", "10-24", "25-39", "40-55", "55-69", "70+"],
  submitCallback: (searchFilters: SearchFilterPayload) =>
    console.log(searchFilters),
};
