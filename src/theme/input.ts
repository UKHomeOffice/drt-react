
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
        minHeight: '40px',
        boxSizing: 'border-box',
        '&:focus': {
          outline: `3px solid #fd0`,
          outlineOffset: 0,
          boxShadow: `inset 0 0 0 2px`,
        },
      },
    }
};

export const inputAdornmentTheme = {
  styleOverrides: {
    positionEnd: {
      borderWidth: '2px 2px 2px 0',
      borderStyle: 'solid',
      borderColor: themePalette.palette.common.black,
      boxSizing: 'border-box',
        minHeight: '40px',
      height: '100%',
      backgroundColor: themePalette.palette.grey[100],
      marginLeft: 0,
      '& > .MuiIconButton-root': {
        marginRight: 0,
        padding: '5px',
      },
      '& .MuiSvgIcon-root': {
        fill: themePalette.palette.grey[500],
      }
    }
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