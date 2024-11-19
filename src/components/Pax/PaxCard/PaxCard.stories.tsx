import * as React from 'react';
import { PaxCard as PaxCardComponent } from './PaxCard';
import { PaxTimeRange } from './PaxCard';

import type { Meta, StoryObj } from '@storybook/react';
import { Stack } from '@mui/material';

const meta: Meta<typeof PaxCardComponent> = {
  title: "DRT Components/Features/Pax/PaxCard",
  component: PaxCardComponent,
};

export default meta;
type Story = StoryObj<typeof PaxCardComponent>;

var startTime1 = new Date();
var startTime2 = new Date();
var startTime3 = new Date();
var endTime1 = new Date();
var endTime2 = new Date();
var endTime3 = new Date();


startTime1.setHours(11, 26);
endTime1.setHours(11, 26);

startTime2.setHours(11, 26);
endTime2.setHours(11, 31);

startTime3.setHours(11, 31);
endTime3.setHours(11, 36);

export const PaxCardSingle:Story = {
  args: {
    EEA: 77,
    nonEEA: 128,
    eGates: 213,
    timeRange: PaxTimeRange.Next5Mins,
    startTime: startTime1,
    endTime: endTime1
  }
}

export const PaxCardGroup: Story = {
  render: () => {
      return (
      <Stack 
        spacing={2} 
        direction={'row'} 
        display="inline-flex"
        sx={(theme) => ({
          p:2,
          backgroundColor: theme.palette.secondary.light || theme.palette.grey[200]
        })}>
          <PaxCardComponent 
            EEA={77} 
            nonEEA={128} 
            eGates={213} 
            timeRange={PaxTimeRange.Next5Mins}
            startTime={startTime1}
            endTime={endTime1}
          />
          <PaxCardComponent 
            EEA={45} 
            nonEEA={456} 
            eGates={987} 
            timeRange={PaxTimeRange.Next5to10Mins} 
            startTime={startTime2}
            endTime={endTime2}
          />
          <PaxCardComponent 
            EEA={431} 
            nonEEA={12} 
            eGates={5} 
            timeRange={PaxTimeRange.Next10to15Mins}
            startTime={startTime3}
            endTime={endTime3}
          />
      </Stack>
    )
  }
};
