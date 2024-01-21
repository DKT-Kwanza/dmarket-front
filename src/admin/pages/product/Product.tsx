import * as React from "react";
import LeftNav from "../../components/LeftNav";
import Header from "../../components/Header";
import SearchBar from "../../components/SearchBar";
import TabMenu from "../../components/TabMenu";
import BasicTable from "../../components/BasicTable";
import {Paper, Box, Typography} from "@mui/material";
import {indigo} from '@mui/material/colors';

const primary = indigo[50];
const drawerWidth = 260;

function Product() {
    const MENU_LIST = [
        {title: '전체', count: 4},
        {title: '판매중', count: 4},
        {title: '품절', count: 0},
    ];

    return (
        <Box>
            <LeftNav/>
            <Header title={'상품상세'}/>
            {/*컨텐츠 영역입니다.*/}
            <Box
                bgcolor={primary}
                component="main"
                sx={{display: 'flex', flexDirection: 'column', flex: 1, p: 3, mt: 9, ml: `${drawerWidth}px`}}>
                <SearchBar/>
                <Paper square elevation={2}
                    sx={{p: '20px 30px'}}>
                    <TabMenu menu={MENU_LIST} />
                    <BasicTable />
                </Paper>
            </Box>
        </Box>

    );
}

export default Product;