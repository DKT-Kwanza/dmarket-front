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
    const [selectedTab, setSelectedTab] = useState('결제 완료');
    const [menuList, setMenuList] = useState([]);
    const tableHeader = ['주문번호', '상품번호', '브랜드', '상품', '옵션', '주문수량', '주문날짜', '배송상태 변경'];

    /* 세션 스토리지에서 토큰 가져오기 */
    const token = sessionStorage.getItem('token');

    /* orderStatus 에 맞는 데이터 가져오기 */
    useEffect(() => {
        console.log(selectedTab);
        const fetchData = async () => {
            try {
                const encodedTab = encodeURIComponent(selectedTab);
                const response = await axios.get(`http://172.16.210.136:8080/api/admin/orders?status=${encodedTab}`,{
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json; charset=UTF-8',
                    },
                });
                console.log("response: ", response.data.data);
                setOrder(response.data.data);
            } catch (e) {
                console.error("Error fetching data: ", e);
            }
        };
        fetchData();
    }, [selectedTab]);

    /* orderStatus가 업데이트 되었을 때만 setMenuList 호출 */
    useEffect(() => {
        if (order) {
            setMenuList([
                {title: '결제 완료', count: order.confPayCount},
                {title: '배송 준비', count: order.preShipCount},
                {title: '배송중', count: order.InTransitCount}
            ]);
        }
    }, [order]);

    const handleTabChange = async (tabTitle) => {
        setSelectedTab(tabTitle);
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
                    {order && order.orderList && order.orderList.content && (
                        <OrderStatusTable headers={tableHeader} rows={order.orderList.content} />
                    )}
                </Paper>
            </Box>
        </Box>

    );
}

export default OrderStatus;