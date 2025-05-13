import React from 'react';
import { 
  Alert as MuiButton, 
  AlertProps as MuiAlertProps,
} from '@mui/material';
 
export interface AlertProps extends MuiAlertProps {}

export const Alert = ({children, ...rest}: AlertProps) => <MuiButton {...rest}>{ children }</MuiButton>;
