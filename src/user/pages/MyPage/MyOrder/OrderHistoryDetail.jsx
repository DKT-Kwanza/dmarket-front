import "./OrderHistoryDetail.css";
import OrderCancelBtn from "../../../components/Button/OrderCancelBtn"
import ConfirmCancelModal from "../../../components/Modal/ConfirmCancelModal";
import OrderItem from "../../../components/OrderItem";
import {useEffect, useState} from "react";

function OrderHistoryDetail() {
    // 주문 상세 보기 버튼 -> 주문 번호 데이터 -> 주문 상태 확인
    // 결제 확인 이면 "주문취소" 버튼
    // 배송 준비 중, 배송 중, 배송 완료 면 "반품신청" 버튼
    // 주문 취소 면 "주문취소" 텍스트
    // 반품 완료 면 "반품완료" 텍스트
    const process = "결제확인";
    const [status, setStatus] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);

    const openModalHandler = () => {
        // isOpen 상태 변경
        setIsOpen(true);
    };

    const closeModalHandler = () => {
        setIsOpen(false);
    };

    const handleConfirm = () => {
        // modal 의 확인 을 누르면 button 이 disabled
        setIsConfirming(true);
    };

    useEffect(() => {
        if (process === "결제확인") {
            setStatus("주문취소");
        } else {
            setStatus("반품신청");
        }
    }, [])

    return(
        <div className="orderHistoryDetail-body">

            <ConfirmCancelModal isOpen={isOpen} onClose={closeModalHandler} onConfirm={handleConfirm}>
                {
                    status === "주문취소"
                        ? <div>전체 상품에 대한 주문이 취소됩니다.</div>
                        :
                        <>
                            <div>해당 상품을 반품신청 합니다.</div>
                        </>
                }
            </ConfirmCancelModal>

            <div className="orderHistoryDetail-container">
                {/*왼쪽 메뉴 바 영역 입니다.*/}
                <div className="orderHistoryDetail-submenu"/>
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
                        <div className="orderHistoryDetail-order-date">2024.01.05</div>
                        <div className="orderHistoryDetail-order-time">(20시 10분)</div>
                        <div className="orderHistoryDetail-order-number-tit">주문번호</div>
                        <div className="orderHistoryDetail-order-number">20240105-790DA1</div>
                    </div>
                    <table className="orderHistoryDetail-info">
                        <tr>
                            <td className="orderHistoryDetail-info-tit">받으시는 분</td>
                            <td className="orderHistoryDetail-info-cont">
                                <div className="orderHistoryDetail-info-name">홍길동</div>
                                <div>010-1234-5678</div>
                            </td>
                        </tr>
                        <tr>
                            <td className="orderHistoryDetail-info-tit">받으시는 주소</td>
                            <td className="orderHistoryDetail-info-cont">서울시 서울구 서울동 서울아파트 101동 101호</td>
                        </tr>
                    </table>

                    <div className="orderHistoryDetail-price">
                        <div className="orderHistoryDetail-price-tit">최종결제금액</div>
                        <div className="orderHistoryDetail-price-cont">99,900 원</div>
                    </div>

                    <div className="orderHistoryDetail-line"/>

                    {/*주문 아이템 영역 입니다.*/}
                    <OrderItem
                        brand="JAJU"
                        name="쿠시노 코지 저상형 침대(패브릭,SS)"
                        option="GREY BEIGE L"
                        count="1"
                        price="1,208,000">
                        {/*주문 취소 버튼 입니다.*/}
                        <OrderCancelBtn
                            onClick={openModalHandler}
                            // disabled={isConfirming}
                        >
                            {status}
                        </OrderCancelBtn>

                    </OrderItem>

                    {/*주문 아이템 영역 입니다.*/}
                    <OrderItem
                        brand="JAJU"
                        name="쿠시노 코지 저상형 침대(패브릭,SS)"
                        option="GREY BEIGE L"
                        count="1"
                        price="1,208,000">
                        {/*반품 신청 버튼 입니다.*/}
                        <OrderCancelBtn
                            onClick={openModalHandler}
                            // disabled={isConfirming}
                        >
                            {status}
                        </OrderCancelBtn>
                    </OrderItem>
                </div>
            </div>
        </div>
    );
}

export default OrderHistoryDetail;