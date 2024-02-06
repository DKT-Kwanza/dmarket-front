import React from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { formatPrice } from "../../../utils/Format";
import {ReactComponent as ShoppingBag} from "../../../assets/icons/shopping-bag-03.svg";
import './PaymentInfo.css'
import { orderApi } from '../../../Api';

export default function PaymentInfo({ userName, totalPrice, discount, totalPay, productList }) {
    const navigate = useNavigate();
    const userId = sessionStorage.getItem('userId');
    const token = sessionStorage.getItem('token');

    const handleOrderSubmit = async () => {
        const orderDetailList = productList.map(product => ({
            productId: product.productId,
            optionId: product.optionId,
            orderDetailCount: product.productCount,
            orderDetailPrice: product.productTotalPrice, 
            orderDetailSalePrice: product.productTotalSalePrice
        }));

        const orderPayload = {
            userId: userId,
            orderTotalPrice: totalPrice,
            orderTotalPay: totalPay,
            orderDetailList: orderDetailList
        };

        const orderCompleteData = {
            userName,
            totalPrice,
            discount,
            totalPay
        };

        try {
            const response = await axios.post(`${orderApi}/payment`, orderPayload, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.data.code === 200) {
                alert("주문이 완료되었습니다!");
                console.log(response.data)
                navigate('../order/complete', { state: { orderData: response.data.data, orderCompleteData } });
            } else {
            }
        } catch (error) {
        }
    };

    return(
        <div className="payment-info">
            <div className="payment-info-title">
                <h2 className="payment-info-title-h2">
                    <ShoppingBag style={{marginRight:"6px"}}/>
                    <span>결제정보</span>
                </h2>
            </div>
            <div className="payment-info-des">
                <div className="payment-info-prices">
                    <dl className="payment-info-dl">
                        <dt className="payment-info-dt">주문금액</dt>
                        <dd className="payment-info-dd">{formatPrice(totalPrice)}원</dd>{/*원가 합산 받아오기*/}
                    </dl>
                    <dl className="payment-info-dl">
                        <dt className="payment-info-dt">할인금액</dt>
                        <dd className="payment-info-dd">-{formatPrice(discount)}원</dd>{/*할인금액 합산 받아오기*/}
                    </dl>
                    <dl className="payment-info-dl tot">
                        <dt className="payment-info-dt">총 결제금액</dt>
                        <dd className="payment-info-dd">{formatPrice(totalPay)}원</dd>{/*결제할 금액 합산 받아오기*/}
                    </dl>
                </div>
                <div className="payment-info-order">
                    <div>
                        <span>주문정보 및 서비스 이용약관에 동의합니다.</span>
                    </div>
                    <button onClick={handleOrderSubmit}>주문하기</button> {/*버튼 클릭시 주문요청 api*/}
                </div>
            </div>
        </div>
    );   
}
