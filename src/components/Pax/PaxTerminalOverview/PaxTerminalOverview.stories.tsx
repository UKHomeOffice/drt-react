import * as React from 'react';


import { useArgs } from '@storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';
import { PaxTerminalOverview as PaxTerminalOverviewComponnet } from './PaxTerminalOverview';
import { Box } from '@mui/material';
import { ChartData } from 'chart.js';

interface PaxTerminalOverviewStoryControls {
  currentTime: string,
  desks:number,
  staff: number,
  flights: any[];
  chartData: ChartData<'doughnut'>;
  pressure: {
    pressure: '+' | '-',
    from: string
    to: string
  }[];
  estimates: {
    from: string
    to: string
    egate: number
    eea: number
    noneea: number
  }[]
}

const meta: Meta<PaxTerminalOverviewStoryControls>  = {
  title: "DRT Components/Features/Pax/Pax Terminal Overview",
  argTypes: {
    flights: {
      options: [true, false],
      control: {
        type: 'radio'
      }
    },
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const PaxTerminalOverview: Story = {
  args: {
    currentTime: '17:15',
    desks: 14,
    staff: 16,
    flights: new Array(36),
    chartData: {
      labels: ['EEA', 'e-Gate', 'Non-EEA: Visa National', 'Non-EEA: Non-Visa National'],
      datasets:[
        { 
          data: [50, 25, 15, 10],
          backgroundColor: ["#0E2560", "#334F96", "#CD5B82", "#547A00"],
        }
      ]
    },
    pressure: [
      {
        pressure: '+',
        from: '13:30',
        to: '13:45'
      },
      {
        pressure: '-',
        from: '13:45',
        to: '14:00'
      },
    ],
    estimates: [{
      from: '13:15',
      to: '14:15',
      egate: 725,
      eea: 346,
      noneea: 72,
    },
    {
      from: '14:15',
      to: '15:15',
      egate: 67,
      eea: 89,
      noneea: 392,
    },
    {
      from: '15:15',
      to: '16:15',
      egate: 132,
      eea: 256,
      noneea: 45,
    }
    ]
  },

  render: () => {
      const [args, updateArgs] = useArgs();
      return (
        <Box p={2}>
          <PaxTerminalOverviewComponnet flights={args.flights} chartData={args.chartData} pressure={args.pressure} estimates={args.estimates} desks={args.desks} staff={args.staff} currentTime={args.currentTime} />
        </Box>
      )
  }
};
