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
import {PageNav} from "./Navigation";

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


  const [port, setPort] = useState('LGW');
  const handleChangePort = (event: SelectChangeEvent<unknown>) => {
    setPort(event.target.value as string);
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

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  return <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={drtTheme}>
      <Wrapper>
        <CssBaseline />
        <AppBar color="transparent" elevation={0} position={"sticky"}>
          <Grid container>
            <Grid item xs={6}>
              <Box display="flex" mr={'auto'} ml={isMobile ? 'auto' : '0'} sx={{padding: 2}}>
                <Crest />
                <Typography variant="logoTitle" color="inherit" noWrap sx={{ flexGrow: 0, fontSize: '1.3rem', mr: 2 }}>Border Force</Typography>
                <Typography variant="logoStrap" color="inherit" noWrap sx={{ flexGrow: 1, lineHeight: '2rem' }}>Dynamic Response Tool</Typography>
              </Box></Grid>
            <Grid item xs={6} sx={{padding: 2}}>
              <Box display="flex" ml={'auto'} mr={isMobile ? 'auto' : '0'}>
                <Typography variant="body1" color="inherit" noWrap sx={{ flexGrow: 1, textAlign: 'right' }}><strong>Contact:</strong>&nbsp;<Link>drtpoiseteam@homeoffice.gov.uk</Link></Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sx={{backgroundColor: '#f3f5f9', padding: 2}}>
                {isMobile && <IconButton
                  onClick={toggleDrawer}
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                >
                  <MenuIcon />
                </IconButton>}
                <Grid container spacing={3}>
                  <Grid item flexGrow={0}>
                    <PortSelector handleChangePort={handleChangePort} port={port} />
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
        {/* MOBILE DRAWER */}

        {/* PROGRESS STRIP */}
        <LinearProgress color="primary" sx={{width: '100%', height: loading ? '4px': '0px', position: 'absolute', top: { xs: '57px', sm: '129px'}, zIndex: 2000}} />
        
        <Grid container sx={{alignItems: 'start', height: '100%', flexWrap: 'nowrap'}}>
          {/* PAGE CONTENT */}
          <PageContent sx={{position: 'relative'}} ref={scrollRef} >
            

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
