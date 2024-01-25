import React, {useState, useEffect} from 'react';
import GreyBtn from '../Common/GreyBtn';
import styled from 'styled-components';
import ConfirmCancelModal from '../Common/ConfirmCancelModal'
import SelectBox from "../../commmon/SelectBox";

function OrderDetailItem({img, brand, name, option, count, price, status}) {
    const [statusText, setStatusText] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);

    useEffect(() => {
        if (status === "결제 확인") {
            setStatusText("주문취소");
        } else if (status === "배송 완료") {
            setStatusText("반품신청");
        }
    }, []);

    const openModalHandler = () => {
        setIsOpen(true);
    };

    const closeModalHandler = () => {
        setIsOpen(false);
    };

    const handleConfirm = () => {
        // modal 의 확인 을 누르면 button 이 disabled
        setIsConfirming(true);
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
                                <Line />
                                {/* 상품 수량 */}
                                <OptionTitle>수량</OptionTitle>
                                <div>{count}</div>
                            </InfoContent>
                        </tr>
                        <tr>
                            <InfoTitle>결제금액</InfoTitle>
                            <InfoContent>{price} 원</InfoContent> {/* 상품 금액 */}
                        </tr>
                    </Info>
                    {status === "결제 확인" || status === "배송 완료" ? (
                        <GreyBtn onClick={openModalHandler}>{statusText}</GreyBtn>
                    ) : (
                        <InfoProcess>{status}</InfoProcess>
                    )}
                </Item>
            </div>
            {isOpen && (
                <ConfirmCancelModal isOpen={isOpen} onClose={closeModalHandler} onConfirm={handleConfirm}>
                    {
                        statusText === "주문취소"
                            ? <div>해당 상품에 대한 주문이 취소됩니다.</div>
                            :
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                <div>해당 상품을 반품신청 합니다.</div>
                                <SelectBox text={'반품신청 사유를 선택하세요'} options={['단순변심', '제품하자', '오배송']}/>
                            </div>
                    }
                </ConfirmCancelModal>
            )}
        </div>
    );
}

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
`

const Line = styled.div`
  width: 1px;
  height: 14px;
  background: #DBDBDB;
  margin: 0 20px;
`

export default OrderDetailItem;