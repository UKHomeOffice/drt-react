import * as React from 'react';


import type {Meta, StoryObj} from '@storybook/react';
import { Button as MuiButton, ToggleButtonGroup as MuiToggleButtonGroup, ButtonGroup as MuiButtonGroup } from "./storybookExports/Buttons.component";
import { Stack } from '@mui/material';


const meta: Meta<typeof MuiButton> = {
    title: "DRT Components/MUI Components/Buttons",
    component: MuiButton,
};

export default meta;
type Story = StoryObj<typeof MuiButton>;


export const BasicButtons: Story = {
  tags: ['!dev'],
  render: (args) => {
    return <Stack direction={'row'} spacing={2}>
      <MuiButton variant="text">Text</MuiButton>
      <MuiButton variant="contained">Contained</MuiButton>
      <MuiButton variant="outlined">Outlined</MuiButton>
    </Stack>
  }
};

export const TextButtons: Story = {
  tags: ['!dev'],
  render: (args) => {
    return <Stack direction={'row'} spacing={2}>
      <MuiButton>Primary</MuiButton>
      <MuiButton disabled>Disabled</MuiButton>
      <MuiButton href="#text-buttons">Link</MuiButton>
    </Stack>
  }
};

export const ContainedButtons: Story = {
  tags: ['!dev'],
  render: (args) => {
    return <Stack direction={'row'} spacing={2}>
      <MuiButton variant="contained">Contained</MuiButton>
      <MuiButton variant="contained" disabled>
        Disabled
      </MuiButton>
      <MuiButton variant="contained" href="#contained-buttons">
        Link
      </MuiButton>
    </Stack>
  }
};

export const OutlinedButtons: Story = {
  tags: ['!dev'],
  render: (args) => {
    return <Stack direction={'row'} spacing={2}>
      <MuiButton variant="outlined">Contained</MuiButton>
      <MuiButton variant="outlined" disabled>
        Disabled
      </MuiButton>
      <MuiButton variant="outlined" href="#contained-buttons">
        Link
      </MuiButton>
    </Stack>
  }
};

export const ColorButtons: Story = {
  tags: ['!dev'],
  render: (args) => {
    return <>
      <Stack direction={'row'} spacing={2}>
        <MuiButton variant="contained" color="primary">Primary</MuiButton>
        <MuiButton variant="contained" color="secondary">Secondary</MuiButton>
        <MuiButton variant="contained" color="success">
          Success
        </MuiButton>
        <MuiButton variant="contained" color="error">
          Error
        </MuiButton>
        <MuiButton variant="contained" color="warning">
          Warning
        </MuiButton>
        <MuiButton variant="contained" color="info">
          Info
        </MuiButton>
      </Stack>
      <Stack direction={'row'} spacing={2} my={2}>
        <MuiButton variant="outlined" color="primary">Primary</MuiButton>
        <MuiButton variant="outlined" color="secondary">Secondary</MuiButton>
        <MuiButton variant="outlined" color="success">
          Success
        </MuiButton>
        <MuiButton variant="outlined" color="error">
          Error
        </MuiButton>
        <MuiButton variant="outlined" color="warning">
          Warning
        </MuiButton>
        <MuiButton variant="outlined" color="info">
          Info
        </MuiButton>
      </Stack>
      <Stack direction={'row'} spacing={2}>
        <MuiButton variant="text" color="primary">Primary</MuiButton>
        <MuiButton variant="text" color="secondary">Secondary</MuiButton>
        <MuiButton variant="text" color="success">
          Success
        </MuiButton>
        <MuiButton variant="text" color="error">
          Error
        </MuiButton>
        <MuiButton variant="text" color="warning">
          Warning
        </MuiButton>
        <MuiButton variant="text" color="info">
          Info
        </MuiButton>
      </Stack>
    </>
  }
};

export const SizeButtons: Story = {
  tags: ['!dev'],
  render: (args) => {
    return <>
    <Stack direction={'row'} spacing={2}>
      <MuiButton size="small">Small</MuiButton>
      <MuiButton size="medium">Medium</MuiButton>
      <MuiButton size="large">Large</MuiButton>
    </Stack>
    <Stack direction={'row'} spacing={2} my={2}>
      <MuiButton variant='outlined' size="small">Small</MuiButton>
      <MuiButton variant='outlined' size="medium">Medium</MuiButton>
      <MuiButton variant='outlined' size="large">Large</MuiButton>
    </Stack>
    <Stack direction={'row'} spacing={2}>
      <MuiButton variant='contained' size="small">Small</MuiButton>
      <MuiButton variant='contained' size="medium">Medium</MuiButton>
      <MuiButton variant='contained' size="large">Large</MuiButton>
    </Stack>
  </>
  }
};

export const ButtonGroups: Story = {
  tags: ['!dev'],
  render: (args) => {
    return <MuiButtonGroup>
      <MuiButton variant='contained' size="small">One</MuiButton>
      <MuiButton variant='contained' size="medium" disabled>Disabled</MuiButton>
      <MuiButton variant='contained' size="large">Large</MuiButton>
    </MuiButtonGroup>
  }
};

export const ToggleButtonGroups: Story = {
  tags: ['!dev'],
  render: (args) => {
    return <MuiToggleButtonGroup >
      <MuiButton variant='outlined'>Small</MuiButton>
      <MuiButton variant='outlined'>Medium</MuiButton>
      <MuiButton variant='outlined'>Large</MuiButton>
    </MuiToggleButtonGroup>
  }
};