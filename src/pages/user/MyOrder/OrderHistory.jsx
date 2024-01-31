import React, {useState, useEffect} from 'react';
import axios from 'axios';
import "./OrderHistory.css";
import OrderHistoryItem from '../../../components/user/Item/OrderHistoryItem';
import MyPageSubHeader from "../../../components/user/Header/MyPageSubHeader";
import MyPageSidebar from "../../../components/user/Sidebar/MyPageSidebar";
import {userApi} from "../../../Api";

function OrderHistory() {

    const [orderHistory, setOrderHistory] = useState([]);
    const [orderHistoryProducts, setOrderHistoryProducts] = useState([]);

    /* 세션 스토리지에서 토큰 가져오기 */
    const token = sessionStorage.getItem('token');
    const userId = sessionStorage.getItem('userId');

    /* 주문, 배송 내역 조회 */
    useEffect(() => {
        const fetchData = async () => {
            const url = `${userApi}/${userId}/mypage/orders`;
            try {
                const response = await axios.get(url, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json; charset=UTF-8',
                    }
                });
                console.log(response.data.data);
                console.log(response.data.data.orderList);
                setOrderHistory(response.data.data)
                setOrderHistoryProducts(response.data.data.orderList);
            } catch (e) {
                console.error("Error fetching data: ", e);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="orderHistory">
            <MyPageSubHeader/>
            <div className="orderHistory-body">
                <div className="orderHistory-container">
                    {/*왼쪽 메뉴 바 영역 입니다.*/}
                    <MyPageSidebar/>
                    {/*컨텐트 영역 입니다.*/}
                    <div className="orderHistory-content">
                        {/*주문/배송 조회 제목 영역 입니다.*/}
                        <div className="orderHistory-title">
                            <div className="orderHistory-title-bar"/>
                            <div className="orderHistory-title-content">주문/배송 조회</div>
                        </div>
                        <div className="orderHistory-title-line"></div>

                        {/*주문 프로세스 현황 영역 입니다.*/}
                        <div className="orderHistory-process">
                            <div className="orderHistory-process-list">
                                <div className="orderHistory-process-item-wrap">
                                    <div className="orderHistory-process-title">결제완료</div>
                                    <div className="orderHistory-process-count">{orderHistory.confPayCount}</div>
                                </div>
                                <div className="orderHistory-process-bar"/>
                                <div className="orderHistory-process-item-wrap">
                                    <div className="orderHistory-process-title">배송준비 중</div>
                                    <div className="orderHistory-process-count">{orderHistory.preShipCount}</div>
                                </div>
                                <div className="orderHistory-process-bar"/>
                                <div className="orderHistory-process-item-wrap">
                                    <div className="orderHistory-process-title">배송중</div>
                                    <div
                                        className="orderHistory-process-count">{orderHistory.inTransitCount}</div>
                                </div>
                                <div className="orderHistory-process-bar"/>
                                <div className="orderHistory-process-item-wrap">
                                    <div className="orderHistory-process-title">배송완료</div>
                                    <div
                                        className="orderHistory-process-count">{orderHistory.cmpltDilCount}</div>
                                </div>
                            </div>
                        </div>
                        {/*주문 프로세스 (주문/취소, 반품/환불) 현황 영역 입니다.*/}
                        <div className="orderHistory-process-cancel">
                            <div className="orderHistory-process-list">
                                <div className="orderHistory-process-item-wrap">
                                    <div className="orderHistory-process-cancel-title">주문취소</div>
                                    <div
                                        className="orderHistory-process-count">{orderHistory.orderCancelCount}</div>
                                </div>
                                <div className="orderHistory-process-bar"/>
                                <div className="orderHistory-process-item-wrap">
                                    <div className="orderHistory-process-cancel-title">반품/환불</div>
                                    <div className="orderHistory-process-count">{orderHistory.returnCount}</div>
                                </div>
                            </div>
                        </div>

                        {/*주문 내역이 나오는 영역 입니다.*/}
                        {orderHistoryProducts && orderHistoryProducts.content && orderHistoryProducts.content.map((order, index) => (
                            <OrderHistoryItem
                                key={order.orderId || index}
                                orderDate={order.orderDate}
                                orderId={order.orderId}
                                orderItems={order.productDetailList}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderHistory;