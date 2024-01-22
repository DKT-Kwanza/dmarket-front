import React from "react";
import './PaymentListItem.css'

export default function PaymentListItem({ img, brand, productName, option, sales, productPrice, quantity }){
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
                                    <img src={img} style={{ width: "100px", height: "100px" }}/>
                                </span>
                            </div>
                        </td>
                        <td className="payment-product-td-info">
                            <p className="payment-product-brand">{brand}</p>
                            <p className="payment-product-productName">{productName}</p>
                            <div className='payment-product-description-bar'></div>
                            <div className='payment-product-option'>
                                <div>{option}</div>
                                <div className='cartItem-option-value'>{quantity}</div>
                            </div>
                        </td>
                        <td className="payment-product-td-price">
                            <div className="payment-product-sales-div">
                                <span className="payment-product-sales">{sales}</span>
                                <span className="payment-product-tx">원</span>
                            </div>
                            <div style={{display: "block"}}>
                                <del>
                                    <span className="payment-product-prodPrice">{productPrice}</span>
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
