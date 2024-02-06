import * as React from "react";
import LeftNav from "../../../components/admin/Sidebar/LeftNav";
import Header from "../../../components/admin/Header/Header";
import SearchBar from "../../../components/admin/Common/SearchBar/SearchBar";
import OptionQuantityTable from "../../../components/admin/Table/OptionQuantityTable";
import Category from "../../../components/admin/Common/Category/Category";
import {Paper, Box, Pagination} from "@mui/material";
import {indigo} from '@mui/material/colors';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {adminApi} from "../../../Api";

const primary = indigo[50];
const drawerWidth = 260;

function ProductQuantityPage() {
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);
    const [categoryId, setCategoryId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState('');
    const [searchCategoryId, setSearchCategoryId] = useState('');

    const token = sessionStorage.getItem('token');

    const tableHeader = ['상품번호', '브랜드', '상품', '옵션', '판매가', '카테고리', '재고', '입고', '등록일', '등록', ''];

    useEffect(() => {
        fetchData(categoryId, currentPage);
    }, [categoryId, currentPage]); 

    const fetchData = async () => {
        if (categoryId !== null) {
            const url = `${adminApi}/products/categories/${categoryId}?page=${currentPage}`;
            try {
                const response = await axios.get(url, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json; charset=UTF-8',
                    }
                });
                setRows(response.data.data.productList);
                setTotalPages(response.data.data.totalPages);
                setSearchCategoryId(categoryId);
                console.log(response.data)
            } catch (e) {
                console.error(e);
            }
        }
    };

    const handleCategoryClick = (categoryId) => {
        if (categoryId) {
            setCategoryId(categoryId);
            setCurrentPage(1);
            navigate(`?category=${categoryId}&page=1`);
            fetchData(categoryId, 1);
        }
    };    

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
        const categoryParam = categoryId ? `category=${categoryId}` : '';
        navigate(`?${categoryParam}&page=${value}`);
        fetchData(categoryId, value);
    }; 

    /* 카테고리 별 상품 검색 */
    const handleSearch = async () => {
        if (search.trim() === '') {
            fetchData(categoryId);
        } else {
            const url = `${adminApi}/products/categories/${searchCategoryId}/search?q=${search}&page=${currentPage}`;
            try {
                const response = await axios.get(url, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setRows(response.data.data.productList);
                setTotalPages(response.data.data.totalPages);
            } catch (e) {
                console.error(e);
            }
        }
    };

    const handleSearchInputChange = (event) => {
        const searchText = event.target.value;
        setSearch(searchText);
    };

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
                <SearchBar text={search} onChange={handleSearchInputChange} onSearch={handleSearch} />
                <Paper square elevation={2}
                    sx={{p: '20px 30px'}}>
                    <OptionQuantityTable headers={tableHeader} rows={rows} fetchData={fetchData} setRows={setRows} />
                    <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} />
                </Paper>
            </Box>
        </Box>

    );
}

export default ProductQuantityPage;