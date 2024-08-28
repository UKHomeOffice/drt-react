import React, {useState} from "react";
import {
  Autocomplete,
  Button,
  Checkbox,
  Chip,
  Collapse,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import CustomHighlightIcon from "./icon-highlight-pax.svg";

type FormState = {
  showTransitPaxNumber: boolean,
  showNumberOfVisaNationals: boolean,
  requireAllSelected: boolean,
  flightNumber: string,
  selectedNationalities: Country[],
  selectedAgeGroups: string[],
  showFilters: boolean,
}

export type Country = {
  name: string,
  code: string
}

export type SearchFilterPayload = {
  showTransitPaxNumber: boolean,
  showNumberOfVisaNationals: boolean,
  requireAllSelected: boolean,
  flightNumber: string,
  selectedNationalities: Country[],
  selectedAgeGroups: string[],
}

export interface IFlightFlaggerFilters {
  nationalities: Country[],
  ageGroups: string[],
  submitCallback: (payload: SearchFilterPayload) => void,
  showAllCallback: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onChangeInput: (searchTerm: string) => void,
  clearFiltersCallback: (payload: SearchFilterPayload) => void,
  initialState?: FormState
}

function getInitialState(initialState?: FormState) {
  return {
    showTransitPaxNumber: initialState?.showTransitPaxNumber || false,
    showNumberOfVisaNationals: initialState?.showNumberOfVisaNationals || false,
    requireAllSelected: initialState?.requireAllSelected || false,
    flightNumber: initialState?.flightNumber || '',
    selectedNationalities: initialState?.selectedNationalities || [],
    selectedAgeGroups: initialState?.selectedAgeGroups || [],
    showFilters: initialState?.showFilters || false,
  };
}

export const FlightFlaggerFilters = ({
                                       nationalities,
                                       ageGroups,
                                       submitCallback,
                                       showAllCallback,
                                       onChangeInput,
                                       clearFiltersCallback,
                                       initialState,
                                     }: IFlightFlaggerFilters) => {

  const HighlightIcon = () => {
    return <CustomHighlightIcon style={{marginLeft: '4px', minWidth: '25px'}}/>
  }

  const ageOptions = ageGroups.map((ageGroup) => {
    return {title: ageGroup}
  });

  const [searchFlags, setSearchFlags] = useState<FormState>(getInitialState(initialState));

  const [appliedSearchFlags, setAppliedSearchFlags] = useState<FormState>(searchFlags)

  const isTouched = () => {
    return searchFlags.selectedNationalities.length !== searchFlags.selectedNationalities.length ||
      searchFlags.selectedAgeGroups.length !== searchFlags.selectedAgeGroups.length ||
      searchFlags.showTransitPaxNumber ||
      searchFlags.showNumberOfVisaNationals
  }

  const someCriteriaSelected = () => {
    return searchFlags.selectedNationalities.length > 0 ||
      searchFlags.selectedAgeGroups.length > 0 ||
      searchFlags.showTransitPaxNumber ||
      searchFlags.showNumberOfVisaNationals
  }

  const isActive = () => {
    return appliedSearchFlags.selectedNationalities.length > 0 ||
      appliedSearchFlags.selectedAgeGroups.length > 0 ||
      appliedSearchFlags.showTransitPaxNumber ||
      appliedSearchFlags.showNumberOfVisaNationals
  }

  const submit = () => {
    const nationalityPayload: Country[] = searchFlags.selectedNationalities.map((nationality: Country) => nationality)
    const ageGroupPayload: string[] = searchFlags.selectedAgeGroups
    const payload = {
      showTransitPaxNumber: searchFlags.showTransitPaxNumber,
      showNumberOfVisaNationals: searchFlags.showNumberOfVisaNationals,
      requireAllSelected: searchFlags.requireAllSelected,
      flightNumber: searchFlags.flightNumber,
      selectedNationalities: nationalityPayload,
      selectedAgeGroups: ageGroupPayload,
    }
    submitCallback(payload);
  }

  const handleApply = () => {
    submit()
    setSearchFlags({...searchFlags, showFilters: false})
    setAppliedSearchFlags(searchFlags)
  }

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name: string = event.target.name
    setSearchFlags({
      ...searchFlags,
      [name]: event.target.checked
    })
  }

  const handleTextInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name: string = event.target.name
    setSearchFlags({
      ...searchFlags,
      [name]: event.target.value
    })
    onChangeInput(event.target.value)
  }

  const handleInputSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      submit()
    }
  }

  const toggleFilters = () => {
    setSearchFlags({...searchFlags, showFilters: !searchFlags.showFilters})
  }

  const buildFilterString = () => {
    const paxFlters = []
    if (searchFlags.selectedNationalities.length) {
      paxFlters.push(`nationality: ${searchFlags.selectedNationalities.map(n => `${n.name} (${n.code})`).join(', ')}`)
    }
    if (searchFlags.selectedAgeGroups.length) {
      paxFlters.push(`age: ${searchFlags.selectedAgeGroups.join(', ')}`)
    }
    if (searchFlags.showTransitPaxNumber) {
      paxFlters.push('show transit pax')
    }
    if (searchFlags.showNumberOfVisaNationals) {
      paxFlters.push('show number of visa nationals')
    }
    if (searchFlags.requireAllSelected) {
      paxFlters.push('only highlight flights with all selected info')
    }
    return `${paxFlters.join(', ')}`;
  }

  const getFilterCount = () => {
    let total = 0
    total += searchFlags.selectedNationalities.length
    total += searchFlags.selectedAgeGroups.length
    if (searchFlags.showTransitPaxNumber) {
      total++
    }
    if (searchFlags.showNumberOfVisaNationals) {
      total++
    }
    if (searchFlags.requireAllSelected) {
      total++
    }
    return total;
  }

  const clearHighlights = () => {
    const emptyFormState = {
      showTransitPaxNumber: false,
      showNumberOfVisaNationals: false,
      requireAllSelected: false,
      flightNumber: searchFlags.flightNumber,
      selectedNationalities: [],
      selectedAgeGroups: [],
    }

    setSearchFlags(p => {
      return {...emptyFormState, showFilters: false}
    })

    clearFiltersCallback(emptyFormState);
  }

  return <>
    <Grid container sx={{backgroundColor: '#F3F5F9', width: '100%', ml: 0, pt: 2, flexWrap: {xs: 'wrap', md: 'nowrap'}}}
          spacing={2}>
      <Grid item flexGrow={0}>
        <InputLabel htmlFor="flight-number" sx={{mb: 1}}><strong>Enter flight details</strong></InputLabel>
        <FormControl variant="outlined" sx={{minWidth: '365px'}}>
          <OutlinedInput
            sx={{backgroundColor: '#fff'}}
            size="small"
            id="flight-number"
            name="flightNumber"
            onChange={handleTextInputChange}
            onKeyDown={handleInputSubmit}
            value={searchFlags.flightNumber}
            placeholder="Enter flight, origin or country"
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon/>
              </InputAdornment>
            }
          />
        </FormControl>
      </Grid>
      <Grid item flexGrow={0} sx={{
        borderLeft: {xs: 'none', md: '1px solid #ccc'},
        ml: {xs: 0, sm: 0, md: 2},
        px: {xs: 0, md: 4}
      }}>
        <InputLabel sx={{mb: 1}}><strong>Highlight flights</strong></InputLabel>
        <Button
          data-testid="show-filters"
          color="secondary"
          onClick={() => toggleFilters()}
          disableElevation
          variant="outlined"
          sx={{
            textTransform: 'none',
            letterSpacing: 0,
            whiteSpace: 'nowrap',
            height: '40px',
            backgroundColor: '#fff'
          }}
          startIcon={<HighlightIcon/>}
          endIcon={<Chip
            color={isActive() ? "primary" : "default"}
            size="small"
            label={`${getFilterCount()}`}
            sx={{fontSize: '0.8125rem !important'}}/>
          }
          size="large">
          Select pax info to reveal
        </Button>
      </Grid>
      {isActive() && <Grid item flexGrow={1}>
          <FormControl>
              <FormLabel sx={{mb: 1}} id="display"><strong>Show flights:</strong></FormLabel>
              <RadioGroup
                  row
                  aria-labelledby="display"
                  name="row-radio-buttons-group"
                  onChange={showAllCallback}
                  defaultValue="false"
              >
                  <FormControlLabel value="false" data-testid="show-all-flights" defaultChecked={true}
                                    control={<Radio/>}
                                    label="All flights"/>
                  <FormControlLabel value="true" data-testid="show-highlighted-only" control={<Radio/>}
                                    label="Highlighted flights only"/>
              </RadioGroup>
          </FormControl>
      </Grid>}
    </Grid>
    <Grid container sx={{backgroundColor: '#F3F5F9', width: '100%', ml: 0}} spacing={2}>
      <Grid item xs={12} sx={{px: 2, pb: 2}}>
        <Collapse in={searchFlags.showFilters} data-testid="flight-flagger-filters">
          <Paper elevation={0} sx={{backgroundColor: '#fff', p: 2, mt: 2}}>
            <Grid container columnSpacing={2}>
              <Grid item xs={12}>
                <Typography sx={{mb: 1}}><strong>Select pax info to reveal</strong></Typography>
              </Grid>
              <Grid item xs={12} sm={6} sx={{mb: 2}}>
                <Autocomplete
                  data-testid="nationalities-autocomplete"
                  multiple
                  id="nationalities"
                  options={nationalities}
                  getOptionLabel={(option) => `${option.name} (${option.code})`}
                  value={searchFlags.selectedNationalities}
                  defaultValue={[]}
                  filterSelectedOptions
                  isOptionEqualToValue={(option, value) => option.code === value.code}
                  onChange={(event, newValue: Country[]) => {
                    setSearchFlags({...searchFlags, selectedNationalities: newValue});
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Nationalities"
                      placeholder="Enter or select nationalities"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  data-testid="age-autocomplete"
                  multiple
                  id="ageGroups"
                  options={ageOptions}
                  value={searchFlags.selectedAgeGroups}
                  defaultValue={[]}
                  filterSelectedOptions
                  isOptionEqualToValue={(option, value) => option.title === value.title}
                  onChange={(event, newValue: string[]) => {
                    setSearchFlags({...searchFlags, selectedAgeGroups: newValue});
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Age groups"
                      placeholder="Enter of select age groups"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox data-testid="show-visa-nationals-check" checked={searchFlags.showNumberOfVisaNationals}
                                onChange={handleCheckboxChange} name="showNumberOfVisaNationals"/>
                    }
                    label="Show number of visa nationals"
                  />
                  <Paper elevation={0} sx={{py: 1, px: 2, mt: 1, mb: 2}} variant="outlined">
                    <FormControlLabel
                      control={
                        <Checkbox
                          data-testid="require-all-selected-check"
                          disabled={!someCriteriaSelected()}
                          checked={searchFlags.requireAllSelected}
                          onChange={handleCheckboxChange}
                          name="requireAllSelected"/>
                      }
                      label="Only highlight flights with all selected info"
                    />
                  </Paper>
                </FormGroup>
              </Grid>
              <Grid item xs={12}>
                <Button variant='outlined' onClick={() =>
                  setSearchFlags({...getInitialState(initialState), showFilters: false})
                } sx={{mr: 2}}>
                  Close
                </Button>
                <Button data-testid="flight-flagger-filter-submit" variant='contained' onClick={handleApply}
                        disabled={!isTouched()}>
                  Apply Highlights
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Collapse>
        {isActive() && <Typography sx={{mt: 2, pr: 2}}>
            <strong>Pax info highlighted - </strong>
          {buildFilterString()} -
            <Link data-testid="flight-flagger-clear-filters" onClick={() => clearHighlights()}>
                Clear all highlights
            </Link>
        </Typography>}
      </Grid>
    </Grid></>

}
