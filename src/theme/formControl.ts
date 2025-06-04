
import { transform } from "@babel/core";
import { themePrimatives } from "./primatives";

export const formControlTheme = {
  styleOverrides: {
    root: {
      marginBottom: themePrimatives.spacing(0),
    }
  }
};

export const formHelperTextTheme = {
  styleOverrides: {
    root: {
      margin: `${themePrimatives.spacing(1)} 0 0`,
    }
  }
}


export const formControlLabelTheme = {
  styleOverrides: {
    label: {
      marginBottom: themePrimatives.spacing(1),
    }
  }
};

export const formLabelTheme = {
  styleOverrides: {
    root: {
      color: themePrimatives.palette.common.black,
      '&.MuiInputLabel-root.Mui-focused': {
        color: themePrimatives.palette.common.black
      }
    }
  }
};