import * as React from "react";
import LeftNav from "../../../components/admin/Sidebar/LeftNav";
import Header from "../../../components/admin/Header/Header";
import { Box, Button, TextField, Paper } from '@mui/material';
import {indigo} from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ConfirmModal from "../../../components/commmon/Modal/ConfirmModal";

const primary = indigo[50];
const drawerWidth = 260;

function UserRegisterPage() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const [state, setState] = useState({
        inputId: '',
        inputPw: '',
        inputName: '',
        phoneNumber: '',
        dktNum: '',
        joinDate: '',
    });

    const handleInputChange = (e) => {

    };

    const handleFormSubmit = (e) => {
        e.preventDefault(); 
        // 회원가입 api 연동

        setFormSubmitted(true);
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
        navigate('/memberMng/user');
    };



    return (
        <Box>
            <LeftNav/>
            <Header title={'사용자 등록'}/>
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
                        onClick={handleFormSubmit}
                    >
                        등록
                    </Button>
                </Paper>
            </Box>
            {formSubmitted && isOpen && (
                <ConfirmModal color={'#3377FF'} isOpen={isOpen} onClose={handleCloseModal} onConfirm={handleCloseModal}>
                    <div>사용자 등록이 완료되었습니다.</div>
                </ConfirmModal>
            )}
        </Box>
    );
}

export default UserRegisterPage;