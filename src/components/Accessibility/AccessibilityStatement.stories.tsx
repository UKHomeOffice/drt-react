import type {Meta, StoryObj} from '@storybook/react';
import {AccessibilityStatement as AccessibilityStatementComponent} from './AccessibilityStatement';

export default {
  title: 'DRT Components/AccessibilityStatementComponent',
  component: AccessibilityStatementComponent,
} as Meta;

type Story = StoryObj<typeof AccessibilityStatementComponent>;


export const AccessibilityStatement: Story = {
  args: {
    teamEmail: 'team@example.com',
    emailUsToReportAProblem: () => console.log('Email us to report a problem')
  }
};