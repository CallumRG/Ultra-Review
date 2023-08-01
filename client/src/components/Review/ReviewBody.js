import * as React from 'react';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import TextField from '@mui/material/TextField';

const ReviewBody = (props) => {


  return (
    <>
      {/* TextField component for entering the review body */}
      <TextField sx = {{minWidth: 400}}
      multiline
      label="Enter a review body" 
      onChange={props.changeBody}
      value={props.enteredBody}
      helperText = {(props.bodyError ? "Enter your review" : "")}
      error = {props.bodyError}
      min minRows={5}
      inputProps={{ maxLength: 200 }}
      />
    </>
  );
}

export default ReviewBody;