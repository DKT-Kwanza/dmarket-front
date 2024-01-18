import React from 'react';
import './InquiryItem.css'

const InquiryItem = ({ category, title, createdAt, status, isExpanded, onToggle, contents, replyContents, inquiryReplyDate }) => {
    const formatDate = (datetime) => { // 날짜만 남기기
        const date = new Date(datetime);
        return date.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' });
      };
      
    return (
        <ul className='Inquiry-contents-content-data-list'>
            <li onClick={onToggle} className='Inquiry-contents-content-data-list-temp'>
                <div className='Inquiry-contents-content-data-1'>{category}</div>
                <div className='Inquiry-contents-content-data-2'>{title}</div>
                <div className='Inquiry-contents-content-data-3'>{createdAt}</div>
                <div className={`Inquiry-contents-content-data-${status === '답변 완료' ? '6' : '5'}`}>{status}</div>
            </li>
            <hr className='Inquiry-contents-content-data-list-hr' />
            {isExpanded && (
                <div className='Inquiry-contents-content-data-list-detail'>
                    <div className='Inquiry-contents-content-data-list-data'>
                        {contents}
                    </div>
                    <hr className='Inquiry-contents-content-data-list-hr' />
                    {status === '답변 완료' ? (
                        <div className='Inquiry-contents-content-data-list-data'>
                            <div className='Inquiry-contents-content-data-list-data-info'>
                                <div className='Inquiry-contents-content-data-list-data-info-profile'>관리자</div>
                                <div className='Inquiry-contents-content-data-list-data-info-date'>{formatDate(inquiryReplyDate)}</div>
                            </div>
                            <div className='Inquiry-contents-content-data-list-data-answer'>{replyContents}.</div>
                        </div>
                    ) : (
                        <div className='Inquiry-contents-content-data-list-data'>
                            <p>답변 준비중입니다.</p>
                        </div>
                    )}
                    <hr className='Inquiry-contents-content-data-list-hr' />
                    <div className='Inquiry-contents-content-data-list-btn-wrap'>
                        <button onClick={onToggle} className='Inquiry-contents-content-data-list-btn'>확인</button>
                    </div>
                    <hr className='Inquiry-contents-content-data-list-btn-hr' />
                </div>
            )}
        </ul>
    );
};

export default InquiryItem;
