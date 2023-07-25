import * as React from 'react';
import Typography from "@mui/material/Typography";
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import MyAppBar from '../MyAppBar';

const MyPage = () => {
    return (
        <div>
            <MyAppBar></MyAppBar>
            <h1>MYPAGE</h1>
        </div>
    )

}

export default MyPage;