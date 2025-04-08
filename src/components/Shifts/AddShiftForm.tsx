import React, {useState, useEffect, useRef} from 'react';
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
    {id: 1, name: '', startTime: '', endTime: '', defaultStaffNumber: 0}
  ]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState(false);
  const isFirstRender = useRef(true);
  const timeOptionsForTheInterval = timeOptions(interval)
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const hasError = shifts.some(shift => shift.name === '' ||
      shift.startTime === shift.endTime ||
      shift.startTime === 'Select start time' || shift.startTime === '' ||
      shift.endTime === 'Select end time' || shift.endTime === '');
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
    setTouched(true);
    const hasError = shifts.some(shift => shift.name === '' ||
      shift.startTime === shift.endTime ||
      shift.startTime === 'Select start time' || shift.startTime === '' ||
      shift.endTime === 'Select end time' || shift.endTime === '');

    if (hasError) {
      setError(true);
      return;
    }

    setShifts([
      ...shifts,
      {id: shifts.length + 1, name: '', startTime: '', endTime: '', defaultStaffNumber: 0}
    ]);
    setError(false);
    isFirstRender.current = true;
  };

  const handleChange = (id: number, field: keyof ShiftForm, value: any) => {
    setTouched(true);
    setShifts(shifts.map(shift => shift.id === id ? {...shift, [field]: value} : shift));
  };

  const handleRemoveShift = (id: number) => {
    setShifts(shifts.filter(shift => shift.id !== id));
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
                {touched && error && (shift.name === '') && (
                  <Typography color="error" variant="body2">Please add shift name</Typography>
                )}
                {touched && error && (shift.startTime === 'Select start time' || shift.startTime === '') && (
                  <Typography color="error" variant="body2">Please select start time</Typography>
                )}
                {touched && error && (shift.endTime === 'Select end time' || shift.endTime === '') && (
                  <Typography color="error" variant="body2">Please select end time</Typography>
                )}
                {touched && error && shift.startTime === shift.endTime && (
                  <Typography color="error" variant="body2">Start time and end time cannot be the same</Typography>
                )}
                {shift.endTime < shift.startTime && (
                  <Typography color="warning" variant="body2">This is a midnight shift spanning to the next day</Typography>
                )}
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography sx={{fontSize: '16px', fontWeight: 'bold'}}>Name of shift</Typography>
                    <TextField
                      fullWidth
                      value={shift.name}
                      placeholder="Enter the shift name"
                      autoFocus
                      onChange={(e) => handleChange(shift.id, 'name', e.target.value)}
                      inputProps={{'data-cy': 'shift-name-input'}}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography sx={{fontSize: '16px', fontWeight: 'bold'}}>Start time</Typography>
                    <Box>
                      <Select
                        variant="outlined"
                        value={timeOptionsForTheInterval.includes(shift.startTime) ? shift.startTime : "Select start time"}
                        onChange={(e) => {
                          const [hour, minute] = (e.target.value as string).split(':').map(Number);
                          handleStartTimeChange(shift.id, hour, minute);
                        }}
                        fullWidth
                        inputProps={{role: 'start-time-select'}}
                        data-cy="start-time-select"
                      >
                        <MenuItem value="Select start time" disabled>
                          Select start time
                        </MenuItem>
                        {timeOptionsForTheInterval.map(time => (
                          <MenuItem key={time} value={time}
                                    data-cy={`select-start-time-option-${time.replace(':', '-')}`}>
                            {time}
                          </MenuItem>
                        ))}
                      </Select>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography sx={{fontSize: '16px', fontWeight: 'bold'}}>End time</Typography>
                    <Select
                      variant="outlined"
                      value={timeOptionsForTheInterval.includes(shift.endTime) ? shift.endTime : "Select end time"}
                      onChange={(e) => {
                        const [hour, minute] = e.target.value.split(':').map(Number);
                        handleEndTimeChange(shift.id, hour, minute);
                      }}
                      fullWidth
                      inputProps={{role: 'end-time-select'}}
                      data-cy="end-time-select"
                    >
                      <MenuItem value="Select end time" disabled>
                        Select end time
                      </MenuItem>
                      {endTimeOptions(interval).map(time => (
                        <MenuItem key={time} value={time}
                                  data-cy={`select-end-time-option-${time.replace(':', '-')}`}>{time}</MenuItem>
                      ))}
                    </Select>
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
                      inputProps={{'data-cy': 'staff-number-input'}}
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
              <Button variant="outlined" color="primary" onClick={handleAddShift} sx={{gap: 0, paddingLeft: '0'}} disabled={error || isFirstRender.current}>
                <IconButton color="primary" sx={{padding: '0'}}>
                  <AddIcon/>
                </IconButton>
                Add a shift
              </Button>
            </Box>
            <Box sx={{"paddingTop": "10px"}}>
              <Button variant="contained" color="primary" onClick={onContinue} disabled={error || isFirstRender.current}
                      data-cy="shift-continue-button">
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

