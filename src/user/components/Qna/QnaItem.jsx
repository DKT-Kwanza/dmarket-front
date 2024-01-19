import React from 'react';
import { CiLock } from "react-icons/ci";
import './QnaItem.css'

const QnaItem = ({ productName, title, contents, createdAt, isSecret, status, replyContents, inquiryReplyDate, isExpanded, onToggle  }) => {
      
    return (
        <ul className='Qna-contents-content-data-list'>
            <li onClick={onToggle} className='Qna-contents-content-data-list-temp'>
                <div className='Qna-contents-content-data-1'>{productName}</div>
                <div className='Qna-contents-content-data-2'>
                    {title}
                    {isSecret==false && <CiLock style={{ marginLeft: "5px" }} size={20} />}
                </div>
                <div className='Qna-contents-content-data-3'>{createdAt}</div>
                <div className={`Qna-contents-content-data-${status === '답변 완료' ? '6' : '5'}`}>{status}</div>
            </li>
            <hr className='Qna-contents-content-data-list-hr' />
            {isExpanded && (
                <div className='Qna-contents-content-data-list-detail'>
                    <div className='Qna-contents-content-data-list-data'>
                        {contents}
                    </div>
                    <hr className='Qna-contents-content-data-list-hr' />
                    {status === '답변 완료' ? (
                        <div className='Qna-contents-content-data-list-data'>
                            <div className='Qna-contents-content-data-list-data-info'>
                                <div className='Qna-contents-content-data-list-data-info-profile'>관리자</div>
                                <div className='Qna-contents-content-data-list-data-info-date'>{inquiryReplyDate}</div>
                            </div>
                            <div className='Qna-contents-content-data-list-data-answer'>{replyContents}</div>
                        </div>
                    ) : (
                        <div className='Qna-contents-content-data-list-data'>
                            <p>답변 준비중입니다.</p>
                        </div>
                    )}
                    <hr className='Qna-contents-content-data-list-hr' />
                    <div className='Qna-contents-content-data-list-btn-wrap'>
                        <button onClick={onToggle} className='Qna-contents-content-data-list-btn'>확인</button>
                    </div>
                    <hr className='Qna-contents-content-data-list-btn-hr' />
                </div>
            )}
        </ul>
    );
};

export default QnaItem;
