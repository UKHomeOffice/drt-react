import React from 'react';
import {AppBar, Box, Link, Toolbar, Typography} from "@mui/material";

export interface BottomBarProps {
  title: string;
  email: string;
  onClickAccessibilityStatement: () => void;
  url: string;
}

export const BottomBar = ({title, email, onClickAccessibilityStatement, url}: BottomBarProps) => {
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
        <Link underline="always" onClick={() => {
          window.location.hash = 'accessibility';
          onClickAccessibilityStatement();
        }} title={`${title}`}>
          Accessibility statement
        </Link>
        <Link href={`${url}`} target="_blank" underline="always">Give feedback</Link>
      </Toolbar>
    </AppBar>
  );
};

