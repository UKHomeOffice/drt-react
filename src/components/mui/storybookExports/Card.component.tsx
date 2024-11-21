import React from 'react';
import { 
  Card as MuiCard, 
  CardProps as MuiCardProps,
  CardContent as MuiCardContent, 
  CardContentProps as MuiCardContentProps,
} from '@mui/material';
 
export interface CardProps extends MuiCardProps {}
 
export interface CardContentProps extends MuiCardContentProps {}

export const Card = ({children, ...rest}: CardProps) => <MuiCard {...rest}>{ children }</MuiCard>;
export const CardContent = ({children, ...rest}: CardContentProps) => <MuiCardContent {...rest}>{ children }</MuiCardContent>;
