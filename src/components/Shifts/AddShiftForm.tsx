import React, {useState, useEffect} from 'react';
import {Box, Button, TextField, Typography, Grid, IconButton, Select, MenuItem, ThemeProvider} from '@mui/material';
import {timeOptions, endTimeOptions} from '../Util';
import {ConfirmShiftForms} from "./ConfirmShiftForms";
import {drtTheme} from "../../index";
import CloseIcon from "@mui/icons-material/Close";
import {getAirportNameByCode} from "../../aiports";
import AddIcon from '@mui/icons-material/Add';

export interface ShiftForm {
  id: number;
  name: string;
  startTime: string;
  endTime: string;
  defaultStaffNumber: number;
}

export interface ShiftsFormProps {
  port: string;
  terminal: string;
  interval: number;
  shiftForms: ShiftForm[];
  confirmHandler: (shiftForms: ShiftForm[]) => void;
}

export const AddShiftForm = ({port, terminal, interval, shiftForms, confirmHandler}: ShiftsFormProps) => {
  const [shifts, setShifts] = useState<ShiftForm[]>(Array.from(shiftForms).length > 0 ? shiftForms : [
    {id: 1, name: 'Shift 1', startTime: '00:00', endTime: '01:00', defaultStaffNumber: 0}
  ]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const hasError = shifts.some(shift => shift.name === '' || shift.startTime === shift.endTime);
    setError(hasError);
  }, [shifts]);

  const onContinue = () => {
    if (!error) {
      setShowConfirm(true);
    }
  };

  const onCancel = () => {
    setShowConfirm(false);
  };

  const handleAddShift = () => {
    setShifts([
                ...Array.from(shifts),
                {id: shifts.length + 1, name: 'Shift ' + (shifts.length + 1), startTime: '00:00', endTime: '01:00', defaultStaffNumber: 0}
              ]);
  };

  const handleRemoveShift = (id: number) => {
    setShifts(shifts.filter(shift => shift.id !== id));
  };

  const handleChange = (id: number, field: keyof ShiftForm, value: any) => {
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

  return (
    <ThemeProvider theme={drtTheme}>
      <Box>
        {!showConfirm ? (
          <Box sx={{p: 2, minWidth: '500px'}}>
            <Typography sx={{fontSize: '20px'}}>Add staff to {port} {getAirportNameByCode(port)} {terminal}</Typography>
            <Typography variant="h1" sx={{paddingBottom: '10px'}}>Step 1 of 2 - Create your shift pattern</Typography>
            {Array.from(shifts).map((shift) => (
              <Box key={shift.id}
                   sx={{mb: 2, p: 2, border: '1px solid #ccc', width: '300px', backgroundColor: '#E6E9F1'}}>
                <Typography variant="h2" sx={{paddingBottom: '10px', fontSize: '24px'}}>Shift #{shift.id}</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography sx={{fontSize: '16px', fontWeight: 'bold'}}>Name of shift</Typography>
                    <TextField
                      fullWidth
                      value={shift.name}
                      onChange={(e) => handleChange(shift.id, 'name', e.target.value)}
                      error={shift.name === ''}
                      helperText={shift.name === '' ? 'Name is required' : ''}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography sx={{fontSize: '16px', fontWeight: 'bold'}}>Start time</Typography>
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
                  <Grid item xs={12}>
                    <Typography sx={{fontSize: '16px', fontWeight: 'bold'}}>End time</Typography>
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
                      error={shift.startTime === shift.endTime}
                    >
                      {endTimeOptions(interval).map(time => (
                        <MenuItem key={time} value={time}
                                  data-cy={`select-end-time-option-${time.replace(':', '-')}`}>{time}</MenuItem>
                      ))}
                    </Select>
                    {shift.startTime === shift.endTime && (
                      <Typography color="error" variant="body2">Start time and end time cannot be the same</Typography>
                    )}
                    {shift.endTime < shift.startTime && (
                      <Typography color="warning" variant="body2">This is a midnight shift spanning to the next day</Typography>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <Typography sx={{fontSize: '16px', fontWeight: 'bold'}}>Default staff number (optional)</Typography>
                    <Grid item xs={12}>
                      <Typography variant="body2" sx={{fontSize: '14px'}}>
                        For current season only (change this at any time). It will only overwrite zero staffing in DRT.
                      </Typography>
                    </Grid>
                    <TextField
                      type="number"
                      fullWidth
                      value={shift.defaultStaffNumber}
                      onChange={(e) => handleChange(shift.id, 'defaultStaffNumber', parseInt(e.target.value, 10))}
                    />
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
              <Button variant="outlined" color="primary" onClick={handleAddShift} sx={{gap: 0, paddingLeft: '0'}}>
                <IconButton color="primary" sx={{padding: '0'}}>
                  <AddIcon/>
                </IconButton>
                Add a shift
              </Button>
            </Box>
            <Box sx={{"paddingTop": "10px"}}>
              <Button variant="contained" color="primary" onClick={onContinue} disabled={error}>
                Continue
              </Button>
              {error && (
                <Typography color="error" variant="body2">Please fix the errors before continuing</Typography>
              )}
            </Box>
          </Box>) : (
          <ConfirmShiftForms port={port}
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

