import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./OrderHistory.css";
import OrderHistoryItem from '../../../components/MyOrder/OrderHistoryItem';
import MyPageSubHeader from "../../../components/MyPage/SubHeader/MyPageSubHeader";
import MyPageSidebar from "../../../components/MyPage/Sidebar/MyPageSidebar";

function OrderHistory() {

    const [orderHistoryProducts, setOrderHistoryProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/OrderHistoryData.json");
                setOrderHistoryProducts(response.data);
            } catch (e) {
                console.error("Error fetching data: ", e);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="orderHistory">
        <MyPageSubHeader />
        <div className="orderHistory-body">
            <div className="orderHistory-container">
                {/*왼쪽 메뉴 바 영역 입니다.*/}
                <MyPageSidebar />
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
                                <div className="orderHistory-process-title">결제확인</div>
                                <div className="orderHistory-process-count">{orderHistoryProducts.confPayCnt}</div>
                            </div>
                            <div className="orderHistory-process-bar"/>
                            <div className="orderHistory-process-item-wrap">
                                <div className="orderHistory-process-title">배송준비 중</div>
                                <div className="orderHistory-process-count">{orderHistoryProducts.preShipCnt}</div>
                            </div>
                            <div className="orderHistory-process-bar"/>
                            <div className="orderHistory-process-item-wrap">
                                <div className="orderHistory-process-title">배송중</div>
                                <div className="orderHistory-process-count">{orderHistoryProducts.inTransitCnt}</div>
                            </div>
                            <div className="orderHistory-process-bar"/>
                            <div className="orderHistory-process-item-wrap">
                                <div className="orderHistory-process-title">배송완료</div>
                                <div className="orderHistory-process-count">{orderHistoryProducts.delivCompCnt}</div>
                            </div>
                        </div>
                    </div>
                    {/*주문 프로세스 (주문/취소, 반품/환불) 현황 영역 입니다.*/}
                    <div className="orderHistory-process-cancel">
                        <div className="orderHistory-process-list">
                            <div className="orderHistory-process-item-wrap">
                                <div className="orderHistory-process-cancel-title">주문취소</div>
                                <div className="orderHistory-process-count">{orderHistoryProducts.orderCancelCnt}</div>
                            </div>
                            <div className="orderHistory-process-bar"/>
                            <div className="orderHistory-process-item-wrap">
                                <div className="orderHistory-process-cancel-title">반품/환불</div>
                                <div className="orderHistory-process-count">{orderHistoryProducts.returnCnt}</div>
                            </div>
                        </div>
                    </div>

                    {/*주문 내역이 나오는 영역 입니다.*/}
                    {orderHistoryProducts && orderHistoryProducts.orderList && orderHistoryProducts.orderList.map((order, index) => (
                        <OrderHistoryItem
                            key={order.orderId || index}
                            orderDate={order.orderDate}
                            orderId={order.orderId}
                            orderItems={order.orderDetailList}
                        />
                    ))}
                </div>
            </div>
        </div>
        </div>
    );
}

export default OrderHistory;