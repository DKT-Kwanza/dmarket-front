import React from 'react';
import './MainProductItem.css'
import {formatPrice} from "../../../utils/Format";

const ProductItem = ({ brand, productName, productImg, sales, discountRate, onClick }) => {
  return (
    <div className='main-div-product-wrapper' onClick={onClick}>
      <div className='main-div-product-img-wrapper'>
        <img src={productImg} className='main-img-product' alt='상품이미지'/>
      </div>
      <div className='main-div-text-wrapper'>
        <div>
          <p className='main-p-product-brandname'>{brand}</p>
        </div>
        <div>
          <p className='main-p-product-name'>{productName}</p>
        </div>
        <div className='main-div-product-price-wrapper'>
          <p className='main-p-product-price'>{formatPrice(sales)}</p>
          <p className='main-p-product-won'>원</p>
          <div className='main-p-product-discount'>SALE {discountRate}%</div>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
