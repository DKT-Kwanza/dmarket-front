import React, { useState } from 'react';
import './Cart.css';
import CheckBox from '../../../../components/CheckBox/CheckBox';
import CartList from '../../../../components/Cart/CartList';
import eximg from '../../../../../assets/images/720X720.jpg'

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

    const [selectAll, setSelectAll] = useState(false);
    const [checkedItems, setCheckedItems] = useState({});

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
            <div className='cart-order'>
                <div className='cart-choice'>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 -2 28 28" fill="none">
                            <path d="M18.667 9.33333C18.667 10.571 18.1753 11.758 17.3002 12.6332C16.425 13.5083 15.238 14 14.0003 14C12.7627 14 11.5757 13.5083 10.7005 12.6332C9.82533 11.758 9.33367 10.571 9.33367 9.33333M4.23909 8.63495L3.42242 18.4349C3.24698 20.5402 3.15926 21.5929 3.51513 22.4049C3.8278 23.1183 4.36953 23.7071 5.05455 24.0779C5.83422 24.5 6.8905 24.5 9.00308 24.5H18.9976C21.1102 24.5 22.1665 24.5 22.9461 24.0779C23.6311 23.7071 24.1729 23.1183 24.4855 22.4049C24.8414 21.5929 24.7537 20.5402 24.5782 18.4349L23.7616 8.63495C23.6106 6.82354 23.5352 5.91784 23.134 5.23233C22.7808 4.62868 22.2548 4.1447 21.6239 3.84282C20.9075 3.5 19.9986 3.5 18.1809 3.5L9.81975 3.5C8.00206 3.5 7.09322 3.5 6.37677 3.84282C5.74587 4.1447 5.21988 4.62868 4.86665 5.23233C4.46551 5.91784 4.39004 6.82354 4.23909 8.63495Z" stroke="#444444" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <div className='cart-choice-count'>선택 상품: <span>1</span>개</div>
                </div>
                <div className='cart-choice-bar'></div>
                <div className='cart-order-detail'>
                    <div>
                        <div className='cart-order-price'>
                            <div>주문 금액</div>
                            <div className='cart-item-price'>
                                <div>88,536원</div>
                                <div>+ 10,000원</div>
                            </div>
                        </div>
                        <div className='cart-order-bar'></div>
                        <div className='cart-total-price'>
                            <div>총 결제 금액</div>
                            <div>89,761원</div>
                        </div>
                    </div>
                    <div className='cart-order-container'>
                        <div className='cart-order-tos'>주문정보 및 서비스 이용약관에 동의합니다.</div>
                        <button className='cart-order-btn'>주문하기</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart;