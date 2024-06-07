import React from "react";
import { Table, TableCell, TableRow } from "@mui/material";
import { StyledTableHeader, StyledTableHeaderCell, StyledTableBody, RelativeTableCell, CellStatusHighlight } from "../StyledTable";
import { FlightHighlight } from "./FlightFlaggerResults";
import { FlightArrival } from "./FlightFlagger";

export interface IFlightCard {
  flight: FlightArrival
}

export const getConfidenceAlert = (confidence: string | undefined) => {
  switch (confidence) {
    case 'trusted':
      return ['success', 'Trusted Carrier Data']
    case 'historic':
      return ['warning', 'Based on historical carrier data']
    case 'live':
      return ['info', 'Port live data']
    case 'averages':
      return ['error', 'Based on terminal averages']
    default:
      return ['', '']
  }
}

export interface IFlightFlaggerTable {
  flights: FlightArrival[]
}

export const FlightFlaggerTable = ({flights, ...others}: IFlightFlaggerTable) => {
  const hasHighlightedFlights = flights.some(flight => flight.highlights)

  return <div style={{display:'grid'}}><Table data-testid="flight-flagger-results-table" size="small" {...others}>
    <StyledTableHeader>
      <TableRow>
        <StyledTableHeaderCell>Flight</StyledTableHeaderCell>
        { hasHighlightedFlights && <StyledTableHeaderCell>Pax info</StyledTableHeaderCell> }
        <StyledTableHeaderCell align="center">Origin</StyledTableHeaderCell>
        <StyledTableHeaderCell align="center">Country</StyledTableHeaderCell>
        <StyledTableHeaderCell align="center">Gate/Stand</StyledTableHeaderCell>
        <StyledTableHeaderCell align="center">Status</StyledTableHeaderCell>
        <StyledTableHeaderCell align="center">Scheduled</StyledTableHeaderCell>
        <StyledTableHeaderCell align="center">Expected</StyledTableHeaderCell>
        <StyledTableHeaderCell align="center">Exp PCP</StyledTableHeaderCell>
        <StyledTableHeaderCell align="center">Exp PCP Pax</StyledTableHeaderCell>
        <StyledTableHeaderCell align="center">e-Gate</StyledTableHeaderCell>
        <StyledTableHeaderCell align="center">EEA</StyledTableHeaderCell>
        <StyledTableHeaderCell align="center">Non-EEA</StyledTableHeaderCell>
      </TableRow>
    </StyledTableHeader>
    <StyledTableBody>
      {
        flights.map((flight, index) => {
          const [pcpPaxAlertType] =  getConfidenceAlert(flight.expPcpPax.confidence)
          const [paxAlertType] =  getConfidenceAlert(flight.paxCounts.confidence)

          return <TableRow key={index}>
              <TableCell>
                { flight.highlights ? <FlightHighlight text={flight.flight} /> : flight.flight }
              </TableCell>
              { hasHighlightedFlights && <TableCell sx={{maxWidth: '200px'}}>{
                flight.highlights?.map((highlight, index) => <FlightHighlight key={index} text={highlight} /> )
              }</TableCell> }
              <TableCell align="center">{ flight.origin }</TableCell>
              <TableCell align="center">{ flight.country }</TableCell>
              <TableCell align="center">{ flight.gate || '/' }</TableCell>
              <TableCell align="center">{ flight.status || '/' }</TableCell>
              <TableCell align="center">{ flight.scheduled || '/' }</TableCell>
              <TableCell align="center">{ flight.expected || '/' }</TableCell>
              <TableCell align="center">{ flight.expPcp || '-' }</TableCell>
              <RelativeTableCell align="center">
                { flight.expPcpPax?.count || '-' }
                { flight.expPcpPax?.confidence && <CellStatusHighlight status={pcpPaxAlertType || ''} />}
              </RelativeTableCell>
              <RelativeTableCell align="center">
                { flight.paxCounts?.eGate || '-' }
                { flight.paxCounts?.confidence && <CellStatusHighlight status={paxAlertType || ''} />}
              </RelativeTableCell>
              <RelativeTableCell align="center">
                { flight.paxCounts?.eea || '-' }
                { flight.paxCounts?.confidence && <CellStatusHighlight status={paxAlertType || ''} />}
              </RelativeTableCell>
              <RelativeTableCell align="center">
                { flight.paxCounts?.nonEea || '/' }
                { flight.paxCounts?.confidence && <CellStatusHighlight status={paxAlertType || ''} />}
              </RelativeTableCell>
            </TableRow>
        })
      }
    </StyledTableBody>
  </Table></div>;
};
