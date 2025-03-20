import React from "react"
import {render} from "../../TestProviderRenderer"
import {screen} from "@testing-library/dom"
import {fireEvent, waitFor, within} from "@testing-library/react"
import '@testing-library/jest-dom'
import {FlightFlaggerFilters} from "../FlightFlaggerFilters"

const nationalities = [
  {name: 'Great Britain', code: 'GBR'},
  {name: 'France', code: 'FRA'},
  {name: 'Spain', code: 'SPA'}
]
const ageGroups = ['0-9', '10-24', '24+']

const initialFormStateWithSomeFilter = {
  showTransitPaxNumber: false,
  showNumberOfVisaNationals: true,
  requireAllSelected: false,
  flightNumber: '',
  selectedNationalities: [],
  selectedAgeGroups: [],
  showFilters: false,
}
const sendEvent = jest.fn();

test("does not display option to hide or show flights before any criteria are applied", async () => {
  render(<FlightFlaggerFilters
    terminal={"T1"}
    nationalities={nationalities}
    ageGroups={ageGroups}
    submitCallback={() => {}}
    showAllCallback={() => {}}
    onChangeInput={() => {}}
    clearFiltersCallback={() => {}}
    maybeInitialState={undefined}
    sendEvent={sendEvent}
  />)

  const highlightedOnlyButton = screen.queryByTestId('show-highlighted-only')

  expect(highlightedOnlyButton).toBeNull()
})

test("apply button is only enabled when there are changes to apply", async () => {
  const callBack = jest.fn()

  render(<FlightFlaggerFilters
    terminal={"T1"}
    nationalities={nationalities}
    ageGroups={ageGroups}
    submitCallback={callBack}
    showAllCallback={() => {}}
    onChangeInput={() => {}}
    clearFiltersCallback={() => {}}
    maybeInitialState={{...initialFormStateWithSomeFilter, showFilters: true}}
    sendEvent={sendEvent}
  />)

  const applyButton = screen.queryByTestId('flight-flagger-filter-submit')

  expect(applyButton).toBeDisabled()

  const nationalitiesAutocomplete = screen.getByTestId('nationalities-autocomplete')
  const nationalitiesInput = within(nationalitiesAutocomplete).getByRole('combobox')
  fireEvent.change(nationalitiesInput, {target: {value: 'G'}})
  fireEvent.keyDown(nationalitiesAutocomplete, {key: 'ArrowDown'})
  fireEvent.keyDown(nationalitiesAutocomplete, {key: 'Enter'})

  expect(applyButton).not.toBeDisabled()

  fireEvent.click(screen.getByTestId('flight-flagger-filter-submit'))

  expect(callBack).toHaveBeenCalled()

  expect(applyButton).toBeDisabled()
})

test("cancel button removes any un-applied changes to the form", async () => {
  render(<FlightFlaggerFilters
    terminal={"T1"}
    nationalities={nationalities}
    ageGroups={ageGroups}
    submitCallback={() => {}}
    showAllCallback={() => {}}
    onChangeInput={() => {}}
    clearFiltersCallback={() => {}}
    sendEvent={sendEvent}
  />)

  fireEvent.click(screen.getByTestId('show-filters'))

  const showVisaNationals = screen.getByLabelText('show visa nationals')
  fireEvent.click(showVisaNationals)
  expect(showVisaNationals).toBeChecked()

  await fireEvent.click(screen.getByTestId('flight-flagger-filter-cancel'))

  fireEvent.click(screen.getByTestId('show-filters'))

  expect(showVisaNationals).not.toHaveAttribute('checked')

  const applyButtonAfterApply = screen.queryByTestId('flight-flagger-filter-submit')
  expect(applyButtonAfterApply).toBeDisabled()
})

test("does display option to hide or show flights when some criteria are applied", async () => {
  render(<FlightFlaggerFilters
    terminal={"T1"}
    nationalities={nationalities}
    ageGroups={ageGroups}
    submitCallback={() => {}}
    showAllCallback={() => {}}
    onChangeInput={() => {}}
    clearFiltersCallback={() => {}}
    maybeInitialState={initialFormStateWithSomeFilter}
    sendEvent={sendEvent}
  />)

  const highlightedOnlyButton = screen.queryByTestId('show-highlighted-only')

  expect(highlightedOnlyButton).not.toBeNull()
})

test("hides and shows the search filters", async () => {
  render(<FlightFlaggerFilters
    terminal={"T1"}
    nationalities={nationalities}
    ageGroups={ageGroups}
    submitCallback={() => {}}
    showAllCallback={() => {}}
    onChangeInput={() => {}}
    clearFiltersCallback={() => {}}
    sendEvent={sendEvent}
  />)

  let filters = await screen.queryByTestId('flight-flagger-filters')
  await waitFor(() => {
    expect(filters).toHaveStyle(`height: 0px`)
  })

  await fireEvent.click(screen.getByTestId('show-filters'))
  filters = await screen.queryByTestId('flight-flagger-filters')
  await waitFor(() => {
    expect(filters).toHaveStyle(`height: auto`)
  })

  fireEvent.click(screen.getByTestId('show-filters'))
  filters = await screen.queryByTestId('flight-flagger-filters')
  await waitFor(() => {
    expect(filters).toHaveStyle(`height: 0px`)
  })
})

test("calls the submitCallback with the correct filters", async () => {
  const callBack = jest.fn()

  const expectedPayload = {
    selectedNationalities: [{
      code: 'GBR',
      name: 'Great Britain'
    }],
    selectedAgeGroups: ['0-9'],
    showTransitPaxNumber: false,
    showFilters: false,
    showNumberOfVisaNationals: true,
    requireAllSelected: true,
    flightNumber: 'BA1234'
  }

  render(<FlightFlaggerFilters
    terminal={"T1"}
    nationalities={nationalities}
    ageGroups={ageGroups}
    submitCallback={callBack}
    showAllCallback={() => {}}
    onChangeInput={() => {}}
    clearFiltersCallback={() => {}}
    sendEvent={sendEvent}
  />)

  await fireEvent.click(screen.getByTestId('show-filters'))
  const filters = await screen.queryByTestId('flight-flagger-filters')
  await waitFor(() => {
    expect(filters).toHaveStyle(`height: auto`)
  })

  const flightNumber = screen.getByLabelText('Enter flight details')
  fireEvent.change(flightNumber, {target: {value: 'BA1234'}})

  const nationalitiesAutocomplete = screen.getByTestId('nationalities-autocomplete')
  const nationalitiesInput = within(nationalitiesAutocomplete).getByRole('combobox')
  nationalitiesAutocomplete.focus()

  fireEvent.change(nationalitiesInput, {target: {value: 'G'}})
  fireEvent.keyDown(nationalitiesAutocomplete, {key: 'ArrowDown'})
  fireEvent.keyDown(nationalitiesAutocomplete, {key: 'Enter'})

  const ageAutocomplete = screen.getByTestId('age-autocomplete')
  const ageInput = within(ageAutocomplete).getByRole('combobox')
  ageAutocomplete.focus()

  fireEvent.change(ageInput, {target: {value: 'G'}})
  fireEvent.keyDown(ageAutocomplete, {key: 'ArrowDown'})
  fireEvent.keyDown(ageAutocomplete, {key: 'Enter'})

  await fireEvent.click(screen.getByTestId('show-visa-nationals-check'))
  await fireEvent.click(screen.getByTestId('require-all-selected-check'))

  fireEvent.click(screen.getByTestId('flight-flagger-filter-submit'))
  expect(callBack).toHaveBeenCalledWith(expectedPayload)
})

test("calls the submitCallback when the user hits enter on the flight number input", async () => {

  const callBack = jest.fn()

  render(<FlightFlaggerFilters
    terminal={"T1"}
    nationalities={nationalities}
    ageGroups={ageGroups}
    submitCallback={callBack}
    showAllCallback={() => {}}
    onChangeInput={() => {}}
    clearFiltersCallback={() => {}}
    maybeInitialState={initialFormStateWithSomeFilter}
    sendEvent={sendEvent}
  />)

  const flightNumber = screen.getByLabelText('Enter flight details')
  fireEvent.change(flightNumber, {target: {value: 'BA1234'}})
  fireEvent.keyDown(flightNumber, {key: 'Enter'})

  expect(callBack).toHaveBeenCalledWith({...initialFormStateWithSomeFilter, flightNumber: 'BA1234'})
})

test("calls the submitCallback when the user clears selected filters", async () => {

  const callBack = jest.fn()

  const expectedPayload = {
    selectedNationalities: [],
    selectedAgeGroups: [],
    showTransitPaxNumber: false,
    showNumberOfVisaNationals: false,
    requireAllSelected: false,
    flightNumber: 'BA1234'
  }

  render(<FlightFlaggerFilters
    terminal={"T1"}
    nationalities={nationalities}
    ageGroups={ageGroups}
    submitCallback={() => {}}
    showAllCallback={() => {}}
    onChangeInput={() => {}}
    clearFiltersCallback={callBack}
    maybeInitialState={{
      showTransitPaxNumber: true,
      showNumberOfVisaNationals: true,
      requireAllSelected: true,
      flightNumber: '',
      selectedNationalities: nationalities,
      selectedAgeGroups: ageGroups,
      showFilters: false,
    }}
    sendEvent={sendEvent}
  />)

  const flightNumber = screen.getByLabelText('Enter flight details')
  fireEvent.change(flightNumber, {target: {value: 'BA1234'}})
  fireEvent.keyDown(flightNumber, {key: 'Enter'})

  await fireEvent.click(screen.getByTestId('flight-flagger-clear-filters'))
  expect(callBack).toHaveBeenCalledWith(expectedPayload)
})
