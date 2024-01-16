import { useNavigate } from 'react-router-dom';
import './MyPageSidebar.css';

const MyPageSidebar = () => {

    const navigate = useNavigate();
    const temp = () => {
        navigate('/');
    }

    return (
        <div className='myPage-sideBar'>
            <div className='myPage-sideBar-wrapper'>

                <div className='myPage-sideBar-wrapper-contents'>
                    <p className='myPage-sideBar-wrapper-contents-title'>나의 주문관리</p>
                    <button className='myPage-sideBar-wrapper-contents-button' onClick={temp}>주문/배송 조회</button>
                </div>

                <hr className='myPage-sideBar-wrapper-hr' />

                <div className='myPage-sideBar-wrapper-contents'>
                    <p className='myPage-sideBar-wrapper-contents-title'>나의 활동관리</p>
                    <button className='myPage-sideBar-wrapper-contents-button' onClick={temp}>장바구니</button>
                    <button className='myPage-sideBar-wrapper-contents-button' onClick={temp}>위시리스트</button>
                    <button className='myPage-sideBar-wrapper-contents-button' onClick={temp}>상품리뷰</button>
                    <button className='myPage-sideBar-wrapper-contents-button' onClick={temp}>상품 Q&A</button>
                    <button className='myPage-sideBar-wrapper-contents-button' onClick={temp}>고객 문의</button>
                </div>

                <hr className='myPage-sideBar-wrapper-hr' />

                <div className='myPage-sideBar-wrapper-contents'>
                    <p className='myPage-sideBar-wrapper-contents-title'>나의 정보관리</p>
                    <button className='myPage-sideBar-wrapper-contents-button' onClick={temp}>회원정보 변경</button>
                    <button className='myPage-sideBar-wrapper-contents-button' onClick={temp}>비밀번호 변경/회원탈퇴</button>
                </div>

            </div>
        </div>
    );

    // return (
    //     <div className='myPage-sideBar'>
    //         <div className='myPage-sideBar-wrapper'>
    //             <ul>
    //                 <div className='myPage-sideBar-contents'>
    //                     <p>나의 주문관리</p>
    //                     <li><button onClick={temp}>주문/배송 조회</button></li>
    //                 </div>
    //             </ul>
    //             <hr />
    //             <ul>
    //                 <div className='myPage-sideBar-contents'>
    //                     <p>나의 활동관리</p>
    //                     <li><button onClick={temp}>장바구니</button></li>
    //                     <li><button onClick={temp}>위시리스트</button></li>
    //                     <li><button onClick={temp}>상품리뷰</button></li>
    //                     <li><button onClick={temp}>상품 Q&A</button></li>
    //                     <li><button onClick={temp}>고객 문의</button></li>
    //                 </div>
    //             </ul>
    //             <hr />
    //             <ul>
    //                 <div className='myPage-sideBar-contents'>
    //                     <p>나의 정보관리</p>
    //                     <li><button onClick={temp}>회원정보 변경</button></li>
    //                     <li><button onClick={temp}>비밀번호 변경/회원탈퇴</button></li>
    //                 </div>
    //             </ul>
    //         </div>
    //     </div>
    // );
};

export default MyPageSidebar;
