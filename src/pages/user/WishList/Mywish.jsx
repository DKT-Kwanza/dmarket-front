import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WishItemList from '../../../components/user/List/WishItemList';
import CheckBox from "../../../components/user/Common/CheckBox/CheckBox";
import './Mywish.css';

function WishList() {
    const [wishLists, setWishLists] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [checkedItems, setCheckedItems] = useState({});

    /* 세션 스토리지에서 토큰 가져오기 */
    const token = sessionStorage.getItem('token');
    const userId = sessionStorage.getItem('userId');

    /* 위시리스트 데이터 조회 */
    useEffect(() => {
        const fetchData = async () => {
            const url = `http://172.16.210.136:8080/api/users/${userId}/wish`;
            try {
                const response = await axios.get(url, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
                setWishLists(response.data.data);
                console.log(response.data.data)
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
                <div className='wishList-count'>전체 상품 : <span>{wishLists.wishCount}</span>개</div>
                <button onClick={handleDeleteSelected} className='wishList-delete-button'>삭제</button>
            </div>
            <div className='wishList-bar'></div>
            <div className='wishList-item-list'>
                <WishItemList items={wishLists.wishListItem} checkedItems={checkedItems} onItemCheck={handleItemCheck} />
            </div>
        </div>
    )
}

export default WishList;
