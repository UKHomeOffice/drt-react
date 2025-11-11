import React from 'react';
import {Box, Typography, Button} from '@mui/material';
import {ShiftForm} from "./ShiftsForm";
import {shiftDateToString} from "../Util";

export interface RemoveShiftFormProps {
  shift: ShiftForm;
  onConfirm: (shifts: ShiftForm) => void;
  onCancel: () => void;
}

export const ConfirmRemoveShift = ({
                                    shift,
                                    onConfirm,
                                    onCancel
                                   }: RemoveShiftFormProps) => {

  return (
    <Box sx={{p: 2, minWidth: '500px'}}>
      <Typography variant="h1" sx={{paddingBottom: '10px'}}>Confirm shift removal</Typography>
          <Box key={shift.id}
               sx={{maxWidth: '500px', backgroundColor: 'transparent', border: '1px solid #ddd', marginTop: '10px', marginBottom: '10px',}}>
            <Box component="dl" sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#F3F5F9',
              padding: '10px',
              marginTop: '0px',
            }}>
              <Box component="dt" sx={{whiteSpace: 'nowwrap', color: 'black', alignItems: 'center', marginTop: '10px'}}>
                <Typography variant="h3" sx={{mb:'0 !important'}}>{shift.name}</Typography>
              </Box>
            </Box>
            <Box component="dl" sx={{display: 'flex', justifyContent: 'flex-start', paddingX: '10px', margin:'0 10px 10px 10px', borderBottom: '1px solid #ddd', fontSize: '19px'}}>
              <Box component="dt" sx={{fontWeight: 'bold', width: '30%', marginBottom: '5px'}}>Start time</Box>
              <Box component="dd">{shift.startTime}</Box>
            </Box>
            <Box>
              <Box component="dl" sx={{display: 'flex', justifyContent: 'flex-start', paddingX: '10px', margin:'0 10px 10px 10px', borderBottom: '1px solid #ddd', fontSize: '19px'}}>
                <Box component="dt" sx={{fontWeight: 'bold', width: '30%', marginBottom: '5px'}}>End time</Box>
                <Box component="dd">{shift.endTime}</Box>
              </Box>
            </Box>
            <Box component="dl" sx={{display: 'flex', justifyContent: 'flex-start', paddingX: '10px', margin:'0 10px 10px 10px', borderBottom: '1px solid #ddd', fontSize: '19px'}}>
              <Box component="dt" sx={{fontWeight: 'bold', width: '30%', marginBottom: '5px'}}>Default staff number</Box>
              <Box component="dd">{shift.defaultStaffNumber}</Box>
            </Box>
            <Box component="dl" sx={{display: 'flex', justifyContent: 'flex-start', paddingX: '10px', margin:'0 10px 20px 10px', fontSize: '19px'}}>
              <Box component="dt" sx={{fontWeight: 'bold', width: '30%', marginBottom: '5px'}}>Start Date</Box>
              <Box component="dd">{shiftDateToString(shift.startDate)}</Box>
            </Box>
          </Box>
      <Typography variant="body1">Are you sure you want to remove this shift?</Typography>
      <Box sx={{display: 'flex', justifyContent: 'flex-start', gap: '10px', marginTop: '20px'}}>
      <Button variant="contained" color="secondary" data-cy="shift-confirm-button" onClick={() => onCancel()}>Cancel</Button>
      <Button variant="contained" color="primary" data-cy="shift-confirm-button"
              onClick={() => onConfirm(shift)}>Remove</Button>
      </Box>
    </Box>
  )

};
