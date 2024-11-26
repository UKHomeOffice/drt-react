import type {Meta, StoryObj} from '@storybook/react';
import {AccessibilityStatement as AccessibilityStatementComponent} from './AccessibilityStatement';

export default {
  title: 'DRT Components/UI/AccessibilityStatementComponent',
  component: AccessibilityStatementComponent,
} as Meta;

type Story = StoryObj<typeof AccessibilityStatementComponent>;


export const AccessibilityStatement: Story = {
  args: {
    url: '#accessibility/',
    teamEmail: 'team@example.com',
    sendReportProblemGaEvent: () => console.log('Email us to report a problem'),
    scrollSection: ""
  }
};