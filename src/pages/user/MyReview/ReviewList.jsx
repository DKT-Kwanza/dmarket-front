import "./ReviewList.css";
import React, {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import MyPageSidebar from "../../../components/user/Sidebar/MyPageSidebar";
import MyPageSubHeader from "../../../components/user/Header/MyPageSubHeader";
import OrderList from "../../../components/user/List/OrderList";
import OrderReviewList from "../../../components/user/List/OrderReviewList";
import ConfirmCancelModal from "../../../components/commmon/Modal/ConfirmCancelModal";
import {Pagination} from "@mui/material";
import axios from 'axios';
import {productsApi, userApi} from "src/Api";

const ReviewList = () => {
    const navigate = useNavigate();
    const [availableReviews, setAvailableReviews] = useState([]);
    const [writtenReviews, setWrittenReviews] = useState([]);
    const [review, setReview] = useState(true);

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
                setAvailableReviews(response.data.data.content);
                setReviewTotalPages(response.data.data.totalPages);
            } catch (e) {
                console.error("Error fetching data: ", e);
            }
        };

        if (review) {
            fetchData();
        }
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
                setWrittenReviews(response.data.data.content);
                setReviewTotalPages(response.data.data.totalPages);
            } catch (e) {
                console.error("Error fetching data: ", e);
            }
        };

        if (!review) {
            fetchData();
        }
    }, [review, reviewCurrentPage]);

    /* 작성 가능한 리뷰, 작성한 리뷰 toggle 버튼 */
    const onClickReview = () => {
        setReview(true);
        setReviewCurrentPage(1);
    }
    const onClickReviewed = () => {
        setReview(false);
        setReviewCurrentPage(1);
    }

    /* 리뷰 삭제 모달 */
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [reviewIdToDelete, setReviewIdToDelete] = useState(null);
    const handleOpenDeleteModal = (reviewId) => {
        setReviewIdToDelete(reviewId);
        setIsDeleteModalOpen(true);
    }
    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
    };

    /* 리뷰 삭제 api 호출 */
    const handleDeleteReview = async (reviewId) => {
        try {
            if (reviewIdToDelete) {
                await axios.delete(`${productsApi}/reviews/${reviewIdToDelete}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                /* 삭제된 리뷰를 제외한 새로운 배열 생성 */
                const updatedReviews = writtenReviews
                    .filter(order => !(
                        order.orderDetailList &&
                        order.orderDetailList.length === 1 &&
                        order.orderDetailList[0].reviewId === reviewIdToDelete
                    ))
                    .map(order => ({
                        ...order,
                        orderDetailList: order.orderDetailList.filter(review => review.reviewId !== reviewIdToDelete),
                    }));
                setWrittenReviews(updatedReviews);

                handleCloseDeleteModal();
            }
        } catch (e) {
            console.error("Error fetching data: ", e);
        }
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
                                style={{color: review ? "#A9AFB3" : "#000"}} onClick={onClickReviewed}>작성한 리뷰
                        </button>
                    </div>
                    {
                        review
                            ? <OrderList orders={availableReviews}/>
                            : <OrderReviewList orders={writtenReviews} deleteReview={handleOpenDeleteModal}/>
                    }
                    <Pagination count={reviewTotalPages} page={reviewCurrentPage}
                                onChange={handleReviewPageChange}/>
                </div>
            </div>
            {isDeleteModalOpen && (
                <ConfirmCancelModal isOpen={isDeleteModalOpen} onClose={handleCloseDeleteModal}
                                    onConfirm={() => handleDeleteReview()} color='#ff5d5d'>
                    <div>해당 리뷰를 삭제하시겠습니까?</div>
                </ConfirmCancelModal>
            )}
        </div>
    );
}

export default ReviewList;