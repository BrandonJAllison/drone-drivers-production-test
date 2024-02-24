import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Typography, Grid, Button } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import Logo from './logo-txt-sm.png'; // Ensure this path is correct

const Footer = ({ user }) => {
  const hasPaid = user?.hasPaidForFAAPart107;

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.paper',
        py: 3,
        borderTop: '4px solid orange',
        alignItems: 'center', // Align items vertically
      }}
    >
      <Container maxWidth="lg">
        
          <Grid item xs={6} display="flex" justifyContent="center" alignItems="center">
            <Link to="/">
              <img src={Logo} alt="Logo" style={{ maxHeight: '50px' }} />
            </Link>
          </Grid>
      
        
      
        <Grid container justifyContent="center" sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} My Drone Driver. All rights reserved.
          </Typography>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;