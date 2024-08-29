import React, {useState} from "react";
import {Alert, Box, Button, OutlinedInput} from "@mui/material";

export interface IMinStaffForm {
  port: string
  terminal: string
  minStaffNumber: number | null
  handleSubmit: (minStaff: number | null) => boolean
  continueCallback: () => void
}

export const MinStaffForm = ({port, terminal, minStaffNumber, handleSubmit, continueCallback}: IMinStaffForm) => {
  const [staffNumber, setStaffNumber] = useState<number | null>(minStaffNumber);
  const [error, setError] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const handleFormSubmit = (event: React.ChangeEvent, minStaff: number | null) => {
    try {
      const submitted = handleSubmit(minStaff);
      setUpdated(submitted);
      setSubmitError(false);
    } catch (error) {
      console.error(error);
      setSubmitError(true);
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStaffNumber(null);
    const value = event.target.value;

    if (!isNaN(Number(value)) && value.trim() !== "") {
      setStaffNumber(Number(value));
      setError(false);
    } else {
      setError(true);
    }
  }

  {
    if (updated) {
      return <Box sx={{marginTop: '10px', backgroundColor: '#eeeff0'}}>
        <Alert sx={{paddingTop: '10px'}} severity="info">You updated the minimum staff number</Alert>
          <Button sx={{marginTop: '10px', marginLeft: '50px', marginBottom: '10px',  backgroundColor: '#334F96', color: '#fff', textTransform: 'none',
          '&:hover': {backgroundColor: '#334F96'}, }} onClick={continueCallback}>
          Continue
        </Button>
      </Box>
    } else
      return <Box sx={{paddingTop: '10px', paddingLeft: '10px'}}>
        {error && (
          <Alert severity="error">Enter number only</Alert>
        )}
        {submitError && (
          <Alert severity="error">An error occurred while submitting the form</Alert> // Add this line
        )}
        <Box sx={{paddingTop: '10px'}}>{port} : {terminal}</Box>
        <h2>Updating minimum staff number at PCP</h2>
        <Box sx={{paddingTop: '10px'}}>This number will applied to all future dates. It will overwrite staff numbers
          that
          are below this number.</Box>
        <Box sx={{paddingTop: '10px'}}>Staff numbers from any previous dates will not change.</Box>
        <Box sx={{paddingTop: '10px'}}>
          <OutlinedInput placeholder="minimum number staff*" onChange={handleInputChange}/>
        </Box>
        <Button sx={{
          marginTop: '10px', backgroundColor: '#334F96', color: '#fff', textTransform: 'none',
          '&:hover': {backgroundColor: '#334F96'}
        }} onClick={e => handleFormSubmit(e, staffNumber)}>
          Continue
        </Button>
      </Box>
  }
}
