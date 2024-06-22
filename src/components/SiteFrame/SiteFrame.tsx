import React, {createRef, useEffect, useState} from "react";
import { Box, CssBaseline, List, ListItemButton, ListItemIcon,ListItemText, Badge, Toolbar, IconButton, Drawer as MuiDrawer, Typography, Grid, useMediaQuery, Select, MenuItem, SelectProps, FormControl, CircularProgress, Divider, Backdrop, TextField, FormLabel, BoxProps, InputAdornment, Paper, InputBase, LinearProgress, IconButtonProps, BackdropProps } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MenuIcon from "@mui/icons-material/Menu";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import LocalAirportIcon from '@mui/icons-material/LocalAirport';
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import AccountCircle from '@mui/icons-material/AccountCircle';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import LayersIcon from "@mui/icons-material/Layers";
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import HelpIcon from '@mui/icons-material/Help';
import { Theme } from "@mui/material";
import { styled } from '@mui/material/styles';
import { Crest } from "./Crest";

export interface ISiteFrame {}


const drawerWidth: number = 240;

const AirportSelect = styled(Select)<SelectProps>(({ theme }) => ({
  minWidth: '280px',
  outline: 0,
  marginRight: theme.spacing(1),
  '& .MuiSelect-select': {
    borderWidth: '0 !important',
    display: 'flex',
    paddingRight: '40px !important',
    gap: '10px',
    '& >*': {
      display: 'flex',  
      alignItems: 'center',
      minWidth: 0,
    }
  }
}));


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
  backgroundColor: theme.palette.grey[100],
  alignItems: 'stretch',
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  backgroundColor: theme.palette.common.white,
  borderBottom: `1px solid ${theme.palette.grey[300]}`,
  zIndex: theme.zIndex.drawer - 1,
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

const DrtBackdrop = styled(Backdrop)<BackdropProps>(({ theme }) => ({
  backgroundColor: 'rgba(255,255,255,0.6)', 
  backdropFilter: 'blur(1px)',
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    height: '100%',
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      overflow: 'hidden',
      transition: theme.transitions.create('all', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('all', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: 0,
        [theme.breakpoints.down('sm')]: {
          borderRight: 'none',
        },
        [theme.breakpoints.up('sm')]: {
          width: '58px',
        },
      }),
    },
  }),
);


const SiteFrame = ({}: ISiteFrame) => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const scrollRef = createRef<HTMLDivElement>()
  useEffect(() => {
    const temp = scrollRef.current!;
    temp.addEventListener("scroll", handleScroll);
    return () => temp.removeEventListener("scroll", handleScroll);
  });


  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };


  const [port, setPort] = useState('LGW');
  const handleChangePort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPort(event.target.value);
    flashLoading()
  };

  const [pos, setPos] = useState(false);
  const handleScroll = () => {
    if (scrollRef.current!.scrollTop > 50) {
      if (!pos) setPos(true);
    } else {
      if (pos) setPos(false);
    }
  };
  const handleTop = () => {
    scrollRef.current!.scrollTop = 0;
    setPos(false);
  };

  const [loading, setLoading] = useState(true);
  const flashLoading = () => {
    setLoading(!loading);
  };


  return <Wrapper>
    <CssBaseline />
      <AppBar color="transparent" elevation={0} position={isMobile ? "absolute" : "sticky"}>
        <Toolbar>
          {isMobile && <IconButton
            onClick={toggleDrawer}
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>}
          <Crest />
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}>
            Dynamic Response Tool
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: '10px' }}>
            {/* <Paper
              variant="appbar"
              sx={{ p: '2px 4px', mR: '10px', display: 'flex', alignItems: 'center', width: 400 }}
            >
              <IconButton sx={{ p: '10px' }} aria-label="menu" size="small">
                <SearchIcon />
              </IconButton>
              <InputBase
                size="small"
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search DRT..."
                inputProps={{ 'aria-label': 'search google maps', sx: {pb: 0} }}
              />
              <IconButton type="button" sx={{ p: '10px' }} aria-label="search" size="small">
                <ArrowRightIcon />
              </IconButton>
            </Paper>
            <Divider orientation="vertical" flexItem sx={{margin: '0 10px'}} /> */}
            <FormLabel sx={{textAlign: 'right', textTransform: 'uppercase', fontSize: '0.8em', letterSpacing: '1px', display: 'flex', alignItems: 'center' }}>Select an <br/>airport/region:</FormLabel>
            <FormControl size="small">
              <AirportSelect value={port} onChange={handleChangePort}>
                <MenuItem value={'LGW'}>
                  <ListItemIcon><LocalAirportIcon fontSize="small" /></ListItemIcon>
                  <ListItemText>London Gatwick </ListItemText>
                  <Typography variant="body2" color="text.secondary">LGW</Typography>
                </MenuItem>
                <MenuItem value={'LHR'}>
                  <ListItemIcon><LocalAirportIcon fontSize="small" /></ListItemIcon>
                  <ListItemText>London Heathrow </ListItemText>
                  <Typography variant="body2" color="text.secondary">LHR</Typography>
                </MenuItem>
              </AirportSelect>
            </FormControl>
            <Divider orientation="vertical" flexItem  />
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
                <HelpIcon />
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <LinearProgress color="primary" sx={{width: '100%', height: loading ? '4px': '0px', position: 'absolute', top: { xs: '57px', sm: '65px'}, zIndex: 2000}} />
      <Grid container sx={{alignItems: 'start', height: '100%', flexWrap: 'nowrap'}}>
        <Grid item sx={{height: '100%'}}>
          <Drawer variant="permanent" hideBackdrop={false} open={drawerOpen}>
            <List component="nav">
              <ListItemButton onClick={toggleDrawer}>
                <ListItemIcon>
                  {drawerOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </ListItemIcon>
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="Orders" />
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Customers" />
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="Reports" />
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <LayersIcon />
                </ListItemIcon>
                <ListItemText primary="Integrations" />
              </ListItemButton>

              <Divider />
            </List>
          </Drawer>
        </Grid>
        <PageContent sx={{position: 'relative'}}>
          <Box ref={scrollRef} sx={{ paddingX: 4, flexGrow: 1, overflowY:  loading ? 'hidden' : 'scroll', opacity: loading ? 0.4 : 1}}>
            <Box sx={{mb: 4, mt: 3}}>
              <Typography variant="h1" component="h1">London Gatwick</Typography>
            </Box>
            <Grid container spacing={4} sx={{pb: 12}}>
              <Grid item xs={12} md={6} lg={4}>
                <Paper><Box sx={{p:4, pb: 25}}></Box></Paper>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <Paper><Box sx={{p:4, pb: 25}}></Box></Paper>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <Paper><Box sx={{p:4, pb: 25}}></Box></Paper>
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <Paper><Box sx={{p:4, pb: 20}}></Box></Paper>
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <Paper><Box sx={{p:4, pb: 20}}></Box></Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper><Box sx={{p:4, pb: 80}}></Box></Paper>
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <Paper><Box sx={{p:4, pb: 20}}></Box></Paper>
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <Paper><Box sx={{p:4, pb: 20}}></Box></Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper><Box sx={{p:4, pb: 80}}></Box></Paper>
              </Grid>
            </Grid>
          </Box>
          <ScrollToTopBtn
            color="primary"
            style={{
              position: "fixed",
              bottom: 20,
              right: 30,
              display: pos ? "block" : "none"
            }}
            onClick={handleTop}
          >
            <ArrowUpwardIcon/>
          </ScrollToTopBtn>
          <DrtBackdrop open={loading}>
            <CircularProgress color="primary" />
          </DrtBackdrop>
        </PageContent>
    </Grid>
  </Wrapper >
}

export default SiteFrame;
