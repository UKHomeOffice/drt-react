
import { createTheme, darken, lighten } from "@mui/material";
import type {} from '@mui/x-date-pickers/themeAugmentation';
import { themePalette } from "./theme/palette";
import React from "react";

import { buttonTheme } from '../src/theme/buttons';
declare module '@mui/material/styles' {
  interface PaperVariants {
    appbar: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface PaperVariantsOptions {
    appbar?: React.CSSProperties;
  }

  interface TypographyVariants {
    portCode: React.CSSProperties;
    pageTitle: React.CSSProperties;
    logoTitle: React.CSSProperties;
    logoStrap: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    portCode?: React.CSSProperties;
    pageTitle?: React.CSSProperties;
    logoTitle?: React.CSSProperties;
    logoStrap?: React.CSSProperties;
  }
}

declare module '@mui/material/Paper' {
  interface PaperPropsVariantOverrides {
    appbar: true;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    portCode: true;
    pageTitle: true;
    logoTitle: true;
    logoStrap: true;
  }
}

const drtTheme = createTheme({
  palette: {
    primary: {
      ...themePalette.palette.primary,
      50: "#E6E9F1",
      100: "#C0C7DE",
      300: "#7283B2",
      400: "#5269A5",
      500: "#334F96",
      600: "#2B478D",
      700: "#233E82",
      900: "#0E2560",
    },
    secondary: themePalette.palette.secondary,
    error: themePalette.palette.error,
    success: themePalette.palette.success,
    warning: themePalette.palette.warning,
    info: themePalette.palette.info,
    grey: {
      100 : "#F3F5F9",
      300 : "#B4B5BE",
      400 : "#547A00",
      500 : "#777A86",
      700 : "#404252",
      900 : "#111224"
    }
  },
  typography: {
    fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
    h1: {
      fontSize: '38px',
      fontWeight: 'bold',
      color: '#233E82',
      paddingTop: '40px',
      paddingBottom: '40px',
    },
    h2: {
      fontSize: '32px',
      fontWeight: 'bold',
      paddingTop: '40px',
      paddingBottom: '40px',
    },
    h3: {
      fontSize: "28px",
      fontWeight: "bold",
      paddingTop: '40px',
      paddingBottom: '40px',
    },
    h4: {
      fontSize: "24px",
      fontWeight: "bold",
    },
    h5: {
      fontSize: "18px",
      fontWeight: "bold",
    },
    h6: {
      fontSize: "16px",
      fontWeight: "bold",
    },
    subtitle1: {
      fontSize: "19px",
      fontWeight: "bold",
    },
    subtitle2: {
      fontSize: "16px",
      fontWeight: "bold",
    },
    body1: {
      fontSize: "16px",
    },
    body2: {
      fontSize: "12px",
    },
    button: {
      fontSize: '18px',
      fontWeight: "bold",
      textTransform: 'none',
    },
    portCode: {
      fontSize: '0.7em',
      letterSpacing: 1.2,
      minWidth: '30px',
      textAlign: 'center',
      display: 'inline-block'
    },
    pageTitle: {
      fontSize: 18,
      fontWeight: 'lighter',
      [themePalette.breakpoints.up("sm")]: {
        fontSize: 36
      }
    },
    logoTitle: {
      fontSize: '1.6em'
    },
  },
  components: {
    MuiPaper: {
      variants: [
        {
          props: { variant: 'appbar'},
          style: {
            backgroundColor: themePalette.palette.grey[100]
          }
        }
      ]
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: themePalette.palette.common.white
        }
      }
    },
    MuiButton: {
      ...buttonTheme,
    },
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: {
          width: '100%'
        }
      }
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          flexGrow: 1,
          paddingRight: themePalette.spacing(2),
          paddingLeft: themePalette.spacing(2),
          '&.MuiToggleButton-primary': {
            backgroundColor: themePalette.palette.common.white,
            color: themePalette.palette.text.primary,
            '&:hover': {
              color: themePalette.palette.primary.main,
              backgroundColor: themePalette.palette.primary.light,
            },
            '&.Mui-selected': {
              backgroundColor: themePalette.palette.primary.main,
              color: themePalette.palette.common.white,
              cursor: 'default',
              '.live': {
                color: '#ffd700',
              }
            },
          },
          '> .MuiSvgIcon-root': {
            marginRight: themePalette.spacing(1),
            opacity: 0.8,
            width: '0.8em',
          }
        },
        primary: {
          
        }
      }
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          margin: '0 !important'
        }
      }
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          minHeight: 'unset !important',
        },
        content: {
          margin: '12px 0 0 !important'
        }
      }
    },
    MuiRadio:{
      styleOverrides:{
        root: {
          color: '#000',
          "&.Mui-checked": {
            color: '#000',
          }
        }
      }
    },
    MuiTableCell:{
      styleOverrides: {
        root: {
          fontSize: '16px',
          padding: 8,
        },
        head: {
          backgroundColor: themePalette.palette.info.main,
          color: themePalette.palette.common.white,
          padding: 6,
        }
      }
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:nth-of-type(odd)': {
            backgroundColor: themePalette.palette.common.white,
          },
          '&:nth-of-type(even)': {
            backgroundColor: themePalette.palette.grey[100],
          },
        }
      }
    },
    MuiPickersDay: {
      styleOverrides: {
        root: {
          fontSize: '14px',
        }
      }
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: '12px'
        }
      }
    }
  }
})

export default drtTheme
