import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Typography, Button, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LockIcon from '@mui/icons-material/Lock';
import Logo from './logo-txt-sm.png'; // Ensure this path is correct
import { Amplify } from 'aws-amplify';
import awsconfig from '../aws-exports'; // Ensure this path is correct

Amplify.configure(awsconfig);

const Header = ({ signOut, user }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [showLockMessage, setShowLockMessage] = useState(false);
  const hasPaid = user?.hasPaidForFAAPart107;

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigation = (path, locked) => {
    if (locked) {
      setShowLockMessage(true);
    } else {
      setShowLockMessage(false);
      navigate(path);
    }
    handleClose();
  };

  return (
    <AppBar position="static" color="default" elevation={4} sx={{ backgroundColor: '#fff', boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)' }}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          sx={{ color: '#000', ml: 2 }} // Adjusted for margin left
          onClick={handleMenuClick}
        >
          <MenuIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
          <img src={Logo} alt="logo" style={{ height: '30px' }} />
        </Box>
        <Button color="inherit" sx={{ color: '#000', mr: 2 }} // Adjusted for margin right
                onClick={signOut}>Logout</Button>
      </Toolbar>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => navigate('/')}>Profile</MenuItem>
        <MenuItem onClick={() => handleNavigation('/course', !hasPaid)}>
          Course { !hasPaid && <LockIcon fontSize="small" /> }
        </MenuItem>
        <MenuItem onClick={() => handleNavigation('/test-landing', !hasPaid)}>
          Testing { !hasPaid && <LockIcon fontSize="small" /> }
        </MenuItem>
        <MenuItem onClick={() => navigate('/resources')}>Resources</MenuItem>
      </Menu>
      {showLockMessage && (
        <Typography color="error" sx={{ textAlign: 'center' }}>
          Locked: Please purchase the course to unlock
        </Typography>
      )}
    </AppBar>
  );
};

export default Header;