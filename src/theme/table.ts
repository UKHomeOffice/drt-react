
import { themePalette } from "./palette";


export const tableTheme = {
  styleOverrides: {
    root: {
      '&.striped .MuiTableRow-root': {
        '&:nth-of-type(odd)': {
          backgroundColor: themePalette.palette.common.white,
        },
        '&:nth-of-type(even)': {
          // backgroundColor: alpha(themePalette.palette.grey[100], 0.5),
        },
      },
      '&.borderless .MuiTableCell-root': {
        borderBottom: 'none !important',
        padding:`${themePalette.spacing(1)} ${themePalette.spacing(0)}`,
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
      padding:`${themePalette.spacing(2)} ${themePalette.spacing(0)}`,
      borderBottom: `1px solid ${themePalette.palette.border.main}`
    },
    head: {
      padding:`${themePalette.spacing(2)} ${themePalette.spacing(0)}`,
      fontWeight: 'bolder'
    }
  }
};