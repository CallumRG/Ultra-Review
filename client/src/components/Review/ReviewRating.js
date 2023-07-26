import * as React from 'react';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';

const ReviewRating = (props) => {

  // Array of available rating options
  const ratingOptions = [1, 2, 3, 4, 5];

  return (
    <FormControl>
      {/* Label for the rating */}
      <FormLabel align="center">Rating</FormLabel>
      <RadioGroup
        row
        value={props.selectedRating}
        onChange={props.changeRating}
      >
        {/* Generate radio buttons for each rating option */}
        {ratingOptions.map((rating) => (
          <FormControlLabel
            key={rating}
            labelPlacement="top"
            value={rating.toString()}
            control={<Radio />}
            label={rating.toString()}
          />
        ))}
      </RadioGroup>
      {/* Helper text for error message */}
      <FormHelperText error={props.ratingError}>{props.ratingError && "Select a rating"}</FormHelperText>
    </FormControl>
  );
}

export default ReviewRating;