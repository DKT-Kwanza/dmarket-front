import { useNavigate } from 'react-router-dom';
import './MyPageSidebar.css';

const MyPageSidebar = () => {

    const navigate = useNavigate();
    // onClick 발생 시 각각의 page 로 navigate
    const navigateToOrderHistory = () => {
        navigate('/mypage/orderhistory');   // NavigateToOrderHistory
    }

    const navigateToCart = () => {
        navigate('/mypage/cart');   // navigateToCart
    }

    const navigateToWishList = () => {
        navigate('/mypage/wishlist');   // navigateToWishList
    }

    const navigateToReviewList = () => {
        navigate('/mypage/reviewlist'); //navigateToReviewList
    }

    const navigateToQna = () => {
        navigate('/mypage/qna');    // navigateToQna
    }

    const navigateToInquiry = () => {
        navigate('/mypage/inquiry');    // navigateToInquiry
    }

    const navigateToChangeInfo = () => {
        navigate('/mypage/changeinfo'); // navigateToChangeInfo
    }

    const navigateToChangePwd = () => {
        navigate('/mypage/changepwd');  // navigateToChangePwd
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
                    <button className='myPage-sideBar-wrapper-contents-button' onClick={navigateToQna}>상품 Q&A</button>
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
