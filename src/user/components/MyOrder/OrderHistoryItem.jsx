import React from 'react';
import {useNavigate} from "react-router-dom";
import OrderItem from "../../components/OrderItem";
import OrderHistoryInfo from './OrderHistoryInfo';
import './OrderHistoryItem.css'

const OrderHistoryItem = ({ orderDate, orderId, orderItems }) => {
    const navigate = useNavigate();

    const navigateToOrderHistoryDetail = () => {
        navigate("./detail");
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
                    img={item.productImg}
                    brand={item.brand}
                    name={item.productName}
                    option={item.option}
                    price={item.sales}
                    children={item.status}
                />
            ))}
        </div>
    );
};

export default OrderHistoryItem;
