import React from "react";
import {render} from "../../TestProviderRenderer";
import {screen} from "@testing-library/dom";
import {fireEvent} from "@testing-library/react";
import FlightFlagger from "../FlightFlagger";
import ExampleFlights from "../ExampleFlights";
import '@testing-library/jest-dom'
import {IAnalyticsEvent} from "../../Util";

const nationalities = [
  {name: 'Great Britain', code: 'GBR'},
  {name: 'France', code: 'FRA'},
  {name: 'Spain', code: 'SPA'}
];
const ageGroups = ['0-9', '10-24', '24+'];
const sendEvent = (event: IAnalyticsEvent) => {
  console.log(event);
};
test("displays all flight results", async () => {
  render(<FlightFlagger
    flights={ExampleFlights}
    nationalities={nationalities}
    ageGroups={ageGroups}
    isLoading={false}
    submitCallback={() => {
    }}
    sendEvent={sendEvent}
    terminal={"T1"}  />);

  const tableRows = await screen.getByTestId('flight-flagger-results-table').querySelectorAll('tbody tr');
  expect(tableRows).toHaveLength(ExampleFlights.length);
})

test("hides and shows non-highlighted flights correctly", async () => {
  render(<FlightFlagger
    flights={ExampleFlights}
    nationalities={nationalities}
    ageGroups={ageGroups}
    isLoading={false}
    submitCallback={() => {
    }}
    sendEvent={sendEvent}
    maybeInitialFilterFormState={{
      showTransitPaxNumber: false,
      showNumberOfVisaNationals: true,
      requireAllSelected: true,
      flightNumber: '',
      selectedNationalities: [],
      selectedAgeGroups: [],
      showFilters: true,
    }}
    terminal={""}  />);

  fireEvent.click(screen.getByTestId('show-highlighted-only'));

  let tableRows = await screen.getByTestId('flight-flagger-results-table').querySelectorAll('tbody tr');
  expect(tableRows).toHaveLength(1);

  fireEvent.click(screen.getByTestId('show-all-flights'));

  tableRows = await screen.getByTestId('flight-flagger-results-table').querySelectorAll('tbody tr');
  expect(tableRows).toHaveLength(ExampleFlights.length);
})

test("displays the circular spinner and hides results when loading prop is true", async () => {
  render(<FlightFlagger
    flights={ExampleFlights}
    nationalities={nationalities}
    ageGroups={ageGroups}
    isLoading={true}
    submitCallback={() => {
    }}
    sendEvent={sendEvent}
    terminal={"T1"}  />);

  const table = await screen.queryByTestId('flight-flagger-results-table');
  const loadingSpinner = await screen.queryByTestId('flight-flagger-loading-spinner');
  expect(table).toBeNull();
  expect(loadingSpinner).toBeTruthy();
})

test("renders the mobile view on small devices", async () => {
  window.matchMedia = jest.fn().mockImplementation(query => ({
    matches: query !== '(max-width: 400px)',
    media: '',
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn()
  }));

  render(<FlightFlagger
    flights={ExampleFlights}
    nationalities={nationalities}
    ageGroups={ageGroups}
    isLoading={false}
    submitCallback={() => {

    }}
    sendEvent={sendEvent}
    terminal={""}  />);

  const desktopResults = await screen.queryByTestId('flight-flagger-desktop-results');
  const mobileResults = await screen.queryByTestId('flight-flagger-mobile-results');
  expect(desktopResults).toBeNull();
  expect(mobileResults).toBeTruthy();
})