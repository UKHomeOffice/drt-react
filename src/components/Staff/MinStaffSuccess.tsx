import {Alert, Box, IconButton} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";

export interface IMinStaffSuccess {
  minStaffNumber: number | null,
  message: string,
  closeHandler: () => void
}

export const MinStaffSuccess = ({minStaffNumber, message, closeHandler}: IMinStaffSuccess) => {
  return <Box data-testid={`min-staff-form-success`} sx={{marginTop: '10px', backgroundColor: '#eeeff0'}}>
    <Alert sx={{color: '#FFFFFF', backgroundColor: '#2E7D32'}} severity="success"
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
           icon={<CheckCircleIcon style={{color: '#FFFFFF'}}/>}>{message} {minStaffNumber}</Alert>
  </Box>
}
