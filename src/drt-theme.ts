
import { createTheme } from "@mui/material/styles";
import type {} from '@mui/x-date-pickers/themeAugmentation';
import { themePrimatives } from "./theme/primatives";
import React from "react";
import { buttonBaseTheme, buttonTheme, buttonGroupTheme, toggleButtonGroupTheme, toggleButtonTheme } from '../src/theme/buttons';
import { inputBaseTheme, inputAdornmentTheme, inputLabelTheme, outlinedInputTheme, radioTheme, radioGroupTheme, checkboxTheme } from "./theme/input";
import { formControlLabelTheme, formLabelTheme, formHelperTextTheme, formControlTheme } from "./theme/formControl";
import { selectTheme, nativeSelectTheme } from "./theme/select";
import { autocompleteTheme } from "./theme/autocomplete";
import { listTheme, listItemTheme, listItemTextTheme } from "./theme/lists";
import { typographyTheme, typographyComponentTheme, linkTheme } from "./theme/typography";
import { tableRowTheme, tableTheme, tableCellTheme } from "./theme/table";
import { paperTheme, cardHeaderTheme,cardContentTheme, appbarTheme } from "./theme/paper";
import { circularProgressTheme } from "./theme/progress";
import { alertTheme } from "./theme/alert";
import { breadcrumbsTheme } from "./theme/breadcrumbs";

declare module '@mui/material/styles' {
  interface PaperVariants {
    appbar: React.CSSProperties;
    lightGrey: React.CSSProperties;
    white: React.CSSProperties;
    footer: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface PaperVariantsOptions {
    appbar?: React.CSSProperties;
    lightGrey?: React.CSSProperties;
    white?: React.CSSProperties;
    footer?: React.CSSProperties;
  }

  interface TypographyVariants {
    portCode: React.CSSProperties;
    pageTitle: React.CSSProperties;
    logoTitle: React.CSSProperties;
    logoStrap: React.CSSProperties;
    xlarge: React.CSSProperties;
    large: React.CSSProperties;
    medium: React.CSSProperties;
    small: React.CSSProperties;
    label: React.CSSProperties;
    labelbold: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    portCode?: React.CSSProperties;
    pageTitle?: React.CSSProperties;
    logoTitle?: React.CSSProperties;
    logoStrap?: React.CSSProperties;
    xlarge?: React.CSSProperties;
    large?: React.CSSProperties;
    medium?: React.CSSProperties;
    small?: React.CSSProperties;
    label?: React.CSSProperties;
    labelbold?: React.CSSProperties;
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
    white: true;
    footer: true;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    portCode: true;
    pageTitle: true;
    logoTitle: true;
    logoStrap: true;
    xlarge: true;
    large: true;
    medium: true;
    small: true;
    label: true;
    labelbold: true;
  }
}

export const drtThemeValues = {
  palette: themePrimatives.palette,
  spacing: 5,
  typography: {
    ...typographyTheme as any
  },
  components: {
    MuiAlert: {
      ...alertTheme,
    },
    MuiAppBar: {
      ...appbarTheme,
    },
    MuiBreadcrumbs: {
      ...breadcrumbsTheme as any,
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
    MuiButtonBase: {
      ...buttonBaseTheme
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
    MuiListItem: {
      ...listItemTheme,
    },
    MuiListItemText:{
      ...listItemTextTheme
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
    MuiRadioGroup: {
      ...radioGroupTheme as any,
    },
    MuiCheckbox: {
      ...checkboxTheme,
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
    MuiToggleButton: {
      ...toggleButtonTheme,
    },
    MuiToggleButtonGroup: {
      ...toggleButtonGroupTheme,
    },
    MuiCircularProgress: {
      ...circularProgressTheme
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
    },
  }
};
const drtTheme = createTheme(drtThemeValues);
export default drtTheme
