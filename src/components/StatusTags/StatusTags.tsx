import React from "react";
import { Alert, AlertColor, AlertProps } from "@mui/material";
import { styled } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';
import ErrorIcon from '@mui/icons-material/Error';
import ReportIcon from '@mui/icons-material/Report';

const StyledAlert = styled(Alert)<AlertProps>(({ theme }) => ({
  fontWeight: 'bold',
  color: '#fff',
  '& .MuiSvgIcon-root': {
    color: '#fff',
    width: '0.9em',
    height: '0.9em',
  }
}));

export interface IStatusTag {
  type: string,
  text: string
}

export const StatusTag = ({type, text}: IStatusTag) => {
  let bgColor, icon; 
  let severity = 'success';
  switch (type) {
    case 'success':
      bgColor = '#547A00'
      severity = 'success'
      icon = <CheckCircleIcon />
      break;
    case 'warning':
      bgColor = '#C94900'
      severity = 'warning'
      icon = <ErrorIcon />
      break;
    case 'error':
      bgColor = '#99001E'
      severity = 'error'
      icon = <ReportIcon />
      break;
    case 'info':
    default:
      bgColor = '#404252'
      severity = 'info'
      icon = <InfoIcon />
      break;
  }
  return <StyledAlert sx={{backgroundColor: bgColor, py: 0 }} icon={icon} severity={severity as AlertColor}>{text}</StyledAlert>
}