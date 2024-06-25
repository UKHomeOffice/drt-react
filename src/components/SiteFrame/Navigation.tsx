import React from "react";
import {  ListItemIcon,ListItemText, ListItemButton, List, Divider, Badge, useTheme } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BarChartIcon from "@mui/icons-material/BarChart";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PublicIcon from '@mui/icons-material/Public';
import SchoolIcon from '@mui/icons-material/School';
import SpeedIcon from '@mui/icons-material/Speed';
import ConnectingAirportsIcon from '@mui/icons-material/ConnectingAirports';
import { getAirportByCode } from "../../aiports";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

interface IPageNav {
  toggleDrawer: () => void;
  drawerOpen: boolean;
  selectedPort: string;
  themeToggle: () => void;
}

export const PageNav = ({toggleDrawer, drawerOpen, selectedPort, themeToggle}: IPageNav) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  const isPortSelected = selectedPort !== ''
  return (
  <List component="nav" sx={{padding: 0, height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column'}}>
    <ListItemButton sx={{flexGrow: '0'}} onClick={toggleDrawer}>
      <ListItemIcon>
        {drawerOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </ListItemIcon>
    </ListItemButton>
    <Divider sx={{flexGrow: '0'}} /> 
    <ListItemButton sx={{flexGrow: '0'}} flexGrow={0} disabled={!isPortSelected}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary={`${selectedPort} Dashboard`} />
    </ListItemButton>
    <ListItemButton sx={{flexGrow: '0'}} flexGrow={0} disabled={!isPortSelected}>
      <ListItemIcon>
        <CalendarMonthIcon />
      </ListItemIcon>
      <ListItemText primary={`${selectedPort} Planning`} />
    </ListItemButton>
    <ListItemButton sx={{flexGrow: '0'}} disabled={!isPortSelected}>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary={`${selectedPort} Reports`} />
    </ListItemButton>
    <Divider sx={{flexGrow: '0'}} />
    <ListItemButton sx={{flexGrow: '0'}}>
      <ListItemIcon>
        <ManageAccountsIcon />
      </ListItemIcon>
      <ListItemText primary="Users" />
    </ListItemButton>
    <ListItemButton sx={{flexGrow: '0'}}>
      <ListItemIcon>
        <SchoolIcon />
      </ListItemIcon>
      <ListItemText primary="Training" />
    </ListItemButton>
    <Divider sx={{flexGrow: '0'}} />
    <ListItemButton sx={{flexGrow: '0'}}>
      <ListItemIcon>
        <ConnectingAirportsIcon />
      </ListItemIcon>
      <ListItemText primary="Port config" />
    </ListItemButton>
    <ListItemButton sx={{flexGrow: '0'}}>
      <ListItemIcon>
        <Badge variant="dot" color="success">
          <SpeedIcon />
        </Badge>
      </ListItemIcon>
      <ListItemText primary="API Status" />
    </ListItemButton>
    <Divider sx={{flexGrow: '0'}} />
    <Divider sx={{flexGrow: '0', mt: 'auto', position: 'relative', top: '-65px'}} />
    <ListItemButton sx={{flexGrow: '0', position: 'relative', top: '-65px'}} onClick={themeToggle}>
      <ListItemIcon>
        {isDarkMode ? <DarkModeIcon /> : <LightModeIcon />}
      </ListItemIcon>
      <ListItemText primary="Toggle dark mode" />
    </ListItemButton>
  </List>
 )
}
