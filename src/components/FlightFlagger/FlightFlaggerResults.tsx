import React from "react";
import { Box, Typography, Theme, Chip  } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import { FlightCard } from "./FlightFlaggerCard";
import { FlightFlaggerTable } from "./FlightFlaggerTable";
import { FlightArrival } from "./FlightArrival";

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
    <Box data-testid="flight-flagger-mobile-results" sx={(theme) => ({backgroundColor: theme.palette.secondary.light, p: 2})}>
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
