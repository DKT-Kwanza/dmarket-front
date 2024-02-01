import * as React from "react";
import LeftNav from "../../../components/admin/Sidebar/LeftNav";
import Header from "../../../components/admin/Header/Header";
import SearchBar from "../../../components/admin/Common/SearchBar/SearchBar";
import UserTable from "../../../components/admin/Table/UserTable";
import {Paper, Box, Button} from "@mui/material";
import {indigo} from '@mui/material/colors';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Pagination } from "@mui/material";

const primary = indigo[50];
const drawerWidth = 260;

function MemberList() {
    const navigate = useNavigate();
    const location = useLocation();
    const [rows, setRows] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [isData, setIsData] = useState(false);
    const [searchInput, setSearchInput] = useState("");

    const query = new URLSearchParams(location.search).get('q');
    const token = sessionStorage.getItem('token');

    const tableHeader = ['이름', '사번', '이메일', '사용자', '입사일', ''];

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            query = e.target.value;
            navigate(`/memberMng/user?q=${encodeURIComponent(query)}`);
            setSearchInput("");
        }
    };
    
    useEffect(() => {
        const fetchData = async () => {
            const url = `http://172.16.210.136:8080/api/admin/admin-user?q=${query}&page=${currentPage}`;
            try {
                const response = await axios.get(url, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setRows(response.data.data[0]);
                setTotalPages(response.data.data.totalPages);
                console.log(response.data)
                setIsData(true);
            } catch (e) {
                console.error(e);
            }
        };
        fetchData();
    }, [query, currentPage]);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const page = queryParams.get('page');
        const currentPage = page ? parseInt(page, 10) : 1;
        setCurrentPage(currentPage);
    
    }, [location.search]);

    
    const handlePageChange = (event, value) => {
        navigate(`?q=${query}&page=${value}`);
    };


    const navigateToRegister = () => {
        navigate('../addUser');
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
                <SearchBar text={'사용자 검색'} handleSearchInput={handleSearch}/>
            
                
                        {
                            isData && 
                            (
                                <Paper square elevation={2} sx={{p: '20px 30px'}}>
                                <UserTable headers={tableHeader} rows={rows} />
                                    <Button
                                        variant="outlined"
                                        sx={{ float: 'right'}}
                                        onClick={navigateToRegister}>
                                        등록
                                    </Button>
                            </Paper>
                            )
                        }
                
            </Box>
            <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} />
        </Box>

    );
}

export default MemberList;