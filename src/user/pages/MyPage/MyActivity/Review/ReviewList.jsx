import React from "react";
import "./ReviewList.css";
import eximg from '../../../../../assets/images/720X720.jpg'
import MyPageSidebar from "../../../../components/MyPage/Sidebar/MyPageSidebar";
import MyPageSubHeader from "../../../../components/MyPage/SubHeader/MyPageSubHeader";
import {useState} from "react";
import { useNavigate } from 'react-router-dom';
import OrderList from "../../../../components/Review/OrderList";
import OrderReviewList from "../../../../components/Review/OrderReviewList";

const ReviewList = () => {
    const ordersData = [
        {
          orderDate: "2026.04.05",
          orderTime: "20시 10분",
          orderNumber: "20210105123456",
          items: [
            {
                brand: "JAJU",
                name: "쿠시노 코지 저상형 침대(패브릭,SS)",
                option: "GREY BEIGE L",
                count: "1",
                price: "1,208,000"
            },
            {
                brand: "nike",
                name: "후드티",
                option: "black",
                count: "100",
                price: "1,000,000"
            },
          ]
        },
        {
            orderDate: "2024.01.05",
            orderTime: "20시 10분",
            orderNumber: "20210105123456",
            items: [
                {
                    brand: "JAJU",
                    name: "쿠시노 코지 저상형 침대(패브릭,SS)",
                    option: "GREY BEIGE L",
                    count: "1",
                    price: "1,208,000"
                },
              ]
        },
        {
            orderDate: "2024.01.05",
            orderTime: "20시 10분",
            orderNumber: "20210105123456",
            items: [
                {
                    brand: "nike",
                    name: "후드티",
                    option: "black",
                    count: "100",
                    price: "1,000,000"
                },
                {
                    brand: "JAJU",
                    name: "쿠시노 코지 저상형 침대(패브릭,SS)",
                    option: "GREY BEIGE L",
                    count: "1",
                    price: "1,208,000"
                },
                {
                    brand: "nike",
                    name: "후드티",
                    option: "black",
                    count: "100",
                    price: "1,000,000"
                },
              ]
        },
    ];

    const reviewsData = [
        {
          orderDate: "2026.04.05",
          orderTime: "20시 10분",
          orderNumber: "20210105123456",
          brand: "JAJU",
          name: "쿠시노 코지 저상형 침대(패브릭,SS)",
          option: "GREY BEIGE L",
          count: "1",
          price: "1,208,000",
          reviews: [
            {
              imgSrc: eximg,
              rating: 2,
              reviewText:  "조금 크지만 그냥 입으려구요",
              reviewDate: "2024-01-10",
            },
          ],
        },
        {
            orderDate: "2024.01.05",
            orderTime: "20시 10분",
            orderNumber: "20210105123456",
            brand: "JAJU",
            name: "쿠시노 코지 저상형 침대(패브릭,SS)",
            option: "GREY BEIGE L",
            count: "1",
            price: "1,208,000",
            reviews: [
              {
                imgSrc: null,
                rating: 5,
                reviewText:  "너무좋아요 최고~~!",
                reviewDate: "2024-01-10",
              },
            ],
        },
    ];

    const navigate = useNavigate();
    const [rating, setRating] = useState(5);
    const [rating2, setRating2] = useState(2);

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

    const navigateToWrite = () => {
        navigate("../mypage/writereview");
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
                                <OrderList orders={ordersData} />
                            </>
                            ) : 
                            (
                                <>
                                    <OrderReviewList orders={reviewsData} />
                                </>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default ReviewList;