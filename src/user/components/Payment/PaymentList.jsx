import React from "react";
import OrderListItem from "./PaymentListItem";
import datas from "../../../assets/PaymentProductsData.json";

export default function OrderList(props){

    return(
        <div>
            {datas.productList.map((product)=>{
                return(<OrderListItem key={product.id} image={product.image} brand={product.brand}
                productName={product.productName} option={product.option} sales={product.sales}
                productPrice={product.productPrice} quantity={product.quantity}/>);
            })}
        </div>
    );
}