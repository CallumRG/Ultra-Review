import * as React from 'react';
import ReviewTitle from './ReviewTitle';
import ReviewBody from './ReviewBody';
import ReviewRating from './ReviewRating';
import MovieSelection from './MovieSelection';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import MyAppBar from '../MyAppBar';

const Review = () => {
  
  //states declarations
  //constants and functions declarations
  const [userID, setUserID] = React.useState(1);

  //each components state variables and errors
  const [selectedMovieID, setselectedMovieID] = React.useState('')
  const [movieError, setMovieError] = React.useState(false)

  const [enteredTitle, setEnteredTitle] = React.useState('')
  const [titleError, setTitleError] = React.useState(false)

  const [enteredBody, setEnteredBody] = React.useState('')
  const [bodyError, setBodyError] = React.useState(false)

  const [selectedRating, setSelectedRating] = React.useState(0)
  const [ratingError, setRatingError] = React.useState(false)
  
  //stateful movie list
  const [movies, setMovies] = React.useState({})

  //user's review
  const [review, setReview] =React.useState({
    visible : false,
    selectedMovieID : selectedMovieID,
    enteredTitle : enteredTitle,
    enteredBody : enteredBody,
    selectedRating : selectedRating
  })

  //upon the first render, the React code retrieve the list of all movie records from the movies table in MySQL.
  React.useEffect(() => {
    fetchMovies();
  }, []);

  //fetches the movies with a post 
  const fetchMovies = async () => {
    try {
      const response = await fetch('/api/getMovies', {
        method: 'POST',
      });
      
      //throws error if bad response
      if (!response.ok) {
        throw new Error('Error retrieving movies');
      }
      
      //awaits the data
      const movieData = await response.json();

      //sets the movie list
      setMovies(movieData);
    } catch (error) {
      //catches the error and throws a console error
      console.error('Error retrieving movies:', error);
    }
  };

  //handler function to change states given event
  const changeMovie = (event) => {setselectedMovieID(event.target.value)}
  const changeTitle = (event) => {setEnteredTitle(event.target.value)}
  const changeBody = (event) => {setEnteredBody(event.target.value)}
  const changeRating = (event) => {setSelectedRating(Number(event.target.value))}

  //validations for each error

  const validateMovieError = () => {
    let bool = selectedMovieID === ""
    setMovieError(bool)
    return bool
  }

  const validateTitleError = () => {
    let bool = enteredTitle === ""
    setTitleError(bool)
    return bool
  }

  const validateBodyError = () => {
    let bool = enteredBody === ""
    setBodyError(bool)
    return bool
  }

  const validateRatingError = () => {
    let bool = selectedRating === 0
    setRatingError(bool)
    return bool
  }

  //validates all errors and return if there was any errors
  const validateErrors = () => {
    let bool = validateMovieError()
    bool = validateTitleError() || bool
    bool = validateBodyError() || bool
    bool = validateRatingError() || bool
    return bool
  }

  //updates the stored review to the current information
  const updateStoredReview = () =>{
    setReview({
      visible : true,
      selectedMovieID : selectedMovieID,
      enteredTitle : enteredTitle,
      enteredBody : enteredBody,
      selectedRating : selectedRating
    })
  }
  
  //resets all states to original "empty" values
  const resetReviewStates = () =>{
    setselectedMovieID("")
    setEnteredTitle("")
    setEnteredBody("")
    setSelectedRating(0)
  }

  //when trying to submit it validates if any errors and then updates and resets states
  const submit = async () => {
    if (!validateErrors()) {
      try {

        //does post to insert data into table
        const response = await fetch('/api/addReview', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },

          //sends the data to insert with the query
          body: JSON.stringify({
            movieID: selectedMovieID,
            userID: userID,
            reviewTitle: enteredTitle,
            reviewContent: enteredBody,
            reviewScore: selectedRating,
          }),
        });
        
        //doesn't get the ok response back i.e code 200
        if (!response.ok) {
          throw new Error('Error adding review');
        }
  
        // Reset the form and show success message
        updateStoredReview();
        resetReviewStates();

        // ...
      } catch (error) {
        console.error('Error adding review:', error);
      }
    }
  };

  return (
    <>
      {/* uses grid for formating */}
      {/* calls the components in a grid item for each */}
      <Grid container spacing={2} sx={{ padding: 3 }}>
        <Grid item xs={12}>
            <MyAppBar></MyAppBar>
        </Grid>
        
        <Grid item xs={12}>
          {/* title */}
          <Typography variant="h4" align = "left">Review a movie:</Typography>
        </Grid>
        <Grid item xs={12}>
          {/* movie selection component */}
          <MovieSelection movies = {movies} selectedMovieID = {selectedMovieID} changeMovie = {changeMovie} movieError = {movieError}></MovieSelection>
        </Grid>
        <Grid item xs={12}>
          {/* movie review title entering component*/}
          <ReviewTitle enteredTitle = {enteredTitle} changeTitle = {changeTitle} titleError = {titleError}></ReviewTitle>
        </Grid>
        <Grid item xs={12}>
          {/* movie review body entering component*/}
          <ReviewBody enteredBody = {enteredBody} changeBody = {changeBody} bodyError = {bodyError}></ReviewBody>
        </Grid>
        <Grid item xs={12}>
          {/* selecting rating section component*/}
          <ReviewRating selectedRating = {selectedRating} changeRating = {changeRating} ratingError = {ratingError}></ReviewRating>
        </Grid>
        <Grid item xs={12}>
          {/* submitting button */}
          <Button variant="contained" onClick={submit}>Submit Review</Button>
        </Grid>
        {review.visible &&(
          <>
            {/* only displays review once the review state is set to visible after first succesful submit
            displays data from review formatted with grid elements */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" align = "left">Your review has been received</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h4" align = "left">{movies[review.selectedMovieID].name}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" align = "left">{review.enteredTitle}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" align = "left">{review.enteredBody}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="caption text" align = "left">Rating: {review.selectedRating}/5</Typography>
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
}

export default Review;