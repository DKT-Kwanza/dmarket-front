import './CartItem.css';
import CheckBox from '../Common/CheckBox/CheckBox';

function CartItem ({ productImg, brand, productName, price, option, quantity, checked, onCheck }){

    return(
        <div className='cartItem-container'>
            <div className='cartItem-checkbox'>
                <CheckBox checked={checked} onChange={onCheck} />
                </div>
            <div className='cartItem-item'>
                <div className='cartItem-img'>
                    <img src={productImg} style={{ width: "100px", height: "100px" }}/>
                </div>
                <div className='cartItem-description'>
                    <div className='cartItem-brand'>{brand}</div>
                    <div className='cartItem-name'>{productName}</div>
                    <div className='cartItem-description-bar'></div>
                    <div className='cartItem-option'>
                        <div>{option}</div>
                        <div className='cartItem-option-value'>{quantity}</div>
                    </div>
                </div>
            </div>
            <div className='cartItem-bar'></div>
            <div className='cartItem-price'>{price}원</div>
        </div>
    )
}

export default CartItem;