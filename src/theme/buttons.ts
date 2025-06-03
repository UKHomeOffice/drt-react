
import { themePalette } from "./palette";

export const buttonTheme = {
    styleOverrides: {
      root: {
        display: 'inline-flex',
        justifyContent: 'center',
        textTransform: 'none',
        borderRadius: 0,
        fontWeight: 400,
        '&:hover': {
          boxShadow: 'inherit'
        },
        '&:disabled': {
          pointerEvents: 'auto',
          cursor: 'not-allowed !important',
          color: 'inherit',
          opacity: `0.5 !important`,
        },
        '&.MuiButton-colorPrimary': {
          boxShadow: `0 2px 0 ${themePalette.palette.primary.dark}`,
          '&:hover': {
            boxShadow: `0 2px 0 ${themePalette.palette.primary.dark}`,
          },
          '&:disabled': {
            boxShadow: `0 2px 0 ${themePalette.palette.primary.dark}`,
          }
        },
        '&.MuiButton-colorSecondary': {
          boxShadow: `0 2px 0 ${themePalette.palette.secondary.dark}`,
          '&:hover': {
            backgroundColor: '#dbdad9',
            boxShadow: `0 2px 0 ${themePalette.palette.secondary.dark}`,
          },
          '&:disabled': {
            boxShadow: `0 2px 0 ${themePalette.palette.secondary.dark}`,
          },
        },
        '&.MuiButton-colorSuccess': {
          boxShadow: `0 2px 0 ${themePalette.palette.success.dark}`,
          '&:hover': {
            boxShadow: `0 2px 0 ${themePalette.palette.success.dark}`,
          },
          '&:disabled': {
            boxShadow: `0 2px 0 ${themePalette.palette.secondary.dark}`,
          }
        },
        '&.MuiButton-colorError': {
          boxShadow: `0 2px 0 ${themePalette.palette.error.dark}`,
          '&:hover': {
            boxShadow: `0 2px 0 ${themePalette.palette.error.dark}`,
          },
          '&:disabled': {
            boxShadow: `0 2px 0 ${themePalette.palette.secondary.dark}`,
          }
        },
        '&.MuiButton-colorWarning': {
          boxShadow: `0 2px 0 ${themePalette.palette.warning.dark}`,
          '&:hover': {
            boxShadow: `0 2px 0 ${themePalette.palette.warning.dark}`,
          },
          '&:disabled': {
            boxShadow: `0 2px 0 ${themePalette.palette.secondary.dark}`,
          }
        },
        '&.MuiButton-colorInfo': {
          boxShadow: `0 2px 0 ${themePalette.palette.info.dark}`,
          '&:hover': {
            boxShadow: `0 2px 0 ${themePalette.palette.info.dark}`,
          },
          '&:disabled': {
            boxShadow: `0 2px 0 ${themePalette.palette.secondary.dark}`,
          }
        },
      },
      containedWarning: {
        color: themePalette.palette.common.white,
      },
      outlinedSecondary: {
        color: themePalette.palette.common.black,
        border: `1px solid ${themePalette.palette.secondary.dark}`,
        '&:hover': {
          border: `1px solid ${themePalette.palette.secondary.dark}`,
        },
      },
      sizeSmall: {
        fontSize: '16px',
        lineHeight: '20px',
      },
      sizeMedium: {
        fontSize: '19px',
        lineHeight: '25px',
      }, 
      sizeLarge: {
        fontSize: "21px",
        lineHeight: '25px',
      },
      outlined: {
        backgroundColor: '#fff',
      },
      startIcon: {
        top: '2px',
        position: 'relative'
      },
      text: {
        display: 'inline',
        padding: 0,
        textDecoration: 'underline',
        color: themePalette.palette.info.main,
        textDecorationThickness: 'max(1px,.0625rem)',
        textUnderlineOffset: '.1578em',
        boxShadow: 'none !important',
        border: 'none !important',
        '&:hover': {
          textDecoration: 'underline',
          backgroundColor: 'transparent',
          color: themePalette.palette.info.dark,
          textDecorationThickness: 'max(3px,.1875rem,.12em)',
        },
        '&.MuiButton-colorSuccess': {
          color: themePalette.palette.success.main,
          '&:hover': {
            color: themePalette.palette.success.dark,
          },
          '&:disabled': {
            color: themePalette.palette.secondary.dark,
          }
        },
        '&.MuiButton-colorError': {
          color: themePalette.palette.error.dark,
          '&:hover': {
            color: themePalette.palette.error.dark,
          },
          '&:disabled': {
            color: themePalette.palette.secondary.dark,
          }
        },
        '&.MuiButton-colorWarning': {
          color: themePalette.palette.warning.dark,
          '&:hover': {
            color: themePalette.palette.warning.dark,
          },
          '&:disabled': {
            color: themePalette.palette.secondary.dark,
          }
        },
      }
    }
};
