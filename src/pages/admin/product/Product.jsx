import * as React from "react";
import LeftNav from "../../../components/admin/LeftNav";
import Header from "../../../components/admin/Header";
import SearchBar from "../../../components/admin/SearchBar";
import TabMenu from "../../../components/admin/TabMenu";
import BasicTable from "../../../components/admin/EditProductTable";
import Category from "../../../components/admin/Category";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import {Paper, Box, Button} from "@mui/material";
import {indigo} from '@mui/material/colors';
import rows from '../../../assets/admindata/ProductList.json';
import { useNavigate } from 'react-router-dom';

const primary = indigo[50];
const drawerWidth = 260;

function Product() {
    const navigate = useNavigate();
    const [selectedTab, setSelectedTab] = React.useState(0);

    const MENU_LIST = [
        {title: '전체', count: rows.totalProductCount},
        {title: '판매중', count: rows.salesCount},
        {title: '품절', count: rows.soldOutCount},
    ];

    const tableHeader = ['상품번호', '브랜드', '상품', '옵션', '판매가', '카테고리', '상태', '재고', '등록일', ''];

    const handleTabChange = (newValue) => {
        setSelectedTab(newValue);
    };

    const filteredProducts = rows.product.filter((row) => {
        if (selectedTab === 0) {
            return true;
        } else if (selectedTab === 1) {
            return row.optionList.some((item) => item.productStatus === '판매중');
        } else if (selectedTab === 2) {
            return row.optionList.some((item) => item.productStatus === '품절');
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
                    <BasicTable headers={tableHeader} rows={{ product: filteredProducts }} />
                    <Button
                        sx={{float: 'right'}}
                        variant="contained"
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