import React from 'react';
import OrderInfo from './OrderInfo';
import OrderItem from '../OrderItem';
import ReviewItem from './ReviewItem';

const OrderList = ({ orders }) => {
  return (
    <div>
      {orders.map((order, index) => (
        <div key={index}>
          <OrderInfo 
            orderDate={order.orderDate}
            orderId={order.orderId}
          />
          <hr className="productreview-hr-line2"/>
          {order.orderDetail.map((item, itemIndex) => (
            <div key={itemIndex} className="productreview-div-review-content-wrapper">
              <OrderItem
                img={item.productImg}
                brand={item.brand}
                name={item.productName}
                option={item.option}
                price={item.sales}
              />
            </div>
          ))}
          <hr className="productreview-hr-line3"/>
        </div>
      ))}
    </div>
  );
};

export default OrderList;
