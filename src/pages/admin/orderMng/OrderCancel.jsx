import LeftNav from "../../../components/admin/LeftNav";
import Header from "../../../components/admin/Header";
import OrderCancelTable from "../../../components/admin/Table/OrderCancelTable";
import {Paper, Box} from "@mui/material";
import {indigo} from '@mui/material/colors';
import {useEffect, useState} from "react";
import axios from "axios";

const primary = indigo[50];
const drawerWidth = 260;

function OrderCancel() {
    const [orderCancel, setOrderCancel] = useState([]);
    const tableHeader = ['주문번호', '상품번호', '브랜드', '상품', '옵션', '주문수량', '주문날짜', '취소상태'];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/AdminOrderCancelData.json");
                setOrderCancel(response.data);
            } catch (e) {
                console.error("Error fetching data: ", e);
            }
        };
        fetchData();
    }, []);

    return (
        <Box>
            <LeftNav/>
            <Header title={'취소 목록'}/>
            {/*컨텐츠 영역입니다.*/}
            <Box
                bgcolor={primary}
                component="main"
                sx={{height: '100vh', display: 'flex', flexDirection: 'column', flex: 1, p: 3, mt: 9, ml: `${drawerWidth}px`}}>
                <Paper square elevation={2}
                       sx={{p: '20px 30px'}}>
                    <OrderCancelTable headers={tableHeader} rows={orderCancel} />
                </Paper>
            </Box>
        </Box>

    );
}

export default OrderCancel;