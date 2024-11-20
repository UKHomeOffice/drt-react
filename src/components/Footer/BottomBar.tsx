import React from 'react';
import {Box, Link} from "@mui/material";

export interface BottomBarProps {
  email: string;
  clickAccessibility: () => void;
  url: string;
}

export const BottomBar = ({email, clickAccessibility, url}: BottomBarProps) => {
  return (
    <Box className="bottom-bar" sx={{
      height: '70px',
      width: '96%',
      margin: 'auto',
      display: 'flex',
      gap: '12px',
      borderTop: '11px solid #ddd',
      flexDirection: { xs: 'column', sm: 'row' },
      alignItems: { xs: 'flex-start', sm: 'center' }
    }}>
      <Box sx={{paddingLeft: '10px'}}>Support links:</Box>
      <Box sx={{paddingLeft: '10px'}}>
        <Link href={`mailto:${email}`} target="_blank" underline="always">Email us</Link>
      </Box>
      <Box className="separator" sx={{paddingLeft: '10px', display: { xs: 'none', sm: 'block' }}}>/</Box>
      <Box sx={{paddingLeft: '10px'}}>
        <Link underline="always" onClick={clickAccessibility}>Accessibility statement</Link>
      </Box>
      <Box className="separator" sx={{paddingLeft: '10px', display: { xs: 'none', sm: 'block' }}}>/</Box>
      <Box sx={{paddingLeft: '10px'}}>
        <Link href={`${url}`} target="_blank" underline="always">Give feedback</Link>
      </Box>
    </Box>
  );
};

