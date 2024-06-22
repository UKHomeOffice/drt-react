import { ThemeOptions } from '@mui/material/styles';

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
  interface TypographyPropsVariantOverrides {
    appbar: true;
  }
}
