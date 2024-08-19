import React from "react";
import { Box, Button, AppBar, Typography, Grid, Menu, MenuItem, Link } from "@mui/material";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Crest } from './Crest';
import { DynamicIcon, IconNames } from './DynamicIcon';
import PortSelector from "./PortSelector";

export type MenuItem = {
  label: string,
  link: string,
  roles?: string[],
  icon?: IconNames | string,
}

export interface IHeader {
  user: {
    roles: string[]
  },
  config: any,
  adminMenuItems: MenuItem[],
  leftMenuItems?: MenuItem[],
  rightMenuItems?: MenuItem[],
  portMenuItems: MenuItem[],
  routingFunction: (route:string) => void,
  logoutLink: () => void,
}

const linkStyles = {
  textTransform: 'none',
  color: '#000',
}

const Header = ({user, adminMenuItems, rightMenuItems, leftMenuItems, portMenuItems, routingFunction, logoutLink}: IHeader) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const adminMenuRoles = adminMenuItems.map(menuItem => menuItem.roles).flat(1);
  const hasAdminMenuRoles = user.roles.filter(role => adminMenuRoles.includes(role)).length > 0;

  return (
    <AppBar sx={{backgroundColor: '#fff'}} elevation={0} position={"sticky"}>
      <Box>
        <Grid container sx={{maxWidth: '1200px', margin: '0 auto'}}>
          <Grid item xs={8}>
            <Box display="flex" mr={'auto'} sx={{
              padding: 2,
              '& svg': {
                width: '35px'
                }
              }}>
              <Crest data-testid="crest" />
              <Typography color="inherit" noWrap sx={{ flexGrow: 0, fontSize: '1.3rem', mr: 2, color: '#000' }}>Border Force</Typography>
              <Typography color="inherit" noWrap sx={{ flexGrow: 0, lineHeight: '2rem', fontSize: '1rem', color: '#000' }} display={{xs: 'none', md: 'block'}}>Dynamic Response Tool</Typography>
            </Box>
          </Grid>
          <Grid item xs={4} sx={{padding: 2}} display={{xs: 'none', md: 'block'}}>
            <Box display="flex" ml={'auto'}>
              <Typography variant="body1" color="inherit" noWrap sx={{ flexGrow: 1, textAlign: 'right' }}><strong>Contact:</strong>&nbsp;<Link href="mailto:drtpoiseteam@homeoffice.gov.uk">drtpoiseteam@homeoffice.gov.uk</Link></Typography>
            </Box>
          </Grid>
         { hasAdminMenuRoles && <Grid item xs={4} sx={{padding: 2, textAlign: 'right'}} display={{xs: 'block', md: 'none'}}>

              <Button
                data-testid="mobile-admin-menu-trigger"
                variant="outlined" 
                id="demo-positioned-button"
                aria-controls={open ? 'demo-positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{marginLeft: 'auto', display: {xs: 'block', md: 'none'}}}
              >
                Menu
              </Button>
              <Menu
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
                { adminMenuItems.map((item) => {
                  const hasRole = item.roles && (item.roles.filter(role => user.roles.includes(role)).length > 0);
                  return hasRole && <MenuItem 
                    data-testid={`menu-${item.link}`} 
                    key={item.link} 
                    onClick={() => routingFunction(item.link)}>
                      {item.label}  
                    </MenuItem>
                })}
              </Menu>
          </Grid>}
        </Grid>
      </Box>
      <Box sx={{backgroundColor: '#f3f5f9', flexWrap: 'nowrap'}}>
        <Grid container sx={{maxWidth: '1200px', margin: '0 auto'}}>
          <Grid item xs={12} sx={{backgroundColor: '#f3f5f9', padding: 2, flexWrap: 'nowrap'}}>
            <Grid container spacing={3}>
              <Grid item flexGrow={{xs: 1, md: 0}}>
                <PortSelector options={portMenuItems} handleChangePort={routingFunction} selectedOption={'/cwi'} />
              </Grid>
              {
                leftMenuItems && leftMenuItems.map((menuItem) => {
  
                  return (
                    <Grid key={menuItem.link} item flexGrow={0} display={{xs: 'none', md: 'block'}}>
                      <Button 
                        onClick={() => routingFunction(menuItem.link)}
                        data-testid={`left-menu-${menuItem.link}`} 
                        variant="text" 
                        startIcon={<DynamicIcon 
                        iconName={menuItem.icon as IconNames} />} 
                        sx={linkStyles}>
                        {menuItem.label}
                      </Button>
                    </Grid>
                  )
                })
              }
              { hasAdminMenuRoles && <Grid item sx={{marginLeft: 'auto'}} flexGrow={0} display={{xs: 'none', md: 'block'}}>
                <Button
                  data-testid="desktop-admin-menu-trigger"
                  variant="text" 
                  startIcon={<ManageAccountsIcon />}
                  endIcon={<ArrowDropDownIcon />}
                  id="demo-positioned-button" 
                  onClick={handleClick}
                  sx={{...linkStyles, display: {xs: 'none', md: 'inline-flex'}}}
                >
                  Admin
                </Button>
              </Grid> }
              {
                rightMenuItems && rightMenuItems.map((menuItem) => {
  
                  return (
                    <Grid key={menuItem.link} item flexGrow={0} display={{xs: 'none', md: 'block'}}>
                      <Button 
                        onClick={() => routingFunction(menuItem.link)}
                        data-testid={`right-menu-${menuItem.link}`} 
                        variant="text" 
                        startIcon={<DynamicIcon iconName={menuItem.icon as IconNames} />} 
                        sx={linkStyles}>
                          {menuItem.label}
                        </Button>
                    </Grid>
                  )
                })
              }
              <Grid item flexGrow={0} display={{xs: 'none', md: 'block'}}>
                <Button data-testid="logout" onClick={() => logoutLink()} variant="text" startIcon={<LogoutIcon />} sx={linkStyles}>Logout</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

      </Box>
    </AppBar>
  )
}

export default Header;
