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
import {InfoTooltip} from "../ui";

export interface ShiftsSummaryProps {
  port: string
  terminal: string
  shifts: Shift[];
  editShiftsHandler: (shifts: Shift[]) => void;
  confirmHandler: (shifts: Shift[]) => void;
  removeShiftHandler: (id: number) => void;
}

const findMinStartTimeAndMaxEndTime = (shifts: Shift[]) => {
  if (shifts.length === 0) return {minStartTime: null, maxEndTime: null};

  let minStartTime = shifts[0].startTime;
  let maxEndTime = shifts[0].endTime;

  shifts.forEach(shift => {
    if (shift.startTime < minStartTime) {
      minStartTime = shift.startTime;
    }
    if (shift.endTime > maxEndTime) {
      maxEndTime = shift.endTime;
    }
  });

  return {minStartTime, maxEndTime};
};

const findOverlappingTimePeriods = (shifts: Shift[]) => {
  const overlappingTimePeriods: string[] = [];
  const shiftCount = shifts.length;

  for (let i = 0; i < shiftCount; i++) {
    for (let j = i + 1; j < shiftCount; j++) {
      if (shifts[i].startTime < shifts[j].endTime && shifts[i].endTime > shifts[j].startTime) {
        overlappingTimePeriods.push(`[ ${shifts[j].startTime} ] to [ ${shifts[i].endTime} ]`);
      }
    }
  }

  return overlappingTimePeriods;
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
  const overlappingPeriods: string[] = findOverlappingTimePeriods(shifts);

  return (
    <Box sx={{p: 2, width: '500px'}}>
      <Typography sx={{paddingBottom: '10px'}}>Add staff to {port} {terminal}</Typography>
      <Typography variant="h4" sx={{paddingBottom: '10px'}}>Step 2 of 2 - Check your shifts</Typography>
      <Typography variant="h6" sx={{paddingBottom: '10px',}}>Summary</Typography>
      <Typography variant="body1">Total shifts: {shifts.length}</Typography>
      {

        <Typography variant="body1" sx={{paddingTop: '10px'}}>Hours covered: {minStartTime} to {maxEndTime}</Typography>
      }

      {
        overlappingPeriods.length > 0 ?
          <Box sx={{backgroundColor: "#EEF6FF", paddingTop: '10px', paddingBottom: '10px'}}>
            <Typography variant="body1" sx={{paddingLeft: '30px'}}><InfoTooltip text="Show the time overlapping"/>Time
              periods overlapped by multiple shifts:</Typography>
            {
              overlappingPeriods.map((shiftString: string, index: number) => (
                <Typography key={index} variant="body1"
                            sx={{paddingTop: '10px', paddingLeft: '90px'}}> • {shiftString}</Typography>
              ))
            }
          </Box> :
          <Box sx={{backgroundColor: "#EEF6FF"}}>
            <Typography variant="body1" sx={{padding: '10px', float: "center"}}>No overlapping shifts</Typography>
          </Box>
      }

      <Typography variant="h6" sx={{paddingTop: '10px'}}>Shifts</Typography>
      {
        shifts.map((shift) => (
          <TableContainer component={Paper} sx={{paddingTop: '10px', backgroundColor: 'transparent'}}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{color: "black", backgroundColor: "#B4B5BE"}}>Shift [{shift.name}]</TableCell>
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