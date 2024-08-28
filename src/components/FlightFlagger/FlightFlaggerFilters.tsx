import React, {useState} from "react"
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
} from "@mui/material"
import SearchIcon from '@mui/icons-material/Search'
import CustomHighlightIcon from "./icon-highlight-pax.svg"

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
  maybeInitialState?: FormState
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
  }
}

function emptyFilterFormState(flightNumber: string) {
  return {
    showTransitPaxNumber: false,
    showNumberOfVisaNationals: false,
    requireAllSelected: false,
    flightNumber: flightNumber,
    selectedNationalities: [],
    selectedAgeGroups: [],
  }
}


export const FlightFlaggerFilters = ({
                                       nationalities,
                                       ageGroups,
                                       submitCallback,
                                       showAllCallback,
                                       onChangeInput,
                                       clearFiltersCallback,
                                       maybeInitialState,
                                     }: IFlightFlaggerFilters) => {

  const HighlightIcon = () => {
    return <CustomHighlightIcon style={{marginLeft: '4px', minWidth: '25px'}}/>
  }

  const ageOptions = ageGroups.map((ageGroup) => {
    return {title: ageGroup}
  })

  const initialFormState = getInitialState(maybeInitialState)

  const [formSearchFlags, setFormSearchFlags] = useState<FormState>(initialFormState)
  const [appliedSearchFlags, setAppliedSearchFlags] = useState<FormState>(initialFormState)

  const formIsTouched = () => {
    return formSearchFlags.selectedNationalities.length !== formSearchFlags.selectedNationalities.length ||
      formSearchFlags.selectedAgeGroups.length !== formSearchFlags.selectedAgeGroups.length ||
      formSearchFlags.showTransitPaxNumber ||
      formSearchFlags.showNumberOfVisaNationals
  }

  const someCriteriaSelected = () => {
    return formSearchFlags.selectedNationalities.length > 0 ||
      formSearchFlags.selectedAgeGroups.length > 0 ||
      formSearchFlags.showTransitPaxNumber ||
      formSearchFlags.showNumberOfVisaNationals
  }

  const filterIsActive = () => {
    return appliedSearchFlags.selectedNationalities.length > 0 ||
      appliedSearchFlags.selectedAgeGroups.length > 0 ||
      appliedSearchFlags.showTransitPaxNumber ||
      appliedSearchFlags.showNumberOfVisaNationals
  }

  const submit = (formState: FormState) => {
    const nationalityPayload: Country[] = formSearchFlags.selectedNationalities.map((nationality: Country) => nationality)
    // const ageGroupPayload: string[] = formSearchFlags.selectedAgeGroups
    // const payload = {
    //   showTransitPaxNumber: formSearchFlags.showTransitPaxNumber,
    //   showNumberOfVisaNationals: formSearchFlags.showNumberOfVisaNationals,
    //   requireAllSelected: formSearchFlags.requireAllSelected,
    //   flightNumber: formSearchFlags.flightNumber,
    //   selectedNationalities: nationalityPayload,
    //   selectedAgeGroups: ageGroupPayload,
    // }
    const payload = {...formState, selectedNationalities: nationalityPayload}
    submitCallback(payload)
  }

  const handleApply = () => {
    const formToSubmit = {...formSearchFlags, showFilters: false}

    setFormSearchFlags(formToSubmit)
    setAppliedSearchFlags(formToSubmit)
    
    submit(formToSubmit)
  }

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name: string = event.target.name
    setFormSearchFlags({
      ...formSearchFlags,
      [name]: event.target.checked
    })
  }

  const handleTextInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name: string = event.target.name
    setFormSearchFlags({
      ...formSearchFlags,
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
    setFormSearchFlags({...formSearchFlags, showFilters: !formSearchFlags.showFilters})
  }

  const buildFilterString = () => {
    const paxFlters = []
    if (formSearchFlags.selectedNationalities.length) {
      paxFlters.push(`nationality: ${formSearchFlags.selectedNationalities.map(n => `${n.name} (${n.code})`).join(', ')}`)
    }
    if (formSearchFlags.selectedAgeGroups.length) {
      paxFlters.push(`age: ${formSearchFlags.selectedAgeGroups.join(', ')}`)
    }
    if (formSearchFlags.showTransitPaxNumber) {
      paxFlters.push('show transit pax')
    }
    if (formSearchFlags.showNumberOfVisaNationals) {
      paxFlters.push('show number of visa nationals')
    }
    if (formSearchFlags.requireAllSelected) {
      paxFlters.push('only highlight flights with all selected info')
    }
    return `${paxFlters.join(', ')}`
  }

  const getFilterCount = () => {
    let total = 0
    total += formSearchFlags.selectedNationalities.length
    total += formSearchFlags.selectedAgeGroups.length
    if (formSearchFlags.showTransitPaxNumber) {
      total++
    }
    if (formSearchFlags.showNumberOfVisaNationals) {
      total++
    }
    if (formSearchFlags.requireAllSelected) {
      total++
    }
    return total
  }

  const clearHighlights = () => {
    const emptyState = emptyFilterFormState(formSearchFlags.flightNumber)

    setFormSearchFlags({...emptyState, showFilters: false})
    setAppliedSearchFlags({...emptyState, showFilters: false})

    clearFiltersCallback(emptyState)
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
            value={formSearchFlags.flightNumber}
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
            color={filterIsActive() ? "primary" : "default"}
            size="small"
            label={`${getFilterCount()}`}
            sx={{fontSize: '0.8125rem !important'}}/>
          }
          size="large">
          Select pax info to reveal
        </Button>
      </Grid>
      {filterIsActive() && <Grid item flexGrow={1}>
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
        <Collapse in={formSearchFlags.showFilters} data-testid="flight-flagger-filters">
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
                  value={formSearchFlags.selectedNationalities}
                  defaultValue={[]}
                  filterSelectedOptions
                  isOptionEqualToValue={(option, value) => option.code === value.code}
                  onChange={(event, newValue: Country[]) => {
                    setFormSearchFlags({...formSearchFlags, selectedNationalities: newValue})
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
                  value={formSearchFlags.selectedAgeGroups}
                  defaultValue={[]}
                  filterSelectedOptions
                  isOptionEqualToValue={(option, value) => option.title === value.title}
                  onChange={(event, newValue: string[]) => {
                    setFormSearchFlags({...formSearchFlags, selectedAgeGroups: newValue})
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
                      <Checkbox data-testid="show-visa-nationals-check" checked={formSearchFlags.showNumberOfVisaNationals}
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
                          checked={formSearchFlags.requireAllSelected}
                          onChange={handleCheckboxChange}
                          name="requireAllSelected"/>
                      }
                      label="Only highlight flights with all selected info"
                    />
                  </Paper>
                </FormGroup>
              </Grid>
              <Grid item xs={12}>
                <Button variant='outlined'
                        onClick={() => setFormSearchFlags({...initialFormState, showFilters: false})}
                        sx={{mr: 2}}>
                  Close
                </Button>
                <Button data-testid="flight-flagger-filter-submit" variant='contained' onClick={handleApply}
                        disabled={!formIsTouched()}>
                  Apply Highlights
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Collapse>
        {filterIsActive() && <Typography sx={{mt: 2, pr: 2}}>
            <strong>Pax info highlighted - </strong>
          {buildFilterString()} -
            <Link data-testid="flight-flagger-clear-filters" onClick={() => clearHighlights()}>
                Clear all highlights
            </Link>
        </Typography>}
      </Grid>
    </Grid></>

}
