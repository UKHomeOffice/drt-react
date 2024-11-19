import * as React from 'react';
import { Source } from '@storybook/blocks';
import { useTheme } from '@mui/material';


export const ThemeSource = () => {
  const theme = useTheme();
  return (
    <Source code={JSON.stringify(theme, null, 2)} dark={true} />
  )
}
