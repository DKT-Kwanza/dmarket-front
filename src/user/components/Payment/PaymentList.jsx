import React from "react";
import PaymentListItem from "./PaymentListItem";

const PaymentList = ({ items }) => {
    return(
        <div>
            {items.map((item, index) => (
                <PaymentListItem 
                key={index} 
                productImg={item.productImg} 
                productBrand={item.productBrand}
                productName={item.productName} 
                productOption={item.productOption}
                productTotalSalePrice={item.productTotalSalePrice}  
                productTotalPrice={item.productTotalPrice}
                productCount={item.productCount}/>
            ))}
        </div>
    );
}

export default PaymentList;