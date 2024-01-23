import React from "react";
import "./OrderInfo.css";
import { formatDate, formatTime } from '../../../utils/formatDate';

const OrderInfo = ({ orderDate, orderId }) => {
  
  return (
    <div className="productreview-div-review-orderwrapper">
      <div className="productreview-div-review-ordertime">
        <p className="productreview-p-review-orderdate">{formatDate(orderDate)}</p> {/* 주문 날짜 */}
        <p className="productreview-p-review-ordertime">({formatTime(orderDate)})</p> {/* 주문 시간 */}
      </div>
      <div className="productreview-div-review-ordernum">
        <p className="productreview-p-review-ordernum">주문번호</p>
        <p className="productreview-p-review-ordernum-num">{orderId}</p> {/* 주문 번호 */}
      </div>
    </div>
  );
};

export default OrderInfo;