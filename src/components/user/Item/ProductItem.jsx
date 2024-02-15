import './ProductItem.css'
import { formatPrice } from "../../../utils/Format";
import StarRating from "../Common/Rating/StarRating";

function ProductItem({onClick, brand, productName, imgSrc, sales, ratingAvg, reviewCnt, discountRate}) {
    // 별점
    const rating = ratingAvg;

    return (
        <div className='productListItem-container' onClick={onClick}>
            <div className='productListItem-img'>
                <img src={imgSrc} alt={productName} />
            </div>
            <div className='productListItem-info'>
                <div className='productListItem-brand'>{brand}</div>
                <div className='productListItem-name'>{productName}</div>
                <div className='productListItem-price-info'>
                    <div className='productListItem-price'>{formatPrice(sales)} 원</div>
                    <div className='productListItem-discount'>SALE {discountRate}%</div>
                </div>
                {
                    rating
                        ? <div className='productListItem-review'>
                            <div>
                                <StarRating rating={ratingAvg} />
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

