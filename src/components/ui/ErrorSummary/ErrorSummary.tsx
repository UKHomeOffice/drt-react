import React from "react";
import { Box, styled } from '@mui/system';
import { Link, Typography } from "@mui/material";

const ErrorSummaryWrapper = styled(Box)(({theme}) => ({
  border: `${theme.spacing(1)} solid ${theme.palette.error.main}`,
  padding: theme.spacing(4),
  fontSize: '16px'
}));

const ErrorSummarylist = styled('ul')(({theme}) => ({
  listStyleType: 'none',
  margin: `0 0 ${theme.spacing(1)}`,
  padding: 0,
}));

const ErrorSummaryLink = styled(Link)(({theme}) => ({
  fontWeight: 'bold',
  color: theme.palette.error.main,
  textDecorationColor: theme.palette.error.main,
  '&:hover': {
    color: theme.palette.error.dark,
    textDecorationColor: theme.palette.error.dark,
  },
  '&:visited': {
    color: theme.palette.error.main,
    textDecorationColor: theme.palette.error.main,
  },
  '&:focus': {
    color: theme.palette.error.dark,
    textDecorationColor: theme.palette.error.dark,
  }
}));

export interface IError {
  text: string,
  target: string,
}

export interface IErrorSummary {
  errors: IError[]
}

export const ErrorSummary = ({errors} : IErrorSummary) => {
  return <ErrorSummaryWrapper>
    <Typography variant="h3" component={'h2'} mb={2}>There is a problem</Typography>
    <ErrorSummarylist>
     { errors.map((error, index) => <li key={index}><ErrorSummaryLink href={error.target}>{error.text}</ErrorSummaryLink></li>)}
    </ErrorSummarylist>
  </ErrorSummaryWrapper>
}
