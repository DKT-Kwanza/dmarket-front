import {PiStarFill, PiStarLight} from "react-icons/pi";
import './ProductItem.css'

function ProductItem({onClick, brand, productName, imgSrc, sales, ratingAvg, reviewCnt}) {
    // 별점
    const rating = ratingAvg;

    return (
        <div className='productListItem-container' onClick={onClick}>
            <div className='productListItem-img'>
                <img src={imgSrc} alt={productName}/>
            </div>
            <div className='productListItem-info'>
                <div className='productListItem-brand'>{brand}</div>
                <div className='productListItem-name'>{productName}</div>
                <div className='productListItem-price'>{sales} 원</div>
                {
                    rating
                        ? <div className='productListItem-review'>
                            <div>
                                {[...Array(rating)].map((a, i) => (
                                    <PiStarFill className="productListItem-star-lg" key={i}/>
                                ))}
                                {[...Array(5 - rating)].map((a, i) => (
                                    <PiStarLight className="productListItem-star-lg" key={i}/>
                                ))}
                            </div>
                            <span className='productListItem-reviews'> (<span>{reviewCnt}</span>개)</span>
                        </div>
                        : null
                }
            </div>
        </div>
    );
}

export default ProductItem;
