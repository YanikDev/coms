import React from 'react';
import { Button, Typography } from '@mui/material';

const Home = () => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Welcome to COMS
      </Typography>
      <Button variant="contained" color="primary">
        Get Started
      </Button>
    </div>
  );
};

export default Home;
