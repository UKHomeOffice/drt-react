import { useTheme } from '@mui/material/styles';
import * as React from 'react';

import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import AirlineStopsIcon from '@mui/icons-material/AirlineStops';
import { Stack, Typography } from '@mui/material';

export enum PlaneStatus {
  Delayed = "Delayed",
  Cancelled = "Cancelled",
  Diverted = "Diverted",
  OnChocks = "On chocks",
  OnChocksDelayed = "On chocks (delayed)",
}

export interface IPlaneStatusLabel {
  status: PlaneStatus
}

export const PlaneStatusLabel = ({status}: IPlaneStatusLabel) => {
  let icon : React.ReactNode = <></>;
  let text : string  = '';
  let color: string = 'info';
  
  switch(status) {
    case PlaneStatus.Delayed:
      color = 'error';
      icon = <ErrorOutlineIcon color='error' />;
      break;
    case PlaneStatus.Cancelled:
      color = 'error';
      icon = <DoDisturbIcon color='error' />;
      break;
    case PlaneStatus.Diverted:
      color = 'error';
      icon = <AirlineStopsIcon color='error' />;
      break;
    case PlaneStatus.OnChocks:
      color = 'info';
      icon = <></>;
      break;
    case PlaneStatus.OnChocksDelayed:
      color = 'error';
      icon = <ErrorOutlineIcon color='error' />;
      break;
  } 
  
  return (
    <Stack direction={'row'} spacing={1} display={'inline-flex'} alignItems={'center'}>{ icon } <Typography color={color}>{ status }</Typography></Stack>
  )
}
