import type {Meta, StoryObj} from '@storybook/react';
import {ShiftSummaryView as ShiftSummaryViewComponent} from './ShiftSummaryView';
import {ShiftSummary} from "./ShiftHotTableView";
import React from "react";

export default {
  title: 'DRT Components/UI/ShiftSummaryComponent',
  component: ShiftSummaryViewComponent,
} as Meta;

type Story = StoryObj<typeof ShiftSummaryViewComponent>;

const shiftSummary: ShiftSummary[] = [
  {name: 'Early shift', defaultStaffNumber: 0, startTime: '06:30', endTime: '16:30'},
  {name: 'Mid shift', defaultStaffNumber: 0, startTime: '12:00', endTime: '22:30'},
  {name: 'Late shift', defaultStaffNumber: 0, startTime: '13:00', endTime: '23:00'},
  {name: 'Night shift', defaultStaffNumber: 0, startTime: '21:30', endTime: '24:00'}
];

const ShiftSummaryStory: React.FC = () => {

  return (
    <ShiftSummaryViewComponent shiftSummaries={shiftSummary}/>
  );
};

export const ShiftSummaryView: Story = {
  render: () => <ShiftSummaryStory/>
};