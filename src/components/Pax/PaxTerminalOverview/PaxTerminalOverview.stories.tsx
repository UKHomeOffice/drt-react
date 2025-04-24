import * as React from 'react';


import { useArgs } from '@storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';
import { PaxTerminalOverview as PaxTerminalOverviewComponnet } from './PaxTerminalOverview';
import { Box } from '@mui/material';

interface PaxTerminalOverviewStoryControls {
  timeMachine: boolean,
  day: "yesterday" | "today" | "tomorrow",
  time: "now" | "24hour" | "range",
  arrivalDate: Date,
  fromDate:  string,
  toDate:  string,
}

const meta: Meta<PaxTerminalOverviewStoryControls>  = {
  title: "DRT Components/Features/Pax/Pax Terminal Overview",
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
    },
    arrivalDate: {
      control: {
        type: 'date'
      }
    },
    fromDate: {
      control: {
        type: 'text'
      }
    },
    toDate: {
      control: {
        type: 'text'
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const PaxTerminalOverview: Story = {
  args: {
    timeMachine: false,
    day: "today",
    time: "24hour",
    arrivalDate: new Date(),
    fromDate: '00:00',
    toDate:  "00:00 +1",
  },

  render: () => {
      const [args, updateArgs] = useArgs();
      return (
        <Box p={2}>
          <PaxTerminalOverviewComponnet />
        </Box>
      )
  }
};
