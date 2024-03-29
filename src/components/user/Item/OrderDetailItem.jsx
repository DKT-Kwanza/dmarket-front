import React, {useState, useEffect} from 'react';
import Button from '../Common/Button/Button';
import styled from 'styled-components';
import ConfirmCancelModal from "../../common/Modal/ConfirmCancelModal";
import {formatPrice} from "@utils/Format";
import {userApi} from "@api/Api";
import axios from "axios";

function OrderDetailItem({orderId, detailId, img, brand, name, option, count, price, orderStatus}) {
    const [status, setStatus] = useState(orderStatus);
    const [statusButton, setStatusButton] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);

    useEffect(() => {
        if (status === "결제 완료") {
            setStatusButton("주문취소");
        } else if (status === "배송 완료") {
            setStatusButton("반품신청");
        }
    }, []);

    const openModalHandler = () => {
        setIsOpen(true);
    };

    const closeModalHandler = () => {
        setIsOpen(false);
    };

    /* 세션 스토리지에서 토큰 가져오기 */
    const token = sessionStorage.getItem('token');
    const userId = sessionStorage.getItem('userId');

    /* 모달의 확인 버튼 클릭 */
    const [selectedReason, setSelectedReason] = useState('');
    const handleReasonChange = (event) => {
        setSelectedReason(event.target.value);
    };

    const handleConfirm = async (statusButton) => {
        if (statusButton === "주문취소") {
            /* 주문 취소 API 호출 */
            try {
                const url = `${userApi}/${userId}/mypage/order/cancel`;
                const requestData = {
                    orderId: orderId,
                    orderDetailId: detailId
                };
                const response = await axios.post(url, requestData, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json; charset=UTF-8',
                    }
                });
                setIsConfirming(true);
                setStatus("주문 취소");
            } catch (e) {
                console.error("주문 취소 에러: ", e)
            }
        } else {
            /* 반품 신청 API 호출 */
            console.log(selectedReason);
            const requestData = {
                orderDetailId: detailId,
                returnContents: selectedReason
            };
            try {
                const url = `${userApi}/${userId}/mypage/order/return`;
                const response = await axios.post(url, requestData, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json; charset=UTF-8',
                    }
                });
                setStatus("환불/반품 신청");
                setIsConfirming(true);
            } catch (e) {
                console.error("반품 신청 에러: ", e)
            }
        }
        closeModalHandler();
    };

    return (
        <div>
            <div>
                <Item>
                    <img src={img} className='productreview-img-review-content-img' alt="상품 이미지"/> {/* 상품 이미지 */}
                    <Info>
                        <tr>
                            <InfoTitle>브랜드</InfoTitle>
                            <InfoContent>{brand}</InfoContent> {/* 상품 브랜드*/}
                        </tr>
                        <tr>
                            <InfoTitle>상품명</InfoTitle>
                            <InfoContent>{name}</InfoContent> {/* 상품 이름 */}
                        </tr>
                        <tr>
                            <InfoTitle>옵션</InfoTitle>
                            <InfoContent>
                                {/* 상품 옵션 */}
                                <div>{option}</div>
                                <Line/>
                                {/* 상품 수량 */}
                                <OptionTitle>수량</OptionTitle>
                                <div>{count}</div>
                            </InfoContent>
                        </tr>
                        <tr>
                            <InfoTitle>결제금액</InfoTitle>
                            <InfoContent>{formatPrice(price)} 원</InfoContent> {/* 상품 금액 */}
                        </tr>
                    </Info>
                    {status === "결제 완료" || status === "배송 완료" ? (
                        <InfoProcess>
                            <div style={{paddingRight: '40px'}}>{status}</div>
                            <Button label={statusButton}
                                    variant={'secondary'}
                                    width={'base'}
                                    onClick={openModalHandler}/>
                        </InfoProcess>
                    ) : (
                        <InfoProcess>{status}</InfoProcess>
                    )}
                </Item>
            </div>
            {isOpen && (
                <ConfirmCancelModal isOpen={isOpen} onClose={closeModalHandler}
                                    onConfirm={() => handleConfirm(statusButton)} color='#ffd465'>
                    {
                        statusButton === "주문취소"
                            ? <div>해당 상품에 대한 주문이 취소됩니다.</div>
                            :
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                <div>해당 상품을 반품신청 합니다.</div>
                                <Select name="options" onChange={handleReasonChange}>
                                    <option disabled selected hidden>반품신청 사유를 선택하세요.</option>
                                    {['단순변심', '제품하자', '오배송'].map((option, index) => (
                                        <option key={index} value={option}>{option}</option>
                                    ))}
                                </Select>
                            </div>
                    }
                </ConfirmCancelModal>
            )}
        </div>
    );
}

const Select = styled.select`
  margin-top: 10px;
`

const Item = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px 0;
  align-items: center;
`

const Info = styled.table`
  text-align: left;
  margin-left: 24px;
  border-spacing: 8px;
  min-width: 340px;
`

const InfoTitle = styled.td`
  width: 80px;
  color: #A9AFB3;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`

const OptionTitle = styled.td`
  width: 40px;
  color: #A9AFB3;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`

const InfoContent = styled.td`
  color: #191919;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  display: flex;
  flex-direction: row;
  align-items: center;
`

const InfoProcess = styled.div`
  color: #000;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-left: auto;
  display: flex;
  align-items: center;
`

const Line = styled.div`
  width: 1px;
  height: 14px;
  background: #DBDBDB;
  margin: 0 20px;
`

export default OrderDetailItem;
