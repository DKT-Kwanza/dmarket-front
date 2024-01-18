import React, { useState, useEffect } from 'react';
import WishItemList from '../../../../components/Wishlist/WishItemList';
import CheckBox from '../../../../components/CheckBox/CheckBox';
import './WishList.css';
import eximg from '../../../../../assets/images/720X720.jpg'

function WishList() {
    const [wishData, setWishData] = useState([
        {
            imgSrc: eximg,
            brand: "JAJU",
            name: "쿠시노 코지 저상형 침대(패브릭,SS)",
            price: "1,208,000"
        },
        {
            imgSrc: eximg,
            brand: "나이키",
            name: "여성 나이키 코르테즈 DN1791-105",
            price: "85,680"
        },
        {
            imgSrc: eximg,
            brand: "마리끌레르",
            name: "렘스 퍼 무스 집업 점퍼(MSDDJP08SA)",
            price: "55,200"
        },
    ])

    const [selectAll, setSelectAll] = useState(false);
    const [checkedItems, setCheckedItems] = useState({});

    const handleSelectAll = () => { // 전체 선택 체크박스 상태
        const newCheckedItems = {};
        wishData.forEach((item, index) => {
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
        const newWishData = wishData.filter((_, index) => !checkedItems[index]);
        setWishData(newWishData);

        const newCheckedItems = {};
        newWishData.forEach((_, index) => {
            newCheckedItems[index] = false;
        });
        setCheckedItems(newCheckedItems);
    };

    return(
        <div className='wishList-body'>
            <div className='wishList-title'>
                <div className='wishList-title-content'>위시리스트</div>
            </div>
            <div className='wishList-container'>
                <div className='wishList-checkbox'>
                    <CheckBox checked={selectAll} onChange={handleSelectAll} />
                </div>
                <div className='wishList-count'>전체 상품 : <span>{wishData.length}</span>개</div>
                <button onClick={handleDeleteSelected} className='wishList-delete-button'>삭제</button>
            </div>
            <div className='wishList-bar'></div>
            <div className='wishList-item-list'>
                <WishItemList items={wishData} checkedItems={checkedItems} onItemCheck={handleItemCheck} />
            </div>
        </div>
    )
}

export default WishList;
