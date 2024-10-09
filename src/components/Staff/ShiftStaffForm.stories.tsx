import moment from 'moment';
import type {Meta, StoryObj} from '@storybook/react';
import {IShiftStaffForm, ShiftStaffForm as ShiftStaffFormComponent} from "./ShiftStaffForm";
import {Moment} from "moment/moment";

const meta: Meta<typeof ShiftStaffFormComponent> = {
  title: "DRT Components/ShiftStaffFormComponent",
  component: ShiftStaffFormComponent,
};

export default meta;

type Story = StoryObj<typeof ShiftStaffFormComponent>;

const ssform: IShiftStaffForm = {
  shiftName: 'Shift 1',
  port: "Birmingham (BHX)",
  minimumRosteredStaff: null,
  terminal: 'Terminal 1',
  actualStaff: 1,
  startAt: moment(),
  periodInMinutes: 30,
  endAt: moment().add(1, 'hour'),
  frequency: 'daily',
  email: 'someone@example.com'
}

export const ShiftStaffForm = {

  args: {
    ssf: ssform,
    handleSubmit: (ssf: IShiftStaffForm) => {
      console.log('Submit clicked', ssf);
    },
    cancelHandler: () => {
      console.log('Cancel clicked');
    },
  }
};
