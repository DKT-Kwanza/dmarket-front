import styled from 'styled-components';

function OrderItem({productImg, productBrand, productName, productOption, productCount, productTotalSalePrice, children}) {
    return (
        <Item>
            <img src={productImg} className='productreview-img-review-content-img' alt="상품 이미지"/> {/* 상품 이미지 */}
            <Info>
                <tr>
                    <InfoTitle>브랜드</InfoTitle>
                    <InfoContent>{productBrand}</InfoContent> {/* 상품 브랜드*/}
                </tr>
                <tr>
                    <InfoTitle>상품명</InfoTitle>
                    <InfoContent>{productName}</InfoContent> {/* 상품 이름 */}
                </tr>
                <tr>
                    <InfoTitle>옵션</InfoTitle>
                    <InfoContent>
                        <div>{productOption}</div> {/* 상품 옵션 */}
                        <div className="mypageProductReview-item-info-bar"/>
                        <div>{productCount}</div>
                    </InfoContent>
                </tr>
                <tr>
                    <InfoTitle>결제금액</InfoTitle>
                    <InfoContent>{productTotalSalePrice} 원</InfoContent> {/* 상품 금액 */}
                </tr>
            </Info>
            <InfoProcess>{children}</InfoProcess> {/* 리뷰 작성 버튼 */}
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