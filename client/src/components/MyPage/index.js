import * as React from 'react';
import MyAppBar from '../MyAppBar';
import { Grid, Typography, FormControl, FormControlLabel, FormHelperText, Radio, RadioGroup, Button} from '@mui/material';
import * as math from 'mathjs'


const MyPage = () => {
    const getRandomInt = (max) => {
        return Math.floor(Math.random() * max);
      }

    const [currentScore, setCurrentScore] = React.useState(0);
    const [maxScore, setMaxScore] = React.useState(0);
    const [selection, setSelection] = React.useState('');
    const [triviaData, setTriviaData] = React.useState([]);
    const [submitText, setSubmitText] = React.useState("");
    const [selectionError, setSelectionError] = React.useState(false);
    const [randIndex, setRandIndex] = React.useState(math.randomInt(3));

    React.useEffect(() => {
        fetchTrivia();
      }, []);
    
    const fetchTrivia = async () => {
        try {
          const response = await fetch('/api/getTrivia', {
            method: 'POST',
          });
          
          //throws error if bad response
          if (!response.ok) {
            throw new Error('Error retrieving trivia data');
          }
          
          const data = await response.json();

          // Ensure the response is an array by parsing it using JSON.parse()
          const dataArray = JSON.parse(data.express);

          console.log(dataArray);

          setTriviaData(dataArray);
        } catch (error) {
          //catches the error and throws a console error
          console.error('Error retrieving trivia data:', error);
        }
    };

    
    const changeSelection = (event) => {setSelection(event.target.value)}

    const submit = () => {
        if(selection){
            if(selection === triviaData[randIndex].director_name){
                if(currentScore + 1 > maxScore){
                    setMaxScore(currentScore + 1);
                }
                setCurrentScore(currentScore + 1);
                
                setSubmitText("Next");
                


            }
            else{
                setCurrentScore(0);
                setSubmitText("Try Again");
            }
            
            setSelection("");
            setSelectionError(false);
            setRandIndex(math.randomInt(3));
            fetchTrivia();
            
        }
        else{
            setSelectionError(true)
        }    
        
    }
    return (
        <div>
            <Grid container spacing={2} sx={{ padding: 3 }}>
                <Grid item xs={12}>
                    <MyAppBar></MyAppBar>
                    
                </Grid>
                <Grid item xs={12} >
                    <Typography variant = "h3" >Movie Director(s) Trivia:</Typography>
                </Grid>
                <Grid item xs={12} >
                    <Typography variant = "body1" >Max Score: {maxScore}</Typography>
                    <Typography variant = "body1" >Current Score: {currentScore}</Typography>
                </Grid>

                {triviaData.length > 0 && (
                    <>
                    <Grid item xs={12} >
                        <Typography variant = "subtitle">Movie: {triviaData[randIndex].movie_title +  " (" + triviaData[randIndex].movie_year + ")"}</Typography>
                    </Grid>
                    <Grid item xs={12} >
                        <FormControl component="fieldset">
                            <RadioGroup value={selection} onChange={changeSelection}>
                            {triviaData.map((trivia) => (
                                <FormControlLabel
                                key={trivia.director_name}
                                value={trivia.director_name}
                                control={<Radio />}
                                label={trivia.director_name}
                                error = {selectionError}
                                />
                            ))}
                            </RadioGroup>
                            <FormHelperText error={selectionError}>{selectionError && "Select an answer."}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                    {/* submitting button */}
                        <Button variant="contained" onClick={submit}>Submit Answer</Button>
                    </Grid>
                    </>
                )       
                
                }

                <Grid item xs={12}>        
                    {submitText === "Try Again" && (
                        <Typography variant = "subtitle" color = "error.main">Wrong answer, wanna try again?</Typography>
                    )}
                    
                    {submitText === "Next" && (
                        <Typography variant = "subtitle" color="success.main">Correct answer, keep going!</Typography>
                    )}
                </Grid>
            </Grid>
        </div>
    )
}

export default MyPage;