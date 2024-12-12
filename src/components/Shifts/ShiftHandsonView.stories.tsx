import type {Meta, StoryObj} from '@storybook/react';
import {ShiftHandsonView as ShiftHandsonViewComponent} from "./ShiftHandsonView";

export default {
  title: 'DRT Components/UI/ShiftHandsonViewComponent',
  component: ShiftHandsonViewComponent,
} as Meta;

type Story = StoryObj<typeof ShiftHandsonViewComponent>;


export const ShiftHandsonView: Story = {
  args: {
    month: 1,
    interval: 60,
    }
};