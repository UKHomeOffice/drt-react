import React from 'react';
import {Box, Typography, IconButton, Divider, Paper, Button} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import {ShiftForm} from "./AddShiftForm";

export interface ShiftsSummaryProps {
  port: string;
  terminal: string;
  shifts: ShiftForm[];
  editShiftsHandler: (shifts: ShiftForm[]) => void;
  confirmHandler: (shifts: ShiftForm[]) => void;
  removeShiftHandler: (id: number) => void;
}

const findMinStartTimeAndMaxEndTime = (shifts: ShiftForm[]) => {
  if (shifts.length === 0) return {minStartTime: null, maxEndTime: null};

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

  return {minStartTime, maxEndTime};
};

export const ConfirmShiftForms = ({
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
      <Typography sx={{fontSize: '20px'}}>Add staff to {port} {terminal}</Typography>
      <Typography variant="h1" sx={{paddingBottom: '10px'}}>Step 2 of 2 - Check your shifts</Typography>
      <Typography variant="h2" sx={{paddingBottom: '10px', fontSize: '24px'}}>Summary</Typography>
      <Typography variant="body1">Total shifts: {shifts.length}</Typography>
      <Typography variant="body1" sx={{paddingTop: '10px'}}>Hours covered: {minStartTime} to {maxEndTime}</Typography>
      <Typography variant="h2" sx={{paddingTop: '10px', fontSize: '24px'}}>Shifts</Typography>
      {
        shifts.map((shift) => (
          <Box key={shift.id}
               sx={{maxWidth: '500px', backgroundColor: 'transparent', border: '1px solid #ddd',marginTop: '10px'}}>
            <Box component="dl" sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#F3F5F9',
              padding: '10px',
              marginTop: '0px'
            }}>
              <Box component="dt" sx={{flex: '1', color: 'black'}}>
                <Typography variant="h3" sx={{fontSize: '20px'}}>{shift.name}</Typography>
              </Box>
              <Box component="dd" sx={{flex: '1', display: 'flex', justifyContent: 'flex-end', color: 'black'}}>
                <IconButton color="secondary" onClick={() => removeShiftHandler(shift.id)} sx={{gap: '8px'}}>
                  <CloseIcon sx={{height: '24px', width: '24px'}}/> <Typography sx={{textDecoration: 'underline'}}>Remove
                  shift</Typography>
                </IconButton>
                <Divider orientation="vertical" flexItem sx={{mx: 1, paddingRight: '20px'}}/>
                <IconButton color="secondary" onClick={() => editShiftsHandler([shift])}
                            sx={{gap: '8px', paddingLeft: '20px'}}>
                  <EditIcon sx={{height: '24px', width: '24px'}}/> <Typography sx={{textDecoration: 'underline'}}>Edit
                  shift</Typography>
                </IconButton>
              </Box>
            </Box>
            <Box component="dl" sx={{display: 'flex', justifyContent: 'flex-start', padding: '10px'}}>
              <Box component="dt" sx={{fontWeight: 'bold', minWidth: '150px'}}>Start time</Box>
              <Box component="dd">{shift.startTime}</Box>
            </Box>
            <Box>
            <Box component="dl" sx={{display: 'flex', justifyContent: 'flex-start', padding: '10px'}}>
              <Box component="dt" sx={{fontWeight: 'bold', minWidth: '150px'}}>End time</Box>
              <Box component="dd">{shift.endTime}</Box>
            </Box>
            {shift.endTime < shift.startTime && (
              <Box component="dt" sx={{paddingLeft: '10px'}}>
                <Typography color="warning" variant="body2">This is a midnight shift spanning to the next day</Typography>
              </Box>
            )}
            </Box>
            <Box component="dl" sx={{display: 'flex', justifyContent: 'flex-start', padding: '10px'}}>
              <Box component="dt" sx={{fontWeight: 'bold', minWidth: '150px'}}>Default staff number</Box>
              <Box component="dd">{shift.defaultStaffNumber}</Box>
            </Box>
          </Box>
        ))
      }
      <Box sx={{paddingTop: '10px'}}>
        <Box sx={{paddingRight: '10px'}}>
          <Button variant="contained" color="primary" data-cy="shift-confirm-button"
                  onClick={() => confirmHandler(shifts)}>Confirm</Button>
        </Box>
      </Box>
    </Box>
  );
};