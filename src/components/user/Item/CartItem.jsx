import './CartItem.css';
import styled from 'styled-components';
import CheckBox from '../Common/CheckBox/CheckBox';
import {formatPrice} from "../../../utils/Format";

function CartItem({productImg, brand, productName, price, option, quantity, checked, onCheck, onClick}) {

    return (
        <div className='cartItem-container'>
            <div className='cartItem-checkbox'>
                <CheckBox checked={checked} onChange={onCheck}/>
            </div>
            <div className='cartItem-item' onClick={onClick}>
                <div className='cartItem-img'>
                    <img src={productImg} style={{width: "100px", height: "100px"}}/>
                </div>
                <div className='cartItem-description'>
                    <div className='cartItem-brand'>{brand}</div>
                    <div className='cartItem-name'>{productName}</div>
                    <div className='cartItem-description-bar'></div>
                    <div className='cartItem-option'>
                        <div>옵션</div>
                        <Value>{option}</Value>
                        <Line/>
                        <div>수량</div>
                        <Value>{quantity}</Value>
                    </div>
                </div>
            </div>
            <div className='cartItem-bar'></div>
            <div className='cartItem-price'>{formatPrice(price)}원</div>
        </div>
    )
}

const Line = styled.div`
  width: 1px;
  height: 12px;
  background: #DBDBDB;
  margin: 0 10px;
`

const Value = styled.div`
  color: #505050;
  font-weight: 500;
`

export default CartItem;