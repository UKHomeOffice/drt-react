import * as React from 'react';


import { useArgs } from '@storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';
import { PaxSearchForm, PaxSearchFormPayload } from './PaxSearchForm';
import moment from 'moment';

interface PaxSearchFormStoryControls {
  timeMachine: boolean,
  day: "yesterday" | "today" | "tomorrow",
  time: "now" | "24hour",
  arrivalDate: Date,
  fromDate:  Date,
  toDate:  Date,
}

const meta: Meta<PaxSearchFormStoryControls>  = {
  title: "DRT Components/Features/Pax/Pax Form Layout",
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
        type: 'date'
      }
    },
    toDate: {
      control: {
        type: 'date'
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
    time: "now",
    arrivalDate: new Date(),
    fromDate: new Date(),
    toDate: new Date(),
  },

  render: () => {
      const [args, updateArgs] = useArgs();

      const onChange = (searchFormState: PaxSearchFormPayload) => {
        console.log(searchFormState);
        updateArgs(searchFormState)
      };
      return (
        <PaxSearchForm 
          onChange={onChange}
          timeMachine={args.timeMachine} 
          day={args.day} 
          time={args.time}
          arrivalDate={args.arrivalDate}
          fromDate={args.fromDate}
          toDate={args.toDate}
          />
    )
  }
};
