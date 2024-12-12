import React, {useState} from 'react';
import {Box, Button, TextField, Typography, Grid, IconButton, Select, MenuItem, ThemeProvider} from '@mui/material';
import {timeOptions, endTimeOptions} from '../Util';
import {ConfirmShiftSummary} from "./ConfirmShiftSummary";
import {drtTheme} from "../../index";
import CloseIcon from "@mui/icons-material/Close";

export interface Shift {
  id: number;
  name: string;
  startTime: string;
  endTime: string;
  defaultStaffNumber: number;
}

export interface ShiftsProps {
  port: string;
  terminal: string;
  interval: number;
  initialShifts: Shift[];
  confirmHandler: (shifts: Shift[]) => void;
}

export const AddShiftForm = ({port, terminal, interval, initialShifts, confirmHandler}: ShiftsProps) => {
  const [shifts, setShifts] = useState<Shift[]>(Array.from(initialShifts).length > 0 ? initialShifts : [
    {id: 1, name: '', startTime: '00:00', endTime: '00:00', defaultStaffNumber: 0}
  ]);

  const [showConfirm, setShowConfirm] = useState(false);

  const onContinue = () => {
    console.log(shifts);
    setShowConfirm(true);
  }
  const onCancel = () => {
    console.log('cancel');
    setShowConfirm(false);
  }

  const handleAddShift = () => {
    setShifts([
      ...Array.from(shifts),
      {id: shifts.length + 1, name: '', startTime: '00:00', endTime: '00:00', defaultStaffNumber: 0}
    ]);
  };

  const handleRemoveShift = (id: number) => {
    setShifts(shifts.filter(shift => shift.id !== id));
  };

  const handleChange = (id: number, field: keyof Shift, value: any) => {
    setShifts(shifts.map(shift => shift.id === id ? {...shift, [field]: value} : shift));
  };

  const handleStartTimeChange = (id: number, hour: number, minute: number) => {
    const newStartTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    handleChange(id, 'startTime', newStartTime);
  };

  const handleEndTimeChange = (id: number, hour: number, minute: number) => {
    const newEndTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    handleChange(id, 'endTime', newEndTime);
  };

  console.log(Array.from(shifts))

  return (
    <ThemeProvider theme={drtTheme}>
      <Box>
        {!showConfirm ? (
          <Box sx={{p: 2, width: '500px'}}>
            <Typography>Add staff to {port} {terminal}</Typography>
            <Typography variant="h4" sx={{paddingBottom: '10px'}}>Step 1 of 2 - Create your shift pattern</Typography>
            {Array.from(shifts).map((shift) => (
              <Box key={shift.id}
                   sx={{mb: 2, p: 2, border: '1px solid #ccc', borderRadius: 2, width: '300px'}}>
                <Typography variant="h6" sx={{paddingBottom: '10px'}}>Shift #{shift.id}</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      label="Name of shift"
                      fullWidth
                      value={shift.name}
                      onChange={(e) => handleChange(shift.id, 'name', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h6">Start Time</Typography>
                    <Box>
                      <Select
                        variant="outlined"
                        value={shift.startTime}
                        onChange={(e) => {
                          const [hour, minute] = e.target.value.split(':').map(Number);
                          handleStartTimeChange(shift.id, hour, minute);
                        }}
                        fullWidth
                        inputProps={{role: 'start-time-select'}}
                        data-cy="start-time-select"
                      >
                        {timeOptions(interval).map(time => (
                          <MenuItem key={time} value={time}
                                    data-cy={`select-start-time-option-${time.replace(':', '-')}`}>{time} </MenuItem>
                        ))}
                      </Select>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h6">End Time</Typography>
                    <Select
                      variant="outlined"
                      value={shift.endTime}
                      onChange={(e) => {
                        const [hour, minute] = e.target.value.split(':').map(Number);
                        handleEndTimeChange(shift.id, hour, minute);
                      }}
                      fullWidth
                      inputProps={{role: 'end-time-select'}}
                      data-cy="end-time-select"
                    >
                      {endTimeOptions(interval).map(time => (
                        <MenuItem key={time} value={time}
                                  data-cy={`select-end-time-option-${time.replace(':', '-')}`}>{time}</MenuItem>
                      ))}
                    </Select>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Default staff number (optional)"
                      type="number"
                      fullWidth
                      value={shift.defaultStaffNumber}
                      onChange={(e) => handleChange(shift.id, 'defaultStaffNumber', parseInt(e.target.value, 10))}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2">
                      For current season only (change this at any time). It will only overwrite zero staffing in DRT.
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <IconButton color="secondary" onClick={() => handleRemoveShift(shift.id)}>
                      <CloseIcon/> <Typography sx={{textDecoration: 'underline'}}>Remove shift</Typography>
                    </IconButton>
                  </Grid>
                </Grid>
              </Box>
            ))}
            <Box>
              <Button variant="outlined" color="primary" onClick={handleAddShift}>
                Add a shift
              </Button>
            </Box>
            <Box sx={{"paddingTop": "10px"}}>
              <Button variant="contained" color="primary" onClick={onContinue}>
                Continue
              </Button>
            </Box>
          </Box>) : (
          <ConfirmShiftSummary port={port}
                               terminal={terminal}
                               shifts={shifts}
                               editShiftsHandler={onCancel}
                               confirmHandler={confirmHandler}
                               removeShiftHandler={handleRemoveShift}/>)
        }
      </Box>
    </ThemeProvider>
  )
};

