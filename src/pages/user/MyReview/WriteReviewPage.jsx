import "./WriteReviewPage.css";
import React, {useState, useCallback} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import MyPageSidebar from "@components/user/Sidebar/MyPageSidebar";
import MyPageSubHeader from "@components/user/Header/MyPageSubHeader";
import {formatPrice} from '@utils/Format';
import axios from "axios";
import {productsApi} from "@api/Api";

function WriteReview() {
    const navigate = useNavigate();
    const {orderDetailList} = useLocation().state;
    const orderDetailId = orderDetailList.orderDetailId;
    const productId = orderDetailList.productId;
    const optionId = orderDetailList.optionId;
    const [rating, setRating] = useState(0);
    const [reviewImg, setReviewImg] = useState(null); // 첨부 이미지 상태 변수
    const [reviewContents, setReviewContents] = useState(''); // 리뷰 내용 상태 변수
    const [lengthCheck, setLengthCheck] = useState(false);

    const uploadReviewImg = useCallback(async (e) => {
        const file = e.target.files[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setReviewImg(previewUrl);
        }
    }, []);

    const token = sessionStorage.getItem("token");
    const userId = sessionStorage.getItem("userId");

    /* 리뷰 작성 api 호출 */
    const handleReviewSubmit = async () => {
        try {
            const url = `${productsApi}/${productId}/review`;
            await axios.post(url, {
                userId: userId,
                orderDetailId: orderDetailId,
                optionId: optionId,
                reviewRating: rating,
                reviewContents: reviewContents,
                reviewImg: reviewImg
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            navigate('/mydkt/review', {replace: true})
        } catch (e) {
            console.error("Error fetching data: ", e);
        }
    }

    const handleStarClick = (clickedRating) => {
        setRating(clickedRating);
    };

    /* 작성한 리뷰 컨텐츠 */
    const handleReviewContentsChange = (e) => {
        setReviewContents(e.target.value)
        if (reviewContents.length >= 20) {
            setLengthCheck(true);
        } else {
            setLengthCheck(false);
        }
    };

    return (
        <div>
            <MyPageSubHeader/>
            <div className="mypageProductReview-body">
                <div className="mypageProductReview-container">
                    <MyPageSidebar/>
                    <div className="productreview-div-review-wrapper">
                        <div className="mypageProductReview-content">
                            <div className="mypageProductReview-title">
                                <div className="mypageProductReview-title-bar"/>
                                <div className="mypageProductReview-title-content">상품리뷰 작성</div>
                            </div>
                            <div className="mypageProductReview-title-line"></div>
                            <div className="mypageProductReview-order-list">
                                <div className="mypageProductReview-order-item">
                                    <img className="mypageProductReview-item-img"
                                         alt={orderDetailList.productName}
                                         src={orderDetailList.productImg}/>
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
                                                <div className="mypageProductReview-item-info-option">수량</div>
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
                                            onClick={() => handleStarClick(index)}>
                                        ★
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="mypageProductReview-contents">
                                <div className="mypageProductReview-stars-title">
                                    내용
                                </div>
                                <textarea
                                    className="mypageProductReview-contents-contents"
                                    placeholder="내용을 입력하세요 (20자 이상 작성)"
                                    value={reviewContents}
                                    onChange={handleReviewContentsChange}
                                />
                                {lengthCheck
                                    ? null
                                    : (
                                        <span style={{color: 'red', fontSize: '14px'}}>20자 이상 작성해 주세요.</span>
                                    )}
                            </div>

                            <div className="mypageProductReview-pictures">
                                <div className="mypageProductReview-stars-title">
                                    사진
                                </div>
                                <div>
                                    {reviewImg ? (
                                        <div>
                                            <img src={reviewImg} alt="Inquiry Preview" className="review-image"/>
                                            <div className='mypageProductReview-stars-button'>
                                                <label htmlFor="image-upload"
                                                       className="mypageProductReview-stars-button-plus">
                                                    사진 변경
                                                </label>
                                                <input id="image-upload" type="file" accept='image/*'
                                                       onChange={uploadReviewImg} style={{display: 'none'}}/>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="mypageProductReview-stars-button">
                                            <label htmlFor="image-upload"
                                                   className="mypageProductReview-stars-button-plus2">
                                                사진 업로드
                                            </label>
                                            <input id="image-upload" type="file" accept='image/*'
                                                   onChange={uploadReviewImg} style={{display: 'none'}}/>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="mypageProductReview-pictures-notice">
                                사진첨부는 최대 1장 가능합니다.
                            </div>
                            <div className="mypageProductReview-registration">
                                <button className="mypageProductReview-registration-button"
                                        disabled={!lengthCheck}
                                        onClick={handleReviewSubmit}>
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