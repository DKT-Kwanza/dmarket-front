import { useNavigate } from 'react-router-dom';
import './MyPageSidebar.css';

const MyPageSidebar = () => {

    const navigate = useNavigate();
    const navigateToOrderHistory = () => {
        navigate('/mypage/orderhistory');
    }

    const navigateToCart = () => {
        navigate('/mypage/cart');
    }

    const navigateToWishList = () => {
        navigate('/mypage/wishlist');
    }

    const navigateToReviewList = () => {
        navigate('/mypage/reviewlist');
    }

    const navigateToInquiry = () => {
        navigate('/mypage/inquiry');
    }

    const navigateToChangeInfo = () => {
        navigate('/mypage/changeinfo');
    }

    const navigateToChangePwd = () => {
        navigate('/mypage/changepwd');
    }

    const temp = () => {
        navigate('/');
    }

    return (
        <div className='myPage-sideBar'>
            <div className='myPage-sideBar-wrapper'>

                <div className='myPage-sideBar-wrapper-contents'>
                    <p className='myPage-sideBar-wrapper-contents-title'>나의 주문관리</p>
                    <button className='myPage-sideBar-wrapper-contents-button' onClick={navigateToOrderHistory}>주문/배송 조회</button>
                </div>

                <hr className='myPage-sideBar-wrapper-hr' />

                <div className='myPage-sideBar-wrapper-contents'>
                    <p className='myPage-sideBar-wrapper-contents-title'>나의 활동관리</p>
                    <button className='myPage-sideBar-wrapper-contents-button' onClick={navigateToCart}>장바구니</button>
                    <button className='myPage-sideBar-wrapper-contents-button' onClick={navigateToWishList}>위시리스트</button>
                    <button className='myPage-sideBar-wrapper-contents-button' onClick={navigateToReviewList}>상품리뷰</button>
                    <button className='myPage-sideBar-wrapper-contents-button' onClick={temp}>상품 Q&A</button>
                    <button className='myPage-sideBar-wrapper-contents-button' onClick={navigateToInquiry}>고객 문의</button>
                </div>

                <hr className='myPage-sideBar-wrapper-hr' />

                <div className='myPage-sideBar-wrapper-contents'>
                    <p className='myPage-sideBar-wrapper-contents-title'>나의 정보관리</p>
                    <button className='myPage-sideBar-wrapper-contents-button' onClick={navigateToChangeInfo}>회원정보 변경</button>
                    <button className='myPage-sideBar-wrapper-contents-button' onClick={navigateToChangePwd}>비밀번호 변경</button>
                </div>

            </div>
        </div>
    );
};

export default MyPageSidebar;
