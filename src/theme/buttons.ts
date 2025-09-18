
import { themePrimatives } from "./primatives";

export const buttonBaseTheme = {
  defaultProps: {
    disableRipple: true,
  },
  styleOverrides: {
    root: {
      ".MuiTouchRipple-root": {
        display: "none",
      }
    }
  }
}

export const buttonTheme = {
  styleOverrides: {
    root: {
      display: 'inline-flex',
      justifyContent: 'center',
      textTransform: 'none',
      borderRadius: 0,
      fontWeight: 400,
      padding: '8px 10px',
      transition: 'none',
      '&:hover': {
        boxShadow: 'inherit'
      },
      '&:focus': {
        backgroundColor: '#fd0 !important',
        color: 'black !important',
        boxShadow: `0 2px 0 ${themePrimatives.palette.common.black} !important`,
      },
      '&:disabled': {
        pointerEvents: 'none',
        cursor: 'not-allowed !important',
        color: 'inherit',
        opacity: `0.5 !important`,
      },
      '&.MuiButton-colorPrimary': {
        backgroundColor: themePrimatives.palette.primary.main,
        color: themePrimatives.palette.common.white,
        boxShadow: `0 2px 0 ${themePrimatives.palette.primary.dark}`,
        '&:hover': {
          backgroundColor: themePrimatives.palette.primary.dark,
          boxShadow: `0 2px 0 ${themePrimatives.palette.primary.dark}`,
        },
        '&:disabled': {
          boxShadow: `0 2px 0 ${themePrimatives.palette.primary.dark}`,
        }
      },
      '&.MuiButton-colorSecondary': {
        backgroundColor: themePrimatives.palette.secondary.main,
        border: `1px solid ${themePrimatives.palette.common.black}`,
        boxShadow: `0 2px 0 ${themePrimatives.palette.common.black}`,
        '&:hover': {
          backgroundColor: '#dbdad9',
          border: `1px solid ${themePrimatives.palette.common.black}`,
          boxShadow: `0 2px 0 ${themePrimatives.palette.common.black}`,
        },
        '&:disabled': {
          boxShadow: `0 2px 0 ${themePrimatives.palette.common.black}`,
        },
      },
      '&.MuiButton-colorSuccess': {
        backgroundColor: themePrimatives.palette.success.main,
        color: themePrimatives.palette.common.white,
        boxShadow: `0 2px 0 ${themePrimatives.palette.success.dark}`,
        '&:hover': {
          backgroundColor: themePrimatives.palette.primary.dark,
          boxShadow: `0 2px 0 ${themePrimatives.palette.success.dark}`,
        },
        '&:disabled': {
          boxShadow: `0 2px 0 ${themePrimatives.palette.secondary.dark}`,
        }
      },
      '&.MuiButton-colorError': {
        backgroundColor: themePrimatives.palette.error.main,
        color: themePrimatives.palette.common.white,
        boxShadow: `0 2px 0 ${themePrimatives.palette.error.dark}`,
        '&:hover': {
          backgroundColor: themePrimatives.palette.error.dark,
          boxShadow: `0 2px 0 ${themePrimatives.palette.error.dark}`,
        },
        '&:disabled': {
          boxShadow: `0 2px 0 ${themePrimatives.palette.secondary.dark}`,
        }
      },
      '&.MuiButton-colorWarning': {
        backgroundColor: themePrimatives.palette.warning.main,
        color: themePrimatives.palette.common.white,
        boxShadow: `0 2px 0 ${themePrimatives.palette.warning.dark}`,
        '&:hover': {
          backgroundColor: themePrimatives.palette.warning.dark,
          boxShadow: `0 2px 0 ${themePrimatives.palette.warning.dark}`,
        },
        '&:disabled': {
          boxShadow: `0 2px 0 ${themePrimatives.palette.secondary.dark}`,
        }
      },
      '&.MuiButton-colorInfo': {
        backgroundColor: themePrimatives.palette.info.main,
        color: themePrimatives.palette.common.white,
        boxShadow: `0 2px 0 ${themePrimatives.palette.info.dark}`,
        '&:hover': {
          backgroundColor: themePrimatives.palette.info.dark,
          boxShadow: `0 2px 0 ${themePrimatives.palette.info.dark}`,
        },
        '&:disabled': {
          boxShadow: `0 2px 0 ${themePrimatives.palette.secondary.dark}`,
        }
      },
    },
    containedWarning: {
      color: themePrimatives.palette.common.white,
    },
    outlinedPrimary: {
      backgroundColor: themePrimatives.palette.primary.main,
      color: themePrimatives.palette.common.white,
      border: `none`,
      boxShadow: `0 2px 0 ${themePrimatives.palette.primary.dark}`,
      '&:focus':{ border: `none` },
      '&:hover':{ border: `none` }
    },
    outlinedSecondary: {
      color: themePrimatives.palette.common.black,
      border: `1px solid ${themePrimatives.palette.secondary.dark}`,
      boxShadow: `0 2px 0 ${themePrimatives.palette.common.black}`,
      '&:hover': {
        border: `1px solid ${themePrimatives.palette.secondary.dark}`,
      },
    },
    outlinedSuccess: {
      backgroundColor: themePrimatives.palette.success.main,
      color: themePrimatives.palette.common.white,
      boxShadow: `0 2px 0 ${themePrimatives.palette.success.dark}`,
      border: `none`,
      '&:focus':{ border: `none` },
      '&:hover':{ border: `none` }
    },
    outlinedWarning: {
      backgroundColor: themePrimatives.palette.warning.main,
      color: themePrimatives.palette.common.white,
      boxShadow: `0 2px 0 ${themePrimatives.palette.warning.dark}`,
      border: `none`,
      '&:focus':{ border: `none` },
      '&:hover':{ border: `none` }
    },
    outlinedError: {
      backgroundColor: themePrimatives.palette.error.main,
      color: themePrimatives.palette.common.white,
      boxShadow: `0 2px 0 ${themePrimatives.palette.error.dark}`,
      border: `none`,
      '&:focus':{ border: `none` },
      '&:hover':{ border: `none` }
    },
    outlinedInfo: {
      backgroundColor: themePrimatives.palette.info.main,
      color: themePrimatives.palette.common.white,
      boxShadow: `0 2px 0 ${themePrimatives.palette.info.dark}`,
      border: `none`,
      '&:focus':{ border: `none` },
      '&:hover':{ border: `none` }
    },
    sizeSmall: {
      fontSize: '16px',
      lineHeight: '20px',
    },
    sizeMedium: {
      fontSize: '16px',
      [themePrimatives.breakpoints.up("md")]: {
        fontSize: '19px',
      },
      lineHeight: '25px',
    }, 
    sizeLarge: {
      fontSize: "19px",
      [themePrimatives.breakpoints.up("md")]: {
        fontSize: '21px',
      },
      lineHeight: '25px',
    },
    outlined: {
      backgroundColor: '#fff',
    },
    text: {
      display: 'inline-flex',
      gap: 2,
      padding: 0,
      backgroundColor: 'transparent !important',
      textDecoration: 'underline',
      color: `${themePrimatives.palette.info.main} !important`,
      textDecorationThickness: 'max(1px,.0625rem)',
      textUnderlineOffset: '.1578em',
      boxShadow: 'none !important',
      border: 'none !important',
      minWidth: '0',
      borderBottom: '4px solid transparent !important',
      '&:focus': {
        backgroundColor: '#fd0 !important',
        color: `${themePrimatives.palette.common.black} !important`,
        boxShadow: `0 -2px #fd0, 0 4px #0b0c0c !important`,
        textDecoration: 'none !important',
        transition: 'none !important',
      },
      '&:hover': {
        textDecoration: 'underline',
        backgroundColor: 'transparent',
        color: themePrimatives.palette.info.dark,
        textDecorationThickness: 'max(3px,.1875rem,.12em)'
      },
      '&.MuiButton-colorSuccess': {
        color: themePrimatives.palette.success.main,
        '&:hover': {
          color: themePrimatives.palette.success.dark,
        },
        '&:disabled': {
          color: themePrimatives.palette.secondary.dark,
        }
      },
      '&.MuiButton-colorError': {
        color: themePrimatives.palette.error.dark,
        '&:hover': {
          color: themePrimatives.palette.error.dark,
        },
        '&:disabled': {
          color: themePrimatives.palette.secondary.dark,
        }
      },
      '&.MuiButton-colorWarning': {
        color: themePrimatives.palette.warning.dark,
        '&:hover': {
          color: themePrimatives.palette.warning.dark,
        },
        '&:disabled': {
          color: themePrimatives.palette.secondary.dark,
        }
      },
    }
  }
};

export const buttonGroupTheme = {
  styleOverrides: {
    root: {
      boxShadow: 'none',
    },
    firstButton: {
      borderRight: 'none'
    },
    grouped: {
      '&.MuiButton-colorPrimary': {
        boxShadow: `0 2px 0 ${themePrimatives.palette.primary.dark}`,
      },
      '&.MuiButton-colorSecondary': {
        boxShadow: `0 2px 0 ${themePrimatives.palette.secondary.dark}`,
      },
      '&.MuiButton-colorSuccess': {
        boxShadow: `0 2px 0 ${themePrimatives.palette.success.dark}`,
      },
      '&.MuiButton-colorWarning': {
        boxShadow: `0 2px 0 ${themePrimatives.palette.warning.dark}`,
      },
      '&.MuiButton-colorError': {
        boxShadow: `0 2px 0 ${themePrimatives.palette.error.dark}`, 
      },
      '&.MuiButton-colorInfo': {
        boxShadow: `0 2px 0 ${themePrimatives.palette.info.dark}`,
      }
    }
  }
}

export const toggleButtonTheme = {
  styleOverrides: {
    root: {
      backgroundColor: '#fff',
      fontWeight: 400,
      fontSize: '16px',
      [themePrimatives.breakpoints.up("md")]: {
        fontSize: '19px',
      },
      padding: '8px 10px 8px',
      borderRadius: 0,
      '&.MuiToggleButton-primary': {
        backgroundColor: '#fff',
        boxShadow: `0 2px 0 ${themePrimatives.palette.primary.main}`,
        color: themePrimatives.palette.primary.main,
      },
      '&.Mui-selected.MuiToggleButton-primary': {
        backgroundColor: themePrimatives.palette.primary.main,
        boxShadow: `0 2px 0 ${themePrimatives.palette.primary.dark}`,
        color: '#fff',
      },
      '&.MuiToggleButton-secondary': {
        backgroundColor: '#fff',
        boxShadow: `0 2px 0 ${themePrimatives.palette.secondary.main}`,
        color: themePrimatives.palette.secondary.main,
      },
      '&.Mui-selected.MuiToggleButton-secondary': {
        backgroundColor: themePrimatives.palette.secondary.main,
        boxShadow: `0 2px 0 ${themePrimatives.palette.secondary.dark}`,
        color: '#fff',
      },
      '&.MuiToggleButton-info': {
        backgroundColor: '#fff',
        boxShadow: `0 2px 0 ${themePrimatives.palette.info.main}`,
        color: themePrimatives.palette.info.main,
      },
      '&.Mui-selected.MuiToggleButton-info': {
        backgroundColor: themePrimatives.palette.info.main,
        boxShadow: `0 2px 0 ${themePrimatives.palette.info.dark}`,
        color: '#fff',
      },
      '&.MuiToggleButton-success': {
        backgroundColor: '#fff',
        boxShadow: `0 2px 0 ${themePrimatives.palette.success.main}`,
        color: themePrimatives.palette.success.main,
      },
      '&.Mui-selected.MuiToggleButton-success': {
        backgroundColor: themePrimatives.palette.success.main,
        boxShadow: `0 2px 0 ${themePrimatives.palette.success.dark}`,
        color: '#fff',
      },
      '&.MuiToggleButton-error': {
        backgroundColor: '#fff',
        boxShadow: `0 2px 0 ${themePrimatives.palette.error.main}`,
        color: themePrimatives.palette.error.main,
      },
      '&.Mui-selected.MuiToggleButton-error': {
        backgroundColor: themePrimatives.palette.error.main,
        boxShadow: `0 2px 0 ${themePrimatives.palette.error.dark}`,
        color: '#fff',
      },
      '&.MuiToggleButton-warning': {
        backgroundColor: '#fff',
        boxShadow: `0 2px 0 ${themePrimatives.palette.warning.main}`,
        color: themePrimatives.palette.warning.main,
      },
      '&.Mui-selected.MuiToggleButton-warning': {
        backgroundColor: themePrimatives.palette.warning.main,
        boxShadow: `0 2px 0 ${themePrimatives.palette.warning.dark}`,
        color: '#fff',
      },
      '&:disabled': {
        pointerEvents: 'auto',
        cursor: 'not-allowed !important',
        color: 'inherit',
        opacity: `0.5 !important`,
      },
    },
  }
}

export const toggleButtonGroupTheme = {
  styleOverrides: {
    root: {
      
    },
  }
}
