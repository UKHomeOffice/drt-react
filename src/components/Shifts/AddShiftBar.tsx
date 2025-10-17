import React from "react";
import {Box, Button, Stack, Typography} from "@mui/material";

export interface AddShiftBarProps {
  onClickGetStarted: () => void;
  onClickViewStaffing: () => void;
}


export const AddShiftBar = ({
                              onClickGetStarted,
                              onClickViewStaffing
                            }: AddShiftBarProps) => {
  return (
    <Box>
      <Typography variant="h5" sx={{"paddingLeft":"10px"}}>
        No shift patterns added.
      </Typography>
      <Stack direction={'row'} spacing={2} alignItems={'center'}>
        <Button variant="contained" color="primary" onClick={onClickGetStarted}>Create shift pattern</Button>
        <Button variant="contained" color="secondary" onClick={onClickViewStaffing}>View staffing</Button>
      </Stack>
    </Box>
  );
}
