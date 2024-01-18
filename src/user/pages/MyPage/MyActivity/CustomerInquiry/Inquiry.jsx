import React, { useState } from 'react';
import MyPageSidebar from "../../../../components/MyPage/Sidebar/MyPageSidebar";
import MyPageSubHeader from "../../../../components/MyPage/SubHeader/MyPageSubHeader";
import './Inquiry.css';
import InquiryItem from '../../../../components/CustomerInquiry/InquiryItem';

const Inquiry = () => {
    const inquiryData = [
        {
            InqueryId: 1,
            category: "주문/결제",
            title: "포인트 충전 어떻게 하나요?",
            contents: "포인트 충전 어떻게 하나요? 여기서 이렇게 하면 되나요?",
            img: "https://placehold.co/130x130",
            createdAt: "2024-01-08 09:48:00",
            status: "답변 완료",
            replyContents : "답변 입니다.",
            inquiryReplyDate: "2024-01-08 09:48:00"
        },
        {
            InqueryId: 2,
            category: "반품/환불",
            title: "반품 신청했는데 언제 환불 되나요?",
            contents: "포인트 충전 어떻게 하나요? 여기서 이렇게 하면 되나요?",
            img: null,
            createdAt: "2024-01-08 09:48:00",
            status: "답변 대기",
            replyContents : null,
            inquiryReplyDate: null
        },
    ]

    const [expandedInquiry, setExpandedInquiry] = useState({});

    const toggleInquiry = (inquiryId) => {
        setExpandedInquiry(prev => ({
            ...prev,
            [inquiryId]: !prev[inquiryId]
        }));
    };

    const formatDate = (datetime) => { // 날짜만 남기기
        const date = new Date(datetime);
        return date.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' });
    };

    const [isExpanded1, setIsExpanded1] = useState(false);
    const [isExpanded2, setIsExpanded2] = useState(false);

    const handleToggle1 = () => {
        setIsExpanded1(!isExpanded1);
    };
    
    const handleToggle2 = () => {
        setIsExpanded2(!isExpanded2);
    };

    return (
        <div className='Inquiry'>
            <div><MyPageSubHeader /></div>
                <div className='Inquiry-contents-body'>
                    <MyPageSidebar />
                    <div className='Inquiry-container'>
                        <div className='Inquiry-title'>
                            <div className='Inquiry-title-bar'></div>
                            <div className='Inquiry-title-info'>고객문의</div>
                        </div>
                    <div className='Inquiry-contents-content'>
                        <div className='Inquiry-contents-content-hr' />
                        <div className='Inquiry-contents-content-info'>
                            <p>* 관련 없는 내용, 비방, 광고, 불건전한 내용의 글은 사전 동의 없이 삭제될 수 있습니다.</p>
                            <p>* 고객님께서 고객문의에 작성하신 내용입니다.</p>
                        </div>
                        <div className='Inquiry-contents-content-data'>
                            <hr className='Inquiry-contents-content-data-hr' />
                            <div className='Inquiry-contents-content-data-title'>
                                <div className='Inquiry-contents-content-data-1'>유형</div>
                                <div className='Inquiry-contents-content-data-2'>제목</div>
                                <div className='Inquiry-contents-content-data-3'>작성일</div>
                                <div className='Inquiry-contents-content-data-4'>답변 상태</div>
                            </div>
                            {inquiryData.map((inquiry, index) => (
                                <InquiryItem
                                    key={index}
                                    category={inquiry.category}
                                    title={inquiry.title}
                                    createdAt={formatDate(inquiry.createdAt)}
                                    status={inquiry.status}
                                    isExpanded={!!expandedInquiry[inquiry.InqueryId]}
                                    onToggle={() => toggleInquiry(inquiry.InqueryId)}
                                    contents={inquiry.contents}
                                    replyContents={inquiry.replyContents}
                                    inquiryReplyDate={inquiry.inquiryReplyDate}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Inquiry;
