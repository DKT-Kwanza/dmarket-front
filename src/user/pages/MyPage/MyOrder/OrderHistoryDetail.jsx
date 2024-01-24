import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { formatDate, formatTime } from '../../../../utils/Format';
import "./OrderHistoryDetail.css";
import OrderDetailItem from '../../../components/MyOrder/OrderDetailItem';
import MyPageSubHeader from "../../../components/MyPage/SubHeader/MyPageSubHeader";
import MyPageSidebar from "../../../components/MyPage/Sidebar/MyPageSidebar";

function OrderHistoryDetail() {
    // 주문 상세 보기 버튼 -> 주문 번호 데이터 -> 주문 상태 확인
    // 결제 확인 이면 "주문취소" 버튼
    // 배송 준비 중, 배송 중, 배송 완료 면 "반품신청" 버튼
    // 주문 취소 면 "주문취소" 텍스트
    // 반품 완료 면 "반품완료" 텍스트
    const [orderDetailProducts, setOrderDetailProducts] = useState([]);
    const [status, setStatus] = useState("");
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/OrderDetailData.json");
                setOrderDetailProducts(response.data);
                console.log(orderDetailProducts)
            } catch (e) {
                console.error("Error fetching data: ", e);
            }
        };
        fetchData();
    }, []);

    return(
        <div className="orderHistoryDetail">
            <MyPageSubHeader />
        <div className="orderHistoryDetail-body">


            <div className="orderHistoryDetail-container">
                {/*왼쪽 메뉴 바 영역 입니다.*/}
                <MyPageSidebar />
                {/*컨텐츠 영역 입니다.*/}
                <div className="orderHistoryDetail-content">
                    {/*주문/배송 조회 제목 영역 입니다.*/}
                    <div className="orderHistoryDetail-title">
                        <div className="orderHistoryDetail-title-bar"/>
                        <div className="orderHistoryDetail-title-content">주문 상세 조회</div>
                    </div>
                    <div className="orderHistoryDetail-title-line"></div>
                    {/*주문 상세 정보 조회 영역 입니다.*/}
                    <div className="orderHistoryDetail-order-head">
                        <div className="orderHistoryDetail-order-date">{formatDate(orderDetailProducts.orderDate)}</div>
                        <div className="orderHistoryDetail-order-time">({formatTime(orderDetailProducts.orderDate)})</div>
                        <div className="orderHistoryDetail-order-number-tit">주문번호</div>
                        <div className="orderHistoryDetail-order-number">{orderDetailProducts.orderId}</div>
                    </div>
                    <table className="orderHistoryDetail-info">
                        <tr>
                            <td className="orderHistoryDetail-info-tit">받으시는 분</td>
                            <td className="orderHistoryDetail-info-cont">
                                <div className="orderHistoryDetail-info-name">{orderDetailProducts.userName}</div>
                                <div>{orderDetailProducts.userPhoneNum}</div>
                            </td>
                        </tr>
                        <tr>
                            <td className="orderHistoryDetail-info-tit">받으시는 주소</td>
                            <td className="orderHistoryDetail-info-cont">{orderDetailProducts.userPostalCode}</td>
                        </tr>
                        <tr>
                            <td className="orderHistoryDetail-info-tit" />
                            <td className="orderHistoryDetail-info-cont">{orderDetailProducts.userAddress} {orderDetailProducts.userDetailedAddress}</td>
                        </tr>
                    </table>

                    <div className="orderHistoryDetail-price">
                        <div className="orderHistoryDetail-price-tit">최종결제금액</div>
                        <div className="orderHistoryDetail-price-cont">{orderDetailProducts.userDetailedAddress}</div>
                    </div>

                    <div className="orderHistoryDetail-line"/>
                    {/*주문 아이템 영역 입니다.*/}
                    {orderDetailProducts?.orderDetailList?.map((product, index) => (
                        <OrderDetailItem
                            key={index}
                            brand={product.productBrand}
                            name={product.productName}
                            img={product.productImg}
                            option={product.productOption}
                            count={product.productCount}
                            price={product.productTotalSalePrice}
                            status={product.orderStatus}
                        />
                    ))}
                </div>
            </div>
        </div>
        </div>
    );
}

export default OrderHistoryDetail;