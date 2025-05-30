import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import {Card, CardContent, Grid, Link, Stack, Table, TableBody, TableCell, TableFooter, TableHead, TableRow, Typography, Box, Tab, List, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

ChartJS.register(ArcElement, Tooltip, Legend);

export interface IPaxTerminalOverview {
  terminal: string,
  timeRange: number,
  desks: number,
  staff: number,
  flights: any[],
  chartData: ChartData<'doughnut'>,
  pressure: {
    pressure: '+' | '-',
    from: string
    to: string
  }[];
  estimates: {
    from: string
    to: string
    egate: number
    eea: number
    noneea: number
  }[],
  currentTime: string
}

export const PaxTerminalOverview = ({terminal ,timeRange,staff, desks, flights, chartData, pressure, estimates, currentTime}: IPaxTerminalOverview) => {
  const theme = useTheme();
  const is_mobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Stack direction={is_mobile ? 'column' : 'row'} spacing={2}>
      <Box>
        <Card variant='outlined' sx={{height: '100%', backgroundColor: '#82AA63'}}>
          <CardContent>
            <Typography component={'h4'} variant={'h5'} mb={2} sx={{color: 'white'}}>{flights.length} flights</Typography>
            <Table sx={{fontSize: '1.2em'}}>
              <TableHead>
                <TableRow>
                  <TableCell align='center' colSpan={2} sx={{backgroundColor: '#2E4C25', border: 'none', fontSize: '1.1em'}}><strong>{currentTime}</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align='center' sx={{backgroundColor: '#4A7E38', color: 'white', border: 'none', fontSize: '1.1em'}}><strong>Staff<br/>{staff}</strong></TableCell>
                  <TableCell align='center' sx={{backgroundColor: '#4A7E38', color: 'white', border: 'none', fontSize: '1.1em'}}><strong>Desks<br/>{desks}</strong></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Box>
      <Box>
        <Card variant='outlined'>
          <CardContent>
            <Stack direction={'row'} spacing={2} alignItems={'baseline'} mb={2}>
              <Typography component={'h4'} variant={'h5'}>Estimated pax at PCP</Typography>
              <Typography variant={'body1'}> {
                <Link href={`#terminal/${terminal}/current/arrivals/`}>View live arrivals</Link>
              }
              </Typography>
            </Stack>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Time</TableCell>
                  <TableCell align='right'>Total pax</TableCell>
                  <TableCell align='right'>e-gate</TableCell>
                  <TableCell align='right'>EEA</TableCell>
                  <TableCell align='right'>Non-EEA</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  estimates.map((estimate) => {
                    return (
                      <TableRow>
                        <TableCell><strong className='nowrap'>{estimate.from} to {estimate.to}</strong></TableCell>
                        <TableCell className='nowrap' align='right'>{estimate.egate + estimate.eea + estimate.noneea}</TableCell>
                        <TableCell className='nowrap' align='right'>{estimate.egate}</TableCell>
                        <TableCell className='nowrap' align='right'>{estimate.eea}</TableCell>
                        <TableCell className='nowrap' align='right'>{estimate.noneea}</TableCell>
                      </TableRow>
                    )
                  })
                }
              </TableBody>
              <TableFooter>
                <TableCell><strong className='nowrap'>{3 * timeRange} minutes total</strong></TableCell>
                <TableCell align='right'><strong>{estimates.reduce((total, estimate) => total + estimate.egate + estimate.eea + estimate.noneea, 0 )}</strong></TableCell>
                <TableCell align='right'><strong>{estimates.reduce((total, estimate) => total + estimate.egate, 0 )}</strong></TableCell>
                <TableCell align='right'><strong>{estimates.reduce((total, estimate) => total + estimate.eea, 0 )}</strong></TableCell>
                <TableCell align='right'><strong>{estimates.reduce((total, estimate) => total + estimate.noneea, 0 )}</strong></TableCell>
              </TableFooter>
            </Table>
          </CardContent>
        </Card>
      </Box>
      <Box flexGrow={1}>
        <Card variant='outlined' sx={{height:'100%'}}>
          <CardContent>
            <Stack direction={'column'} mb={2}>
              <Typography component={'h4'} variant={'h5'}>Pax splits</Typography>
              {/*<Typography variant={'body1'}>Pax splits</Typography>*/}
            </Stack>
            <div>
            <Doughnut
              style={{maxHeight: is_mobile ? 'auto' : '180px', maxWidth: '100%'}} 
              data={chartData} 
              options={{
                maintainAspectRatio: true,
                plugins: {
                  legend: {
                    position: is_mobile ? 'bottom' : 'right',
                    maxWidth: 500,
                    labels: {
                      generateLabels: (chart) => {
                        const datasets = chart.data.datasets;
                        return datasets[0].data.map((data, i) => ({
                          text: `${chart.data.labels![i]} ${data}`,
                          fillStyle: datasets[0].backgroundColor![i],
                          index: i
                        }))
                      }
                    }
                  }
                }
            }} />
            </div>
          </CardContent>
        </Card>
      </Box>
      <Box>
        <Card variant='outlined' sx={{height:'100%'}}>
          <CardContent>
            <Stack direction={'column'}>
              <Typography component={'h4'} variant={'h5'}>PCP Pressure</Typography>
            </Stack>
            <List disablePadding>
              { pressure.map(item => {
                return (
                  <ListItem disableGutters disablePadding>
                    <ListItemIcon sx={{minWidth: '30px'}}>
                      {item.pressure === '+' ?
                        <KeyboardArrowUpIcon sx={{ fill: 'black' }} /> : <KeyboardArrowDownIcon sx={{ fill: 'black' }} />
                      }
                    </ListItemIcon>
                    <ListItemText>{item.from} to {item.to}</ListItemText>
                  </ListItem>
                )
              })}
            </List>
          </CardContent>
        </Card>
      </Box>
    </Stack>
  );
};

