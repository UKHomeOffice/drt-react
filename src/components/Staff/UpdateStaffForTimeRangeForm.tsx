import React, {useState} from "react";
import {Box, Button, IconButton, MenuItem, Select, TextField, Typography} from "@mui/material";
import moment, {Moment} from "moment";
import CloseIcon from "@mui/icons-material/Close";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleIcon from '@mui/icons-material/People';
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';

moment.updateLocale('en-gb', {
  week: {
    dow: 1, // Set the first day of the week to Monday
  },
});

export type IUpdateStaffForTimeRangeData = {
  startDayAt: Moment,
  startTimeAt: Moment,
  endTimeAt: Moment,
  endDayAt: Moment,
  actualStaff: number
}

export interface IUpdateStaffForTimeRangeForm {
  ustd: IUpdateStaffForTimeRangeData,
  interval: number,
  handleSubmit: (ssf: IUpdateStaffForTimeRangeData) => void,
  cancelHandler: () => void
}


export const UpdateStaffForTimeRangeForm = ({
                                              ustd,
                                              interval,
                                              handleSubmit,
                                              cancelHandler
                                            }: IUpdateStaffForTimeRangeForm) => {
  const [startDate, setStartDate] = useState<Moment>(ustd.startDayAt);
  const [startTime, setStartTime] = useState<Moment>(ustd.startTimeAt.startOf('day'));
  const [endTime, setEndTime] = useState<Moment>(ustd.endTimeAt.startOf('day').add(interval, 'minutes'));
  const [endDate, setEndDate] = useState<Moment>(ustd.endDayAt);
  const [staffNumber, setStaffNumber] = useState<number>(ustd.actualStaff);
  const [error, setError] = useState<string | null>(null);

  const handleStartDateChange = (date: Moment | null) => {
    setStartDate(date?.startOf('day') || moment());
    setEndDate(date?.startOf('day') || moment());
  };

  const handleEndDateChange = (date: Moment | null) => {
    setEndDate(date?.startOf('day') || moment());
  };

  const handleStartTimeChange = (hour: number, minute: number) => {
    const newStartTime = moment(startTime).set({hour, minute});
    setStartTime(newStartTime);
    if (newStartTime.isSameOrAfter(endTime)) {
      setError("Start time must be less than or equal to end time.");
      return;
    }
    setError(null);
  };


  const handleEndTimeChange = (hour: number, minute: number) => {
    let newEndTime: Moment;
    if (startTime.hour() === 0 && startTime.minute() === 0 && hour === 0 && minute === 0) {
      newEndTime = moment(startTime).add(1, 'day').startOf('day');
    } else {
      newEndTime = moment(startTime).set({ hour: hour, minute: minute });
    }
    setEndTime(newEndTime);
    if (newEndTime.isSameOrBefore(startTime)) {
      setError("End time must be greater than or equal to start time.");
      return;
    }
    setError(null);
  };

  const handleStaffNumberChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setStaffNumber(event.target.value as number);
  };

  const handleSubmitForm = () => {
    const adjustedEndTime = endTime.subtract(1, 'minute');

    const ess: IUpdateStaffForTimeRangeData = {
      startDayAt: startDate,
      startTimeAt: startTime,
      endTimeAt: adjustedEndTime,
      endDayAt: endDate,
      actualStaff: staffNumber
    };
    handleSubmit(ess);
  };

  function timesBy15Minutes(): string[] {
    const times: string[] = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute <= 45; minute += interval) {
        times.push(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`);
      }
    }
    return times;
  }

  const timeOptions = timesBy15Minutes()

  function timesBy15MinutesWithEnd(): string[] {
    const times: string[] = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute <= 45; minute += interval) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
        if (time !== '00:00') {
          times.push(time);
        }
      }
    }
    times.push('00:00');
    return times;
  }


  const endTimeOptions = timesBy15MinutesWithEnd()

  return (
    <Box data-testid={`shift-staff-form`} sx={{padding: '10px 20px', width: '400px'}}>
      <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
        <Typography variant="h2" component="h2" fontWeight={"bold"}>Edit staff</Typography>
        <IconButton aria-label="close" color="inherit" size="small" onClick={cancelHandler}>
          <CloseIcon fontSize="inherit"/>
        </IconButton>
      </Box>
      <Box sx={{paddingTop: '10px'}}>
        <Typography variant="h3" component="h3">Date</Typography>
        <Box sx={{paddingTop: '10px'}}>
          <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={'en-gb'}>
            <DatePicker sx={{backgroundColor: '#FFFFFF', width: '100%'}} label="Start Date" value={startDate}
                        onChange={handleStartDateChange}
                        format="DD MMMM YYYY"
                        slots={{textField: (params) => <TextField {...params} />}}
            />
          </LocalizationProvider>
        </Box>
        <Box sx={{paddingTop: '10px'}}>
          <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={'en-gb'}>
            <DatePicker sx={{backgroundColor: '#FFFFFF', width: '100%'}}
                        label="End Date"
                        value={endDate}
                        onChange={handleEndDateChange}
                        format="DD MMMM YYYY"
                        slots={{textField: (params) => <TextField {...params} />}}
            />
          </LocalizationProvider>
        </Box>
      </Box>
      <Box sx={{paddingTop: '10px'}}>
        <Typography variant="h3" component="h3">Time</Typography>
        <Box sx={{paddingTop: '10px', display: 'flex', justifyContent: 'flex-start'}}>
          <Box sx={{width: '50%', paddingRight: '10px'}}>
            <Typography variant="h6">Start Time</Typography>
            <Box>
              <Select
                variant="outlined"
                value={startTime.format('HH:mm')}
                onChange={(e) => {
                  const [hour, minute] = e.target.value.split(':').map(Number);
                  handleStartTimeChange(hour, minute);
                }}
                fullWidth
              >
                {timeOptions.map(time => (
                  <MenuItem key={time} value={time}>{time}</MenuItem>
                ))}
              </Select>
            </Box>
          </Box>
          <Box sx={{width: '50%', paddingLeft: '10px'}}>
            <Typography variant="h6">End Time</Typography>
            <Select
              variant="outlined"
              value={endTime.format('HH:mm')}
              onChange={(e) => {
                const [hour, minute] = e.target.value.split(':').map(Number);
                handleEndTimeChange(hour, minute);
              }}
              fullWidth
            >
              {endTimeOptions.map(time => (
                <MenuItem key={time} value={time}>{time}</MenuItem>
              ))}
            </Select>
          </Box>
        </Box>
      </Box>
      <Box sx={{paddingTop: '10px', paddingBottom: '10px'}}>
        <Typography variant="h3" component="h3">Staff</Typography>
        <Box sx={{paddingTop: '10px'}}>
          <TextField
            label="Staff Number"
            value={staffNumber}
            onChange={handleStaffNumberChange}
            type="number"
            fullWidth
          />
        </Box>
      </Box>
      {error && <Typography color="error" sx={{paddingTop: '10px'}}>{error}</Typography>}
      <Box sx={{
        paddingTop: '10px',
        paddingBottom: '10px',
        paddingLeft: '10px',
        paddingRight: '20px',
        backgroundColor: '#E6E9F1'
      }}>
        <Typography variant="h6">Summary of Selections:</Typography>
        <Box sx={{paddingTop: '10px'}}>
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            <CalendarTodayIcon sx={{marginRight: '5px'}}/>
            <span
              style={{fontWeight: 'bold'}}>{startDate.format(startDate.year() === endDate.year() ? 'DD MMM' : 'DD MMM YY')} to {endDate.format('DD MMM YYYY')}</span>
          </Box>
          <Typography sx={{paddingLeft: '32px'}}>{endDate.diff(startDate, 'days') + 1} days</Typography>
        </Box>
        <Box sx={{paddingTop: '10px'}}>
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            <AccessTimeIcon sx={{marginRight: '5px'}}/>
            <span style={{fontWeight: 'bold'}}>{startTime.format('HH:mm')} to {endTime.format('HH:mm')}</span>
          </Box>
          <Typography
            sx={{paddingLeft: '32px'}}>{Math.floor(moment.duration(endTime.diff(startTime)).asHours())} hours {moment.duration(endTime.diff(startTime)).minutes()} minutes</Typography>
        </Box>
        <Box sx={{paddingTop: '10px'}}>
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            <PeopleIcon sx={{marginRight: '5px'}}/>
            <span style={{fontWeight: 'bold'}}>{staffNumber} Staff</span>
          </Box>
        </Box>
      </Box>
      <Box sx={{paddingTop: '10px'}}>
        <Button
          sx={{
            textTransform: 'none',
            paddingLeft: '10px',
            color: 'white',
            width: '100%',
            backgroundColor: 'primary.main',
            '&:hover': {
              backgroundColor: 'primary.dark',
            }
          }}
          disabled={!!error}
          onClick={handleSubmitForm}
        >
          Save staff updates
        </Button>
      </Box>
    </Box>
  );
};