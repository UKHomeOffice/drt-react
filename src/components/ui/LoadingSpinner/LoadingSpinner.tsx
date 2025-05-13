import React from "react";
import { Box, Stack, Typography, CircularProgress } from '@mui/material';


export interface IPhaseBanner {
  loadingText?: string,
}

export const LoadingSpinner = ({loadingText} : IPhaseBanner) => {
  return (<Stack alignItems={'center'} pt={4}>
    <Box sx={{ position: 'relative' }}>
      <CircularProgress
        variant="determinate"
        sx={(theme) => ({
          color: theme.palette.grey[200],
        })}
        size={100}
        thickness={5}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={(theme) => ({
          color: theme.palette.info.main,
          animationDuration: '2s',
          position: 'absolute',
          left: 0,
        })}
        size={100}
        thickness={5}
      />
    </Box>
    <Typography component={'h1'} variant="h3" py={4}>{loadingText || 'Loading...'}</Typography>
    </Stack>
    )
}
