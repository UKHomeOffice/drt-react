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
    <Card variant='lightGrey'>
      <CardContent>
        <Typography variant="body1">
          <Stack direction={'row'} spacing={3}>
            <span>Support links:</span>
            <Link href={`mailto:${email}`} target="_blank" underline="always">Email us</Link>
            <Link underline="always" href={accessibilityStatementUrl} onClick={onClickAccessibilityStatement}>
              Accessibility statement
            </Link>
            <Link href={`${feedbackUrl}`} target="_blank" underline="always">Give feedback</Link>
          </Stack>
        </Typography>
      </CardContent>
    </Card>
  );
};

