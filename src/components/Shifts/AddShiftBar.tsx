import React from "react";
import { styled, Theme } from '@mui/material/styles';
import {Alert, AlertProps, Button, Card, CardContent, Toolbar, Typography} from "@mui/material";
import EventRepeatIcon from '@mui/icons-material/EventRepeat';

export interface AddShiftBarProps {
  onClickGetStarted: () => void;
}

const StyledAddShiftBar = styled(Alert)<AlertProps>(({theme}: {theme: Theme}) => ({
  backgroundColor: theme.palette.primary.main,
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
        <Typography variant="h5">
          Save time: add staff to shifts
        </Typography>
        <Button variant="outlined"
                sx={{
                  ml: 2,
                  backgroundColor: 'white',
                  '&:hover': {
                    backgroundColor: 'secondary.contrastText',
                    color: 'secondary.main'
                  }
                }} onClick={onClickGetStarted}>Get started</Button>
    </StyledAddShiftBar>
  );
}