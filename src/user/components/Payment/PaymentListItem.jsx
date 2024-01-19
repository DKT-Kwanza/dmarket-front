import React from "react";
import './PaymentListItem.css'

export default function PaymentListItem(props){
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
                            <div className='payment-product-description-bar'></div>
                            <div className='payment-product-option'>
                                <div>{props.option}</div>
                                <div className='cartItem-option-value'>{props.quantity}</div>
                            </div>
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
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
