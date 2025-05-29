
import { transform } from "@babel/core";
import { themePalette } from "./palette";

export const inputBaseTheme = {
    styleOverrides: {
      input: {
        backgroundColor: '#fff',
        border: `2px solid ${themePalette.palette.common.black}`,
        borderRadius: 0,
        padding: `5px !important`,
        lineHeight: 1.25,
        '&:focus': {
          outline: `3px solid #fd0`,
          outlineOffset: 0,
          boxShadow: `inset 0 0 0 2px`,
        },
      },
    }
};

export const inputLabelTheme = {
  styleOverrides: {
    root: {
      position: 'unset',
      transform: 'none',
      maxWidth: 'none',
      marginBottom: '5px',
      '& +.MuiInputBase-root': {
        marginTop: '5px'
      }
    }
  }
};

export const formLabelTheme = {
  styleOverrides: {
    root: {
      color: themePalette.palette.common.black,
      '&.MuiInputLabel-root.Mui-focused': {
        color: themePalette.palette.common.black
      }
    }
  }
};

export const outlinedInputTheme = {
  styleOverrides: {
    root: {
      padding: 0,
    },
    notchedOutline: {
      border: 'none'
    }
  }
};