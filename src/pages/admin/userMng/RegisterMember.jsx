import * as React from "react";
import LeftNav from "../../../components/admin/LeftNav";
import Header from "../../../components/admin/Header";
import { Box, Button, TextField, Paper } from '@mui/material';
import {indigo} from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const primary = indigo[50];
const drawerWidth = 260;

function RegisterMember() {
    const navigate = useNavigate();

    const [state, setState] = useState({
        inputId: '',
        inputPw: '',
        inputName: '',
        phoneNumber: '',
        dktNum: '',
        joinDate: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
    
        if (name === 'phoneNumber') {
            const input = value.replace(/\D/g, '');
            const formattedPhoneNumber = input.replace(/(\d{3})(\d{0,4})(\d{0,4})/, (match, p1, p2, p3) => {
                if (p3) {
                    return `${p1}-${p2}-${p3}`;
                } else if (p2) {
                    return `${p1}-${p2}`;
                } else {
                    return p1;
                }
            });
            setState({ ...state, [name]: formattedPhoneNumber });
        } else {
            setState({ ...state, [name]: value });
        }
    };

      
    return (
        <Box>
            <LeftNav/>
            <Header title={'사용자 등록'}/>
            {/*컨텐츠 영역입니다.*/}
            <Box
                bgcolor={primary}
                component="main"
                sx={{height: '100vh', display: 'flex', flexDirection: 'column', flex: 1, p: 3, mt: 9, ml: `${drawerWidth}px`}}>
                <Paper square elevation={2}
                sx={{p: '20px 30px'}}>
                    <TextField
                        required
                        fullWidth
                        id="email"
                        label="이메일"
                        margin="normal"
                        name="inputId"
                        value={state.inputId}
                        onChange={handleInputChange}
                    />
                    <TextField
                        required
                        fullWidth
                        id="password"
                        label="비밀번호"
                        type="password"
                        margin="normal"
                        name="inputPw"
                        value={state.inputPw}
                        onChange={handleInputChange}
                    />
                    <TextField
                        required
                        fullWidth
                        id="confirmPassword"
                        label="비밀번호 확인"
                        type="password"
                        margin="normal"
                        value={state.passwordValid}
                        onChange={handleInputChange}
                    />
                    <TextField
                        required
                        fullWidth
                        id="name"
                        label="이름"
                        margin="normal"
                        name="inputName"
                        value={state.inputName}
                        onChange={handleInputChange}
                    />
                    <TextField
                        required
                        fullWidth
                        id="phoneNumber"
                        label="핸드폰번호"
                        margin="normal"
                        name="phoneNumber"
                        value={state.phoneNumber}
                        onChange={handleInputChange}
                    />
                    <TextField
                        required
                        fullWidth
                        id="employeeNumber"
                        label="사원번호"
                        margin="normal"
                        name="dktNum"
                        value={state.dktNum}
                        onChange={handleInputChange}
                    />
                    <TextField
                        required
                        fullWidth
                        id="dateOfJoining"
                        label="입사일"
                        type="date"
                        InputLabelProps={{
                        shrink: true,
                        }}
                        margin="normal"
                        name="joinDate"
                        value={state.joinDate}
                        onChange={handleInputChange}
                    />
                    <Button
                        type="submit"
                        variant="outlined"
                        sx={{ float: "right", mt: 3, mb: 2 }}
                    >
                        등록
                    </Button>
                </Paper>
            </Box>
        </Box>

    );
}

export default RegisterMember;