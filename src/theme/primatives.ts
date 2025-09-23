
import { createTheme, darken, lighten } from "@mui/material";

export const themePrimatives = createTheme({
  spacing: 5,
  palette: {
    background: {
      default: '#f5f5f5'
    },
    common: {
      black: '#0b0c0c',
    },
    primary: { 
      main: '#00703c',
      light: lighten('#00703c', 0.8),
      dark: '#005a30',
      50: "#E6E9F1",
      100: "#C0C7DE",
      300: "#7283B2",
      400: "#5269A5",
      500: "#334F96",
      600: "#2B478D",
      700: "#233E82",
      900: "#0E2560",
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
      light: lighten('#f47738', 0.7),
      dark: darken('#f47738', 0.2),
    },
    info: { 
      main: '#1d70b8',
      light: '#5694ca',
      dark: '#003078',
    },
    grey: {
      100 : "#f3f2f1",
      200: "#cbcbcb",
      300 : "#b1b4b6",
      400 : "#88898a",
      500 : "#777A86",
      700 : "#505a5f",
      900 : "#111224"
    },
    border: {
      main: '#b1b4b6',
      dark: '#0b0c0c',
    }
  }
});
