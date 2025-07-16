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
      props: { variant: 'white'},
      style: {
        border: `1px solid ${themePrimatives.palette.border.main}`,
      backgroundColor: '#fff'
      }
    },
    {
      props: { variant: 'footer'},
      style: {
        borderTop: `11px solid ${themePrimatives.palette.grey[200]}`,
        'a': {
          color: themePrimatives.palette.common.black,
        }
      }
    },
  ],
  styleOverrides: {
    root: {
      borderRadius: 0,
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
    },
    title: {
      marginBottom: 0,
    },
    subheader: {
      marginBottom: 0,
    }
  } 
}

export const cardContentTheme = {
  styleOverrides: {
    root: {
      padding: themePrimatives.spacing(3),
      '&:last-child': {
        paddingBottom: themePrimatives.spacing(3)
      }
    }
  }
}

export const appbarTheme = {
  styleOverrides: {
    root: {
      border: 'none',
      '.MuiGrid-item': {
        alignItems: 'center',
      },
      '.MuiButton-text': {
        textDecoration: 'none !important',
        display: 'flex',
        flexWrap: 'nowrap',
      }
    }
  }
}
