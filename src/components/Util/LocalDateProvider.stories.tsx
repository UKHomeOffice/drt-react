import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Box, Typography } from '@mui/material';

const meta: Meta = {
  title: "DRT Components/UI/LocalDateProvider",
};

export default meta;
type Story = StoryObj<typeof meta>;

export const PaxFormLayout: Story = {

  render: () => {
      return (
        <Box padding={4}>
          <Typography>
            A simple wrapper around the MUI-X LocalizationProvider:<br/><br/>
            <pre><code>
{`<LocalizationProvider dateAdapter={AdapterMoment}>
    ...
</LocalizationProvider>`}
            </code></pre>
          </Typography>
        </Box>
    )
  }
};
