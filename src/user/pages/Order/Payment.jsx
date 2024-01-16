import React, {useRef, useState} from "react";
import "./Payment.css";
import useDetectClose from "./UseDetectClose";
import { MsgDropDown } from "../../components/MsgDropDown";
import {ReactComponent as DropDownImg} from "../../../assets/icons/dropdown.svg";
import OrderList from "../../components/Payment/PaymentList";
import PaymentInfo from "../../components/Payment/PaymentInfo";
import datas from "../../../assets/PaymentProductsData.json";

function Payment(){

    const dropDownRef = useRef();
    const [msgIdentify, setMsgIdentify] = useState('배송기사에게 전달되는 메시지 입니다. 선택해 주세요.');
    const delReqList = ['배송기사에게 전달되는 메시지 입니다. 선택해 주세요.',
                        '부재 시 경비실에 맡겨주세요',
                        '부재 시 문앞에 놓아주세요',
                        '배송전에 연락주세요', '문 앞에 두고 가주세요'];  

    const [isOpen, setIsOpen] = useDetectClose(dropDownRef, false);
    
    return(
        <div>
        <div className="payment-navbar">navbar</div>
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
                                <input id="name" type="text" name="name" placeholder="성함" style={{width:"100px"}}/> {/*사용자의 이름 받아오거나 입력받기*/}
                                <input id="tel" type="tel" name="tel" placeholder="전화번호" style={{width:"132px"}}/> {/*사용자의 전화번호 받아오거나 입력받기*/}
                            </div>
                            <div className="payment-deliverAddr-input-add2">
                                <input id="postalCode" type="text" name="postalCode" placeholder="우편번호" style={{width:"70px"}}/> {/*사용자의 우편번호 받아오거나 입력받기*/}
                                <input id="address" type="text" name="address" placeholder="주소를 입력하세요" style={{width:"340px"}}/> {/*사용자의 주소 받아오거나 입력받기*/}
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

                    <div className="payment-deliveryInfo">
                        <div className="payment-deliveryInfo-num">
                            <span className="payment-deliveryInfo-num-span">휴대폰</span>
                            <span>010-1234-1234</span> {/*사용자의 번호 받아오기*/}
                        </div>
                        <div className="payment-deliveryInfo-name">
                            <span className="payment-deliveryInfo-name-span">주문자명 / 이메일</span>
                            <span>홍길동 / gildong@dktechin.com</span> {/*사용자의 이름,이메일 받아오기*/}
                        </div>  
                    </div>
                </div>
                <div className="payment-products">
                    <span className="payment-products-title">주문상품: {datas.totCnt}개</span> {/*주문 상품 개수 불러오기*/}
                    <div>
                        <OrderList/> {/*상품 목록*/}
                    </div>
                </div>
                
                <div>
                    <PaymentInfo/> {/*결제 정보 컴포넌트*/}
                </div>
            </div>
        </div>
    </div>
    );
}

export default Payment;