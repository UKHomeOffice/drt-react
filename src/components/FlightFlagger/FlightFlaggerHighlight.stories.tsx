import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { FlightHighlight as FlightHighlightComponent } from "./FlightFlaggerResults";
import { ThemeProvider, createTheme } from "@mui/material";
import ExampleFlights from "./ExampleFlights";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "DRT Components/Flight Flagger",
  component: FlightHighlightComponent,
} as ComponentMeta<typeof FlightHighlightComponent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const defaultTheme = createTheme();
const Template: ComponentStory<typeof FlightHighlightComponent> = (
  args: FlightHighlightComponent,
) => (
  <ThemeProvider theme={defaultTheme}>
    <FlightHighlightComponent {...args} />
  </ThemeProvider>
);

export const FlightHighlight = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
FlightHighlight.args = {
  text: 'Flight highlight text',
};
