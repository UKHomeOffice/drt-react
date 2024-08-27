import React from "react";

import {Alert, Box, Button} from "@mui/material";

export interface IMinStaffWarning {
  message1: string,
  message2: string,
  minStaff?: number,
  handleClick: () => void,
}

export const MinStaffWarning = ({message1, message2, minStaff, handleClick}: IMinStaffWarning) => {
  return <Alert sx={{color: '#873200', border: '1px solid #873200'}} severity="warning">
    <Box sx={{fontWeight: 'bold'}}>{message1} {minStaff}</Box>
    <Box sx={{paddingTop: '10px'}}>{message2}</Box>
    <Box sx={{paddingTop: '10px'}}>
      <Button
        data-testid="mobile-add-min-staff"
        variant="outlined"
        id="add-min-staff"
        onClick={handleClick}
        sx={{marginLeft: 'auto', backgroundColor: '#334F96', color: '#fff', textTransform: 'none'}}
      >+ Add minimum staff</Button>
    </Box>
  </Alert>
}
