import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, CardMedia } from '@mui/material';
import Logo from './logo-txt-sm.png';

function Success() {
  // Assuming you might uncomment and use the useState and useEffect for fetching completed tests in the future
  // const [completedTests, setCompletedTests] = useState([]);

  useEffect(() => {
    // Fetch completed tests data here and set it to the state if needed
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 4 }}>
      <Card sx={{ maxWidth: 600, mt: 5 }}>
        <CardContent sx={{ textAlign: 'center' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <CardMedia
              component="img"
              image={Logo}
              alt="logo"
              sx={{ width: 128, height: 'auto' }}
            />
          </Box>
          <Typography variant="h5" component="div" sx={{ mb: 2 }}>
            Payment Successful!
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Thank you for your payment. Your transaction has been completed, and a receipt has been emailed to you.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Success;