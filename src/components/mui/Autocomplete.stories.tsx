import * as React from 'react';
import { TextField, Autocomplete as MuiAutocomplete } from "./storybookExports/FormFields.component";

import type {Meta, StoryObj} from '@storybook/react';

const meta: Meta<typeof MuiAutocomplete> = {
    title: "DRT Components/MUI Components/Forms/Autocomplete",
    component: MuiAutocomplete,
};

export default meta;
type Story = StoryObj<typeof MuiAutocomplete>;

const options = [
  {label: '(LHR) Heathrow', value: 'LHR'},
  {label: '(LGW) Gatwick', value: 'LHR'},
  {label: '(LCY) City', value: 'LHR'},
  {label: '(STN) Stanstead', value: 'LHR'},
  {label: '(SEN) Southend', value: 'LHR'},
]

export const Autocomplete: Story = {
  args: {
    autoComplete: true,
    noOptionsText: 'No airports found',
    options: options,
    sx: {width: 300},
    onHighlightChange: () => null,
    renderInput: (params) => <TextField {...params} label="Airport" />,
    disabled: false,
  }
};
