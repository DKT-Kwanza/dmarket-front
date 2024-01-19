import React, { useState } from 'react';
import MyPageSidebar from "../../../../components/MyPage/Sidebar/MyPageSidebar";
import MyPageSubHeader from "../../../../components/MyPage/SubHeader/MyPageSubHeader";
import './Qna.css';
import QnaItem from '../../../../components/Qna/QnaItem';

const Qna = () => { 
    const qnaData = [
        {
            qnaId: 1,
            productId: 1,
            productName: "코트시리즈 N224TH040P",
            title: "사이즈 질문 드립니다.",
            contents: "상세 사이즈 알고싶어용",
            createdAt: "2023-12-08 09:48:00",
            isSecret: true,
            status: "답변 완료",
            replyContents : "답변 입니다.",
            inquiryReplyDate: "2024-01-08 09:48:00"
        },
        {
            qnaId: 2,
            productId: 10,
            productName: "여성 나이키 코르테즈 DN1791-105",
            title: "급한데 배송이 언제 올까요?????",
            contents: "설날 전에 받을 수 있을까요???",
            createdAt: "2024-01-22 09:48:00",
            isSecret: false,
            status: "답변 대기",
            replyContents : null,
            inquiryReplyDate: null
        },
        {
            qnaId: 3,
            productId: 10,
            productName: "후드티셔츠 N224TH040P",
            title: "티셔츠 다른 색상 입고되나요?",
            contents: "회색도 팔아주세요",
            createdAt: "2024-03-22 09:48:00",
            isSecret: false,
            status: "답변 대기",
            replyContents : null,
            inquiryReplyDate: null
        },
    ]

    // 현재 확장된 질문의 ID를 저장하는 상태
    const [expandedQnaId, setExpandedQnaId] = useState(null);

    // 질문을 토글하는 함수
    const toggleQna = (qnaId) => {
        setExpandedQnaId(prevQnaId => prevQnaId === qnaId ? null : qnaId);
    };

    const formatDate = (datetime) => { // 날짜만 남기기
        const date = new Date(datetime);
        return date.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' });
    };

    return (
        <div className='Qna'>
            <div><MyPageSubHeader /></div>
            <div className='Qna-contents-body'>
                <MyPageSidebar />
                <div className='Qna-container'>
                    <div className='Qna-title'>
                        <div className='Qna-title-bar'></div>
                        <div className='Qna-title-info'>상품 Q&A</div>
                    </div>
                    <div className='Inquiry-contents-content'>
                        <div className='Inquiry-contents-content-hr' />
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
                            {qnaData.map((qna, index) => (
                                <QnaItem
                                    key={index}
                                    productName={qna.productName}
                                    title={qna.title}
                                    contents={qna.contents}
                                    createdAt={formatDate(qna.createdAt)}
                                    isSecret={qna.isSecret}
                                    status={qna.status}
                                    replyContents={qna.replyContents}
                                    qnaReplyDate={formatDate(qna.qnaReplyDate)}
                                    isExpanded={expandedQnaId === qna.qnaId}
                                    onToggle={() => toggleQna(qna.qnaId)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Qna;
