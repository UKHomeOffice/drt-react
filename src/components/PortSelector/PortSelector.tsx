import React from "react";
import {  ListItemIcon,ListItemText, Typography,  MenuItem, FormControl, Select, SelectProps, Box, FormLabel, Divider } from "@mui/material";
import airports from "../../aiports";
import { styled } from '@mui/material/styles';
import LocalAirportIcon from '@mui/icons-material/LocalAirport';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';

const StyledSelect = styled(Select)<SelectProps>(({ theme }) => ({
  minWidth: '280px',
  outline: 0,
  marginRight: theme.spacing(1),
  '& .MuiSelect-select': {
    borderWidth: '0 !important',
    display: 'flex',
    paddingRight: '40px !important',
    '& >*': {
      display: 'flex',  
      alignItems: 'center',
      minWidth: 0,
    },
    '& .MuiListItemIcon-root': {
      marginRight: theme.spacing(2)
    }
  }
}));


export interface IPortSelector {
  handleChangePort: (event: React.ChangeEvent<HTMLSelectElement>) => void,
  port: string,
}

const PortSelector = ({handleChangePort, port}: IPortSelector) => {

 return (
  <Box display={'flex'}>
    <FormLabel sx={{
      textAlign: 'right', 
      textTransform: 'uppercase', 
      fontSize: '0.8em', 
      letterSpacing: '1px', 
      display: 'flex', 
      alignItems: 'center',
      marginRight: '1em', 
    }}> 
      Select an <br/>airport/region:
    </FormLabel>
    <FormControl size="small">     
      <StyledSelect value={port} onChange={handleChangePort}>
        <MenuItem selected={port == airports.central.code} value={airports.central.code}>
          <ListItemIcon><TravelExploreIcon fontSize="small" /></ListItemIcon>
          <ListItemText><strong>{ airports.central.name }</strong></ListItemText>
        </MenuItem>
        { airports.central.ports.map((airport, index) => 
          <MenuItem key={index} value={airport.code}>
            <Typography variant="portCode" color="text.secondary" sx={{mr:2}}>{airport.code}</Typography>
            <ListItemText>{airport.name}</ListItemText>
          </MenuItem>
        )}
        <Divider />
        <MenuItem selected={port == airports.south.code} value={airports.south.code}>
          <ListItemIcon><TravelExploreIcon fontSize="small" /></ListItemIcon>
          <ListItemText><strong>{ airports.south.name }</strong></ListItemText>
        </MenuItem>
        { airports.south.ports.map((airport, index) => 
          <MenuItem key={index} value={airport.code}>
            <Typography variant="portCode" color="text.secondary" sx={{mr:2}}>{airport.code}</Typography>
            <ListItemText>{airport.name}</ListItemText>
          </MenuItem>
        )}
        <Divider />
        <MenuItem selected={port == airports.north.code} value={airports.north.code}>
          <ListItemIcon><TravelExploreIcon fontSize="small" /></ListItemIcon>
          <ListItemText><strong>{ airports.north.name }</strong></ListItemText>
        </MenuItem>
        { airports.north.ports.map((airport, index) => 
          <MenuItem key={index} value={airport.code}>
            <Typography variant="portCode" color="text.secondary" sx={{mr:2}}>{airport.code}</Typography>
            <ListItemText>{airport.name}</ListItemText>
          </MenuItem>
        )}
        <Divider />
        <MenuItem selected={port == airports.heathrow.code} value={airports.heathrow.code}>
          <ListItemIcon><TravelExploreIcon fontSize="small" /></ListItemIcon>
          <ListItemText><strong>{ airports.heathrow.name }</strong></ListItemText>
        </MenuItem>
        { airports.heathrow.ports.map((airport, index) => 
          <MenuItem key={index} value={airport.code}>
            <Typography variant="portCode" color="text.secondary" sx={{mr:2}}>{airport.code}</Typography>
            <ListItemText>{airport.name}</ListItemText>
          </MenuItem>
        )}
      </StyledSelect>
    </FormControl>
  </Box>
 )
}
export default PortSelector
