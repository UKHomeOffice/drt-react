import React, {useState} from "react";
import {Alert, Box, Button, OutlinedInput, Typography} from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {AddCircle} from "@mui/icons-material";

export interface IMinStaffForm {
  port: string
  terminal: string
  minStaffNumber: number | null
  handleSubmit: (minStaff: number | null) => boolean
  continueCallback: () => void
}

export const MinStaffForm = ({port, terminal, minStaffNumber, handleSubmit, continueCallback}: IMinStaffForm) => {
  const [staffNumber, setStaffNumber] = useState<number | null>(minStaffNumber);
  const [staffNumberFormatError, setStaffNumberFormatError] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const handleFormSubmit = (event: React.ChangeEvent, minStaff: number | null) => {
    try {
      const submitted = handleSubmit(minStaff);
      setSubmitted(submitted);
      setSubmitError(false);
    } catch (error) {
      setSubmitError(true);
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStaffNumber(null);
    const value = event.target.value;

    if (!isNaN(Number(value)) && value.trim() !== "") {
      setStaffNumber(Number(value));
      setStaffNumberFormatError(false);
    } else {
      setStaffNumberFormatError(true);
    }
  }

  {
    if (submitted) {
      return <Box data-testid={`min-staff-form-success`} sx={{marginTop: '10px', backgroundColor: '#eeeff0'}}>
        <Alert sx={{color:'#FFFFFF', backgroundColor:'#2E7D32'}} severity="success" icon={<CheckCircleIcon style={{ color: '#FFFFFF' }}/>}>You updated the minimum staff number</Alert>
          <Button sx={{marginTop: '10px', marginLeft: '50px', marginBottom: '10px',  backgroundColor: '#334F96', color: '#fff', textTransform: 'none',
          '&:hover': {backgroundColor: '#334F96'}, }} onClick={continueCallback}>
          Continue
        </Button>
      </Box>
    } else
      return <Box data-testid={`min-staff-form`} sx={{paddingTop: '10px', paddingLeft: '10px'}}>
        {staffNumberFormatError && (
          <Alert data-testid={`min-staff-number-error`} severity="error">Please enter a valid whole number, eg 10</Alert>
        )}
        {submitError && (
          <Alert data-testid={`min-staff-submit-error`} severity="error">An error occurred while submitting the form. Please try again or contact us if the problem persists</Alert>
        )}
        <Box sx={{paddingTop: '10px'}}>{port} : {terminal}</Box>
        <Typography variant ="h2" component="h2">Updating minimum staff number at PCP</Typography>
        <Box sx={{paddingTop: '10px'}}>This number will be applied to all future dates. It will overwrite all staff numbers that are currently zero with your new specified number</Box>
        <Box sx={{paddingTop: '10px'}}>Staff numbers from any previous dates will not change.</Box>
        <Box sx={{paddingTop: '10px'}}>
          <OutlinedInput data-testid={`min-staff-number-input`} placeholder="minimum number staff*" onChange={handleInputChange}/>
        </Box>
        <Button data-testid={`min-staff-form-submit`} sx={{
          marginTop: '10px', backgroundColor: '#334F96', color: '#fff', textTransform: 'none',
          '&:hover': {backgroundColor: '#334F96'}
        }} startIcon={<AddCircle/>} onClick={e => handleFormSubmit(e, staffNumber)}>
          Continue
        </Button>
      </Box>
  }
}
