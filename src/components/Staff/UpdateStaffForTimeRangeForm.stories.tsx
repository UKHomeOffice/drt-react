import moment from 'moment';
import type {Meta, StoryObj} from '@storybook/react';
import type {IUpdateStaffForTimeRangeData} from './UpdateStaffForTimeRangeForm'
import {UpdateStaffForTimeRangeForm as UpdateStaffForTimeRangeFormComponent} from './UpdateStaffForTimeRangeForm'

const meta: Meta<typeof UpdateStaffForTimeRangeFormComponent> = {
  title: "DRT Components/UpdateStaffForTimeRangeFormComponent",
  component: UpdateStaffForTimeRangeFormComponent,
};

export default meta;

type Story = StoryObj<typeof UpdateStaffForTimeRangeFormComponent>;

const ustdForm: IUpdateStaffForTimeRangeData = {
  actualStaff: 1,
  startDayAt: moment(),
  startTimeAt: moment(),
  endTimeAt: moment().add(1, 'hour'),
  endDayAt: moment().add(1, 'day')
}



export const UpdateStaffForTimeRangeForm = {
  args: {
    ustd: ustdForm,
    interval: 15,
     handleSubmit: (essf: IUpdateStaffForTimeRangeData) => {
      console.log('Submit clicked', essf);
    },
    cancelHandler: () => {
      console.log('Cancel clicked');
    },
  }
};
