import React from "react";
import {Box, Stack, Typography} from "@mui/material";
import {Button as GovukButton} from "../govuk/Button/Button";

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
      <Stack direction={'row'} spacing={2} alignItems={'center'} sx={{'& .govuk-button': {mb: 0}}}>
        <GovukButton variant="primary" onClick={onClickGetStarted}>Create shift pattern</GovukButton>
        <GovukButton variant="secondary" onClick={onClickViewStaffing}>View staffing</GovukButton>
      </Stack>
    </Box>
  );
}
