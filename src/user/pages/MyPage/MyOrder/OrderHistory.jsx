import "./OrderHistory.css";
import OrderItem from "../../../components/OrderItem";
import {useNavigate} from "react-router-dom";
function OrderHistory() {
    const navigate = useNavigate();

    const navigateToOrderHistoryDetail = () => {
        navigate("../orderhistorydetail");
    }

    return (
        <div className="orderHistory-body">
            <div className="orderHistory-container">
                {/*왼쪽 메뉴 바 영역 입니다.*/}
                <div className="orderHistory-submenu"/>
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
                                <div className="orderHistory-process-count">0</div>
                            </div>
                            <div className="orderHistory-process-bar"/>
                            <div className="orderHistory-process-item-wrap">
                                <div className="orderHistory-process-title">배송준비 중</div>
                                <div className="orderHistory-process-count">0</div>
                            </div>
                            <div className="orderHistory-process-bar"/>
                            <div className="orderHistory-process-item-wrap">
                                <div className="orderHistory-process-title">배송중</div>
                                <div className="orderHistory-process-count">0</div>
                            </div>
                            <div className="orderHistory-process-bar"/>
                            <div className="orderHistory-process-item-wrap">
                                <div className="orderHistory-process-title">배송완료</div>
                                <div className="orderHistory-process-count">0</div>
                            </div>
                        </div>
                    </div>
                    {/*주문 프로세스 (주문/취소, 반품/환불) 현황 영역 입니다.*/}
                    <div className="orderHistory-process-cancel">
                        <div className="orderHistory-process-list">
                            <div className="orderHistory-process-item-wrap">
                                <div className="orderHistory-process-cancel-title">주문취소</div>
                                <div className="orderHistory-process-count">1</div>
                            </div>
                            <div className="orderHistory-process-bar"/>
                            <div className="orderHistory-process-item-wrap">
                                <div className="orderHistory-process-cancel-title">반품/환불</div>
                                <div className="orderHistory-process-count">1</div>
                            </div>
                        </div>
                    </div>

                    {/*주문 내역이 나오는 영역 입니다.*/}
                    <div className="orderHistory-order-list">
                        <div className="orderHistory-order-head">
                            <div className="orderHistory-order-date">2024.01.05</div>
                            <div className="orderHistory-order-time">(20시 10분)</div>
                            <div className="orderHistory-order-number-tit">주문번호</div>
                            <div className="orderHistory-order-number">20240105-790DA1</div>
                            <button
                                className="orderHistory-order-detail-btn"
                                onClick={navigateToOrderHistoryDetail}>
                                <div className="orderHistory-order-detail-tit">주문내역상세보기</div>
                                <svg
                                    className="orderHistory-order-detail-icon"
                                    xmlns="http://www.w3.org/2000/svg" width="8" height="14" viewBox="0 0 8 14" fill="none">
                                    <path d="M1 1L7 7L1 13" stroke="#767676"/>
                                </svg>
                            </button>
                        </div>
                        <div className="orderHistory-order-line"/>
                        {/*주문 아이템 영역 입니다.*/}
                        <OrderItem
                            brand="JAJU"
                            name="쿠시노 코지 저상형 침대(패브릭,SS)"
                            option="GREY BEIGE L"
                            count="1"
                            price="1,208,000">
                            배송완료
                        </OrderItem>

                        <OrderItem
                            brand="JAJU"
                            name="쿠시노 코지 저상형 침대(패브릭,SS)"
                            option="GREY BEIGE L"
                            count="1"
                            price="1,208,000">
                            반품완료
                        </OrderItem>
                    </div>



                    {/*주문 내역이 나오는 영역 입니다.*/}
                    <div className="orderHistory-order-list">
                        <div className="orderHistory-order-head">
                            <div className="orderHistory-order-date">2024.01.05</div>
                            <div className="orderHistory-order-time">(20시 10분)</div>
                            <div className="orderHistory-order-number-tit">주문번호</div>
                            <div className="orderHistory-order-number">20240105-790DA1</div>
                            <button
                                className="orderHistory-order-detail-btn"
                                onClick={navigateToOrderHistoryDetail}>
                                <div className="orderHistory-order-detail-tit">주문내역상세보기</div>
                                <svg
                                    className="orderHistory-order-detail-icon"
                                    xmlns="http://www.w3.org/2000/svg" width="8" height="14" viewBox="0 0 8 14" fill="none">
                                    <path d="M1 1L7 7L1 13" stroke="#767676"/>
                                </svg>
                            </button>
                        </div>
                        <div className="orderHistory-order-line"/>

                        {/*주문 아이템 영역 입니다.*/}
                        <OrderItem
                            brand="JAJU"
                            name="쿠시노 코지 저상형 침대(패브릭,SS)"
                            option="GREY BEIGE L"
                            count="1"
                            price="1,208,000">
                            주문취소
                        </OrderItem>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderHistory;