import React from 'react';
import './Main.css';
import eximg from './720X720.jpg'
import { FaAngleLeft, FaAngleRight, FaPause } from "react-icons/fa6";
import { useState } from 'react';



const Main = () =>{

    const [showmore,setShowmore] = useState(false);

    const onClickShowmore = () =>{
        setShowmore(!showmore);
    }

    return (
        <div className='main-div-global-wrapper'> {/* 전체 wrapper */}
            <div className='main-div-mainimg-wrapper'> {/* 메인이미지 wrapper */}
                <div className='main-div-mainimg'> {/* 메인이미지 */}
                    <h1>1580 X 600</h1>
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
                {showmore ? (
                        <>
                            <div className='main-div-products-wrapper'>{/* 전체틀 */}
                                <div className='main-div-product-wrapper'>{/* 1개 wrapper*/}
                                    <div className='main-div-product-img-wrapper'> {/* 이미지 wrapper */}
                                        <img src={eximg} className='main-img-product' alt='상품이미지'/>
                                    </div>
                                    <div className='main-div-text-wrapper'>{/* text wrapper */}
                                        <div>{/* 브랜드 */}
                                            <p className='main-p-product-brandname'>브랜드명</p>
                                        </div>
                                        <div> {/* 상품이름 */}
                                            <p className='main-p-product-name'>스카이 블루 하이웨스트 데님</p>
                                        </div>
                                        <div className='main-div-product-price-wrapper'> {/* 가격 */}
                                            <p className='main-p-product-price'>182,000</p>
                                            <p className='main-p-product-won'>원</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='main-div-product-wrapper'>{/* 1개 wrapper*/}
                                    <div className='main-div-product-img-wrapper'> {/* 이미지 wrapper */}
                                        <img src={eximg} className='main-img-product' alt='상품이미지'/>
                                    </div>
                                    <div className='main-div-text-wrapper'>{/* text wrapper */}
                                        <div>{/* 브랜드 */}
                                            <p className='main-p-product-brandname'>브랜드명</p>
                                        </div>
                                        <div> {/* 상품이름 */}
                                            <p className='main-p-product-name'>스카이 블루 하이웨스트 데님</p>
                                        </div>
                                        <div className='main-div-product-price-wrapper'> {/* 가격 */}
                                            <p className='main-p-product-price'>182,000</p>
                                            <p className='main-p-product-won'>원</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='main-div-product-wrapper'>{/* 1개 wrapper*/}
                                    <div className='main-div-product-img-wrapper'> {/* 이미지 wrapper */}
                                        <img src={eximg} className='main-img-product' alt='상품이미지'/>
                                    </div>
                                    <div className='main-div-text-wrapper'>{/* text wrapper */}
                                        <div>{/* 브랜드 */}
                                            <p className='main-p-product-brandname'>브랜드명</p>
                                        </div>
                                        <div> {/* 상품이름 */}
                                            <p className='main-p-product-name'>스카이 블루 하이웨스트 데님</p>
                                        </div>
                                        <div className='main-div-product-price-wrapper'> {/* 가격 */}
                                            <p className='main-p-product-price'>182,000</p>
                                            <p className='main-p-product-won'>원</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='main-div-product-wrapper'>{/* 1개 wrapper*/}
                                    <div className='main-div-product-img-wrapper'> {/* 이미지 wrapper */}
                                        <img src={eximg} className='main-img-product' alt='상품이미지'/>
                                    </div>
                                    <div className='main-div-text-wrapper'>{/* text wrapper */}
                                        <div>{/* 브랜드 */}
                                            <p className='main-p-product-brandname'>브랜드명</p>
                                        </div>
                                        <div> {/* 상품이름 */}
                                            <p className='main-p-product-name'>스카이 블루 하이웨스트 데님</p>
                                        </div>
                                        <div className='main-div-product-price-wrapper'> {/* 가격 */}
                                            <p className='main-p-product-price'>182,000</p>
                                            <p className='main-p-product-won'>원</p>
                                        </div>
                                    </div>
                                </div><div className='main-div-product-wrapper'>{/* 1개 wrapper*/}
                                    <div className='main-div-product-img-wrapper'> {/* 이미지 wrapper */}
                                        <img src={eximg} className='main-img-product' alt='상품이미지'/>
                                    </div>
                                    <div className='main-div-text-wrapper'>{/* text wrapper */}
                                        <div>{/* 브랜드 */}
                                            <p className='main-p-product-brandname'>브랜드명</p>
                                        </div>
                                        <div> {/* 상품이름 */}
                                            <p className='main-p-product-name'>스카이 블루 하이웨스트 데님</p>
                                        </div>
                                        <div className='main-div-product-price-wrapper'> {/* 가격 */}
                                            <p className='main-p-product-price'>182,000</p>
                                            <p className='main-p-product-won'>원</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='main-div-product-wrapper'>{/* 1개 wrapper*/}
                                    <div className='main-div-product-img-wrapper'> {/* 이미지 wrapper */}
                                        <img src={eximg} className='main-img-product' alt='상품이미지'/>
                                    </div>
                                    <div className='main-div-text-wrapper'>{/* text wrapper */}
                                        <div>{/* 브랜드 */}
                                            <p className='main-p-product-brandname'>브랜드명</p>
                                        </div>
                                        <div> {/* 상품이름 */}
                                            <p className='main-p-product-name'>스카이 블루 하이웨스트 데님</p>
                                        </div>
                                        <div className='main-div-product-price-wrapper'> {/* 가격 */}
                                            <p className='main-p-product-price'>182,000</p>
                                            <p className='main-p-product-won'>원</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='main-div-product-wrapper'>{/* 1개 wrapper*/}
                                    <div className='main-div-product-img-wrapper'> {/* 이미지 wrapper */}
                                        <img src={eximg} className='main-img-product' alt='상품이미지'/>
                                    </div>
                                    <div className='main-div-text-wrapper'>{/* text wrapper */}
                                        <div>{/* 브랜드 */}
                                            <p className='main-p-product-brandname'>브랜드명</p>
                                        </div>
                                        <div> {/* 상품이름 */}
                                            <p className='main-p-product-name'>스카이 블루 하이웨스트 데님</p>
                                        </div>
                                        <div className='main-div-product-price-wrapper'> {/* 가격 */}
                                            <p className='main-p-product-price'>182,000</p>
                                            <p className='main-p-product-won'>원</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='main-div-product-wrapper'>{/* 1개 wrapper*/}
                                    <div className='main-div-product-img-wrapper'> {/* 이미지 wrapper */}
                                        <img src={eximg} className='main-img-product' alt='상품이미지'/>
                                    </div>
                                    <div className='main-div-text-wrapper'>{/* text wrapper */}
                                        <div>{/* 브랜드 */}
                                            <p className='main-p-product-brandname'>브랜드명</p>
                                        </div>
                                        <div> {/* 상품이름 */}
                                            <p className='main-p-product-name'>스카이 블루 하이웨스트 데님</p>
                                        </div>
                                        <div className='main-div-product-price-wrapper'> {/* 가격 */}
                                            <p className='main-p-product-price'>182,000</p>
                                            <p className='main-p-product-won'>원</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button className='main-btn-button' onClick={onClickShowmore}>더보기 {' > '}</button> {/* 더보기 버튼 */}
                            </div>
                        </>
                    ) : (
                        <>
                            <div className='main-div-products-wrapper'>{/* 전체틀 */}
                                <div className='main-div-product-wrapper'>{/* 1개 wrapper*/}
                                    <div className='main-div-product-img-wrapper'> {/* 이미지 wrapper */}
                                        <img src={eximg} className='main-img-product' alt='상품이미지'/>
                                    </div>
                                    <div className='main-div-text-wrapper'>{/* text wrapper */}
                                        <div>{/* 브랜드 */}
                                            <p className='main-p-product-brandname'>브랜드명</p>
                                        </div>
                                        <div> {/* 상품이름 */}
                                            <p className='main-p-product-name'>스카이 블루 하이웨스트 데님</p>
                                        </div>
                                        <div className='main-div-product-price-wrapper'> {/* 가격 */}
                                            <p className='main-p-product-price'>182,000</p>
                                            <p className='main-p-product-won'>원</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='main-div-product-wrapper'>{/* 1개 wrapper*/}
                                    <div className='main-div-product-img-wrapper'> {/* 이미지 wrapper */}
                                        <img src={eximg} className='main-img-product' alt='상품이미지'/>
                                    </div>
                                    <div className='main-div-text-wrapper'>{/* text wrapper */}
                                        <div>{/* 브랜드 */}
                                            <p className='main-p-product-brandname'>브랜드명</p>
                                        </div>
                                        <div> {/* 상품이름 */}
                                            <p className='main-p-product-name'>스카이 블루 하이웨스트 데님</p>
                                        </div>
                                        <div className='main-div-product-price-wrapper'> {/* 가격 */}
                                            <p className='main-p-product-price'>182,000</p>
                                            <p className='main-p-product-won'>원</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='main-div-product-wrapper'>{/* 1개 wrapper*/}
                                    <div className='main-div-product-img-wrapper'> {/* 이미지 wrapper */}
                                        <img src={eximg} className='main-img-product' alt='상품이미지'/>
                                    </div>
                                    <div className='main-div-text-wrapper'>{/* text wrapper */}
                                        <div>{/* 브랜드 */}
                                            <p className='main-p-product-brandname'>브랜드명</p>
                                        </div>
                                        <div> {/* 상품이름 */}
                                            <p className='main-p-product-name'>스카이 블루 하이웨스트 데님</p>
                                        </div>
                                        <div className='main-div-product-price-wrapper'> {/* 가격 */}
                                            <p className='main-p-product-price'>182,000</p>
                                            <p className='main-p-product-won'>원</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='main-div-product-wrapper'>{/* 1개 wrapper*/}
                                    <div className='main-div-product-img-wrapper'> {/* 이미지 wrapper */}
                                        <img src={eximg} className='main-img-product' alt='상품이미지'/>
                                    </div>
                                    <div className='main-div-text-wrapper'>{/* text wrapper */}
                                        <div>{/* 브랜드 */}
                                            <p className='main-p-product-brandname'>브랜드명</p>
                                        </div>
                                        <div> {/* 상품이름 */}
                                            <p className='main-p-product-name'>스카이 블루 하이웨스트 데님</p>
                                        </div>
                                        <div className='main-div-product-price-wrapper'> {/* 가격 */}
                                            <p className='main-p-product-price'>182,000</p>
                                            <p className='main-p-product-won'>원</p>
                                        </div>
                                    </div>
                                </div><div className='main-div-product-wrapper'>{/* 1개 wrapper*/}
                                    <div className='main-div-product-img-wrapper'> {/* 이미지 wrapper */}
                                        <img src={eximg} className='main-img-product' alt='상품이미지'/>
                                    </div>
                                    <div className='main-div-text-wrapper'>{/* text wrapper */}
                                        <div>{/* 브랜드 */}
                                            <p className='main-p-product-brandname'>브랜드명</p>
                                        </div>
                                        <div> {/* 상품이름 */}
                                            <p className='main-p-product-name'>스카이 블루 하이웨스트 데님</p>
                                        </div>
                                        <div className='main-div-product-price-wrapper'> {/* 가격 */}
                                            <p className='main-p-product-price'>182,000</p>
                                            <p className='main-p-product-won'>원</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='main-div-product-wrapper'>{/* 1개 wrapper*/}
                                    <div className='main-div-product-img-wrapper'> {/* 이미지 wrapper */}
                                        <img src={eximg} className='main-img-product' alt='상품이미지'/>
                                    </div>
                                    <div className='main-div-text-wrapper'>{/* text wrapper */}
                                        <div>{/* 브랜드 */}
                                            <p className='main-p-product-brandname'>브랜드명</p>
                                        </div>
                                        <div> {/* 상품이름 */}
                                            <p className='main-p-product-name'>스카이 블루 하이웨스트 데님</p>
                                        </div>
                                        <div className='main-div-product-price-wrapper'> {/* 가격 */}
                                            <p className='main-p-product-price'>182,000</p>
                                            <p className='main-p-product-won'>원</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='main-div-product-wrapper'>{/* 1개 wrapper*/}
                                    <div className='main-div-product-img-wrapper'> {/* 이미지 wrapper */}
                                        <img src={eximg} className='main-img-product' alt='상품이미지'/>
                                    </div>
                                    <div className='main-div-text-wrapper'>{/* text wrapper */}
                                        <div>{/* 브랜드 */}
                                            <p className='main-p-product-brandname'>브랜드명</p>
                                        </div>
                                        <div> {/* 상품이름 */}
                                            <p className='main-p-product-name'>스카이 블루 하이웨스트 데님</p>
                                        </div>
                                        <div className='main-div-product-price-wrapper'> {/* 가격 */}
                                            <p className='main-p-product-price'>182,000</p>
                                            <p className='main-p-product-won'>원</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='main-div-product-wrapper'>{/* 1개 wrapper*/}
                                    <div className='main-div-product-img-wrapper'> {/* 이미지 wrapper */}
                                        <img src={eximg} className='main-img-product' alt='상품이미지'/>
                                    </div>
                                    <div className='main-div-text-wrapper'>{/* text wrapper */}
                                        <div>{/* 브랜드 */}
                                            <p className='main-p-product-brandname'>브랜드명</p>
                                        </div>
                                        <div> {/* 상품이름 */}
                                            <p className='main-p-product-name'>스카이 블루 하이웨스트 데님</p>
                                        </div>
                                        <div className='main-div-product-price-wrapper'> {/* 가격 */}
                                            <p className='main-p-product-price'>182,000</p>
                                            <p className='main-p-product-won'>원</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='main-div-product-wrapper'>{/* 1개 wrapper*/}
                                    <div className='main-div-product-img-wrapper'> {/* 이미지 wrapper */}
                                        <img src={eximg} className='main-img-product' alt='상품이미지'/>
                                    </div>
                                    <div className='main-div-text-wrapper'>{/* text wrapper */}
                                        <div>{/* 브랜드 */}
                                            <p className='main-p-product-brandname'>브랜드명</p>
                                        </div>
                                        <div> {/* 상품이름 */}
                                            <p className='main-p-product-name'>스카이 블루 하이웨스트 데님</p>
                                        </div>
                                        <div className='main-div-product-price-wrapper'> {/* 가격 */}
                                            <p className='main-p-product-price'>182,000</p>
                                            <p className='main-p-product-won'>원</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='main-div-product-wrapper'>{/* 1개 wrapper*/}
                                    <div className='main-div-product-img-wrapper'> {/* 이미지 wrapper */}
                                        <img src={eximg} className='main-img-product' alt='상품이미지'/>
                                    </div>
                                    <div className='main-div-text-wrapper'>{/* text wrapper */}
                                        <div>{/* 브랜드 */}
                                            <p className='main-p-product-brandname'>브랜드명</p>
                                        </div>
                                        <div> {/* 상품이름 */}
                                            <p className='main-p-product-name'>스카이 블루 하이웨스트 데님</p>
                                        </div>
                                        <div className='main-div-product-price-wrapper'> {/* 가격 */}
                                            <p className='main-p-product-price'>182,000</p>
                                            <p className='main-p-product-won'>원</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='main-div-product-wrapper'>{/* 1개 wrapper*/}
                                    <div className='main-div-product-img-wrapper'> {/* 이미지 wrapper */}
                                        <img src={eximg} className='main-img-product' alt='상품이미지'/>
                                    </div>
                                    <div className='main-div-text-wrapper'>{/* text wrapper */}
                                        <div>{/* 브랜드 */}
                                            <p className='main-p-product-brandname'>브랜드명</p>
                                        </div>
                                        <div> {/* 상품이름 */}
                                            <p className='main-p-product-name'>스카이 블루 하이웨스트 데님</p>
                                        </div>
                                        <div className='main-div-product-price-wrapper'> {/* 가격 */}
                                            <p className='main-p-product-price'>182,000</p>
                                            <p className='main-p-product-won'>원</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='main-div-product-wrapper'>{/* 1개 wrapper*/}
                                    <div className='main-div-product-img-wrapper'> {/* 이미지 wrapper */}
                                        <img src={eximg} className='main-img-product' alt='상품이미지'/>
                                    </div>
                                    <div className='main-div-text-wrapper'>{/* text wrapper */}
                                        <div>{/* 브랜드 */}
                                            <p className='main-p-product-brandname'>브랜드명</p>
                                        </div>
                                        <div> {/* 상품이름 */}
                                            <p className='main-p-product-name'>스카이 블루 하이웨스트 데님</p>
                                        </div>
                                        <div className='main-div-product-price-wrapper'> {/* 가격 */}
                                            <p className='main-p-product-price'>182,000</p>
                                            <p className='main-p-product-won'>원</p>
                                        </div>
                                    </div>
                                </div><div className='main-div-product-wrapper'>{/* 1개 wrapper*/}
                                    <div className='main-div-product-img-wrapper'> {/* 이미지 wrapper */}
                                        <img src={eximg} className='main-img-product' alt='상품이미지'/>
                                    </div>
                                    <div className='main-div-text-wrapper'>{/* text wrapper */}
                                        <div>{/* 브랜드 */}
                                            <p className='main-p-product-brandname'>브랜드명</p>
                                        </div>
                                        <div> {/* 상품이름 */}
                                            <p className='main-p-product-name'>스카이 블루 하이웨스트 데님</p>
                                        </div>
                                        <div className='main-div-product-price-wrapper'> {/* 가격 */}
                                            <p className='main-p-product-price'>182,000</p>
                                            <p className='main-p-product-won'>원</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='main-div-product-wrapper'>{/* 1개 wrapper*/}
                                    <div className='main-div-product-img-wrapper'> {/* 이미지 wrapper */}
                                        <img src={eximg} className='main-img-product' alt='상품이미지'/>
                                    </div>
                                    <div className='main-div-text-wrapper'>{/* text wrapper */}
                                        <div>{/* 브랜드 */}
                                            <p className='main-p-product-brandname'>브랜드명</p>
                                        </div>
                                        <div> {/* 상품이름 */}
                                            <p className='main-p-product-name'>스카이 블루 하이웨스트 데님</p>
                                        </div>
                                        <div className='main-div-product-price-wrapper'> {/* 가격 */}
                                            <p className='main-p-product-price'>182,000</p>
                                            <p className='main-p-product-won'>원</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='main-div-product-wrapper'>{/* 1개 wrapper*/}
                                    <div className='main-div-product-img-wrapper'> {/* 이미지 wrapper */}
                                        <img src={eximg} className='main-img-product' alt='상품이미지'/>
                                    </div>
                                    <div className='main-div-text-wrapper'>{/* text wrapper */}
                                        <div>{/* 브랜드 */}
                                            <p className='main-p-product-brandname'>브랜드명</p>
                                        </div>
                                        <div> {/* 상품이름 */}
                                            <p className='main-p-product-name'>스카이 블루 하이웨스트 데님</p>
                                        </div>
                                        <div className='main-div-product-price-wrapper'> {/* 가격 */}
                                            <p className='main-p-product-price'>182,000</p>
                                            <p className='main-p-product-won'>원</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='main-div-product-wrapper'>{/* 1개 wrapper*/}
                                    <div className='main-div-product-img-wrapper'> {/* 이미지 wrapper */}
                                        <img src={eximg} className='main-img-product' alt='상품이미지'/>
                                    </div>
                                    <div className='main-div-text-wrapper'>{/* text wrapper */}
                                        <div>{/* 브랜드 */}
                                            <p className='main-p-product-brandname'>브랜드명</p>
                                        </div>
                                        <div> {/* 상품이름 */}
                                            <p className='main-p-product-name'>스카이 블루 하이웨스트 데님</p>
                                        </div>
                                        <div className='main-div-product-price-wrapper'> {/* 가격 */}
                                            <p className='main-p-product-price'>182,000</p>
                                            <p className='main-p-product-won'>원</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button className='main-btn-button' onClick={onClickShowmore}>모아보기 {' > '}</button> {/* 모아보기 버튼 */}
                            </div>
                        </>
                )}
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
                
                <div className='main-div-products-wrapper'>{/* 전체틀 */}
                    <div className='main-div-product-wrapper'>{/* 1개 wrapper*/}
                        <div className='main-div-product-img-wrapper'> {/* 이미지 wrapper */}
                            <img src={eximg} className='main-img-product' alt='상품이미지'/>
                        </div>
                        <div>{/* text wrapper */}
                            <div>{/* 브랜드 */}
                                <p className='main-p-product-brandname'>브랜드명</p>
                            </div>
                            <div> {/* 상품이름 */}
                                <p className='main-p-product-name'>스카이 블루 하이웨스트 데님</p>
                            </div>
                            <div className='main-div-product-price-wrapper'> {/* 가격 */}
                                <p className='main-p-product-price'>182,000</p>
                                <p className='main-p-product-won'>원</p>
                            </div>
                        </div>
                    </div>
                    <div className='main-div-product-wrapper'>{/* 1개 wrapper*/}
                        <div className='main-div-product-img-wrapper'> {/* 이미지 wrapper */}
                            <img src={eximg} className='main-img-product' alt='상품이미지'/>
                        </div>
                        <div>{/* text wrapper */}
                            <div>{/* 브랜드 */}
                                <p className='main-p-product-brandname'>브랜드명</p>
                            </div>
                            <div> {/* 상품이름 */}
                                <p className='main-p-product-name'>스카이 블루 하이웨스트 데님</p>
                            </div>
                            <div className='main-div-product-price-wrapper'> {/* 가격 */}
                                <p className='main-p-product-price'>182,000</p>
                                <p className='main-p-product-won'>원</p>
                            </div>
                        </div>
                    </div>
                    <div className='main-div-product-wrapper'>{/* 1개 wrapper*/}
                        <div className='main-div-product-img-wrapper'> {/* 이미지 wrapper */}
                            <img src={eximg} className='main-img-product' alt='상품이미지'/>
                        </div>
                        <div>{/* text wrapper */}
                            <div>{/* 브랜드 */}
                                <p className='main-p-product-brandname'>브랜드명</p>
                            </div>
                            <div> {/* 상품이름 */}
                                <p className='main-p-product-name'>스카이 블루 하이웨스트 데님</p>
                            </div>
                            <div className='main-div-product-price-wrapper'> {/* 가격 */}
                                <p className='main-p-product-price'>182,000</p>
                                <p className='main-p-product-won'>원</p>
                            </div>
                        </div>
                    </div>
                    <div className='main-div-product-wrapper'>{/* 1개 wrapper*/}
                        <div className='main-div-product-img-wrapper'> {/* 이미지 wrapper */}
                            <img src={eximg} className='main-img-product' alt='상품이미지'/>
                        </div>
                        <div>{/* text wrapper */}
                            <div>{/* 브랜드 */}
                                <p className='main-p-product-brandname'>브랜드명</p>
                            </div>
                            <div> {/* 상품이름 */}
                                <p className='main-p-product-name'>스카이 블루 하이웨스트 데님</p>
                            </div>
                            <div className='main-div-product-price-wrapper'> {/* 가격 */}
                                <p className='main-p-product-price'>182,000</p>
                                <p className='main-p-product-won'>원</p>
                            </div>
                        </div>
                    </div>
                    <div className='main-div-product-wrapper'>{/* 1개 wrapper*/}
                        <div className='main-div-product-img-wrapper'> {/* 이미지 wrapper */}
                            <img src={eximg} className='main-img-product' alt='상품이미지'/>
                        </div>
                        <div>{/* text wrapper */}
                            <div>{/* 브랜드 */}
                                <p className='main-p-product-brandname'>브랜드명</p>
                            </div>
                            <div> {/* 상품이름 */}
                                <p className='main-p-product-name'>스카이 블루 하이웨스트 데님</p>
                            </div>
                            <div className='main-div-product-price-wrapper'> {/* 가격 */}
                                <p className='main-p-product-price'>182,000</p>
                                <p className='main-p-product-won'>원</p>
                            </div>
                        </div>
                    </div>
                    <div className='main-div-product-wrapper'>{/* 1개 wrapper*/}
                        <div className='main-div-product-img-wrapper'> {/* 이미지 wrapper */}
                            <img src={eximg} className='main-img-product' alt='상품이미지'/>
                        </div>
                        <div>{/* text wrapper */}
                            <div>{/* 브랜드 */}
                                <p className='main-p-product-brandname'>브랜드명</p>
                            </div>
                            <div> {/* 상품이름 */}
                                <p className='main-p-product-name'>스카이 블루 하이웨스트 데님</p>
                            </div>
                            <div className='main-div-product-price-wrapper'> {/* 가격 */}
                                <p className='main-p-product-price'>182,000</p>
                                <p className='main-p-product-won'>원</p>
                            </div>
                        </div>
                    </div>
                    <div className='main-div-product-wrapper'>{/* 1개 wrapper*/}
                        <div className='main-div-product-img-wrapper'> {/* 이미지 wrapper */}
                            <img src={eximg} className='main-img-product' alt='상품이미지'/>
                        </div>
                        <div>{/* text wrapper */}
                            <div>{/* 브랜드 */}
                                <p className='main-p-product-brandname'>브랜드명</p>
                            </div>
                            <div> {/* 상품이름 */}
                                <p className='main-p-product-name'>스카이 블루 하이웨스트 데님</p>
                            </div>
                            <div className='main-div-product-price-wrapper'> {/* 가격 */}
                                <p className='main-p-product-price'>182,000</p>
                                <p className='main-p-product-won'>원</p>
                            </div>
                        </div>
                    </div>
                    <div className='main-div-product-wrapper'>{/* 1개 wrapper*/}
                        <div className='main-div-product-img-wrapper'> {/* 이미지 wrapper */}
                            <img src={eximg} className='main-img-product' alt='상품이미지'/>
                        </div>
                        <div>{/* text wrapper */}
                            <div>{/* 브랜드 */}
                                <p className='main-p-product-brandname'>브랜드명</p>
                            </div>
                            <div> {/* 상품이름 */}
                                <p className='main-p-product-name'>스카이 블루 하이웨스트 데님</p>
                            </div>
                            <div className='main-div-product-price-wrapper'> {/* 가격 */}
                                <p className='main-p-product-price'>182,000</p>
                                <p className='main-p-product-won'>원</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <button className='main-btn-button'>전체보기 {' > '}</button>  {/* 더보기 버튼 */}
                </div>
            </div>
        </div>
    )
}



export default Main;