import React, {createRef, useEffect, useState, useContext} from "react";
import { Box, CssBaseline,  Badge, Toolbar, IconButton, Drawer as MuiDrawer, Typography, Grid, useMediaQuery,  CircularProgress,  Backdrop, BoxProps,  Paper, LinearProgress, IconButtonProps, BackdropProps, List, ListItemButton, ListItemIcon } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { ThemeProvider } from '@mui/material/styles';
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import HelpIcon from '@mui/icons-material/Help';
import { Theme } from "@mui/material";
import { styled } from '@mui/material/styles';
import { Crest } from "./Crest";
import { getAirportByCode } from "../../aiports";
import {PageNav} from "./Navigation";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

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

const DrtBackdrop = styled(Backdrop)<BackdropProps>(({ theme }) => ({
  backgroundColor: 'rgba(0,0,0,0.1)', 
  backdropFilter: 'blur(2px)',
  zIndex: theme.zIndex.drawer + 1,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    height: '100%',
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      ...(!open && {
        transition: theme.transitions.create('width', {
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
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );
  const drtTheme = createDRTTheme(mode);

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


  const [port, setPort] = useState('');
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
    scrollRef.current!.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
    setPos(false);
  };

  const [loading, setLoading] = useState(false);
  const flashLoading = () => {
    setLoading(true);
    setTimeout(() =>{
      setLoading(false);
    }, 2000)
  };

  const handlePortClick = (port: string) => {
    setPort(port);
    flashLoading()
  }


  return <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={drtTheme}>
      <Wrapper>
        <CssBaseline />
        <AppBar color="transparent" elevation={0} position={"sticky"}>
          <Toolbar>
            {isMobile && <IconButton
              onClick={toggleDrawer}
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
            >
              <MenuIcon />
            </IconButton>}
            <Box display="flex" mr={'auto'} ml={isMobile ? 'auto' : '0'}>
              <Crest />
              <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>DRT</Typography>
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: '10px' }}>
              <PortSelector handleChangePort={handleChangePort} port={port} />
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
            </Box>
            <UserMenu />
          </Toolbar>
        </AppBar>
        {/* MOBILE DRAWER */}
        <MuiDrawer variant={"temporary"} anchor="left" open={drawerOpen} sx={{display: {xs: 'block', md:'none'},zIndex: (theme) => theme.zIndex.drawer + 3}}>
          <PageNav drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} selectedPort={port} themeToggle={colorMode.toggleColorMode}  />
        </MuiDrawer>

        {/* PROGRESS STRIP */}
        <LinearProgress color="primary" sx={{width: '100%', height: loading ? '4px': '0px', position: 'absolute', top: { xs: '57px', sm: '65px'}, zIndex: 2000}} />
        
        <Grid container sx={{alignItems: 'start', height: '100%', flexWrap: 'nowrap'}}>
          {/* DESKTOP DRAWER */}
          <Grid item sx={{height: '100%', display: {xs: 'none', md: 'block'}}}>
            <Drawer variant={"permanent"} hideBackdrop={false} open={drawerOpen}>
              <PageNav drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} selectedPort={port} themeToggle={colorMode.toggleColorMode} />
            </Drawer>
          </Grid>
          {/* PAGE CONTENT */}
          <PageContent sx={{position: 'relative'}}>
            <Box ref={scrollRef} sx={{ paddingX: { xs: 2, md: 4}, flexGrow: 1, overflowY: 'scroll', opacity: loading ? 0.4 : 1}}>
              <Box sx={{mb: 4, mt: 3}}>
                <Typography variant="pageTitle" component="h1">{port != '' ? getAirportByCode(port) : "Select an airport or region"}</Typography>
              </Box>
              <Grid container spacing={4} sx={{pb: 12}}>
                <Grid item xs={12}>
                  <PortPanel handlePortClick={handlePortClick} selectedPort={port} />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <Paper><Box sx={{p:4, pb: 25}}></Box>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <Paper><Box sx={{p:4, pb: 25}}></Box>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <Paper><Box sx={{p:4, pb: 25}}></Box></Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper><Box sx={{p:4, pb: 25}}></Box></Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper><Box sx={{p:4, pb: 25}}></Box>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper><Box sx={{p:4, pb: 25}}></Box></Paper>
                </Grid>
              </Grid>
            </Box>

            {/* SCROLL TO TOP  */}
            <ScrollToTopBtn color="primary" style={{ position: "fixed", bottom: 20, right: 30, display: pos ? "block" : "none" }} onClick={handleTop} >
              <ArrowUpwardIcon/>
            </ScrollToTopBtn>

            {/* LOADING BACKDROP */}
            <DrtBackdrop open={loading}>
              <CircularProgress color="primary" />
            </DrtBackdrop>
          </PageContent>
        </Grid>
      </Wrapper >
    </ThemeProvider>
  </ColorModeContext.Provider>
}

export default SiteFrame;
