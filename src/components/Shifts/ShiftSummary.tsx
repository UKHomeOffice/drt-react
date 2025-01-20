import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { DefaultShift } from './ShiftHotTableView';

export interface InitialShiftsProps {
  shifts: DefaultShift[];
}

export const ShiftSummary: React.FC<InitialShiftsProps> = ({ shifts }: InitialShiftsProps) => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>Shift Summary</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ border: '1px solid #ccc' }}>Shift</TableCell>
            <TableCell sx={{ border: '1px solid #ccc' }}>Times Covered</TableCell>
            <TableCell sx={{ border: '1px solid #ccc' }}>Default Staff</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {shifts.map((shift, index) => (
            <TableRow key={index}>
              <TableCell sx={{ border: '1px solid #ccc' }}>{shift.name}</TableCell>
              <TableCell sx={{ border: '1px solid #ccc' }}>{shift.startTime} - {shift.endTime}</TableCell>
              <TableCell sx={{ border: '1px solid #ccc' }}>{shift.defaultStaffNumber}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};