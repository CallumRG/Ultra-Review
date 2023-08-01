import * as React from 'react';
import Typography from "@mui/material/Typography";
import MyAppBar from '../MyAppBar';
import { Grid,TextField, Button } from '@mui/material';

const Search = () => {
  // State variables to store user inputs and search results
  const [enteredMovie, setEnteredMovie] = React.useState('');
  const [enteredActor, setEnteredActor] = React.useState('');
  const [enteredDirector, setEnteredDirector] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([]);

  // Event handlers for input changes
  const changeMovie = (event) => { setEnteredMovie(event.target.value) };
  const changeActor = (event) => { setEnteredActor(event.target.value) };
  const changeDirector = (event) => { setEnteredDirector(event.target.value) };
    
  // Function to handle the search submission
  const submit = async () => {
    try {
      const response = await fetch('/api/searchMovies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Sends the data to insert with the query
        body: JSON.stringify({
          enteredMovie: enteredMovie,
          enteredActor: enteredActor,
          enteredDirector: enteredDirector
        }),
      });
            
      // Doesn't get the ok response back i.e code 200
      if (!response.ok) {
        throw new Error('Error searching movies');
      }

      const searchData = await response.json();

      // Ensure the response is an array by parsing it using JSON.parse()
      const searchResultsArray = JSON.parse(searchData.express);
      setSearchResults(searchResultsArray);
      console.log(searchResultsArray);

    } catch (error) {
      console.error('Error adding review:', error);
    }
  }

  return (
    <div>
      <Grid container spacing={2} sx={{ padding: 3 }}>
        <Grid item xs={12}>
          <MyAppBar></MyAppBar>
        </Grid>
        <Grid item xs={12}>
          {/* title */}
          <Typography variant="h4" align="left">Search Movies:</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField sx={{ minWidth: 200 }}
            label="Movie Title"
            value={enteredMovie}
            onChange={changeMovie}></TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField sx={{ minWidth: 200 }}
            label="Actor" 
            value={enteredActor}
            onChange={changeActor}></TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField sx={{ minWidth: 200 }}
            label="Director" 
            value={enteredDirector}
            onChange={changeDirector}></TextField>
        </Grid>
        <Grid item xs={12}>
          {/* submitting button */}
          <Button variant="contained" onClick={submit}>Submit Search</Button>
        </Grid>
                
        {/* Display search results if available */}
        {searchResults.length > 0 && (
          <>
            <Grid item xs={12}>
              <Typography>Search Results:</Typography>
            </Grid>
            {searchResults.map((result) => (
              <>
                <Grid item xs={12}>
                  <hr></hr>
                  <Typography variant="h5" style={{ marginTop: '30px' }}>
                    {result.movie_name} by {result.director_name}:
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle">
                    Score: {result.average_score ? result.average_score + "/5" : "No reviews"}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  {/* Display individual reviews */}
                  {result.reviews && result.reviews.split(",").map((review, index) => (
                    <>
                      <Typography variant="subtitle" align="left" style={{ marginTop: '20px' }}>
                        Review {index + 1}:
                      </Typography>
                      <Typography variant="body1" align="left">
                        {/* Render each search result here */}
                        {review}
                      </Typography>
                      <br></br>
                    </>
                  ))}
                </Grid>
              </>
            ))}
          </>
        )}
      </Grid>
    </div>
  )
}

export default Search;
