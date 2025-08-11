import type {Meta, StoryObj} from '@storybook/react';
import {BottomBar as BottomBarComponent} from './BottomBar';

export default {
  title: 'DRT Components/UI/BottomBar',
  component: BottomBarComponent,
} as Meta;

type Story = StoryObj<typeof BottomBarComponent>;


export const BottomBar: Story = {
  args: {
    email: 'team@example.com',
    onClickAccessibilityStatement: () => console.log('Click Accessibility'),
    accessibilityStatementUrl: '/#accessibility',
    feedbackUrl: 'http://localhost:6006'
  }
};