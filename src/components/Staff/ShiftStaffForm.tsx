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
  minimumRosteredStaff: number | null,
  email: string
}

export interface ShiftStaffFormData {
  ssf: IShiftStaffForm,
  handleSubmit: (ssf: IShiftStaffForm) => void,
  cancelHandler: () => void
}

export const ShiftStaffForm = ({ssf, handleSubmit, cancelHandler}: ShiftStaffFormData) => {
  const [newShiftName, setNewShiftName] = useState<string>(ssf.shiftName);
  const [selectedDate, setSelectedDate] = useState<Moment>(ssf.startAt);
  const [endDate, setEndDate] = useState<Moment | null>(ssf.endAt);
  const [startTime, setStartTime] = useState<Moment | null>(null);
  const [endTime, setEndTime] = useState<Moment | null>(null);
  const [selectedFrequency, setSelectedFrequency] = useState<string | null>(ssf.frequency ? ssf.frequency : 'daily');
  const [staffNumber, setStaffNumber] = useState<number>(ssf.actualStaff ? ssf.actualStaff : 0);
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
    const diffInMinutes = (endTime.valueOf() - startTime.valueOf()) / 60000;
    console.log("endTime.valueOf", endTime.valueOf())
    console.log("startTime.valueOf", startTime.valueOf())
    console.log("selectedDate", selectedDate.valueOf())
    console.log("difference", startTime.valueOf() - selectedDate.valueOf())
    const ssform: IShiftStaffForm = {
      port: ssf.port,
      terminal: ssf.terminal,
      shiftName: newShiftName,
      startAt: selectedDate,
      periodInMinutes: diffInMinutes,
      endAt: endDate,
      frequency: selectedFrequency,
      actualStaff: staffNumber,
      minimumRosteredStaff: ssf.minimumRosteredStaff,
      email: ssf.email
    };
    handleSubmit(ssform);
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
