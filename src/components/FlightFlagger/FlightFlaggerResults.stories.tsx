import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { FlightFlaggerResults as FlightFlaggerResultsComponent,IFlightFlaggerResults } from "./FlightFlaggerResults";
import { ThemeProvider, createTheme } from "@mui/material";
import ExampleFlights from "./ExampleFlights";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "DRT Components/Flight Flagger",
  component: FlightFlaggerResultsComponent,
} as ComponentMeta<typeof FlightFlaggerResultsComponent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const defaultTheme = createTheme();
const Template: ComponentStory<typeof FlightFlaggerResultsComponent> = (
  args :IFlightFlaggerResults,
) => (
  <ThemeProvider theme={defaultTheme}>
    <FlightFlaggerResultsComponent {...args} />
  </ThemeProvider>
);

export const FlightFlaggerResults = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
FlightFlaggerResults.args = {
  flights: ExampleFlights,
};
