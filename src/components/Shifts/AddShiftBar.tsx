import React from "react";
import { styled, Theme } from '@mui/material/styles';
import {Alert, AlertProps, Button, Card, CardContent, Stack, Toolbar, Typography} from "@mui/material";
import EventRepeatIcon from '@mui/icons-material/EventRepeat';

export interface AddShiftBarProps {
  onClickGetStarted: () => void;
}

const StyledAddShiftBar = styled(Alert)<AlertProps>(({theme}: {theme: Theme}) => ({
  backgroundColor: theme.palette.info.main,
  border: 'none',
  color: 'white',
  '.MuiAlert-message': {
    display: 'flex',
    alignItems: 'center',
  },
  '.MuiAlert-icon': {
    color: 'white',
    alignItems: 'center',
  }
}));

export const AddShiftBar = ({
                              onClickGetStarted,
                            }: AddShiftBarProps) => {
  return (
    <StyledAddShiftBar icon={<EventRepeatIcon />}>
      <Stack direction={'row'} spacing={2} alignItems={'center'}>
        <Typography variant="h5">
          Save time: add staff to shifts
        </Typography>
        <Button size="small" variant="outlined" color="info"
          sx={{
            backgroundColor: 'white',
            '&:hover': {
              backgroundColor: 'info.contrastText',
              color: 'info.main'
            }
          }} onClick={onClickGetStarted}>Get started</Button>

      </Stack>
    </StyledAddShiftBar>
  );
}
