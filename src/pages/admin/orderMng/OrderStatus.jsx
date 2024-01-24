import LeftNav from "../../../components/admin/LeftNav";
import Header from "../../../components/admin/Header";
import TabMenu from "../../../components/admin/TabMenu";
import DeleteBtn from "../../../components/admin/DeleteBtn";
import OrderStatusTable from "../../../components/admin/Table/OrderStatusTable";
import {Paper, Box} from "@mui/material";
import {indigo} from '@mui/material/colors';
import {useEffect, useState} from "react";
import axios from "axios";

const primary = indigo[50];
const drawerWidth = 260;

function OrderStatus() {
    const [orderStatus, setOrderStatus] = useState([]);
    const tableHeader = ['주분번호', '상품번호', '브랜드', '상품', '옵션', '주문수량', '주문날짜', '배송상태 변경'];

    // const MENU_LIST = [
    //     {title: '결제완료', count: orderStatus.confPayCount},
    //     {title: '배송준비 중', count: orderStatus.preShipCount},
    //     {title: '배송 중', count: orderStatus.inTransitCount},
    //     {title: '배송완료', count: orderStatus.delivCompCount},
    // ];

    const MENU_LIST = [
        {title: '결제완료', count: 3},
        {title: '배송준비 중', count: 2},
        {title: '배송 중', count: 2},
        {title: '배송완료', count: 0},
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/AdminOrderStatusData.json");
                setOrderStatus(response.data);
            } catch (e) {
                console.error("Error fetching data: ", e);
            }
        };
        fetchData();
    }, []);

    // 데이터 확인용 로그
    console.log("data: ", orderStatus);

    return (
        <Box>
            <LeftNav/>
            <Header title={'배송상태 관리'}/>
            {/*컨텐츠 영역입니다.*/}
            <Box
                bgcolor={primary}
                component="main"
                sx={{height: '100vh', display: 'flex', flexDirection: 'column', flex: 1, p: 3, mt: 9, ml: `${drawerWidth}px`}}>
                <Paper square elevation={2}
                       sx={{p: '20px 30px'}}>
                    <TabMenu menu={MENU_LIST} />
                    {/*<OrderStatusTable headers={tableHeader} rows={orderStatus.orderList} />*/}
                </Paper>
            </Box>
        </Box>

    );
}

export default OrderStatus;