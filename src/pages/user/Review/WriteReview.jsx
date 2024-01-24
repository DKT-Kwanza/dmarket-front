import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { formatPrice } from '../../../utils/Format';
import "./WriteReview.css";
import MyPageSidebar from "../../../components/user/Sidebar/MyPageSidebar";
import MyPageSubHeader from "../../../components/user/Header/MyPageSubHeader";

function WriteReview() {

    const { state } = useLocation();
    const { orderDetailList } = state;
    const [rating, setRating] = useState(0);

    const handleStarClick = (clickedRating) => {
        setRating(clickedRating);
    };

    return (
        <div>
            <MyPageSubHeader />
            <div className="mypageProductReview-body">
                <div className="mypageProductReview-container">
                    <MyPageSidebar />
                    <div className="productreview-div-review-wrapper">
                        <div className="mypageProductReview-content">
                        
                            <div className="mypageProductReview-title">
                                <div className="mypageProductReview-title-bar"/>
                                <div className="mypageProductReview-title-content">상품리뷰 작성</div>
                            </div>
                            <div className="mypageProductReview-title-line"></div>

                        
                            <div className="mypageProductReview-order-list">
                                

                                <div className="mypageProductReview-order-item">
                                    <div className="mypageProductReview-item-img"/>
                                    <table className="mypageProductReview-item-info">
                                        <tr>
                                            <td className="mypageProductReview-item-info-tit">브랜드</td>
                                            <td className="mypageProductReview-item-info-cont">{orderDetailList.productBrand}</td>
                                        </tr>
                                        <tr>
                                            <td className="mypageProductReview-item-info-tit">상품명</td>
                                            <td className="mypageProductReview-item-info-cont">{orderDetailList.productName}</td>
                                        </tr>
                                        <tr>
                                            <td className="mypageProductReview-item-info-tit">옵션</td>
                                            <td className="mypageProductReview-item-info-cont">
                                                <div>{orderDetailList.productOption}</div>
                                                <div className="mypageProductReview-item-info-bar"/>
                                                <div>{orderDetailList.productCount}</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="mypageProductReview-item-info-tit">결제금액</td>
                                            <td className="mypageProductReview-item-info-cont">{formatPrice(orderDetailList.productTotalSalePrice)}원</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>

                            <div className="mypageProductReview-stars-before-line"/>

                            <div className="mypageProductReview-stars">
                                <div className="mypageProductReview-stars-title">
                                    별점
                                </div>
                                <div className="mypageProductReview-stars-contents">
                                    {[1, 2, 3, 4, 5].map((index) => (
                                        <span
                                            key={index}
                                            className={index <= rating ? 'filledStar' : 'emptyStar'}
                                            onClick={() => handleStarClick(index)}
                                        >
                                        ★
                                        </span>
                                    ))}
                                </div>


                            </div>

                            <div className="mypageProductReview-contents">
                                <div className="mypageProductReview-stars-title">
                                    내용
                                </div>
                                <input
                                    type="text"
                                    className="mypageProductReview-contents-contents"
                                    placeholder="내용을 입력하세요 (20자 이상 작성)"
                                />
                            </div>

                            <div className="mypageProductReview-pictures">
                                <div className="mypageProductReview-stars-title">
                                    사진
                                </div>
                                <button className="mypageProductReview-stars-button">
                                    <span className="mypageProductReview-stars-button-plus">+</span>
                                </button>
                            </div>

                            <div className="mypageProductReview-pictures-notice">
                                사진첨부는 최대 1장 가능합니다.
                            </div>

                            <div className="mypageProductReview-registration">
                                <button className="mypageProductReview-registration-button">
                                    등록
                                </button>
                            </div>




                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WriteReview;