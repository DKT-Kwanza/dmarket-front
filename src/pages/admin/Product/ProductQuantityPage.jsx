import * as React from "react";
import LeftNav from "../../../components/admin/Sidebar/LeftNav";
import Header from "../../../components/admin/Header/Header";
import SearchBar from "../../../components/admin/Common/SearchBar/SearchBar";
import TabMenu from "../../../components/admin/Common/TabMenu/TabMenu";
import OptionQuantityTable from "../../../components/admin/Table/OptionQuantityTable";
import Category from "../../../components/admin/Common/Category/Category";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import {Paper, Box, Button} from "@mui/material";
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

    const tableHeader = ['상품번호', '브랜드', '상품', '옵션', '판매가', '카테고리', '상태', '재고', '입고', '등록일', '등록', ''];

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
                <Category />
                <SearchBar/>
                <Paper square elevation={2}
                    sx={{p: '20px 30px'}}>
                    <OptionQuantityTable headers={tableHeader} rows={rows} />
                </Paper>
            </Box>
        </Box>

    );
}

export default ProductQuantityPage;