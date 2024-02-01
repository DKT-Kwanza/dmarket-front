import * as React from "react";
import LeftNav from "../../../components/admin/Sidebar/LeftNav";
import Header from "../../../components/admin/Header/Header";
import SearchBar from "../../../components/admin/Common/SearchBar/SearchBar";
import TabMenu from "../../../components/admin/Common/TabMenu/TabMenu";
import OptionQuantityTable from "../../../components/admin/Table/OptionQuantityTable";
import Category from "../../../components/admin/Common/Category/Category";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import {Paper, Box, Pagination} from "@mui/material";
import {indigo} from '@mui/material/colors';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const primary = indigo[50];
const drawerWidth = 260;

function ProductQuantityPage() {
    const navigate = useNavigate();
    const [selectedTab, setSelectedTab] = React.useState(0);
    const [rows, setRows] = useState([]);
    const [categoryId, setCategoryId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const token = sessionStorage.getItem('token');

    const tableHeader = ['상품번호', '브랜드', '상품', '옵션', '판매가', '카테고리', '상태', '재고', '입고', '등록일', '등록', ''];

    const fetchData = async () => {
        if (categoryId !== null) {
            const url = `http://172.16.210.136:8080/api/admin/products/categories/${categoryId}?page=${currentPage}`;
            try {
                const response = await axios.get(url, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json; charset=UTF-8',
                    }
                });
                setRows(response.data.data.content);
                setTotalPages(response.data.data.totalPage);
                console.log(response.data)
            } catch (e) {
                console.error(e);
            }
        }
    };

    const handleCategoryClick = (categoryId) => {
        setCategoryId(categoryId);
        fetchData(categoryId);
    };
    

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
        navigate(`?page=${value}`);
    };

    const handleTabChange = (newValue) => {
        setSelectedTab(newValue);
    };
    
    const navigateToAdd = () => {
        navigate("../add")
    }


    return (
        <Box>
            <LeftNav/>
            <Header title={'재고/입고'}/>
            {/*컨텐츠 영역입니다.*/}
            <Box
                bgcolor={primary}
                component="main"
                sx={{height: '100vh', display: 'flex', flexDirection: 'column', flex: 1, p: 3, mt: 9, ml: `${drawerWidth}px`}}>
                <Category onCategoryClick={handleCategoryClick} /> 
                <SearchBar/>
                <Paper square elevation={2}
                    sx={{p: '20px 30px'}}>
                    <OptionQuantityTable headers={tableHeader} rows={rows} fetchData={fetchData} setRows={setRows} />
                </Paper>
                <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} />
            </Box>
        </Box>

    );
}

export default ProductQuantityPage;