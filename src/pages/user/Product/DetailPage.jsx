import React, {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import './DetailPage.css';
import DetailQnaList from "../../../components/user/List/DetailQnaList";
import DetailReviewsList from "../../../components/user/List/DetailReviewsList";
import ProductOptionTab from "../../../components/user/Common/Select/ProductOptionTab";
import StarRating from "../../../components/user/Common/Rating/StarRating";
import RecommendProductList from "../../../components/user/List/RecommendProductList";
import DetailWriteQna from "../../../components/user/Common/Input/DetailWriteQna";
import ScrollToTopBtn from '../../../components/user/Common/Button/ScrollToTopBtn';
import AddToCartModal from "../../../components/user/Common/Modal/AddToCartModal";
import {formatPrice} from "../../../utils/Format";
import {productsApi, userApi} from "../../../Api";
import {Pagination} from "@mui/material";
import {FaHeart} from "react-icons/fa";
import heart from '../../../assets/icons/heart.svg';
import productDetail from '../../../assets/images/productDetail.png';
import arrowRight from '../../../assets/icons/chevron-right.svg';
import parcelIcon from '../../../assets/icons/truck-02.png';

function Detail() {
    const navigate = useNavigate();
    const {productId} = useParams();

    const [product, setProduct] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [qnas, setQnas] = useState([]);
    const [recommendProducts, setRecommendProducts] = useState([]);
    const [productIsWish, setProductIsWish] = useState();

    /* 세션 스토리지에서 토큰 가져오기 */
    const token = sessionStorage.getItem('token');
    const userId = sessionStorage.getItem('userId');

    /* 상품 상세 정보 조회 */
    useEffect(() => {
        const fetchData = async () => {
            const url = `${productsApi}/${productId}`;
            try {
                const response = await axios.get(url, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json; charset=UTF-8',
                    }
                });
                setProduct(response.data.data);
                setProductIsWish(response.data.data.productIsWish);
            } catch (e) {
                console.error("Error fetching Inquiry data: ", e);
            }
        };
        fetchData();
    }, [productId]);

    /* 리뷰 페이지네이션 */
    const [reviewCurrentPage, setReviewCurrentPage] = useState(1);
    const [reviewTotalPages, setReviewTotalPages] = useState(0);
    const handleReviewPageChange = (event, value) => {
        setReviewCurrentPage(value);
        navigate(`?page=${value}`);
    };

    /* 상품 리뷰 조회 */
    useEffect(() => {
        const fetchData = async () => {
            const url = `${productsApi}/${productId}/reviews?page=${reviewCurrentPage}`;
            try {
                const response = await axios.get(url, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json; charset=UTF-8',
                    }
                });
                console.log("상품 리뷰 조회: ",response.data);
                setReviews(response.data.data);
                setReviewTotalPages(response.data.data.totalPage);
            } catch (e) {
                console.error("Error fetching Inquiry data: ", e);
            }
        };
        fetchData();
    }, [productId, reviewCurrentPage]);

    /* Qna 데이터 목록 조회 */
    useEffect(() => {
        console.log(productId);
        const fetchData = async () => {
            const url = `${productsApi}/${productId}/qnaList`;
            try {
                const response = await axios.get(url, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json; charset=UTF-8',
                    }
                });
                setQnas(response.data);
                console.log("qna: ", qnas);
            } catch (e) {
                console.error("Error fetching data: ", e);
            }
        };
        fetchData();
    }, [productId]);

    /* 같은 카테고리의 최신 상품 4개 조회 (추천 상품 조회) */
    useEffect(() => {
        const fetchData = async () => {
            const url = `${productsApi}/${productId}/recommend`;
            try {
                const response = await axios.get(url, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json; charset=UTF-8',
                    }
                });
                setRecommendProducts(response.data.data);
                console.log("추천: ", response.data);
            } catch (e) {
                console.error("Error fetching data: ", e);
            }
        };
        fetchData();
    }, [productId]);

    const navigateToOrder = () => {
        navigate("../../order");
    }

    /* 위시 리스트 추가 */
    const handleWishClick = async () => {
        console.log("productIsWish: ", productIsWish);
        const url = `${userApi}/${userId}/wish`;
        const requestData = {
            productId: productId
        };
        try {
            const response = await axios.post(url, requestData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json; charset=UTF-8',
                }
            });
            console.log("wishClick", response.data.data);

            /* productIsWish 값을 true 로 변경 */
            setProductIsWish(true);
        } catch (e) {
            console.error("Error fetching Inquiry data: ", e);
        }
    };

    /* 선택한 옵션을 탭에 전달하기 위한 변수(optionId, optionQuantity) */
    const [selected, setSelected] = useState([]);
    const handleSelect = (e) => {
        const selectedOption = {
            "optionValue": e.target.value,
            "optionId": e.target.options[e.target.selectedIndex].getAttribute("optionId"),
            "optionQuantity": e.target.options[e.target.selectedIndex].getAttribute("optionQuantity")
        };
        setSelected([...selected, selectedOption]);
    };

    /* 탭에서 전달 받은 옵션, 옵션 수량, 전체 옵션 수량에 관한 코드 */
    const [totalCount, setTotalCount] = useState(0);
    const [order, setOrder] = useState([]);
    const handleCountChange = ({count, optionId}) => {
        /* setOrder 함수를 콜백 형태로 사용하여 주문 상태를 업데이트 */
        setOrder(prevOrder => {
            const existingItem = prevOrder.find(item => item.selectedOption.optionId === optionId);

            if (existingItem) {
                /* 이미 존재하는 아이템인 경우 count만 업데이트 */
                return prevOrder.map(item =>
                    item.selectedOption.optionId === optionId
                        ? {selectedOption: {...item.selectedOption, productCount: count}}
                        : item
                );
            } else {
                /* 존재하지 않는 아이템인 경우 새로운 아이템 추가 */
                return [...prevOrder, {selectedOption: {productId, optionId, productCount: count}}];
            }
        });
    };
    /* 주문 목록이 변경될 때마다 총 수량 업데이트 */
    useEffect(() => {
        console.log("주문 목록: ", order);
        const newTotalCount = order.reduce((total, item) => total + item.selectedOption.productCount, 0);
        setTotalCount(newTotalCount);
    }, [order]);

    /* 장바구니 클릭 시 모달 */
    const [isOpen, setIsOpen] = useState(false);
    const modalHandler = () => {
        setIsOpen(!isOpen);
    };

    /* 장바구니에 추가 */
    const handleCartClick = async () => {
        /* order 리스트에서 productCount가 0인 값을 필터링하여 새로운 리스트 생성 */
        const filteredOrder = order.filter(item => item.selectedOption.productCount !== 0);

        if (filteredOrder.length > 0) {
            try {
                /* 각 아이템에 대해 try-catch 블록 실행 */
                await Promise.all(filteredOrder.map(async (item) => {
                    const requestData = {
                        productId: item.selectedOption.productId,
                        optionId: item.selectedOption.optionId,
                        productCount: item.selectedOption.productCount,
                    };
                    const url = `${userApi}/${userId}/cart`;
                    const response = await axios.post(url, requestData, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json; charset=UTF-8',
                        }
                    });
                    console.log(response.data);
                }));
                modalHandler();
            } catch (e) {
                console.error("Error fetching Inquiry data: ", e);
            }
        } else {
            alert("장바구니에 추가할 상품이 없습니다.");
        }
    };

    /* qna 작성창 열기 */
    const [isExpanded, setIsExpanded] = useState(false);
    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };

    /* qna 작성 */
    const handleWriteQna = async (title, contents, qnaIsSecret) => {
        console.log('Received data:', { title, contents, qnaIsSecret });
        console.log(userId);
        const url = `http://172.16.210.136:8080/api/products/${productId}/qna`
        const requestData = {
            userId: userId,
            qnaTitle: title,
            qnaContents: contents,
            qnaIsSecret: qnaIsSecret
        }
        try {
            const response = await axios.post(url, requestData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            console.log(response.data)
            handleToggle();
        } catch (e) {
            console.error(e);
        }
    }

    // "답변 완료"인 객체의 개수를 세기
    const qnaCompletedAnswersCount = qnas.qnaList ? qnas.qnaList.filter(item => item.qnaStatus === "답변 완료").length : 0;
    // "답변 대기"인 객체의 개수
    const qnaPendingAnswersCount = qnas.qnaCount - qnaCompletedAnswersCount;

    // const [checkboxState, setCheckboxState] = useState('none');
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
                    <text>{product.productCategory}</text>
                </div>
                <div className='productArea'>
                    <div className='repImg'>
                        {
                            product.imgList && <img alt={product.productName}
                                                    src={product.imgList[0]}/>
                        }
                    </div>

                    <div className='subImgArea'>
                        {product.imgList && product.imgList.length > 1 && (
                            product.imgList.slice(1).map((imgSrc, index) => (
                                <div key={index} className='subImg'>
                                    <img alt={`SubImage ${index + 1}`} src={imgSrc}/>
                                </div>
                            ))
                        )}
                    </div>

                    <div className='detailArea'>
                        <div className='title'>
                            <text>{product.productBrand} &gt;</text>
                        </div>
                        <div className='subTitle'>
                            <text>{product.productName}</text>
                        </div>
                        <div className="rating">
                            <StarRating rating={product.productRating}/>
                            <text style={{marginLeft: '10px'}}>({product.productReviewCount}건)</text>
                        </div>
                        <div className='price'>
                            <text>{formatPrice(product.productSalePrice)} 원</text>
                        </div>
                        <div className='releasePrice'>
                            <text>최초출시가 {formatPrice(product.productPrice)} 원</text>
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
                        <div className='detail-option-select'>
                            {
                                product.optionList &&
                                <text style={{marginTop: '2px'}}>{product.optionList[0].optionName}</text>
                            }
                            <select className='detail-options' name="options" onChange={handleSelect}>
                                <option value="" disabled selected hidden>옵션을 선택하세요.</option>
                                {
                                    product.optionList && product.optionList.map((option, index) => (
                                        <option key={index} value={option.optionValue}
                                                optionId={option.optionId}
                                                optionQuantity={option.optionQuantity}>{option.optionValue}</option>
                                    ))
                                }
                            </select>
                        </div>
                        {
                            selected.map((value, index) => (
                                <div key={index}>
                                    <ProductOptionTab option={value} name={product.productName}
                                                      onCountChange={handleCountChange}/>
                                </div>
                            ))
                        }
                        <div className='totalCost'>
                            <div className='total'>
                                <text>합계</text>
                            </div>
                            <div className='cost'>
                                <text>{formatPrice(totalCount * product.productSalePrice)} 원</text>
                            </div>
                        </div>
                        <hr style={{marginTop: '19px'}}/>
                    </div>
                </div>
                <div className='purchaseArea'>
                    <button onClick={() => !productIsWish && handleWishClick()} className='wishlistButton'>
                        {productIsWish ? <FaHeart color='red'/> : <img src={heart} alt="heart"/>}
                    </button>
                    <button onClick={handleCartClick} className='cartButton'>장바구니</button>
                    <button onClick={navigateToOrder} className='purchaseButton'>바로구매</button>
                </div>
            </div>

            <div id='container2'>
                <ul className='buttonArea'>
                    <li className='productDetailButton'><a href="#productDetailButtonScroll">상품상세정보</a></li>
                    <li className='reviewButton'><a href="#reviewButtonScroll">고객리뷰({reviews.productReviewCount})</a>
                    </li>
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
                    <div className="reviewButtonScroll" id="reviewButtonScroll">고객리뷰({reviews.productReviewCount})</div>
                </div>
                <div className='ratingBox'>
                    <div className='ratingNum'>
                        <text>{reviews.productRating}</text>
                    </div>
                    <div className='ratingStar'>
                        <StarRating rating={reviews.productRating} style={"none"}/>
                        <text style={{fontSize: '16px'}}>총 {reviews.productReviewCount}건 리뷰</text>
                    </div>
                </div>
                <div className='reviewAnnounce'>
                    <text>※ 리뷰 등록, 수정, 삭제 및 상세 내용은 [마이페이지 &gt; 나의 활동관리 &gt; 상품 리뷰]에서 확인하실 수 있습니다.</text>
                </div>
                <div className='reviewCategory'>
                    <text>전체({reviews.productReviewCount})</text>
                </div>
                <hr style={{marginTop: '8px', borderWidth: '2px'}}/>
                <div className='reviewList'>
                    {
                        <DetailReviewsList reviews={reviews.reviewList || []}/>
                    }
                </div>
                <Pagination count={reviewTotalPages} page={reviewCurrentPage} onChange={handleReviewPageChange} />

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
                    isExpanded && <DetailWriteQna onClick={handleWriteQna}/>
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
            <ScrollToTopBtn/>
            {isOpen && (
                <AddToCartModal isOpen={isOpen} onClose={modalHandler}/>
            )}
        </>
    );
}


export default Detail;