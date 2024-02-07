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
import {adminApi} from "../../../api/Api";

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

    useEffect(() => {
        fetchData(categoryId, currentPage);
    }, [categoryId, currentPage]); 

    /* 카테고리 별 상품 조회 */
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
                setProducts(response.data.data.productList);
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
                setProducts(response.data.data.productList);
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
                    <Button
                        variant="outlined"
                        sx={{ float: 'right' }}
                        endIcon={<BorderColorIcon />}
                        onClick={navigateToAdd}>
                        상품추가
                    </Button>
                    <EditProductTable
                        headers={tableHeader}
                        products={products}
                        setProducts={setProducts}
                    />
                    <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} />
                </Paper>
            </Box>
        </Box>
    );
}

export default ProductPage;
