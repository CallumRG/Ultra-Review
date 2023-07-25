import * as React from 'react';
import MyAppBar from '../MyAppBar';
import Typography from "@mui/material/Typography";
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
    return (
        <div>
            <MyAppBar></MyAppBar>
            <h1>LANDING</h1>
        </div>
    )

}

export default Landing;