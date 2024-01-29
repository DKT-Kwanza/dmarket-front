import LeftNav from "../../../components/admin/Sidebar/LeftNav";
import Header from "../../../components/admin/Header/Header";
import TabMenu from "../../../components/admin/Common/TabMenu/TabMenu";
import OrderStatusTable from "../../../components/admin/Table/OrderStatusTable";
import {Paper, Box} from "@mui/material";
import {indigo} from '@mui/material/colors';
import {useEffect, useState} from "react";
import axios from "axios";

const primary = indigo[50];
const drawerWidth = 260;

function OrderStatus() {
    const [order, setOrder] = useState([]);
    const [selectedTab, setSelectedTab] = useState('결제완료');
    const [menuList, setMenuList] = useState([]);
    const tableHeader = ['주문번호', '상품번호', '브랜드', '상품', '옵션', '주문수량', '주문날짜', '배송상태 변경'];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://172.16.210.136:8080/api/admin/orders?status=${selectedTab}`,
                    );
                setOrder(response.data);
            } catch (e) {
                console.error("Error fetching data: ", e);
            }
        };
        fetchData();
    }, [selectedTab]);

    useEffect(() => {
        // orderStatus가 업데이트되었을 때만 setMenuList 호출
        if (order && order.orderList) {
            setMenuList([
                {title: '결제완료', count: order.confPayCount},
                {title: '배송준비 중', count: order.preShipCount},
                {title: '배송 중', count: order.inTransitCount},
                {title: '배송완료', count: order.delivCompCount}
            ]);
        }
    }, [order]);

    const handleTabChange = async (tabTitle) => {
        setSelectedTab(tabTitle);
        try {
            const response = await axios.get(`/api/AdminOrderStatusTestData.json`);
            // 데이터를 테이블 형식에 맞게 가공하고 orderStatus 업데이트
            setOrder(response.data);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

    return (
        <Box>
            <LeftNav/>
            <Header title={'배송상태 관리'}/>
            {/*컨텐츠 영역입니다.*/}
            <Box
                bgcolor={primary}
                component="main"
                sx={{
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    p: 3,
                    mt: 9,
                    ml: `${drawerWidth}px`
                }}>
                <Paper square elevation={2}
                       sx={{p: '20px 30px'}}>
                    <TabMenu menu={menuList} selectedTab={selectedTab} onTabChange={handleTabChange} />
                    <OrderStatusTable headers={tableHeader} rows={order.orderList} />
                </Paper>
            </Box>
        </Box>

    );
}

export default OrderStatus;