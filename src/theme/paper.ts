import { themePrimatives } from "./primatives"

export const paperTheme = {
  variants: [
    {
      props: { variant: 'appbar'},
      style: {
        backgroundColor: themePrimatives.palette.grey[100],
        border: 'none',
      }
    },
    {
      props: { variant: 'lightGrey'},
      style: {
        backgroundColor: themePrimatives.palette.grey[100],
      }
    },
    {
      props: { variant: 'header'},
      style: {
        border: 'none',
      }
    },
  ],
  styleOverrides: {
    root: {
      borderRadius: 0,
      border: `1px solid ${themePrimatives.palette.border.main}`,
      backgroundColor: '#fff'
    }
  }
}

export const cardHeaderTheme = {
  styleOverrides: {
    root: {
      '& + .MuiCardContent-root': {
        paddingTop: 0,
      }
    }
  } 
}

export const appbarTheme = {
  styleOverrides: {
    root: {
      border: 'none',
      '.MuiButton-text': {
        textDecoration: 'none !important',
      }
    }
  }
}