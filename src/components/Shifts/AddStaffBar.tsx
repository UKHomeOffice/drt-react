import React from "react";
import {AppBar, Button, Toolbar, Typography} from "@mui/material";

export interface AddStaffBarProps {
  onClickGetStarted: () => void;
}

export const AddStaffBar = ({
                              onClickGetStarted,
                            }: AddStaffBarProps) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{}}>
          Save time : add shift staff to shifts
        </Typography>
        <Button variant="outlined"
                sx={{
                  ml: 1,
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