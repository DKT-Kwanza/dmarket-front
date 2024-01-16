import React from "react";

export default function OrderListItem(props){
    return(
        <div className="payment-product-wrap">
            <table>
                <colgroup>
                    <col style={{width:"120px"}}/><col/><col style={{width:"200px"}}/>
                </colgroup>
                <tbody>
                    <tr className="payment-products-table">
                        <td className="payment-product-td-img">
                            <div className="payment-product-td1-div">
                                <span aria-hidden="true" className="payment-product-td1-span">
                                    <img src={props.image} alt=""/>
                                </span>
                            </div>
                        </td>
                        <td className="payment-product-td-info">
                            <p className="payment-product-brand">{props.brand}</p>
                            <p className="payment-product-productName">{props.productName}</p>
                            <p className="payment-product-option">
                                <span className="payment-product-option-op">옵션</span>
                                <span>{props.option}</span>
                            </p>
                        </td>
                        <td className="payment-product-td-price">
                            <div className="payment-product-sales-div">
                                <span className="payment-product-sales">{props.sales}</span>
                                <span className="payment-product-tx">원</span>
                            </div>
                            <div style={{display: "block"}}>
                                <del>
                                    <span className="payment-product-prodPrice">{props.productPrice}</span>
                                </del>
                                <span className="payment-product-tx">원</span>
                            </div>
                            <span className="payment-product-line"></span>
                            <span className="payment-product-quantity">수량 {props.quantity}개</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
