import React from 'react';
import { useNavigate } from 'react-router-dom';
import OrderInfo from './OrderInfo';
import OrderItem from '../OrderItem';
import ReviewItem from './ReviewItem';

const OrderList = ({ orders }) => {
  const navigate = useNavigate();

  const navigateToWrite = () => {
    navigate('/mypage/writereview');
  }
  return (
    <div>
      {orders.map((order, index) => (
        <div key={index}>
          {/* 주문 정보 컴포넌트 */}
          <OrderInfo
            orderDate={order.orderDate}
            orderId={order.orderId}
          />
          <hr className="productreview-hr-line2"/>
          {order.orderDetail.map((item, itemIndex) => (
            <div key={itemIndex} className="productreview-div-review-content-wrapper">
              {/* 상품 정보 컴포넌트 */}
              <OrderItem
                img={item.productImg}
                brand={item.brand}
                name={item.productName}
                option={item.option}
                price={item.sales}
              >
                <div className="productreview-div-review-content-btn-wrapper">
                  <button onClick={navigateToWrite} className="productreview-btn-review-content-btn">작성하기</button>
                </div>
              </OrderItem>
            </div>
          ))}
          <hr className="productreview-hr-line3"/>
        </div>
      ))}
    </div>
  );
};

export default OrderList;
