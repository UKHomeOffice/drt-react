import * as React from 'react';
import { Card as MuiCard, CardContent } from "./storybookExports/Card.component";

import type {Meta, StoryObj} from '@storybook/react';

const meta: Meta<typeof MuiCard> = {
    title: "DRT Components/MUI Components/Card",
    component: MuiCard,
    args: {
      sx: {
        width: '300px',
        height: '200px',
      }
    },
    argTypes: {
      variant: {
        options: ['elevation', 'outlined','appbar'],
        control: {type: 'radio'}
      },
    }
};

export default meta;
type Story = StoryObj<typeof MuiCard>;

export const Card: Story = {
  render: (args) => {
    return <MuiCard {...args}><CardContent></CardContent></MuiCard>
  }
};
