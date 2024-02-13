import React from 'react';
import styled from "styled-components";
import './MainProductItem.css'
import {formatPrice,truncate} from "../../../utils/Format";

const ProductItem = ({ brand, productName, productImg, sales, discountRate, onClick }) => {
  return (
    <div className='main-div-product-wrapper' onClick={onClick}>
      <div className='main-div-product-img-wrapper'>
        <img src={productImg} className='main-img-product' alt='상품이미지'/>
      </div>
      <TextWrapper>
        <div>
          <p className='main-p-product-brandname'>{brand}</p>
        </div>
        <div>
          <p className='main-p-product-name'>{truncate(productName, 50)}</p>
        </div>
        <div className='main-div-product-price-wrapper'>
          <p className='main-p-product-price'>{formatPrice(sales)}</p>
          <p className='main-p-product-won'>&nbsp;원</p>
          <div className='main-p-product-discount'>SALE {discountRate}%</div>
        </div>
      </TextWrapper>
    </div>
  );
}

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 5px 10px;
`

export default ProductItem;
