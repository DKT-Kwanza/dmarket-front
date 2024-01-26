import * as React from "react";
import LeftNav from "../../../components/admin/Sidebar/LeftNav";
import Header from "../../../components/admin/Header/Header";
import SearchBar from "../../../components/admin/Common/SearchBar/SearchBar";
import TabMenu from "../../../components/admin/Common/TabMenu/TabMenu";
import CheckBoxTable from "../../../components/admin/Table/CheckBoxTable";
import DeleteBtn from "../../../components/admin/Common/Button/DeleteBtn";
import {Paper, Box} from "@mui/material";
import {indigo} from '@mui/material/colors';

const primary = indigo[50];
const drawerWidth = 260;

function Product() {

    const MENU_LIST = [
        {title: '전체관리자 ', count: 3},
        {title: '총괄관리자', count: 1},
        {title: '시스템관리자', count: 1},
        {title: '상품관리자', count: 1},
    ];

    return (
        <Box>
            <LeftNav/>
            <Header title={'관리자 목록'}/>
            {/*컨텐츠 영역입니다.*/}
            <Box
                bgcolor={primary}
                component="main"
                sx={{height: '100vh', display: 'flex', flexDirection: 'column', flex: 1, p: 3, mt: 9, ml: `${drawerWidth}px`}}>
                <SearchBar/>
                <Paper square elevation={2}
                       sx={{p: '20px 30px'}}>
                    <TabMenu menu={MENU_LIST} />
                    <CheckBoxTable/>
                    <DeleteBtn />
                </Paper>
            </Box>
        </Box>

    );
}

export default Product;