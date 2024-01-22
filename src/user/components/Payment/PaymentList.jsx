import React from "react";
import PaymentListItem from "./PaymentListItem";

const PaymentList = ({ items }) => {
    return(
        <div>
            {items.map((item, index) => (
                <PaymentListItem 
                key={index} 
                img={item.productImg} 
                brand={item.brand}
                productName={item.productName} 
                option={item.optionId} 
                sales={item.sales}
                productPrice={item.productPrice} 
                quantity={item.quantity}/>
            ))}
        </div>
    );
}

export default PaymentList;