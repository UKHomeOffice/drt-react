import React from 'react';
import { 
  Button as MuiButton, 
  ButtonProps as MuiButtonProps,
  IconButton as MuiIconButton,
  IconButtonProps as MuiIconButtonProps,
  ToggleButton as MuiToggleButton,
  ToggleButtonProps as MuiToggleButtonProps,
  ToggleButtonGroup as MuiToggleButtonGroup,
  ToggleButtonGroupProps as MuiToggleButtonGroupProps
} from '@mui/material';
 
export interface ButtonProps extends MuiButtonProps {}
export interface IconButtonProps extends MuiIconButtonProps {}
export interface ToggleButtonProps extends MuiToggleButtonProps {}
export interface ToggleButtonGroupProps extends MuiToggleButtonGroupProps {}

export const Button = ({children, ...rest}: ButtonProps) => <MuiButton {...rest}>{ children }</MuiButton>;
export const IconButton = ({children, ...rest}: IconButtonProps) => <MuiIconButton {...rest}>{ children }</MuiIconButton>;
export const ToggleButton = ({children, ...rest}: ToggleButtonProps) => <MuiToggleButton {...rest}>{ children }</MuiToggleButton>;
export const ToggleButtonGroup = ({children, ...rest}: ToggleButtonGroupProps) => <MuiToggleButtonGroup {...rest}>{ children }</MuiToggleButtonGroup>;
