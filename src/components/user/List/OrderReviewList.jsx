import './OrderReviewList.css'
import React from 'react';
import OrderInfo from '../Info/OrderInfo';
import OrderItem from '../Item/OrderItem';
import ReviewItem from '../Item/ReviewItem';
import {formatDate} from '../../../utils/Format';

const OrderReviewsList = ({orders, deleteReview}) => {

    return (
        <div>
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
                                    productBrand={item.orderBrand}
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
