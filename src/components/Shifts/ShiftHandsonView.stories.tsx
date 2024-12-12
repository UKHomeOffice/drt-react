import type {Meta, StoryObj} from '@storybook/react';
import {ShiftHotTableView as ShiftHotTableViewComponent} from "./ShiftHotTableView";

export default {
  title: 'DRT Components/UI/ShiftHotTableViewComponent',
  component: ShiftHotTableViewComponent,
} as Meta;

type Story = StoryObj<typeof ShiftHotTableViewComponent>;


export const ShiftHotTableView: Story = {
  args: {
    month: 1,
    interval: 60,
    }
};