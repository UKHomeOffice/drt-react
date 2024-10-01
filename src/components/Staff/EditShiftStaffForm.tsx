import React, {useState} from "react";
import {Box, Button, Link, TextField, Typography, Select, MenuItem} from "@mui/material";
import {Moment} from "moment";
import {TimePicker} from '@mui/x-date-pickers/TimePicker';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';

export type IEditShiftStaff = {
  dayAt: Moment,
  startTime: Moment | null,
  endTime: Moment | null,
  actualStaff: number | null
}

export interface IEditShiftStaffForm {
  essf: IEditShiftStaff | null,
  handleSubmit: (ssf: IEditShiftStaff) => void,
  cancelHandler: () => void
}

export const EditShiftStaffForm = ({essf, handleSubmit, cancelHandler}: IEditShiftStaffForm) => {
  const [selectedDate, setSelectedDate] = useState<Moment>(essf?.dayAt);
  const [startTime, setStartTime] = useState<Moment | null>(null);
  const [endTime, setEndTime] = useState<Moment | null>(null);
  const [staffNumber, setStaffNumber] = useState<number>(essf?.actualStaff ? essf?.actualStaff : 0);

  const handleDateChange = (date: Moment | null) => {
    setSelectedDate(date);
  };

  const handleStartTimeChange = (date: Moment | null) => {
    setStartTime(date);
  };

  const handleEndTimeChange = (date: Moment | null) => {
    setEndTime(date);
  };

  const handleStaffNumberChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setStaffNumber(event.target.value as number);
  };

  const handleSubmitForm = (event: React.ChangeEvent<{ value: unknown }>) => {
    const diffInMinutes = (endTime.valueOf() - startTime.valueOf()) / 60000;
    console.log("endTime.valueOf", endTime.valueOf())
    console.log("startTime.valueOf", startTime.valueOf())
    console.log("selectedDate", selectedDate.valueOf())
    console.log("difference", startTime.valueOf() - selectedDate.valueOf())
    console.log("staffNumber", staffNumber)
    const ess: IEditShiftStaff = {
      dayAt: selectedDate,
      startTime: startTime,
      endTime: endTime,
      actualStaff: staffNumber
    };
    handleSubmit(ess);
  }


  return <Box data-testid={`shift-staff-form`}
              sx={{
                paddingTop: '10px',
                paddingLeft: '20px',
                paddingBottom: '10px',
                backgroundColor: '#B4B5BE',
                border: '1px solid black',
                width: '350px'
              }}>
    <Typography variant="h2" component="h2">Update staff</Typography>
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
      </Box>
    <Box sx={{paddingTop: '10px'}}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker sx={{backgroundColor: '#FFFFFF'}} label="End Time"
                      value={endTime} onChange={handleEndTimeChange}
                      renderInput={(params) => <TextField {...params} />}/>
        </LocalizationProvider>
    </Box>
    <Box sx={{paddingTop: '10px'}}>
      <TextField sx={{backgroundColor: '#FFFFFF'}} label="Staff Number"
                 value={staffNumber}
                 onChange={handleStaffNumberChange} type="number"/>
    </Box>
    <Box sx={{paddingTop: '10px'}}>
      <Button sx={{paddingLeft: '10px'}} onClick={handleSubmitForm}>Update staff</Button>
      <Button sx={{paddingLeft: '20px'}} onClick={cancelHandler}>Cancel</Button>
    </Box>
  </Box>

}
