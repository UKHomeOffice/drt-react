import React from 'react';
import { 
  Button as MuiButton, 
  ButtonProps as MuiButtonProps,
  IconButton as MuiIconButton,
  IconButtonProps as MuiIconButtonProps,
  ToggleButton as MuiToggleButton,
  ToggleButtonProps as MuiToggleButtonProps,
  ToggleButtonGroup as MuiToggleButtonGroup,
  ToggleButtonGroupProps as MuiToggleButtonGroupProps,
  ButtonGroup as MuiButtonGroup,
  ButtonGroupProps as MuiButtonGroupProps,
} from '@mui/material';
 
export interface ButtonProps extends MuiButtonProps {}
export interface IconButtonProps extends MuiIconButtonProps {}
export interface ToggleButtonProps extends MuiToggleButtonProps {}
export interface ToggleButtonGroupProps extends MuiToggleButtonGroupProps {}
export interface ButtonGroupProps extends MuiButtonGroupProps {}


export const Button = ({children, ...rest}: ButtonProps) => <MuiButton {...rest}>{ children }</MuiButton>;
export const IconButton = ({children, ...rest}: IconButtonProps) => <MuiIconButton {...rest}>{ children }</MuiIconButton>;
export const ToggleButton = ({children, ...rest}: ToggleButtonProps) => <MuiToggleButton {...rest}>{ children }</MuiToggleButton>;
export const ToggleButtonGroup = ({children, ...rest}: ToggleButtonGroupProps) => <MuiToggleButtonGroup {...rest}>{ children }</MuiToggleButtonGroup>;
export const ButtonGroup = ({children, ...rest}: ButtonGroupProps) => <MuiButtonGroup {...rest}>{ children }</MuiButtonGroup>;
