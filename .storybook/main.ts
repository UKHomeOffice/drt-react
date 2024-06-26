import type { StorybookConfig } from '@storybook/react-webpack5';
import React from 'react';
import { AddonPanel } from '@storybook/components';
import { useGlobals, addons, types } from '@storybook/manager-api';

addons.register('drt/carbonfootprint', () => {
  addons.add('carbonfootprint/panel', {
    title: 'Carbon Footprint',
    //👇 Sets the type of UI element in Storybook
    type: types.PANEL,
    render: ({ active }) => (
      <AddonPanel active={active}>
        <h2>I'm a panel addon in Storybook</h2>
      </AddonPanel>
    ),
  });
});

const config: StorybookConfig = {
  stories: [
    '../src/**/*.stories.mdx', 
    '../src/**/*.stories.@(js|jsx|ts|tsx)'
  ],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/icons',
    '@storybook/addon-jest',
    '@storybook/addon-themes',
    '@storybook/addon-webpack5-compiler-babel',
    '@storybook/addon-a11y',
  ],

  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },

  docs: {},

  typescript: {
    reactDocgen: 'react-docgen-typescript'
  }
};
export default config;
