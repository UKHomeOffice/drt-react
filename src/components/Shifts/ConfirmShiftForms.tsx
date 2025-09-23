import React from 'react';
import {Box, Typography, IconButton, Divider, Paper, Button, Table, TableRow, TableBody, TableCell, Stack, Tooltip, ButtonGroup, Grid, Card, CardContent, CardHeader} from '@mui/material';
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
  isEditingPersistedShift?: boolean;
}

export const ConfirmShiftForms = ({
                                    port,
                                    terminal,
                                    shifts,
                                    editShiftsHandler,
                                    confirmHandler,
                                    removeShiftHandler,
                                    isEditingPersistedShift,
                                  }: ShiftsSummaryProps) => {

  return (
    <Box sx={{p: 2, minWidth: '500px'}}>
      <Typography sx={{fontSize: '20px'}}>{isEditingPersistedShift ? "Edit" : "Add"} staff
        to {port} {terminal}</Typography>
      <Typography variant="h1" sx={{paddingBottom: '10px'}}>Step 2 of 2 - Check your shifts</Typography>
      <Typography variant="h2" sx={{paddingBottom: '10px', fontSize: '24px'}}>Summary</Typography>
      <Typography variant="body1">Total shifts: {shifts.length}</Typography>
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
              <Box component="dt" sx={{whiteSpace: 'nowwrap', color: 'black', alignItems: 'center'}}>
                <Typography variant="h3" sx={{fontSize: '20px', mb:'0 !important'}}>{shift.name}</Typography>
              </Box>
              <Box component="dd" sx={{flex: '1', display: 'flex', justifyContent: 'flex-end', flexGrow: 1, color: 'black'}}>
                {!isEditingPersistedShift && (
                  <Button variant='text' color='secondary' startIcon={<CloseIcon />}>
                    Remove shift
                  </Button>
                )}
                <Button variant='text' color="secondary" onClick={() => editShiftsHandler([shift])} startIcon={ <EditIcon />} sx={{gap: '8px', paddingLeft: '20px'}}>
                  Edit
                </Button>
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
            <Box component="dl" sx={{display: 'flex', justifyContent: 'flex-start', gap: '10px', padding: '10px'}}>
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
      <Button variant="contained" color="primary" data-cy="shift-confirm-button"
              onClick={() => confirmHandler(shifts)}>Confirm</Button>
    </Box>
  )
    ;
};
