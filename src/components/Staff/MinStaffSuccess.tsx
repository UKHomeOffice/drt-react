import {Alert, Box, Button} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import React from "react";

export interface IMinStaffSuccess {
  minStaffNumber: number | null,
  message: string,
}

export const MinStaffSuccess = ({minStaffNumber, message}: IMinStaffSuccess) => {
  return <Box data-testid={`min-staff-form-success`} sx={{marginTop: '10px', backgroundColor: '#eeeff0'}}>
    <Alert sx={{color: '#FFFFFF', backgroundColor: '#2E7D32'}} severity="success"
           icon={<CheckCircleIcon style={{color: '#FFFFFF'}}/>}>{message} {minStaffNumber}</Alert>
  </Box>
}
