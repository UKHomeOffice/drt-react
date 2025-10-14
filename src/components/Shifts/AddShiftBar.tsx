import React from "react";
import {Box, Button, Stack, Typography} from "@mui/material";

export interface AddShiftBarProps {
  onClickGetStarted: () => void;
  onViewStaffing: () => void;
}


export const AddShiftBar = ({
                              onClickGetStarted,
                              onViewStaffing
                            }: AddShiftBarProps) => {
  return (
    <Box>
      <Typography variant="h5" sx={{"paddingLeft":"10px"}}>
        No shift patterns added.
      </Typography>
      <Stack direction={'row'} spacing={2} alignItems={'center'}>
        <Button size="small" variant="contained" color="primary" onClick={onClickGetStarted}>Create shift pattern</Button>
        <Button size="small" variant="contained" color="secondary" onClick={onViewStaffing}>View staffing</Button>
      </Stack>
    </Box>
  );
}
