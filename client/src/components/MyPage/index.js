import * as React from 'react';
import Typography from "@mui/material/Typography";
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import MyAppBar from '../MyAppBar';
import { Grid } from '@mui/material';

const MyPage = () => {
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

export default MyPage;