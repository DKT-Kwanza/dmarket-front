import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './MyPageSidebar.css';

const MyPageSidebar = () => {

    const navigate = useNavigate();
    const location = useLocation(); // 현재 페이지의 위치
    const [activePage, setActivePage] = useState('');

    useEffect(() => {
        const path = location.pathname.split('/mydkt/')[1];
        setActivePage(path);
    }, [location]);

    /* 해당 페이지일 경우 해당 버튼 black */
    const getButtonStyle = (buttonPath) => {
        return activePage === buttonPath ? { color: 'black' } : { color: '#A9AFB3' };
    }

    // onClick 발생 시 각각의 page 로 navigate
    const navigateToPage = (path) => {
        navigate(`/mydkt/${path}`);
    }

    return (
        <div className='myPage-sideBar'>
            <div className='myPage-sideBar-wrapper'>

                <div className='myPage-sideBar-wrapper-contents'>
                    <p className='myPage-sideBar-wrapper-contents-title'>나의 주문관리</p>
                    <button 
                        className='myPage-sideBar-wrapper-contents-button' 
                        onClick={() => navigateToPage('orderMng/orderInfo')}
                        style={getButtonStyle('orderMng/orderInfo')}
                    >
                        주문/배송 조회
                    </button>
                </div>

                <hr className='myPage-sideBar-wrapper-hr' />

                <div className='myPage-sideBar-wrapper-contents'>
                    <p className='myPage-sideBar-wrapper-contents-title'>나의 활동관리</p>
                    <button 
                        className='myPage-sideBar-wrapper-contents-button' 
                        onClick={() => navigateToPage('activityMng/mycart')}
                        style={getButtonStyle('activityMng/mycart')}
                    >
                        장바구니
                    </button>
                    <button 
                        className='myPage-sideBar-wrapper-contents-button' 
                        onClick={() => navigateToPage('activityMng/mywish')}
                        style={getButtonStyle('activityMng/mywish')}
                    >
                        위시리스트
                    </button>
                    <button 
                        className='myPage-sideBar-wrapper-contents-button' 
                        onClick={() => navigateToPage('activityMng/review')} 
                        style={getButtonStyle('activityMng/review')}
                    >
                        상품리뷰
                    </button>
                    <button 
                        className='myPage-sideBar-wrapper-contents-button' 
                        onClick={() => navigateToPage('activityMng/qna')}
                        style={getButtonStyle('activityMng/qna')}
                    >
                        상품 Q&A
                    </button>
                    <button 
                        className='myPage-sideBar-wrapper-contents-button' 
                        onClick={() => navigateToPage('activityMng/inquiry')}
                        style={getButtonStyle('activityMng/inquiry')}
                    >
                        고객 문의
                    </button>
                </div>

                <hr className='myPage-sideBar-wrapper-hr' />

                <div className='myPage-sideBar-wrapper-contents'>
                    <p className='myPage-sideBar-wrapper-contents-title'>나의 정보관리</p>
                    <button 
                        className='myPage-sideBar-wrapper-contents-button' 
                        onClick={() => navigateToPage('memberMng/changeInfo')}
                        style={getButtonStyle('memberMng/changeInfo')}
                    >
                        배송지 변경
                    </button>
                    <button 
                        className='myPage-sideBar-wrapper-contents-button' 
                        onClick={() => navigateToPage('memberMng/changePwd')}
                        style={getButtonStyle('memberMng/changePwd')}
                    >
                        비밀번호 변경
                    </button>
                </div>

            </div>
        </div>
    );
};

export default MyPageSidebar;
