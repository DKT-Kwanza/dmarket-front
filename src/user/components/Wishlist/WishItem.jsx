import React, { useState } from 'react';
import './WishItem.css';
import CheckBox from '../CheckBox/CheckBox';

function WishItem({ imgSrc, brand, name, price, checked, onCheck }) {
    return(
        <div className='wishItem-container'>
            <div className='wishList-checkbox'>
                <CheckBox checked={checked} onChange={onCheck} />
            </div>
            <div className='wishItem-item'>
                    <img src={imgSrc} alt={name} style={{ width: "100px", height: "100px" }}/>
                <div>
                    <div className='wishItem-brand'>{brand}</div>
                    <div className='wishItem-name'>{name}</div>
                </div>
            </div>
            <div className='wishItem-bar'></div>
            <div className='wishItem-price'>{price}원</div>
        </div>
    );
}

export default WishItem;
