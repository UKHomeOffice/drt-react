
import { themePrimatives } from "./primatives";


export const tableTheme = {
  styleOverrides: {
    root: {
      '&.striped .MuiTableRow-root': {
        '&:nth-of-type(odd)': {
          backgroundColor: '#fff',
        },
        '&:nth-of-type(even)': {},
      },
      '&.borderless .MuiTableCell-root': {
        borderBottom: 'none !important',
        padding:`${themePrimatives.spacing(1)} ${themePrimatives.spacing(0)}`,
      }
    }
  }

};

export const tableRowTheme = {
  styleOverrides: {
    root: {
    }
  }
};

export const tableCellTheme = {
  styleOverrides: {
    root: {
      fontSize: '19px',
      padding:`${themePrimatives.spacing(2)} ${themePrimatives.spacing(0)}`,
      borderBottom: `1px solid ${themePrimatives.palette.border.main}`
    },
    head: {
      padding:`${themePrimatives.spacing(2)} ${themePrimatives.spacing(0)}`,
      fontWeight: 'bolder'
    }
  }
};