import * as React from 'react';
import MyAppBar from '../MyAppBar';
import Typography from "@mui/material/Typography";
import { Grid } from '@mui/material';

const Landing = () => {
  return (
    <div>
      <Grid container spacing={2} sx={{ padding: 3 }}>
        <Grid item xs={12}>
          <MyAppBar />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4" align="center">
            Welcome to Ultra Review!
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" align="center">
            Discover and review your favorite movies with our site.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" align="center">
            Pages in the App:
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" align="center">
            <b>Search Page:</b> Search for movies by title, actor, and director. The results will show movie details along with user-entered reviews and average scores.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" align="center">
            <b>Review Page:</b> Write and read user reviews for movies. Share your thoughts and ratings with the movie-loving community.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" align="center">
            <b>MyPage:</b> Customize your experience with additional functionalities. Browse movie trailers, view recommendations based on your reviews, or read news articles about movie releases and actors.
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default Landing;