import React from "react";
import {AppBar, Box, Button, Grid, Link, Menu, MenuItem, Typography} from "@mui/material";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {Crest} from './Crest';
import {DynamicIcon, IconNames} from './DynamicIcon';
import PortSelector from "./PortSelector";

export type MenuItem = {
  label: string,
  link: string,
  roles?: string[],
  icon?: IconNames | string,
}

export interface IHeader {
  userRoles: string[],
  adminMenuItems: MenuItem[],
  leftMenuItems?: MenuItem[],
  rightMenuItems?: MenuItem[],
  portMenuItems: MenuItem[],
  initialSelectedPortMenuItem: string,
  maxWidth: string,
  routingFunction: (route: string) => void,
  logoutLink: () => void,
}

const linkStyles = {
  textTransform: 'none',
  color: '#000',
}

const Header = ({
                  userRoles,
                  adminMenuItems,
                  rightMenuItems,
                  leftMenuItems,
                  portMenuItems,
                  initialSelectedPortMenuItem,
                  maxWidth,
                  routingFunction,
                  logoutLink
                }: IHeader) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedPortOption, setSelectedPortOption] = React.useState<string>(initialSelectedPortMenuItem);
  const adminMenuOpen = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const adminMenuRoles = adminMenuItems.map(menuItem => menuItem.roles).flat(1);
  const hasAdminMenuRoles = userRoles.filter(role => adminMenuRoles.includes(role)).length > 0;

  return (
    <AppBar sx={{backgroundColor: '#fff'}} elevation={0} position={"sticky"}>
      <Box>
        <Grid container sx={{maxWidth, margin: '0 auto', padding: '12px'}} maxWidth={'none'}>
          <Grid item xs={8}>
            <Box display="flex" mr={'auto'} sx={{
              padding: {
                xs: 0,
                md: 2,
              },
              '& svg': {
                width: '35px'
              }
            }}>
              <Link
                title="Border Force - Dynamic Response Tool"
                href="https://drt.homeoffice.gov.uk/"
                style={{
                  width: '100%',
                  display: 'flex',
                  textDecoration: 'none',
              }}>
                <Crest data-testid="crest"/>
                <Grid container sx={{
                  flexWrap: {
                    xs: 'wrap',
                    md: 'nowrap',
                  }
                }}>
                  <Grid item>
                    <Typography color="inherit" noWrap sx={{
                      flexGrow: 0,
                      fontSize: {
                        xs: '1rem',
                        sm: '1.3rem',
                      },
                      lineHeight: {
                        xs: '1.2rem',
                        sm: '2rem',
                      },
                      mr: 2,
                      mb: 0,
                      color: '#000'
                    }}>
                      Home Office
                    </Typography>
                  </Grid>
                  <Grid item sx={{
                    textAlign: {
                      xs: 'left',
                      sm: 'center'
                    },
                    flexGrow: 1,
                    width: {
                      xs: '100%',
                      sm: 'auto',
                    }
                  }}>
                    <Typography color="inherit" noWrap
                      sx={{
                        flexGrow: 0,
                        color: '#404252',
                        mb: 0,
                        fontSize: {
                          xs: '14px',
                          sm: '24px',
                        },
                      }}>
                        Dynamic Response Tool
                    </Typography>
                  </Grid>
                </Grid>
              </Link>
            </Box>
          </Grid>
          <Grid item xs={4} sx={{padding: 2}} display={{xs: 'none', md: 'block'}}>
            <Box display="flex" ml={'auto'}>
              <Typography variant="body1" noWrap color={'#000'}
                          sx={{flexGrow: 1, textAlign: 'right', mb: 0}}><strong>Contact:</strong>&nbsp;<Link
                href="mailto:drtpoiseteam@homeoffice.gov.uk">drtpoiseteam@homeoffice.gov.uk</Link></Typography>
            </Box>
          </Grid>
          {hasAdminMenuRoles &&
            <Grid item xs={4} sx={{padding: {
              xs: 0,
              md: 2,
            }, textAlign: 'right'}} display={{xs: 'block', md: 'none'}}>

              <Button
                data-testid="mobile-admin-menu-trigger"
                variant="contained"
                aria-controls={adminMenuOpen ? 'demo-positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={adminMenuOpen ? 'true' : undefined}
                onClick={handleClick}
                sx={{marginLeft: 'auto', display: {xs: 'block', md: 'none'}}}
              >
                Menu
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={adminMenuOpen}
                onClose={handleClose}
              >
                {adminMenuItems.map((item) => {
                  const hasRole = item.roles && (item.roles.filter(role => userRoles.includes(role)).length > 0);
                  return hasRole && <MenuItem
                    data-testid={`menu-${item.link}`}
                    key={item.link}
                    onClick={() => {
                      setAnchorEl(null)
                      routingFunction(item.link)
                    }}>
                    {item.label}
                  </MenuItem>
                })}
              </Menu>
            </Grid>}
        </Grid>
      </Box>
      <Box sx={{backgroundColor: '#f3f5f9', flexWrap: 'nowrap'}}>
        <Grid container sx={{maxWidth, margin: '0 auto'}}>
          <Grid item xs={12} sx={{backgroundColor: '#f3f5f9', px: 2, py: {
            xs: '6px',
            md: '12px',
          }, flexWrap: 'nowrap'}}>
            <Grid container spacing={3}>
              <Grid item flexGrow={{xs: 1, md: 0}}>
                <PortSelector options={portMenuItems}
                              handleChangePort={routingFunction}
                              selectedOption={selectedPortOption}/>
              </Grid>
              {
                leftMenuItems && leftMenuItems.map((menuItem) => {

                  return (
                    <Grid key={menuItem.link} item flexGrow={0} display={{xs: 'none', md: 'flex'}}>
                      <Button
                        onClick={() => routingFunction(menuItem.link)}
                        data-testid={`left-menu-${menuItem.link}`}
                        variant="text"
                        startIcon={<DynamicIcon
                          iconName={menuItem.icon as IconNames}/>}
                        sx={linkStyles}>
                        {menuItem.label}
                      </Button>
                    </Grid>
                  )
                })
              }
              <Grid item display={{xs: 'none', md: 'flex'}} flexGrow={1}></Grid>
              <Grid item display={{xs: 'none', md: 'flex'}}>
                <Grid container sx={{height: '100%'}} gap={4}>
                  { hasAdminMenuRoles &&
                    <Grid item sx={{marginLeft: 'auto'}} flexGrow={0} display={{xs: 'none', md: 'flex'}}>
                      <Button
                        data-testid="desktop-admin-menu-trigger"
                        variant="text"
                        startIcon={<ManageAccountsIcon/>}
                        endIcon={<ArrowDropDownIcon/>}
                        onClick={handleClick}
                        sx={{...linkStyles, display: {xs: 'none', md: 'inline-flex'}}}
                      >
                        Admin
                      </Button>
                    </Grid> }
                  {
                    rightMenuItems && rightMenuItems.map((menuItem) => {

                      return (
                        <Grid key={menuItem.link} item flexGrow={1} display={{xs: 'none', md: 'flex'}}>
                          <Button
                            onClick={() => routingFunction(menuItem.link)}
                            data-testid={`right-menu-${menuItem.link}`}
                            variant="text"
                            startIcon={<DynamicIcon iconName={menuItem.icon as IconNames}/>}
                            sx={linkStyles}>
                            {menuItem.label}
                          </Button>
                        </Grid>
                      )
                    })
                  }
                  <Grid item flexGrow={1} display={{xs: 'none', md: 'flex'}} sx={{textAlign: 'right'}}>
                    <Button data-testid="logout" onClick={() => logoutLink()} variant="text" startIcon={<LogoutIcon/>}
                            sx={linkStyles}>Logout</Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </AppBar>
  )
}

export default Header;
