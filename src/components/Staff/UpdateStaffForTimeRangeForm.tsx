import React, {useState} from "react";
import {Box, Button, Card, CardContent, CardHeader, FormControl, IconButton, InputLabel, List, ListItem, ListItemIcon, ListItemText, NativeSelect, Stack, TextField, Typography} from "@mui/material";
import moment, {Moment} from "moment";
import CloseIcon from "@mui/icons-material/Close";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleIcon from '@mui/icons-material/People';
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import { intervalStartTimeOptions, intervalEndTimeOptions } from '../Util';

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


export const UpdateStaffForTimeRangeForm = ({ ustd, interval, handleSubmit, cancelHandler }: IUpdateStaffForTimeRangeForm) => {
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
    if (hour === 0 && minute === 0) {
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

  return (
    <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={'en-gb'}>
      <Box data-cy={`shift-staff-form`} sx={{width: '400px', p:2}}>
        <Box sx={{display: 'flex', justifyContent: 'space-between', mb: 4}}>
          <Typography variant="h2" component="h2" fontWeight={"bold"} mb={0}>Edit staff</Typography>
          <IconButton aria-label="close" color="inherit" size="small" onClick={cancelHandler}>
            <CloseIcon fontSize="inherit"/>
          </IconButton>
        </Box>
        <Stack spacing={2} mb={4}>
          <Typography variant="h3" component="h3" mb={2}>Date</Typography>
          <DatePicker
            data-cy="start-date-picker"
            label="Start date"
            value={startDate}
            onChange={handleStartDateChange}
            format="DD MMMM YYYY"
          />
          <DatePicker
            data-cy="end-date-picker"
            sx={{backgroundColor: '#FFFFFF', width: '100%'}}
            label="End date"
            value={endDate}
            onChange={handleEndDateChange}
            format="DD MMMM YYYY"
          />
        </Stack>
        <Stack spacing={2} mb={4}>
          <Typography variant="h3" component="h3" mb={2}>Time</Typography>
          <Stack direction="row" spacing={2} mb={2} justifyContent={'stretch'}>
            <FormControl fullWidth>
              <InputLabel htmlFor="select-start-time">Start time</InputLabel>
              <NativeSelect
                value={startTime.format('HH:mm')}
                onChange={(e) => {
                  const [hour, minute] = e.target.value.split(':').map(Number);
                  handleStartTimeChange(hour, minute);
                }}
                inputProps={{ role: 'start-time-select', id: 'select-start-time' }}
                data-cy="start-time-select">
                {intervalStartTimeOptions(interval).map(time => (
                  <option key={time} value={time} data-cy={`select-start-time-option-${time.replace(':', '-')}`}>{time} </option>
                ))}
              </NativeSelect>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel htmlFor="select-end-time">End time</InputLabel>
              <NativeSelect
                value={endTime.format('HH:mm')}
                onChange={(e) => {
                  const [hour, minute] = e.target.value.split(':').map(Number);
                  handleEndTimeChange(hour, minute);
                }}
                inputProps={{ role: 'end-time-select', id: 'select-end-time' }}
                data-cy="end-time-select"
              >
                {intervalEndTimeOptions(interval).map(time => (
                  <option key={time} value={time} data-cy={`select-end-time-option-${time.replace(':', '-')}`}>{time}</option>
                ))}
              </NativeSelect>
            </FormControl>
          </Stack>
        <Box sx={{maxWidth: '150px'}}>
          <TextField
            label="Staff"
            value={staffNumber}
            onChange={handleStaffNumberChange}
            type="number"
            data-cy="staff-number-input"
          />
        </Box>
        </Stack>
        <Stack spacing={2} mb={4}>
        {error && <Typography color="error" sx={{paddingTop: '10px'}}>{error}</Typography>}
        <Card variant="lightGrey">
          <CardHeader title="Selection summary" titleTypographyProps={{variant: 'h3'}} />
          <CardContent>
            <List>
              <ListItem>
                <ListItemIcon><CalendarTodayIcon/></ListItemIcon>
                <ListItemText
                  primary={`${startDate.format(startDate.year() === endDate.year() ? 'DD MMM' : 'DD MMM YY')} to ${endDate.format('DD MMM YYYY')}`}
                  secondary={`${endDate.diff(startDate, 'days') + 1} days`}
                  />
              </ListItem>
              <ListItem>
                <ListItemIcon><AccessTimeIcon/></ListItemIcon>
                <ListItemText
                  primary={`${startTime.format('HH:mm')} to ${endTime.format('HH:mm')}`}
                  secondary={`${Math.floor(moment.duration(endTime.diff(startTime)).asHours())} hours ${moment.duration(endTime.diff(startTime)).minutes()} minutes`}
                  />
              </ListItem>
              <ListItem>
                <ListItemIcon><PeopleIcon/></ListItemIcon>
                <ListItemText
                  primary={`${staffNumber} staff`}
                  />
              </ListItem>
            </List>
          </CardContent>
        </Card>
        <Box sx={{paddingTop: '10px'}}>
          <Button
            fullWidth
            variant="contained"
            disabled={!!error}
            onClick={handleSubmitForm}
            data-cy="save-staff-button"
          >
            Save staff updates
          </Button>
        </Box>
        </Stack>
      </Box>
    </LocalizationProvider>
  );
};
