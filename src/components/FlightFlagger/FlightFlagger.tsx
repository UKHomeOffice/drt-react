import React, {useState} from "react";
import {Country, FlightFlaggerFilters, FormState, IFlightFlaggerFilters} from "./FlightFlaggerFilters";
import { FlightFlaggerResults } from "./FlightFlaggerResults";
import { SearchFilterPayload } from "./FlightFlaggerFilters";
import {CircularProgress} from "@mui/material";
import { FlightArrival } from "./FlightArrival";
import {IAnalyticsEvent} from '../Util';


export interface IFlightFlagger extends IFlightFlaggerFilters {
  flights: FlightArrival[],
  isLoading: boolean,
  maybeInitialFilterFormState?: FormState
}

const FlightFlagger = ({terminal, nationalities, ageGroups, submitCallback, flights, isLoading, maybeInitialFilterFormState, sendEvent}: IFlightFlagger) => {

  const [showHighlightOnly, setShowHighlightOnly] = useState<boolean>(false);

  const toggleHighlightDisplay = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowHighlightOnly(event.target.value  === 'true')
    sendEvent({ category : terminal,
                action :'FlightFlagger',
                label : event.target.value === 'true' ? 'Highlighted flights only' : 'All flights'
              });
  }

  const onChangeInput = (searchTerm: string) => {}

  return <>
    <FlightFlaggerFilters
      terminal={terminal}
      nationalities={nationalities}
      ageGroups={ageGroups}
      onChangeInput={onChangeInput}
      submitCallback={submitCallback}
      clearFiltersCallback={()=> {
        sendEvent({category : terminal,
                   action : 'FlightFlagger',
                   label : 'Clear filters'});
      }
     }
      showAllCallback={toggleHighlightDisplay}
      maybeInitialState={maybeInitialFilterFormState}
      sendEvent={sendEvent}
    />
    { isLoading? <div style={{display: 'flex', justifyContent: 'center', padding: '50px'}}><CircularProgress data-testid="flight-flagger-loading-spinner" /></div> : <FlightFlaggerResults flights={flights} showHighlightOnly={showHighlightOnly} />}
  </>
}

export default FlightFlagger;
