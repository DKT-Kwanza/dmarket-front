import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import LeftNav from "@components/admin/Sidebar/LeftNav";
import Header from "@components/admin/Header/Header";
import TabMenu from "@components/admin/Common/TabMenu/TabMenu";
import OrderStatusTable from "@components/admin/Table/OrderStatusTable";
import {Paper, Box, Pagination} from "@mui/material";
import {indigo} from "@mui/material/colors";
import axios from "axios";
import {adminApi} from "@api/Api";
import UserInfoModal from "@components/admin/Modal/UserInfoModal";

const primary = indigo[50];
const drawerWidth = 260;

function OrderStatus() {
    const navigate = useNavigate();

    const [order, setOrder] = useState([]);
    const [selectedTab, setSelectedTab] = useState('결제 완료');
    const [menuList, setMenuList] = useState([]);
    const tableHeader = ['주문번호', '상품번호', '브랜드', '상품', '옵션', '주문수량', '주문날짜', '주문자 정보', '배송상태 변경', ''];
    const [orderInfo, setOrderInfo] = useState([]);
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

    /* 세션 스토리지에서 토큰 가져오기 */
    const token = sessionStorage.getItem('token');

    /* 주문,배송 상태 페이지네이션 */
    const [orderCurrentPage, setOrderCurrentPage] = useState(1);
    const [orderTotalPages, setOrderTotalPages] = useState(0);
    const handleOrderPageChange = (event, value) => {
        setOrderCurrentPage(value);
        navigate(`?page=${value}`);
    };

    /* selectedTab 에 맞는 데이터 가져오기 */
    useEffect(() => {
        const fetchData = async () => {
            try {
                const encodedTab = encodeURIComponent(selectedTab);
                const url = `${adminApi}/orders?status=${encodedTab}&pageNo=${orderCurrentPage}`;
                const response = await axios.get(url,{
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json; charset=UTF-8',
                    },
                });
                console.log("response: ", response.data.data);
                setOrder(response.data.data);
                setOrderTotalPages(response.data.data.orderList.totalPages);
            } catch (e) {
                console.error("Error fetching data: ", e);
            }
        };
        fetchData();
    }, [selectedTab, orderCurrentPage]);

    /* 주문 상태 변경 클릭 */
    const onChangeOrderStatusClick = async (detailId, selectedStatus) => {
        const requestData = {
            "orderStatus": selectedStatus
        };

        try {
            /* 주문상태 변경 API 호출 */
            const url = `${adminApi}/orders/${detailId}`
            const response = await axios.put(url, requestData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json; charset=UTF-8',
                },
            });
            alert("해당 주문의 주문상태를 변경합니다.");

            /* 주문상태 변경 후 해당 상품을 리스트에서 제거 */
            await setOrder((prevOrder) => {
                console.log("prevOrder", prevOrder);
                if (prevOrder && prevOrder.orderList && Array.isArray(prevOrder.orderList.content)) {
                    const updatedOrder = prevOrder.orderList.content.filter((orderItem) => orderItem.detailId !== detailId);
                    return { ...prevOrder, orderList: { content: updatedOrder } };
                } else {
                    return [];
                }
            });

            setSelectedTab(selectedStatus);
        } catch (error) {
            console.error('PUT API 호출 실패:', error);
        }
    }

    /* orderStatus가 업데이트 되었을 때만 setMenuList 호출 */
    useEffect(() => {
        if (order && order.orderList) {
            setMenuList([
                { title: '결제 완료', count: order.confPayCount },
                { title: '배송 준비', count: order.preShipCount },
                { title: '배송중', count: order.InTransitCount },
                { title: "배송 완료", count: order.delivCompCount }
            ]);
        }
    }, [order]);

    /* 메뉴 탭이 변했을 때 */
    const handleTabChange = async (tabTitle) => {
        setSelectedTab(tabTitle);
        setOrderCurrentPage(0);
    };

    /* 주문자 정보 확인 */
    const confirmOrderInfo = async (orderId) => {
        try {
            const url = `${adminApi}/orders/${orderId}/delivery-address`
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            console.log(response.data);
            setOrderInfo(response.data.data);
            console.log(orderInfo)
            setIsInfoModalOpen(true);
        } catch (error) {
            console.error('API 호출 실패:', error);
        }
    }

    const handleCloseInfoModal = () => {
        setIsInfoModalOpen(false);
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
                        <OrderStatusTable headers={tableHeader} rows={order.orderList.content}
                                          onChangeOrderStatusClick={onChangeOrderStatusClick} confirmOrderInfo={confirmOrderInfo}/>
                    )}
                    <Pagination count={orderTotalPages} page={orderCurrentPage} onChange={handleOrderPageChange} />
                </Paper>
            </Box>
            <UserInfoModal open={isInfoModalOpen} handleClose={handleCloseInfoModal} userInfo={orderInfo}/>
        </Box>
    );
}

export default OrderStatus;
