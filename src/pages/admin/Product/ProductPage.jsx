import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Paper } from '@mui/material';
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
    const [displayedProducts, setDisplayedProducts] = useState([]);
    const [activeFilter, setActiveFilter] = useState('all');

    const getButtonVariant = (filter) => {
        return activeFilter === filter ? 'contained' : 'outlined';
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/AdminProductList.json");
                setProducts(response.data);
                setDisplayedProducts(response.data);
            } catch (e) {
                console.error("Error fetching data: ", e);
            }
        };
        fetchData();
    }, []);

    const tableHeader = ['상품번호', '브랜드', '상품', '옵션', '판매가', '카테고리', '상태', '재고', '등록일', ''];

    const filterProducts = (status) => {
        setActiveFilter(status);
        if (status === 'all') {
            setDisplayedProducts(products);
        } else {
            const filtered = products.map(product => ({
                ...product,
                optionList: product.optionList.filter(option => option.optionStatus === status)
            })).filter(product => product.optionList.length > 0);
            setDisplayedProducts(filtered);
        }
    };    

    console.log(displayedProducts)
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
                <Category />
                <SearchBar />
                <Paper square elevation={2} sx={{ p: '20px 30px' }}>
                    <Box sx={{ mb: 2 }}>
                        <Button variant={getButtonVariant('all')} onClick={() => filterProducts('all')} sx={{ mr: 1 }}>
                            전체
                        </Button>
                        <Button variant={getButtonVariant('판매중')} onClick={() => filterProducts('판매중')} sx={{ mr: 1 }}>
                            판매중
                        </Button>
                        <Button variant={getButtonVariant('품절')} onClick={() => filterProducts('품절')}>
                            품절
                        </Button>
                    </Box>
                    <EditProductTable headers={tableHeader} rows={{ product: displayedProducts }} />
                    <Button
                        variant="outlined"
                        sx={{ float: 'right' }}
                        endIcon={<BorderColorIcon />}
                        onClick={navigateToAdd}>
                        상품추가
                    </Button>
                </Paper>
            </Box>
        </Box>
    );
}

export default ProductPage;
