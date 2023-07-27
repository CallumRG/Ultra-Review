import * as React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, rgbToHex } from '@mui/material';

const MyAppBar = () => {
  return (
    <AppBar position="static">
      <Toolbar >
        <Typography variant = "h3">Ultra Review</Typography>
        <div style={{ marginLeft: '2rem' }}>
          <Button variant="contained" color="primary" component={Link} to="/">Landing</Button>
          <Button variant="contained" color="primary" component={Link} to="/search">Search</Button>
          <Button variant="contained" color="primary" component={Link} to="/review">Review</Button>
          <Button variant="contained" color="primary" component={Link} to="/mypage">Trivia</Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default MyAppBar;