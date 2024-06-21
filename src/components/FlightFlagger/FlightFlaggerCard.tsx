import React from "react";
import { Button, Box, Card, CardContent, Typography, Chip, Paper, BoxProps } from "@mui/material";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { StatusTag } from "../StatusTags";
import { styled } from '@mui/material/styles';
import { getConfidenceAlert } from "./FlightFlaggerTable";
import { FlightHighlight } from "./FlightFlaggerResults";
import { FlightArrival } from "./FlightArrival";

const PaxGrid = styled(Box)<BoxProps>(({ theme }) => ({
  alignItems: 'stretch',
  display: 'flex',
  width: '100%',
  '--Grid-borderWidth': '1px',
  borderTop: 'var(--Grid-borderWidth) solid',
  borderLeft: 'var(--Grid-borderWidth) solid',
  borderColor: theme.palette.grey[300],
  '& > div': {
    borderRight: 'var(--Grid-borderWidth) solid',
    borderBottom: 'var(--Grid-borderWidth) solid',
    borderColor: theme.palette.grey[300],
    flex: 1,
    padding: '10px',
    whiteSpace: 'nowrap'
  },
}));


const PaxAlert = styled(Box)<BoxProps>(({ theme }) => ({
  marginBottom: 1, 
  padding: theme.spacing(1),
  '--Grid-borderWidth': '1px',
  borderBottom: 'var(--Grid-borderWidth) solid',
  borderLeft: 'var(--Grid-borderWidth) solid',
  borderRight: 'var(--Grid-borderWidth) solid',
  borderColor: theme.palette.grey[300],
}));

export interface IFlightCard {
  flight: FlightArrival,
}
export const FlightCard = ({ flight }: IFlightCard) => {
  const [pcpPaxAlertType, pcpPaxAlertText] =  getConfidenceAlert(flight.expPcpPax.confidence)
  const [paxAlertType, paxAlertText] =  getConfidenceAlert(flight.paxCounts.confidence)
  const highlights = flight.highlights?.map((highlight, index) => <div key={index}><FlightHighlight text={highlight} /><br/></div>)

  return <Card sx={{mb: 2, borderWidth: '2px'}} square>
    <Box sx={{backgroundColor: '#f3f5f9', p:1}}>
      <Typography sx={{mb: 1}}><strong>{flight.flight}</strong>{` from ${flight.country} (${flight.origin})`}</Typography>
      <Chip label={`Expected at ${flight.expected || `n/a`}`} />
    </Box>
    <CardContent sx={{px: 1, pt: 1, pb: '10px !important'}}>
      { flight.highlights && <Paper elevation={0} variant="outlined" square sx={{p: 1, mb: 1}}>
        <Typography sx={{mb:1}}><strong>Highlighted pax info</strong></Typography>
        { highlights }
      </Paper>}
      <Paper elevation={0} variant="outlined" square sx={{p: 1, mb: 1}}>
        <Typography><strong>{`${flight.expPcpPax?.count} total pax`}</strong></Typography>
        <Typography>{`Exp. at PCP: ${flight.expPcp?.replace('-', 'to') }`}</Typography>
        { pcpPaxAlertType && <StatusTag type={pcpPaxAlertType} text={pcpPaxAlertText} /> }
      </Paper>
      <PaxGrid>
        <Box><Typography><strong>e-Gate</strong><br/>{ flight.paxCounts?.eGate || '-' }</Typography></Box>
        <Box><Typography><strong>EEA</strong><br/>{ flight.paxCounts?.eea || '-' }</Typography></Box>
        <Box><Typography><strong>Non-EEA</strong><br/>{ flight.paxCounts?.nonEea || '-' }</Typography></Box>
      </PaxGrid>

      { paxAlertType && <PaxAlert><StatusTag type={paxAlertType} text={paxAlertText} /></PaxAlert> }
      <Button
        href="/"
        startIcon={<ArrowRightIcon/>}
        sx={{textTransform: 'none', textAlign: 'left'}}
        onClick={(e) => e.preventDefault()}
      >
        Show additional pax and flight info
      </Button>
    </CardContent>
  </Card>
}
