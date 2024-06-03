import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import {FlightFlaggerResults as FlightFlaggerResultsComponent} from "./FlightFlaggerResults";
import { ThemeProvider, createTheme } from "@mui/material";
import ExampleFlights from "./ExampleFlights";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "ReactComponentLibrary/FlightFlagger",
  component: FlightFlaggerResultsComponent,
} as ComponentMeta<typeof FlightFlaggerResultsComponent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const defaultTheme = createTheme()
const Template: ComponentStory<typeof FlightFlaggerResultsComponent> = (args) => <ThemeProvider theme={defaultTheme}><FlightFlaggerResultsComponent {...args} /></ThemeProvider>;

export const FlightFlaggerResults = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
FlightFlaggerResults.args = {
  flights: ExampleFlights
};
