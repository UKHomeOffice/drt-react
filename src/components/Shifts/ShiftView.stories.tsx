import type {Meta, StoryObj} from '@storybook/react';
import {ShiftView as ShiftViewComponent} from "./ShiftView";

export default {
  title: 'DRT Components/UI/ShiftViewComponent',
  component: ShiftViewComponent,
} as Meta;

type Story = StoryObj<typeof ShiftViewComponent>;


export const ShiftView: Story = {
  args: {
    month: 1,
    interval: 60,
    }
};