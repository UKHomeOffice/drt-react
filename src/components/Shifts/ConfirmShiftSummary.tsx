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
  Button, IconButton
} from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";
import {EditIcon} from "@storybook/icons";
import {getAirportNameByCode} from "../../aiports";

export interface ShiftsSummaryProps {
  port: string
  terminal: string
  shifts: Shift[];
  editShiftsHandler: (shifts: Shift[]) => void;
  confirmHandler: (shifts: Shift[]) => void;
  removeShiftHandler: (id: number) => void;
}

const findMinStartTimeAndMaxEndTime = (shifts: Shift[]) => {
  if (shifts.length === 0) return { minStartTime: null, maxEndTime: null };

  let minStartTime = shifts[0].startTime;
  let maxEndTime = shifts[0].endTime;

  shifts.forEach(shift => {
    if (shift.startTime < minStartTime) {
      minStartTime = shift.startTime;
    }
    if (shift.endTime > maxEndTime || shift.endTime < shift.startTime) {
      maxEndTime = shift.endTime;
    }
  });

  return { minStartTime, maxEndTime };
};

export const ConfirmShiftSummary = ({
                                      port,
                                      terminal,
                                      shifts,
                                      editShiftsHandler,
                                      confirmHandler,
                                      removeShiftHandler
                                    }: ShiftsSummaryProps) => {
  const {minStartTime, maxEndTime} = findMinStartTimeAndMaxEndTime(shifts);

  return (
    <Box sx={{p: 2, minWidth: '500px'}}>
      <Typography sx={{fontSize: '20px'}}>Add staff to {port} {getAirportNameByCode(port)} {terminal}</Typography>
      <Typography variant="h1" sx={{paddingBottom: '10px'}}>Step 2 of 2 - Check your shifts</Typography>
      <Typography variant="h2" sx={{paddingBottom: '10px',fontSize: '24px'}}>Summary</Typography>
      <Typography variant="body1">Total shifts: {shifts.length}</Typography>
      <Typography variant="body1" sx={{paddingTop: '10px'}}>Hours covered: {minStartTime} to {maxEndTime}</Typography>
      <Typography variant="h3" sx={{paddingTop: '10px',fontSize: '20px'}}>Shifts</Typography>
      {
        shifts.map((shift) => (
          <TableContainer key={shift.id} component={Paper} sx={{paddingTop: '10px', backgroundColor: 'transparent'}}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{color: "black", backgroundColor: "#B4B5BE"}}>{shift.name}</TableCell>
                  <TableCell
                    sx={{color: "black", backgroundColor: "#B4B5BE", display: "flex", justifyContent: "flex-end"}}>
                    <IconButton color="secondary" onClick={() => editShiftsHandler([shift])}>
                      <EditIcon/> <Typography sx={{textDecoration: 'underline'}}>Edit shift</Typography>
                    </IconButton>
                    <IconButton color="secondary" onClick={() => removeShiftHandler(shift.id)}>
                      <CloseIcon/> <Typography sx={{textDecoration: 'underline'}}>Remove shift</Typography>
                    </IconButton>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow key={shift.id}>
                  <TableCell>Start time</TableCell>
                  <TableCell>{shift.startTime}</TableCell>
                </TableRow>
                <TableRow key={shift.id}>
                  <TableCell>End time</TableCell>
                  <TableCell>{shift.endTime}</TableCell>
                </TableRow>
                <TableRow key={shift.id}>
                  <TableCell>Default staff number </TableCell>
                  <TableCell>{shift.defaultStaffNumber}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        ))
      }

      <Box sx={{paddingTop: '10px'}}>
        <Box sx={{paddingRight: '10px'}}>
          <Button variant="contained" color="primary" onClick={() => confirmHandler(shifts)}>Confirm</Button>
        </Box>
      </Box>
    </Box>

  )
}