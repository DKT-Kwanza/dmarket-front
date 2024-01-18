// 주문한 아이템 입니다.
// 사진, 정보, 배송 상태
import styled from 'styled-components';

function OrderItem({img, brand, name, option, price, children}) {
    return (
        <Item>
            <img src={img} className='productreview-img-review-content-img' alt="상품 이미지"/>
            <Info>
                <tr>
                    <InfoTitle>브랜드</InfoTitle>
                    <InfoContent>{brand}</InfoContent>
                </tr>
                <tr>
                    <InfoTitle>상품명</InfoTitle>
                    <InfoContent>{name}</InfoContent>
                </tr>
                <tr>
                    <InfoTitle>옵션</InfoTitle>
                    <InfoContent>
                        <div>{option}</div>
                    </InfoContent>
                </tr>
                <tr>
                    <InfoTitle>결제금액</InfoTitle>
                    <InfoContent>{price} 원</InfoContent>
                </tr>
            </Info>
            <InfoProcess>{children}</InfoProcess>
        </Item>
    );
}

const Item = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px 0;
  align-items: center;
`

const ItemImg = styled.div`
  width: 129px;
  height: 129px;
  background: #D9D9D9;
`

const Info = styled.table`
  text-align: left;
  margin-left: 24px;
  border-spacing: 8px;
`

const InfoTitle = styled.td`
  width: 80px;
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

export default OrderItem;