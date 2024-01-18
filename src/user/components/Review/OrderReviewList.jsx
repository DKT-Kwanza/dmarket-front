import React from 'react';
import OrderInfo from './OrderInfo';
import OrderItem from '../OrderItem';
import ReviewItem from './ReviewItem';

const OrderReviewsList = ({ orders }) => {
  return (
    <div>
      {orders.map((order, index) => (
        <div key={index}>
          <OrderInfo 
            orderDate={order.orderDate} 
            orderTime={order.orderTime} 
            orderNumber={order.orderNumber}
          />
          <hr className="productreview-hr-line2"/>
          <div className="productreview-div-review-content-wrapper">
            <OrderItem
              brand={order.brand}
              name={order.name}
              option={order.option}
              count={order.count}
              price={order.price}
            />
          </div>
          <hr className="productreview-hr-line3"/>
          {order.reviews.map((review, reviewIndex) => (
            <ReviewItem
              key={reviewIndex}
              imgSrc={review.imgSrc}
              rating={review.rating}
              reviewText={review.reviewText}
              reviewDate={review.reviewDate}
            />
          ))}
          <hr className="productreview-hr-line3"/>
        </div>
      ))}
    </div>
  );
};

export default OrderReviewsList;