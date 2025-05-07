
import { createTheme, darken, lighten } from "@mui/material";
import type {} from '@mui/x-date-pickers/themeAugmentation';
import React from "react";

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

const defaultValues = createTheme({
  palette: {
    primary: { 
      main: '#005ea5',
      light: lighten('#005ea5', 0.8)
    },
    secondary: { 
      main: '#233E82',
      light: '#E6E9F1'
    },
    error: { 
      main: '#99001E',
      light: '#FFEBEE',
    },
    success: { 
      main: '#547A00',
      light: '#F0F6DB'
    },
    warning: { 
      main: '#C94900',
      light: '#FFF2E1',
    },
    info: { 
      main: '#404252',
      light: lighten('#404252', 0.8)
    },
  }
});

const drtTheme = createTheme({
  palette: {
    primary: defaultValues.palette.primary,
    secondary: defaultValues.palette.secondary,
    error: defaultValues.palette.error,
    success: defaultValues.palette.success,
    warning: defaultValues.palette.warning,
    info: defaultValues.palette.info,
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
      [defaultValues.breakpoints.up("sm")]: {
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
            backgroundColor: defaultValues.palette.grey[100]
          }
        }
      ]
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: defaultValues.palette.common.white
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontSize: '16px',
          padding: '6px 12px',
        },
        outlined: {
          backgroundColor: '#fff'
        }
      },
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
          paddingRight: defaultValues.spacing(2),
          paddingLeft: defaultValues.spacing(2),
          '&.MuiToggleButton-primary': {
            backgroundColor: defaultValues.palette.common.white,
            color: defaultValues.palette.text.primary,
            '&:hover': {
              color: defaultValues.palette.primary.main,
              backgroundColor: defaultValues.palette.primary.light,
            },
            '&.Mui-selected': {
              backgroundColor: defaultValues.palette.primary.main,
              color: defaultValues.palette.common.white,
              cursor: 'default',
              '.live': {
                color: '#ffd700',
              }
            },
            '&.Mui-disabled': {
              backgroundColor: defaultValues.palette.grey[200],
              color: defaultValues.palette.grey[600],
            }
          },
          '> .MuiSvgIcon-root': {
            marginRight: defaultValues.spacing(1),
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
          backgroundColor: defaultValues.palette.info.main,
          color: defaultValues.palette.common.white,
          padding: 6,
        }
      }
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:nth-of-type(odd)': {
            backgroundColor: defaultValues.palette.common.white,
          },
          '&:nth-of-type(even)': {
            backgroundColor: defaultValues.palette.grey[100],
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
