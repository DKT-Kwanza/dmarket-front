import React from "react";
import "./ReviewList.css";
import eximg from '../../../../../assets/images/720X720.jpg'
import MyPageSidebar from "../../../../components/MyPage/Sidebar/MyPageSidebar";
import MyPageSubHeader from "../../../../components/MyPage/SubHeader/MyPageSubHeader";
import {useState} from "react";
import OrderList from "../../../../components/Review/OrderList";
import OrderReviewList from "../../../../components/Review/OrderReviewList";

const ReviewList = () => {
    const ordersData = [
        {
          orderDate: "2024-01-09 09:48:00",
          orderId: "20210105123456",
          orderDetail: [
            {
                orderDetailId: 34,
                brand: "JAJU",
                productName: "쿠시노 코지 저상형 침대(패브릭,SS)",
                productImg: "https://placehold.co/130x130",
                option: "GREY BEIGE L",
                sales: "1,208,000"
            },
            {
                orderDetailId: 35,
                brand: "nike",
                productName: "후드티",
                productImg: "https://placehold.co/130x130",
                option: "black",
                sales: "1,000,000"
            },
          ]
        },
        {
            orderDate: "2024-01-09 09:48:00",
            orderId: "20210105123456",
            orderDetail: [
              {
                  orderDetailId: 34,
                  brand: "JAJU",
                  productName: "쿠시노 코지 저상형 침대(패브릭,SS)",
                  productImg: "https://placehold.co/130x130",
                  option: "GREY BEIGE L",
                  sales: "1,208,000"
              },
            ]
        },
    ]

    const reviewsData = [
        {
            orderDate: "2024-01-09 09:48:00",
            orderId: "20210105123456",
            "reviewList": [
               {
                    orderDetailId: 34,
                    brand: "JAJU",
                    productName: "쿠시노 코지 저상형 침대(패브릭,SS)",
                    productImg: "https://placehold.co/130x130",
                    option: "GREY BEIGE L",
                    sales: "1,208,000",
                    reviews: [
                        {
                        reviewId: 1,
                        contents: "커버 잘 되고 좋아요",
                        rating: 4,
                        reviewCreatedDate : "2024-01-09 09:48:00",
                        reviewImg: null,
                        },
                    ]
                },
                {
                    orderDetailId: 35,
                    brand: "nike",
                    productName: "후드티",
                    productImg: "https://placehold.co/130x130",
                    option: "black",
                    sales: "1,208,000",
                    reviews: [
                        {
                        reviewId: 1,
                        contents: "잘맞아요",
                        rating: 5,
                        reviewCreatedDate : "2024-02-09 09:48:00",
                        reviewImg: "https://placehold.co/130x130",
                        },
                    ]
                }
            ],
        },
    ];

    const [review, setReview] = useState(true);
    const [reviewed, setReviewed] = useState(false);

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
                                <OrderList orders={ordersData} /> {/* 작성 가능한 리뷰 */}
                            </>
                        ) : 
                        (
                            <>
                                <OrderReviewList orders={reviewsData} /> {/* 작성한 리뷰 */}
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default ReviewList;