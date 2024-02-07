import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Modal, Button, Typography } from '@mui/material';
import axios from "axios";
import UserTable from "../Table/UserTable";
import SearchBar from "../Common/SearchBar/SearchBar";
import {adminApi} from "../../../api/Api";

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
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [newRole, setNewRole] = useState(null);
    const [search, setSearch] = useState('');
    const tableHeader = ['이름', '사번', '이메일', '관리자 그룹', '입사일', ''];


    const token = sessionStorage.getItem('token');

    const handleSearchInputChange = (event) => {
        const searchText = event.target.value;
        setSearch(searchText);
    };

    /* 사원번호 검색 */
    const handleSearch = async () => {
        const url = `${adminApi}/admin-users?q=${search}`;
        try {
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setUser(response.data.data);
            console.log(response.data)
        } catch (e) {
            console.error(e);
        }
    };    

    const handleRoleChange = (option) => {
        const roleMap = {
            '사용자': 'ROLE_USER',
            '총괄관리자': 'ROLE_GM',
            '시스템관리자': 'ROLE_SM',
            '상품관리자': 'ROLE_PM',
        };
        setNewRole(roleMap[option]);
    };
    
    /* 사원 역할 변경 */
    const handleConfirm = async () => {
        try {
            console.log(newRole);
            const response = await axios.put(
                `${adminApi}/admin-users/${user.userId}`,
                { newRole: newRole },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            console.log(response.data);
            alert('역할이 변경되었습니다!');
            handleClose(); // 요청이 성공적으로 끝나면 모달 창을 닫음
        } catch (e) {
            console.error("Error sending data: ", e);
            
        }
    };

    /* 모달 닫힐 때 검색 결과 비우기 */
    const onModalClose = () => {
        handleClose(); 
        setUser(null);
        setNewRole(null);
        setSearch('');
    };

    return (
        <Modal
            open={open}
            onClose={onModalClose}
            aria-labelledby="admin-modal-title"
            aria-describedby="admin-modal-description">
            <Box sx={AdminModalStyle}>
                <SearchBar text={'사원번호를 입력하세요.'} onChange={handleSearchInputChange} onSearch={handleSearch} />
                <hr />
                {user ? ( 
                        <UserTable headers={tableHeader} rows={user} children={'selectBox'} onRoleChange={handleRoleChange}/>
                    ) : (
                        <Typography>검색 결과가 없습니다.</Typography>
                )}
                <Button variant="outlined" sx={{ float: 'right' }}
                    onClick={onModalClose}>확인</Button>
                <Button variant="contained" sx={{ float: 'right', marginRight: '10px'}}
                    onClick={handleConfirm}>변경</Button>
            </Box>
        </Modal>
    );
}

export default AdminModal;