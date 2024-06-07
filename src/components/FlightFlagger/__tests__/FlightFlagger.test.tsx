import React from "react";
import { render } from "../../TestProviderRenderer";
import { screen, fireEvent } from "@testing-library/react";
import FlightFlagger from "../FlightFlagger";
import ExampleFlights from "../ExampleFlights";

const nationalities = ['GBR','FRA','SPA'];
const ageGroups = ['0-9','10-24','24+'];

describe("Flight Flagger", () => {
  test("displays all flights results", async () => {
  
    render(<FlightFlagger 
            flights={ExampleFlights} 
            nationalities={nationalities} 
            ageGroups={ageGroups} 
            isLoading={false} 
            submitCallback={()=>{}} />);

    const tableRows = await screen.getByTestId('flight-flagger-results-table').querySelectorAll('tbody tr');
    expect(tableRows).toHaveLength(ExampleFlights.length)
  })

  test("displays the circular spinner and hides results when loading prop is true", async () => {
    
    render(<FlightFlagger 
      flights={ExampleFlights} 
      nationalities={nationalities} 
      ageGroups={ageGroups} 
      isLoading={true} 
      submitCallback={()=>{}} />);

    const table = await screen.queryByTestId('flight-flagger-results-table')
    const loadingSpinner = await screen.queryByTestId('flight-flagger-loading-spinner')
    expect(table).toBeNull()
    expect(loadingSpinner).toBeTruthy()
  })

  test("hides and shows non-highlighted flights correctly", async () => {
    render(<FlightFlagger 
      flights={ExampleFlights} 
      nationalities={nationalities} 
      ageGroups={ageGroups} 
      isLoading={false} 
      submitCallback={()=>{}} />);

    fireEvent.click(screen.getByTestId('show-highlighted-only'));

    let tableRows = await screen.getByTestId('flight-flagger-results-table').querySelectorAll('tbody tr');
    expect(tableRows).toHaveLength(1)

    fireEvent.click(screen.getByTestId('show-all-flights'));

    tableRows = await screen.getByTestId('flight-flagger-results-table').querySelectorAll('tbody tr');
    expect(tableRows).toHaveLength(ExampleFlights.length)
  })
});