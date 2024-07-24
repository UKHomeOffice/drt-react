import React, {useState} from "react";
import { FlightFlaggerFilters } from "./FlightFlaggerFilters";
import { FlightFlaggerResults } from "./FlightFlaggerResults";
import { SearchFilterPayload } from "./FlightFlaggerFilters";
import {CircularProgress} from "@mui/material";
import { FlightArrival } from "./FlightArrival";


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

  const onChangeInput = (searchTerm: string) => {}

  return <>
    <FlightFlaggerFilters 
      nationalities={nationalities} 
      ageGroups={ageGroups} 
      onChangeInput={onChangeInput}
      submitCallback={submitCallback} 
      clearFiltersCallback={()=>{}}
      showAllCallback={toggleHighlightDisplay} />
    { isLoading? <div style={{display: 'flex', justifyContent: 'center', padding: '50px'}}><CircularProgress data-testid="flight-flagger-loading-spinner" /></div> : <FlightFlaggerResults flights={flights} showHighlightOnly={showHighlightOnly} />}
  </>
}

export default FlightFlagger;
