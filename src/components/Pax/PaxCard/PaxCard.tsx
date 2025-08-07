import {Table, TableHead, TableRow, TableCell, TableBody, Card, CardContent, CardHeader} from '@mui/material';
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


const formatTime = (datetime: Date) => {
  const hours = datetime.getHours().toString().padStart(2, '0');
  const minutes = datetime.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

export const PaxCard = ({queues, timeRange, startTime, endTime}: IPaxCard) => {


  return (
    <Card elevation={0}>
      <CardHeader title={timeRange} titleTypographyProps={{variant: 'h4'}} subheader={`(${formatTime(startTime)} to ${formatTime(endTime)})`} />
      <CardContent>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{pr: 4}}>Estimated pax:</TableCell>
              <TableCell align='right'>{queues.reduce((sum, q) => sum + q.queueCount, 0)}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              queues.map((queue) => {
                return (
                  <TableRow key={queue.queueName}>
                    <TableCell>{`${queue.queueName}:`}</TableCell>
                    <TableCell align='right'>{queue.queueCount}</TableCell>
                  </TableRow>
                )
              })
            }
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
