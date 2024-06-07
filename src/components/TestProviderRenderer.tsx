import React, { ReactElement } from "react";
import {RenderOptions, render} from '@testing-library/react';
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";

const providers = ({children}: {children: React.ReactNode}) => {
  const theme = createTheme()
  return (
    <ThemeProvider theme={theme}>
        {children}
    </ThemeProvider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
): ReturnType<typeof render> => render(ui, { wrapper: providers, ...options });

export * from '@testing-library/react'
export {customRender as render}