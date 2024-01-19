import React from 'react';
import './InquiryItem.css'

const InquiryItem = ({ category, title, contents, img, createdAt, status, replyContents, inquiryReplyDate, isExpanded, onToggle }) => {
      
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
                        {img && (
                            <div className="Inquiry-contents-div-review-content-img">
                            <img src={img} className='Inquiry-contents-img-review-content-img' alt="리뷰 이미지"/>
                            </div>
                        )}
                        {contents}
                    </div>
                    <hr className='Inquiry-contents-content-data-list-hr' />
                    {status === '답변 완료' ? (
                        <div className='Inquiry-contents-content-data-list-data2'>
                            <div className='Inquiry-contents-content-data-list-data-info'>
                                <div className='Inquiry-contents-content-data-list-data-info-profile'>관리자</div>
                                <div className='Inquiry-contents-content-data-list-data-info-date'>{inquiryReplyDate}</div>
                            </div>
                            <div className='Inquiry-contents-content-data-list-data-answer'>{replyContents}</div>
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
