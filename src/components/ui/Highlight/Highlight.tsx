import React from "react";
import { bgcolor, Box, styled, Theme } from '@mui/system';
import { PaletteColor, useTheme } from '@mui/material/styles';
import { Tooltip, Typography } from "@mui/material";

const HighlightWrapper = styled(Typography)(({color, bgColor} : {color: string, bgColor: string}) => ({
  paddingTop: 2,
  paddingBottom: 2,
  paddingLeft: 4,
  paddingRight: 4,
  display: 'inline-block',
  backgroundColor: bgColor,
  cursor: 'pointer',
  '> span:after': {
    content: '""',
    display: 'block',
    height: '4px',
    width: '100%',
    borderTop: `1px dotted ${color}`
  }
}));

export interface IHighlight {
  color: string,
  text: string,
  tooltipText: string,
}

export const Highlight = ({color, text, tooltipText} : IHighlight) => {
  const theme: Theme = useTheme()
  const bgColor = theme.palette[color].light;
  const textColor = theme.palette[color].dark;

  return <Tooltip title={tooltipText}><HighlightWrapper variant="body1" color={textColor} bgColor={bgColor}><span>{ text }</span></HighlightWrapper></Tooltip>
}
