import React, {useState, useEffect} from "react";
import axios from "axios";
import "./OrderComplete.css";


function OrderComplete(){
    const [paymentProducts, setPaymentProducts] = useState([])
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/OrderCompleteData.json");
                setPaymentProducts(response.data);
                console.log(paymentProducts)
            } catch (e) {
                console.error("Error fetching data: ", e);
            }
        };
        fetchData();
    }, []);

    const formatDate = (datetime) => { // 날짜만 남기기
        const date = new Date(datetime);
        return date.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' });
    };
    
      const formatTime = (datetime) => { // 시간만 남기기
        const date = new Date(datetime);
        let hours = date.getHours();
        const minutes = date.getMinutes();
    
        // 시간을 2자리 형식으로 포매팅
        hours = hours.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
    
        return `${hours}:${formattedMinutes}`;
      };

    return(
        <div>
            <div className="orderComplete-background">
                <div className="orderComplete-wrap">    
                    <div className="orderComplete-title-div">
                        <span className="orderComplete-title-span">주문완료</span>
                    </div>   
                    <div className="orderComplete-div">
                        <div className="orderComplete-info">
                            <p>{paymentProducts.userName} 고객님, 주문이 완료되었습니다.</p>
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
                                    <strong>{paymentProducts.totalPrice}</strong><span>원</span>
                                </span> {/*해당 주문의 금액들 받아오기*/}
                            </div>
                            <div>
                                <span className="orderComplete-price-symbol">-</span>
                                <span className="orderComplete-price-des">자사몰 할인&nbsp;</span>
                                <span className="orderComplete-price-des">
                                    <strong>{paymentProducts.discount}</strong><span>원</span>
                                </span>
                            </div>
                            <div>
                                <span className="orderComplete-price-symbol">=</span>
                                <strong className="orderComplete-price-sales">최종결제금액&nbsp;</strong>
                                <strong className="orderComplete-price-sales">
                                    <strong style={{fontSize:"30px"}}>{paymentProducts.totalPay}</strong><span>원</span>
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