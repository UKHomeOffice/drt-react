import {Alert, Box, IconButton} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";

export interface IStaffUpdateSuccess {
  staffNumber: number | null,
  message: string,
  closeHandler: () => void
}

export const StaffUpdateSuccess = ({staffNumber, message, closeHandler}: IStaffUpdateSuccess) => {
  return <Box data-testid={`min-staff-form-success`} sx={{marginTop: '10px', backgroundColor: '#eeeff0'}}>
    <Alert 
      color="success" 
      severity="success"
      action={
        <IconButton
          aria-label="close"
          color="inherit"
          size="small"
          onClick={closeHandler}
        >
          <CloseIcon fontSize="inherit"/>
        </IconButton>
      }
      icon={<CheckCircleIcon/>}>
        {message} {staffNumber}
      </Alert>
  </Box>
}
