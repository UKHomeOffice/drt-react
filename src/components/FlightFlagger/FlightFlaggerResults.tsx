import React from "react";
import { Box, Typography, Theme, Chip  } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import { FlightCard } from "./FlightFlaggerCard";
import { FlightFlaggerTable } from "./FlightFlaggerTable";
import TungstenIcon from '@mui/icons-material/Tungsten';
import { FlightArrival } from "./FlightArrival";

export interface IFlightHighlight {
  text: string
}

export const FlightHighlight = ({text}: IFlightHighlight) => {
  return <Chip
          label={ text }
          icon={<TungstenIcon/>}
          sx={{
            backgroundColor: '#C2D9FF',
            fontWeight: 'bold',
            color: '#111224',
            margin: '2px 2px 2px 0px',
            borderRadius: 0,
          }} />

}


export interface IFlightFlaggerResults {
  flights: FlightArrival[],
  showHighlightOnly: boolean,
}

export const FlightFlaggerResults = ({flights, showHighlightOnly}: IFlightFlaggerResults) => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const highlightCount = flights.filter((flight) => flight.highlights).length
  const resultCount = <Typography sx={{mb:2}}>
    Flights displayed: <strong>{flights.length}</strong> 
    {highlightCount > 0 && <strong>{` (${highlightCount} highlighted)`}</strong>}
  </Typography>
  if (showHighlightOnly) {
    flights = flights.filter(flight => flight.highlights)
  }
  return isMobile ? 
    <Box data-testid="flight-flagger-mobile-results" sx={{backgroundColor: '#E6E9F1', p: 2}}>
      {resultCount}
      { flights.map((flight: FlightArrival, index: number) => {
        return <FlightCard key={index} flight={flight} />
      })}
    </Box>
    :
    <Box data-testid="flight-flagger-desktop-results" sx={{mt:2}}>
      {resultCount}
      <FlightFlaggerTable flights={flights} />
    </Box>
    
}
