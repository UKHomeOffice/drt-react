import * as React from 'react';


import { useArgs } from '@storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';
import { PaxTerminalOverview as PaxTerminalOverviewComponnet } from './PaxTerminalOverview';
import { Box } from '@mui/material';
import { ChartData } from 'chart.js';

interface PaxTerminalOverviewStoryControls {
  terminal: string,
  timeRange: number,
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
    terminal: 'T1',
    timeRange: 60,
    currentTime: '17:15',
    desks: 14,
    staff: 16,
    flights: new Array(36),
    chartData: {
      labels: [
        'GBR National to EEA',
        'Non-Visa National to Non-EEA',
        'EEA Child to EEA',
        'B5J+ National to e-Gates',
        'GB National Child to EEA',
        'GBR National to e-Gates',
        'Visa National to Non-EEA',
        'Visa National to EEA',
        'EEA Machine Readable to EEA',
        'EEA Machine Readable to E-Gates',
        'EEA Non-Machine Readable to EEA',
        'B5j+ Child to EEA',
        'B5J+ National to EEA',
        'Non-Visa national to Non-EEA'
      ],
      datasets:[
        { 
          data: [15, 30, 45, 5, 20],
          backgroundColor: ["#0E2560", "#334F96", "#547A00", "#CD5B82", "#FF6F20", "#00A99D", "#A6A6A6", "#A3C2D9", "#E3D4A5","#7A7A7A","#F2994A", "#6FCF97", "#BB6BD9", "#EB5757"],
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
      eea: 1346,
      noneea: 72,
    },
    {
      from: '14:15',
      to: '15:15',
      egate: 67,
      eea: 89,
      noneea: 1392,
    },
    {
      from: '15:15',
      to: '16:15',
      egate: 1132,
      eea: 256,
      noneea: 45,
    }
    ]
  },

  render: () => {
      const [args, updateArgs] = useArgs();
      return (
        <Box p={2}>
          <PaxTerminalOverviewComponnet terminal={args.terminal} timeRange={args.timeRange} flights={args.flights} ragStatus={'orange'} chartData={args.chartData} pressure={args.pressure} estimates={args.estimates} desks={args.desks} staff={args.staff} currentTime={args.currentTime} />
        </Box>
      )
  }
};
