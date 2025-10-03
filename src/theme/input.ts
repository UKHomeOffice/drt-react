
import { themePrimatives } from "./primatives";

export const inputBaseTheme = {
    styleOverrides: {
      input: {
        backgroundColor: '#fff',
        border: `2px solid ${themePrimatives.palette.common.black}`,
        borderRadius: 0,
        padding: `5px`,
        lineHeight: 1.25,
        minHeight: '40px',
        boxSizing: 'border-box',
        outline: `3px solid transparent`,
        marginBottom: `0 !important`,
        '&:focus': {
          outline: `3px solid #fd0`,
          outlineOffset: 0,
          boxShadow: `inset 0 0 0 2px`,
          zIndex: 2,
        },
        '&:focus + div.MuiInputAdornment-root': {
          zIndex: 1,
        }
      },
    }
};

export const inputAdornmentTheme = {
  styleOverrides: {
    positionEnd: {
      borderWidth: '2px 2px 2px 0',
      borderStyle: 'solid',
      borderColor: themePrimatives.palette.common.black,
      boxSizing: 'border-box',
        minHeight: '40px',
      height: '100%',
      backgroundColor: themePrimatives.palette.grey[100],
      marginLeft: 0,
      '& > .MuiIconButton-root': {
        marginRight: 0,
        padding: '5px',
      },
      '& .MuiSvgIcon-root': {
        fill: themePrimatives.palette.grey[500],
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
      marginBottom: themePrimatives.spacing(1),
      '& + .MuiInputBase-root': {
        marginTop: 0,
      }
    }
  }
};

export const outlinedInputTheme = {
  styleOverrides: {
    root: {
      padding: 0,
        marginBottom: `0 !important`,
    },
    notchedOutline: {
      border: 'none'
    }
  }
};

export const radioTheme = {
  styleOverrides:{
    root: {
      color: '#000',
      "&.Mui-checked": {
        color: '#000',
      }
    }
  }
}

export const radioGroupTheme = {
  styleOverrides:{
    root: {
      '& .MuiTypography-root': {
        marginBottom: '0px'
      }
    }
  }
}


export const checkboxTheme = {
  styleOverrides:{
    root: {
      marginBottom: themePrimatives.spacing(1),
    }
  }
}