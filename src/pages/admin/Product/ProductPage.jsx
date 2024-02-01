import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Paper, Pagination } from '@mui/material';
import { indigo } from '@mui/material/colors';
import LeftNav from '../../../components/admin/Sidebar/LeftNav';
import Header from '../../../components/admin/Header/Header';
import SearchBar from '../../../components/admin/Common/SearchBar/SearchBar';
import Category from '../../../components/admin/Common/Category/Category';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import EditProductTable from '../../../components/admin/Table/EditProductTable';

const primary = indigo[50];
const drawerWidth = 260;

function ProductPage() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [activeFilter, setActiveFilter] = useState('all');
    const [categoryId, setCategoryId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState('');
    const [searchCategoryId, setSearchCategoryId] = useState('');
    
    const tableHeader = ['상품번호', '브랜드', '상품', '옵션', '판매가', '카테고리', '재고', '등록일', ''];

    const getButtonVariant = (filter) => {
        return activeFilter === filter ? 'contained' : 'outlined';
    };

    /* 세션 스토리지에서 토큰 가져오기 */
    const token = sessionStorage.getItem('token');

    /* 카테고리 별 상품 조회 */
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
                setProducts(response.data.data.content);
                setTotalPages(response.data.data.totalPage);
                setSearchCategoryId(categoryId);
            } catch (e) {
                console.error(e);
            }
        }
    };

    const handleCategoryClick = (newCategoryId) => {
        setCategoryId(newCategoryId);
        setCurrentPage(1);
        fetchData(newCategoryId); 
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
        navigate(`?page=${value}`);
    };

    /* 카테고리 별 상품 검색 */
    const handleSearch = async () => {
        if (search.trim() === '') {
            fetchData(categoryId);
        } else {
            const url = `http://172.16.210.136:8080/api/admin/products/categories/${searchCategoryId}/search?q=${search}&page=${currentPage}`;
            try {
                const response = await axios.get(url, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setProducts(response.data.data.content);
                setTotalPages(response.data.data.totalPage);
            } catch (e) {
                console.error(e);
            }
        }
    };

    const handleSearchInputChange = (event) => {
        const searchText = event.target.value;
        setSearch(searchText);
    };

    const navigateToAdd = () => {
        navigate("./add");
    };

    return (
        <Box>
            <LeftNav />
            <Header title={'상품상세'} />
            <Box
                bgcolor={primary}
                component="main"
                sx={{ height: '100vh', display: 'flex', flexDirection: 'column', flex: 1, p: 3, mt: 9, ml: `${drawerWidth}px` }}>
                <Category onCategoryClick={handleCategoryClick} /> 
                <SearchBar text={search} onChange={handleSearchInputChange} onSearch={handleSearch} />
                <Paper square elevation={2} sx={{ p: '20px 30px' }}>
                    <EditProductTable headers={tableHeader} rows={{ product: products }} />
                    <Button
                        variant="outlined"
                        sx={{ float: 'right' }}
                        endIcon={<BorderColorIcon />}
                        onClick={navigateToAdd}>
                        상품추가
                    </Button>
                </Paper>
                <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} />
            </Box>
        </Box>
    );
}

export default ProductPage;
