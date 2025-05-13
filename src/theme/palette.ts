
import { createTheme, darken, lighten } from "@mui/material";

export const themePalette = createTheme({
  palette: {
    common: {
      black: '#0b0c0c',
    },
    primary: { 
      main: '#00703c',
      light: lighten('#00703c', 0.8),
      dark: '#002d18'
    },
    secondary: { 
      main: '#f3f2f1',
      light: '#efefef',
      dark: '#929191',
    },
    error: { 
      main: '#d4351c',
      light: lighten('#d4351c', 0.8),
      dark: darken('#d4351c', 0.2),
    },
    success: { 
      main: '#00703c',
      light: lighten('#00703c', 0.8),
      dark: '#002d18'
    },
    warning: { 
      main: '#f47738',
      light: lighten('#f47738', 0.8),
      dark: darken('#f47738', 0.2),
    },
    info: { 
      main: '#1d70b8',
      light: '#5694ca',
      dark: '#003078',
    },
  }
});
