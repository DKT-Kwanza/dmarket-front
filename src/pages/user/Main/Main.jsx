import './Main.css';
import React, {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import MainProductItem from "../../../components/user/Item/MainProductItem";
import ScrollToTopBtn from '../../../components/user/Common/Button/ScrollToTopBtn';
import {FaAngleLeft, FaAngleRight, FaPause} from "react-icons/fa6";

const Main = () => {
    const navigate = useNavigate();
    const [showMore, setShowMore] = useState(false);
    const [newProducts, setNewProducts] = useState([]);
    const [popularProducts, setPopularProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    /* 세션 스토리지에서 토큰 가져오기 */
    const token = sessionStorage.getItem('token');

    /* 신상품 데이터 */
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://172.16.210.136:8080/api/products/new-products", {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json; charset=UTF-8',
                    }
                });
                setNewProducts(response.data.data);
                console.log(response.data.data);
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
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/Categories.json");
                setCategories(response.data);
            } catch (e) {
                console.error("Error fetching data: ", e);
            }
        };
        fetchData();
    }, []);

    /* 카테고리별 주문 많은 순 조회 데이터 */
    const fetchPopularData = async (categoryId) => {
        console.log(categoryId);
        try {
            const response = await axios.get(`http://172.16.210.136:8080/api/products/popular/${categoryId || ''}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json; charset=UTF-8',
                }
            });
            setPopularProducts(response.data.data);
            console.log(response.data);
            console.log(popularProducts);
        } catch (e) {
            console.error("Error fetching data: ", e);
        }
    };
    useEffect(() => {
        fetchPopularData(null);
    }, []); /* 초기 렌더링 시에만 호출 */

    /* 주문 많은 순 카테고리 버튼 클릭 */
    const handleCategoryButtonClick = (categoryId) => {
        console.log(categoryId);
        fetchPopularData(categoryId);
    };

    const navigateToProductDetail = ({productId}) => {
        navigate(`./product/detail/${productId}`);
    }

    return (
        <div className='main-div-global-wrapper'> {/* 전체 wrapper */}
            <div className='main-div-mainimg-wrapper'> {/* 메인이미지 wrapper */}
                <div className='main-div-mainimg'> {/* 메인이미지 */}
                    <h1>1580 X 600 이었는데 너무 커서 1500 X 300으로 줄였어용</h1>
                </div>
                <div className='main-div-buttonwrapper'> {/* 메인이미지 버튼 wrapper */}
                    <button className='main-btn-movebtn'><FaAngleLeft/></button>
                    {/* 왼쪽가기 버튼 */}
                    <button>1/10</button>
                    {/* 페이지 번호 */}
                    <button className='main-btn-movebtn'><FaAngleRight/></button>
                    {/* 오른쪽가기 버튼 */}
                    <button><FaPause/></button>
                    {/* 일시정지 버튼 */}
                </div>
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
                        {showMore ? `모아보기 >` : `더보기 >`}
                    </button>
                </div>
            </div>
            <div className='main-div-bestitem-wrapper'> {/* 베스트 wrapper */}
                <div>
                    <p className='main-p-wrapper-title'>주문 많은 순</p>
                </div>
                <div className='main-div-cate-wrapper'> {/* 카테고리 wrapper */}
                    <button
                        className='main-btn-cate-button'
                        autoFocus
                        onClick={() => {
                            handleCategoryButtonClick(null)
                        }}>전체보기</button>
                    {
                        categories.map((category, index) => (
                            <button
                                className='main-btn-cate-button'
                                onClick={() => {
                                    console.log(category.categoryId);
                                    handleCategoryButtonClick(category.categoryId)
                                }}>{category.categoryName}</button>
                        ))
                    }
                </div>

                <div className='main-div-products-wrapper'>
                    {popularProducts.map((product, index) => (
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
                    <button className='main-btn-button'>전체보기 {' > '}</button>
                    {/* 더보기 버튼 */}
                </div>
                <ScrollToTopBtn/>
            </div>
        </div>
    )
}


export default Main;