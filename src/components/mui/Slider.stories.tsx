import * as React from 'react';
import { Slider as MuiSlider } from "./storybookExports/FormFields.component";
import drtTheme from '../../drt-theme';

import type {Meta, StoryObj} from '@storybook/react';

const meta: Meta<typeof MuiSlider> = {
    title: "DRT Components/MUI Components/Forms/Slider",
    component: MuiSlider,
    args: {
      min: 0,
      max: 100,
      sx: {
        maxWidth: '200px',
        maxHeight: '200px',
      }
    },
};

export default meta;
type Story = StoryObj<typeof MuiSlider>;

export const Slider: Story = {
  render: ({...args}) => {
    return <MuiSlider {...args} />
  }
};
