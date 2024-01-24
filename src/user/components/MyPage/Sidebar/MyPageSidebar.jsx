import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './MyPageSidebar.css';

const MyPageSidebar = () => {

    const navigate = useNavigate();
    const location = useLocation(); // 현재 페이지의 위치
    const [activePage, setActivePage] = useState('');

    useEffect(() => {
        const path = location.pathname.split('/mypage/')[1];
        setActivePage(path);
    }, [location]);

    /* 해당 페이지일 경우 해당 버튼 black */
    const getButtonStyle = (buttonPath) => {
        return activePage === buttonPath ? { color: 'black' } : { color: '#A9AFB3' };
    }

    // onClick 발생 시 각각의 page 로 navigate
    const navigateToPage = (path) => {
        navigate(`/mypage/${path}`);
    }

    return (
        <div className='myPage-sideBar'>
            <div className='myPage-sideBar-wrapper'>

                <div className='myPage-sideBar-wrapper-contents'>
                    <p className='myPage-sideBar-wrapper-contents-title'>나의 주문관리</p>
                    <button 
                        className='myPage-sideBar-wrapper-contents-button' 
                        onClick={() => navigateToPage('orderhistory')}
                        style={getButtonStyle('orderhistory')}
                    >
                        주문/배송 조회
                    </button>
                </div>

                <hr className='myPage-sideBar-wrapper-hr' />

                <div className='myPage-sideBar-wrapper-contents'>
                    <p className='myPage-sideBar-wrapper-contents-title'>나의 활동관리</p>
                    <button 
                        className='myPage-sideBar-wrapper-contents-button' 
                        onClick={() => navigateToPage('cart')}
                        style={getButtonStyle('cart')}
                    >
                        장바구니
                    </button>
                    <button 
                        className='myPage-sideBar-wrapper-contents-button' 
                        onClick={() => navigateToPage('wishlist')}
                        style={getButtonStyle('wishlist')}
                    >
                        위시리스트
                    </button>
                    <button 
                        className='myPage-sideBar-wrapper-contents-button' 
                        onClick={() => navigateToPage('reviewlist')} 
                        style={getButtonStyle('reviewlist')}
                    >
                        상품리뷰
                    </button>
                    <button 
                        className='myPage-sideBar-wrapper-contents-button' 
                        onClick={() => navigateToPage('qna')}
                        style={getButtonStyle('qna')}
                    >
                        상품 Q&A
                    </button>
                    <button 
                        className='myPage-sideBar-wrapper-contents-button' 
                        onClick={() => navigateToPage('inquiry')}
                        style={getButtonStyle('inquiry')}
                    >
                        고객 문의
                    </button>
                </div>

                <hr className='myPage-sideBar-wrapper-hr' />

                <div className='myPage-sideBar-wrapper-contents'>
                    <p className='myPage-sideBar-wrapper-contents-title'>나의 정보관리</p>
                    <button 
                        className='myPage-sideBar-wrapper-contents-button' 
                        onClick={() => navigateToPage('changeinfo')}
                        style={getButtonStyle('changeinfo')}
                    >
                        배송지 변경
                    </button>
                    <button 
                        className='myPage-sideBar-wrapper-contents-button' 
                        onClick={() => navigateToPage('changepwd')}
                        style={getButtonStyle('changepwd')}
                    >
                        비밀번호 변경
                    </button>
                </div>

            </div>
        </div>
    );
};

export default MyPageSidebar;
