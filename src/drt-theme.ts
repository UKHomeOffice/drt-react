
import { alpha, createTheme, darken, lighten } from "@mui/material";
import type {} from '@mui/x-date-pickers/themeAugmentation';
import { themePalette } from "./theme/palette";
import React from "react";
import createPalette from "@mui/material/styles/createPalette";
import { buttonTheme } from '../src/theme/buttons';
import { inputBaseTheme, inputAdornmentTheme, inputLabelTheme, outlinedInputTheme } from "./theme/input";
import { formControlLabelTheme, formLabelTheme, formHelperTextTheme } from "./theme/formControl";
import { nativeSelectTheme } from "./theme/select";
import { autocompleteTheme } from "./theme/autocomplete";
import { listTheme } from "./theme/lists";
import { typographyTheme, typographyComponentTheme, linkTheme } from "./theme/typography";
import { tableRowTheme, tableTheme, tableCellTheme } from "./theme/table";

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

const drtTheme = createTheme({
  palette: themePalette.palette,
  spacing: 5,
  typography: {
    ...typographyTheme as any
  },
  components: {
    MuiPaper: {
      variants: [
        {
          props: { variant: 'appbar'},
          style: {
            backgroundColor: themePalette.palette.grey[100]
          }
        },
        {
          props: { variant: 'shiftForm'},
          style: {
            backgroundColor: themePalette.palette.grey[100],
            borderRadius: 0,
            border: `1px solid ${themePalette.palette.grey[300]}`,
            marginBottom: '1em',
          }
        },
        {
          props: { variant: 'shiftCard'},
          style: {
            borderRadius: 0,
            border: `1px solid ${themePalette.palette.grey[300]}`,
            marginBottom: '1em',
          }
        }
      ]
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
    MuiAutocomplete: {
      ...autocompleteTheme as any,
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
