import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import { default as FlightFlaggerComponent} from "./FlightFlagger";
import { SearchFilterPayload } from "./FlightFlaggerFilters";
import ExampleFlights from "./ExampleFlights";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "ReactComponentLibrary/FlightFlagger",
  component: FlightFlaggerComponent,
} as ComponentMeta<typeof FlightFlaggerComponent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const defaultTheme = createTheme()
const Template: ComponentStory<typeof FlightFlaggerComponent> = (args) => <ThemeProvider theme={defaultTheme}><FlightFlaggerComponent {...args} /></ThemeProvider>;

export const FlightFlagger = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
FlightFlagger.args = {
  nationalities: ['FRA', 'GBR', 'USA', 'CHL'],
  ageGroups: ['0-9','10-24', '25-39','40-55','55-69','70+'],
  submitCallback: (searchFilters: SearchFilterPayload) => console.log(searchFilters),
  flights: ExampleFlights,
  isLoading:false
};

export const FlightFlaggerLoading = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
FlightFlaggerLoading.args = {
  nationalities: ['FRA', 'GBR', 'USA', 'CHL'],
  ageGroups: ['0-9','10-24', '25-39','40-55','55-69','70+'],
  submitCallback: (searchFilters: SearchFilterPayload) => console.log(searchFilters),
  flights: ExampleFlights,
  isLoading:true
};