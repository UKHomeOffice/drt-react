import React, {useState} from "react";
import {Alert, Box, Button, Link, TextField, Typography} from "@mui/material";

export interface IMinStaffForm {
  port: string
  terminal: string
  message: string
  minStaffNumber: number | null
  handleSubmit: (minStaff: number | null) => void
  cancelHandler: () => void
}

export const MinStaffForm = ({port, terminal, message, minStaffNumber, handleSubmit, cancelHandler}: IMinStaffForm) => {
  const [staffNumber, setStaffNumber] = useState<number | null>(minStaffNumber);
  const [staffNumberFormatError, setStaffNumberFormatError] = useState(false);
  const [staffNumberErrorText, setStaffNumberErrorText] = useState("");
  const [submitError, setSubmitError] = useState(false);

  const handleFormSubmit = (event: React.ChangeEvent, minStaff: number | null) => {
    try {
      handleSubmit(minStaff);
      setSubmitError(false);
    } catch (error) {
      setSubmitError(true);
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStaffNumber(null);
    const value = event.target.value;

    if (!isNaN(Number(value)) && value.trim() !== "") {
      if (Number.isInteger(Number(value))) {
        if (Number(value) != 0) {
          setStaffNumber(Number(value));
          setStaffNumberFormatError(false);
        } else {
          setStaffNumberFormatError(true);
          setStaffNumberErrorText("Please enter a number greater than 0");
        }
      } else {
        setStaffNumberFormatError(true);
        setStaffNumberErrorText("Please enter a whole number, eg 10");
      }
    } else {
      setStaffNumberFormatError(true);
      setStaffNumberErrorText("Please enter a valid whole number, eg 10");
    }
  }

  return <Box data-testid={`min-staff-form`} sx={{paddingTop: '10px', paddingLeft: '10px'}}>
    {staffNumberFormatError && (
      <Alert data-testid={`min-staff-number-error`} severity="error">
        <Box sx={{marginTop: '-5px',fontWeight: 'bold', fontSize: '18px'}}>There is a problem</Box>
        <Box sx={{fontWeight: 'bold', fontSize: '12px'}}> {staffNumberErrorText}</Box>
      </Alert>
    )}
    {submitError && (
      <Alert data-testid={`min-staff-submit-error`} sx={{fontWeight: 'bold'}} severity="error">An error occurred while
        submitting the form. Please try again or contact us if the problem persists</Alert>
    )}
    <Box sx={{paddingTop: '10px'}}>{port} : {terminal}</Box>
    <Typography variant="h2" component="h2">Updating minimum staff number at PCP</Typography>
    <Box sx={{paddingTop: '10px'}}>{message}</Box>
    <Box sx={{paddingTop: '10px'}}>Staff numbers from any previous dates will not change.</Box>
    <Box sx={{paddingTop: '10px'}}>
      <TextField label="Enter minimum number of staff*" variant="outlined" sx={{width: '35ch'}}
                 data-testid={`min-staff-number-input`} onChange={handleInputChange}/>
      {staffNumberFormatError && (
        <Alert data-testid={`min-staff-number-error`} sx={{fontWeight: 'bold', fontSize: '12px'}}
               severity="error">{staffNumberErrorText}</Alert>
      )}
    </Box>
    <Box sx={{display: 'flex', alignItems: 'center'}}>
      <Button data-testid={`min-staff-form-submit`} sx={{
      marginTop: '10px', backgroundColor: staffNumberFormatError ? '#BDBDBD' : '#334F96',
        color: staffNumberFormatError ? '#000' : '#fff',
        textTransform: 'none', '&:hover': {backgroundColor: staffNumberFormatError ? '#BDBDBD' : '#334F96'}
    }} onClick={e => handleFormSubmit(e, staffNumber)} disabled={staffNumberFormatError}>Continue</Button>
      <Link sx={{paddingLeft: '30px', paddingTop: '10px', cursor: 'pointer'}} onClick={cancelHandler}>Cancel</Link>
    </Box>
  </Box>
}
