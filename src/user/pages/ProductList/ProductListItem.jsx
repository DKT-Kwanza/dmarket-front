import { useState } from 'react';
import { PiStarFill, PiStarLight } from "react-icons/pi";
import './ProductListItem.css'

function ProductListItem(){
    // 별점
    const [rating, setRating] = useState(3);

    return (
        <div className='productListItem-container'>
            <div className='productListItem-img'>
            </div>
            <div className='productListItem-info'>
                <div className='productListItem-brand'>일룸</div>
                <div className='productListItem-name'>쿠시노 코지 저상형 침대</div>
                <div className='productListItem-price'>1,208,000원</div>
                <div>
                    <div>
                        {[...Array(rating)].map((a, i) => (
                            <PiStarFill className="productListItem-star-lg" key={i} />
                        ))}
                        {[...Array(5 - rating)].map((a, i) => (
                            <PiStarLight className="productListItem-star-lg" key={i} />
                        ))}
                    </div>
                    <span className='productListItem-reviews'> (<span>5</span>개)</span>
                </div>
            </div>
        </div>
    )
}

export default ProductListItem;