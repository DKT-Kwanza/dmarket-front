import * as React from "react";
import LeftNav from "../../components/LeftNav";
import Header from "../../components/Header";
import SearchBar from "../../components/SearchBar";
import TabMenu from "../../components/TabMenu";
import BasicTable from "../../components/EditProductTable";
import Category from "../../components/Category";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import {Paper, Box, Button} from "@mui/material";
import {indigo} from '@mui/material/colors';
import rows from '../../../assets/admindata/ProductList.json';

const primary = indigo[50];
const drawerWidth = 260;

function Product() {

    const MENU_LIST = [
        {title: '전체', count: rows.totalProductCount},
        {title: '판매중', count: rows.salesCount},
        {title: '품절', count: rows.soldOutCount},
    ];

    const tableHeader = ['상품번호', '상품', '옵션', '판매가', '카테고리', '상태', '비고', '등록일', ''];

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
                    <TabMenu menu={MENU_LIST} />
                    <BasicTable headers={tableHeader} rows={rows}/>
                    <Button
                        sx={{float: 'right'}}
                        variant="contained"
                        endIcon={<BorderColorIcon />}>
                        상품추가
                    </Button>
                </Paper>
            </Box>
        </Box>

    );
}

export default Product;