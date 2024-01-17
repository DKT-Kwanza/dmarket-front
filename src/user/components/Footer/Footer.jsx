import './Footer.css'

function Footer(){
    
    return(
        <div className='footer'>
            <div className='up-footer'>
                <div className='upfooter-service-basic'>
                    <button>회사소개</button>
                    <div className='bar-style'></div>
                    <button>이용약관</button>
                    <div className='bar-style'></div>
                    <button>개인정보처리방침</button>
                    <div className='bar-style'></div>
                    <button>청소년보호방침</button>
                    <div className='bar-style'></div>
                    <button>입점/제휴문의</button>
                    <div className='bar-style'></div>
                    <button>대량구매문의</button>
                    <div className='bar-style'></div>
                    <button>매장안내</button>
                    <div className='bar-style'></div>
                    <button>임직원인증</button>
                </div>
                <div className='upfooter-service-details'>
                    <div>판매자 서비스</div>
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <rect width="16" height="16" fill="white"/>
                        <path d="M8 10L4.5359 7L11.4641 7L8 10Z" fill="black" stroke="black"/>
                        </svg>
                    </button>
                    <div>파트너센터</div>
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <rect width="16" height="16" fill="white"/>
                        <path d="M8 10L4.5359 7L11.4641 7L8 10Z" fill="black" stroke="black"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div className='down-footer'>
                <div className='down-footer-left'>
                    <div className='down-footer-left-first'>
                        <div className='down-footer-left-first-title'>(주)관자 디자인</div>
                        <div>
                            <div className='down-footer-left-first-content-A'>
                                <div>대표이사 : 관자</div>
                                <div className='bar-style'></div>
                                <div>서울특별시 아무구 아무동 관자빌딩 110층 11044호</div>
                                <div className='bar-style'></div>
                                <div>호스팅서비스 사업자 : 관자시스템</div>
                                <div className='bar-style'></div>
                                <div>사업자등록번호 : 222-11-000333 </div>
                            </div>
                            <div className='down-footer-left-first-content-B'>
                                <div>통신판매업신고 : 2016 - 서울아무동-8888</div>
                                <div className='bar-style'></div>
                                <div>E_mail : ahy1612@gmail.com</div>
                            </div>
                        </div>
                    </div>
                    <div className='down-footer-left-second'>
                        <div className='down-footer-left-second-title'>소비자피해보상</div>
                        <div>
                            <div className='down-footer-left-second-content-A'>
                            고객님은 안전거래를 위해 현금 등으로 결제 시 저희 쇼핑몰에서 가입한 구매 안전서비스로 소비자 피해보상 보험 서비스를 이용하실 수 있습니다.
                            </div>
                            <div className='down-footer-left-second-content-B'>
                            COPYRIGHT © 2023 관자디자인.. LTD ALL RIGHTS RESERVED.
                            </div>
                        </div>
                    </div>
                </div>
                <div className='down-footer-right'>
                    <div className='down-footer-right-title'>
                        <div className='down-footer-right-title-text'>고객센터</div>
                        <div className='down-footer-right-title-number'>1555-4444</div>
                    </div>
                    <div className='down-footer-right-contents'>
                        <div>운영시간: 평일 09:00 ~ 18:00</div>
                        <div>고객센터 바로가기</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Footer;

