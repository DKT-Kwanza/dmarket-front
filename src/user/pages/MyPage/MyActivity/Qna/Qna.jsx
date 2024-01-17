import React, { useState } from 'react';
import MyPageSidebar from "../../../../components/MyPage/Sidebar/MyPageSidebar";
import MyPageSubHeader from "../../../../components/MyPage/SubHeader/MyPageSubHeader";
import './Qna.css';

const Qna = () => {

    const [isExpanded1, setIsExpanded1] = useState(false);
    const [isExpanded2, setIsExpanded2] = useState(false);

    const handleToggle1 = () => {
        setIsExpanded1(!isExpanded1);
      };
    
      const handleToggle2 = () => {
        setIsExpanded2(!isExpanded2);
      };

    return (<>
        <div><MyPageSubHeader /></div>
        <div className='Qna-title'>
            <div className='Qna-title-bar'></div>
            <div className='Qna-title-info'>상품 Q&A</div>
        </div>
        <div className='Qna-contents'>
            <div className='Qna-contents-sidebar'><MyPageSidebar /></div>
            <div className='Qna-contents-content'>
                <hr className='Qna-contents-content-hr' />
                <div className='Qna-contents-content-info'>
                    <p>* 상품과 관련 없는 내용, 비방, 광고, 불건전한 내용의 글은 사전 동의 없이 삭제될 수 있습니다.</p>
                    <p>* 고객님께서 상품 상세에 작성하신 내용입니다.</p>
                </div>
                <div className='Qna-contents-content-data'>
                    <hr className='Qna-contents-content-data-hr' />
                    <div className='Qna-contents-content-data-title'>
                        <div className='Qna-contents-content-data-1'>상품명</div>
                        <div className='Qna-contents-content-data-2'>제목</div>
                        <div className='Qna-contents-content-data-3'>작성일</div>
                        <div className='Qna-contents-content-data-4'>답변 상태</div>
                    </div>
                    <ul className='Qna-contents-content-data-list'>
                        <li onClick={handleToggle1} className='Qna-contents-content-data-list-temp'>
                            <div className='Qna-contents-content-data-1'>코트시리즈 N224TH040P</div>
                            <div className='Qna-contents-content-data-2'>사이즈 질문드립니다.</div>
                            <div className='Qna-contents-content-data-3'>2014.01.08</div>
                            <div className='Qna-contents-content-data-5'>답변 대기</div>
                        </li>
                        <hr className='Qna-contents-content-data-list-hr' />
                        {isExpanded1 && (
                            <div className='Qna-contents-content-data-list-detail'>
                                <div className='Qna-contents-content-data-list-data'>
                                    <p>상품 사이즈 어디에서 보나요??</p>
                                </div>
                                <hr className='Qna-contents-content-data-list-hr' />
                                <div className='Qna-contents-content-data-list-data'>
                                    <p>답변 준비중입니다.</p>
                                </div>
                                <hr className='Qna-contents-content-data-list-hr' />
                                <div className='Qna-contents-content-data-list-btn-wrap'>
                                    <button onClick={handleToggle1} className='Qna-contents-content-data-list-btn'>확인</button>
                                </div>
                                <hr className='Qna-contents-content-data-list-btn-hr' />
                            </div>
                         )}
                        <li onClick={handleToggle2} className='Qna-contents-content-data-list-temp'>
                            <div className='Qna-contents-content-data-1'>후드티셔츠 N224TH040P</div>
                            <div className='Qna-contents-content-data-2'>상품 상세 사이즈 알고싶습니다.</div>
                            <div className='Qna-contents-content-data-3'>2014.01.08</div>
                            <div className='Qna-contents-content-data-6'>답변 완료</div>
                        </li>
                        <hr className='Qna-contents-content-data-list-hr' />
                        {isExpanded2 && (
                            <div className='Qna-contents-content-data-list-detail'>
                                <div className='Qna-contents-content-data-list-data'>
                                    <p>상세 페이지보다 더 자세한 사이즈 좀 알려주세요</p>
                                    <p>빠른 답변 부탁드려요</p>
                                </div>
                                <hr className='Qna-contents-content-data-list-hr' />
                                <div className='Qna-contents-content-data-list-data'>
                                    <div className='Qna-contents-content-data-list-data-info'>
                                        <div className='Qna-contents-content-data-list-data-info-profile'>관리자</div>
                                        <div className='Qna-contents-content-data-list-data-info-date'>2024.01.08</div>
                                    </div>
                                    <div className='Qna-contents-content-data-list-data-answer'>비밀입니다.</div>
                                </div>
                                <hr className='Qna-contents-content-data-list-hr' />
                                <div className='Qna-contents-content-data-list-btn-wrap'>
                                    <button onClick={handleToggle2} className='Qna-contents-content-data-list-btn'>확인</button>
                                </div>
                                <hr className='Qna-contents-content-data-list-btn-hr' />
                            </div>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    </>);
};

export default Qna;
