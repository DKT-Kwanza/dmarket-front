import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import './CartPage.css';
import CheckBox from "../../../components/user/Common/CheckBox/CheckBox";
import CartList from "../../../components/user/List/CartList";
import CartOrderInfo from "../../../components/user/Info/CartOrderInfo";
import ConfirmCancelModal from "../../../components/commmon/Modal/ConfirmCancelModal";
import ConfirmModal from "../../../components/commmon/Modal/ConfirmModal";

function Cart() {
    const navigate = useNavigate();
    const [carts, setCarts] = useState({cartList: [], cartCount: 0});
    const [cartCount, setCartCount] = useState(0);
    const [selectAll, setSelectAll] = useState(false);
    const [checkedItems, setCheckedItems] = useState({});

    /* 세션 스토리지에서 토큰 가져오기 */
    const token = sessionStorage.getItem('token');
    const userId = sessionStorage.getItem('userId');

    /* 장바구니 데이터 조회 */
    useEffect(() => {
        const fetchData = async () => {
            const url = `http://172.16.210.136:8080/api/users/${userId}/cart`;
            try {
                const response = await axios.get(url, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
                setCarts(response.data.data);
                setCartCount(response.data.data.cartCount);
            } catch (e) {
                console.error("Error fetching data: ", e);
            }
        };
        fetchData();
    }, []);

    const navigateToOrder = () => {
        navigate("../../order");
    }

    /* 전체 선택 체크박스 상태*/
    const handleSelectAll = () => {
        const newCheckedItems = {};
        carts.cartList.forEach((_, index) => {
            newCheckedItems[index] = !selectAll;
        });
        setCheckedItems(newCheckedItems);
        setSelectAll(!selectAll);
    };

    /* 개별 상품 선택 체크박스 상태 */
    const handleItemCheck = index => {
        const newCheckedItems = {...checkedItems, [index]: !checkedItems[index]};
        setCheckedItems(newCheckedItems);
    };

    /* 장바구니에서 삭제할 것인지 묻는 모달 */
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
    };

    /* 빈 장바구니 일때 삭제 버튼 클릭 시 뜨는 모달 */
    const [emptyCartModalOpen, setEmptyCartModalOpen] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);
    const handleCloseEmptyCartModal = () => {
        setEmptyCartModalOpen(false);
    };
    const handleConfirm = () => {
        setIsConfirming(true);
    };

    /* 삭제 버튼 클릭 */
    const handleDeleteBtnClick = (checkedItems) => {
        const checkedCount = Object.values(checkedItems).filter(Boolean).length;

        if (checkedCount > 0) {
            setIsDeleteModalOpen(true);
        } else {
            setEmptyCartModalOpen(true);
        }
    };

    /* 모달 확인 버튼 클릭 시 장바구니 삭제 */
    const handleDeleteSelectedItems = async () => {
        /* 선택된 상품들의 cartId를 추출 */
        const selectedCartIds = carts.cartList
            .filter((_, index) => checkedItems[index])
            .map(item => item.cartId);

        /* 새로운 카트 리스트 생성 */
        const newCartList = carts.cartList.filter((_, index) => !checkedItems[index]);
        setCarts({...carts, cartList: newCartList});

        const newCheckedItems = {};
        newCartList.forEach((_, index) => {
            newCheckedItems[index] = false;
        });
        setCheckedItems(newCheckedItems);

        if (checkedItems) {
            /* 선택된 상품들을 삭제하는 API 호출 */
            try {
                await Promise.all(selectedCartIds.map(async cartId => {
                    const url = `http://172.16.210.136:8080/api/users/${userId}/cart/${cartId}`;
                    await axios.delete(url, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        }
                    });
                }));
                /* 선택된 상품의 개수 계산 */
                // const selectedItemCount = Object.values(checkedItems).filter(Boolean).length;
                setCartCount(cartCount - selectedItemCount);
                setIsDeleteModalOpen(false);
            } catch (e) {
                console.error("Error deleting Cart data: ", e);
            }
        }
    };

    /* 선택된 상품의 가격 배열 생성 */
    const selectedItemsPrices = carts.cartList
        .filter((_, index) => checkedItems[index])
        .map(item => item.productTotalSalePrice);

    /* 선택된 상품의 개수와 총 가격 계산 */
    const selectedItemCount = Object.values(checkedItems).filter(Boolean).length;
    const selectedItemTotalPrice = carts.cartList.reduce((total, item, index) => {
        if (checkedItems[index]) {
            return total + item.productTotalSalePrice;
        }
        return total;
    }, 0);

    const getSelectedItemsDetails = () => {
        return carts.cartList
            .filter((_, index) => checkedItems[index])
            .map(item => ({
                productId: item.productId,
                productCount: item.productCount,
                optionId: item.optionId,
                price: item.productTotalSalePrice,
            }));
    };
    
    
    const prices = getSelectedItemsDetails().map(item => item.price);

    return (
        <div className='cart-body'>
            <div className='cart-title'>
                <div className='cart-title-content'>장바구니</div>
            </div>
            <div className='cart-container'>
                <div className='cart-checkbox'>
                    <CheckBox checked={selectAll} onChange={handleSelectAll}/>
                </div>
                <div className='cart-count'>전체 상품 : <span>{cartCount}</span>개</div>
                <button onClick={() => {handleDeleteBtnClick(checkedItems)}} className='cart-delete-button'>삭제</button>
            </div>
            <div className='cart-bar'></div>
            <div className='cart-item-list'>
                <CartList items={carts.cartList} checkedItems={checkedItems} onItemCheck={handleItemCheck}/>
            </div>
            <CartOrderInfo
                navigateToOrder={navigateToOrder}
                itemCount={selectedItemCount}
                totalPrice={selectedItemTotalPrice}
                selectedItemsDetails={getSelectedItemsDetails()}
            />
            {isDeleteModalOpen && (
                <ConfirmCancelModal isOpen={isDeleteModalOpen} onClose={handleCloseDeleteModal} onConfirm={handleDeleteSelectedItems} color='#ff5d5d'>
                    <div>장바구니에서 삭제하시겠습니까?</div>
                </ConfirmCancelModal>
            )}
            {emptyCartModalOpen && (
                <ConfirmModal color='#FF5D5D' isOpen={emptyCartModalOpen} onClose={handleCloseEmptyCartModal} onConfirm={handleConfirm}>
                    <div>선택한 상품이 없습니다.</div>
                </ConfirmModal>
            )}
        </div>
    )
}

export default Cart;