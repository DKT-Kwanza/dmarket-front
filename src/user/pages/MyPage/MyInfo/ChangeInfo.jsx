import React from 'react';
import './ChangeInfo.css';

function ChangeInfo() {
    
    return (
        <div className='InfoChange'>
            <div className='InfoChange-header'>
                {/*상단 서브 헤더 영역 입니다.*/}
            </div>
            <div className="InfoChange-body">
                 <div className="InfoChange-container">
                    {/*왼쪽 메뉴 바 영역 입니다.*/}
                    <div className="InfoChange-submenu"/>
                        {/*컨텐트 영역 입니다.*/}
                    <div className="InfoChange-content">
                        {/*주문/배송 조회 제목 영역 입니다.*/}
                        <div className="InfoChange-title">
                            <div className="InfoChange-title-bar"/>
                            <div className="InfoChange-title-content">회원정보변경</div>
                        </div>
                        <div className="InfoChange-title-line"></div>
                        <div className='InfoChange-info'>
                            <div className='InfoChange-info-box'>
                                <div className='InfoChange-info-title'>이름</div>
                                <div className='InfoChange-info-contents'>김관자</div>
                            </div>
                            <div className='InfoChange-info-box'>
                                <div className='InfoChange-info-title'>이메일</div>
                                <div className='InfoChange-info-contents'>dktechin@dktechin.com</div>
                            </div>
                            <div className='InfoChange-info-box'>
                                <div className='InfoChange-info-title'>사원번호</div>
                                <div className='InfoChange-info-contents'>10101010</div>
                            </div>
                            <div className='InfoChange-info-box'>
                                <div className='InfoChange-info-title'>입사일</div>
                                <div className='InfoChange-info-contents'>2023/01/01</div>
                            </div>
                        </div>
                        <div className='InfoChange-address'>
                            <div className='InfoChange-address-title'>기본배송지</div>
                            <div className='InfoChange-address-border'></div>
                            <div className='InfoChange-address-box'>
                                <div className='InfoChange-info-title'>받는 분</div>
                                <input
                                    type="text"
                                    className="InfoChange-address-name"
                                    placeholder="신짱구"
                                />
                                <div className="InfoChange-address-essential">10자 이내</div>
                            </div>
                            <div className='InfoChange-address-box'>
                                <div className='InfoChange-info-title'>핸드폰 번호</div>
                                <input
                                    type="text"
                                    className="InfoChange-address-phone"
                                    placeholder="010"
                                />
                                <div className='InfoChange-address-minus'>-</div>
                                <input
                                    type="text"
                                    className="InfoChange-address-phone"
                                    placeholder="1234"
                                />
                                <div className='InfoChange-address-minus'>-</div>
                                <input
                                    type="text"
                                    className="InfoChange-address-phone"
                                    placeholder="5678"
                                />
                            </div>
                            <div className='InfoChange-address-box2'>
                                <div className='InfoChange-info-title'>배송지</div>
                                <input
                                    type="text"
                                    className="InfoChange-address-name"
                                    placeholder="12345"
                                />
                                <div className="InfoChange-address-essential">우편번호</div>
                            </div>
                            <div className='InfoChange-address-box2'>
                                <div className='InfoChange-info-title'></div>
                                <input
                                    type="text"
                                    className="InfoChange-address-detail"
                                    placeholder="서울특별시 아무구 아무동 관자빌딩"
                                />
                                <div className="InfoChange-address-essential">기본주소</div>
                            </div>
                            <div className='InfoChange-address-box'>
                                <div className='InfoChange-info-title'></div>
                                <input
                                    type="text"
                                    className="InfoChange-address-detail"
                                    placeholder="110층 11044호"
                                />
                                <div className="InfoChange-address-essential">나머지주소</div>
                            </div>
                            <div className='InfoChange-btn-container'>
                                <button type='submit' className='InfoChange-btn'>수정</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChangeInfo;