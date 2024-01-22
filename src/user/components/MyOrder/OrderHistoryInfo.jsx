import React from 'react';
import './OrderHistoryInfo.css'

const OrderHistoryInfo = ({ orderDate, orderId, navigateToOrderHistoryDetail }) => {
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
        <div className="orderHistory-order-head">
            <div className="orderHistory-order-date">{formatDate(orderDate)}</div>
            <div className="orderHistory-order-time">({formatTime(orderDate)})</div>
            <div className="orderHistory-order-number-tit">주문번호</div>
            <div className="orderHistory-order-number">{orderId}</div>
            <button
                className="orderHistory-order-detail-btn"
                onClick={navigateToOrderHistoryDetail}>
                <div className="orderHistory-order-detail-tit">주문내역상세보기</div>
                {/* SVG 아이콘 */}
            </button>
        </div>
    );
};

export default OrderHistoryInfo;
