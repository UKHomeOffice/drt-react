import type { Meta, StoryObj } from '@storybook/react';

import { default as SiteFrameComponent } from "./";

const meta: Meta<typeof SiteFrameComponent> = {
  title: "DRT Components/WIP",
  component: SiteFrameComponent,
};

export default meta;
type Story = StoryObj<typeof SiteFrameComponent>;

export const SiteFrame: Story = {
  args: {},
  parameters: {},
};
