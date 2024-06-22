
import { createTheme } from "@mui/material";

declare module '@mui/material/styles' {
  interface PaperVariants {
    appbar: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface PaperVariantsOptions {
    appbar?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Paper' {
  interface PaperPropsVariantOverrides {
    appbar: true;
  }
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
