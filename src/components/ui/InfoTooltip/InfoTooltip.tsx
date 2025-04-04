import React from "react";
import { Tooltip, TooltipProps, IconButton } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import { styled, Theme } from '@mui/material/styles';


const StyledTooltip = styled(Tooltip)<TooltipProps>(({theme}) => ({
  color: 'inherit',
  '& > svg': {
    fontSize: '1em',
    width: '0.9em',
    height: '0.9em',
  }
}));

export interface IInfoTooltip {
  text: string
}


export const InfoTooltip = ({ text } : IInfoTooltip) => {
  return (
    <StyledTooltip title={text}>
      <IconButton color="primary">
        <InfoIcon />
      </IconButton>
    </StyledTooltip>
  )
}
