import React from 'react';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Welcome to COMS
      </Typography>
      <Button variant="contained" color="primary">
        Get Started
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => navigate('/visitor')}
        style={{ marginLeft: '10px' }}
      >
        Visitor Form
      </Button>
    </div>
  );
};

export default Home;
