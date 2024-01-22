import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WishItemList from '../../../../components/Wishlist/WishItemList';
import CheckBox from '../../../../components/CheckBox/CheckBox';
import './WishList.css';

function WishList() {
    const [wishLists, setWishLists] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [checkedItems, setCheckedItems] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/WishListData.json");
                
                setWishLists(response.data);

            } catch (e) {
                console.error("Error fetching data: ", e);
            }
        };
        fetchData();
    }, []);

    const handleSelectAll = () => { // 전체 선택 체크박스 상태
        const newCheckedItems = {};
        wishLists.forEach((item, index) => {
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
        const newWishLists = wishLists.filter((_, index) => !checkedItems[index]);
        setWishLists(newWishLists);

        const newCheckedItems = {};
        newWishLists.forEach((_, index) => {
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
                <div className='wishList-count'>전체 상품 : <span>{wishLists.length}</span>개</div>
                <button onClick={handleDeleteSelected} className='wishList-delete-button'>삭제</button>
            </div>
            <div className='wishList-bar'></div>
            <div className='wishList-item-list'>
                <WishItemList items={wishLists} checkedItems={checkedItems} onItemCheck={handleItemCheck} />
            </div>
        </div>
    )
}

export default WishList;
