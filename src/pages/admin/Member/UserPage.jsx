import * as React from "react";
import LeftNav from "../../../components/admin/Sidebar/LeftNav";
import Header from "../../../components/admin/Header/Header";
import SearchBar from "../../../components/admin/Common/SearchBar/SearchBar";
import UserTable from "../../../components/admin/Table/UserTable";
import {Paper, Box, Button} from "@mui/material";
import {indigo} from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const primary = indigo[50];
const drawerWidth = 260;

function MemberList() {
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);

    const tableHeader = ['이름', '사번', '이메일', '사용자', '입사일', ''];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/AdminUserData.json");
                setRows(response.data);
                
            } catch (e) {
                console.error("Error fetching data: ", e);
            }
        };
        fetchData();
    }, []);

    const navigateToRegister = () => {
        navigate('../register');
    }


    return (
        <Box>
            <LeftNav/>
            <Header title={'사용자 목록'}/>
            {/*컨텐츠 영역입니다.*/}
            <Box
                bgcolor={primary}
                component="main"
                sx={{height: '100vh', display: 'flex', flexDirection: 'column', flex: 1, p: 3, mt: 9, ml: `${drawerWidth}px`}}>
                <SearchBar/>
                <Paper square elevation={2}
                    sx={{p: '20px 30px'}}>
                    <UserTable headers={tableHeader} rows={rows} />
                    <Button
                        variant="outlined"
                        sx={{ float: 'right'}}
                        onClick={navigateToRegister}
                    >
                        등록
                    </Button>
                </Paper>
            </Box>
        </Box>

    );
}

export default MemberList;