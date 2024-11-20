import React from "react";
import { Alert, AlertColor, AlertProps } from "@mui/material";
import { styled, useTheme } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';
import ErrorIcon from '@mui/icons-material/Error';
import ReportIcon from '@mui/icons-material/Report';

const StyledAlert = styled(Alert)<AlertProps>(() => ({
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
  const theme = useTheme()
  let bgColor, icon; 
  let severity = 'success';
  switch (type) {
    case 'success':
      bgColor = theme.palette.success.main
      severity = 'success'
      icon = <CheckCircleIcon />
      break;
    case 'warning':
      bgColor = theme.palette.warning.main
      severity = 'warning'
      icon = <ErrorIcon />
      break;
    case 'error':
      bgColor = theme.palette.error.main
      severity = 'error'
      icon = <ReportIcon />
      break;
    case 'info':
    default:
      bgColor = theme.palette.info.main
      severity = 'info'
      icon = <InfoIcon />
      break;
  }
  return <StyledAlert sx={{backgroundColor: bgColor, py: 0 }} icon={icon} severity={severity as AlertColor}>{text}</StyledAlert>
}
