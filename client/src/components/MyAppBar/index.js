import * as React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

// This component represents the app bar that will be displayed at the top of the application.
const MyAppBar = () => {
  return (
    // The AppBar component from Material-UI is used to create the top app bar.
    <AppBar position="static">
      <Toolbar>
        {/* The Typography component displays the title "Ultra Review" with a variant of "h3". */}
        <Typography variant="h3">Ultra Review</Typography>

        {/* The following div contains a set of Button components used as navigation links. */}
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
