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
  dayAt: moment(),
  startTime: moment(),
  endTime: moment().add(1, 'hour'),
}

export const EditShiftStaffForm = {
  args: {
    essf: essform,
    handleSubmit: (essf: IEditShiftStaff) => {
      console.log('Submit clicked', essf);
    },
    cancelHandler: () => {
      console.log('Cancel clicked');
    },
  }
};
