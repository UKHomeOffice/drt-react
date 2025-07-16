import { themePrimatives } from "./primatives";

export const alertTheme = {
  variants: [],
  styleOverrides: {
    icon: {
      display: 'none',
    },
    message: {
      padding: 0,
      '> *:last-child': {
        marginBottom:  '0 !important',
      },
      'a': {
        fontWeight: 'bold',
      }
    },
    standard: {
      padding: themePrimatives.spacing(3),
      color: themePrimatives.palette.common.black,
      '&.MuiAlert-colorError':{
        backgroundColor: '#f3dede',
        borderLeft: `${themePrimatives.spacing(2)} solid ${themePrimatives.palette.error.main}`
      },
      '&.MuiAlert-colorInfo':{
        backgroundColor: '#dbeff9',
        borderLeft: `${themePrimatives.spacing(2)} solid #2b8cc4`
      },
      '&.MuiAlert-colorSuccess':{
        backgroundColor: '#c6ece9',
        borderLeft: `${themePrimatives.spacing(2)} solid ${themePrimatives.palette.success.main}`
        
      },
      '&.MuiAlert-colorWarning':{
        borderLeft: `${themePrimatives.spacing(2)} solid ${themePrimatives.palette.warning.main}`
      }
    },
    filled: {
      padding: themePrimatives.spacing(3),
      color: themePrimatives.palette.common.black,
      '&.MuiAlert-colorError':{
        borderLeft: `${themePrimatives.spacing(2)} solid ${themePrimatives.palette.error.main}`
      },
      '&.MuiAlert-colorInfo':{
        backgroundColor: '#dbeff9',
        borderLeft: `${themePrimatives.spacing(2)} solid #2b8cc4`
      },
      '&.MuiAlert-colorSuccess':{
        borderLeft: `${themePrimatives.spacing(2)} solid ${themePrimatives.palette.success.main}`
        
      },
      '&.MuiAlert-colorWarning':{
        borderLeft: `${themePrimatives.spacing(2)} solid ${themePrimatives.palette.warning.main}`
      }
    },
    outlined: {
      padding: themePrimatives.spacing(3),
      color: themePrimatives.palette.common.black,
      '&.MuiAlert-colorError':{
        borderLeft: `${themePrimatives.spacing(2)} solid ${themePrimatives.palette.error.main}`
      },
      '&.MuiAlert-colorInfo':{
        backgroundColor: '#dbeff9',
        borderLeft: `${themePrimatives.spacing(2)} solid #2b8cc4`
      },
      '&.MuiAlert-colorSuccess':{
        borderLeft: `${themePrimatives.spacing(2)} solid ${themePrimatives.palette.success.main}`
        
      },
      '&.MuiAlert-colorWarning':{
        borderLeft: `${themePrimatives.spacing(2)} solid ${themePrimatives.palette.warning.main}`
      }
    },
  }
}

