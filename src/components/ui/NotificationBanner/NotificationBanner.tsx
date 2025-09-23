import React from "react";
import { styled } from '@mui/system';
import { Box, Link, Typography } from "@mui/material";

const NotificationBannerWrapper = styled(Box)(({theme, color}) => ({
  borderWidth: theme.spacing(1),
  borderStyle: 'solid',
  borderColor: theme.palette[`${color}`].main,
}));
const NotificationBannerTitle = styled(Typography)(({theme, color}) => ({
  backgroundColor: theme.palette[`${color}`].main,
  padding: `2px ${theme.spacing(3)} ${theme.spacing(1)}`,
  color: '#fff',
  marginBottom: `0px !important`,
  fontSize: '19px !important',
}));
const NotificationBannerText = styled(Box)(({theme, color}) => ({
  padding: theme.spacing(3),
  fontWeight: 'bold',
  '> *': {
    fontSize: '24px !important',
    display: 'inline',
    marginRight: '2px',
  }
}));

export interface INotificationBanner {
  color: "success" | "warning" | "error" | "info",
  text: string,
  title: string,
  link: string,
  linkText: string,
}

export const NotificationBanner = ({color, text, title, link, linkText} : INotificationBanner) => {
  return <NotificationBannerWrapper color={color}>
    <NotificationBannerTitle color={color} variant='h3'>{title}</NotificationBannerTitle>
    <NotificationBannerText p={3}>
      <Typography variant="body1" mb={0}><strong>{text}<Link href={link} ml={1}>{linkText}</Link></strong></Typography>
    </NotificationBannerText>   
  </NotificationBannerWrapper>
}
