import type {Meta, StoryObj} from '@storybook/react';
import {AddStaffBar as AddStaffBarComponent} from './AddStaffBar';

export default {
  title: 'DRT Components/UI/AddStaffBarComponent',
  component: AddStaffBarComponent,
} as Meta;

type Story = StoryObj<typeof AddStaffBarComponent>;


export const AddStaffBar: Story = {
  args: {
    onClickGetStarted: () => console.log('Get Started'),
  }
};