import React from "react";
import { render } from "../../TestProviderRenderer";
import { screen } from "@testing-library/dom";
import { fireEvent } from "@testing-library/react";
import FlightFlagger from "../FlightFlagger";
import ExampleFlights from "../ExampleFlights";
import { waitFor, within } from "@testing-library/react";
import '@testing-library/jest-dom'
import { SearchFilterPayload } from "../FlightFlaggerFilters";


const nationalities = ['GBR','FRA','SPA'];
const ageGroups = ['0-9','10-24','24+'];

describe("Flight Flagger", () => {
  test("displays all flight results", async () => {
  
    render(<FlightFlagger 
            flights={ExampleFlights} 
            nationalities={nationalities} 
            ageGroups={ageGroups} 
            isLoading={false} 
            submitCallback={(payload: SearchFilterPayload)=> console.log(payload)} />);

    const tableRows = await screen.getByTestId('flight-flagger-results-table').querySelectorAll('tbody tr');
    expect(tableRows).toHaveLength(ExampleFlights.length)
  })

  test("hides and shows non-highlighted flights correctly", async () => {
    render(<FlightFlagger 
      flights={ExampleFlights} 
      nationalities={nationalities} 
      ageGroups={ageGroups} 
      isLoading={false} 
      submitCallback={(payload: SearchFilterPayload)=> console.log(payload)} />);

    fireEvent.click(screen.getByTestId('show-highlighted-only'));

    let tableRows = await screen.getByTestId('flight-flagger-results-table').querySelectorAll('tbody tr');
    expect(tableRows).toHaveLength(1)

    fireEvent.click(screen.getByTestId('show-all-flights'));

    tableRows = await screen.getByTestId('flight-flagger-results-table').querySelectorAll('tbody tr');
    expect(tableRows).toHaveLength(ExampleFlights.length)
  })

  test("displays the circular spinner and hides results when loading prop is true", async () => {
    
    render(<FlightFlagger 
      flights={ExampleFlights} 
      nationalities={nationalities} 
      ageGroups={ageGroups} 
      isLoading={true} 
      submitCallback={(payload: SearchFilterPayload)=> console.log(payload)} />);

    const table = await screen.queryByTestId('flight-flagger-results-table')
    const loadingSpinner = await screen.queryByTestId('flight-flagger-loading-spinner')
    expect(table).toBeNull()
    expect(loadingSpinner).toBeTruthy()
  })

  test("hides and shows the search filters", async () => {
    render(<FlightFlagger 
      flights={ExampleFlights} 
      nationalities={nationalities} 
      ageGroups={ageGroups} 
      isLoading={false} 
      submitCallback={(payload: SearchFilterPayload)=> console.log(payload) } />);

    let filters = await screen.queryByTestId('flight-flagger-filters')
    await waitFor(() => {
      expect(filters).toHaveStyle(`height: 0px`)
    });

    await fireEvent.click(screen.getByTestId('show-filters'));
    filters = await screen.queryByTestId('flight-flagger-filters')
    await waitFor(() => {
      expect(filters).toHaveStyle(`height: auto`)
    });

    fireEvent.click(screen.getByTestId('show-filters'));
    filters = await screen.queryByTestId('flight-flagger-filters')
    await waitFor(() => {
      expect(filters).toHaveStyle(`height: 0px`)
    });
  })

  test("calls the submitCallback with the correct filters", async () => {

    const callBack = jest.fn();

    const expectedPayload = {
      selectedNationalities: ['GBR'],
      selectedAgeGroups: ['0-9'],
      showTransitPaxNumber: true,
      showNumberOfVisaNationals: true,
      requireAllSelected: true,
      flightNumber: 'BA1234'
    }

    render(<FlightFlagger 
      flights={ExampleFlights} 
      nationalities={nationalities} 
      ageGroups={ageGroups} 
      isLoading={false} 
      submitCallback={callBack} />);

    await fireEvent.click(screen.getByTestId('show-filters'));
    const filters = await screen.queryByTestId('flight-flagger-filters')
    await waitFor(() => {
      expect(filters).toHaveStyle(`height: auto`)
    });

    const flightNumber = screen.getByLabelText('Enter flight details')
    fireEvent.change(flightNumber, {target: {value: 'BA1234'}})

    const nationalitiesAutocomplete = screen.getByTestId('nationalities-autocomplete');
    const nationalitiesInput = within(nationalitiesAutocomplete).getByRole('combobox')
    nationalitiesAutocomplete.focus()

    fireEvent.change(nationalitiesInput, { target: { value: 'G' } })
    fireEvent.keyDown(nationalitiesAutocomplete, { key: 'ArrowDown' })
    fireEvent.keyDown(nationalitiesAutocomplete, { key: 'Enter' })

    const ageAutocomplete = screen.getByTestId('age-autocomplete');
    const ageInput = within(ageAutocomplete).getByRole('combobox')
    ageAutocomplete.focus()

    fireEvent.change(ageInput, { target: { value: 'G' } })
    fireEvent.keyDown(ageAutocomplete, { key: 'ArrowDown' })
    fireEvent.keyDown(ageAutocomplete, { key: 'Enter' })

    await fireEvent.click(screen.getByTestId('show-transit-pax-check'));
    await fireEvent.click(screen.getByTestId('show-visa-nationals-check'));
    await fireEvent.click(screen.getByTestId('require-all-selected-check'));

    fireEvent.click(screen.getByTestId('flight-flagger-filter-submit'));
    expect(callBack).toHaveBeenCalledWith(expectedPayload)
  })

  test("calls the submitCallback when the user hits enter on the flight number input", async () => {

    const callBack = jest.fn();

    const expectedPayload = {
      selectedNationalities: [],
      selectedAgeGroups: [],
      showTransitPaxNumber: false,
      showNumberOfVisaNationals: false,
      requireAllSelected: false,
      flightNumber: 'BA1234'
    }

    render(<FlightFlagger 
      flights={ExampleFlights} 
      nationalities={nationalities} 
      ageGroups={ageGroups} 
      isLoading={false} 
      submitCallback={callBack} />);

    await fireEvent.click(screen.getByTestId('show-filters'));
    const filters = await screen.queryByTestId('flight-flagger-filters')
    await waitFor(() => {
      expect(filters).toHaveStyle(`height: auto`)
    });

    const flightNumber = screen.getByLabelText('Enter flight details')
    fireEvent.change(flightNumber, {target: {value: 'BA1234'}})
    fireEvent.keyDown(flightNumber, { key: 'Enter' })
  
    expect(callBack).toHaveBeenCalledWith(expectedPayload)
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
      submitCallback={(payload: SearchFilterPayload)=> console.log(payload)} />);

    const desktopResults = await screen.queryByTestId('flight-flagger-desktop-results')
    const mobileResults = await screen.queryByTestId('flight-flagger-mobile-results')
    expect(desktopResults).toBeNull()
    expect(mobileResults).toBeTruthy()
  })
});
