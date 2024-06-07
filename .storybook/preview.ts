import { Preview, ReactRenderer } from "@storybook/react";
import { fn } from '@storybook/test';
import { withTests } from '@storybook/addon-jest';
import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/material-icons';

import results from '../.jest-test-results.json';

const theme = createTheme()

const preview: Preview = {
  decorators: [
    withThemeFromJSXProvider<ReactRenderer>({
      themes: {
        default: theme,
      },
      defaultTheme: 'default',
      Provider: ThemeProvider,
    }),
    withTests({
      results,
    })
  ],
  parameters: {
    actions: { onClick: fn() },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
