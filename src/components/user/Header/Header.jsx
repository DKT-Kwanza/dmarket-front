import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import './Header.css'
import user from '../../../assets/icons/user.svg'
import heart from '../../../assets/icons/heart.svg'
import shoppingBag from '../../../assets/icons/shoppingBag.svg'
import alert from '../../../assets/icons/alert.svg'

function Header() {
    const navigate = useNavigate();
    const [isMainDivHovered, setMainDivHovered] = useState(false);
    const [cartCount, setCartCount] = useState({});
    const [categories, setCategories] = useState([]);
    const [levelTwoCategories, setLevelTwoCategories] = useState([]);

    const token = sessionStorage.getItem('token');
    
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://172.16.210.136:8080/api/products/categories', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.data.code === 200) {
                console.log(response.data)
                setCategories(response.data.data);
                console.log(categories)
                const levelTwos = response.data.data.reduce((acc, curr) => [...acc, ...curr.child], []);
                setLevelTwoCategories(levelTwos);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
            };
        
            fetchCategories();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/CartCountData.json");
                setCartCount(response.data);
            } catch (e) {
                console.error("Error fetching data: ", e);
            }
        };
        fetchData();
    }, []);

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            const query = e.target.value;
            navigate(`/search?q=${encodeURIComponent(query)}`);
        }
    };
    

    // 아이콘 클릭 이후 페이지 변경
    const navigateToPage= (menu) => {
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

    return (
        <div className="header-div">
            <div className="nav-div">
                <div onClick={navigateToMain} className="logo"></div>
                <div className='search-box-div'>
                    <input
                        className="search-box"
                        placeholder="검색어를 입력하세요"
                        onKeyPress={handleSearch}
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
                            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 21 20" fill="none">
                                <circle cx="10.8359" cy="10" r="10" fill="black"/>
                                <text x="50%" y="50%" textAnchor="middle" dy=".3em" fill="white" font-size="12">
                                    {cartCount.cartCount}
                                </text>
                            </svg>
                        </div>
                    </div>
                    <div className='likes' onClick={() => navigateToPage('mywish')}>
                        <img
                            alt={"heart-icon"}
                            src={heart}/>
                    </div>
                    <div className='alams'>
                        <img
                            alt={"alert-icon"}
                            src={alert}/>
                    </div>
                </div>
            </div>
            <div className="category-div">
                <div className="category-div-container" onMouseEnter={handleMouseEnterMain} onMouseLeave={handleMouseLeaveMain}>
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
                        <div className='sub-category-box-whole'>
                            <div className='sub-category-box-container'>
                                {categories.filter(cat => cat.categoryDepth === 1).map((category, index) => (
                                        <div className='sub-sub-category-contents-details'>
                                            {isMainDivHovered && category.child.map((subCategory) => (
                                                <div key={subCategory.categoryId} className='sub-sub-category-contents-details'>
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
                    </div>
                    <div onClick={navigateToCustomer} className="user-center">고객센터</div>
                </div>
            </div>
        </div>
    );
}

export default Header;
