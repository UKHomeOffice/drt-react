import moment from 'moment';
import type {Meta, StoryObj} from '@storybook/react';
import {Moment} from "moment/moment";
import type {IEditShiftStaff, IEditShiftStaffForm} from './EditShiftStaffForm'
import {EditShiftStaffForm as EditShiftStaffFormComponent} from './EditShiftStaffForm'

const meta: Meta<typeof EditShiftStaffFormComponent> = {
  title: "DRT Components/EditShiftStaffFormComponent",
  component: EditShiftStaffFormComponent,
};

export default meta;

type Story = StoryObj<typeof EditShiftStaffFormComponent>;

const essform: IEditShiftStaff = {
  actualStaff: 1,
  startDayAt: moment(),
  startTimeAt: moment(),
  endTimeAt: moment().add(1, 'hour'),
  endDayAt: moment().add(1, 'day')
}



export const EditShiftStaffForm = {
  args: {
    essf: essform,
    interval: 15,
     handleSubmit: (essf: IEditShiftStaff) => {
      console.log('Submit clicked', essf);
    },
    cancelHandler: () => {
      console.log('Cancel clicked');
    },
  }
};
