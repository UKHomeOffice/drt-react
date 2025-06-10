
import { createTheme } from "@mui/material";
import type {} from '@mui/x-date-pickers/themeAugmentation';
import { themePrimatives } from "./theme/primatives";
import React from "react";
import { buttonTheme, buttonGroupTheme } from '../src/theme/buttons';
import { inputBaseTheme, inputAdornmentTheme, inputLabelTheme, outlinedInputTheme, radioTheme } from "./theme/input";
import { formControlLabelTheme, formLabelTheme, formHelperTextTheme, formControlTheme } from "./theme/formControl";
import { selectTheme, nativeSelectTheme } from "./theme/select";
import { autocompleteTheme } from "./theme/autocomplete";
import { listTheme } from "./theme/lists";
import { typographyTheme, typographyComponentTheme, linkTheme } from "./theme/typography";
import { tableRowTheme, tableTheme, tableCellTheme } from "./theme/table";
import { paperTheme, cardHeaderTheme,cardContentTheme, appbarTheme } from "./theme/paper";

declare module '@mui/material/styles' {
  interface PaperVariants {
    appbar: React.CSSProperties;
    lightGrey: React.CSSProperties;
    white: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface PaperVariantsOptions {
    appbar?: React.CSSProperties;
    lightGrey?: React.CSSProperties;
    white?: React.CSSProperties;
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

declare module '@mui/material/styles' {
  interface Palette {
    border: Palette['primary'];
  }
  interface PaletteOptions {
    border: PaletteOptions['primary'];
  }
}

declare module '@mui/material/Paper' {
  interface PaperPropsVariantOverrides {
    appbar: true;
    lightGrey: true;
    white?: true;

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
  palette: themePrimatives.palette,
  spacing: 5,
  typography: {
    ...typographyTheme as any
  },
  components: {
    MuiAppBar: {
      ...appbarTheme,
    },
    MuiPaper: {
      ...paperTheme as any,
    },
    MuiCardHeader: {
      ...cardHeaderTheme
    },
    MuiCardContent: {
      ...cardContentTheme as any,
    },
    MuiTypography: {
      ...typographyComponentTheme,
    },
    MuiInputBase: {
      ...inputBaseTheme as any,
    },
    MuiInputAdornment: {
      ...inputAdornmentTheme as any,
    },
    MuiInputLabel: {
      ...inputLabelTheme as any,
    },
    MuiFormControl: {
      ...formControlTheme
    },
    MuiFormLabel: {
      ...formLabelTheme as any,
    },
    MuiFormControlLabel: {
      ...formControlLabelTheme,
    },
    MuiFormHelperText: {
      ...formHelperTextTheme
    },
    MuiOutlinedInput: {
      ...outlinedInputTheme
    },
    MuiButton: {
      ...buttonTheme as any,
    },
    MuiButtonGroup: {
      ...buttonGroupTheme as any,
    },
    MuiAutocomplete: {
      ...autocompleteTheme as any,
    },
    MuiSelect: {
      ...selectTheme
    },
    MuiNativeSelect: {
      ...nativeSelectTheme
    },
    MuiList: {
      ...listTheme
    },
    MuiLink: {
      ...linkTheme
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
    MuiRadio: {
      ...radioTheme as any,
    },
    MuiTable:{
      ...tableTheme,
    },
    MuiTableCell:{
      ...tableCellTheme,
    },
    MuiTableRow: {
      ...tableRowTheme,
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
