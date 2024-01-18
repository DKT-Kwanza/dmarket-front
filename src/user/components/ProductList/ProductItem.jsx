import React from 'react';
import { PiStarFill, PiStarLight } from "react-icons/pi";
import './ProductItem.css';

function ProductListItem({ imgSrc, brand, name, price, rating, reviews }) {
    return (
        <div className='productListItem-container'>
            <div className='productListItem-img'>
                <img src={imgSrc} alt={name} />
            </div>
            <div className='productListItem-info'>
                <div className='productListItem-brand'>{brand}</div>
                <div className='productListItem-name'>{name}</div>
                <div className='productListItem-price'>{price}원</div>
                <div className='productListItem-rating'>
                    <div>
                        {[...Array(rating)].map((_, i) => (
                            <PiStarFill className="productListItem-star-lg" key={i} />
                        ))}
                        {[...Array(5 - rating)].map((_, i) => (
                            <PiStarLight className="productListItem-star-lg" key={i} />
                        ))}
                    </div>
                    <span className='productListItem-reviews'> ({reviews}개)</span>
                </div>
            </div>
        </div>
    );
}

export default ProductListItem;
