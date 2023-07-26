import * as React from 'react';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

const ReviewTitle = (props) => {

  //states declarations
  //constants and functions declarations

  return (
    <>
    {/* TextField component for entering the review title */}
    <TextField sx = {{minWidth: 200}}
    label="Enter a review title" 
    value={props.enteredTitle}
    onChange={props.changeTitle}
    helperText = {(props.titleError ? "Enter your review title" : "")}
    error = {props.titleError}
    inputProps={{ maxLength: 100 }}

    />


    </>
  );
}

export default ReviewTitle;