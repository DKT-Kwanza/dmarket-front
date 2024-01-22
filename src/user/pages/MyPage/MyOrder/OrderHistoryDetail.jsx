import React, { useState, useEffect } from 'react';
import axios from 'axios';
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

    const formatDate = (datetime) => { // 날짜만 남기기
        const date = new Date(datetime);
        return date.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' });
      };
    
      const formatTime = (datetime) => { // 시간만 남기기
        const date = new Date(datetime);
        let hours = date.getHours();
        const minutes = date.getMinutes();
    
        // 시간을 2자리 형식으로 포매팅
        hours = hours.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
    
        return `${hours}:${formattedMinutes}`;
      };

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
                                <div className="orderHistoryDetail-info-name">{orderDetailProducts.receiver}</div>
                                <div>{orderDetailProducts.phoneNum}</div>
                            </td>
                        </tr>
                        <tr>
                            <td className="orderHistoryDetail-info-tit">받으시는 주소</td>
                            <td className="orderHistoryDetail-info-cont">{orderDetailProducts.postalCode}</td>
                        </tr>
                        <tr>
                            <td className="orderHistoryDetail-info-tit" />
                            <td className="orderHistoryDetail-info-cont">{orderDetailProducts.address} {orderDetailProducts.detailedAddress}</td>
                        </tr>
                    </table>

                    <div className="orderHistoryDetail-price">
                        <div className="orderHistoryDetail-price-tit">최종결제금액</div>
                        <div className="orderHistoryDetail-price-cont">{orderDetailProducts.totalPrice}</div>
                    </div>

                    <div className="orderHistoryDetail-line"/>
                    {/*주문 아이템 영역 입니다.*/}
                    {orderDetailProducts?.orderDetailList?.map((product, index) => (
                        <OrderDetailItem
                            key={index}
                            brand={product.brand}
                            name={product.productName}
                            img={product.productImg}
                            option={product.option}
                            count={product.quantity}
                            price={product.sales}
                            status={product.status} 
                        />
                    ))}
                </div>
            </div>
        </div>
        </div>
    );
}

export default OrderHistoryDetail;