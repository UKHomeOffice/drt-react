
import { createTheme } from "@mui/material";

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

let defaultValues = createTheme();
let drtTheme = createTheme({
  palette: {
    primary: { main: '#005ea5'},
    secondary: { main: '#233E82'}
  },
  typography: {
    h1: {
      fontSize: '38px',
      fontWeight: 'bold',
      color: '#233E82'
    },
    h2: {
      fontSize: '32px',
      fontWeight: 'bold',
    },
    h3: {
      fontSize: "28px",
      fontWeight: "bold",
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
      fontSize: "14px",
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
    }
  }
})

export default drtTheme
