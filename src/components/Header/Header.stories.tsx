import type { Meta, StoryObj } from '@storybook/react';

import { default as HeaderComponent } from ".";

const meta: Meta<typeof HeaderComponent> = {
  title: "DRT Components/Header",
  component: HeaderComponent,
};

const HeaderArgs = {
  userRoles: [
      'manage-users',
      'download-manager',
      'health-checks:edit',
  ],
  portMenuItems: [
    { label: 'National Dashboard', link: '/national-pressure' },
    { label: 'CWL (Cardiff)', link: '/cwi' }
  ],
  adminMenuItems: [
    { label: 'Home', link: '/', roles: []},
    { label: 'Access requests', link: '/access-requests', roles: ['manage-users']},
    { label: 'Alert notices', link: '/alerts', roles: ['manage-users']},
    { label: 'Drop-in sessions', link: '/drop-in-sessions', roles: ['manage-users']},
    { label: 'Download Manager', link: '/download', roles: ['download-manager']},
    { label: 'Export Config', link: '/export-config', roles: ['manage-users']},
    { label: 'Feature guides', link: '/feature-guides', roles: ['manage-users']},
    { label: 'Health checks', link: '/health-checks', roles: ['health-checks:edit']},
    { label: 'Health check pauses', link: '/health-check-pauses', roles: ['health-checks:edit']},
    { label: 'Feedback', link: '/user-feedback', roles: ['manage-users']},
    { label: 'Users', link: '/users', roles: ['manage-users']},
  ],
  leftMenuItems: [
    {
      label: 'Port config',
      link: '/port-config',
      icon: 'Settings',
    },
    {
      label: 'Feed',
      link: '/feed',
      icon: 'Equalizer',
    }
  ],
  rightMenuItems: [
    {
      label: "What's new",
      link: '/whats-new',
      icon: 'Article',
    },
    {
      label: 'Training',
      link: '/training',
      icon: 'MenuBook',
    }
  ],
  maxWidth: 'none',
  initialSelectedPortMenuItem: '',
  routingFunction: (string: string) => console.log(string),
  logoutLink: () => {},
}

export default meta;
type Story = StoryObj<typeof HeaderComponent>;

export const FullWidthHeader: Story = {
  args: HeaderArgs,
  parameters: {},
};

export const ConstrainedWidthHeader: Story = {
  args: {
    ...HeaderArgs,
    maxWidth: '1280px',
  },
  parameters: {},
};
