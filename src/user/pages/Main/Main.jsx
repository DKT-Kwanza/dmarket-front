import React from 'react';
import './Main.css';
import { FaAngleLeft, FaAngleRight, FaPause } from "react-icons/fa6";
import { useState } from 'react';
import MainProductItem from '../../components/Main/MainProductItem';
import PopularProductData from "../../../assets/PopularProductData.json";
import NewProductData from "../../../assets/NewProductData.json";


const Main = () => { 

    const [showMore, setShowMore] = useState(false);

    const displayedProducts = showMore ? NewProductData : NewProductData.slice(0, 8); // 데이터 8개만

    const onClickShowMore = () => {
        setShowMore(!showMore);
    }

    return (
        <div className='main-div-global-wrapper'> {/* 전체 wrapper */}
            <div className='main-div-mainimg-wrapper'> {/* 메인이미지 wrapper */}
                <div className='main-div-mainimg'> {/* 메인이미지 */}
                    <h1>1580 X 600 이었는데 너무 커서 1500 X 300으로 줄였어용</h1>
                </div>
                <div className='main-div-buttonwrapper'> {/* 메인이미지 버튼 wrapper */}
                    <button className='main-btn-movebtn'><FaAngleLeft/></button> {/* 왼쪽가기 버튼 */}
                    <button>1/10</button>   {/* 페이지 번호 */}
                    <button className='main-btn-movebtn'><FaAngleRight/></button> {/* 오른쪽가기 버튼 */}
                    <button><FaPause/></button> {/* 일시정지 버튼 */}
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
                            brand={product.brand}
                            productName={product.productName}
                            productImg={product.productImg}
                            sales={product.sales}
                        />
                    ))}
                </div>
                <div>
                    <button className='main-btn-button' onClick={onClickShowMore}>
                        {showMore ? '모아보기 >' : '더보기 >'}
                    </button>
                </div>
            </div>
            <div className='main-div-bestitem-wrapper'> {/* 베스트 wrapper */}
                <div>
                    <p className='main-p-wrapper-title'>주문 많은 순</p> 
                </div>
                <div className='main-div-cate-wrapper'> {/* 카테고리 wrapper */}
                    <button className='main-btn-cate-button'>전체보기</button>
                    <button className='main-btn-cate-button'>패션의류/잡화</button>
                    <button className='main-btn-cate-button'>뷰티/생필품</button>
                    <button className='main-btn-cate-button'>홈데코/문구</button>
                    <button className='main-btn-cate-button'>디지털/가전</button>
                    <button className='main-btn-cate-button'>스포츠/건강</button>
                </div>
                
                <div className='main-div-products-wrapper'>
                {PopularProductData.map((product, index) => (
                    <MainProductItem 
                        key={index}
                        brand={product.brand}
                        productName={product.productName}
                        productImg={product.productImg}
                        sales={product.sales}
                    />
                ))}
                </div>
                <div>
                    <button className='main-btn-button'>전체보기 {' > '}</button>  {/* 더보기 버튼 */}
                </div>
            </div>
        </div>
    )
}



export default Main;