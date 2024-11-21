import React from 'react';
import { 
  Typography as MuiTypography, 
  TypographyProps as MuiTypographyProps,
} from '@mui/material';
 
export interface TypographyProps extends MuiTypographyProps {}

export const Typography = ({children, ...rest }: TypographyProps) => <MuiTypography {...rest}>{ children }</MuiTypography>;
