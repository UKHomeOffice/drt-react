import moment from 'moment';
import type {Meta, StoryObj} from '@storybook/react';
import {ShiftStaffForm as ShiftStaffFormComponent} from "./ShiftStaffForm";
import {Moment} from "moment/moment";

const meta: Meta<typeof ShiftStaffFormComponent> = {
  title: "DRT Components/ShiftStaffFormComponent",
  component: ShiftStaffFormComponent,
};

export default meta;

type Story = StoryObj<typeof ShiftStaffFormComponent>;

export const ShiftStaffForm = {
  args: {
    shiftName: 'Shift 1',
    port: "Birmingham (BHX)",
    minimumRosteredStaff: null,
    terminal: 'Terminal 1',
    actualStaff: 1,
    startAt: moment(),
    periodInMinutes: 30,
    endAt: moment().add(1, 'hour'),
    frequency: 'daily',
    email: 'someone@example.com',
    handleSubmit: (port: string,
                   terminal: string,
                   shiftName: string,
                   startAt: Moment,
                   periodInMinutes: number,
                   endAt: Moment | null,
                   frequency: string | null,
                   actualStaff: number | null,
                   minimumRosteredStaff: number,
                   email: string) => {
        const json = {
        'port': port,
        'terminal': terminal,
        'shiftName': shiftName,
        'startAt': startAt.valueOf(),
        'periodInMinutes': periodInMinutes,
        'endAt': endAt?.valueOf(),
        'frequency': frequency,
        'actualStaff': actualStaff,
        'minimumRosteredStaff': minimumRosteredStaff,
        'email': email
      }
      console.log('Submit clicked',json);
    },
    cancelHandler: () => {
      console.log('Cancel clicked');
    },
  }
};
