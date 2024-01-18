import React from "react";
import "./OrderInfo.css";

const OrderInfo = ({ orderDate, orderTime, orderNumber }) => {
  return (
    <div className="productreview-div-review-orderwrapper">
      <div className="productreview-div-review-ordertime">
        <p className="productreview-p-review-orderdate">{orderDate}</p>
        <p className="productreview-p-review-ordertime">({orderTime})</p>
      </div>
      <div className="productreview-div-review-ordernum">
        <p className="productreview-p-review-ordernum">주문번호</p>
        <p className="productreview-p-review-ordernum-num">{orderNumber}</p>
      </div>
    </div>
  );
};

export default OrderInfo;