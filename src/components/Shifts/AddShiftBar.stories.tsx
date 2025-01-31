import type {Meta, StoryObj} from '@storybook/react';
import {AddShiftBar as AddShiftBarComponent} from './AddShiftBar';

export default {
  title: 'DRT Components/UI/AddStaffBarComponent',
  component: AddShiftBarComponent,
} as Meta;

type Story = StoryObj<typeof AddShiftBarComponent>;


export const AddShiftBar: Story = {
  args: {
    onClickGetStarted: () => console.log('Get Started'),
  }
};