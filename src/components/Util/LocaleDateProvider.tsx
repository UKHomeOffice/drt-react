import React, { ReactNode } from "react";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

export interface ILocalDateProvider {
  children: ReactNode
}

export const LocalDateProvider = ({children}: ILocalDateProvider) => {

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      { children }
    </LocalizationProvider>
  )
}
