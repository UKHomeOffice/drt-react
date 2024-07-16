import React, {useState} from "react";
import { Grid, Typography, FormGroup, FormLabel, RadioGroup, Radio, FormControl, Collapse, InputLabel, OutlinedInput,InputAdornment, FormControlLabel, Autocomplete, Checkbox, TextField, Button, Paper, IconButton, Chip, Link } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { ArrowRight } from "@mui/icons-material";

export type AutocompleteOption = {
  title: string
}

type FormState = {
  showTransitPaxNumber: boolean,
  showNumberOfVisaNationals: boolean,
  requireAllSelected: boolean,
  flightNumber: string
}

export type SearchFilterPayload = {
  showTransitPaxNumber: boolean,
  showNumberOfVisaNationals: boolean,
  selectedAgeGroups: string[],
  selectedNationalities: string[],
  flightNumber: string,
  requireAllSelected: boolean,
}

export interface IFlightFlaggerFilters {
  nationalities: string[],
  ageGroups: string[],
  submitCallback: (payload:SearchFilterPayload) => void,
  showAllCallback: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onChangeInput: (searchTerm: string) => void,
  initialState?: {
    showTransitPaxNumber: boolean,
    showNumberOfVisaNationals: boolean,
    requireAllSelected: boolean,
    flightNumber: string,
    selectedNationalities: AutocompleteOption[],
    selectedAgeGroups: AutocompleteOption[],
    showFilters: boolean,
  }
}

export const FlightFlaggerFilters = ({
  nationalities, 
  ageGroups, 
  submitCallback, 
  showAllCallback, 
  onChangeInput,
  initialState,
}: IFlightFlaggerFilters) => {

  const nationalitiesOptions = nationalities.map((nationality) => { return { title: nationality }});
  const ageOptions = ageGroups.map((ageGroup) => { return { title: ageGroup }});

  const [searchFlags, setSearchFlags] = useState<FormState>({
    showTransitPaxNumber: initialState?.showTransitPaxNumber || false,
    showNumberOfVisaNationals: initialState?.showNumberOfVisaNationals || false,
    requireAllSelected: initialState?.requireAllSelected || false,
    flightNumber: initialState?.flightNumber || '',
  });
  const [selectedNationalities, setSelectedNationalities] = useState<AutocompleteOption[]>(initialState?.selectedNationalities || []);
  const [selectedAgeGroups, setSelectedAgeGroups] = useState<AutocompleteOption[]>(initialState?.selectedAgeGroups || []);
  const [showFilters, setShowFilters] = useState<boolean>(initialState?.showFilters || false);

  const isTouched = () => {
    return (selectedNationalities.length !== 0) || (selectedAgeGroups.length !== 0) || searchFlags.showTransitPaxNumber || searchFlags.showNumberOfVisaNationals
  }

  const submit = () => {
    const ageGroupPayload: string[] = selectedAgeGroups.map((ageGroup: AutocompleteOption) => ageGroup.title)
    const nationalityPayload: string[] = selectedNationalities.map((nationality: AutocompleteOption) => nationality.title)
    submitCallback({
      ...searchFlags,
      selectedNationalities: nationalityPayload, 
      selectedAgeGroups: ageGroupPayload,
    });
  }

  const handleApply = () => {
    submit()
    setShowFilters(false)
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
    const ageGroupPayload: string[] = selectedAgeGroups.map((ageGroup: AutocompleteOption) => ageGroup.title)
    const nationalityPayload: string[] = selectedNationalities.map((nationality: AutocompleteOption) => nationality.title)
    setSearchFlags({
      ...searchFlags,
      [name]: event.target.value
    })
    onChangeInput(event.target.value)
  }

  const handleInputSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if(event.key === 'Enter'){
      submit()
    }
  }

  const toggleFilters = () => {
    setShowFilters(!showFilters)
  }

    
  const buildFilterString = () => {
    const paxFlters = []
    if (selectedNationalities.length) {
      paxFlters.push(`nationality: ${selectedNationalities.map(n => n.title).join(', ')}`)
    }
    if (selectedAgeGroups.length) {
      paxFlters.push(`age: ${selectedAgeGroups.map(n => n.title).join(', ')}`)
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
    total += selectedNationalities.length
    total += selectedAgeGroups.length
    if (searchFlags.showTransitPaxNumber) { total++ }
    if (searchFlags.showNumberOfVisaNationals) { total++ }
    if (searchFlags.requireAllSelected) { total++ }
    return total;
  }

  const clearHighlights = () => {
    const resetFilterPayload = {
      ...searchFlags,
      showTransitPaxNumber: false,
      showNumberOfVisaNationals: false,
      requireAllSelected: false,
    }
    setSearchFlags(resetFilterPayload)
    setSelectedNationalities([]);
    setSelectedAgeGroups([]);

    submitCallback({
      ...resetFilterPayload,
      selectedNationalities: [], 
      selectedAgeGroups: [],
    });
  }

  return <>
    <Grid container sx={{backgroundColor: '#F3F5F9', width: '100%', ml:0, pt: 2}} flexWrap={{xs: 'wrap', md: 'nowrap'}} spacing={2}>
      <Grid item flexGrow={0}>
        <InputLabel htmlFor="flight-number" sx={{mb:1}}><strong>Enter flight details</strong></InputLabel>
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
          borderLeft: { xs:'none', md:'1px solid #ccc' },
          ml: { xs:0, sm: 0, md:2}, 
          px: { xs:0, md:4}
        }}>
        <InputLabel sx={{mb:1}}><strong>Highlight flights</strong></InputLabel>
        <Button 
          data-testid="show-filters"
          color={"secondary"}
          onClick={() => toggleFilters()}
          disableElevation
          variant={"outlined"} 
          sx={{
            textTransform: 'none', 
            letterSpacing: 0, 
            whiteSpace: 'nowrap', 
            height: '40px',
            backgroundColor: '#fff'
          }}
          startIcon={<SearchIcon/>}
          endIcon={<Chip 
                    color={isTouched() ? "primary" : "default"} 
                    size="small" 
                    label={`${getFilterCount()}`} 
                    sx={{fontSize: '0.8125rem !important'}} /> 
          }
          size="large">
            Select pax info to reveal
          </Button>
      </Grid>
      <Grid item flexGrow={1}>
        <FormControl>
          <FormLabel sx={{mb:1}} id="display"><strong>Show flights:</strong></FormLabel>
          <RadioGroup
            row
            aria-labelledby="display"
            name="row-radio-buttons-group"
            onChange={showAllCallback}
            defaultValue="false"
          >
            <FormControlLabel value="false" data-testid="show-all-flights"  defaultChecked={true} control={<Radio />} label="All flights" />
            <FormControlLabel value="true" data-testid="show-highlighted-only" control={<Radio />} label="Highlighted flights only" />
          </RadioGroup>
        </FormControl>
      </Grid>
    </Grid>
    <Grid container sx={{backgroundColor: '#F3F5F9', width: '100%', ml:0}} spacing={2}>
      <Grid item xs={12} sx={{px:2, pb:2}}>
        <Collapse in={showFilters} data-testid="flight-flagger-filters">
        <Paper elevation={0} sx={{backgroundColor: '#fff', p:2, mt: 2}}>
          <Grid container columnSpacing={2}>
            <Grid item xs={12}>
              <Typography sx={{mb:1}}><strong>Select pax info to reveal</strong></Typography>
            </Grid>
            <Grid item xs={12} sm={6} sx={{mb: 2}}>
              <Autocomplete
                  data-testid="nationalities-autocomplete"
                  multiple
                  id="nationalities"
                  options={nationalitiesOptions}
                  getOptionLabel={(option) => option.title}
                  value={selectedNationalities}
                  defaultValue={[]}
                  filterSelectedOptions
                  isOptionEqualToValue={(option, value) => option.title === value.title}
                  onChange={(event, newValue) => {
                      setSelectedNationalities(newValue);
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
            <Grid item xs={12} sm={6} >
              <Autocomplete
                  data-testid="age-autocomplete"
                  multiple
                  id="ageGroups"
                  options={ageOptions}
                  getOptionLabel={(option) => option.title}
                  value={selectedAgeGroups}
                  defaultValue={[]}
                  filterSelectedOptions
                  isOptionEqualToValue={(option, value) => option.title === value.title}
                  onChange={(event, newValue) => {
                    setSelectedAgeGroups(newValue);
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
                {/* <FormControlLabel
                  control={
                    <Checkbox data-testid="show-transit-pax-check" checked={searchFlags.showTransitPaxNumber} onChange={handleCheckboxChange} name="showTransitPaxNumber" />
                  }
                  label="Show transit pax number"
                /> */}
                <FormControlLabel
                  control={
                    <Checkbox data-testid="show-visa-nationals-check" checked={searchFlags.showNumberOfVisaNationals} onChange={handleCheckboxChange} name="showNumberOfVisaNationals" />
                  }
                  label="Show number of visa nationals"
                />
                <Paper elevation={0} sx={{py: 1, px:2, mt: 1, mb: 2}} variant="outlined">
                  <FormControlLabel
                    control={
                      <Checkbox 
                        data-testid="require-all-selected-check"
                        disabled={!isTouched()}
                        checked={searchFlags.requireAllSelected} 
                        onChange={handleCheckboxChange} 
                        name="requireAllSelected" />
                    }
                    label="Only highlight flights with all selected info"
                  />
                </Paper>
              </FormGroup>
            </Grid>
            <Grid item xs={12}>
              <Button variant='outlined' onClick={() => setShowFilters(false)} sx={{mr: 2}}>Close</Button>
              <Button data-testid="flight-flagger-filter-submit" variant='contained' onClick={handleApply}>Apply Highlights</Button>
            </Grid>
          </Grid>
        </Paper>
        </Collapse>
        { isTouched() && <Typography sx={{mt:2,pr: 2}}>
          <strong>Pax info highlighted - </strong>
          { buildFilterString() } - <Link data-testid="flight-flagger-clear-filters" onClick={() => clearHighlights()}>Clear all highlights</Link>
        </Typography> }
      </Grid>
  </Grid></>

}
