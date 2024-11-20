import * as React from 'react';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from '@mui/x-date-pickers';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import {InfoTooltip} from '../ui/InfoTooltip';


import { useArgs } from '@storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';
import { Box, TextField,Grid, ToggleButton, ToggleButtonGroup, Stack, Switch, FormControlLabel, FormLabel, Typography } from '@mui/material';
import moment from 'moment';

interface PaxSearchFormStoryControls {
  timeMachine: boolean,
  day: "yesterday" | "today" | "tomorrow",
  time: "now" | "24hour"
}

const meta: Meta<PaxSearchFormStoryControls>  = {
  title: "DRT Components/Features/Pax/Pax Form Layout",
  args: {
    timeMachine: true,
    day: "yesterday",
    time: "now"
  },
  argTypes: {
    timeMachine: {
      options: [true, false],
      control: {
        type: 'radio'
      }
    },
    day: {
      options: ["yesterday", "today", "tomorrow"],
      control: {
        type: 'radio'
      }
    },
    time: {
      options: ["now", "24hour"],
      control: {
        type: 'radio'
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const PaxFormLayout: Story = {


  render: () => {
      const [args, updateArgs] = useArgs();

      const handleChangeDay = ( event: React.MouseEvent<HTMLElement>, newValue: string | null) => {
        updateArgs({
          ...args,
          day: newValue
        });
      };

      const handleChangeTime = ( event: React.MouseEvent<HTMLElement>, newValue: string | null) => {
        updateArgs({
          ...args,
          time: newValue
        });
      };

      const handleChangeTimeMachine = ( event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event)
        updateArgs({
          ...args,
          timeMachine: event.target.checked
        });
      };

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
                <ToggleButtonGroup exclusive color='primary' size='medium' value={args.day} onChange={handleChangeDay}>
                  <ToggleButton value="yesterday" defaultChecked>Yesterday</ToggleButton>
                  <ToggleButton value="today">Today</ToggleButton>
                  <ToggleButton value="tomorrow">Tomorrow</ToggleButton>
                </ToggleButtonGroup>
                <ToggleButtonGroup exclusive color='primary' size='medium' value={args.time} onChange={handleChangeTime}>
                  <ToggleButton value="now">Now</ToggleButton>
                  <ToggleButton value="24hour">24 hours</ToggleButton>
                </ToggleButtonGroup>
              </Stack>
            </Grid>
            <Grid item flexGrow={1}>
              <Stack spacing={2}>
                <DatePicker
                  label="Arrival date"
                  value={moment()}
                />
                <Stack direction={'row'} spacing={2}>
                  <TimePicker
                    label="From"
                    value={moment()}
                  />
                  <TimePicker
                    label="To"
                    value={moment()}
                  />
                </Stack>
              </Stack>
            </Grid>
          </Grid>
          <Stack direction="row" sx={{alignItems: 'center', mt: 1}}>
            <FormLabel htmlFor='time-machine' sx={{fontWeight: 'bold'}}>Time Machine</FormLabel>
            <InfoTooltip text='See what DRT was showing for this day on a specific date & time in the past. This can be useful to compare what DRT forecasted for a date compared to what ended up happening' />
            <Switch id="time-machine" checked={args.timeMachine} onChange={handleChangeTimeMachine} />
            <Typography variant='body1'>{args.timeMachine ? 'On' : 'Off'}</Typography>
          </Stack>
        </Box>
      </LocalizationProvider>
    )
  }
};
