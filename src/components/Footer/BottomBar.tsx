import React from 'react';
import {AppBar, Link, Toolbar, Typography} from "@mui/material";

export interface BottomBarProps {
  email: string;
  onClickAccessibilityStatement: () => void;
  accessibilityStatementUrl: string;
  feedbackUrl: string;
}

export const BottomBar = ({email, onClickAccessibilityStatement, accessibilityStatementUrl ,feedbackUrl}: BottomBarProps) => {
  return (
    <AppBar position="static" color="default" sx={{top: 'auto', bottom: 0}}>
      <Toolbar sx={{
        display: 'flex',
        gap: '12px',
        flexDirection: {xs: 'column', sm: 'row'},
        alignItems: {xs: 'flex-start', sm: 'center'}
      }}>
        <Typography variant="body1">Support links:</Typography>
        <Link href={`mailto:${email}`} target="_blank" underline="always">Email us</Link>
        <Link underline="always" href={accessibilityStatementUrl} onClick={onClickAccessibilityStatement}>
          Accessibility statement
        </Link>
        <Link href={`${feedbackUrl}`} target="_blank" underline="always">Give feedback</Link>
      </Toolbar>
    </AppBar>
  );
};

