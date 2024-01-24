import StarRating from "../../../components/user/Common/StarRating";
import './ProductListItem.css'

function ProductListItem({onClick, brand, productName, productImg, sales, ratingAvg, reviewCnt}) {

    return (
        <div className='productListItem-container' onClick={onClick}>
            <div className='productListItem-img'>
                <img src={productImg} alt={productName}/>
            </div>
            <div className='productListItem-info'>
                <div className='productListItem-brand'>{brand}</div>
                <div className='productListItem-name'>{productName}</div>
                <div className='productListItem-price'>{sales} 원</div>

                {ratingAvg ?
                    <div className='productListItem-review'>
                        <StarRating rating={ratingAvg} style='none'/>
                        <span className='productListItem-reviews'> (<span>{reviewCnt}</span>개)</span>
                    </div>
                    : null}
            </div>
        </div>
    )
}

export default ProductListItem;