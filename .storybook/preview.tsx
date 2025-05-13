import * as React from 'react';
import { Preview, ReactRenderer } from "@storybook/react";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { fn } from '@storybook/test';
import { withTests } from '@storybook/addon-jest';
import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import { ThemeProvider } from "@emotion/react";
import drtTheme from '../src/drt-theme';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/material-icons';

import results from '../.jest-test-results.json';

import './preview-styles.css'
import { CssBaseline } from '@mui/material';

const preview: Preview = {
  decorators: [
    withThemeFromJSXProvider<ReactRenderer>({
      themes: {
        default: drtTheme,
      },
      defaultTheme: 'default',
      Provider: ThemeProvider,
    }),
    withTests({
      results,
    }),
    (Story) => (
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <CssBaseline />
        <Story />
      </LocalizationProvider>
    )
  ],
  parameters: {
    actions: { onClick: fn(), argTypesRegex: '^on[A-Z].*' },
    controls: {
      expanded: true, // Adds the description and default columns
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    github: {
      repository: "UKHomeOffice/drt-react",
      branch: "main",
    }
  },
};

export default preview;
