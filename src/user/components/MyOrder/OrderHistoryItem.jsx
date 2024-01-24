import React from 'react';
import {useNavigate} from "react-router-dom";
import OrderItem from "../../components/OrderItem";
import OrderHistoryInfo from './OrderHistoryInfo';
import './OrderHistoryItem.css'

const OrderHistoryItem = ({ orderDate, orderId, orderItems }) => {
    const navigate = useNavigate();

    const navigateToOrderHistoryDetail = () => {
        navigate("../orderInfoDetail");
    }
    return (
        <div className="orderHistory-order-list">
            <OrderHistoryInfo 
                orderDate={orderDate} 
                orderId={orderId} 
                navigateToOrderHistoryDetail={navigateToOrderHistoryDetail} 
            />
            <div className="orderHistory-order-line"/>

            {orderItems.map((item, index) => (
                <OrderItem
                    key={index}
                    productImg={item.productImg}
                    productBrand={item.productBrand}
                    productName={item.productName}
                    productOption={item.productOption}
                    productTotalSalePrice={item.productTotalSalePrice}
                    children={item.productStatus}
                    productCount={item.productCount}
                />
            ))}
        </div>
    );
};

export default OrderHistoryItem;
