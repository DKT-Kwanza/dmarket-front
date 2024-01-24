import React from 'react';
import { useNavigate } from 'react-router-dom';
import OrderInfo from './OrderInfo';
import OrderItem from '../OrderItem';
import './OrderList.css'

const OrderList = ({ orders }) => {
  const navigate = useNavigate();

  /* 상품 정보 리뷰 작성 페이지로 전달 */
  const navigateToWrite = (orderDetailList) => {
    navigate('./write', { state: { orderDetailList } });
  };

  return (
    <div>
      {orders.map((order, index) => (
        <div key={index} className='OrderList-box'>
          {/* 주문 정보 컴포넌트 */}
          <OrderInfo
            orderDate={order.orderDate}
            orderId={order.orderId}
          />
          <hr className="productreview-hr-line2"/>
          {order.orderDetailList.map((item, itemIndex) => (
            <div key={itemIndex} className="productreview-div-review-content-wrapper">
              {/* 상품 정보 컴포넌트 */}
              <OrderItem
                productImg={item.productImg}
                productBrand={item.productBrand}
                productName={item.productName}
                productOption={item.productOption}
                productCount={item.productCount}
                productTotalSalePrice={item.productTotalSalePrice}
              >
                <div className="productreview-div-review-content-btn-wrapper">
                  <button onClick={() => navigateToWrite(item)} className="productreview-btn-review-content-btn">작성하기</button>
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
