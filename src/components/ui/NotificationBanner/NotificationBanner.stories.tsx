import * as React from 'react';
import {NotificationBanner as NotificationBannerComponent} from './NotificationBanner';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof NotificationBannerComponent> = {
  title: "DRT Components/UI/NotificationBanner",
  component: NotificationBannerComponent,
};

export default meta;
type Story = StoryObj<typeof NotificationBannerComponent>;

export const NotificationBanner: Story = {
  args: {
    color: 'info',
    title: 'Important',
    text: 'You have 7 days left to send your application.',
    link: '#application',
    linkText: 'View application'
  },
  render: (args) => {
      return <NotificationBannerComponent {...args} />
  }
};
