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

export type FormState = {
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

  const initialFormState = getInitialState(maybeInitialState)
  const [currentFormState, setCurrentFormState] = useState<FormState>(initialFormState)
  const [appliedSearchFlags, setAppliedSearchFlags] = useState<FormState>(initialFormState)

  const formIsTouched = (initialForm: FormState, currentForm: FormState) => {
    return currentForm.selectedNationalities.length !== initialForm.selectedNationalities.length ||
      currentForm.selectedAgeGroups.length !== initialForm.selectedAgeGroups.length ||
      currentForm.showTransitPaxNumber != initialForm.showTransitPaxNumber ||
      currentForm.showNumberOfVisaNationals != initialForm.showNumberOfVisaNationals ||
      currentForm.requireAllSelected != initialForm.requireAllSelected
  }

  const someCriteriaSelected = (form: FormState) => {
    return form.selectedNationalities.length > 0 ||
      form.selectedAgeGroups.length > 0 ||
      form.showTransitPaxNumber ||
      form.showNumberOfVisaNationals
  }

  const handleApply = (form: FormState) =>
    () => {
      const formToSubmit = {...form, showFilters: false}

      submitCallback(formToSubmit)

      setCurrentFormState(formToSubmit)
      setAppliedSearchFlags(formToSubmit)
    }

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentFormState({
      ...currentFormState,
      [event.target.name]: event.target.checked
    })
  }

  const handleTextInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentFormState({
      ...currentFormState,
      [event.target.name]: event.target.value
    })
    onChangeInput(event.target.value)
  }

  const handleInputSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      submitCallback(currentFormState)
    }
  }

  const toggleFilters = () => {
    setCurrentFormState({...currentFormState, showFilters: !currentFormState.showFilters})
  }

  const buildFilterString = (flags: FormState) => {
    return [
      flags.selectedNationalities.length ? `nationality: ${flags.selectedNationalities.map(n => `${n.name} (${n.code})`).join(', ')}` : null,
      flags.selectedAgeGroups.length ? `age: ${flags.selectedAgeGroups.join(', ')}` : null,
      flags.showTransitPaxNumber ? 'show transit pax' : null,
      flags.showNumberOfVisaNationals ? 'show number of visa nationals' : null,
      flags.requireAllSelected ? 'only highlight flights with all selected info' : null
    ]
      .filter(v => v !== null)
      .join(', ')
  }

  const getFilterCount = (form: FormState) => {
    return form.selectedNationalities.length +
      form.selectedAgeGroups.length +
      (form.showTransitPaxNumber ? 1 : 0) +
      (form.showNumberOfVisaNationals ? 1 : 0) +
      (form.requireAllSelected ? 1 : 0)
  }

  const clearHighlights = () => {
    const emptyState = emptyFilterFormState(currentFormState.flightNumber)

    setCurrentFormState({...emptyState, showFilters: false})
    setAppliedSearchFlags({...emptyState, showFilters: false})

    clearFiltersCallback(emptyState)
  }

  const buttonStyles = {
    fontWeight: 'normal',
    '& .MuiButton-startIcon': {
      fill: '#ffffff',
    },
    '& .MuiChip-root': {
      backgroundColor: 'rgba(0,0,0,0.2)'
    }
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
            value={currentFormState.flightNumber}
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
          color="primary"
          onClick={() => toggleFilters()}
          disableElevation
          variant="contained"
          sx={buttonStyles}
          startIcon={<HighlightIcon />}
          endIcon={<Chip
            color={someCriteriaSelected(appliedSearchFlags) ? "primary" : "primary"}
            size="small"
            label={`${getFilterCount(appliedSearchFlags)}`}
            sx={{fontSize: '0.8125rem !important'}}/>
          }
          size="large">
          Select pax info to reveal
        </Button>
      </Grid>
      {someCriteriaSelected(appliedSearchFlags) && <Grid item flexGrow={1}>
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
        <Collapse in={currentFormState.showFilters} data-testid="flight-flagger-filters">
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
                  getOptionLabel={option => `${option.name} (${option.code})`}
                  value={currentFormState.selectedNationalities}
                  defaultValue={[]}
                  filterSelectedOptions
                  isOptionEqualToValue={(option, value) => option.code === value.code}
                  onChange={(event, newValue: Country[]) => {
                    setCurrentFormState({...currentFormState, selectedNationalities: newValue})
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
                  options={ageGroups}
                  value={currentFormState.selectedAgeGroups}
                  defaultValue={[]}
                  filterSelectedOptions
                  onChange={(event, newValue: string[]) => {
                    setCurrentFormState({...currentFormState, selectedAgeGroups: newValue})
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
                      <Checkbox data-testid="show-visa-nationals-check"
                                checked={currentFormState.showNumberOfVisaNationals}
                                onChange={handleCheckboxChange}
                                inputProps={{'aria-label': 'show visa nationals'}}
                                name="showNumberOfVisaNationals"/>
                    }
                    label="Show number of visa nationals"
                  />
                  <Paper elevation={0} sx={{py: 1, px: 2, mt: 1, mb: 2}} variant="outlined">
                    <FormControlLabel
                      control={
                        <Checkbox
                          data-testid="require-all-selected-check"
                          disabled={!someCriteriaSelected(currentFormState)}
                          checked={currentFormState.requireAllSelected}
                          onChange={handleCheckboxChange}
                          name="requireAllSelected"/>
                      }
                      label="Only highlight flights with all selected info"
                    />
                  </Paper>
                </FormGroup>
              </Grid>
              <Grid item xs={12}>
                <Button data-testid="flight-flagger-filter-cancel"
                        variant='outlined'
                        onClick={() => setCurrentFormState({...appliedSearchFlags, showFilters: false})}
                        sx={{mr: 2}}>
                  Cancel
                </Button>
                <Button data-testid="flight-flagger-filter-submit"
                        variant='contained'
                        onClick={handleApply(currentFormState)}
                        disabled={!formIsTouched(appliedSearchFlags, currentFormState)}>
                  Apply Highlights
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Collapse>
        {someCriteriaSelected(appliedSearchFlags) && <Typography sx={{mt: 2, pr: 2}}>
          <strong>Pax info highlighted - </strong>
          {buildFilterString(appliedSearchFlags)} - <Link
          data-testid="flight-flagger-clear-filters"
          onClick={() => clearHighlights()}>
          Clear all highlights
        </Link>
        </Typography>}
      </Grid>
    </Grid></>

}
