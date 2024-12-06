import {Shift} from './AddShiftForm';
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Button
} from '@mui/material';

export interface ShiftsSummaryProps {
  shifts: Shift[];
  editShiftsHandler: (shifts: Shift[]) => void;
  confirmHandler: (shifts: Shift[]) => void;
  cancelHandler: () => void;
}

export const ConfirmShiftSummary = ({shifts, confirmHandler}: ShiftsSummaryProps) => {
  return (
    <Box sx={{p: 2, width: '600px'}}>
      <Typography variant="h6">Total Shifts: {Array.from(shifts).length}</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Shift Name</TableCell>
              <TableCell>Start Time</TableCell>
              <TableCell>End Time</TableCell>
              <TableCell>Default Staff Number</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.from(shifts).map((shift) => (
              <TableRow key={shift.id}>
                <TableCell>{shift.name}</TableCell>
                <TableCell>{shift.startTime}</TableCell>
                <TableCell>{shift.endTime}</TableCell>
                <TableCell>{shift.defaultStaffNumber}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{paddingTop: '10px'}}>
        <Typography variant="h6">Please confirm the shifts above</Typography>
        <Box sx={{display: 'flex', justifyContent: 'flex-start', paddingTop: '10px'}}>
          <Box sx={{paddingRight: '10px'}}>
            <Button variant="contained" color="primary">Edit</Button>
          </Box>
          <Box sx={{paddingRight: '10px'}}>
            <Button variant="contained" color="primary" onClick={() => confirmHandler(shifts)}>Confirm</Button>
          </Box>
          <Button variant="contained" color="secondary">Cancel</Button>
        </Box>
      </Box>
    </Box>
  )
}