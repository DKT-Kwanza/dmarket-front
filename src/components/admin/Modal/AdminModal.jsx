import React, { useState, useEffect } from 'react';
import { Box, Typography, Modal, TextField, Button } from '@mui/material';
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

function AdminModal({ open, handleClose }) {
    const [user, setUser] = useState(null);
    const [newRole, setNewRole] = useState(null);
    const tableHeader = ['이름', '사번', '이메일', '관리자 그룹', '입사일', ''];


    const token = sessionStorage.getItem('token');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://172.16.210.136:8080/api/admin/admin-user?q=${1971110559}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setUser(response.data.data[0]);
                console.log(response.data.data);
            } catch (e) {
                console.error("Error fetching data: ", e);
            }
        };
        fetchData();
    }, []);

    const handleRoleChange = (option) => {
        const roleMap = {
            '사용자': 'ROLE_USER',
            '총괄관리자': 'ROLE_GM',
            '시스템관리자': 'ROLE_SM',
            '상품관리자': 'ROLE_PM',
        };
        setNewRole(roleMap[option]);
    };

    const handleConfirm = async () => {
        try {
            console.log(newRole);
            const response = await axios.put(
                `http://172.16.210.136:8080/api/admin/admin-users/${user.userId}`,
                { newRole: newRole },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            console.log(response.data);
            
            handleClose(); // 요청이 성공적으로 끝나면 모달 창을 닫음
        } catch (e) {
            console.error("Error sending data: ", e);
            
        }
    };

    return (
        
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="admin-modal-title"
            aria-describedby="admin-modal-description">
            <Box sx={AdminModalStyle}>
                <SearchBar text={'사원번호를 입력하세요.'} />
                <hr />
                <UserTable headers={tableHeader} rows={user} children={'selectBox'} onRoleChange={handleRoleChange}/>
                <Button variant="contained" sx={{ float: 'right' }}
                    onClick={handleConfirm}>확인</Button>
            </Box>
        </Modal>
    );
}

export default AdminModal;