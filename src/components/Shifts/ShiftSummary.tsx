import React from 'react';
import {Box, Typography, Table, TableBody, TableCell, TableHead, TableRow} from '@mui/material';
import {DefaultShift} from './ShiftHotTableView';

export interface InitialShiftsProps {
  shifts: DefaultShift[];
}

export const ShiftSummary: React.FC<InitialShiftsProps> = ({shifts}: InitialShiftsProps) => {
  return (
    <Box sx={{maxWidth: '800px'}}>
      <Typography variant="h2" gutterBottom>Shift summary</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{border: '1px solid #ccc', width: '150px'}}>Shift</TableCell>
            <TableCell sx={{border: '1px solid #ccc', width: '200px'}}>Times covered</TableCell>
            <TableCell sx={{border: '1px solid #ccc', width: '100px'}}>Default staff</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {shifts.map((shift, index) => (
            <TableRow key={index}>
              <TableCell sx={{border: '1px solid #ccc', width: '150px'}}>{shift.name}</TableCell>
              <TableCell sx={{border: '1px solid #ccc', width: '200px'}}>{shift.startTime} - {shift.endTime}</TableCell>
              <TableCell sx={{border: '1px solid #ccc', width: '100px'}}>{shift.defaultStaffNumber}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};