import { StatusTag as StatusTagComponent } from "./";

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof StatusTagComponent> = {
  title: "DRT Components/StatusTags",
  component: StatusTagComponent,
};

export default meta;
type Story = StoryObj<typeof StatusTagComponent>;

export const Success: Story = {
  args: {
    type: "success",
    text: "Hurrah!",
  }
};

export const Info: Story = {
  args: {
    type: "info",
    text: "How interesting!",
  }
};

export const Warning: Story = {
  args: {
    type: "warning",
    text: "Here be dragons...",
  }
};

export const Error: Story = {
  args: {
    type: "error",
    text: "Oh dear...",
  }
};
