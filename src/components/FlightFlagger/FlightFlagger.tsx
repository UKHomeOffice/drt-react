import React, {useState} from "react";
import {Country, FlightFlaggerFilters, FormState} from "./FlightFlaggerFilters";
import { FlightFlaggerResults } from "./FlightFlaggerResults";
import { SearchFilterPayload } from "./FlightFlaggerFilters";
import {CircularProgress} from "@mui/material";
import { FlightArrival } from "./FlightArrival";
import { sendAnalyticsEvent } from '../Util/analytics';


export interface IFlightFlagger {
  port: string,
  terminal: string,
  nationalities: Country[],
  ageGroups: string[],
  submitCallback: (payload:SearchFilterPayload) => void,
  flights: FlightArrival[],
  isLoading: boolean,
  maybeInitialFilterFormState?: FormState
}

const FlightFlagger = ({port,terminal,nationalities, ageGroups, submitCallback, flights, isLoading, maybeInitialFilterFormState}: IFlightFlagger) => {

  const [showHighlightOnly, setShowHighlightOnly] = useState<boolean>(false);

  const toggleHighlightDisplay = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowHighlightOnly(event.target.value  === 'true')
    sendAnalyticsEvent(
      port,
      terminal,
      'FlightFlagger',
      event.target.value === 'true' ? 'Highlighted flights only' : 'All flights'
    );
  }

  const onChangeInput = (searchTerm: string) => {}

  return <>
    <FlightFlaggerFilters
      port={port}
      terminal={terminal}
      nationalities={nationalities}
      ageGroups={ageGroups}
      onChangeInput={onChangeInput}
      submitCallback={submitCallback}
      clearFiltersCallback={()=> {
        sendAnalyticsEvent(
          port,
          terminal,
          'FlightFlagger',
          'Clear filters'
        );
      }}
      showAllCallback={toggleHighlightDisplay}
      maybeInitialState={maybeInitialFilterFormState}
    />
    { isLoading? <div style={{display: 'flex', justifyContent: 'center', padding: '50px'}}><CircularProgress data-testid="flight-flagger-loading-spinner" /></div> : <FlightFlaggerResults flights={flights} showHighlightOnly={showHighlightOnly} />}
  </>
}

export default FlightFlagger;
