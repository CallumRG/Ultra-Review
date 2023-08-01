import * as React from 'react';
import MyAppBar from '../MyAppBar';
import { Grid, Typography, FormControl, FormControlLabel, FormHelperText, Radio, RadioGroup, Button } from '@mui/material';
import * as math from 'mathjs';

const MyPage = () => {
    // Component's state variables
    const [userID, setUserID] = React.useState(1);
    const [currentScore, setCurrentScore] = React.useState(0); // Current score of the user
    const [maxScore, setMaxScore] = React.useState(0); // Maximum score achieved by the user
    const [selection, setSelection] = React.useState(''); // User's selected answer
    const [triviaData, setTriviaData] = React.useState([]); // Array to store fetched trivia data
    const [submitText, setSubmitText] = React.useState(""); // Text to display after submitting an answer
    const [selectionError, setSelectionError] = React.useState(false); // Flag to indicate if the user submitted without selecting an answer
    const [randIndex, setRandIndex] = React.useState(math.randomInt(4)); // Random index to select a movie and its options

    // Fetch trivia data when the component mounts
    React.useEffect(() => {
        fetchTrivia();
    }, []);

    // Function to fetch trivia data from the server
    const fetchTrivia = async () => {
        try {
            const response = await fetch('/api/getTrivia', {
                method: 'POST',
            });

            // Throws an error if a bad response is received
            if (!response.ok) {
                throw new Error('Error retrieving trivia data');
            }

            const data = await response.json();

            // Ensure the response is an array by parsing it using JSON.parse()
            const dataArray = JSON.parse(data.express);

            setTriviaData(dataArray);
        } catch (error) {
            // Catches the error and logs it to the console
            console.error('Error retrieving trivia data:', error);
        }
    };

    // Function to send trivia attempt to the server
    const sendAttempt = async () => {
        try {
            //does post to insert data into table
            const response = await fetch('/api/addAttempt', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
    
                //sends the data to insert with the query
                body: JSON.stringify({
                currentScore: currentScore,
                userID: userID,
                }),
            });

            // Throws an error if a bad response is received
            if (!response.ok) {
                throw new Error('Error adding trivia attempt');
            }

        } catch (error) {
            // Catches the error and logs it to the console
            console.error('Error retrieving trivia data:', error);
        }
    };

    // Function to handle the user's answer selection
    const changeSelection = (event) => {
        setSelection(event.target.value);
    };

    // Function to submit the user's answer and handle the scoring
    const submit = () => {
        if (selection) {
            if (selection === triviaData[randIndex].director_name) {
                // If the answer is correct
                if (currentScore + 1 > maxScore) {
                    // Update the maximum score achieved
                    setMaxScore(currentScore + 1);
                }
                setCurrentScore(currentScore + 1); // Increase the current score
                setSubmitText("Next"); // Display a success message
            } else {
                // If the answer is incorrect
                sendAttempt(); //send attempt to the database
                setCurrentScore(0); // Reset the current score to 0
                setSubmitText("Try Again"); // Display a try again message
            }

            setSelection(""); // Clear the selected answer
            setSelectionError(false); // Reset the selection error flag
            fetchTrivia(); // Fetch new trivia data
            setRandIndex(math.randomInt(4)); // Generate a new random index to select a new movie and its options
            console.log(randIndex);
        } else {
            // If the user submitted without selecting an answer
            setSelectionError(true); // Set the selection error flag to display an error message
        }
    };

    // JSX code for rendering the component
    return (
        <div>
            {/* Grid container for layout */}
            <Grid container spacing={2} sx={{ padding: 3 }}>
                {/* Displaying the AppBar component */}
                <Grid item xs={12}>
                    <MyAppBar />
                </Grid>
                {/* Displaying the title of the trivia game */}
                <Grid item xs={12}>
                    <Typography variant="h4">Movie Director Trivia:</Typography>
                </Grid>
                {/* Displaying the user's scores */}
                <Grid item xs={12}>
                    <Typography variant="body1">Local Highest Score: {maxScore}</Typography>
                    <Typography variant="body1">Current Score: {currentScore}</Typography>
                </Grid>

                {/* Displaying trivia data if available */}
                {triviaData.length > 0 && (
                    <>
                        <Grid item xs={12}>
                            {/* Displaying movie details */}
                            <Typography variant="subtitle">
                                Movie: {triviaData[randIndex].movie_title + " (" + triviaData[randIndex].movie_year + ")"}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            {/* Displaying radio buttons for user's answer selection */}
                            <FormControl component="fieldset">
                                <RadioGroup value={selection} onChange={changeSelection}>
                                    {/* Mapping through triviaData to display director options */}
                                    {triviaData.map((trivia) => (
                                        <FormControlLabel
                                            key={trivia.director_name}
                                            value={trivia.director_name}
                                            control={<Radio />}
                                            label={trivia.director_name}
                                            error={selectionError}
                                        />
                                    ))}
                                </RadioGroup>
                                {/* Displaying an error message if the user submitted without selecting an answer */}
                                <FormHelperText error={selectionError}>{selectionError && "Select an answer."}</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            {/* Submitting button */}
                            <Button variant="contained" onClick={submit}>Submit Answer</Button>
                        </Grid>
                    </>
                )}

                {/* Displaying success or try again message after submitting an answer */}
                <Grid item xs={12}>
                    {submitText === "Try Again" && (
                        <Typography variant="subtitle" color="error.main">Wrong answer, wanna try again?</Typography>
                    )}
                    {submitText === "Next" && (
                        <Typography variant="subtitle" color="success.main">Correct answer, keep going!</Typography>
                    )}
                </Grid>
            </Grid>
        </div>
    );
};

export default MyPage;
