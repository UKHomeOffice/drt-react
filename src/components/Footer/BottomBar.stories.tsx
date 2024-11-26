import type {Meta, StoryObj} from '@storybook/react';
import {BottomBar as BottomBarComponent} from './BottomBar';

export default {
  title: 'DRT Components/UI/BottomBarComponent',
  component: BottomBarComponent,
} as Meta;

type Story = StoryObj<typeof BottomBarComponent>;


export const BottomBar: Story = {
  args: {
    title: 'Accessibility Statement',
    email: 'team@example.com',
    onClickAccessibilityStatement: () => console.log('Click Accessibility'),
    url: '/#accessibility/',
    feedbackUrl: 'http://localhost:6006'
  }
};