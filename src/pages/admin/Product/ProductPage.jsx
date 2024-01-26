import * as React from "react";
import LeftNav from "../../../components/admin/Sidebar/LeftNav";
import Header from "../../../components/admin/Header/Header";
import SearchBar from "../../../components/admin/Common/SearchBar/SearchBar";
import TabMenu from "../../../components/admin/Common/TabMenu/TabMenu";
import EditProductTable from "../../../components/admin/Table/EditProductTable";
import Category from "../../../components/admin/Common/Category/Category";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import {Paper, Box, Button} from "@mui/material";
import {indigo} from '@mui/material/colors';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const primary = indigo[50];
const drawerWidth = 260;

function Product() {
    const navigate = useNavigate();
    const [selectedTab, setSelectedTab] = React.useState(0);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/AdminProductList.json");
                setRows(response.data);

            } catch (e) {
                console.error("Error fetching data: ", e);
            }
        };
        fetchData();
    }, []);


    const MENU_LIST = [
        {title: '전체'},
        {title: '판매중'},
        {title: '품절'},
    ];

    const tableHeader = ['상품번호', '브랜드', '상품', '옵션', '판매가', '카테고리', '상태', '재고', '등록일', ''];

    const handleTabChange = (newValue) => {
        setSelectedTab(newValue);
    };

    const filteredProducts = rows.filter((row) => {
        if (selectedTab === 0) {
            return true;
        } else if (selectedTab === 1) {
            return row.optionList.some((item) => item.optionStatus === '판매중');
        } else if (selectedTab === 2) {
            return row.optionList.some((item) => item.optionStatus === '품절');
        }
        return false;
    });
    
    
    const navigateToAdd = () => {
        navigate("../add")
    }

    return (
        <Box>
            <LeftNav/>
            <Header title={'상품상세'}/>
            {/*컨텐츠 영역입니다.*/}
            <Box
                bgcolor={primary}
                component="main"
                sx={{height: '100vh', display: 'flex', flexDirection: 'column', flex: 1, p: 3, mt: 9, ml: `${drawerWidth}px`}}>
                <Category />
                <SearchBar/>
                <Paper square elevation={2}
                    sx={{p: '20px 30px'}}>
                    <TabMenu menu={MENU_LIST} selectedTab={selectedTab} onTabChange={handleTabChange} />
                    <EditProductTable headers={tableHeader} rows={{ product: filteredProducts }} />
                    <Button
                        variant="outlined"
                        sx={{float: 'right'}}
                        endIcon={<BorderColorIcon />}
                        onClick={navigateToAdd}>
                        상품추가
                    </Button>
                </Paper>
            </Box>
        </Box>

    );
}

export default Product;