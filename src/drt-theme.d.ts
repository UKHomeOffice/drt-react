import { ThemeOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface PaperVariants {
    appbar: React.CSSProperties;
    shiftForm: React.CSSProperties;
    shiftCard: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface PaperVariantsOptions {
    appbar?: React.CSSProperties;
    shiftForm?: React.CSSProperties;
    shiftCard?: React.CSSProperties;
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
    shiftForm: true;
    shiftCard: true;

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