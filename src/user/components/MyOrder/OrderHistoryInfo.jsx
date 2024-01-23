import React from 'react';
import { formatDate, formatTime } from '../../../utils/formatDate';
import './OrderHistoryInfo.css'

const OrderHistoryInfo = ({ orderDate, orderId, navigateToOrderHistoryDetail }) => {

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
