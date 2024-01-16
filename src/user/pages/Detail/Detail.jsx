import React, { useState } from 'react';
import CheckBox from '../../components/CheckBox/CheckBox';
import './Detail.css';
import DetailQna from '../../components/Detail/DetailQna';
import DetailQna2 from '../../components/Detail/DetailQna2';
import wishButton from '../../../assets/icons/wishButton.png'
import productDetail from '../../../assets/images/productDetail.png'
import arrowRight from '../../../assets/icons/chevron-right.svg'
import parcelIcon from '../../../assets/icons/truck-02.png'

function Detail() {
  const [showNewDetailQna, setShowDetailQna] = useState(false);
  const [showNewDetailQna2, setShowDetailQna2] = useState(false);
  const handleButtonClick = () => {
    setShowDetailQna(true);
  };

  const handleCloseDetaiQna = () => {
    setShowDetailQna(false);
  };


  const handleButtonClick2 = () => {
    setShowDetailQna2(true);
  };

  const handleCloseDetaiQna2 = () => {
    setShowDetailQna2(false);
  };

  return (
    <>
      <div id="container1">
        <div className='head' />
        <div className='category'><text>카테고리/카테고리/카테고리</text></div>
        <div className='productArea'>
          <div className='repImg' />
          <div className='subImgArea'>
            <div className='subImg' />
            <div className='subImg' />
            <div className='subImg' />
            <div className='subImg' />
            <div className='subImg' />
          </div>
          <div className='detailArea'>
            <div className='title'><text>JAJU&gt;</text></div>
            <div className='subTitle'><text>여 다운필 루즈핏 퀼팅 점퍼 J103401008099</text></div>
            <div class="rating">
              <span class="starSolid">★★★☆☆</span>
              <text> 3.0 (3건)</text>
            </div>
            <div class='price'><text>59,900원</text></div>
            <div className='releasePrice'><text>최초출시가 89,900원</text></div>
            <hr style={{ marginTop: '13px' }} />
            <div className='deliveryInfo'>
              <text>배송정보</text>
              <div className='transportation'>
                <text>택배배송</text>
                <div className='arrivalTime'><text>1/4 도착 예정</text></div>
              </div>
            </div>
            <div className='deliveryFee'>
              <text>배송비</text>
              <text style={{ marginLeft: '77px' }}>무료 (4만원 이상 무료)</text>
            </div>
            <div className='colorSelect'>
              <text style={{ marginTop: '2px' }}>색상</text>
              <select id="colors" name="colors">
                <option value="" disabled selected hidden>선택하세요.</option>
                <option value="red">Red</option>
                <option value="blue">Blue</option>
                <option value="green">Green</option>
              </select>
            </div>
            <div className='sizeSelect'>
              <text style={{ marginTop: '2px' }}>사이즈</text>
              <select id="sizes" name="sizes">
                <option value="" disabled selected hidden>선택하세요.</option>
                <option value="small">S</option>
                <option value="medium">M</option>
                <option value="large">L</option>
              </select>
            </div>
            <div className='totalCost'>
              <div className='total'><text>합계</text></div>
              <div className='cost'><text>59,900원</text></div>
            </div>
            <hr style={{ marginTop: '19px' }} />
          </div>
        </div>
        <div className='purchaseArea'>
          <button className='wishlistButton'><img src={wishButton} /></button>
          <button className='cartButton'>장바구니</button>
          <button className='purchaseButton'>바로구매</button>
        </div>
      </div>
      
      <div id='container2'>
        <div className='buttonArea'>
          <button className='productDetailButton'>상품상세정보</button>
          <button className='reviewButton'>고객리뷰(3)</button>
          <button className='qnaButton'>상품 Q&A(0)</button>
          <button className='recommandButton'>추천 상품</button>
          <button className='returnInfoButton'>배송/반품/교환 안내</button>
        </div>
        <hr style={{ marginTop: '5px', borderWidth: '2px' }} />
        <div className='productNum'>
          <text>상품번호 : 1000563057860<br />모델번호 : J103401008</text>
        </div>
        <div className='productDetail'><text>상품상세정보</text></div>
        <div className='productDetailImg'>
          <img src={productDetail} />
        </div>
        <div className='productDetailBox'></div>
        <div className='reviewTitle'><text>고객리뷰(3)</text></div>
        <div className='ratingBox'>
          <div className='ratingNum'><text>3.0</text></div>
          <div className='ratingStar'>
            <text>★★★☆☆<br /></text>
            <text style={{ fontSize: '16px' }}>총 3건 리뷰</text>
          </div>
        </div>
        <div className='reviewAnnounce'><text>※ 리뷰 등록, 수정, 삭제 및 상세 내용은 [마이페이지 &gt; 나의 활동관리 &gt; 상품 리뷰]에서 확인하실 수 있습니다.</text></div>
        <div className='reviewCategory'><text>전체(3)</text></div>
        <hr style={{ marginTop: '8px', borderWidth: '2px' }} />
        <div className='reviewList'>
          <div className='review'>
            <div className='reviewInfo'><text>★ 3  | 강** | 2023.12.13 | 색상:블랙 / 사이즈:S(90)</text></div>
            <div className='reviewContents'><text>가격대비 마감이 잘되어있고 s치곤 크지만 단추때문에 고급져보여요 충전재가 폴리인데도 따뜻해요</text></div>
            <hr style={{ marginTop: '19px', marginLeft: '-15px' }} />
          </div>
          <div className='review'>
            <div className='reviewInfo'><text>★ 3  | 강** | 2023.12.13 | 색상:블랙 / 사이즈:S(90)</text></div>
            <div className='reviewContents'><text>가격대비 마감이 잘되어있고 s치곤 크지만 단추때문에 고급져보여요 충전재가 폴리인데도 따뜻해요</text></div>
            <hr style={{ marginTop: '19px', marginLeft: '-15px' }} />
          </div>
          <div className='review'>
            <div className='reviewInfo'><text>★ 3  | 강** | 2023.12.13 | 색상:블랙 / 사이즈:S(90)</text></div>
            <div className='reviewContents'><text>가격대비 마감이 잘되어있고 s치곤 크지만 단추때문에 고급져보여요 충전재가 폴리인데도 따뜻해요</text></div>
            <div className='reviewImg'></div>
            <hr style={{ marginTop: '19px', marginLeft: '-15px' }} />
          </div>
        </div>
        <div className='qnaTitle'><text>상품Q&A(0)</text></div>
        <div className='qnaAnnounce'><text>상품 외 배송, 교환/반품 등에 관한 문의사항은 고객센터에서 확인하실 수 있습니다.</text></div>
        <div className='qnaCategory'>
          <button className='qnaAll'>전체(3)</button><text>&nbsp; | &nbsp;</text>
          <button className='qnaReplyDone'>답변완료(0)</button>&nbsp; | &nbsp;
          <button className='qnaReplyWaiting'>답변대기(0)</button>
          <button className='qnaEnroll'>Q&A 작성하기 <img src={arrowRight} /></button>
        </div>
        <div className='qnaAttributes'>
          <div className='qnaAttributesTitle'><text>제목</text></div>
          <div className='qnaAttributesDate'><text>작성일</text></div>
          <div className='qnaAttributesState'><text>답변상태</text></div>
        </div>
        <div className='question'>
          <button className='questionTitle' onClick={handleButtonClick}>포인트 충전 어떻게 하나요?</button>
          <div className='questionDate'><text>2024.01.08</text></div>
          <div className='questionState'><text>답변 대기</text></div>
        </div>
        {showNewDetailQna && <DetailQna onClose={handleCloseDetaiQna} />}
        <div className='question'>
          <button className='questionTitle' onClick={handleButtonClick2}>반품신청했는데 언제 환불 되냐요?</button>
          <div className='questionDate2'><text>2024.01.08</text></div>
          <div className='questionState2'><text>답변 완료</text></div>
        </div>
        {showNewDetailQna2 && <DetailQna2 onClose={handleCloseDetaiQna2} />}

        <div className='questionWrite'>
          <div className='questionWriteTitle'>
            <text>제목</text>
            <input type="text" className='questionTitleInput' name="title" placeholder="제목을 입력해주세요." required></input>
          </div>
          <div className='questionWriteContents'>
            <div className='questionContentsleft'><text>내용</text></div>
            <textarea type="text" className='questionContentsInput' name="contents" placeholder="내용을 입력해주세요." required></textarea>
          </div>
          <div className='secretState'>
            <div className='secretArticle'>비밀글</div>
            <label className="public">
              공개
            </label>
            <CheckBox />
            <label className="private">
              비공개
            </label>
            <CheckBox />
          </div>
          <button className='enrollButton '>등록</button>
        </div>
        <div className='recommandTitle'><text>함께 보면 좋은 상품</text></div>
        <div className='recommandArea'>
          <div className='recommandElement' style={{marginLeft : '0px'}}>
            <div className='recommandElementImg'></div>
            <div className='recomandElementTitle'><text>일룸</text></div>
            <div className='recomandElementSubTitle'><text>쿠시노 코지 저상형 침대(패브릭,SS)</text></div>
            <div className='recomandElementPrice'><text>1,208,000원</text></div>
            <div className='recomandElementStar'><text style={{color : '#FFD465'}}>★★★★★</text><text>(5건)</text></div>
          </div>
          <div className='recommandElement'>
            <div className='recommandElementImg'></div>
            <div className='recomandElementTitle'><text>일룸</text></div>
            <div className='recomandElementSubTitle'><text>헤이즐 무헤드 평상형 퀸 침대 프레임</text></div>
            <div className='recomandElementPrice'><text>449,000원</text></div>
          </div>
          <div className='recommandElement'>
            <div className='recommandElementImg'></div>
            <div className='recomandElementTitle'><text>JAJU</text></div>
            <div className='recomandElementSubTitle'><text>여 다운필 루즈핏 퀼팅 점퍼 J1034099</text></div>
            <div className='recomandElementPrice'><text>20,710원</text></div>
            <div className='recomandElementStar'><text style={{color : '#FFD465'}}>★★★☆☆</text><text>(20건)</text></div>
          </div>
          <div className='recommandElement'>
            <div className='recommandElementImg'></div>
            <div className='recomandElementTitle'><text>JAJU</text></div>
            <div className='recomandElementSubTitle'><text>여 다운필 루즈핏 퀼팅 점퍼 J1034099</text></div>
            <div className='recomandElementPrice'><text>20,710원</text></div>
          </div>
        </div>
        <div className='deliveryTitle'><text>배송 안내</text></div>
        <hr style={{ marginTop: '16px', borderWidth: '2px', marginBottom: '0px'}} />
        <div className='deliveryContents'>
          <div className='deliveryIcon'><img className='deliveryIconImg' src={parcelIcon}/></div>
          <div className='deliveryExplain'>
            <text style={{color:'#000000', fontWeight:'700'}}>택배배송</text>
            <text><br/>주문 후 평균 2~3일 이내 택배 배송됩니다.</text>
          </div>
          <div className='deliveryCost'><text>무료배송</text></div>
        </div>
        <div className='returnTitle'><text>교환 및 반품 안내</text></div>
        <hr style={{ marginTop: '16px', borderWidth: '2px', marginBottom: '0px'}} />
        <div className='returnApplyPeriod'>
          <div className='returnApplyPeriodTitle'><text>교환/반품 신청기간</text></div>
          <div className='returnApplyPeriodContents'><text>단순변심 및 사이즈/색상 불만에 관련된 교환/반품 신청은 배송완료 후 7일 이내에 가능합니다.</text></div>
        </div>
        <div className='returnApplyCost'>
          <div className='returnApplyCostTitle'><text>교환/반품 비용</text></div>
          <div className='returnApplyCostContents'>
            <text>상품의 회수(배송)비용은 무료입니다.</text>
            <text><br/>※ 상품의 불량/하자일 경우에는 </text>
            <text style={{fontWeight:'700'}}>100% 환불</text>
            <text>이지만, 고객님의 단순변심 및 사이즈/색상 불만일 경우에는 </text>
            <text style={{fontWeight:'700'}}>90% 환불</text>
            <text>입니다.</text>
            </div>
        </div>
        <div className='returnInfo'>
          <text>※ 자세한 내용은 </text>
          <button className='inquiryButton'>고객센터</button>
          <text>로 문의 부탁드립니다. (A/S 문의는 제조사로 먼저 문의 시 빠르게 처리 가능합니다.)</text>
          <text><br/>※ 전자상거래 등에서의 소비자 보호에 관한 법률에 의한 반품규정이 판매자가 상품상세 페이지 등에서 개별적으로 고지 또는 지정한 반품조건보다 우선합니다.</text>
        </div>
      </div>
      <div style={{marginBottom :'600px'}}/>
    </>
  );
}


export default Detail;