import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { StatusTag } from "./";
import { ThemeProvider, createTheme } from "@mui/material";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "DRT Components/Status Tags",
  component: StatusTag,
} as ComponentMeta<typeof StatusTag>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const defaultTheme = createTheme();
const Template: ComponentStory<typeof StatusTag> = (args) => (
  <ThemeProvider theme={defaultTheme}>
    <StatusTag {...args} />
  </ThemeProvider>
);

export const Success = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Success.args = {
  type: "success",
  text: "Hurrah!",
};

export const Info = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Info.args = {
  type: "info",
  text: "How interesting!",
};

export const Warning = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Warning.args = {
  type: "warning",
  text: "Here be dragons...",
};

export const Error = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Error.args = {
  type: "error",
  text: "Oh dear...",
};
