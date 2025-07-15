import React, { ReactNode } from "react";
import { styled } from '@mui/system';
import { Box, Stack, Typography } from '@mui/material';

const PhaseBannerWrapper = styled(Stack)(({theme, color}) => ({
  alignItems: 'center',
  borderBottom: `1px solid ${theme.palette.border.main}`,
  padding: theme.spacing(2, 0)
}));
const PhaseBannerTag = styled(Typography)(({theme}) => ({
  padding: theme.spacing(1),
  backgroundColor: '#bbd4ea',
  display: 'inline-block',
  marginRight: theme.spacing(3),
  marginBottom: `0 !important`,
  fontSize: '16px',
}));
const PhaseBannerContent = styled(Box)(({theme, color}) => ({
  '> *': {
    marginBottom: `0px !important`
  }
}));

export interface IPhaseBanner {
  tagText: string,
  content: ReactNode,
}

export const PhaseBanner = ({tagText, content} : IPhaseBanner) => {
  return <PhaseBannerWrapper direction={'row'}>
    <PhaseBannerTag variant="body1">{tagText}</PhaseBannerTag>
    <PhaseBannerContent>
      {content}
    </PhaseBannerContent>
  </PhaseBannerWrapper>
}
