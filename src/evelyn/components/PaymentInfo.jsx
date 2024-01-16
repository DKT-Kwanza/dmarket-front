import React from "react";
import datas from "../assets/PaymentProductsData.json";
import {ReactComponent as ShoppingBag} from "../assets/icons/shopping-bag-03.svg";

export default function PaymentInfo(){
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
                        <dd className="payment-info-dd">{datas.totProdPrice}원</dd>{/*원가 합산 받아오기*/}
                    </dl>
                    <dl className="payment-info-dl">
                        <dt className="payment-info-dt">할인금액</dt>
                        <dd className="payment-info-dd">-{datas.totDiscPrice}원</dd>{/*할인금액 합산 받아오기*/}
                    </dl>
                    <dl className="payment-info-dl tot">
                        <dt className="payment-info-dt">총 결제금액</dt>
                        <dd className="payment-info-dd">{datas.totSales}원</dd>{/*결제할 금액 합산 받아오기*/}
                    </dl>
                </div>
                <div className="payment-info-order">
                    <div>
                        <span>주문정보 및 서비스 이용약관에 동의합니다.</span>
                    </div>
                    <button>주문하기</button> {/*버튼 클릭시 주문요청 api*/}
                </div>
            </div>
        </div>
    );   
}
