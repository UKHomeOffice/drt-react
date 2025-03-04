import {DatePicker} from '@mui/x-date-pickers';
import {InfoTooltip} from '../../ui/InfoTooltip';
import BoltIcon from '@mui/icons-material/Bolt';
import UpdateIcon from '@mui/icons-material/Update';
import BrowseGalleryIcon from '@mui/icons-material/BrowseGallery';

import moment from 'moment';
import {
  Box,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Stack,
  Switch,
  FormLabel,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  breadcrumbsClasses,
  IconButton
} from '@mui/material';
import * as React from 'react';
import {endTimeOptions, timeOptions} from "../../Util";

export enum PaxSearchFormDay {
  Yesterday = "yesterday",
  Today = "today",
  Tomorrow = "tomorrow"
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
  fromDate: string,
  toDate: string,
  timeMachine?: boolean
}

export type PaxSearchFormPayload = {
  day?: PaxSearchFormDay,
  time?: PaxSearchFormTime,
  arrivalDate: Date,
  fromDate: string,
  toDate: string,
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
    fromDate: fromDate,
    toDate: toDate,
    timeMachine: timeMachine || false,
  });

  const handleOnChangeCallback = (payload: PaxSearchFormState) => {
    const formValues: PaxSearchFormPayload = {
      day: payload.day ? payload.day : formState.day,
      time: payload.time ? payload.time : formState.time,
      arrivalDate: payload.arrivalDate ? payload.arrivalDate.toDate() : formState.arrivalDate.toDate(),
      fromDate: payload.fromDate ? payload.fromDate : formState.fromDate,
      toDate: payload.toDate ? payload.toDate : formState.fromDate,
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
      setFormState(newState);
      handleOnChangeCallback(newState);
    }
  };

  const handleChangeTime = (event: React.MouseEvent<HTMLElement>, newValue: PaxSearchFormTime) => {
    if (newValue) {
      let toDate, fromDate;
      switch (newValue) {
        case PaxSearchFormTime.Day:
          toDate = formState.fromDate;
          fromDate = formState.fromDate;
          break;
        default:
          fromDate = moment().subtract(1, 'hour').format('HH:00');
          toDate = moment().add(3, 'hours').format('HH:00');
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

  const handleDatepickerChange = (field: string, value: moment.Moment) => {
    const newState = {
      ...formState,
      [field]: value,
      // toDate: field === 'fromDate' && formState.time === PaxSearchFormTime.Day ? value!.add(24, 'hours') : formState.toDate,
    }
    setFormState(newState);
    handleOnChangeCallback(newState);
  }

  const handleTimeChange = (field: string, value:string) => {
    const nowFrom = moment().format('hh:00');
    const nowTo = moment().add(4, 'hours').format('hh:00');

    const newState = {
      ...formState,
      toDate: field === 'fromDate' && formState.time === PaxSearchFormTime.Day ? value : formState.toDate,
      [field]: value,
    }
    if (formState.time === PaxSearchFormTime.Now) {
      switch (field) {
        case 'fromDate':
          newState.time = value === nowFrom ? PaxSearchFormTime.Now : PaxSearchFormTime.Range;
          break;
        case 'toDate':
          newState.time = value === nowTo ? PaxSearchFormTime.Now : PaxSearchFormTime.Range;
          break;
        default:
          break;
      }
    }
    setFormState(newState);
    handleOnChangeCallback(newState);
  }

  return (
    <Box sx={(theme) => ({
      maxWidth: '800px',
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
              <ToggleButton value="now" disabled={formState.day !== PaxSearchFormDay.Today}><BoltIcon />Live</ToggleButton>
              <ToggleButton value="24hour"><UpdateIcon />+24hr</ToggleButton>
              <ToggleButton value="range"><BrowseGalleryIcon /> Custom</ToggleButton>
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
              <FormControl sx={{flexGrow: 1}}>
                <InputLabel id="demo-simple-select-label">From</InputLabel>
                <Select
                  disabled={formState.time === PaxSearchFormTime.Now}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formState.fromDate}
                  label="Age"
                  fullWidth
                  inputProps={{role: 'start-time-select'}}
                  onChange={(e) => {
                    // const [hour, minute] = e.target.value.split(':').map(Number);
                    handleTimeChange('fromDate', e.target.value);
                  }}
                >
                  {timeOptions(60).map(time => (
                    <MenuItem key={time} value={time}
                      data-cy={`select-start-time-option-${time.replace(':', '-')}`}>{time}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl sx={{flexGrow: 1}}>
                <InputLabel id="demo-simple-select-label">To</InputLabel>
                <Select
                  disabled={formState.time !== PaxSearchFormTime.Range}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formState.toDate}
                  label="Age"
                  fullWidth
                  inputProps={{role: 'end-time-select'}}
                  onChange={(e) => {
                    handleTimeChange('toDate', e.target.value);
                  }}
                >
                  {timeOptions(60).map(time => (
                    <MenuItem key={time} value={time}
                      data-cy={`select-start-time-option-${time.replace(':', '-')}`}>
                        {time}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
      <Stack direction="row" sx={{alignItems: 'center', mt: 1}}>
        <FormLabel htmlFor='time-machine' sx={{fontWeight: 'bold'}}>Time Machine</FormLabel>
        <InfoTooltip
          text='See what DRT was showing for this day on a specific date & time in the past. This can be useful to compare what DRT forecasted for a date compared to what ended up happening'/>
        <Switch id="time-machine" checked={formState.timeMachine} onChange={handleChangeTimeMachine}/>
        <Typography variant='body1'>{formState.timeMachine ? 'On' : 'Off'}</Typography>
      </Stack>
    </Box>
  )
}
