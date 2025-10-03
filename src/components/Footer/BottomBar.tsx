import React from 'react';
import {AppBar, Box, Card, CardContent, Link, List, ListItem, Menu, MenuItem, Stack, Toolbar, Typography} from "@mui/material";

export interface BottomBarProps {
  email: string;
  onClickAccessibilityStatement: () => void;
  accessibilityStatementUrl: string;
  feedbackUrl: string;
}

export const BottomBar = ({email, onClickAccessibilityStatement, accessibilityStatementUrl ,feedbackUrl}: BottomBarProps) => {
  return (
    <Card variant='footer'>
      <CardContent>
       
          <Stack direction={'row'} spacing={3}>
            <Typography variant='body1' flexGrow={1}>A Home Office Digital, Data and Technology service</Typography>
            <Typography variant="body1" mb={0}><Link href={`mailto:${email}`} target="_blank" underline="always">Email us</Link></Typography>
            <Typography variant="body1" mb={0}><Link underline="always" href={accessibilityStatementUrl} onClick={onClickAccessibilityStatement}>
              Accessibility statement
            </Link></Typography>
            <Typography variant="body1" mb={0}><Link href={`${feedbackUrl}`} target="_blank" underline="always">Give feedback</Link></Typography>
          </Stack>
      </CardContent>
    </Card>
  );
};

