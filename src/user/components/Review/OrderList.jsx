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
              orderTime={order.orderTime} 
              orderNumber={order.orderNumber}
            />
            <hr className="productreview-hr-line2"/>
            {order.items.map((item, itemIndex) => (
              <div key={itemIndex} className="productreview-div-review-content-wrapper">
                <OrderItem
                  brand={item.brand}
                  name={item.name}
                  option={item.option}
                  count={item.count}
                  price={item.price}
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