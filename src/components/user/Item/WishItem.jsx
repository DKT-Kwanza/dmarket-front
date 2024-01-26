import React, { useState } from 'react';
import './WishItem.css';
import CheckBox from '../Common/CheckBox/CheckBox';

function WishItem({ productImg, brand, productName, sales, checked, onCheck }) {
    return(
        <div className='wishItem-container'>
            <div className='wishList-checkbox'>
                <CheckBox checked={checked} onChange={onCheck} />
            </div>
            <div className='wishItem-item'>
                    <img src={productImg} style={{ width: "100px", height: "100px" }}/>
                <div>
                    <div className='wishItem-brand'>{brand}</div>
                    <div className='wishItem-name'>{productName}</div>
                </div>
            </div>
            <div className='wishItem-bar'></div>
            <div className='wishItem-price'>{sales}원</div>
        </div>
    );
}

export default WishItem;
