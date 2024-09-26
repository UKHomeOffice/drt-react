import React, {useState} from "react";
import {Box, Button, Link, TextField, Typography, Select, MenuItem} from "@mui/material";
import {Moment} from "moment";
import {TimePicker} from '@mui/x-date-pickers/TimePicker';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';

export type IShiftStaffForm = {
  port: string,
  terminal: string,
  shiftName: string,
  startAt: Moment,
  periodInMinutes: number,
  endAt: Moment | null,
  frequency: string | null,
  actualStaff: number | null,
  minimumRosteredStaff: number,
  email: string
}

export interface ShiftStaffFormData {
  port: string,
  terminal: string,
  shiftName: string,
  startAt: Moment,
  periodInMinutes: number,
  endAt: Moment | null,
  frequency: string | null,
  actualStaff: number | null,
  minimumRosteredStaff: number,
  email: string,
  handleSubmit: (port: string,
                 terminal: string,
                 shiftName: string,
                 startAt: moment.Moment,
                 periodInMinutes: number,
                 endAt: moment.Moment | null,
                 frequency: string | null,
                 actualStaff: number | null,
                 minimumRosteredStaff: number,
                 email: string) => void,
  cancelHandler: () => void
}

export const ShiftStaffForm = ({port, terminal, shiftName, startAt, periodInMinutes, endAt, frequency, actualStaff, minimumRosteredStaff, email, handleSubmit, cancelHandler}:ShiftStaffFormData) => {
  const [newShiftName, setNewShiftName] = useState<string>(shiftName);
  const [selectedDate, setSelectedDate] = useState<Moment>(startAt);
  const [endDate, setEndDate] = useState<Moment | null>(endAt);
  const [startTime, setStartTime] = useState<Moment | null>(null);
  const [endTime, setEndTime] = useState<Moment | null>(null);
  const [selectedFrequency, setSelectedFrequency] = useState<string | null>(frequency ? frequency : 'daily');
  const [staffNumber, setStaffNumber] = useState<number>(actualStaff ? actualStaff : 0);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const handleEndDateLinkClick = (event) => {
    event.preventDefault();
    setShowEndDatePicker(true);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    setShowEndDatePicker(false);
  };

  const handleDateChange = (date: Moment | null) => {
    setSelectedDate(date);
  };

  const handleStartTimeChange = (date: Moment | null) => {
    setStartTime(date);
  };

  const handleEndTimeChange = (date: Moment | null) => {
    setEndTime(date);
  };

  const handleFrequencyChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedFrequency(event.target.value as string);
  };

  const handleStaffNumberChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setStaffNumber(event.target.value as number);
  };

  const handleShiftNameChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setNewShiftName(event.target.value as string);
  };

  const handleSubmitForm = (event: React.ChangeEvent<{ value: unknown }>) => {
    handleSubmit(port, terminal, newShiftName, selectedDate, periodInMinutes, endTime, selectedFrequency, staffNumber, minimumRosteredStaff, email)
  }


  return <Box data-testid={`shift-staff-form`}
              sx={{
                paddingTop: '10px',
                paddingLeft: '20px',
                paddingBottom: '10px',
                backgroundColor: '#B4B5BE',
                border: '1px solid black'
              }}>
    <Typography variant="h2" component="h2">Add Shift</Typography>
    <TextField sx={{backgroundColor: '#FFFFFF'}} label="Shift name" value={newShiftName}
               onChange={handleShiftNameChange}/>
    <Box sx={{paddingTop: '10px'}}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker sx={{backgroundColor: '#FFFFFF'}} label="Date" value={selectedDate} onChange={handleDateChange}
                    renderInput={(params) => <TextField {...params} />}/>
      </LocalizationProvider>
    </Box>
    <Box sx={{paddingTop: '10px'}}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimePicker sx={{backgroundColor: '#FFFFFF'}} label="Start Time"
                    value={startTime} onChange={handleStartTimeChange}
                    renderInput={(params) => <TextField {...params} />}/>
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimePicker sx={{paddingLeft: '10px', backgroundColor: '#FFFFFF'}} label="End Time"
                    value={endTime} onChange={handleEndTimeChange}
                    renderInput={(params) => <TextField {...params} />}/>
      </LocalizationProvider>
    </Box>
    <Box sx={{paddingTop: '10px'}}>
      <Select value={selectedFrequency} onChange={handleFrequencyChange}
              sx={{backgroundColor: '#FFFFFF', width: '150px', paddingTop: '10px'}}>
        <MenuItem value={'daily'}>Daily</MenuItem>
        <MenuItem value={'weekly'}>Weekly</MenuItem>
        <MenuItem value={'monthly'}>Monthly</MenuItem>
      </Select>
    </Box>
    <Box sx={{paddingTop: '10px'}}>
      {showEndDatePicker ? (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker sx={{backgroundColor: '#FFFFFF'}} label="End Date" value={endDate} onChange={handleEndDateChange}
                      renderInput={(params) => <TextField {...params} />}/>
        </LocalizationProvider>
      ) : (
        <Link href="#" onClick={handleEndDateLinkClick}>Set End Date</Link>
      )}
    </Box>
    <Box sx={{paddingTop: '10px'}}>
      <TextField sx={{backgroundColor: '#FFFFFF'}} label="Staff Number"
                 value={staffNumber}
                 onChange={handleStaffNumberChange} type="number"/>
    </Box>
    <Box sx={{paddingTop: '10px'}}>
      <Button sx={{paddingLeft: '10px'}} onClick={handleSubmitForm}>Add staff</Button>
      <Button sx={{paddingLeft: '20px'}} onClick={cancelHandler}>Cancel</Button>
    </Box>
  </Box>

}