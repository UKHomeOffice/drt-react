import * as React from 'react';


import { useArgs } from '@storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';
import { PaxSearchForm, PaxSearchFormPayload } from './PaxSearchForm';
import moment from 'moment';
import { Box } from '@mui/material';

interface PaxSearchFormStoryControls {
  timeMachine: boolean,
  day: "yesterday" | "today" | "tomorrow",
  time: "now" | "24hour" | "range",
  arrivalDate: Date,
  fromDate:  string,
  toDate:  string,
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

export const PaxFormLayout: Story = {
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

      const onChange = (searchFormState: PaxSearchFormPayload) => {
        console.log(searchFormState);
        if(searchFormState.time === '24hour') {
          updateArgs(searchFormState)
        } else {
          updateArgs({ ...searchFormState, fromDate: '12:00', toDate: '16:00' });
        }
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
