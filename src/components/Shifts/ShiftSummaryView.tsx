import React from 'react';
import {Box, Typography, Table, TableBody, TableCell, TableHead, TableRow} from '@mui/material';
import {ShiftSummary} from './ShiftHotTableView';

export interface ShiftSummaryProps {
  shiftSummaries: ShiftSummary[];
}

export const ShiftSummaryView: React.FC<ShiftSummaryProps> = ({shiftSummaries}: ShiftSummaryProps) => {
  return (
    <Box sx={{maxWidth: '800px'}}>
      <Typography variant="h2" gutterBottom>Shift summary</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{width: '150px'}}>Shift</TableCell>
            <TableCell sx={{width: '200px'}}>Times covered</TableCell>
            <TableCell sx={{width: '100px'}}>Default staff</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {shiftSummaries.map((shift, index) => (
            <TableRow key={index}>
              <TableCell sx={{width: '150px'}}>{shift.name}</TableCell>
              <TableCell sx={{width: '200px'}}>{shift.startTime} - {shift.endTime}</TableCell>
              <TableCell sx={{width: '100px'}}>{shift.defaultStaffNumber}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};