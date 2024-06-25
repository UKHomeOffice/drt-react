
import { createTheme } from "@mui/material";
import { PaletteMode } from "@mui/material";

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
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    portCode?: React.CSSProperties;
    pageTitle?: React.CSSProperties;
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
  }
}


export const createDRTTheme = (mode: PaletteMode) => {
  const isDarkMode = mode == 'dark';
  
  return createTheme({
    palette: {
      mode: mode,
      primary: { main: '#732282'},
      secondary: { main: '#1d70b8'}
    },
    typography: {
      h1: {
        fontSize: 36
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
        [drtTheme.breakpoints.up("sm")]: {
          fontSize: 36
        }
      }
    },
    components: {
      MuiPaper: {
        variants: [
          {
            props: { variant: 'appbar'},
            style: {
              backgroundColor: drtTheme.palette.grey[100]
            }
          }
        ]
      }
    }
  })
}

let drtTheme = createTheme();
drtTheme = createTheme({
  palette: {
    primary: { main: '#732282'},
    secondary: { main: '#1d70b8'}
  },
  typography: {
    h1: {
      fontSize: 36
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
      [drtTheme.breakpoints.up("sm")]: {
        fontSize: 36
      }
    }
  },
  components: {
    MuiPaper: {
      variants: [
        {
          props: { variant: 'appbar'},
          style: {
            backgroundColor: drtTheme.palette.grey[100]
          }
        }
      ]
    }
  }
})

export default drtTheme
