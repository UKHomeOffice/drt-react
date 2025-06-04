import React, {useState} from 'react';
import {Box, Button, Card, CardContent, CardHeader, FormControl, FormHelperText, Grid, IconButton, InputLabel, MenuItem, Select, Stack, TextField, Tooltip, Typography} from '@mui/material';
import {intervalEndTimeOptions, intervalStartTimeOptions} from '../Util';
import CloseIcon from "@mui/icons-material/Close";
import {ShiftForm} from "./AddShiftsForm";

export const EditShiftForm = ({index, formState, onUpdate, interval, removeShift, showSubmitErrors}: {
  index: number,
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

  return <Card variant='lightGrey' key={formState.id} sx={{width: '300px'}} elevation={0}>
    <CardHeader 
      title={`Shift #${index + 1}`}
      titleTypographyProps={{
        variant: 'h3'
      }}
      action={
        <Tooltip title="Remove shift">
          <IconButton onClick={() => removeShift(formState.id)}>
            <CloseIcon color='error' />
          </IconButton>
        </Tooltip>
      } />
    <CardContent>
      <Stack direction="column" spacing={3}>
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
        <TextField
          label="Name of shift"
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
        <FormControl fullWidth>
          <InputLabel>Start time</InputLabel>
          <Select
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
        </FormControl>
        <FormControl sx={{width: '100%'}}>
          <InputLabel>End time</InputLabel>
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
            sx={{width: '100%'}}
          >
            <MenuItem value={'Select end time'} disabled>
              Select end time
            </MenuItem>
            {endTimeOptions.map(time => (
              <MenuItem key={time} value={time}
                        data-cy={`select-end-time-option-${time.replace(':', '-')}`}>{time}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Default staff number (optional)"
          helperText="For current season only (change this at any time). It will only overwrite zero staffing in DRT."
          type="number"
          fullWidth
          value={formState.defaultStaffNumber}
          onChange={(e) => {
            const updatedState = {...formState, defaultStaffNumber: parseInt(e.target.value)};
            onUpdate(updatedState);
          }}
          inputProps={{'data-cy': 'staff-number-input'}}
        />
      </Stack>
    </CardContent>
  </Card>
}
