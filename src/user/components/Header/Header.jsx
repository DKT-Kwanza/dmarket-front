import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css'
import SubCategory from './SubCategory'
import Footer from '../Footer/Footer';
import user from '../../../assets/icons/user.svg'
import heart from '../../../assets/icons/heart.svg'
import shoppingBag from '../../../assets/icons/shoppingBag.svg'
import alert from '../../../assets/icons/alert.svg'

function Header() {
    const navigate = useNavigate();
    const [isMainDivHovered, setMainDivHovered] = useState(false);
    const [isSubDivHovered, setSubDivHovered] = useState(false);

    // svg 클릭 이벤트 만들어야함
    const exclick = (e) => {
        alert("버튼 클릭");
    }

    // 아이콘 클릭 이후 페이지 변경
    const iconClick = (menu) => {
        navigate(`./mypage/${menu}`);
    }

    const handleMouseOver = () => {
        setMainDivHovered(true);
        setSubDivHovered(true);
    }

    const handleMouseLeaveSubCategory = () => {
        setSubDivHovered(false);
    }

        const navigateToMain = () => {
            navigate(`./main`);
        }

        return (
            <div className="header-div">
                <div className="nav-div">
                    <div onClick={navigateToMain} className="logo"></div>
                    <div className='search-box-div'>
                        <input className="search-box" placeholder='2023년 봄날 가벼워진 패션으로 나들이 가보자~'>
                        </input>
                        <div className='search-box-svg' onClick={exclick}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 fill="none">
                                <path
                                    d="M11 19C12.775 18.9996 14.4988 18.4054 15.897 17.312L20.293 21.708L21.707 20.294L17.311 15.898C18.405 14.4997 18.9996 12.7754 19 11C19 6.589 15.411 3 11 3C6.589 3 3 6.589 3 11C3 15.411 6.589 19 11 19ZM11 5C14.309 5 17 7.691 17 11C17 14.309 14.309 17 11 17C7.691 17 5 14.309 5 11C5 7.691 7.691 5 11 5Z"
                                    fill="#505050"/>
                            </svg>
                        </div>
                    </div>
                    <div className="icons">
                        <div className='mypage' onClick={() => iconClick('orderhistory')}>
                            <img src={user}/>
                        </div>
                        <div className='bucket' onClick={() => iconClick('cart')}>
                            <img src={shoppingBag}/>
                            <div className='bucket-count'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 21 20"
                                     fill="none">
                                    <circle cx="10.8359" cy="10" r="10" fill="black"/>
                                    <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="white" font-size="12">
                                        30
                                    </text>
                                </svg>
                            </div>
                        </div>
                        <div className='likes' onClick={() => iconClick('wishlist')}>
                            <img src={heart}/>
                        </div>
                        <div className='alams'>
                            <img src={alert}/>
                        </div>
                    </div>
                </div>
                <div className="category-div">
                    <div className="category-div-container" onMouseEnter={handleMouseOver}>
                        <div className="main-category">
                            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="14" viewBox="0 0 17 14"
                                 fill="none">
                                <rect x="0.835938" width="16" height="2" fill="black"/>
                                <rect x="0.835938" y="6" width="16" height="2" fill="black"/>
                                <rect x="0.835938" y="12" width="16" height="2" fill="black"/>
                            </svg>
                            <div className='category-text'>카테고리</div>
                        </div>
                        <div className="sub-category">
                            <button>패션의류/잡화</button>
                            <button>뷰티/생필품</button>
                            <button>홈데코/문구</button>
                            <button>디지털/가전</button>
                            <button>스포츠/건강</button>
                        </div>
                        <div className="user-center">고객센터</div>
                    </div>
                </div>
                {isSubDivHovered && <SubCategory onMouseLeave={handleMouseLeaveSubCategory}/>}
                {/* <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
            <Footer />
        </div> */}
            </div>
        );
}
export default Header;