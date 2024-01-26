import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import './DetailPage.css';
import DetailQnaList from "../../../components/user/List/DetailQnaList";
import DetailReviewsList from "../../../components/user/List/DetailReviewsList";
import ProductOptionTab from "../../../components/user/Common/Select/ProductOptionTab";
import StarRating from "../../../components/user/Common/Rating/StarRating";
import RecommendProductList from "../../../components/user/List/RecommendProductList";
import DetailWriteQna from "../../../components/user/Common/Input/DetailWriteQna";
import heart from '../../../assets/icons/heart.svg';
import productDetail from '../../../assets/images/productDetail.png';
import arrowRight from '../../../assets/icons/chevron-right.svg';
import parcelIcon from '../../../assets/icons/truck-02.png';

function Detail() {

    const navigate = useNavigate();
    const [reviews, setReviews] = useState([]);
    const [qnas, setQnas] = useState([]);
    const [recommendProducts, setRecommendProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/ReviewData.json");
                setReviews(response.data);
            } catch (e) {
                console.error("Error fetching data: ", e);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/ProductQnaData.json");
                setQnas(response.data);
            } catch (e) {
                console.error("Error fetching data: ", e);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/RecommendProductData.json");
                setRecommendProducts(response.data);
            } catch (e) {
                console.error("Error fetching data: ", e);
            }
        };
        fetchData();
    }, []);

    console.log(recommendProducts); // 확인용 로그

    const navigateToMypage = (menu) => {
        navigate(`../../mydkt/activityMng/${menu}`); // 각각의 메뉴 탭으로 바로 이동
    };

    const navigateToOrder = () => {
        navigate("../../order/orderPage");
    }

    const [selected, setSelected] = useState([]);

    const handleSelect = (e) => {
        setSelected([...selected, e.target.value]);
    };

    const [isExpanded, setIsExpanded] = useState(false);
    // const [checkboxState, setCheckboxState] = useState('none');

    const handleToggle = () => { // qna 작성창 열기
        setIsExpanded(!isExpanded);
    };

    // "답변 완료"인 객체의 개수를 세기
    const qnaCompletedAnswersCount = qnas.qnaList ? qnas.qnaList.filter(item => item.qnaStatus === "답변 완료").length : 0;
    // "답변 대기"인 객체의 개수
    const qnaPendingAnswersCount = qnas.qnaCount-qnaCompletedAnswersCount;

    // const handleCheckboxChange = (newState) => { // qna 작성 공개 여부 체크박스
    //     console.log(newState);
    //     if (checkboxState === newState) {
    //         setCheckboxState('none');
    //     } else {
    //         setCheckboxState(newState);
    //         console.log(newState);
    //     }
    // };

    return (
        <>
            <div id="container1">
                <div className='category'>
                    <text>카테고리/카테고리/카테고리</text>
                </div>
                <div className='productArea'>
                    <div className='repImg'/>
                    <div className='subImgArea'>
                        <div className='subImg'/>
                        <div className='subImg'/>
                        <div className='subImg'/>
                        <div className='subImg'/>
                        <div className='subImg'/>
                    </div>
                    <div className='detailArea'>
                        <div className='title'>
                            <text>JAJU &gt;</text>
                        </div>
                        <div className='subTitle'>
                            <text>여 다운필 루즈핏 퀼팅 점퍼 J103401008099</text>
                        </div>
                        <div className="rating">
                            <StarRating rating={reviews.productRating}/>
                            <text style={{marginLeft: '10px'}}>({reviews.reviewCnt}건)</text>
                        </div>
                        <div className='price'>
                            <text>59,900원</text>
                        </div>
                        <div className='releasePrice'>
                            <text>최초출시가 89,900원</text>
                        </div>
                        <hr style={{marginTop: '13px'}}/>
                        <div className='deliveryInfo'>
                            <text>배송정보</text>
                            <div className='transportation'>
                                <text>택배배송</text>
                            </div>
                        </div>
                        <div className='deliveryFee'>
                            <text>배송비</text>
                            <text style={{marginLeft: '77px'}}>무료</text>
                        </div>
                        <div className='colorSelect'>
                            <text style={{marginTop: '2px'}}>색상</text>
                            <select id="colors" name="colors" onChange={handleSelect}>
                                <option value="" disabled selected hidden>선택하세요.</option>
                                <option value="red">Red</option>
                                <option value="blue">Blue</option>
                                <option value="green">Green</option>
                            </select>
                        </div>
                        {
                            selected.map((value, index) => (
                                <div key={index}>
                                    <ProductOptionTab option={value} name={"여 다운필 루즈핏 퀼팅 점퍼 J103401008099"}/>
                                </div>
                            ))
                        }
                        <div className='totalCost'>
                            <div className='total'>
                                <text>합계</text>
                            </div>
                            <div className='cost'>
                                <text>59,900원</text>
                            </div>
                        </div>
                        <hr style={{marginTop: '19px'}}/>
                    </div>
                </div>
                <div className='purchaseArea'>
                    <button onClick={() => navigateToMypage('mywish')} className='wishlistButton'><img src={heart}/>
                    </button>
                    <button onClick={() => navigateToMypage('mycart')} className='cartButton'>장바구니</button>
                    <button onClick={navigateToOrder} className='purchaseButton'>바로구매</button>
                </div>
            </div>

            <div id='container2'>
                <ul className='buttonArea'>
                    <li className='productDetailButton'><a href="#productDetailButtonScroll">상품상세정보</a></li>
                    <li className='reviewButton'><a href="#reviewButtonScroll">고객리뷰({reviews.reviewCnt})</a></li>
                    <li className='qnaButton'><a href="#qnaButtonScroll">상품 Q&A({qnas.qnaCount})</a></li>
                    <li className='recommandButton'><a href="#recommandButtonScroll">추천 상품</a></li>
                    <li className='returnInfoButton'><a href="#scroll5">배송/반품/교환 안내</a></li>
                </ul>
                <hr style={{marginTop: '5px', borderWidth: '2px'}}/>
                <div className='productNum'>
                    <text>상품번호 : 1000563057860<br/>모델번호 : J103401008</text>
                </div>
                <div className='productDetail'>
                    <div className="productDetailButtonScroll" id="productDetailButtonScroll">상품상세정보</div>
                </div>
                <div className='productDetailImg'>
                    <img src={productDetail}/>
                </div>
                <div className='productDetailBox'></div>


                <div className='reviewTitle'>
                    <div className="reviewButtonScroll" id="reviewButtonScroll">고객리뷰({reviews.reviewCnt})</div>
                </div>
                <div className='ratingBox'>
                    <div className='ratingNum'>
                        <text>{reviews.productRating}</text>
                    </div>
                    <div className='ratingStar'>
                        <StarRating rating={reviews.productRating} style={"none"}/>
                        <text style={{fontSize: '16px'}}>총 {reviews.reviewCnt}건 리뷰</text>
                    </div>
                </div>
                <div className='reviewAnnounce'>
                    <text>※ 리뷰 등록, 수정, 삭제 및 상세 내용은 [마이페이지 &gt; 나의 활동관리 &gt; 상품 리뷰]에서 확인하실 수 있습니다.</text>
                </div>
                <div className='reviewCategory'>
                    <text>전체({reviews.reviewCnt})</text>
                </div>
                <hr style={{marginTop: '8px', borderWidth: '2px'}}/>
                <div className='reviewList'>
                    {
                        <DetailReviewsList reviews={reviews.reviewList || []}/>
                    }
                </div>
                <div className='qnaTitle'>
                    <div className="qnaButtonScroll" id="qnaButtonScroll">Q&A({qnas.qnaCount})</div>
                </div>
                <div className='qnaAnnounce'>
                    <text>상품 외 배송, 교환/반품 등에 관한 문의사항은 고객센터에서 확인하실 수 있습니다.</text>
                </div>
                <div className='qnaCategory'>
                    <div className='qna-category-btn-area'>
                        <button className='qnaAll'>전체 ({qnas.qnaCount})</button>
                        <div className='qna-category-line'/>
                        <button className='qnaReplyDone'>답변완료 ({qnaCompletedAnswersCount})</button>
                        <div className='qna-category-line'/>
                        <button className='qnaReplyWaiting'>답변대기 ({qnaPendingAnswersCount})</button>
                    </div>
                    <button onClick={handleToggle} className='qnaEnroll'>Q&A 작성하기 <img src={arrowRight}/></button>
                </div>
                <DetailQnaList qnas={qnas.qnaList || []}/>
                {
                    isExpanded && <DetailWriteQna onClick={handleToggle}/>
                }

                <div className='recommandTitle'>
                    <div className="recommandButtonScroll" id="recommandButtonScroll">함께 보면 좋은 상품</div>
                </div>
                <RecommendProductList recommendProducts={recommendProducts}/>

                <div className='deliveryTitle'>
                    <div className="deliveryTitleScroll" id="deliveryTitleScroll">배송 안내</div>
                </div>
                <hr style={{marginTop: '16px', borderWidth: '2px', marginBottom: '0px'}}/>
                <div className='deliveryContents'>
                    <div className='deliveryIcon'><img className='deliveryIconImg' src={parcelIcon}/></div>
                    <div className='deliveryExplain'>
                        <text style={{color: '#000000', fontWeight: '700'}}>택배배송</text>
                        <text><br/>주문 후 평균 2~3일 이내 택배 배송됩니다.</text>
                    </div>
                    <div className='deliveryCost'>
                        <text>무료배송</text>
                    </div>
                </div>
                <div className='returnTitle'>
                    <text>교환 및 반품 안내</text>
                </div>
                <hr style={{marginTop: '16px', borderWidth: '2px', marginBottom: '0px'}}/>
                <div className='returnApplyPeriod'>
                    <div className='returnApplyPeriodTitle'>
                        <text>교환/반품 신청기간</text>
                    </div>
                    <div className='returnApplyPeriodContents'>
                        <text>단순변심 및 사이즈/색상 불만에 관련된 교환/반품 신청은 배송완료 후 7일 이내에 가능합니다.</text>
                    </div>
                </div>
                <div className='returnApplyCost'>
                    <div className='returnApplyCostTitle'>
                        <text>교환/반품 비용</text>
                    </div>
                    <div className='returnApplyCostContents'>
                        <text>상품의 회수(배송)비용은 무료입니다.</text>
                        <text><br/>※ 상품의 불량/하자일 경우에는</text>
                        <text style={{fontWeight: '700'}}>100% 환불</text>
                        <text>이지만, 고객님의 단순변심 및 사이즈/색상 불만일 경우에는</text>
                        <text style={{fontWeight: '700'}}>90% 환불</text>
                        <text>입니다.</text>
                    </div>
                </div>
                <div className='returnInfo'>
                    <text>※ 자세한 내용은</text>
                    <button className='inquiryButton'>고객센터</button>
                    <text>로 문의 부탁드립니다. (A/S 문의는 제조사로 먼저 문의 시 빠르게 처리 가능합니다.)</text>
                    <text><br/>※ 전자상거래 등에서의 소비자 보호에 관한 법률에 의한 반품규정이 판매자가 상품상세 페이지 등에서 개별적으로 고지 또는 지정한 반품조건보다 우선합니다.
                    </text>
                </div>
            </div>
            <div style={{marginBottom: '200px'}}/>
        </>
    );
}


export default Detail;