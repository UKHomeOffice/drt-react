import { useTheme } from '@mui/material/styles';
import { DatePicker, DateValidationError, PickerChangeHandlerContext, TimeValidationError } from '@mui/x-date-pickers';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import  { InfoTooltip } from '../../ui/InfoTooltip';

import moment from 'moment';
import { Box,Grid, ToggleButton, ToggleButtonGroup, Stack, Switch, FormLabel, Typography } from '@mui/material';
import * as React from 'react';

export enum PaxSearchFormDay {
  Yesterday = "yesterday",
  Today = "today",
  Tomorrow = "tomorrow"
}

export enum PaxSearchFormTime {
  Now = "now",
  Day = "24hour",
}

export type PaxSearchFormState = {
  day?: PaxSearchFormDay,
  time?: PaxSearchFormTime,
  arrivalDate: moment.Moment,
  fromDate: moment.Moment,
  toDate: moment.Moment,
  timeMachine?: boolean
}

export type IPaxSearchForm = PaxSearchFormState & {
  onChange: (values: PaxSearchFormState) => void
}

export const PaxSearchForm = ({day, time, arrivalDate, fromDate, toDate, timeMachine, onChange}: IPaxSearchForm) => {
  const [formState, setFormState] = React.useState<PaxSearchFormState>({
    day: day || PaxSearchFormDay.Yesterday,
    time: time || PaxSearchFormTime.Now,
    arrivalDate: arrivalDate || moment(),
    fromDate: fromDate || moment(),
    toDate: toDate || moment(),
    timeMachine: timeMachine || false,
  });

  const handleChangeDay = (event: React.MouseEvent<HTMLElement>, newValue: PaxSearchFormDay) => {
    const newState = {
      ...formState,
      day: newValue
    }
    setFormState(newState);
    onChange && onChange(newState);
  };

  const handleChangeTime = (event: React.MouseEvent<HTMLElement>, newValue: PaxSearchFormTime) => {
    const newState = {
      ...formState,
      time: newValue
    }
    setFormState(newState);
    onChange && onChange(newState);
  };

  const handleChangeTimeMachine = ( event: React.ChangeEvent<HTMLInputElement>) => {
    const newState = {
      ...formState,
      timeMachine: event.target.checked
    }
    setFormState(newState);
    onChange && onChange(newState);
  };

  const handleDatepickerChange = (field: string, value: moment.Moment | null) => {
    const newState = {
      ...formState,
      [field]: value
    }
    setFormState(newState);
    onChange && onChange(newState);
  }

  return (
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
  )
}
