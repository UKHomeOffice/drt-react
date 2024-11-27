import type {Meta, StoryObj} from '@storybook/react';
import { default as AccessibilityStatementComponent } from ".";

export default {
  title: 'DRT Components/UI/AccessibilityStatementComponent',
  component: AccessibilityStatementComponent,
} as Meta;

type Story = StoryObj<typeof AccessibilityStatementComponent>;


export const AccessibilityStatement: Story = {
  args: {
    accessibilityStatementUrl: '#accessibility',
    teamEmail: 'team@example.com',
    sendReportProblemGaEvent: () => console.log('Email us to report a problem'),
    scrollSection: ""
  }
};