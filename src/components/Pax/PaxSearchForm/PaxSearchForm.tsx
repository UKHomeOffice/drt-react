import { DatePicker} from '@mui/x-date-pickers';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import  { InfoTooltip } from '../../ui/InfoTooltip';

import moment from 'moment';
import { Box,Grid, ToggleButton, ToggleButtonGroup, Stack, Switch, FormLabel, Typography } from '@mui/material';
import * as React from 'react';
import {LocalDateProvider} from "../../Util/LocaleDateProvider";

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
    const formValues : PaxSearchFormPayload = {
      day: payload.day ? payload.day : formState.day,
      time: payload.time ? payload.time : formState.time,
      arrivalDate: payload.arrivalDate ? payload.arrivalDate.toDate() : formState.arrivalDate.toDate(),
      fromDate: payload.fromDate ? payload.fromDate.toDate() : formState.fromDate.toDate(),
      toDate: payload.toDate ? payload.toDate.toDate() : formState.fromDate.toDate(),
      timeMachine: payload.hasOwnProperty('timeMachine') ? payload.timeMachine : formState.timeMachine,
    }
    onChange && onChange(formValues);
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
    }
    setFormState(newState);
    handleOnChangeCallback(newState);
  };

  const handleChangeTime = (event: React.MouseEvent<HTMLElement>, newValue: PaxSearchFormTime) => {
    let toDate, fromDate;
    switch (newValue) {
      case PaxSearchFormTime.Day:
        toDate = moment().add(24, 'hours');
        fromDate = formState.fromDate;
        break;
      default:
        fromDate = moment();
        toDate = moment();
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
  };

  const handleChangeTimeMachine = ( event: React.ChangeEvent<HTMLInputElement>) => {
    const newState = {
      ...formState,
      timeMachine: event.target.checked
    }
    setFormState(newState);
    handleOnChangeCallback(newState);
  };

  const handleDatepickerChange = (field: string, value: moment.Moment) => {
    const newState = {
      ...formState,
      [field]: value,
      toDate: field === 'fromDate' && formState.time === PaxSearchFormTime.Day ? value!.add(24, 'hours') : formState.toDate,
    }
    setFormState(newState);
    handleOnChangeCallback(newState);
  }

  return (
    <LocalDateProvider>
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
              onChange={(value) => handleDatepickerChange('arrivalDate', value || moment())}
            />
            <Stack direction={'row'} spacing={2}>
              <TimePicker
                ampm={false}
                label="From"
                value={formState.fromDate}
                onChange={(value) => handleDatepickerChange('fromDate', value || moment())}
              />
              <TimePicker
                ampm={false}
                disabled={formState.time === PaxSearchFormTime.Day}
                label="To"
                value={formState.toDate}
                onChange={(value) => handleDatepickerChange('toDate', value || moment())}
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
    </LocalDateProvider>
  )
}
