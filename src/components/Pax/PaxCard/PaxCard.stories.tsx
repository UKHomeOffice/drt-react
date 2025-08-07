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

const startTime1 = new Date();
const startTime2 = new Date();
const startTime3 = new Date();
const endTime1 = new Date();
const endTime2 = new Date();
const endTime3 = new Date();

const queues = [
  { queueName: 'EEA', queueCount: 77 },
  { queueName: 'Non-EEA', queueCount: 128 },
  { queueName: 'EEA', queueCount: 213 }
]


startTime1.setHours(9, 26);
endTime1.setHours(10, 26);

startTime2.setHours(11, 9);
endTime2.setHours(11, 31);

startTime3.setHours(11, 31);
endTime3.setHours(8, 36);

export const PaxCardSingle:Story = {
  args: {
    queues: queues,
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
        display="inline-flex">
          <PaxCardComponent 
            queues={queues}
            timeRange={PaxTimeRange.Next5Mins}
            startTime={startTime1}
            endTime={endTime1}
          />
          <PaxCardComponent 
            queues={queues}
            timeRange={PaxTimeRange.Next5to10Mins} 
            startTime={startTime2}
            endTime={endTime2}
          />
          <PaxCardComponent 
            queues={queues}
            timeRange={PaxTimeRange.Next10to15Mins}
            startTime={startTime3}
            endTime={endTime3}
          />
      </Stack>
    )
  }
};
