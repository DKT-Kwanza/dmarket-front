import './Main.css';
import React, {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import {useRecoilState} from "recoil";
import MainProductItem from "../../../components/user/Item/MainProductItem";
import ScrollToTopBtn from '../../../components/user/Common/Button/ScrollToTopBtn';
import {productsApi} from "../../../Api";
import MainBanner from '../../../components/user/MainBanner';
import { isLoggedInState } from '../../../recoil/atom';

const Main = () => {
    const navigate = useNavigate();
    const [showMore, setShowMore] = useState(false);
    const [newProducts, setNewProducts] = useState([]);
    const [discountProducts, setDiscountProducts] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [selectedCategoryDepth, setSelectedCategoryDepth] = useState(1);
    const [showMoreDiscount, setShowMoreDiscount] = useState(false);

    /* 세션 스토리지에서 토큰 가져오기 */
    const token = sessionStorage.getItem('token');

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("../member/login");
        }
    }, [isLoggedIn, navigate]);

    /* 신상품 데이터 */
    useEffect(() => {
        const fetchData = async () => {
            const url = `${productsApi}/new-products`
            try {
                const response = await axios.get(url, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json; charset=UTF-8',
                    }
                });
                setNewProducts(response.data.data);
            } catch (e) {
                console.error("Error fetching data: ", e);
            }
        };
        fetchData();
    }, []);
    /* 데이터 8개 씩 slice */
    const displayedProducts = showMore ? newProducts : newProducts.slice(0, 8);
    /* 신상품 더보기 버튼 클릭 */
    const onClickShowMore = () => {
        setShowMore(!showMore);
    }

    /* 카테고리 데이터 */
    const [categories, setCategories] = useState([]);
    const [levelTwoCategories, setLevelTwoCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const url = `${productsApi}/categories`;
            try {
                const response = await axios.get(url, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setCategories(response.data.data);
                const levelTwos = response.data.data.reduce((acc, curr) => [...acc, ...curr.child], []);
                setLevelTwoCategories(levelTwos);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    /* 카테고리별 할인율 높은 순 조회 데이터 */
    const fetchPopularData = async (categoryId = '') => {
        const url = categoryId 
            ? `${productsApi}/high-discount-rate/${categoryId}` 
            : `${productsApi}/high-discount-rate`;
    
        try {
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json; charset=UTF-8',
                }
            });
            setDiscountProducts(Array.isArray(response.data.data) ? response.data.data : []);
        } catch (e) {
            console.error("Error fetching data: ", e);
            setDiscountProducts([]); 
        }
    };    

    useEffect(() => {
        fetchPopularData(null);
    }, []); /* 초기 렌더링 시에만 호출 */

    /* 카테고리 버튼 클릭 */
    const handleCategoryButtonClick = (categoryId, depth) => {
        setSelectedCategoryId(categoryId);
        setSelectedCategoryDepth(depth); // 선택한 카테고리 뎁스 업데이트
        fetchPopularData(categoryId);
    };

    const displayedDiscountProducts = showMoreDiscount ? discountProducts : discountProducts.slice(0, 8);

    const toggleShowMoreDiscount = () => {
        setShowMoreDiscount(!showMoreDiscount);
    };

    const navigateToProductDetail = ({productId}) => {
        navigate(`./product/detail/${productId}`);
    }

    return (
        <div className='main-div-global-wrapper'> {/* 전체 wrapper */}
            <div className='main-div-mainimg-wrapper'> {/* 메인이미지 wrapper */}
                <MainBanner />
            </div>
            <div className='main-div-newitem-wrapper'> {/* 신상품 wrapper */}
                <div>
                    <p className='main-p-wrapper-title'>신상품</p>
                </div>
                <div className='main-div-products-wrapper'>
                    {displayedProducts.map((product, index) => (
                        <MainProductItem
                            key={index}
                            brand={product.productBrand}
                            productName={product.productName}
                            productImg={product.productImg}
                            sales={product.productSalePrice}
                            onClick={() => {
                                navigateToProductDetail({productId: product.productId})
                            }}/>
                    ))}
                </div>
                <div>
                    <button className='main-btn-button' onClick={onClickShowMore}>
                        {showMore ? `모아보기 > ` : `더보기 >`}
                    </button>
                </div>
            </div>
            <div className='main-div-bestitem-wrapper'> {/* 베스트 wrapper */}
                <div>
                    <p className='main-p-wrapper-title'>할인율 높은 순</p>
                </div>
                <div className='main-div-cate-wrapper'> {/* 카테고리 wrapper */}
                    <button
                        className='main-btn-cate-button'
                        autoFocus
                        onClick={() => {
                            handleCategoryButtonClick(null)
                        }}>전체보기
                    </button>
                    {categories.filter(cat => cat.categoryDepth === 1).map((category) => (
                        <button
                            key={category.categoryId}
                            className='main-btn-cate-button'
                            onClick={() => {
                                handleCategoryButtonClick(category.categoryId)
                            }}>{category.categoryName}
                        </button>
                    ))}
                </div>
                <div className='main-div-products-wrapper'>
                    {displayedDiscountProducts.map((product, index) => (
                        <MainProductItem
                            key={index}
                            brand={product.productBrand}
                            productName={product.productName}
                            productImg={product.productImg}
                            sales={product.productSalePrice}
                            onClick={() => navigateToProductDetail({productId: product.productId})}
                        />
                    ))}
                </div>
                <div>
                    <button className='main-btn-button' onClick={toggleShowMoreDiscount}>
                        {showMoreDiscount ? '모아보기 >' : '더보기 >'}
                    </button>
                </div>
                <ScrollToTopBtn/>
            </div>
        </div>
    )
}


export default Main;
