import React, {createRef, useEffect, useState, useContext} from "react";
import { Box, CssBaseline,  Button, IconButton, Drawer as MuiDrawer, Typography, Grid, useMediaQuery,  CircularProgress,  Backdrop, BoxProps, Menu, MenuItem, LinearProgress, IconButtonProps, BackdropProps, SelectChangeEvent, Link, ButtonProps } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { ThemeProvider } from '@mui/material/styles';
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from '@mui/icons-material/Notifications';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import HelpIcon from '@mui/icons-material/Help';
import { Theme } from "@mui/material";
import { styled } from '@mui/material/styles';
import { Crest } from "./Crest";
import { getAirportByCode } from "../../aiports";

import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ArticleIcon from '@mui/icons-material/Article';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import PortSelector from "../PortSelector";
import PortPanel from "../PortSelector/PortPanel";
import {createDRTTheme} from "../../drt-theme";
import UserMenu from "./UserMenu";

export interface ISiteFrame {}


const drawerWidth: number = 240;
const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const Wrapper = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  alignItems: 'flex-start',
  overflow: 'hidden',
}));

const ScrollToTopBtn = styled(IconButton)<IconButtonProps>(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  width: '40px',
  height: '40px',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,  
  }
}));

const PageContent = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  height: '100%',
  flexGrow: 1,
  backgroundColor: theme.palette.mode === 'light' ? theme.palette.grey[100] : 'transparent',
  alignItems: 'stretch',
}));

const NavButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: '#000',
  textTransform: 'none',
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? 'transparent' : theme.palette.common.white,
  borderBottom: `1px solid ${theme.palette.divider}`,
  zIndex: theme.zIndex.drawer + 2,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));


export const Header = ({}: ISiteFrame) => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar color="transparent" elevation={0} position={"sticky"}>
      <Grid container>
        <Grid item xs={8}>
          <Box display="flex" mr={'auto'} ml={isMobile ? 'auto' : '0'} sx={{
            padding: 2,
            '& svg': {
              width: '35px'
            }
          }}>
            <Crest />
            <Typography variant="logoTitle" color="inherit" noWrap sx={{ flexGrow: 0, fontSize: '1.3rem', mr: 2 }}>Border Force</Typography>
            <Typography variant="logoStrap" color="inherit" noWrap sx={{ flexGrow: 1, lineHeight: '2rem' }} display={{xs: 'none'}}>Dynamic Response Tool</Typography>
          </Box>
        </Grid>
        <Grid item xs={4} sx={{padding: 2}} display={{xs: 'none', md: 'block'}}>
          <Box display="flex" ml={'auto'} mr={isMobile ? 'auto' : '0'}>
            <Typography variant="body1" color="inherit" noWrap sx={{ flexGrow: 1, textAlign: 'right' }}><strong>Contact:</strong>&nbsp;<Link>drtpoiseteam@homeoffice.gov.uk</Link></Typography>
          </Box>
        </Grid>
        <Grid item xs={4} sx={{padding: 2}} display={{xs: 'block', md: 'none'}}>
          <Box display="flex" ml={'auto'} mr={isMobile ? 'auto' : '0'}>
            <Button
              variant="outlined" 
              id="demo-positioned-button"
              aria-controls={open ? 'demo-positioned-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              sx={{marginLeft: 'auto'}}
            >
              Menu
            </Button>
            <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </Box>
        </Grid>
        <Grid item xs={12} sx={{backgroundColor: '#f3f5f9', padding: 2, flexWrap: 'nowrap'}} display={{xs: 'none', md: 'block'}}>
            <Grid container spacing={3}>
              <Grid item flexGrow={0}>
                <PortSelector handleChangePort={() => {}} port={'GLA'} />
              </Grid>
              <Grid item flexGrow={0}>
                <NavButton variant="text" startIcon={<SettingsIcon />}>Port config</NavButton>
              </Grid>
              <Grid item flexGrow={0}>
              <NavButton variant="text" startIcon={<EqualizerIcon />}>Feed</NavButton>
              </Grid>
              <Grid item sx={{marginLeft: 'auto'}} flexGrow={0}>
                <NavButton
                  variant="text" 
                  startIcon={<ManageAccountsIcon />}
                  endIcon={<ArrowDropDownIcon />}
                  id="demo-positioned-button"
                  aria-controls={open ? 'demo-positioned-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                >
                  Admin
                </NavButton>
                <Menu
                  id="demo-positioned-menu"
                  aria-labelledby="demo-positioned-button"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                  <MenuItem onClick={handleClose}>Logout</MenuItem>
                </Menu>
              </Grid>
              <Grid item flexGrow={0}>
                <NavButton variant="text" startIcon={<ArticleIcon />}>News</NavButton>
              </Grid>
              <Grid item flexGrow={0}>
                <NavButton variant="text" startIcon={<MenuBookIcon />}>Training</NavButton>
              </Grid>
              <Grid item flexGrow={0}>
                <NavButton variant="text" startIcon={<LogoutIcon />}>Logout</NavButton>
              </Grid>
            </Grid>
        </Grid>
      </Grid>
    </AppBar>
  )
}

