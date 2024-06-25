import React, {useState} from "react";
import {  ListItemIcon,ListItemText, Typography,  MenuItem, Paper, Select, SelectProps, Grid, MenuList, useMediaQuery } from "@mui/material";
import airports from "../../aiports";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import LocalAirportIcon from '@mui/icons-material/LocalAirport';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import Map from '../ukmap.svg'
import { Airport } from "../../aiports";
import PortMap from "./PortMap";
import { Theme } from "@mui/material";

export interface IPortPanel {
  handlePortClick: (portCode: string) => void,
  selectedPort: string,
}

const PortPanel = ({handlePortClick, selectedPort}: IPortPanel) => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  

  const [portHover, setPortHover] = useState('');

  const renderRegion = (name: string, regionCode: string) => {
    return (
      <MenuItem 
        key={regionCode}
        selected={selectedPort == regionCode} 
        onMouseOver={() => setPortHover(regionCode)} 
        onMouseLeave={() => setPortHover('')}
        onClick={() => handlePortClick(regionCode)}
      >
        <ListItemIcon><TravelExploreIcon fontSize="small" /></ListItemIcon>
        <ListItemText><strong>{ name }</strong></ListItemText>
        <ListItemIcon sx={{opacity: 0.4}}><ArrowRightIcon fontSize="small" /></ListItemIcon>  
      </MenuItem>
    )
  }

  const renderPort = (airport: Airport, index: number) => {
    return (
      <MenuItem 
        key={index}
        selected={selectedPort == airport.code} 
        onMouseOver={() => setPortHover(airport.code)}
        onMouseLeave={() => setPortHover('')}
        onClick={() => handlePortClick(airport.code)}
      >
        <Typography variant="portCode" color="text.secondary" sx={{mr: 2}}>{ airport.code }</Typography>
        <ListItemText>{ airport.name }</ListItemText>
        <ListItemIcon sx={{opacity: 0.4}}><ArrowRightIcon sx={{marginLeft: 'auto'}} fontSize="small" /></ListItemIcon>
      </MenuItem>
    )
  }

  return (
  <Paper>
    <Grid container>
      {/* MAP */}
      <Grid item lg={4} xl={3} sx={{
        display: {xs: 'none', lg: 'flex'},
        borderRight: (theme) => `1px solid ${theme.palette.divider}`,
      }}>
        <Grid item xs={12} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%'}}>
          <PortMap 
            handlePortHover={setPortHover}
            handlePortClick={handlePortClick} 
            selectedPort={selectedPort} 
            hoveredPort={portHover} />
        </Grid>
      </Grid>
      <Grid item xs={12} lg={8} xl={9}>
        <Grid container>
          {/* CENTRAL REGION */}
          <Grid item xs={12} md={4} sx={{
            borderRight: (theme) => `1px solid ${theme.palette.divider}`,
            borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          }}>
            <MenuList dense={isMobile}>
              { renderRegion(airports.central.name, airports.central.code)}
              { airports.central.ports.map(renderPort)}
            </MenuList>
          </Grid>

          {/* SOUTH REGION */}
          <Grid item xs={12} md={4} sx={{
            borderRight: (theme) => `1px solid ${theme.palette.divider}`,
            borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          }}>
            <MenuList dense={isMobile}>
              { renderRegion(airports.south.name, airports.south.code)}
              { airports.south.ports.map(renderPort)}
            </MenuList>
          </Grid>

          {/* HEATHROW*/}
          <Grid item xs={12} md={4} sx={{
            borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          }}>
            <MenuList dense={isMobile}>
              { renderRegion(airports.heathrow.name, airports.heathrow.code)}
              { airports.heathrow.ports.map(renderPort)}
            </MenuList>
          </Grid>
        </Grid>

         {/* NORTHERN REGION */}
        <Grid container>
          <Grid item xs={12} md={4}>
            <MenuList dense={isMobile}>
              { renderRegion(airports.north.name, airports.north.code)}
              { airports.north.ports.filter((port, index) => index < (airports.north.ports.length / 2)).map(renderPort)}
              { isMobile && airports.north.ports.filter((port, index) => index > (airports.north.ports.length / 2)).map(renderPort) }
            </MenuList>
          </Grid>
          { !isMobile && <Grid item xs={12} md={4} sx={{
            borderRight: (theme) => `1px solid ${theme.palette.divider}`,
          }}>
            <MenuList sx={{pt: {md:'44px'}}}> 
              { airports.north.ports.filter((port, index) => index > (airports.north.ports.length / 2)).map(renderPort)}
            </MenuList>
          </Grid>}
        </Grid>
      </Grid>
    </Grid>
  </Paper>
 )
}
export default PortPanel
