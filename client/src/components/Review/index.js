import * as React from 'react';
import Typography from "@mui/material/Typography";
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import MyAppBar from '../MyAppBar';

const Review = () => {
    return (
        <div>
            <MyAppBar></MyAppBar>
            <h1>REVIEW</h1>
        </div>
    )

}

export default Review;