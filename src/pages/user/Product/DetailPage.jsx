import './DetailPage.css';
import React, {useState, useEffect, useCallback} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useSetRecoilState} from 'recoil';
import DetailQnaList from "@components/user/List/DetailQnaList";
import DetailReviewsList from "@components/user/List/DetailReviewsList";
import ProductOptionTab from "@components/user/Common/Select/ProductOptionTab";
import StarRating from "@components/user/Common/Rating/StarRating";
import RecommendProductList from "@components/user/List/RecommendProductList";
import DetailWriteQna from "@components/user/Common/Input/DetailWriteQna";
import ScrollToTopBtn from '@components/user/Common/Button/ScrollToTopBtn';
import AddToCartModal from "@components/user/Common/Modal/AddToCartModal";
import ConfirmModal from "@components/common/Modal/ConfirmModal";
import {formatPrice} from "@utils/Format";
import axios from 'axios';
import {productsApi, userApi, orderApi} from "@api/Api";
import {cartCountAtom} from "@src/recoil/atom";
import styled from "styled-components";
import {Pagination} from "@mui/material";
import {FaHeart} from "react-icons/fa";
import heart from '@assets/icons/heart.svg';
import arrowRight from '@assets/icons/chevron-right.svg';
import parcelIcon from '@assets/icons/truck-02.png';
import ReactQuill from 'react-quill';

function Detail() {
    const navigate = useNavigate();
    const {productId} = useParams();

    const [product, setProduct] = useState([]);
    const [productImg, setProductImg] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [qna, setQna] = useState([]);
    const [recommendProducts, setRecommendProducts] = useState([]);
    const [productIsWish, setProductIsWish] = useState();

    /* 세션 스토리지에서 토큰, userId 가져오기 */
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
                setProductImg(response.data.data.imgList);
            } catch (e) {
                console.error("Error fetching Product data: ", e);
            }
        };
        fetchData();
    }, [token, productId]);

    /* 상품 위시리스트 확인 */
    useEffect(() => {
        const fetchData = async () => {
            const url = `${userApi}/${userId}/wish/${productId}`;
            try {
                const response = await axios.get(url, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json; charset=UTF-8',
                    }
                });
                setProductIsWish(response.data.data.isWish);
            } catch (e) {
                console.error("Error fetching Wishlist data: ", e);
            }
        }
        fetchData();
    }, [productId, token, userId]);

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
                setReviews(response.data.data);
                setReviewTotalPages(response.data.data.totalPage);
            } catch (e) {
                console.error("Error fetching Inquiry data: ", e);
            }
        };
        fetchData();
    }, [token, productId, reviewCurrentPage]);

    /* Qna 페이지네이션 */
    const [qnaCurrentPage, setQnaCurrentPage] = useState(1);
    const [qnaTotalPages, setQnaTotalPages] = useState(0);
    const handleQnaPageChange = (event, value) => {
        setQnaCurrentPage(value);
        navigate(`?page=${value}`);
    };

    /* Qna 데이터 목록 조회 */
    useEffect(() => {
        const fetchData = async () => {
            const url = `${productsApi}/${productId}/qnaList?page=${qnaCurrentPage}`;
            try {
                const response = await axios.get(url, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json; charset=UTF-8',
                    }
                });
                setQna(response.data.data);
                setQnaTotalPages(response.data.data.totalPages);
                console.log(response.data)
            } catch (e) {
                console.error("Error fetching QNA data: ", e);
            }
        };
        fetchData();
    }, [token, productId, qnaCurrentPage]);

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
            } catch (e) {
                console.error("Error fetching data: ", e);
            }
        };
        fetchData();
    }, [token, productId]);

    /* 서브 이미지 클릭 */
    const handleSubImgClick = (index) => {
        if (index > 0 && index < productImg.length) {
            const newProductImg = [...productImg];
            [newProductImg[0], newProductImg[index]] = [newProductImg[index], newProductImg[0]];
            setProductImg(newProductImg);
        }
    }

    /* 위시 리스트 추가 */
    const handleWishClick = async () => {
        const url = `${userApi}/${userId}/wish`;
        const requestData = {
            productId: productId
        };
        try {
            await axios.post(url, requestData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json; charset=UTF-8',
                }
            });
            /* productIsWish 값을 true 로 변경 */
            setProductIsWish(true);
        } catch (e) {
            console.error("Error fetching Wish data: ", e);
        }
    };

    /* 선택한 옵션을 탭에 전달하기 위한 변수(optionId, optionQuantity) */
    const [selected, setSelected] = useState([]);
    const handleSelect = (e) => {
        const selectedOption = {
            "optionValue": e.target.value,
            "optionId": e.target.options[e.target.selectedIndex].getAttribute("data-id"),
            "optionQuantity": e.target.options[e.target.selectedIndex].getAttribute("data-quantity")
        };

        // 이미 선택된 optionId가 order에 있으면 alert 표시
        const isOptionIdExistInOrder = order.some((item) => item.selectedOption.optionId === selectedOption.optionId);

        if (isOptionIdExistInOrder) {
            alert(`주문 목록에 이미 선택한 옵션이 존재합니다.`);
            return;
        }

        setSelected([...selected, selectedOption]);
    };

    /* 탭에서 전달 받은 옵션, 옵션 수량, 전체 옵션 수량에 관한 코드 */
    const [totalCount, setTotalCount] = useState(0);
    const [order, setOrder] = useState([]);
    const handleCountChange = ({count, optionId}) => {
        /* setOrder 함수를 콜백 형태로 사용하여 주문 상태를 업데이트 */
        setOrder(prevOrder => {

            if (count === 0) {
                /* count가 0이면 해당 optionId를 가진 아이템을 제거 */
                return prevOrder.filter((item) => item.selectedOption.optionId !== optionId);
            }

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
        const newTotalCount = order.reduce((total, item) => total + item.selectedOption.productCount, 0);
        setTotalCount(newTotalCount);
    }, [order]);

    /* 장바구니 클릭 시 모달 */
    const [isOpen, setIsOpen] = useState(false);
    const modalHandler = () => {
        setIsOpen(!isOpen);
    };

    /* 옵션, 수량 미선택 시 alert 모달 */
    const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
    const [modalText, setModalText] = useState('');
    const alertModalHandler = () => {
        setIsAlertModalOpen(!isAlertModalOpen);
    }

    /* 장바구니에 추가 */
    const setCartCount = useSetRecoilState(cartCountAtom);
    const handleCartClick = async () => {
        if (order.length > 0) {
            try {
                /* 각 아이템에 대해 try-catch 블록 실행 */
                await Promise.all(order.map(async (item) => {
                    const requestData = {
                        productId: item.selectedOption.productId,
                        optionId: item.selectedOption.optionId,
                        productCount: item.selectedOption.productCount,
                    };
                    const url = `${userApi}/${userId}/cart`;
                    await axios.post(url, requestData, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json; charset=UTF-8',
                        }
                    });
                }));
                modalHandler();
                /* 상품 추가 후, 장바구니 개수를 다시 가져오는 axios get 요청 */
                const cartCountResponse = await axios.get(`${userApi}/${userId}/cart-count`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
                /* cartCountAtom을 업데이트 */
                setCartCount(cartCountResponse.data.data.cartCount);
            } catch (e) {
                console.error("Error fetching Inquiry data: ", e);
            }
        } else {
            setModalText("장바구니에 추가할 상품이 없습니다.");
            alertModalHandler();
        }
    };

    /* qna 작성창 열기 */
    const [isExpanded, setIsExpanded] = useState(false);
    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };

    /* qna 작성 */
    const handleWriteQna = async (title, contents, qnaIsSecret) => {
        const url = `${productsApi}/${productId}/qna`
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
            handleToggle();
            /* 현재의 qna 상태를 복사하여 수정 */
            const newQna = {...qna};
            newQna.content = newQna.content || [];
            newQna.content.push(response.data.data);
            setQna(newQna);
        } catch (e) {
            console.error(e);
        }
    }

    /* "답변 완료"인 객체의 개수를 세기 */
    const qnaCompletedAnswersCount = qna.content ? qna.content.filter(item => item.qnaStatus === "답변 완료").length : 0;
    /* "답변 대기"인 객체의 개수 */
    const qnaPendingAnswersCount = qna.content ? qna.content.filter(item => item.qnaStatus === "답변 대기").length : 0;

    /* 바로 구매 결제 */
    const handleDirectPurchase = async () => {
        if (order.length === 0) {
            setModalText("옵션과 수량을 선택해주세요.");
            alertModalHandler();
            return;
        }

        const productList = order.map(item => ({
            productId: productId,
            optionId: item.selectedOption.optionId,
            productCount: item.selectedOption.productCount,
        }));

        const purchaseData = {
            userId: userId,
            productList: productList,
        };

        try {
            const url = `${orderApi}/products`;
            const response = await axios.post(url, purchaseData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            navigate('/order', {state: {orderData: response.data}});
        } catch (error) {
            console.error(error);
        }
    };

    /* 대표 이미지 호버 시 zoom */
    const useClientRect = () => {
        const [rect, setRect] = useState(null);

        const handleRef = useCallback((node) => {
            if (node !== null) {
                setRect(node.getBoundingClientRect());
            }
        }, []);

        return [rect, handleRef];
    };

    const [imageRect, setImageRectRef] = useClientRect();
    const [scannerPosition, setScannerPosition] = useState(null);
    const [viewPosition, setViewPosition] = useState(null);
    const onMouseMove = (e) => {
        const scannerWidth = 150;
        const scannerHeight = 150;

        if (imageRect) {
            const scannerPosLeft = e.pageX - scannerWidth / 2;
            const scannerPosTop = e.pageY - scannerHeight / 2;

            /* 대표 이미지 위의 카테고리 설명이 imageRect 영역으로 함께 잡혀서 24 를 더해줍니다. */
            const allowedPosLeft = scannerPosLeft >= imageRect.x && scannerPosLeft <= imageRect.x + imageRect.width - scannerWidth;
            const allowedPosTop = scannerPosTop >= (imageRect.y + 24) && scannerPosTop <= (imageRect.y + 24) + imageRect.height - scannerHeight;

            const newScannerPosition = {left: 0, top: 0};

            if (allowedPosLeft) {
                newScannerPosition.left = scannerPosLeft;
            } else {
                if (scannerPosLeft < imageRect.x) {
                    newScannerPosition.left = imageRect.x;
                } else {
                    newScannerPosition.left = imageRect.x + imageRect.width - scannerWidth;
                }
            }

            if (allowedPosTop) {
                newScannerPosition.top = scannerPosTop;
            } else {
                if (scannerPosTop < (imageRect.y + 24)) {
                    newScannerPosition.top = (imageRect.y + 24);
                } else {
                    newScannerPosition.top = (imageRect.y + 24) + imageRect.height - scannerHeight;
                }
            }

            setScannerPosition(newScannerPosition);
            setViewPosition({
                left: (newScannerPosition.left - imageRect.x) * -1.3,
                top: (newScannerPosition.top - (imageRect.y + 24)) * -1.3,
            })
        }
    };

    const onMouseLeave = () => {
        setScannerPosition(null);
        setViewPosition(null);
    };

    return (
        <>
            <div id="container1">
                <div className='category'>
                    <div>{product.productCategory}</div>
                </div>
                <div className='productArea'>
                    <div className='detail-repImg' onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
                        {productImg && <img alt={product.productName} src={productImg[0]} ref={setImageRectRef}/>}
                        {imageRect && scannerPosition && <ScannerWrapper position={scannerPosition}/>}
                        {imageRect && viewPosition && <ViewWrapper position={viewPosition} img={productImg[0]}
                                                                   left={imageRect.x + imageRect.width + 150}
                                                                   top={imageRect.y + 24}/>}
                    </div>

                    <div className='detail-subImgArea'>
                        {productImg && productImg.length > 1 && (
                            productImg.slice(1).map((img, index) => (
                                <div key={index} className='detail-subImg'
                                     onClick={() => {
                                         handleSubImgClick(index + 1);
                                     }}>
                                    <img alt={`SubImage ${index + 1}`} src={img}/>
                                </div>
                            ))
                        )}
                    </div>

                    <div className='detailArea'>
                        <div className='title'>
                            <div>{product.productBrand}</div>
                        </div>
                        <div className='subTitle'>
                            <div>{product.productName}</div>
                        </div>
                        <div className="rating">
                            <StarRating rating={product.productRating}/>
                            <div style={{marginLeft: '10px'}}>({product.productReviewCount}건)</div>
                        </div>
                        <div className='price'>
                            <div className='discount'>{product.productDiscountRate} %&nbsp;&nbsp;</div>
                            <div>{formatPrice(product.productSalePrice)} 원</div>
                        </div>
                        <div className='releasePrice'>
                            <div>최초출시가 {formatPrice(product.productPrice)} 원</div>
                        </div>
                        <hr style={{marginTop: '13px'}}/>
                        <div className='deliveryInfo'>
                            <div>배송정보</div>
                            <div className='transportation'>
                                <div>택배배송</div>
                            </div>
                        </div>
                        <div className='deliveryFee'>
                            <div>배송비</div>
                            <div style={{marginLeft: '77px'}}>무료</div>
                        </div>
                        <div className='detail-option-select'>
                            {
                                (product.optionList && product.optionList.length > 0)
                                ?
                                    <>
                                        <div style={{marginTop: '2px'}}>{product.optionList[0].optionName}</div>
                                        <select className='detail-options' name="options" onChange={handleSelect}>
                                            <option value="" hidden>옵션을 선택하세요.</option>
                                            {product.optionList && product.optionList.map((option, index) => (
                                                <option key={index} value={option.optionValue}
                                                        data-id={option.optionId}
                                                        data-quantity={option.optionQuantity}>{option.optionValue}</option>
                                            ))}
                                        </select>
                                    </>
                                :
                                    <div style={{color: 'red'}}>죄송합니다. 재고 부족으로 상품 준비 중입니다.</div>
                            }

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
                                <div>합계</div>
                            </div>
                            <div className='cost'>
                                <div>{formatPrice(totalCount * product.productSalePrice)} 원</div>
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
                    <button onClick={handleDirectPurchase} className='purchaseButton'>바로 구매</button>
                </div>
            </div>

            <div id='container2'>
                <ul className='buttonArea'>
                    <li className='productDetailButton'><a href="#productDetailButtonScroll">상품상세정보</a></li>
                    <li className='reviewButton'><a href="#reviewButtonScroll">고객리뷰({reviews.productReviewCount})</a>
                    </li>
                    <li className='qnaButton'><a href="#qnaButtonScroll">상품 Q&A({qna.totalElements})</a></li>
                    <li className='recommandButton'><a href="#recommandButtonScroll">추천 상품</a></li>
                    <li className='returnInfoButton'><a href="#deliveryTitleScroll">배송/반품/교환 안내</a></li>
                </ul>
                <hr style={{marginTop: '5px', borderWidth: '2px'}}/>
                <div className='productDetailBox'>
                    <ReactQuill
                        value={product.productDes}
                        readOnly={true}
                        theme={'bubble'}
                    />
                </div>


                <div className='reviewTitle'>
                    <div className="reviewButtonScroll" id="reviewButtonScroll">고객리뷰({reviews.productReviewCount})</div>
                </div>
                <div className='ratingBox'>
                    <div className='ratingNum'>
                        <div>{reviews.productRating}</div>
                    </div>
                    <div className='ratingStar'>
                        <StarRating rating={reviews.productRating} style="none"/>
                        <div style={{fontSize: '16px'}}>총 {reviews.productReviewCount}건 리뷰</div>
                    </div>
                </div>
                <div className='reviewAnnounce'>
                    <div>※ 리뷰 등록, 수정, 삭제 및 상세 내용은 [마이페이지 &gt; 나의 활동관리 &gt; 상품 리뷰]에서 확인하실 수 있습니다.</div>
                </div>
                <div className='reviewCategory'>
                    <div>전체({reviews.productReviewCount})</div>
                </div>
                <hr style={{marginTop: '8px', borderWidth: '2px'}}/>
                <div className='reviewList'>
                    {
                        <DetailReviewsList reviews={reviews.reviewList || []}/>
                    }
                </div>
                <Pagination count={reviewTotalPages} page={reviewCurrentPage} onChange={handleReviewPageChange}/>

                <div className='qnaTitle'>
                    <div className="qnaButtonScroll" id="qnaButtonScroll">Q&A({qna.totalElements})</div>
                </div>
                <div className='qnaAnnounce'>
                    <div>상품 외 배송, 교환/반품 등에 관한 문의사항은 고객센터에서 확인하실 수 있습니다.</div>
                </div>
                <div className='qnaCategory'>
                    <div className='qna-category-btn-area'>
                        <button className='qnaAll'>전체 ({qna.totalElements})</button>
                        <div className='qna-category-line'/>
                        <button className='qnaReplyDone'>답변완료 ({qnaCompletedAnswersCount})</button>
                        <div className='qna-category-line'/>
                        <button className='qnaReplyWaiting'>답변대기 ({qnaPendingAnswersCount})</button>
                    </div>
                    <button onClick={handleToggle} className='qnaEnroll'>Q&A 작성하기 <img alt={''} src={arrowRight}/>
                    </button>
                </div>
                <DetailQnaList qnas={qna.content || []}/>

                <div className='qna-layout'>
                {
                    isExpanded && <DetailWriteQna onClick={handleWriteQna}/>
                }
                </div>

                <Pagination count={qnaTotalPages} page={qnaCurrentPage} onChange={handleQnaPageChange}/>

                <div className='recommandTitle'>
                    <div className="recommandButtonScroll" id="recommandButtonScroll">함께 보면 좋은 상품</div>
                </div>
                <RecommendProductList recommendProducts={recommendProducts}/>

                <div className='deliveryTitle'>
                    <div className="deliveryTitleScroll" id="deliveryTitleScroll">배송 안내</div>
                </div>
                <hr style={{marginTop: '16px', borderWidth: '2px', marginBottom: '0px'}}/>
                <div className='deliveryContents'>
                    <div className='deliveryIcon'><img className='deliveryIconImg' alt={''} src={parcelIcon}/></div>
                    <div className='deliveryExplain'>
                        <div style={{color: '#000000', fontWeight: '700'}}>택배배송</div>
                        <div>주문 후 평균 2~3일 이내 택배 배송됩니다.</div>
                    </div>
                    <div className='deliveryCost'>
                        <div>무료배송</div>
                    </div>
                </div>
                <div className='returnTitle'>
                    <div>교환 및 반품 안내</div>
                </div>
                <hr style={{marginTop: '16px', borderWidth: '2px', marginBottom: '0px'}}/>
                <div className='returnApplyPeriod'>
                    <div className='returnApplyPeriodTitle'>
                        <div>교환/반품 신청기간</div>
                    </div>
                    <div className='returnApplyPeriodContents'>
                        <div>단순변심 및 사이즈/색상 불만에 관련된 교환/반품 신청은 배송완료 후 7일 이내에 가능합니다.</div>
                    </div>
                </div>
                <div className='returnApplyCost'>
                    <div className='returnApplyCostTitle'>
                        <div>교환/반품 비용</div>
                    </div>
                    <div className='returnApplyCostContents'>
                        <div>상품의 회수(배송)비용은 무료입니다.</div>
                        <div>※ 상품의 불량/하자일 경우에는
                        100% 환불
                        이지만, 고객님의 단순변심 및 사이즈/색상 불만일 경우에는
                        90% 환불
                        입니다.</div>
                    </div>
                </div>
                <div className='returnInfo'>
                    <div>※ 자세한 내용은 <button className='inquiryButton'>고객센터</button> 로 문의 부탁드립니다. (A/S 문의는 제조사로 먼저 문의 시 빠르게 처리 가능합니다.)</div>
                    <div>※ 전자상거래 등에서의 소비자 보호에 관한 법률에 의한 반품규정이 판매자가 상품상세 페이지 등에서 개별적으로 고지 또는 지정한 반품조건보다 우선합니다.
                    </div>
                </div>
            </div>
            <div style={{marginBottom: '200px'}}/>
            <ScrollToTopBtn/>
            {isOpen && (
                <AddToCartModal isOpen={isOpen} onClose={modalHandler} className='cartTestModal'/>
            )}
            {isAlertModalOpen && (
                <ConfirmModal isOpen={isAlertModalOpen} onClose={alertModalHandler} onConfirm={alertModalHandler}>
                    {modalText}
                </ConfirmModal>
            )}
        </>
    );
}

/* 스캐너 스타일 */
const ScannerWrapper = styled.span`
  position: absolute;
  top: ${props => props.position.top}px;
  left: ${props => props.position.left}px;
  width: 150px;
  height: 150px;
  border: 1px solid #000;
  background-color: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  display: inline-block;
`;

const ViewWrapper = styled.div`
  z-index: 1;
  position: absolute;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
  width: 550px;
  height: 550px;
  background-image: url(${(props) => props.img});
  background-repeat: no-repeat;
  background-position: ${(props) => `${props.position.left}px ${props.position.top}px`};
  background-size: 200% 200%;
`;

export default Detail;