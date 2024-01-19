import './CartItem.css';
import CheckBox from '../CheckBox/CheckBox';

function CartItem ({ imgSrc, brand, name, price, option, count, checked, onCheck }){

    return(
        <div className='cartItem-container'>
            <div className='cartItem-checkbox'>
                <CheckBox checked={checked} onChange={onCheck} />
                </div>
            <div className='cartItem-item'>
                <div className='cartItem-img'>
                    <img src={imgSrc} alt={name} style={{ width: "100px", height: "100px" }}/>
                </div>
                <div className='cartItem-description'>
                    <div className='cartItem-brand'>{brand}</div>
                    <div className='cartItem-name'>{name}</div>
                    <div className='cartItem-description-bar'></div>
                    <div className='cartItem-option'>
                        <div>{option}</div>
                        <div className='cartItem-option-value'>{count}</div>
                    </div>
                </div>
            </div>
            <div className='cartItem-bar'></div>
            <div className='cartItem-price'>{price}원</div>
        </div>
    )
}

export default CartItem;