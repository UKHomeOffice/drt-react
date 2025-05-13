
import { themePrimatives } from "./primatives";

export const formControlTheme = {
  styleOverrides: {
    root: {
      marginBottom: themePrimatives.spacing(0),
      '&:has(.Mui-error)': {
        borderLeft: `${themePrimatives.spacing(1)} solid ${themePrimatives.palette.error.main}`,
        paddingLeft: themePrimatives.spacing(3),
        '.MuiFormLabel-root': {
          order: 1, 
          color: themePrimatives.palette.common.black
        },
        '.MuiFormHelperText-root': { 
          order: 2, 
          fontWeight: 'bold', 
          fontSize: '19px', 
          margin: `0 0 ${themePrimatives.spacing(2)}`
        },
        '.MuiInputBase-root': {
          order: 3, 
          '.MuiInputBase-input': {
            borderColor: themePrimatives.palette.error.main,
            '&:focus': {
              borderColor: themePrimatives.palette.common.black,
              boxShadow: `inset 0 0 0 2px`,
            }
          }
        }
      }
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
      marginBottom: `${themePrimatives.spacing(1)} !important`,
      color: `${themePrimatives.palette.common.black} !important`,
      '&.MuiInputLabel-root.Mui-focused': {
        color: themePrimatives.palette.common.black
      }
    }
  }
};
