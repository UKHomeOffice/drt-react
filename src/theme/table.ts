
import { themePrimatives } from "./primatives";


export const tableTheme = {
  styleOverrides: {
    root: {
      '& .nowrap': {
        whiteSpace: 'nowrap'
      },
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
      fontSize: "16px",
      lineHeight: themePrimatives.spacing(4),
      [themePrimatives.breakpoints.up("md")]: {
        fontSize: "19px",
        lineHeight: themePrimatives.spacing(5),
      },
      padding:`${themePrimatives.spacing(2)} ${themePrimatives.spacing(1)}`,
      borderBottom: `1px solid ${themePrimatives.palette.border.main}`
    },
    head: {
      padding:`${themePrimatives.spacing(2)} ${themePrimatives.spacing(0)}`,
      fontWeight: 'bolder'
    }
  }
};
