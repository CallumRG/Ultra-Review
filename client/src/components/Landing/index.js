import * as React from 'react';
import MyAppBar from '../MyAppBar';
import Typography from "@mui/material/Typography";
import { Grid } from '@mui/material';

// This is a functional component named Landing
const Landing = () => {
  return (
    <div>
      {/* Grid container with spacing and padding */}
      <Grid container spacing={2} sx={{ padding: 3 }}>
        {/* Grid item for the AppBar */}
        <Grid item xs={12}>
          <MyAppBar />
        </Grid>
        {/* Grid item for the main heading */}
        <Grid item xs={12}>
          <Typography variant="h4" align="left">
            Welcome to Ultra Review!
          </Typography>
        </Grid>
        {/* Grid item for the subheading */}
        <Grid item xs={12}>
          <Typography variant="body1" align="left">
            Discover and review your favorite movies with our site.
          </Typography>
        </Grid>
        {/* Grid item for the section heading */}
        <Grid item xs={12}>
          <Typography variant="h5" align="left">
            Pages in the App:
          </Typography>
        </Grid>
        {/* Grid item for the description of the Search Page */}
        <Grid item xs={12}>
          <Typography variant="body1" align="left">
            <b>Search Page:</b> Search for movies by title, actor, and director. The results will show movie details along with user-entered reviews and average scores.
          </Typography>
        </Grid>
        {/* Grid item for the description of the Review Page */}
        <Grid item xs={12}>
          <Typography variant="body1" align="left">
            <b>Review Page:</b> Write user reviews for movies. Share your thoughts and ratings with the movie-loving community.
          </Typography>
        </Grid>
        {/* Grid item for the description of the Trivia */}
        <Grid item xs={12}>
          <Typography variant="body1" align="left">
            <b>Trivia:</b> Play and try to beat your high score in a fun director trivia game to test your cinema knowledge.
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default Landing;
