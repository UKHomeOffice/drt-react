import React, {useState} from 'react';
import {Box, Button, TextField, Typography, Grid, IconButton, Select, MenuItem} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {timeOptions, endTimeOptions} from '../Util';

export interface Shift {
  id: number;
  name: string;
  startTime: string;
  endTime: string;
  defaultStaffNumber: number;
}

export interface Shifts {
  interval: number;
  initialShifts: Shift[];
}

export const AddShiftForm = ({interval, initialShifts}: Shifts) => {
  const [shifts, setShifts] = useState<Shift[]>(initialShifts || [
    {id: 1, name: '', startTime: '00:00', endTime: '00:00', defaultStaffNumber: 0}
  ]);

  const onContinue = () => {
    console.log(shifts);
  }
  const handleAddShift = () => {
    setShifts([
      ...shifts,
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

  return (
    <Box sx={{p: 2, width: '400px'}}>
      <Typography variant="h5">Add staff to BHX (Birmingham) T1</Typography>
      <Typography variant="h6">Step 1 of 2 - Create your shift pattern</Typography>
      {shifts.length > 0 && <Typography variant="body1">{shifts.length} Add your shifts below</Typography>}
      {shifts.length === 0 && <Typography variant="body1">No shifts added</Typography>}
      {console.log(Array.from(shifts))}
      {Array.from(shifts).map((shift) => (
        <Box key={shift.id} sx={{mb: 2, p: 2, border: '1px solid #ccc', borderRadius: 2}}>
          <Typography variant="h6">Shift #{shift.id}</Typography>
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
                <DeleteIcon/> Remove shift
              </IconButton>
            </Grid>
          </Grid>
        </Box>
      ))}
      <Button variant="contained" color="primary" onClick={handleAddShift}>
        Add a shift
      </Button>
      <Button variant="contained" color="primary" sx={{ml: 2}} onClick={onContinue}>
        Continue
      </Button>
    </Box>
  );
};

