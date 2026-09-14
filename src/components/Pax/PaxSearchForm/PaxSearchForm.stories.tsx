import * as React from 'react';


import { useArgs } from '@storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';
import { PaxSearchForm, PaxSearchFormPayload } from './PaxSearchForm';
import moment from 'moment';
import { Box } from '@mui/material';
import { expect, within } from '@storybook/test';

interface PaxSearchFormStoryControls {
  timeMachine: boolean,
  day: "yesterday" | "today" | "tomorrow",
  time: "now" | "24hour" | "range",
  arrivalDate: Date,
  fromDate: Date,
  toDate: Date,
}

const meta: Meta<PaxSearchFormStoryControls>  = {
  title: "DRT Components/Features/Pax/PaxFormLayout",
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
      options: ["now", "24hour", "range"],
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

const getLastMidnight = () => moment().set('hours', 0).set('minutes', 0).set('seconds', 0).set('milliseconds', 0);

export const PaxFormLayout: Story = {
  args: {
    timeMachine: false,
    day: "today",
    time: "24hour",
    arrivalDate: moment().toDate(),
    fromDate: getLastMidnight().toDate(),
    toDate:  getLastMidnight().add(1, 'day').toDate()
  },

  render: () => {
      const [args, updateArgs] = useArgs();

      const onChange = (searchFormState: PaxSearchFormPayload) => {
        console.log(searchFormState);
        updateArgs(searchFormState)
      }
      return (
        <Box sx={{maxWidth: '800px'}}>
          <PaxSearchForm
            onChange={onChange}
            timeMachine={args.timeMachine}
            day={args.day}
            time={args.time}
            arrivalDate={args.arrivalDate}
            fromDate={args.fromDate}
            toDate={args.toDate}
            />
        </Box>
      )
  }
};

export const CustomRange: Story = {
  ...PaxFormLayout,
  args: {
    timeMachine: false,
    day: "today",
    time: "range",
    arrivalDate: getLastMidnight().toDate(),
    fromDate: getLastMidnight().add(8, 'hours').toDate(),
    toDate: getLastMidnight().add(12, 'hours').toDate(),
  },
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement)
    const fromSelect = canvas.getByRole('combobox', {name: 'From'})
    const toSelect = canvas.getByRole('combobox', {name: 'To'})
    const originalRootFontSize = document.documentElement.style.fontSize

    await expect(fromSelect).toBeEnabled()
    await expect(toSelect).toBeEnabled()
    await expect(canvas.getByRole('option', {name: '00:00'})).toBeInTheDocument()
    await expect(canvas.getByRole('option', {name: '09:00 (+1 hours)'})).toBeInTheDocument()

    try {
      for (const rootFontSize of [10, 16]) {
        document.documentElement.style.fontSize = `${rootFontSize}px`
        await expect(window.getComputedStyle(fromSelect).fontSize).toBe('19px')
        await expect(window.getComputedStyle(fromSelect).height).toBe('40px')
        await expect(window.getComputedStyle(toSelect).fontSize).toBe('19px')
        await expect(window.getComputedStyle(toSelect).height).toBe('40px')
      }
    } finally {
      document.documentElement.style.fontSize = originalRootFontSize
    }
  },
};
