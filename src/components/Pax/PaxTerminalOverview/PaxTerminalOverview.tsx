import React from 'react';
import {Card, CardContent, Grid, Link, Stack, Table, TableBody, TableCell, TableFooter, TableHead, TableRow, Typography, Box, Tab, List, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

ChartJS.register(ArcElement, Tooltip, Legend);

export interface IPaxTerminalOverview {}

export const PaxTerminalOverview = ({}: IPaxTerminalOverview) => {
  return (
    <Grid container spacing={2}>
      <Grid item sm={12}>
        <Typography component={'h3'} variant={'h3'}>Terminal 2</Typography>
      </Grid>
      <Grid item sm={2}>
        <Card variant='outlined' sx={{height: '100%', backgroundColor: '#82AA63'}}>
          <CardContent>
            <Typography component={'h4'} variant={'h5'} mb={2} sx={{color: 'white'}}>39 flights</Typography>
            <Table sx={{fontSize: '1.2em'}}>
              <TableHead>
                <TableRow>
                  <TableCell align='center' colSpan={2} sx={{backgroundColor: '#2E4C25', border: 'none', fontSize: '1.1em'}}><strong>17:15</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align='center' sx={{backgroundColor: '#4A7E38', color: 'white', border: 'none', fontSize: '1.1em'}}><strong>Staff<br/>17</strong></TableCell>
                  <TableCell align='center' sx={{backgroundColor: '#4A7E38', color: 'white', border: 'none', fontSize: '1.1em'}}><strong>Desks<br/>14</strong></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Grid>
      <Grid item sm={4} sx={{height:'100%'}}>
        <Card variant='outlined'>
          <CardContent>
            <Stack direction={'row'} spacing={2} alignItems={'baseline'} mb={2}>
              <Typography component={'h4'} variant={'h5'}>Estimated pax at PCP</Typography>
              <Typography variant={'body1'}><Link>View live arrivals</Link></Typography>
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
                <TableRow>
                  <TableCell><strong>13:15 to 14:15</strong></TableCell>
                  <TableCell align='right'>1,183</TableCell>
                  <TableCell align='right'>725</TableCell>
                  <TableCell align='right'>725</TableCell>
                  <TableCell align='right'>725</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>14:15 to 15:15</strong></TableCell>
                  <TableCell align='right'>1,183</TableCell>
                  <TableCell align='right'>725</TableCell>
                  <TableCell align='right'>725</TableCell>
                  <TableCell align='right'>725</TableCell>
                </TableRow>
                <TableRow>
                <TableCell><strong>15:15 to 16:15</strong></TableCell>
                  <TableCell align='right'>1,183</TableCell>
                  <TableCell align='right'>725</TableCell>
                  <TableCell align='right'>725</TableCell>
                  <TableCell align='right'>725</TableCell>
                </TableRow>
              </TableBody>
              <TableFooter>
                <TableCell><strong>3 hour total</strong></TableCell>
                <TableCell align='right'><strong>1,183</strong></TableCell>
                <TableCell align='right'><strong>725</strong></TableCell>
                <TableCell align='right'><strong>725</strong></TableCell>
                <TableCell align='right'><strong>725</strong></TableCell>
              </TableFooter>
            </Table>
          </CardContent>
        </Card>
      </Grid>
      <Grid item sm={4}>
        <Card variant='outlined' sx={{height:'100%'}}>
          <CardContent>
            <Stack direction={'column'} mb={2}>
              <Typography component={'h4'} variant={'h5'}>Pax splits</Typography>
              <Typography variant={'body1'}>Pax splits</Typography>
            </Stack>
            <Doughnut
              style={{maxHeight: '150px'}} 
              data={{
                labels: ['EEA', 'e-Gate', 'Non-EEA: Visa National', 'Non-EEA: Non-Visa National'],
                datasets:[
                  { 
                    data: [50, 25, 15, 10],
                    backgroundColor: ["#0E2560", "#334F96", "#CD5B82", "#547A00"],
                  }
                ]
              }} options={{
                plugins: {
                  legend: {
                    position: 'right',
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
          </CardContent>
        </Card>
      </Grid>
      <Grid item sm={2}>
        <Card variant='outlined' sx={{height:'100%'}}>
          <CardContent>
            <Stack direction={'column'}>
              <Typography component={'h4'} variant={'h5'}>PCP Pressure</Typography>
            </Stack>
            <List disablePadding>
              <ListItem disableGutters>
                <ListItemIcon>
                  <KeyboardArrowUpIcon />
                </ListItemIcon>
                <ListItemText>13:30 to 13:45</ListItemText>
              </ListItem>
              <ListItem disableGutters>
                <ListItemIcon>
                  <KeyboardArrowDownIcon />
                </ListItemIcon>
                <ListItemText>14:15 to 14:30</ListItemText>
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

