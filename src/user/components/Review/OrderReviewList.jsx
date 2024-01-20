import React from 'react';
import OrderInfo from './OrderInfo';
import OrderItem from '../OrderItem';
import ReviewItem from './ReviewItem';

const OrderReviewsList = ({ orders }) => {
  const formatDate = (datetime) => { // 날짜만 남기기
    const date = new Date(datetime);
    return date.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' });
  };

  const deleteReview = (reviewId) => {
    alert(`${reviewId} 삭제하시겠습니까?`)
  };

  return (
      <div>
          {orders.map((order, index) => (
              <div key={index}>
                {/* 주문 정보 */}
                  <OrderInfo 
                      orderDate={order.orderDate} 
                      orderId={order.orderId}
                  />
                  <hr className="productreview-hr-line2"/>
                  {order.reviewList.map((reviewItem, reviewItemIndex) => (
                      <React.Fragment key={reviewItemIndex}>
                          <div className="productreview-div-review-content-wrapper">
                            {/* 상품 정보 */}
                              <OrderItem 
                                img={reviewItem.productImg}
                                brand={reviewItem.brand}
                                name={reviewItem.productName}
                                option={reviewItem.option}
                                price={reviewItem.sales}
                              />
                          </div>
                          {reviewItem.reviews.map((review, reviewIndex) => (
                              <React.Fragment key={reviewIndex}>
                                  <hr className="productreview-hr-line3"/>
                                  {/* 리뷰 내용 */}
                                  <ReviewItem
                                      imgSrc={review.reviewImg}
                                      rating={review.rating}
                                      reviewText={review.contents}
                                      reviewDate={formatDate(review.reviewCreatedDate)}
                                      onDelete={() => deleteReview(review.reviewId)}
                                  />
                                  <hr className="productreview-hr-line3"/>
                              </React.Fragment>
                          ))}
                      </React.Fragment>
                  ))}
              </div>
          ))}
      </div>
  );
};

export default OrderReviewsList;
