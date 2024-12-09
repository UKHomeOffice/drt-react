import React from "react";
import {AppBar, Button, Toolbar, Typography} from "@mui/material";
import EventRepeatIcon from '@mui/icons-material/EventRepeat';

export interface AddShiftBarProps {
  onClickGetStarted: () => void;
}

export const AddShiftBar = ({
                              onClickGetStarted,
                            }: AddShiftBarProps) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <EventRepeatIcon sx={{mr: 1}} />
        <Typography variant="h6">
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
      </Toolbar>
    </AppBar>
  );
}