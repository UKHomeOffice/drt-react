import { DatePicker} from '@mui/x-date-pickers';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import  { InfoTooltip } from '../../ui/InfoTooltip';

import moment from 'moment';
import { Box,Grid, ToggleButton, ToggleButtonGroup, Stack, Switch, FormLabel, Typography } from '@mui/material';
import * as React from 'react';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers';

export enum PaxSearchFormDay {
  Yesterday = "yesterday",
  Today = "today",
  Tomorrow = "tomorrow"
}

export enum PaxSearchFormTime {
  Now = "now",
  Day = "24hour",
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
    fromDate: moment(fromDate) || moment(),
    toDate: moment(toDate) || moment(),
    timeMachine: timeMachine || false,
  });

  const handleOnChangeCallback = (payload: PaxSearchFormState) => {
    onChange && onChange({
      ...payload,
      arrivalDate: payload.arrivalDate.toDate(),
      fromDate: payload.fromDate.toDate(),
      toDate: payload.toDate.toDate(),
    });
  }

  const handleChangeDay = (event: React.MouseEvent<HTMLElement>, newValue: PaxSearchFormDay) => {
    let arrivalDate;
    switch (newValue) {
      case PaxSearchFormDay.Yesterday:
        arrivalDate = moment().subtract(1, 'day');
        break;
      case PaxSearchFormDay.Tomorrow:
        arrivalDate = moment().add(1, 'day');
        break;
      default:
        arrivalDate = moment()
        break;
    }
    const newState = {
      ...formState,
      day: newValue,
      arrivalDate,
      fromDate: arrivalDate.clone().set('hour', formState.fromDate.get('hours')).set('minute', formState.fromDate.get('hours')),
      toDate: arrivalDate.clone().set('hour', formState.toDate.get('hours')).set('minute', formState.toDate.get('hours')),
    }
    setFormState(newState);
    handleOnChangeCallback(newState);
  };

  const handleChangeTime = (event: React.MouseEvent<HTMLElement>, newValue: PaxSearchFormTime) => {
    let toDate;
    switch (newValue) {
      case '24hour':
        toDate = moment().add(24, 'hours');
        break;
      default:
        toDate = moment()
        break;
    }
    const newState = {
      ...formState,
      time: newValue,
      toDate
    }
    setFormState(newState);
    handleOnChangeCallback(newState);
  };

  const handleChangeTimeMachine = ( event: React.ChangeEvent<HTMLInputElement>) => {
    const newState = {
      ...formState,
      timeMachine: event.target.checked
    }
    setFormState(newState);
    handleOnChangeCallback(newState);
  };

  const handleDatepickerChange = (field: string, value: moment.Moment | null) => {
    const newState = {
      ...formState,
      [field]: value
    }
    setFormState(newState);
    handleOnChangeCallback(newState);
  }

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
    <Box sx={(theme) => ({
      maxWidth: '600px',
      padding: 2,
      backgroundColor: theme.palette.secondary.light || theme.palette.grey[200]
    })}>
      <Grid container spacing={2} flexWrap={'nowrap'}>
        <Grid item>
          <Stack spacing={2}>
            <ToggleButtonGroup exclusive color='primary' size='medium' value={formState.day} onChange={handleChangeDay}>
              <ToggleButton value="yesterday" defaultChecked>Yesterday</ToggleButton>
              <ToggleButton value="today">Today</ToggleButton>
              <ToggleButton value="tomorrow">Tomorrow</ToggleButton>
            </ToggleButtonGroup>
            <ToggleButtonGroup exclusive color='primary' size='medium' value={formState.time} onChange={handleChangeTime}>
              <ToggleButton value="now">Now</ToggleButton>
              <ToggleButton value="24hour">24 hours</ToggleButton>
            </ToggleButtonGroup>
          </Stack>
        </Grid>
        <Grid item flexGrow={1}>
          <Stack spacing={2}>
            <DatePicker
              label="Arrival date"
              format="DD/MM/YYYY"
              value={formState.arrivalDate}
              onChange={(value) => handleDatepickerChange('arrivalDate', value)}
            />
            <Stack direction={'row'} spacing={2}>
              <TimePicker
                label="From"
                value={formState.fromDate}
                onChange={(value) => handleDatepickerChange('fromDate', value)}
              />
              <TimePicker
                disabled={formState.time === PaxSearchFormTime.Day}
                label="To"
                value={formState.toDate}
                onChange={(value) => handleDatepickerChange('toDate', value)}
              />
            </Stack>
          </Stack>
        </Grid>
      </Grid>
      <Stack direction="row" sx={{alignItems: 'center', mt: 1}}>
        <FormLabel htmlFor='time-machine' sx={{fontWeight: 'bold'}}>Time Machine</FormLabel>
        <InfoTooltip text='See what DRT was showing for this day on a specific date & time in the past. This can be useful to compare what DRT forecasted for a date compared to what ended up happening' />
        <Switch id="time-machine" checked={formState.timeMachine} onChange={handleChangeTimeMachine} />
        <Typography variant='body1'>{formState.timeMachine ? 'On' : 'Off'}</Typography>
      </Stack>
    </Box>
    </LocalizationProvider>
  )
}
