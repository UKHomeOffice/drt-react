import React, {useState} from 'react';
import {Box, Button, Grid, IconButton, MenuItem, Select, TextField, ThemeProvider, Typography} from '@mui/material';
import {intervalEndTimeOptions, intervalStartTimeOptions} from '../Util';
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
  const [showErrors, setShowErrors] = useState(false);

  const onContinue = () => {
    if (shiftsHaveErrors(shifts)) {
      setShowErrors(true);
      return;
    }
    setShowConfirm(true)
  };

  const onCancel = () => {
    setShowConfirm(false);
  };

  const shiftIsValid = (shift: ShiftForm) => {
    return shift.name !== '' &&
      shift.startTime !== '' &&
      shift.endTime !== '' &&
      shift.startTime < shift.endTime
  }

  const shiftsHaveErrors = (shifts: ShiftForm[]) => shifts.some(shift => {
    console.log(`shiftIsValid: ${shiftIsValid(shift)} ${JSON.stringify(shift, null, 2)}`)
    return !shiftIsValid(shift)
  })

  const handleAddShift = () => {
    if (shiftsHaveErrors(shifts)) {
      setShowErrors(true);
      return;
    }

    setShifts([
      ...shifts,
      {id: shifts.length + 1, name: '', startTime: '', endTime: '', defaultStaffNumber: 0}
    ]);
    setShowErrors(false);
  };

  const handleRemoveShift = (id: number) => {
    setShifts(shifts.filter(shift => shift.id !== id));
  };

  return (
    <ThemeProvider theme={drtTheme}>
      <Box>
        {!showConfirm ? (
          <Box sx={{p: 2, minWidth: '500px'}}>
            <Typography sx={{fontSize: '20px'}}>Add staff to {port} {getAirportNameByCode(port)} {terminal}</Typography>
            <Typography variant="h1" sx={{paddingBottom: '10px'}}>Step 1 of 2 - Create your shift pattern</Typography>
            {Array.from(shifts).map(form => {
              return <EditShiftForm key={form.id}
                                    formState={form}
                                    onUpdate={state => {
                                      const updatedShifts = shifts.map(shift => {
                                        if (shift.id === state.id) {
                                          return {...shift, ...state};
                                        }
                                        return shift;
                                      });
                                      setShifts(updatedShifts)
                                      setShowErrors(shiftsHaveErrors(updatedShifts))
                                    }}
                                    interval={interval}
                                    removeShift={handleRemoveShift}
                                    showSubmitErrors={showErrors}
              />
            })}
            <Box>
              <Button variant="outlined" color="primary" onClick={handleAddShift} sx={{gap: 0, paddingLeft: '0'}}>
                <IconButton color="primary" sx={{padding: '0'}}>
                  <AddIcon/>
                </IconButton>
                Add a shift
              </Button>
            </Box>
            <Box sx={{"paddingTop": "10px"}}>
              <Button variant="contained" color="primary" onClick={onContinue} data-cy="shift-continue-button">
                Continue
              </Button>
              {showErrors && (
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

const EditShiftForm = ({formState, onUpdate, interval, removeShift, showSubmitErrors}: {
  formState: ShiftForm,
  onUpdate: (state: ShiftForm) => void,
  interval: number,
  removeShift: (idx: number) => void,
  showSubmitErrors: boolean,
}) => {

  const [nameError, setNameError] = useState(false)
  const [startTimeError, setStartTimeError] = useState(true)
  const [endTimeError, setEndTimeError] = useState(true)
  const [timeError, setTimeError] = useState(false)

  const startTimeOptions = intervalStartTimeOptions(interval)
  const endTimeOptions = intervalEndTimeOptions(interval);

  const handleStartTimeChange = (id: number, hour: number, minute: number) => {
    const newStartTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    const updatedForm = {...formState, startTime: newStartTime};
    onUpdate(updatedForm);
    console.log(`formstate: ${JSON.stringify(updatedForm, null, 2)}`)
    setTimeError(updatedForm.startTime !== '' && updatedForm.endTime !== '' && updatedForm.endTime <= updatedForm.startTime)
    setStartTimeError(!startTimeOptions.includes(updatedForm.startTime))
  };

  const handleEndTimeChange = (id: number, hour: number, minute: number) => {
    const newEndTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    const updatedForm = {...formState, endTime: newEndTime};
    onUpdate(updatedForm);
    console.log(`formstate: ${JSON.stringify(updatedForm, null, 2)}`)
    setTimeError(updatedForm.startTime !== '' && updatedForm.endTime !== '' && updatedForm.endTime <= updatedForm.startTime)
    setEndTimeError(!startTimeOptions.includes(updatedForm.endTime))
  };

  console.log(`nameError: ${nameError}, showSubmitErrors: ${showSubmitErrors}, timeError: ${timeError}`)

  return <Box key={formState.id}
              sx={{mb: 2, p: 2, border: '1px solid #ccc', width: '300px', backgroundColor: '#E6E9F1'}}>
    <Typography variant="h2" sx={{paddingBottom: '10px', fontSize: '24px'}}>Shift #{formState.id}</Typography>
    {(nameError || (showSubmitErrors && formState.name === '')) && (
      <Typography color="error" variant="body2">Please add shift name</Typography>
    )}
    {showSubmitErrors && startTimeError && (
      <Typography color="error" variant="body2">Please select start time</Typography>
    )}
    {showSubmitErrors && endTimeError && (
      <Typography color="error" variant="body2">Please select end time</Typography>
    )}
    {timeError && (
      <Typography color="error" variant="body2">Start time must be before the and end time</Typography>
    )}
    {formState.endTime < formState.startTime && (
      <Typography color="warning" variant="body2">This is a midnight shift spanning to the next day</Typography>
    )}
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography sx={{fontSize: '16px', fontWeight: 'bold'}}>Name of shift</Typography>
        <TextField
          fullWidth
          value={formState.name}
          placeholder="Enter the shift name"
          autoFocus
          onChange={(e) => {
            const updatedState = {...formState, name: e.target.value};
            onUpdate(updatedState);
            setNameError(updatedState.name === '')
          }}
          inputProps={{'data-cy': 'shift-name-input'}}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography sx={{fontSize: '16px', fontWeight: 'bold'}}>Start time</Typography>
        <Box>
          <Select
            variant="outlined"
            value={startTimeOptions.includes(formState.startTime) ? formState.startTime : 'Select start time'}
            onChange={(e) => {
              const [hour, minute] = (e.target.value as string).split(':').map(Number);
              handleStartTimeChange(formState.id, hour, minute);
            }}
            fullWidth
            inputProps={{role: 'start-time-select'}}
            data-cy="start-time-select"
          >
            <MenuItem value={'Select start time'} disabled>
              Select start time
            </MenuItem>
            {startTimeOptions.map(time => (
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
          value={startTimeOptions.includes(formState.endTime) ? formState.endTime : 'Select end time'}
          onChange={(e) => {
            const [hour, minute] = (e.target.value as string).split(':').map(Number);
            handleEndTimeChange(formState.id, hour, minute);
          }}
          fullWidth
          inputProps={{role: 'end-time-select'}}
          data-cy="end-time-select"
        >
          <MenuItem value={'Select end time'} disabled>
            Select end time
          </MenuItem>
          {endTimeOptions.map(time => (
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
          value={formState.defaultStaffNumber}
          onChange={(e) => {
            const updatedState = {...formState, defaultStaffNumber: parseInt(e.target.value)};
            onUpdate(updatedState);
          }}
          inputProps={{'data-cy': 'staff-number-input'}}
        />
      </Grid>

      <Grid item xs={12}>
        <IconButton color="secondary" onClick={() => removeShift(formState.id)}>
          <CloseIcon/> <Typography sx={{textDecoration: 'underline'}}>Remove shift</Typography>
        </IconButton>
      </Grid>
    </Grid>
  </Box>
}
