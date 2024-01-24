import React, {useState, useEffect} from "react";
import { useLocation } from 'react-router-dom';
import axios from "axios";
import { formatDate, formatTime, formatPrice } from '../../../utils/Format';
import "./OrderComplete.css";


function OrderComplete() {

    const location = useLocation();
    const { userName, totalPrice, discount, totalPay } = location.state || {};

    const [paymentProducts, setPaymentProducts] = useState([])
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/OrderCompleteData.json");
                setPaymentProducts(response.data);
            } catch (e) {
                console.error("Error fetching data: ", e);
            }
        };
        fetchData();
    }, []);

    return(
        <div>
            <div className="orderComplete-background">
                <div className="orderComplete-wrap">    
                    <div className="orderComplete-title-div">
                        <span className="orderComplete-title-span">주문완료</span>
                    </div>   
                    <div className="orderComplete-div">
                        <div className="orderComplete-info">
                            <p>{userName} 고객님, 주문이 완료되었습니다.</p>
                        </div> {/*사용자의 이름 받아오기*/}
                        <div className="orderComplete-ordernum">
                            <span>{formatDate(paymentProducts.orderDate)} {formatTime(paymentProducts.orderDate)}에 주문하신 주문의  
                                <strong style={{color:"#F00"}}> 주문번호는 {paymentProducts.orderId}번</strong> 입니다. 
                            </span> {/*사용자의 주문일자, 주문번호 받아오기*/}
                        </div>
                        <div className="orderComplete-price">
                            <div>
                                <span className="orderComplete-price-des">주문금액&nbsp;</span>
                                <span className="orderComplete-price-des">
                                    <strong>{formatPrice(totalPrice)}</strong><span>원</span>
                                </span> {/*해당 주문의 금액들 받아오기*/}
                            </div>
                            <div>
                                <span className="orderComplete-price-symbol">-</span>
                                <span className="orderComplete-price-des">자사몰 할인&nbsp;</span>
                                <span className="orderComplete-price-des">
                                    <strong>{formatPrice(discount)}</strong><span>원</span>
                                </span>
                            </div>
                            <div>
                                <span className="orderComplete-price-symbol">=</span>
                                <strong className="orderComplete-price-sales">최종결제금액&nbsp;</strong>
                                <strong className="orderComplete-price-sales">
                                    <strong style={{fontSize:"30px"}}>{formatPrice(totalPay)}</strong><span>원</span>
                                </strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderComplete;