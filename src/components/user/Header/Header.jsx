import './Header.css'
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import NotificationModal from '../Common/Modal/NotificationModal';
import {useRecoilState} from "recoil";
import {cartCountAtom} from "../../../recoil/atom";
import axios from "axios";
import { EventSourcePolyfill } from 'event-source-polyfill';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './Header.css'
import user from '../../../assets/icons/user.svg'
import heart from '../../../assets/icons/heart.svg'
import shoppingBag from '../../../assets/icons/shoppingBag.svg'
import alert from '../../../assets/icons/alert.svg'
import { notifyApi, productsApi, userApi } from '../../../Api';

function Header() {
    const navigate = useNavigate();
    /* 장바구니 개수 전역상태 변수 관리 */
    const [cartCount, setCartCount] = useRecoilState(cartCountAtom);
    const [isMainDivHovered, setMainDivHovered] = useState(false);
    const [categories, setCategories] = useState([]);
    const [levelTwoCategories, setLevelTwoCategories] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [showNotifications, setShowNotifications] = useState(false);
    const [lastEventId, setLastEventId] = useState("");
    const [ eventSource, setEventSource ] = useState(null);
    const [unreadCount, setUnreadCount] = useState(0);
    const [notifications, setNotifications] = useState([]);

    const token = sessionStorage.getItem('token');
    const userId = sessionStorage.getItem('userId');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${productsApi}/categories`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.data.code === 200) {
                    setCategories(response.data.data);
                    const levelTwos = response.data.data.reduce((acc, curr) => [...acc, ...curr.child], []);
                    setLevelTwoCategories(levelTwos);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    /* 장바구니 개수 데이터 */
    useEffect(() => {
        const fetchData = async () => {
            try {
                const cartCountResponse = await axios.get(`${userApi}/${userId}/cart-count`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
                /* cartCountAtom을 업데이트 */
                setCartCount(cartCountResponse.data.data.cartCount);
            } catch (e) {
                console.error('Error fetching data:', e);
            }
        }
        fetchData();
    }, [cartCount]);

    useEffect(() => {
        // 마운트 시 로그인 상태 + sse 연결이 안 된 상태면 연결
        if (token && !eventSource) {
            subscribe();
        }

        // 언마운트 시 sse 연결 종료
        return () => {
            if (eventSource) {
                eventSource.close();
                console.log("연결 종료");
                setEventSource(null);
            }
        }
    },[eventSource, token])

    // sse 연결 시작
    const subscribe = async () => {
        console.log("연결 시작");
        const source = new EventSourcePolyfill(
            `${notifyApi}/subscribe/` + userId,
            {
            headers: {
                Authorization: `Bearer ${token}`,
                lastEventId: lastEventId,
            },
            heartbeatTimeout: 600000,
            }
        );

        
        // mileage 관련 알림 받아옴
        source.addEventListener("mileage", (e) => {
            setLastEventId(e.lastEventId);
            console.log(lastEventId);
            const data = JSON.parse(e.data);
            console.log(data);
            toast(data.content);
            setNotifications((prevNotifications) => [data, ...prevNotifications]);
            console.log(notifications);
            setUnreadCount((prevCount) => prevCount + 1);
        });
        
        // 문의 답변 알림
        source.addEventListener("inquiry", (e) => {
            setLastEventId(e.lastEventId);
            console.log(lastEventId);
            const data = JSON.parse(e.data);
            console.log(data.content);
            toast(data.content);
            setNotifications((prevNotifications) => [data, ...prevNotifications]);
            console.log(notifications);
            setUnreadCount((prevCount) => prevCount + 1);
        });
        
        // 상품 QnA 답변 알림
        source.addEventListener("qna", (e) => {
            setLastEventId(e.lastEventId);
            console.log(lastEventId);
            const data = JSON.parse(e.data);
            toast(data.content);
            setNotifications((prevNotifications) => [data, ...prevNotifications]);
            setUnreadCount((prevCount) => prevCount + 1);
        });

        // 배송 상태 변경 알림
        source.addEventListener("delivery", (e) => {
            setLastEventId(e.lastEventId);
            console.log(lastEventId);
            const data = JSON.parse(e.data);
            console.log(data);
            toast(data.content);
            setNotifications((prevNotifications) => [data, ...prevNotifications]);
            console.log(notifications);
            setUnreadCount((prevCount) => prevCount + 1);
        });
    
        // 반품 상태 변경 알림
        source.addEventListener("return", (e) => {
            setLastEventId(e.lastEventId);
            console.log(lastEventId);
            const data = JSON.parse(e.data);
            console.log(data);
            toast(data.content);
            setNotifications((prevNotifications) => [data, ...prevNotifications]);
            console.log(notifications);
            setUnreadCount((prevCount) => prevCount + 1);
        });
        
        setEventSource(source);
    }
    // sse 연결

    // 알림 조회
    useEffect(() => {
        if (token && userId) {
            axios.get(`${notifyApi}/${userId}/notifications`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setNotifications(response.data);
            })
            .catch((error) => {
                console.error('Could not fetch notifications', error);
            });
        }
    }, []);
    //알림 조회


    // 알림 개수
    useEffect(() => {
        const fetchUnreadCount = async () => {
            try {
                const response = await axios.get(`${notifyApi}/${userId}/unreadCount`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUnreadCount(response.data);
            } catch (error) {
                console.error('Could not fetch unread notification count', error);
            }
        };
        fetchUnreadCount();
    }, []);
    // 알림 개수


    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            const query = e.target.value;
            navigate(`/search?q=${encodeURIComponent(query)}`);
            setSearchInput("");
        }
    };


    /* 아이콘 클릭 이후 페이지 변경 */
    const navigateToPage = (menu) => {
        navigate(`./mydkt/${menu}`);
    }

    const navigateToMain = () => {
        navigate(`./`);
    }

    const navigateToCustomer = () => {
        navigate('./customer');
    }

    /* 메인 카테고리에 마우스가 올라가면 상태를 true로 설정 */
    const handleMouseEnterMain = () => {
        setMainDivHovered(true);
    };

    /* 메인 카테고리에서 마우스가 벗어나면 상태를 false로 설정 */
    const handleMouseLeaveMain = () => {
        setMainDivHovered(false);
    };


    const navigateToCategory = (categoryId, categoryName1, categoryName2) => {
        const encodedCategoryName1 = encodeURIComponent(categoryName1);
        const encodedCategoryName2 = encodeURIComponent(categoryName2);
        navigate(`/category/${categoryId}?category1depthName=${encodedCategoryName1}&category2depthName=${encodedCategoryName2}`);
    };
    const navigateToAdmin = () => {
        navigate('./memberMng/manager');
    }

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };

    return (
        <div className="header-div">
            <ToastContainer stacked closeOnClick hideProgressBar theme="dark"/>
            <div className="nav-div">
                <div onClick={navigateToMain} className="logo"></div>
                <div className='search-box-div'>
                    <input
                        className="search-box"
                        placeholder="검색어를 입력하세요"
                        onKeyPress={handleSearch}
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                    <div className='search-box-svg'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M11 19C12.775 18.9996 14.4988 18.4054 15.897 17.312L20.293 21.708L21.707 20.294L17.311 15.898C18.405 14.4997 18.9996 12.7754 19 11C19 6.589 15.411 3 11 3C6.589 3 3 6.589 3 11C3 15.411 6.589 19 11 19ZM11 5C14.309 5 17 7.691 17 11C17 14.309 14.309 17 11 17C7.691 17 5 14.309 5 11C5 7.691 7.691 5 11 5Z"
                                fill="#505050"/>
                        </svg>
                    </div>
                </div>
                <div className="icons">
                    <div className='mypage' onClick={() => navigateToPage('orderInfo')}>
                        <img src={user}/>
                    </div>
                    <div className='bucket' onClick={() => navigateToPage('mycart')}>
                        <img src={shoppingBag}/>
                        <div className='bucket-count'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 21 20"
                                 fill="none">
                                <circle cx="10.8359" cy="10" r="10" fill="black"/>
                                <text x="50%" y="50%" textAnchor="middle" dy=".3em" fill="white" fontSize="12">
                                    {cartCount}
                                </text>
                            </svg>
                        </div>
                    </div>
                    <div className='likes' onClick={() => navigateToPage('mywish')}>
                        <img
                            alt={"heart-icon"}
                            src={heart}/>
                    </div>
                    <div className='alams' onClick={toggleNotifications}>
                        <img alt={"alert-icon"} src={alert}/>
                        <div className='bucket-count'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 21 20" fill="none">
                                <circle cx="10.8359" cy="10" r="10" fill="black"/>
                                <text x="50%" y="50%" textAnchor="middle" dy=".3em" fill="white" font-size="12">
                                    {unreadCount}
                                </text>
                            </svg>
                        </div>
                    </div>
                    <div>
                        {showNotifications && (
                            <NotificationModal
                                notifications={notifications}
                                onClose={() => setShowNotifications(false)}
                                setUnreadCount={setUnreadCount}
                            />
                        )}
                    </div>
                </div>
            </div>
            <div className="category-div">
                <div className="category-div-container" onMouseEnter={handleMouseEnterMain}>
                    <div className="main-category">
                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="14" viewBox="0 0 17 14" fill="none">
                            <rect x="0.835938" width="16" height="2" fill="black"/>
                            <rect x="0.835938" y="6" width="16" height="2" fill="black"/>
                            <rect x="0.835938" y="12" width="16" height="2" fill="black"/>
                        </svg>
                        <div className='category-text'>카테고리</div>
                    </div>
                    <div className='category-box'>
                        <div className="sub-category">
                            {categories.filter(cat => cat.categoryDepth === 1).map((category) => (
                                <button
                                    key={category.categoryId}
                                    className='sub-category-box-button'
                                >
                                    {category.categoryName}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="user-center">
                        <div onClick={navigateToAdmin} className="cate-admin">관리자</div>
                        <div onClick={navigateToCustomer} className="cate-customer">고객센터</div>
                    </div>
                </div>
                {
                    isMainDivHovered
                        ? (<div className='sub-category-box-whole' onMouseLeave={handleMouseLeaveMain}>
                            <div className='sub-category-box-container'>
                                <div className='sub-category-box'>
                                    {categories.filter(cat => cat.categoryDepth === 1).map((category, index) => (
                                        <div className='sub-sub-category-contents-details' key={index}>
                                            {category.child.map((subCategory) => (
                                                <div key={subCategory.categoryId}>
                                                    <div className='sub-sub-category-contents-details-style'>
                                                        <button
                                                            onClick={() => navigateToCategory(subCategory.categoryId, category.categoryName, subCategory.categoryName)}
                                                            className='sub-category-contents-details-button'
                                                        >
                                                            {subCategory.categoryName}
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>) : null
                }
            </div>
        </div>
    );
}

export default Header;
