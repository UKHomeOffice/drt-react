import * as React from 'react';
import { PlaneStatusLabel } from './PlaneStatusLabel';
import { PlaneStatus } from './PlaneStatusLabel';
import { DatasourceStatus } from '../PaxUtils';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof PlaneStatusLabel> = {
  title: "DRT Components/Features/Pax/PlaneStatusLabel",
  component: PlaneStatusLabel,
};

export default meta;
type Story = StoryObj<typeof PlaneStatusLabel>;

export const Delayed: Story = {
  args: {
    status: PlaneStatus.Delayed,
  },
};

export const Cancelled: Story = {
  args: {
    status: PlaneStatus.Cancelled,
  },
};

export const Diverted: Story = {
  args: {
    status: PlaneStatus.Diverted,
  },
};

export const OnChocks: Story = {
  args: {
    status: PlaneStatus.OnChocks,
  },
};

export const OnChocksDelayed: Story = {
  args: {
    status: PlaneStatus.OnChocksDelayed,
  },
};

