
import { transform } from "@babel/core";
import { themePalette } from "./palette";

export const formControlTheme = {
  styleOverrides: {
    root: {
      marginBottom: 0,
    }
  }
};

export const formHelperTextTheme = {
  styleOverrides: {
    root: {
      margin: '0 0 1em',
    }
  }
}


export const formControlLabelTheme = {
  styleOverrides: {
    label: {
      marginBottom: 0,
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