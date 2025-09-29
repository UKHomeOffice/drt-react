import {DatePicker} from '@mui/x-date-pickers';
import {InfoTooltip} from '../../ui';
import OfflineBoltTwoToneIcon from '@mui/icons-material/OfflineBoltTwoTone';

import moment from 'moment';
import {
  Box,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  ToggleButton,
  ToggleButtonGroup,
  Typography
} from '@mui/material';
import * as React from 'react';

export enum PaxSearchFormDay {
  Yesterday = "yesterday",
  Today = "today",
  Tomorrow = "tomorrow",
  Other = ""
}

export enum PaxSearchFormTime {
  Now = "now",
  Day = "24hour",
  Range = "range",
}

type PaxSearchFormState = {
  day?: PaxSearchFormDay,
  time?: PaxSearchFormTime,
  arrivalDate: moment.Moment,
  fromDate: moment.Moment,
  toDate: moment.Moment,
  timeMachine?: boolean
}

export type PaxSearchFormPayload = {
  day?: PaxSearchFormDay,
  time?: PaxSearchFormTime,
  arrivalDate: Date,
  fromDate: Date,
  toDate: Date,
  timeMachine?: boolean
}

export type IPaxSearchForm = PaxSearchFormPayload & {
  onChange: (values: PaxSearchFormPayload) => void
}


export const PaxSearchForm = ({day, time, arrivalDate, fromDate, toDate, timeMachine, onChange}: IPaxSearchForm) => {

  const [formState, setFormState] = React.useState<PaxSearchFormState>({
    day: day || PaxSearchFormDay.Yesterday,
    time: time || PaxSearchFormTime.Now,
    arrivalDate: moment(arrivalDate) || moment(),
    fromDate: moment(fromDate),
    toDate: moment(toDate),
    timeMachine: timeMachine || false,
  });

  const handleOnChangeCallback = (payload: PaxSearchFormState) => {
    const formValues: PaxSearchFormPayload = {
      day: payload.day ? payload.day : formState.day,
      time: payload.time ? payload.time : formState.time,
      arrivalDate: (payload.arrivalDate ? payload.arrivalDate : formState.arrivalDate).toDate(),
      fromDate: (payload.fromDate ? payload.fromDate.set('milliseconds', 0) : formState.fromDate).toDate(),
      toDate: (payload.toDate ? payload.toDate.set('milliseconds', 0) : formState.toDate).toDate(),
      timeMachine: payload.hasOwnProperty('timeMachine') ? payload.timeMachine : formState.timeMachine,
    }
    onChange && onChange(formValues);
  }

  const handleChangeDay = (event: React.MouseEvent<HTMLElement>, newValue: PaxSearchFormDay) => {
    if (newValue) {
      let arrivalDate, time;
      switch (newValue) {
        case PaxSearchFormDay.Yesterday:
          arrivalDate = moment().subtract(1, 'day');
          time = formState.time === PaxSearchFormTime.Now ? PaxSearchFormTime.Day : formState.time;
          break;
        case PaxSearchFormDay.Tomorrow:
          arrivalDate = moment().add(1, 'day');
          time = formState.time === PaxSearchFormTime.Now ? PaxSearchFormTime.Day : formState.time;
          break;
        default:
          arrivalDate = moment()
          time = formState.time
          break;
      }

      const newState = {
        ...formState,
        day: newValue,
        arrivalDate,
        time,
      }

      const hoursDiff = formState.toDate.diff(formState.fromDate, 'hours');
      newState.fromDate = lastMidnight(arrivalDate).add(formState.fromDate.hours(), 'hours');
      newState.toDate = newState.fromDate.clone().add(hoursDiff, 'hours');

      setFormState(newState);
      handleOnChangeCallback(newState);
    }
  };

  const lastMidnight = (date: moment.Moment) => date.set('hours', 0).set('minutes', 0).set('seconds', 0).set('milliseconds', 0);
  const todayMidnight = lastMidnight(moment());

  const handleChangeTime = (event: React.MouseEvent<HTMLElement>, newValue: PaxSearchFormTime) => {
    if (newValue) {
      let toDate, fromDate;
      switch (newValue) {
        case PaxSearchFormTime.Day:
          fromDate = lastMidnight(formState.arrivalDate.clone()).clone();
          toDate = fromDate.clone().add(1, 'day');
          break;
        case PaxSearchFormTime.Range:
          fromDate = formState.fromDate.clone();
          toDate = formState.toDate.clone();
          break;
        default:
          fromDate = todayMidnight.clone().add(moment().hour() - 1, 'hours');
          toDate = fromDate.clone().add(4, 'hours');
          break;
      }
      const newState = {
        ...formState,
        time: newValue,
        fromDate,
        toDate
      }
      setFormState(newState);
      handleOnChangeCallback(newState);
    }
  };

  const handleChangeTimeMachine = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newState = {
      ...formState,
      timeMachine: event.target.checked
    }
    setFormState(newState);
    handleOnChangeCallback(newState);
  };

  const handleDatepickerChange = (value: moment.Moment) => {
    const newState = {
      ...formState,
      arrivalDate: value,
    }

    const todayMidnight = lastMidnight(moment());

    if (value.toISOString() === todayMidnight.toISOString()) {
      newState.day = PaxSearchFormDay.Today;
    } else if (value.toISOString() === todayMidnight.clone().add(1, 'day').toISOString()) {
      newState.day = PaxSearchFormDay.Tomorrow;
    } else if (value.toISOString() === todayMidnight.clone().subtract(1, 'day').toISOString()) {
      newState.day = PaxSearchFormDay.Yesterday;
    } else {
      newState.day = PaxSearchFormDay.Other;
    }
    if (formState.day === PaxSearchFormDay.Today) {
      newState.time = PaxSearchFormTime.Day;
      newState.fromDate = lastMidnight(value.clone());
      newState.toDate = newState.fromDate.clone().add(1, 'day');
    } else {
      const hoursDiff = formState.toDate.diff(formState.fromDate, 'hours');
      newState.fromDate = lastMidnight(value.clone()).add(formState.fromDate.hours(), 'hours');
      newState.toDate = newState.fromDate.clone().add(hoursDiff, 'hours');
    }

    setFormState(newState);
    handleOnChangeCallback(newState);
  }

  const handleTimeChange = (field: string, value: moment.Moment) => {

    const newState = {
      ...formState,
      [field]: value,
    }
    if (field == 'fromDate' && formState.time === PaxSearchFormTime.Range) {
      newState.toDate = newState.fromDate.clone().add(1, 'hour');
    }
    setFormState(newState);
    handleOnChangeCallback(newState);
  }

  return (
    <Box>
      <Grid container spacing={2} mb={3}>
        <Grid item flexGrow={0}>
          <Stack spacing={0}>
            <InputLabel>Day</InputLabel>
            <ToggleButtonGroup sx={{mt: 0}} exclusive color='primary' size='medium' value={formState.day}
                               onChange={handleChangeDay}>
              <ToggleButton value="yesterday" defaultChecked>Yesterday</ToggleButton>
              <ToggleButton value="today">Today</ToggleButton>
              <ToggleButton value="tomorrow">Tomorrow</ToggleButton>
            </ToggleButtonGroup>
          </Stack>
        </Grid>
        <Grid item flexGrow={1}>
          <DatePicker
            sx={{width: '100%'}}
            label="Date"
            format="DD/MM/YYYY"
            value={formState.arrivalDate}
            showDaysOutsideCurrentMonth
            minDate={moment().subtract(5, 'years')}
            maxDate={moment().add(1, 'years')}
            onChange={(value) => handleDatepickerChange(value || moment())}
          />
        </Grid>
      </Grid>
      <Divider sx={{mb: 3}}/>
      <Grid container spacing={2}>
        <Grid item>
          <InputLabel>Range</InputLabel>
          <ToggleButtonGroup exclusive color='primary' size='medium' value={formState.time} onChange={handleChangeTime}>
            <ToggleButton value="now" disabled={formState.day !== PaxSearchFormDay.Today}><OfflineBoltTwoToneIcon
              sx={{fontSize: '0.8em', mr: 1}}/>Live</ToggleButton>
            <ToggleButton value="24hour">24hr</ToggleButton>
            <ToggleButton value="range">Custom</ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid item flexGrow={1}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="from-date-label">From</InputLabel>
                <Select
                  disabled={formState.time != PaxSearchFormTime.Range}
                  labelId="from-date-label"
                  id="from-date"
                  value={formState.fromDate.valueOf()}
                  fullWidth
                  inputProps={{role: 'start-time-select'}}
                  onChange={(e) => {
                    handleTimeChange('fromDate', moment(e.target.value));
                  }}
                >
                  {
                    Array.from(Array(24).keys()).map(hour => {
                      const time = lastMidnight(formState.arrivalDate).clone().set('hours', hour);
                      const timeInHH00 = time.format('HH:00');
                      return <MenuItem
                        key={time.toISOString()}
                        value={time.valueOf()}
                        data-cy={`select-start-time-option-${time.format('HH:00')}`}
                      >
                        {timeInHH00}
                      </MenuItem>
                    })
                  }
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="to-date-label">To</InputLabel>
                <Select
                  disabled={formState.time != PaxSearchFormTime.Range}
                  labelId="to-date-label"
                  id="to-date"
                  value={formState.toDate.valueOf()}
                  fullWidth
                  inputProps={{role: 'end-time-select'}}
                  onChange={(e) => {
                    handleTimeChange('toDate', moment(e.target.value));
                  }}
                >
                  {
                    Array.from(Array(36 - formState.fromDate.hour()).keys()).map(index => {
                      const time = formState.fromDate.clone().add(index + 1, 'hours');
                      const hh00 = time.format('HH:00');
                      return <MenuItem
                        key={time.toISOString()}
                        value={time.valueOf()}
                        data-cy={`select-end-time-option-${time.format('HH-00')}`}
                      >
                        {`${hh00} (+${index + 1} hours)`}
                      </MenuItem>
                    })
                  }
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Stack direction="row" sx={{alignItems: 'center', mt: 1}}>
        <FormLabel htmlFor='time-machine' sx={{fontWeight: 'bold'}}>Time Machine</FormLabel>
        <InfoTooltip
          text='See what DRT was showing for this day on a specific date & time in the past. This can be useful to compare what DRT forecasted for a date compared to what ended up happening'/>
        <Switch color='info' id="time-machine" checked={formState.timeMachine} onChange={handleChangeTimeMachine}/>
        <Typography variant='body1'>{formState.timeMachine ? 'On' : 'Off'}</Typography>
      </Stack>
    </Box>
  )
}
