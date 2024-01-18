import React from "react";
import "./OrderInfo.css";

const OrderInfo = ({ orderDate, orderId }) => {
  const formatDate = (datetime) => { // 날짜만 남기기
    const date = new Date(datetime);
    return date.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' });
  };

  const formatTime = (datetime) => { // 시간만 남기기
    const date = new Date(datetime);
    let hours = date.getHours();
    const minutes = date.getMinutes();

    // 시간을 2자리 형식으로 포매팅
    hours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');

    return `${hours}:${formattedMinutes}`;
  };
  
  return (
    <div className="productreview-div-review-orderwrapper">
      <div className="productreview-div-review-ordertime">
        <p className="productreview-p-review-orderdate">{formatDate(orderDate)}</p>
        <p className="productreview-p-review-ordertime">({formatTime(orderDate)})</p>
      </div>
      <div className="productreview-div-review-ordernum">
        <p className="productreview-p-review-ordernum">주문번호</p>
        <p className="productreview-p-review-ordernum-num">{orderId}</p>
      </div>
    </div>
  );
};

export default OrderInfo;