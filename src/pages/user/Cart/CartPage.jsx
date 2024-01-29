import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CartPage.css';
import CheckBox from "../../../components/user/Common/CheckBox/CheckBox";
import CartList from "../../../components/user/List/CartList";
import CartOrderInfo from "../../../components/user/Info/CartOrderInfo";

function Cart(){
    const navigate = useNavigate();
    const [carts, setCarts] = useState({ cartList: [], cartCount: 0 });
    const [selectAll, setSelectAll] = useState(false);
    const [checkedItems, setCheckedItems] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("api/CartData.json");
                
                setCarts(response.data);
                console.log(carts)

            } catch (e) {
                console.error("Error fetching data: ", e);
            }
        };
        fetchData();
    }, []);

    const navigateToOrder = () => {
        navigate("../../order");
    }

    const handleSelectAll = () => { // 전체 선택 체크박스 상태
        const newCheckedItems = {};
        carts.cartList.forEach((_, index) => {
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
        const newCartList = carts.cartList.filter((_, index) => !checkedItems[index]);
        setCarts({ ...carts, cartList: newCartList });
    
        const newCheckedItems = {};
        newCartList.forEach((_, index) => {
            newCheckedItems[index] = false;
        });
        setCheckedItems(newCheckedItems);
    };

    // 선택된 상품의 가격 배열 생성
    const selectedItemsPrices = carts.cartList
        .filter((_, index) => checkedItems[index])
        .map(item => item.price);

    // 선택된 상품의 개수와 총 가격 계산
    const selectedItemCount = Object.values(checkedItems).filter(Boolean).length;
    
    const selectedItemTotalPrice = carts.cartList.reduce((total, item, index) => {
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
                <div className='cart-count'>전체 상품 : <span>{carts.cartCount}</span>개</div>
                <button onClick={handleDeleteSelected} className='cart-delete-button'>삭제</button>
            </div>
            <div className='cart-bar'></div>
            <div className='cart-item-list'>
                <CartList items={carts.cartList} checkedItems={checkedItems} onItemCheck={handleItemCheck} />
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