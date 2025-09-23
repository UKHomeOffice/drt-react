import React from 'react';
import { 
  FormGroup as MuiFormGroup,
  FormGroupProps as MuiFormGroupProps,
  FormControl as MuiFormControl, 
  FormControlProps as MuiFormControlProps,
  FormControlLabel as MuiFormControlLabel, 
  FormControlLabelProps as MuiFormControlLabelProps,
  InputLabel as MuiInputLabel, 
  InputLabelProps as MuiInputLabelProps,
  FormLabel as MuiFormLabel, 
  FormLabelProps as MuiFormLabelProps,
  TextField as MuiTextField, 
  TextFieldProps as MuiTextFieldProps,
  Select as MuiSelect, 
  SelectProps as MuiSelectProps,
  NativeSelect as MuiNativeSelect, 
  NativeSelectProps as MuiNativeSelectProps,
  MenuItem as MuiMenuItem, 
  MenuItemProps as MuiMenuItemProps,
  Autocomplete as MuiAutocomplete,
  AutocompleteProps as MuiAutocompleteProps,
  Checkbox as MuiCheckbox,
  CheckboxProps as MuiCheckboxProps,
  RadioGroup as MuiRadioGroup,
  RadioGroupProps as MuiRadioGroupProps,
  Radio as MuiRadio,
  RadioProps as MuiRadioProps,
  Slider as MuiSlider,
  SliderProps as MuiSliderProps,
} from '@mui/material';

import { 
  DatePicker as MuiDatepicker,
  DatePickerProps as MuiDatePickerProps,
  TimePicker as MuiTimePicker,
  TimePickerProps as MuiTimePickerProps,
} from '@mui/x-date-pickers';
 
export type FormGroupProps = {} & MuiFormGroupProps;
export type FormControlProps = {} & MuiFormControlProps;
export type FormControlLabelProps = {} & MuiFormControlLabelProps;
export type InputLabelProps = {} & MuiInputLabelProps;
export type FormLabelProps = {} & MuiFormLabelProps;
export type TextFieldProps = {} & MuiTextFieldProps;
export type SelectProps = {} & MuiSelectProps;
export type NativeSelectProps = {} & MuiNativeSelectProps;
export type MenuItemProps = {} & MuiMenuItemProps;
export type DatePickerProps = {} & MuiDatePickerProps<Date>;
export type TimePickerProps = {} & MuiTimePickerProps<Date>;
export type AutocompleteProps = {} & MuiAutocompleteProps<{ label: string; value: string | number }, boolean | undefined, boolean | undefined, boolean | undefined>;
export type CheckboxProps = {} & MuiCheckboxProps;
export type RadioGroupProps = {} & MuiRadioGroupProps;
export type RadioProps = {} & MuiRadioProps;
export type SliderProps = {} & MuiSliderProps;

export const FormGroup = ({ children, ...rest }: FormGroupProps) => <MuiFormGroup {...rest}>{ children }</MuiFormGroup>;
export const FormControl = ({ children, ...rest }: FormControlProps) => <MuiFormControl {...rest}>{ children }</MuiFormControl>;
export const FormControlLabel = ({ ...rest }: FormControlLabelProps) => <MuiFormControlLabel {...rest} />;
export const InputLabel = ({ children, ...rest }: InputLabelProps) => <MuiInputLabel {...rest}>{ children }</MuiInputLabel>;
export const FormLabel = ({ children, ...rest }: FormLabelProps) => <MuiFormLabel {...rest}>{ children }</MuiFormLabel>;
export const TextField = ({ ...rest }: TextFieldProps) => <MuiTextField {...rest}></MuiTextField>;
export const Select = ({ ...rest }: SelectProps) => <MuiSelect {...rest}></MuiSelect>;
export const NativeSelect = ({ ...rest }: NativeSelectProps) => <MuiNativeSelect {...rest}></MuiNativeSelect>;
export const MenuItem = ({ value, children }: MenuItemProps) => <MuiMenuItem value={value}>{ children }</MuiMenuItem>;
export const DatePicker = ({ ...rest }: DatePickerProps) => <MuiDatepicker {...rest} />;
export const TimePicker = ({ ...rest }: TimePickerProps) => <MuiTimePicker {...rest} />;
export const Autocomplete = ({ ...rest }: AutocompleteProps) => <MuiAutocomplete {...rest} />;
export const Checkbox = ({ ...rest }: CheckboxProps) => <MuiCheckbox {...rest} />;
export const RadioGroup = ({ children, ...rest }: RadioGroupProps) => <MuiRadioGroup {...rest}>{ children }</MuiRadioGroup>;
export const Radio = ({ ...rest }: RadioProps) => <MuiRadio {...rest} />;
export const Slider = ({ ...rest }: SliderProps) => <MuiSlider {...rest} />;
