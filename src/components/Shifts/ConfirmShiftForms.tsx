import React from 'react';
import {Box, Typography, IconButton, Divider, Paper, Button} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import {ShiftForm} from "./AddShiftsForm";
import {shiftDateToString} from "../Util";

export interface ShiftsSummaryProps {
  port: string;
  terminal: string;
  shifts: ShiftForm[];
  editShiftsHandler: (shifts: ShiftForm[]) => void;
  confirmHandler: (shifts: ShiftForm[]) => void;
  removeShiftHandler: (id: number) => void;
  shiftStatusHandler: (shiftForm: ShiftForm) => string;
  isEditingPersistedShift?: boolean;
}

function parseHour(time: string): number {
  const [hour] = time.split(":").map(Number);
  return hour === 24 ? 0 : hour;
}

function getHourDifference(startTime: string, endTime: string, hasOvernight: boolean): number {
  const startHour = parseHour(startTime);
  const endHour = parseHour(endTime);
  return hasOvernight ? (endHour + 24) - startHour : endHour - startHour;
}

const findMinStartTimeAndMaxEndTime = (shifts: ShiftForm[]) => {
  if (shifts.length === 0) return {minStartTime: null, maxEndTime: null, hasOvernight: false, hourDifference: 0};

  let minStartTime = shifts[0].startTime;
  let maxEndTime = shifts[0].endTime;
  let hasOvernight = false;
  let parsedMaxEndHour = parseHour(maxEndTime);

  shifts.forEach(shift => {
    if (shift.startTime < minStartTime) {
      minStartTime = shift.startTime;
    }
    // Check for overnight shift
    if (parseHour(shift.endTime) < parseHour(shift.startTime)) {
      // For maxEndTime, consider overnight shifts as next day
      const endHour = parseHour(shift.endTime) + 24;
      if (endHour > parsedMaxEndHour) {
        maxEndTime = shift.endTime;
        parsedMaxEndHour = endHour;
        hasOvernight = true;
      }
    } else {
      if (parseHour(shift.endTime) > parsedMaxEndHour) {
        hasOvernight = false;
        parsedMaxEndHour = parseHour(shift.endTime);
        maxEndTime = shift.endTime;
      }
    }
  });

  const hourDifference = getHourDifference(minStartTime, maxEndTime, hasOvernight);
  return {minStartTime, maxEndTime, hasOvernight, hourDifference};
}

export const ConfirmShiftForms = ({
                                    port,
                                    terminal,
                                    shifts,
                                    editShiftsHandler,
                                    confirmHandler,
                                    removeShiftHandler,
                                    shiftStatusHandler,
                                    isEditingPersistedShift,
                                  }: ShiftsSummaryProps) => {
  const {minStartTime, maxEndTime, hasOvernight, hourDifference} = findMinStartTimeAndMaxEndTime(shifts);
  const shiftStatus = isEditingPersistedShift && shifts.length > 0 ? shiftStatusHandler(shifts[0]) : "No shifts"
  return (
    <Box sx={{p: 2, minWidth: '500px'}}>
      <Typography sx={{fontSize: '20px'}}>{isEditingPersistedShift ? "Edit" : "Add"} staff
        to {port} {terminal}</Typography>
      <Typography variant="h1" sx={{paddingBottom: '10px'}}>Step 2 of 2 - Check your shifts</Typography>
      {isEditingPersistedShift && shiftStatus === 'true' && (
        <Typography variant="h2" sx={{fontSize: '24px' ,color : 'orange'}}>This will be overriding future shifts</Typography>
      )}
      <Typography variant="h2" sx={{paddingBottom: '10px', fontSize: '24px'}}>Summary</Typography>
      <Typography variant="body1">Total shifts: {shifts.length}</Typography>
      <Typography variant="body1" sx={{paddingTop: '10px'}}>Hours
        covered: {minStartTime} to {maxEndTime} {hasOvernight ? " spanning to the next day " : ""} {hourDifference >= 24 ? " (over 24 hours)" : ""}
      </Typography>
      {!isEditingPersistedShift && (
        <Typography variant="h2" sx={{paddingTop: '10px', fontSize: '24px'}}>Shifts</Typography>)}
      {
        shifts.map((shift) => (
          <Box key={shift.id}
               sx={{maxWidth: '500px', backgroundColor: 'transparent', border: '1px solid #ddd', marginTop: '10px'}}>
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
                {!isEditingPersistedShift && (
                  <>
                    <IconButton color="secondary" onClick={() => removeShiftHandler(shift.id)} sx={{gap: '8px'}}>
                      <CloseIcon sx={{height: '24px', width: '24px'}}/>
                      <Typography sx={{textDecoration: 'underline'}}>Remove shift</Typography>
                    </IconButton>
                    <Divider orientation="vertical" flexItem sx={{mx: 1, paddingRight: '20px'}}/>
                  </>
                )}
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
                  <Typography color="warning" variant="body2">This is a midnight shift spanning to the next
                    day</Typography>
                </Box>
              )}
            </Box>
            <Box component="dl" sx={{display: 'flex', justifyContent: 'flex-start', padding: '10px'}}>
              <Box component="dt" sx={{fontWeight: 'bold', minWidth: '150px'}}>Default staff number</Box>
              <Box component="dd">{shift.defaultStaffNumber}</Box>
            </Box>
            <Box component="dl" sx={{display: 'flex', justifyContent: 'flex-start', padding: '10px'}}>
              <Box component="dt" sx={{fontWeight: 'bold', minWidth: '150px'}}>Start Date</Box>
              <Box component="dd">{shiftDateToString(shift.startDate)}</Box>
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
  )
    ;
};
