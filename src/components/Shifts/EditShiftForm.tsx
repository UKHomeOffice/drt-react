import React, {useState} from 'react';
import {Box, Grid, IconButton, MenuItem, Select, TextField, Typography} from '@mui/material';
import {intervalEndTimeOptions, intervalStartTimeOptions, momentToShiftDate , shiftDateToMoment} from '../Util';
import CloseIcon from "@mui/icons-material/Close";
import {ShiftForm} from "./AddShiftsForm";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";

export interface EditShiftFormProps {
  index: number;
  formState: ShiftForm;
  onUpdate: (state: ShiftForm) => void;
  interval: number;
  removeShift: (id: number) => void;
  showSubmitErrors: boolean;
  isEditingPersistedShift: boolean;
}

export const EditShiftForm = ({
                                index,
                                formState,
                                onUpdate,
                                interval,
                                removeShift,
                                showSubmitErrors,
                                isEditingPersistedShift
                              }: EditShiftFormProps) => {

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
    setTimeError(updatedForm.startTime !== '' && updatedForm.endTime !== '' && updatedForm.endTime == updatedForm.startTime)
    setStartTimeError(!startTimeOptions.includes(updatedForm.startTime))
  };

  const handleEndTimeChange = (id: number, hour: number, minute: number) => {
    const newEndTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    const updatedForm = {...formState, endTime: newEndTime};
    onUpdate(updatedForm);
    setTimeError(updatedForm.startTime !== '' && updatedForm.endTime !== '' && updatedForm.endTime == updatedForm.startTime)
    setEndTimeError(!startTimeOptions.includes(updatedForm.endTime))
  };

  console.log(`nameError: ${nameError}, showSubmitErrors: ${showSubmitErrors}, timeError: ${timeError}`)

  return <Box key={formState.id}
              sx={{mb: 2, p: 2, border: '1px solid #ccc', width: '300px', backgroundColor: '#E6E9F1'}}>
    <Typography variant="h2" sx={{paddingBottom: '10px', fontSize: '24px'}}>Shift #{index + 1}</Typography>
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
      <Typography color="error" variant="body2">Start time and end time cannot be the same</Typography>
    )}
    {formState.endTime && formState.startTime && formState.endTime < formState.startTime && (
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
          <Grid item xs={12}>
              <Typography sx={{fontSize: '16px', fontWeight: 'bold'}}>Start Date</Typography>
              <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={'en-gb'}>
                <DatePicker
                  data-cy="start-date-picker"
                  sx={{backgroundColor: '#FFFFFF', width: '100%'}}
                  value={shiftDateToMoment(formState.startDate)}
                  onChange={(date) => {
                    const updatedState = {
                      ...formState,
                      startDate: date ? momentToShiftDate(date) : null // date is a moment object
                    };
                    onUpdate(updatedState);
                  }}
                  format="DD MMMM YYYY"
                  slots={{ textField: (params) => <TextField {...params} data-cy="start-date-picker-text" /> }}
                />
              </LocalizationProvider>
            </Grid>

          <Grid item xs={12}>
            <IconButton color="secondary" onClick={() => removeShift(formState.id)}>
              <CloseIcon/> <Typography sx={{textDecoration: 'underline'}}>Remove shift</Typography>
            </IconButton>
          </Grid>
      </Grid>

    </Grid>
  </Box>
}
