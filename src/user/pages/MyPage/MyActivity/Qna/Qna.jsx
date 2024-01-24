import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { formatDate } from '../../../../../utils/Format';
import MyPageSidebar from "../../../../components/MyPage/Sidebar/MyPageSidebar";
import MyPageSubHeader from "../../../../components/MyPage/SubHeader/MyPageSubHeader";
import './Qna.css';
import QnaItem from '../../../../components/Qna/QnaItem';

const Qna = () => { 
    const [qnas, setQnas] = useState([])
    const [expandedQnaId, setExpandedQnaId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/QnaData.json");
                
                setQnas(response.data);

            } catch (e) {
                console.error("Error fetching data: ", e);
            }
        };
        fetchData();
    }, []);

    // 질문을 토글하는 함수
    const toggleQna = (qnaId) => {
        setExpandedQnaId(prevQnaId => prevQnaId === qnaId ? null : qnaId);
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
                            {qnas.map((qna, index) => (
                                <QnaItem
                                    key={index}
                                    productName={qna.productName}
                                    title={qna.qnaTitle}
                                    contents={qna.qnaContents}
                                    createdAt={formatDate(qna.qnaCreatedDate)}
                                    isSecret={qna.qnaIsSecret}
                                    status={qna.qnaStatus}
                                    replyContents={qna.qnaReplyContents}
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
