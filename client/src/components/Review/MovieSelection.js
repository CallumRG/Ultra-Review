import * as React from 'react';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';

const MovieSelection = (props) => {

  return (
    <>
      {/* allows for movie selection */}
      {/* form */}
      <FormControl sx = {{minWidth: 200}}>
        <InputLabel>Select a movie</InputLabel>
        <Select
          autoWidth
          value={props.selectedMovieID}
          onChange={props.changeMovie}
          error = {props.movieError}
          label = "Select a movie"
          variant = "standard"
        >
          {/* Map through the movie titles and create a MenuItem for each one */}
          {Object.keys(props.movies).map((movieID) => (
            <MenuItem
              //stores the movie id
              key={movieID}
              value={movieID}
            >
             {/*displays the movie name from the grabbing the data with the id */}
              {props.movies[movieID].name}
            </MenuItem>
          ))}
        </Select>
        {/* Display error message if movieError is true */}
        <FormHelperText error = {props.movieError}>{(props.movieError ? "Please select movie." : "")}</FormHelperText>
      </FormControl>

    </>
  );
}


export default MovieSelection;