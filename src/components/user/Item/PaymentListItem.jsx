import React from "react";
import './PaymentListItem.css'
import styled from 'styled-components';
import { formatPrice } from "../../../utils/Format";

function PaymentListItem({ productImg, productBrand, productName, productOption, productTotalSalePrice, productTotalPrice, productCount }){
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
                                    <img src={productImg} style={{ width: "100px", height: "100px" }}/>
                                </span>
                            </div>
                        </td>
                        <td className="payment-product-td-info">
                            <p className="payment-product-brand">{productBrand}</p>
                            <p className="payment-product-productName">{productName}</p>
                            <div className='payment-product-description-bar'></div>
                            <div className='payment-product-option'>
                                <div>옵션</div>
                                <Value>{productOption}</Value>
                                <Line/>
                                <div>수량</div>
                                <Value><div className='cartItem-option-value'>{productCount}</div></Value>
                            </div>
                        </td>
                        <td className="payment-product-td-price">
                            <div className="payment-product-sales-div">
                                <span className="payment-product-sales">{formatPrice(productTotalSalePrice)}</span>
                                <span className="payment-product-tx">원</span>
                            </div>
                            <div style={{display: "block"}}>
                                <del>
                                    <span className="payment-product-prodPrice">{formatPrice(productTotalPrice)}</span>
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

const Line = styled.div`
  width: 1px;
  height: 12px;
  background: #DBDBDB;
  margin: 0 10px;
`

const Value = styled.div`
  color: #505050;
  font-weight: 500;
`

export default PaymentListItem;