import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./ReviewList.css";
import MyPageSidebar from "../../../components/user/Sidebar/MyPageSidebar";
import MyPageSubHeader from "../../../components/user/Header/MyPageSubHeader";
import OrderList from "../../../components/user/List/OrderList";
import OrderReviewList from "../../../components/user/List/OrderReviewList";

const ReviewList = () => {
    
    const [availableReviews, setAvailableReviews] = useState([]);
    const [writtenReviews, setWrittenReviews] = useState([]);
    const [review, setReview] = useState(true);
    const [reviewed, setReviewed] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/AvailableReviewsData.json");
                
                setAvailableReviews(response.data);

            } catch (e) {
                console.error("Error fetching data: ", e);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/WrittenReviewsData.json");
                
                setWrittenReviews(response.data);

            } catch (e) {
                console.error("Error fetching data: ", e);
            }
        };
        fetchData();
    }, []);

    const onClickReview = () => {
        setReview(true);
        setReviewed(false);
    }
    const onClickReviewed = () => {
        setReview(false);
        setReviewed(true);
    }
    
    return (
        <div className="productreview-div-global-wrapper"> {/* 전체 wrapper */}
            <MyPageSubHeader />
            <div className="productreview-div-review-container"> {/* 상품리뷰 전체 wrapper */}
                <MyPageSidebar />
                <div className="productreview-div-review-wrapper">
                    <div className="productreview-div-review-header"> {/* 상품리뷰 title */}
                        <div className="productreview-title-bar"/>
                        <div className="productreview-title-content">상품리뷰</div>
                    </div>
                    <hr className="productreview-hr-line"/>  {/* 상품리뷰 title과 내용 구분선 */}
                    <div className="productreview-div-review-togglewrapper"> {/* 작성 가능한 리뷰, 작성한 리뷰 toggle 버튼 */}
                        <button className="productreview-btn-review-togglebtn" style={{color: review ? "#000" : "#A9AFB3"}} onClick={onClickReview}>작성 가능한 리뷰</button> {/* 작성가능한리뷰만 불러오기 */}
                        <div className="productreview-div-review-divide">|</div> 
                        <button className="productreview-btn-review-togglebtn" style={{color: reviewed ? "#000" : "#A9AFB3"}} onClick={onClickReviewed}>작성한 리뷰</button> {/* 작성한리뷰만 불러오기 */}
                    </div>
                    {
                        review ? (
                            <>
                                <OrderList orders={availableReviews} /> {/* 작성 가능한 리뷰 */}
                            </>
                        ) : 
                        (
                            <>
                                <OrderReviewList orders={writtenReviews} /> {/* 작성한 리뷰 */}
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default ReviewList;