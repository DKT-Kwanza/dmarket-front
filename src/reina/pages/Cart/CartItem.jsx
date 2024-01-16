import './CartItem.css';
import CheckBox from '../../components/CheckBox';

function CartItem(){

    return(
        <div className='cartItem-container'>
            <CheckBox />
            <div className='cartItem-item'>
                <div className='cartItem-img'>
                    이미지
                </div>
                <div className='cartItem-description'>
                    <div className='cartItem-brand'>브랜드</div>
                    <div className='cartItem-name'>상품명</div>
                    <div className='cartItem-description-bar'></div>
                    <div className='cartItem-option'>
                        <div>옵션</div>
                        <div className='cartItem-option-value'>GREY L</div>
                    </div>
                </div>
            </div>
            <div className='cartItem-bar'></div>
            <div className='cartItem-price'>88,536원</div>
        </div>
    )
}

export default CartItem;