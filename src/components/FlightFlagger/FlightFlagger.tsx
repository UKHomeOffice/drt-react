import React, {useState} from "react";
import { FlightFlaggerFilters } from "./FlightFlaggerFilters";
import {FlightFlaggerResults} from "./FlightFlaggerResults";
import { SearchFilterPayload } from "./FlightFlaggerFilters";
import {CircularProgress} from "@mui/material";


export type FlightArrival = { 
  highlights?: string[],
  flight: string,
  origin: string,
  country: string,
  gate: string | null,
  status: string | null,
  scheduled: string | null,
  expected: string | null,
  expPcp: string | null,
  expPcpPax: {
    confidence?: string
    count?: number | null
  },
  paxCounts: {
    confidence?: string
    eGate?: number | null,
    eea?: number | null,
    nonEea?: number | null,
  }
}


export interface IFlightFlagger {
  nationalities: string[],
  ageGroups: string[],
  submitCallback: (payload:SearchFilterPayload) => void,
  flights: FlightArrival[],
  isLoading: boolean
}

const FlightFlagger = ({nationalities, ageGroups, submitCallback, flights, isLoading}: IFlightFlagger) => {

  const [showHighlightOnly, setShowHighlightOnly] = useState<boolean>(false);

  const toggleHighlightDisplay = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowHighlightOnly(event.target.value  === 'true')
  }

  return <>
    <FlightFlaggerFilters nationalities={nationalities} ageGroups={ageGroups} submitCallback={submitCallback} toggleHighlightDisplay={toggleHighlightDisplay} />
    { isLoading? <div style={{display: 'flex', justifyContent: 'center', padding: '50px'}}><CircularProgress data-testid="flight-flagger-loading-spinner" /></div> : <FlightFlaggerResults flights={flights} showHighlightOnly={showHighlightOnly} />}
  </>
}

export default FlightFlagger;