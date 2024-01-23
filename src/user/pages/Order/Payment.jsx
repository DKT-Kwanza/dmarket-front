import React, {useRef, useState, useEffect} from "react";
import axios from "axios";
import "./Payment.css";
import useDetectClose from "./UseDetectClose";
import { MsgDropDown } from "../../components/MsgDropDown";
import {ReactComponent as DropDownImg} from "../../../assets/icons/dropdown.svg";
import PaymentList from "../../components/Payment/PaymentList";
import PaymentInfo from "../../components/Payment/PaymentInfo";

function Payment(){
    const dropDownRef = useRef();
    const [msgIdentify, setMsgIdentify] = useState('배송기사에게 전달되는 메시지 입니다. 선택해 주세요.');
    const delReqList = ['배송기사에게 전달되는 메시지 입니다. 선택해 주세요.',
                        '부재 시 경비실에 맡겨주세요',
                        '부재 시 문앞에 놓아주세요',
                        '배송전에 연락주세요', '문 앞에 두고 가주세요'];  

    const [isOpen, setIsOpen] = useDetectClose(dropDownRef, false);
    const [paymentProducts, setPaymentProducts] = useState([]);
    const productListCnt = paymentProducts.productList ? paymentProducts.productList.length : 0;
    const discount = paymentProducts.totalPrice - paymentProducts.totalPay;
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/PaymentProductsData.json");
                setPaymentProducts(response.data);
            } catch (e) {
                console.error("Error fetching data: ", e);
            }
        };
        fetchData();
    }, []);

    return(
        <div>
        <div className="payment-background">
            <div className="payment-wrap">
                <div className="payment-title-div">
                    <span className="payment-title-span">결제하기</span>
                </div>    
                <div className="payment-delivery">
                    <div className="payment-delivery-title">
                        <span className="payment-delivery-title-span1">받는 분 정보</span>
                        <span className="payment-delivery-title-span2">
                            기본 배송지 변경은 마이페이지 &gt; 회원정보변경 에서 가능합니다.
                        </span>
                    </div>
                    <div className="payment-deliveryAddr-form">
                        <span className="payment-deliveryAddr-span">
                            배송지 정보
                        </span>
                        <div className="payment-deliveryAddr-input">
                            <div className="payment-deliverAddr-input-add1">
                                <div>{paymentProducts.userName}</div>
                                <div>{paymentProducts.userPhoneNum}</div>
                            </div>
                            <div className="payment-deliverAddr-input-add2">
                                <div>{paymentProducts.userPostalCode}</div>
                                <div>{paymentProducts.userAddress} {paymentProducts.userDetailAddress}</div>
                            </div>
                        </div>
                    </div>

                    <div className="payment-deliveryReq-form">
                        <span className="payment-deliveryReq-span">택배 배송 요청사항</span> 
                        
                        <div className="payment-deliveryReq-div" style={{marginTop:"15px",
                            border: !isOpen ? '1.3px solid #cccccc' :"1.2px solid #565656"}} ref={dropDownRef}>
                            <div>
                                    <label className="payment-deliveryReq-drop">
                                    <input onClick={() => setIsOpen(!isOpen)} type='button' 
                                    value={msgIdentify}></input><DropDownImg/></label>
                                        <div className="payment-dropdown" style={{display: !isOpen ? 'none' : 'block'}}>
                                            <div className="payment-dropdown-scroll"> {/*사용자의 배송 요청사항 입력받기*/}
                                                {isOpen && 
                                                <ul>
                                                {delReqList.map((value, index) => (
                                                    <MsgDropDown key={index} value={value} setIsOpen={setIsOpen} 
                                                    setMsgIdentify={setMsgIdentify} isOpen={isOpen} />))}
                                                </ul>
                                                }
                                            </div>
                                        </div>
                            </div>
                        </div>                  
                    </div>

                    {/* <div className="payment-deliveryInfo">
                        <div className="payment-deliveryInfo-num">
                            <span className="payment-deliveryInfo-num-span">휴대폰</span>
                            <span>010-1234-1234</span>
                        </div>
                        <div className="payment-deliveryInfo-name">
                            <span className="payment-deliveryInfo-name-span">주문자명 / 이메일</span>
                            <span>홍길동 / gildong@dktechin.com</span>
                        </div>  
                    </div> */}
                </div>
                <div className="payment-products">
                    <span className="payment-products-title">주문상품: {productListCnt}개</span> {/*주문 상품 개수 불러오기*/}
                    <div>
                        <PaymentList items={paymentProducts.productList || []} />
                    </div>
                </div>
                <PaymentInfo
                    userName={paymentProducts.userName}
                    totalPrice={paymentProducts.totalPrice}
                    discount={discount}
                    totalPay={paymentProducts.totalPay}
                />
            </div>
        </div>
    </div>
    );
}

export default Payment;