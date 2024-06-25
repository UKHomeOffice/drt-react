import React, {useState} from "react";
import { Box,  IconButton, Typography, Avatar, Button,Popover, Card, CardContent, CardActions } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';



const UserMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box ml={{xs: 0, md: '10px'}}>
      <IconButton
        onClick={handleClick}
        size="large"
        edge="end"
        aria-label="account of current user"
        aria-haspopup="true"
        color="inherit"
      >
        <PersonIcon />
      </IconButton>
      <Popover
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          elevation: 1,
        }}
      >
        <Card sx={{ width: '300px'}}>
          <CardContent sx={{textAlign: 'center'}}>
            <Avatar sx={{ width: 56, height: 56, mx: 'auto', my: 2 }}>EC</Avatar>
            <Typography gutterBottom variant="h5" component="div">
              Example Caseworker
            </Typography>
            <Typography gutterBottom variant="subtitle1" component="div">
              example.caseworker@example.
            </Typography>
          </CardContent>
          <CardActions sx={{justifyContent: 'center', mb: 2, pt: 0}}>
            <Button color="secondary" size="small">Settings</Button>
            <Button color="secondary" size="small">Logout</Button>
          </CardActions>
        </Card>
      </Popover> 
    </Box>
  )
}

export default UserMenu;
