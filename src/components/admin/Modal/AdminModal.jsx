import React, {useState, useEffect} from 'react';
import {Box, Typography, Modal, TextField, Button} from '@mui/material';
import axios from "axios";
import UserTable from "../Table/UserTable";
import SearchBar from "../Common/SearchBar/SearchBar";

const AdminModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '968px',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

function AdminModal({open, handleClose}) {

    const [user, setUser] = useState(null);
    const tableHeader = ['이름', '사번', '이메일', '사용자', '입사일', ''];

    useEffect(() => {
        axios.get("/api/AdminUserData.json")
            .then((response) => {
                setUser(response.data);
            })
            .catch((error) => {
                console.error("Error fetching User data: ", error);
            });
    }, []);

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="admin-modal-title"
            aria-describedby="admin-modal-description">
            <Box sx={AdminModalStyle}>
                <SearchBar text={'사원번호를 입력하세요.'}/>
                <hr/>
                <UserTable headers={tableHeader} rows={user} children={'selectBox'} />
                <Button variant="contained" sx={{float: 'right'}}
                        onClick={handleClose}>확인</Button>
            </Box>
        </Modal>
    );
}

export default AdminModal;