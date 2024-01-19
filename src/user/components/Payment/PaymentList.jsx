import React from "react";
import PaymentListItem from "./PaymentListItem";
import datas from "../../../assets/PaymentProductsData.json";

export default function OrderList(props){

    return(
        <div>
            {datas.productList.map((product)=>{
                return(<PaymentListItem key={product.id} image={product.image} brand={product.brand}
                productName={product.productName} option={product.option} sales={product.sales}
                productPrice={product.productPrice} quantity={product.quantity}/>);
            })}
        </div>
    );
}