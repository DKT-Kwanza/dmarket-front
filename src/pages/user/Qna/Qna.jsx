import React, {useState, useEffect} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import axios from 'axios';
import MyPageSidebar from "../../../components/user/Sidebar/MyPageSidebar";
import MyPageSubHeader from "../../../components/user/Header/MyPageSubHeader";
import './Qna.css';
import QnaItem from '../../../components/user/Item/QnaItem';
import {Pagination} from "@mui/material";
import {formatDate} from '../../../utils/Format';
import {userApi} from "../../../Api";

const Qna = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [qnas, setQnas] = useState([])
    const [expandedQnaId, setExpandedQnaId] = useState(null);
    const token = sessionStorage.getItem('token');
    const userId = sessionStorage.getItem('userId');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const page = parseInt(queryParams.get('page') || '1', 10);
        setCurrentPage(page);

        const fetchData = async () => {
            try {
                const url = `${userApi}/${userId}/mypage/qna?page=${page}`;
                const response = await axios.get(url, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setQnas(response.data.data.content);
                setTotalPages(response.data.data.totalPages);
            } catch (e) {
                console.error("Error fetching data: ", e);
            }
        };
        fetchData();
    }, [userId, currentPage, location.search]);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
        navigate(`?page=${value}`);
    };

    // 질문을 토글하는 함수
    const toggleQna = (qnaId) => {
        setExpandedQnaId(prevQnaId => prevQnaId === qnaId ? null : qnaId);
    };

    return (
        <div className='Qna'>
            <div><MyPageSubHeader/></div>
            <div className='Qna-contents-body'>
                <MyPageSidebar/>
                <div className='Qna-container'>
                    <div className='Qna-title'>
                        <div className='Qna-title-bar'></div>
                        <div className='Qna-title-info'>상품 Q&A</div>
                    </div>
                    <div className='Inquiry-contents-content'>
                        <div className='Inquiry-contents-content-hr'/>
                        <div className='Qna-contents-content-info'>
                            <p>* 상품과 관련 없는 내용, 비방, 광고, 불건전한 내용의 글은 사전 동의 없이 삭제될 수 있습니다.</p>
                            <p>* 고객님께서 상품 상세에 작성하신 내용입니다.</p>
                        </div>
                        <div className='Qna-contents-content-data'>
                            <hr className='Qna-contents-content-data-hr'/>
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
                        <Pagination count={totalPages} page={currentPage} onChange={handlePageChange}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Qna;
