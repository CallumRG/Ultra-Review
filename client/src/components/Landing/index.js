import * as React from 'react';
import MyAppBar from '../MyAppBar';
import Typography from "@mui/material/Typography";
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';

const Landing = () => {
    return (
        <div>
            <Grid container spacing={2} sx={{ padding: 3 }}>
                <Grid item xs={12}>
                    <MyAppBar></MyAppBar>
                    
                </Grid>
                <Grid item xs={12}>
                    <h1>LANDING</h1>
                </Grid>
            </Grid>
        </div>
    )

}

export default Landing;