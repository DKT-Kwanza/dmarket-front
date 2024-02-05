import "./ReviewList.css";
import React, {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import MyPageSidebar from "../../../components/user/Sidebar/MyPageSidebar";
import MyPageSubHeader from "../../../components/user/Header/MyPageSubHeader";
import OrderList from "../../../components/user/List/OrderList";
import OrderReviewList from "../../../components/user/List/OrderReviewList";
import axios from 'axios';
import {userApi} from "../../../Api";
import {Pagination} from "@mui/material";

const ReviewList = () => {
    const navigate = useNavigate();
    const [availableReviews, setAvailableReviews] = useState([]);
    const [writtenReviews, setWrittenReviews] = useState([]);
    const [review, setReview] = useState(true);
    const [reviewed, setReviewed] = useState(false);

    const userId = sessionStorage.getItem("userId");
    const token = sessionStorage.getItem("token");

    /* 리뷰 페이지네이션 */
    const [reviewCurrentPage, setReviewCurrentPage] = useState(1);
    const [reviewTotalPages, setReviewTotalPages] = useState(0);
    const handleReviewPageChange = (event, value) => {
        setReviewCurrentPage(value);
        navigate(`?page=${value}`);
    };

    /* 작성 가능한 리뷰 데이터 */
    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = `${userApi}/${userId}/mypage/available-reviews?page=${reviewCurrentPage}`;
                const response = await axios.get(url, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                console.log("availablereviews: ", response.data.data.content);
                console.log(response.data.data);
                setAvailableReviews(response.data.data.content);
                setReviewTotalPages(response.data.data.totalPages);
            } catch (e) {
                console.error("Error fetching data: ", e);
            }
        };
        fetchData();
    }, [review, reviewCurrentPage]);

    /* 작성한 리뷰 */
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${userApi}/${userId}/mypage/written-reviews?page=${reviewCurrentPage}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                console.log("written: ", response.data.data);
                setWrittenReviews(response.data.data.content);
                setReviewTotalPages(response.data.data.totalPages);
            } catch (e) {
                console.error("Error fetching data: ", e);
            }
        };
        fetchData();
    }, [review, reviewCurrentPage]);

    /* 작성 가능한 리뷰, 작성한 리뷰 toggle 버튼 */
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
            <MyPageSubHeader/>
            <div className="productreview-div-review-container"> {/* 상품리뷰 전체 wrapper */}
                <MyPageSidebar/>
                <div className="productreview-div-review-wrapper">
                    <div className="productreview-div-review-header"> {/* 상품리뷰 title */}
                        <div className="productreview-title-bar"/>
                        <div className="productreview-title-content">상품리뷰</div>
                    </div>
                    <hr className="productreview-hr-line"/>
                    {/* 상품리뷰 title과 내용 구분선 */}
                    <div className="productreview-div-review-togglewrapper"> {/* 작성 가능한 리뷰, 작성한 리뷰 toggle 버튼 */}
                        <button className="productreview-btn-review-togglebtn"
                                style={{color: review ? "#000" : "#A9AFB3"}} onClick={onClickReview}>작성 가능한 리뷰
                        </button>
                        {/* 작성가능한리뷰만 불러오기 */}
                        <div className="productreview-div-review-divide">|</div>
                        <button className="productreview-btn-review-togglebtn"
                                style={{color: reviewed ? "#000" : "#A9AFB3"}} onClick={onClickReviewed}>작성한 리뷰
                        </button>
                        {/* 작성한리뷰만 불러오기 */}
                    </div>
                    {
                        review
                            ? <>
                                {/* 작성 가능한 리뷰 */}
                                <OrderList orders={availableReviews}/>
                                <Pagination count={reviewTotalPages} page={reviewCurrentPage}
                                            onChange={handleReviewPageChange}/>
                            </>
                            : <>
                                {/* 작성한 리뷰 */}
                                <OrderReviewList orders={writtenReviews}/>
                                <Pagination count={reviewTotalPages} page={reviewCurrentPage}
                                            onChange={handleReviewPageChange}/>
                            </>
                    }

                </div>
            </div>
        </div>
    );
}

export default ReviewList;