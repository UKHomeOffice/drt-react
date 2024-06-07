import React from "react";
import { TableHead, TableHeadProps, TableCell, TableCellProps, TableBody, TableBodyProps } from "@mui/material";
import { styled } from '@mui/material/styles';

export const StyledTableHeader = styled(TableHead)<TableHeadProps>(({ theme }) => ({
  fontWeight: 'bold',
  backgroundColor: '#334F96',
  color: '#fff',
  tableLayout: 'fixed',
}));

export const StyledTableHeaderCell = styled(TableCell)<TableCellProps>(({ theme }) => ({
  fontWeight: 'bold',
  color: '#fff',
  whiteSpace: 'nowrap',
}));

export const StyledTableBody = styled(TableBody)<TableBodyProps>(({ theme }) => ({
  '& tr:nth-of-type(even) ': {
    backgroundColor: '#efefef',
  },
  '& > td': {
    verticalAlign: 'top'
  }
}));

export const RelativeTableCell = styled(TableCell)<TableCellProps>(({ theme }) => ({
  position: 'relative'
}));

export const CellHighlight = styled('div')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  bottom: 0,
  height: '3px',
}));

export interface ICellStatusHighlight {
  status: string,
}

export const CellStatusHighlight = ({status}: ICellStatusHighlight) => {
  let bgColor;
  switch (status) {
    case 'success':
      bgColor = '#86AD1B'
      break;
    case 'warning':
      bgColor = '#C94900'
      break;
    case 'error':
      bgColor = '#FF5C5C'
      break;
    case 'info':
    default:
      bgColor = '#404252'
      break;
  }
  return <CellHighlight sx={{backgroundColor: bgColor}} />
}
