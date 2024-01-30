import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WishItemList from '../../../components/user/List/WishItemList';
import CheckBox from "../../../components/user/Common/CheckBox/CheckBox";
import './Mywish.css';

function WishList() {
    const [wishLists, setWishLists] = useState([]);
    const [wishCount, setWishCount] = useState(0);
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
                setWishCount(response.data.data.wishCount);
            } catch (e) {
                console.error("Error fetching data: ", e);
            }
        };
        fetchData();
    }, []);

    /* 전체 선택 체크박스 상태 */
    const handleSelectAll = () => {
        const newCheckedItems = {};
        wishLists.wishListItem.forEach((item, index) => {
            newCheckedItems[index] = !selectAll;
        });
        setCheckedItems(newCheckedItems);
        setSelectAll(!selectAll);
    };

    /* 개별 상품 선택 체크박스 상태 */
    const handleItemCheck = index => {
        const newCheckedItems = { ...checkedItems, [index]: !checkedItems[index] };
        setCheckedItems(newCheckedItems);
    };

    /* 위시 리스트 삭제 */
    const handleDeleteSelected = async () => {
        /* 선택된 상품들의 wishId를 추출 */
        const selectedWishIds = wishLists.wishListItem
            .filter((_, index) => checkedItems[index])
            .map(item => item.wishId);

        /* 새로운 위시 리스트 생성 */
        const newWishLists = wishLists.wishListItem.filter((_, index) => !checkedItems[index]);
        setWishLists({...wishLists, wishListItem: newWishLists});

        const newCheckedItems = {};
        newWishLists.forEach((_, index) => {
            newCheckedItems[index] = false;
        });
        setCheckedItems(newCheckedItems);

        /* 선택된 상품들을 삭제하는 API 호출 */
        try {
            await Promise.all(selectedWishIds.map(async wishId => {
                const url = `http://172.16.210.136:8080/api/users/${userId}/wish/${wishId}`;
                await axios.delete(url, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
            }));
            /* 선택된 상품의 개수 계산 */
            const selectedItemCount = Object.values(checkedItems).filter(Boolean).length;
            setWishCount(wishCount-selectedItemCount)
        } catch (e) {
            console.error("Error deleting Cart data: ", e);
        }
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
                <div className='wishList-count'>전체 상품 : <span>{wishCount}</span> 개</div>
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
