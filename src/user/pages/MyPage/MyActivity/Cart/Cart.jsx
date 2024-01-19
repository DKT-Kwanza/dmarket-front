import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';
import CheckBox from '../../../../components/CheckBox/CheckBox';
import CartList from '../../../../components/Cart/CartList';
import eximg from '../../../../../assets/images/720X720.jpg'
import CartOrderInfo from '../../../../components/Cart/CartOrderInfo';

function Cart(){
    const [cartData, setCartData] = useState([
        {
            imgSrc: eximg,
            brand: "JAJU",
            name: "쿠시노 코지 저상형 침대(패브릭,SS)",
            option: "GREY BEIGE L",
            count: "1",
            price: "1,208,000"
        },
        {
            imgSrc: eximg,
            brand: "나이키",
            name: "여성 나이키 코르테즈 DN1791-105",
            option: "black",
            count: "1",
            price: "85,680"
        },
        {
            imgSrc: eximg,
            brand: "마리끌레르",
            name: "렘스 퍼 무스 집업 점퍼(MSDDJP08SA)",
            option: "s",
            count: "1",
            price: "55,200"
        },
    ])

    const navigate = useNavigate();

    const [selectAll, setSelectAll] = useState(false);
    const [checkedItems, setCheckedItems] = useState({});

    const navigateToOrder = () => {
        navigate("../order");
    }

    const handleSelectAll = () => { // 전체 선택 체크박스 상태
        const newCheckedItems = {};
        cartData.forEach((item, index) => {
            newCheckedItems[index] = !selectAll;
        });
        setCheckedItems(newCheckedItems);
        setSelectAll(!selectAll);
    };

    const handleItemCheck = index => { // 개별 상품 선택 체크박스 상태
        const newCheckedItems = { ...checkedItems, [index]: !checkedItems[index] };
        setCheckedItems(newCheckedItems);
    };

    const handleDeleteSelected = () => { // 체크한 상품 삭제
        const newCartData = cartData.filter((_, index) => !checkedItems[index]);
        setCartData(newCartData);

        const newCheckedItems = {};
        newCartData.forEach((_, index) => {
            newCheckedItems[index] = false;
        });
        setCheckedItems(newCheckedItems);
    };

    // 선택된 상품의 가격 배열 생성
    const selectedItemsPrices = cartData
        .filter((_, index) => checkedItems[index])
        .map(item => item.price);

    // 선택된 상품의 개수와 총 가격 계산
    const selectedItemCount = Object.values(checkedItems).filter(Boolean).length;
    const selectedItemTotalPrice = cartData.reduce((total, item, index) => {
        if (checkedItems[index]) {
            return total + parseFloat(item.price.replace(/,/g, '')); // 가격 문자열에서 쉼표 제거 후 숫자로 변환
        }
        return total;
    }, 0);

    return(
        <div className='cart-body'>
            <div className='cart-title'>
                <div className='cart-title-content'>장바구니</div>
            </div>
            <div className='cart-container'>
                <div className='cart-checkbox'>
                    <CheckBox checked={selectAll} onChange={handleSelectAll} />
                </div>
                <div className='cart-count'>전체 상품 : <span>{cartData.length}</span>개</div>
                <button onClick={handleDeleteSelected} className='cart-delete-button'>삭제</button>
            </div>
            <div className='cart-bar'></div>
            <div className='cart-item-list'>
                <CartList items={cartData} checkedItems={checkedItems} onItemCheck={handleItemCheck} />
            </div>
            <CartOrderInfo 
                navigateToOrder={navigateToOrder}
                itemCount={selectedItemCount}
                totalPrice={selectedItemTotalPrice}
                prices={selectedItemsPrices}
            />
        </div>
    )
}

export default Cart;