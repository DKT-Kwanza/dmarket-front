import React from 'react';
import OrderInfo from '../Info/OrderInfo';
import OrderItem from '../Item/OrderItem';
import ReviewItem from '../Item/ReviewItem';
import { formatDate } from '../../../utils/Format';
import './OrderReviewList.css'
import {productsApi} from "../../../Api";
import axios from "axios";

const OrderReviewsList = ({ orders }) => {

  const deleteReview = async (reviewId, productId) => {
    const token = sessionStorage.getItem("token");
    const userId = sessionStorage.getItem("userId");
    if (!token || !userId) {
      console.error("No token or userId")
      return;
    }
    try {
      await axios.delete(`${productsApi}/reviews/${reviewId}`,{
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'}
      })
    }
    catch (e) {
      console.error("Error fetching data: ", e);
    }
  };

  return (
      <div>
        {console.log(orders)}
          {orders && orders.map((order, index) => (
              <div key={index} className='orderReviewList-box'>
                {/* 주문 정보 */}
                  <OrderInfo 
                      orderDate={order.orderDate} 
                      orderId={order.orderId}
                  />
                  <hr className="productreview-hr-line2"/>
                  {order.orderDetailList.map((item, itemIndex) => (
                      <React.Fragment key={itemIndex}>
                          <div className="productreview-div-review-content-wrapper">
                            {/* 상품 정보 */}
                            <OrderItem 
                              productImg={item.productImg}
                              productBrand={item.productBrand}
                              productName={item.productName}
                              productOption={item.productOption}
                              productCount={item.productCount}
                              productTotalSalePrice={item.productTotalSalePrice}
                            />
                          </div>
                            <hr className="productreview-hr-line3"/>
                            {/* 리뷰 내용 */}
                            <ReviewItem
                                reviewImg={item.reviewImg}
                                reviewRating={item.reviewRating}
                                reviewContents={item.reviewContents}
                                reviewCreatedDate={formatDate(item.reviewCreatedDate)}
                                onDelete={() => deleteReview(item.reviewId)}
                            />
                            <hr className="productreview-hr-line3"/>
                      </React.Fragment>
                  ))}
              </div>
          ))}
      </div>
  );
};

export default OrderReviewsList;
