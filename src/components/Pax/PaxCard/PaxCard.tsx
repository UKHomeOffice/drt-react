import { BorderBottom } from '@mui/icons-material';
import { Paper, styled, Theme, Typography, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import * as React from 'react';


export enum PaxTimeRange {
  Next5Mins = 'Next 5 Mins',
  Next5to10Mins = 'Next 5 to 10 Mins',
  Next10to15Mins = 'Next 10 to 15 Mins',
}

export type PortQueue = {
  queueName: string,
  queueCount: number
}

export interface IPaxCard {
  queues: PortQueue[],
  timeRange: PaxTimeRange,
  startTime: Date,
  endTime: Date,
}

const StyledPaxCard = styled(Paper)(({theme} : {theme: Theme}) => ({
  display: 'inline-block',
  padding: theme.spacing(2),
  backgroundColor: theme.palette.grey[100],
  '.MuiTableCell-root': {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.common.black,
    padding: `${theme.spacing(1)} ${theme.spacing(0)}`
  },
  '& .MuiTableRow-root :first-child': {
    paddingRight: theme.spacing(1)
  },
  '& .MuiTableCell-head': {
    borderBottom: `1px solid ${theme.palette.common.black}`,
  },
  '& .MuiTableBody-root .MuiTableCell-root': {
    borderBottom: 'none !important',
  }
}));

const formatTime = (datetime:Date) => {
  return `${datetime.getHours()}:${datetime.getMinutes()}`
}

export const PaxCard = ({queues, timeRange, startTime, endTime}: IPaxCard) => {

  
  return (
    <StyledPaxCard elevation={0}>
      <Typography variant='h5'>{timeRange}</Typography>
      <Typography variant='body1'>
        {`(${formatTime(startTime)} to ${formatTime(endTime)})`}
      </Typography>
      <Paper elevation={0} sx={{mt: 1, px: 1}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Estimated pax:</TableCell>
              <TableCell align='right'>{ queues.reduce((sum, q) => sum + q.queueCount, 0)}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              queues.map((queue) => {
                return (
                  <TableRow key={queue.queueName}>
                    <TableCell>{`${queue.queueName}:`}</TableCell>
                    <TableCell align='right'>{ queue.queueCount }</TableCell>
                  </TableRow>
                )
              })
            }
          </TableBody>
        </Table>
      </Paper>
    </StyledPaxCard>
  )
}
