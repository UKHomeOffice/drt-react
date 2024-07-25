import React from "react";
import {  ListItemIcon,ListItemText, Typography,  MenuItem, FormControl, Select, SelectProps, Box, FormLabel, Divider } from "@mui/material";
import airports from "../../aiports";
import { styled, Theme } from '@mui/material/styles';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import { SelectChangeEvent } from "@mui/material";
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';

const StyledSelect = styled(Select)<SelectProps>(({ theme }) => ({
  minWidth: '280px',
  outline: 0,
  marginRight: theme.spacing(1),
  ':after, :before': {
    borderBottom: 'none !important'
  },
  '& .MuiSelect-select': {
    borderWidth: '0 !important',
    display: 'flex',
    padding: ` 0 40px 0 0 !important`,
    backgroundColor: 'transparent',
    '& >*': {
      display: 'flex',  
      alignItems: 'center',
      minWidth: 0,
    },
    '& .MuiListItemIcon-root': {
      marginRight: theme.spacing(2),
      '& svg': {
        fontSize: '1rem',
        fill: '#000'
      }
    }
  },
  '& .MuiListItemText-root *': {
    fontWeight: 'bold !important',
    fontSize: '0.875rem !important',
    marginTop: '6px !important',
  }
}));


export interface IPortSelector {
  handleChangePort: (event: SelectChangeEvent<unknown>) => void,
  port: string,
}

const PortSelector = ({handleChangePort, port}: IPortSelector) => {

 return (
  <Box display={'flex'}>
    <FormControl size="small">     
      <StyledSelect value={port} variant="standard" onChange={handleChangePort}>
        <MenuItem selected={port == airports.central.code} value={airports.central.code}>
          <ListItemIcon><TravelExploreIcon fontSize="small" /></ListItemIcon>
          <ListItemText><strong>{ airports.central.name }</strong></ListItemText>
        </MenuItem>
        { airports.central.ports.map((airport, index) => 
          <MenuItem key={index} value={airport.code}>
            <ListItemIcon><AirplanemodeActiveIcon fontSize="small" /></ListItemIcon>
            <ListItemText>{airport.code} ({airport.name})</ListItemText>
          </MenuItem>
        )}
        <Divider />
        <MenuItem selected={port == airports.south.code} value={airports.south.code}>
          <ListItemIcon><TravelExploreIcon fontSize="small" /></ListItemIcon>
          <ListItemText><strong>{ airports.south.name }</strong></ListItemText>
        </MenuItem>
        { airports.south.ports.map((airport, index) => 
          <MenuItem key={index} value={airport.code}>
            <ListItemIcon><AirplanemodeActiveIcon fontSize="small" /></ListItemIcon>
            <ListItemText>{airport.code} ({airport.name})</ListItemText>
          </MenuItem>
        )}
        <Divider />
        <MenuItem selected={port == airports.north.code} value={airports.north.code}>
          <ListItemIcon><TravelExploreIcon fontSize="small" /></ListItemIcon>
          <ListItemText><strong>{ airports.north.name }</strong></ListItemText>
        </MenuItem>
        { airports.north.ports.map((airport, index) => 
          <MenuItem key={index} value={airport.code}>
            <ListItemIcon><AirplanemodeActiveIcon fontSize="small" /></ListItemIcon>
            <ListItemText>{airport.code} ({airport.name})</ListItemText>
          </MenuItem>
        )}
        <Divider />
        <MenuItem selected={port == airports.heathrow.code} value={airports.heathrow.code}>
          <ListItemIcon><TravelExploreIcon fontSize="small" /></ListItemIcon>
          <ListItemText><strong>{ airports.heathrow.name }</strong></ListItemText>
        </MenuItem>
        { airports.heathrow.ports.map((airport, index) => 
          <MenuItem key={index} value={airport.code}>
            <ListItemIcon><AirplanemodeActiveIcon fontSize="small" /></ListItemIcon>
            <ListItemText>{airport.code} ({airport.name})</ListItemText>
          </MenuItem>
        )}
      </StyledSelect>
    </FormControl>
  </Box>
 )
}
export default PortSelector
