import React from "react";
import "./ProductReview.css";
import eximg from './720X720.jpg'
import {useState} from "react";
import { PiStarFill, PiStarLight } from "react-icons/pi";
import { RiDeleteBinLine } from "react-icons/ri";


const ProductReview = () => {

    const [rating, setRating] = useState(5);
    const [rating2, setRating2] = useState(2);

    const [review, setReview] = useState(true);
    const [reviewed, setReviewed] = useState(false);

    const onClickReview = () => {
        setReview(true);
        setReviewed(false);
    }
    const onClickReviewed = () => {
        setReview(false);
        setReviewed(true);
    }
    
    return (
        <div className="productreview-div-global-wrapper"> {/* 전체 wrapper */}
            <div className="productreview-div-subheader-container">  {/* 회원기본정보 들어갈 자리 */}
                <h1>이 공간은 컴포넌트로 대체 될 공간입니다.</h1>
            </div>
            <div className="productreview-div-review-container"> {/* 상품리뷰 전체 wrapper */}
                <div className="productreview-div-sidebar"></div> {/* 사이드바 */}
                <div className="productreview-div-review-wrapper">
                    <div className="productreview-div-review-header"> {/* 상품리뷰 title */}
                        | 상품리뷰
                    </div>
                    <hr className="productreview-hr-line"/>  {/* 상품리뷰 title과 내용 구분선 */}
                    <div className="productreview-div-review-togglewrapper"> {/* 작성 가능한 리뷰, 작성한 리뷰 toggle 버튼 */}
                        <button className="productreview-btn-review-togglebtn" style={{color: review ? "#000" : "#A9AFB3"}} onClick={onClickReview}>작성 가능한 리뷰</button> {/* 작성가능한리뷰만 불러오기 */}
                        <div className="productreview-div-review-divide">|</div> 
                        <button className="productreview-btn-review-togglebtn" style={{color: reviewed ? "#000" : "#A9AFB3"}} onClick={onClickReviewed}>작성한 리뷰</button> {/* 작성한리뷰만 불러오기 */}
                    </div>
                    {
                        review ? (
                            <>
                                <div className="productreview-div-review-orderwrapper"> {/* 주문번호, 주문일자 wrapper */}
                                    <div className="productreview-div-review-ordertime"> {/* 주문일자 */}
                                        <p className="productreview-p-review-orderdate">2024.01.05</p> 
                                        <p className="productreview-p-review-ordertime">(20시 10분)</p>
                                    </div>
                                    <div className="productreview-div-review-ordernum"> {/* 주문번호 */}
                                        <p className="productreview-p-review-ordernum">주문번호</p>
                                        <p className="productreview-p-review-ordernum-num">20210105123456</p>
                                    </div>
                                </div>
                                <hr className="productreview-hr-line2"/> {/* 주문번호, 주문일자와 내용 구분선 */}
                                <div className="productreview-div-review-content-wrapper"> {/* 작성 가능한 리뷰 */}
                                    <div className="productreview-div-review-content-img"> {/* 상품이미지 wrapper*/}
                                        <img src={eximg} className='productreview-img-review-content-img' alt="상품이미지"/>
                                    </div>
                                    <div className="productreview-div-review-content-text-wrapper"> {/* 상품정보 wrapper */}
                                        <div className="productreview-div-review-content-text-contentwrapper"> {/* 브랜드 */}
                                            <div className="productreview-div-review-content-text-base">브랜드</div>
                                            <div className="productreview-div-review-content-text-name">JAJU</div>
                                        </div>
                                        <div className="productreview-div-review-content-text-contentwrapper"> {/* 상품명 */}
                                            <div className="productreview-div-review-content-text-base">상품명</div>
                                            <div className="productreview-div-review-content-text-name">쿠시노 코지 저상형 침대(패브릭,SS)</div>
                                        </div>
                                        <div className="productreview-div-review-content-text-contentwrapper"> {/* 옵션 */}
                                            <div className="productreview-div-review-content-text-base">옵션</div>
                                            <div className="productreview-div-review-content-text-name">GREY BEIGE L</div>
                                        </div>
                                        <div className="productreview-div-review-content-text-contentwrapper"> {/* 결제금액 */}
                                            <div className="productreview-div-review-content-text-base">결제금액</div>
                                            <div className="productreview-div-review-content-text-name">
                                                <p className="productreview-p-review-price">1,208,000</p>
                                                <p className="productreview-p-review-won">원</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="productreview-div-review-content-btn-wrapper"> {/* 작성하기 버튼 */}
                                        <button className="productreview-btn-review-content-btn">작성하기</button>
                                    </div>
                                </div>
                                <hr className="productreview-hr-line3"/> 
                                <div className="productreview-div-review-content-wrapper"> {/* 작성 가능한 리뷰 */}
                                    <div className="productreview-div-review-content-img"> {/* 상품이미지 wrapper*/}
                                        <img src={eximg} className='productreview-img-review-content-img' alt="상품이미지"/>
                                    </div>
                                    <div className="productreview-div-review-content-text-wrapper"> {/* 상품정보 wrapper */}
                                        <div className="productreview-div-review-content-text-contentwrapper"> {/* 브랜드 */}
                                            <div className="productreview-div-review-content-text-base">브랜드</div>
                                            <div className="productreview-div-review-content-text-name">JAJU</div>
                                        </div>
                                        <div className="productreview-div-review-content-text-contentwrapper"> {/* 상품명 */}
                                            <div className="productreview-div-review-content-text-base">상품명</div>
                                            <div className="productreview-div-review-content-text-name">쿠시노 코지 저상형 침대(패브릭,SS)</div>
                                        </div>
                                        <div className="productreview-div-review-content-text-contentwrapper"> {/* 옵션 */}
                                            <div className="productreview-div-review-content-text-base">옵션</div>
                                            <div className="productreview-div-review-content-text-name">GREY BEIGE L</div>
                                        </div>
                                        <div className="productreview-div-review-content-text-contentwrapper"> {/* 결제금액 */}
                                            <div className="productreview-div-review-content-text-base">결제금액</div>
                                            <div className="productreview-div-review-content-text-name">
                                                <p className="productreview-p-review-price">1,208,000</p>
                                                <p className="productreview-p-review-won">원</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="productreview-div-review-content-btn-wrapper"> {/* 작성하기 버튼 */}
                                        <button className="productreview-btn-review-content-btn">작성하기</button>
                                    </div>
                                </div>
                                <hr className="productreview-hr-line3"/>
                                
                                <div className="productreview-div-review-content-wrapper"> {/* 작성 가능한 리뷰 */}
                                    <div className="productreview-div-review-content-img"> 
                                        <img src={eximg} className='productreview-img-review-content-img' alt="상품이미지"/>
                                    </div>
                                    <div className="productreview-div-review-content-text-wrapper">
                                        <div className="productreview-div-review-content-text-contentwrapper">
                                            <div className="productreview-div-review-content-text-base">브랜드</div>
                                            <div className="productreview-div-review-content-text-name">JAJU</div>
                                        </div>
                                        <div className="productreview-div-review-content-text-contentwrapper">
                                            <div className="productreview-div-review-content-text-base">상품명</div>
                                            <div className="productreview-div-review-content-text-name">쿠시노 코지 저상형 침대(패브릭,SS)</div>
                                        </div>
                                        <div className="productreview-div-review-content-text-contentwrapper">
                                            <div className="productreview-div-review-content-text-base">옵션</div>
                                            <div className="productreview-div-review-content-text-name">GREY BEIGE L</div>
                                        </div>
                                        <div className="productreview-div-review-content-text-contentwrapper">
                                            <div className="productreview-div-review-content-text-base">결제금액</div>
                                            <div className="productreview-div-review-content-text-name">
                                                <p className="productreview-p-review-price">1,208,000</p>
                                                <p className="productreview-p-review-won">원</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="productreview-div-review-content-btn-wrapper">
                                        <button className="productreview-btn-review-content-btn">작성하기</button>
                                    </div>
                                </div>
                                <hr className="productreview-hr-line3"/>
                            </>
                            ) : 
                            (
                                <>
                                    <div className="productreview-div-review-orderwrapper"> {/* 주문번호, 주문일자 wrapper */}
                                        <div className="productreview-div-review-ordertime"> {/* 주문일자 */}
                                            <p className="productreview-p-review-orderdate">2024.02.11</p> 
                                            <p className="productreview-p-review-ordertime">(13시 30분)</p>
                                        </div>
                                        <div className="productreview-div-review-ordernum"> {/* 주문번호 */}
                                            <p className="productreview-p-review-ordernum">주문번호</p>
                                            <p className="productreview-p-review-ordernum-num">2024010456481523</p>
                                        </div>
                                    </div>
                                    <hr className="productreview-hr-line2"/> {/* 주문번호, 주문일자와 내용 구분선 */}
                                    <div className="productreview-div-reviewed-item-wrapper"> {/* 구매한 상품 */}
                                        <div className="productreview-div-review-content-img"> {/* 상품이미지 wrapper*/}
                                            <img src={eximg} className='productreview-img-review-content-img' alt="상품이미지"/>
                                        </div>
                                        <div className="productreview-div-review-content-text-wrapper"> {/* 상품정보 wrapper */}
                                            <div className="productreview-div-review-content-text-contentwrapper"> {/* 브랜드 */}
                                                <div className="productreview-div-review-content-text-base">브랜드</div>
                                                <div className="productreview-div-review-content-text-name">JAJU</div>
                                            </div>
                                            <div className="productreview-div-review-content-text-contentwrapper"> {/* 상품명 */}
                                                <div className="productreview-div-review-content-text-base">상품명</div>
                                                <div className="productreview-div-review-content-text-name">쿠시노 코지 저상형 침대(패브릭,SS)</div>
                                            </div>
                                            <div className="productreview-div-review-content-text-contentwrapper"> {/* 옵션 */}
                                                <div className="productreview-div-review-content-text-base">옵션</div>
                                                <div className="productreview-div-review-content-text-name">GREY BEIGE L</div>
                                            </div>
                                            <div className="productreview-div-review-content-text-contentwrapper"> {/* 결제금액 */}
                                                <div className="productreview-div-review-content-text-base">결제금액</div>
                                                <div className="productreview-div-review-content-text-name">
                                                    <p className="productreview-p-review-price">1,208,000</p>
                                                    <p className="productreview-p-review-won">원</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className="productreview-hr-line3"/> 
                                    <div className="productreview-div-review-content-wrapper"> {/* 작성한 리뷰 */}
                                        <div className="productreview-div-review-content-img">
                                            <img src={eximg} className='productreview-img-review-content-img' alt="상품이미지"/>
                                        </div>
                                        <div className="productreview-div-review-content-text2-wrapper">
                                            <div className="productreview-div-reveiw-star-wrapper">
                                                <div className="productreview-div-review-star"> {/* 별점 별 표시 */}
                                                    {[...Array(rating2)].map((a, i) => (
                                                        <PiStarFill className="productreview-PiStarLight-star-lg" key={i}/>
                                                    ))}
                                                    {[...Array(5 - rating2)].map((a, i) => (
                                                        <PiStarLight className="productreview-PiStarLight-star-lg" key={i}/>
                                                    ))}
                                                </div>
                                                <div>   {/* 별점 정수 표시 */}
                                                    <p className="productreview-p-review-star-num">{rating2}</p>
                                                </div>
                                            </div>
                                            <div className="productreview-div-review-created-review"> {/* 작성한 리뷰 내용 */}
                                                조금 크지만 그냥 입으려구요
                                            </div>
                                        </div>
                                        <div className="productreview-div-review-delete-wrapper"> {/* 리뷰 작성시간,삭제버튼 wrapper */}
                                            <div>
                                                <p className="productreview-p-review-postdate">2024-01-09</p> {/* 리뷰 작성시간 */}
                                            </div>
                                            <button className="productreview-btn-delete-icon"><RiDeleteBinLine /></button>     {/* 리뷰 삭제버튼 */}
                                        </div>
                                    </div>
                                    <hr className="productreview-hr-line3"/>   
                                    <div className="productreview-div-reviewed-item-wrapper"> {/* 구매한 상품 */}
                                        <div className="productreview-div-review-content-img"> {/* 상품이미지 wrapper*/}
                                            <img src={eximg} className='productreview-img-review-content-img' alt="상품이미지"/>
                                        </div>
                                        <div className="productreview-div-review-content-text-wrapper"> {/* 상품정보 wrapper */}
                                            <div className="productreview-div-review-content-text-contentwrapper"> {/* 브랜드 */}
                                                <div className="productreview-div-review-content-text-base">브랜드</div>
                                                <div className="productreview-div-review-content-text-name">JAJU</div>
                                            </div>
                                            <div className="productreview-div-review-content-text-contentwrapper"> {/* 상품명 */}
                                                <div className="productreview-div-review-content-text-base">상품명</div>
                                                <div className="productreview-div-review-content-text-name">쿠시노 코지 저상형 침대(패브릭,SS)</div>
                                            </div>
                                            <div className="productreview-div-review-content-text-contentwrapper"> {/* 옵션 */}
                                                <div className="productreview-div-review-content-text-base">옵션</div>
                                                <div className="productreview-div-review-content-text-name">GREY BEIGE L</div>
                                            </div>
                                            <div className="productreview-div-review-content-text-contentwrapper"> {/* 결제금액 */}
                                                <div className="productreview-div-review-content-text-base">결제금액</div>
                                                <div className="productreview-div-review-content-text-name">
                                                    <p className="productreview-p-review-price">1,208,000</p>
                                                    <p className="productreview-p-review-won">원</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className="productreview-hr-line3"/>
                                    <div className="productreview-div-review-content-wrapper"> {/* 작성한 리뷰 */}
                                        <div className="productreview-div-review-content-text2-wrapper"> {/* 작성한 리뷰 내용 wrapper */}
                                            <div className="productreview-div-reveiw-star-wrapper"> {/* 별점 wrapper */}
                                                <div className="productreview-div-review-star"> {/* 별점 별 표시 */}
                                                    {[...Array(rating)].map((a, i) => (
                                                        <PiStarFill className="productreview-PiStarLight-star-lg" key={i}/>
                                                    ))}
                                                    {[...Array(5 - rating)].map((a, i) => (
                                                        <PiStarLight className="productreview-PiStarLight-star-lg" key={i}/>
                                                    ))}
                                                </div>
                                                <div>   {/* 별점 정수 표시 */}
                                                    <p className="productreview-p-review-star-num">{rating}</p>
                                                </div>
                                            </div>
                                            <div className="productreview-div-review-created-review"> {/* 작성한 리뷰 내용 */}
                                                너무 좋아요 최고~!!
                                            </div>
                                        </div>
                                        <div className="productreview-div-review-delete-wrapper"> {/* 리뷰 작성시간,삭제버튼 wrapper */}
                                            <div>
                                                <p className="productreview-p-review-postdate">2024-01-09</p> {/* 리뷰 작성시간 */}
                                            </div>
                                            <button className="productreview-btn-delete-icon"><RiDeleteBinLine /></button>     {/* 리뷰 삭제버튼 */}
                                        </div>
                                    </div>
                                    <hr className="productreview-hr-line3"/>
                                </>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default ProductReview;