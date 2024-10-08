import React, {useState} from "react";
import {Box, Button, Link, TextField, Typography, Select, MenuItem, IconButton} from "@mui/material";
import moment,{Moment} from "moment";
import {TimePicker} from '@mui/x-date-pickers/TimePicker';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
// import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import CloseIcon from "@mui/icons-material/Close";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";

export type IEditShiftStaff = {
  startDayAt: Moment,
  startTimeAt: Moment ,
  endTimeAt: Moment,
  endDayAt: Moment,
  actualStaff: number
}

export interface IEditShiftStaffForm {
  essf: IEditShiftStaff,
  handleSubmit: (ssf: IEditShiftStaff) => void,
  cancelHandler: () => void
}

export const EditShiftStaffForm = ({
                                     essf,
                                     handleSubmit,
                                     cancelHandler
                                   }: IEditShiftStaffForm) => {
  const [startDate, setStartDate] = useState<Moment>(essf.startDayAt);
  const [startTime, setStartTime] = useState<Moment>(essf.startTimeAt);
  const [endTime, setEndTime] = useState<Moment>(essf.endTimeAt);
  const [endDate, setEndDate] = useState<Moment>(essf.endDayAt);
  const [staffNumber, setStaffNumber] = useState<number>(essf.actualStaff);
  const handleStartDateChange = (date: Moment | null) => {
    setStartDate(date);
    setEndDate(date);
  };

  const handleEndDateChange = (date: Moment | null) => {
    setEndDate(date);
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
    console.log("selectedDate", startDate.valueOf())
    console.log("difference", startTime.valueOf() - startDate.valueOf())
    console.log("staffNumber", staffNumber)
    const ess: IEditShiftStaff = {
      startDayAt: startDate,
      startTimeAt: startTime,
      endTimeAt: endTime,
      endDayAt: endDate,
      actualStaff: staffNumber
    };
    handleSubmit(ess);
  }


  return <Box data-testid={`shift-staff-form`}
              sx={{
                paddingTop: '10px',
                paddingLeft: '20px',
                paddingBottom: '10px',
                // backgroundColor: '#B4B5BE',
                border: '1px solid black',
                width: '400px'
              }}>
    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
      <Typography variant="h2" component="h2">Edit staff</Typography>
      <IconButton
        aria-label="close"
        color="inherit"
        size="small"
        onClick={cancelHandler}>
        <CloseIcon fontSize="inherit"/>
      </IconButton>
    </Box>
    <Box sx={{paddingTop: '10px'}}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DatePicker sx={{backgroundColor: '#FFFFFF'}} label="Start Date" value={startDate}
                    onChange={handleStartDateChange}
                    renderInput={(params) => <TextField {...params} />}/>
      </LocalizationProvider>
    </Box>
    <Box sx={{paddingTop: '10px', display: 'flex', justifyContent: 'flex-start'}}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <TimePicker sx={{backgroundColor: '#FFFFFF', width: '150px'}} label="Start Time"
                    value={startTime} onChange={handleStartTimeChange}
                    renderInput={(params) => <TextField {...params} />}/>
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <TimePicker sx={{paddingLeft: '10px', backgroundColor: '#FFFFFF', width: '150px'}} label="End Time"
                    value={endTime} onChange={handleEndTimeChange}
                    renderInput={(params) => <TextField {...params} />}/>
      </LocalizationProvider>
    </Box>
    <Box sx={{paddingTop: '10px'}}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DatePicker sx={{backgroundColor: '#FFFFFF'}} label="End Date" value={endDate} onChange={handleEndDateChange}
                    renderInput={(params) => <TextField {...params} />}/>
      </LocalizationProvider>
    </Box>
    <Box sx={{paddingTop: '10px'}}>
      <TextField sx={{backgroundColor: '#FFFFFF'}} label="Staff Number"
                 value={staffNumber}
                 onChange={handleStaffNumberChange} type="number"/>
    </Box>
    <Box sx={{paddingTop: '10px'}}>
      <Button sx={{
        textTransform: 'none',
        paddingLeft: '10px',
        color: 'white',
        backgroundColor: 'primary.main',
        '&:hover': {
          backgroundColor: 'primary.dark',
        }
      }} onClick={handleSubmitForm}>Save staff updates</Button>
    </Box>
  </Box>

}
