import React from "react";
import { Table, TableCell, TableHead, TableRow, Tooltip, TooltipProps, IconButton, TableBody } from "@mui/material";
import { StyledTableHeader, StyledTableHeaderCell, StyledTableBody, RelativeTableCell, CellStatusHighlight } from "../ui/StyledTable";
import { FlightHighlightChip } from "./FlightFlaggerHighlightChip";
import { FlightArrival } from "./FlightArrival";
import InfoIcon from '@mui/icons-material/Info';
import { styled } from '@mui/material/styles';
import {InfoTooltip} from "../ui/InfoTooltip/InfoTooltip";

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
const StyledTooltip = styled(Tooltip)<TooltipProps>(() => ({
  color: '#fff',
  '& > svg': {
    fontSize: '1em',
    width: '0.9em',
    height: '0.9em'
    }
}));

export interface IFlightFlaggerTable {
  flights: FlightArrival[]
}

export const FlightFlaggerTable = ({flights, ...others}: IFlightFlaggerTable) => {
  const hasHighlightedFlights = flights.some(flight => flight.highlights)

  return <div><Table data-testid="flight-flagger-results-table" size="small" {...others}>
    <TableHead>
      <TableRow>
        <TableCell>Flight</TableCell>
        { hasHighlightedFlights && <TableCell>Pax info</TableCell> }
        <TableCell align="center">Origin</TableCell>
        <TableCell align="center">
          Country
          <InfoTooltip text="Country of origin" />
        </TableCell>
        <TableCell align="center">Gate/Stand</TableCell>
        <TableCell align="center">Status</TableCell>
        <TableCell align="center">Scheduled</TableCell>
        <TableCell align="center">
          Expected
          <InfoTooltip text="Expected arrival" />
        </TableCell>
        <TableCell align="center">Exp PCP</TableCell>
        <TableCell align="center">Exp PCP Pax</TableCell>
        <TableCell align="center">
          e-Gate
          <StyledTooltip title="Expeced e-Gate pax">
            <IconButton>
              <InfoIcon />
            </IconButton>
          </StyledTooltip>
        </TableCell>
        <TableCell align="center">
          EEA
          <StyledTooltip title="Expected EEA pax">
            <IconButton>
              <InfoIcon />
            </IconButton>
          </StyledTooltip>
        </TableCell>
        <TableCell align="center">
          Non-EEA
          <StyledTooltip title="Expected Non-EEA pax">
            <IconButton>
              <InfoIcon />
            </IconButton>
          </StyledTooltip>
        </TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {
        flights.map((flight, index) => {
          const [pcpPaxAlertType] =  getConfidenceAlert(flight.expPcpPax.confidence)
          const [paxAlertType] =  getConfidenceAlert(flight.paxCounts.confidence)

          return <TableRow key={index}>
              <TableCell>
                { flight.highlights ? <FlightHighlightChip text={flight.flight} /> : flight.flight }
              </TableCell>
              { hasHighlightedFlights && <TableCell sx={{maxWidth: '200px'}}>{
                flight.highlights?.map((highlight, index) => <FlightHighlightChip key={index} text={highlight} /> )
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
    </TableBody>
  </Table></div>;
};
