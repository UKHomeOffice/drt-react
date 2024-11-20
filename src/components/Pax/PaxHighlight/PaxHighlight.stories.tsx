import * as React from 'react';
import { PaxHighlight } from './PaxHighlight';
import { DatasourceStatus } from '../PaxUtils';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof PaxHighlight> = {
  title: "DRT Components/Features/Pax/PaxHighlight",
  component: PaxHighlight,
};

export default meta;
type Story = StoryObj<typeof PaxHighlight>;

export const Estimate: Story = {
  args: {
    status: DatasourceStatus.Estimate,
  },
};

export const PortForecast: Story = {
  args: {
    status: DatasourceStatus.PortForecast,
  },
};

export const DRTForecast: Story = {
  args: {
    status: DatasourceStatus.DRTForecast,
  },
};

export const PortLiveData: Story = {
  args: {
    status: DatasourceStatus.PortLiveData,
  },
};

export const CarrierData: Story = {
  args: {
    status: DatasourceStatus.CarrierData,
  },
};

export const TerminalAverageData: Story = {
  args: {
    status: DatasourceStatus.TerminalAverageData,
  },
};

export const PastCarrierData: Story = {
  args: {
    status: DatasourceStatus.PastCarrierData,
  },
};

export const VerifiedCarrierData: Story = {
  args: {
    status: DatasourceStatus.VerifiedCarrierData,
  },
};

