import React from 'react';
import {Box, Typography, IconButton, Divider, Paper, Button, Table, TableRow, TableBody, TableCell, Stack, Tooltip, ButtonGroup, Grid, Card, CardContent, CardHeader} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import {ShiftForm} from "./AddShiftsForm";

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
    <Box sx={{minWidth: '500px'}}>
      <Typography variant='body1'>Add staff to {port} {terminal}</Typography>
      <Typography variant="h1" mb={4}>Step 2 of 2 - Check your shifts</Typography>
      <Typography variant="h2" mb={2}>Summary</Typography>
      <Typography variant="body1">Total shifts: {shifts.length}</Typography>
      <Typography variant="body1">Hours covered: {minStartTime} to {maxEndTime}</Typography>
      <Typography variant="h2" mb={2}>Shifts</Typography>
      {
        shifts.map((shift) => (
          <Card key={shift.id} sx={{maxWidth: '500px', mb: 2}} elevation={0}>
            <CardHeader title={shift.name} titleTypographyProps={{variant: 'h3'}} action={<>
              <Stack direction={'row'}>
                <Tooltip title="Remove shift">
                  <IconButton onClick={() => removeShiftHandler(shift.id)}>
                    <CloseIcon color='error' />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Edit shift">
                  <IconButton onClick={() => editShiftsHandler([shift])}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              </Stack>
            </>} />
            <CardContent>
              <Table className='borderless'>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{width: '50%'}} variant='head'>Start time</TableCell>
                    <TableCell>{shift.startTime}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell variant='head'>End time</TableCell>
                    <TableCell>{shift.endTime}</TableCell>
                  </TableRow>
                  { shift.endTime < shift.startTime && <TableRow>
                    <TableCell colSpan={2}>
                      <Typography color="warning" variant="body2">This is a midnight shift spanning to the next day</Typography>
                    </TableCell>
                  </TableRow> }
                  <TableRow>
                    <TableCell variant='head'>Default staff number</TableCell>
                    <TableCell>{shift.defaultStaffNumber}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ))
      }
      <Button variant="contained" color="primary" data-cy="shift-confirm-button"
              onClick={() => confirmHandler(shifts)}>Confirm</Button>
    </Box>
  );
};
